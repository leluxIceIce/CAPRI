import argparse
import logging
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    )


def load_dataset(path: Path, sep: str = ';') -> pd.DataFrame:
    logging.info('Loading dataset from %s', path)
    df = pd.read_csv(path, sep=sep)
    logging.info('Dataset loaded with %d rows and %d columns', len(df), len(df.columns))
    return df


def prepare_dataset(df: pd.DataFrame, response_columns: list[str]) -> tuple[pd.DataFrame, pd.DataFrame]:
    logging.info('Preparing dataset with response columns: %s', response_columns)

    available = [col for col in response_columns if col in df.columns]
    if len(available) != len(response_columns):
        missing = set(response_columns) - set(available)
        raise ValueError(f'Missing response columns from dataset: {sorted(missing)}')

    predictors = df.drop(columns=response_columns)
    predictors = predictors.copy()
    predictors = predictors.apply(pd.to_numeric, errors='coerce')

    responses = df[response_columns].copy()
    responses = responses.apply(pd.to_numeric, errors='coerce')

    if predictors.isna().any().any() or responses.isna().any().any():
        logging.warning('Missing values detected: filling with column means')
        predictors = predictors.fillna(predictors.mean())
        responses = responses.fillna(responses.mean())

    logging.info('Prepared predictor matrix with shape %s and response matrix with shape %s', predictors.shape, responses.shape)
    return predictors, responses


def log_transform_response(y: pd.Series) -> tuple[np.ndarray, bool]:
    if (y <= 0).any():
        logging.info('Using log1p transform for non-positive target values')
        return np.log1p(y.clip(lower=0)), True
    logging.info('Using natural log transform for target values')
    return np.log(y), False


def inverse_log_transform(y_pred: np.ndarray, used_log1p: bool) -> np.ndarray:
    return np.expm1(y_pred) if used_log1p else np.exp(y_pred)


def train_random_forest(
    X: pd.DataFrame,
    y: np.ndarray,
    cv: int = 5,
    random_state: int = 42,
) -> GridSearchCV:
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20, 30],
        'min_samples_leaf': [1, 2, 4],
        'min_samples_split': [2, 5, 10],
    }

    rf = RandomForestRegressor(random_state=random_state)
    search = GridSearchCV(
        estimator=rf,
        param_grid=param_grid,
        cv=cv,
        scoring='r2',
        n_jobs=-1,
        verbose=1,
        refit=True,
    )
    search.fit(X, y)
    return search


def evaluate_model(model: RandomForestRegressor, X_test: pd.DataFrame, y_test: np.ndarray) -> dict[str, float]:
    y_pred = model.predict(X_test)
    metrics = {
        'r2': r2_score(y_test, y_pred),
        'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
        'mae': mean_absolute_error(y_test, y_pred),
    }
    return metrics


def run_pipeline(
    csv_path: Path,
    response_columns: list[str],
    test_size: float = 0.3,
    cv: int = 5,
    random_state: int = 42,
    sep: str = ';',
) -> pd.DataFrame:
    df = load_dataset(csv_path, sep=sep)
    X, Y = prepare_dataset(df, response_columns)

    results = []
    for response_column in response_columns:
        y = Y[response_column]
        y_transformed, used_log1p = log_transform_response(y)

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y_transformed,
            train_size=1 - test_size,
            random_state=random_state,
            shuffle=True,
        )

        logging.info('Training Random Forest for target %s', response_column)
        search = train_random_forest(X_train, y_train, cv=cv, random_state=random_state)

        best_model = search.best_estimator_
        y_test_original = inverse_log_transform(y_test, used_log1p)
        y_pred_original = inverse_log_transform(best_model.predict(X_test), used_log1p)

        metrics = {
            'r2': r2_score(y_test_original, y_pred_original),
            'rmse': np.sqrt(mean_squared_error(y_test_original, y_pred_original)),
            'mae': mean_absolute_error(y_test_original, y_pred_original),
        }

        logging.info('Best parameters for %s: %s', response_column, search.best_params_)
        logging.info('Evaluation for %s: R2=%.4f, RMSE=%.4f, MAE=%.4f', response_column, metrics['r2'], metrics['rmse'], metrics['mae'])

        results.append(
            {
                'target': response_column,
                'best_n_estimators': search.best_params_['n_estimators'],
                'best_max_depth': search.best_params_['max_depth'],
                'best_min_samples_leaf': search.best_params_['min_samples_leaf'],
                'best_min_samples_split': search.best_params_['min_samples_split'],
                'r2': metrics['r2'],
                'rmse': metrics['rmse'],
                'mae': metrics['mae'],
            }
        )

    return pd.DataFrame(results)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Train Random Forest regression models with GridSearchCV.')
    parser.add_argument('csv_path', type=Path, help='Path to the input CSV dataset')
    parser.add_argument(
        '--responses',
        nargs='+',
        default=['Chl-a', 'PC', 'MC', 'SD'],
        help='Response variable column names (default: Chl-a PC MC SD)',
    )
    parser.add_argument('--sep', default=';', help='CSV separator (default: ;)')
    parser.add_argument('--test-size', type=float, default=0.3, help='Proportion of the dataset used for testing')
    parser.add_argument('--cv', type=int, default=5, help='Number of cross-validation folds')
    parser.add_argument('--random-state', type=int, default=42, help='Random state for reproducibility')
    return parser.parse_args()


def main() -> None:
    configure_logging()
    args = parse_args()
    results = run_pipeline(
        csv_path=args.csv_path,
        response_columns=args.responses,
        test_size=args.test_size,
        cv=args.cv,
        random_state=args.random_state,
        sep=args.sep,
    )
    results_path = Path('rf_gridsearch_results.csv')
    results.to_csv(results_path, index=False)
    logging.info('Saved model tuning and evaluation results to %s', results_path)


if __name__ == '__main__':
    main()
