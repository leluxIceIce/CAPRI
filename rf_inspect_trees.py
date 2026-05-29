"""
Utility to train RF models, save them, and extract decision tree rules.
Usage: python rf_inspect_trees.py <csv_path> --responses COL1 COL2 ... --save-models
"""

import argparse
import logging
from pathlib import Path

import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import export_text
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    )


def log_transform_response(y: pd.Series) -> tuple[np.ndarray, bool]:
    if (y <= 0).any():
        return np.log1p(y.clip(lower=0)), True
    return np.log(y), False


def inverse_log_transform(y_pred: np.ndarray, used_log1p: bool) -> np.ndarray:
    return np.expm1(y_pred) if used_log1p else np.exp(y_pred)


def train_rf_and_extract_trees(
    csv_path: Path,
    response_columns: list[str],
    output_dir: Path = None,
    save_models: bool = True,
    max_trees_to_show: int = 3,
) -> None:
    """Train RF models and extract decision tree rules."""
    
    if output_dir is None:
        output_dir = csv_path.parent
    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)

    logging.info(f'Loading data from {csv_path}')
    df = pd.read_csv(csv_path, sep=';')
    
    X = df.drop(columns=response_columns).apply(pd.to_numeric, errors='coerce')
    X = X.fillna(X.mean())
    y_multi = df[response_columns].apply(pd.to_numeric, errors='coerce').fillna(df[response_columns].mean())
    
    feature_names = X.columns.tolist()

    for target_col in response_columns:
        logging.info(f'\n{"="*80}')
        logging.info(f'Processing target: {target_col}')
        logging.info(f'{"="*80}')
        
        y = y_multi[target_col]
        y_transformed, used_log1p = log_transform_response(y)
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_transformed, train_size=0.7, random_state=42, shuffle=True
        )

        # Train with GridSearchCV
        param_grid = {
            'n_estimators': [50, 100],
            'max_depth': [5, 10, 20],
            'min_samples_leaf': [1, 2],
            'min_samples_split': [2, 5],
        }
        
        rf = RandomForestRegressor(random_state=42)
        search = GridSearchCV(rf, param_grid, cv=5, scoring='r2', n_jobs=-1, verbose=0)
        search.fit(X_train, y_train)
        
        best_model = search.best_estimator_
        logging.info(f'Best hyperparameters: {search.best_params_}')

        # Evaluate
        y_pred = best_model.predict(X_test)
        y_test_original = inverse_log_transform(y_test, used_log1p)
        y_pred_original = inverse_log_transform(y_pred, used_log1p)
        
        r2 = r2_score(y_test_original, y_pred_original)
        rmse = np.sqrt(mean_squared_error(y_test_original, y_pred_original))
        logging.info(f'Test R²: {r2:.4f}, RMSE: {rmse:.4f}')

        # Save model
        if save_models:
            model_path = output_dir / f'rf_model_{target_col}.joblib'
            joblib.dump(best_model, model_path)
            logging.info(f'Saved model to {model_path}')
            
            # Save metadata
            meta = {
                'target': target_col,
                'n_trees': best_model.n_estimators,
                'feature_names': feature_names,
                'r2_test': r2,
                'rmse_test': rmse,
            }
            meta_path = output_dir / f'rf_model_{target_col}_meta.joblib'
            joblib.dump(meta, meta_path)

        # Extract decision tree rules
        logging.info(f'\nDecision Tree Rules (first {max_trees_to_show} trees):')
        logging.info('-' * 80)
        
        for tree_idx in range(min(max_trees_to_show, best_model.n_estimators)):
            tree = best_model.estimators_[tree_idx]
            tree_rules = export_text(tree, feature_names=feature_names, max_depth=4)
            logging.info(f'\n--- Tree {tree_idx + 1} ---')
            logging.info(tree_rules)
        
        # Save all tree rules to file
        rules_path = output_dir / f'rf_tree_rules_{target_col}.txt'
        with open(rules_path, 'w') as f:
            f.write(f'Random Forest Decision Trees for {target_col}\n')
            f.write(f'Total trees: {best_model.n_estimators}\n')
            f.write(f'Test R²: {r2:.4f}\n')
            f.write(f'Hyperparameters: {search.best_params_}\n')
            f.write('=' * 80 + '\n\n')
            
            for tree_idx in range(best_model.n_estimators):
                tree = best_model.estimators_[tree_idx]
                tree_rules = export_text(tree, feature_names=feature_names, max_depth=6)
                f.write(f'\n--- Tree {tree_idx + 1} ---\n')
                f.write(tree_rules)
        
        logging.info(f'Saved all tree rules to {rules_path}')
        
        # Feature importance
        importances = best_model.feature_importances_
        sorted_idx = np.argsort(importances)[::-1]
        logging.info(f'\nTop 10 Feature Importances:')
        for i in range(min(10, len(sorted_idx))):
            idx = sorted_idx[i]
            logging.info(f'  {feature_names[idx]}: {importances[idx]:.4f}')


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Train RF, extract trees, and save models.')
    parser.add_argument('csv_path', type=Path, help='Path to CSV dataset')
    parser.add_argument('--responses', nargs='+', default=['Chl-a', 'PC', 'MC', 'SD'],
                        help='Response columns')
    parser.add_argument('--output-dir', type=Path, help='Output directory (default: same as CSV)')
    parser.add_argument('--save-models', action='store_true', default=True,
                        help='Save trained models as joblib files')
    parser.add_argument('--max-trees-to-show', type=int, default=3,
                        help='Max tree rules to display in console')
    return parser.parse_args()


if __name__ == '__main__':
    configure_logging()
    args = parse_args()
    train_rf_and_extract_trees(
        csv_path=args.csv_path,
        response_columns=args.responses,
        output_dir=args.output_dir,
        save_models=args.save_models,
        max_trees_to_show=args.max_trees_to_show,
    )
