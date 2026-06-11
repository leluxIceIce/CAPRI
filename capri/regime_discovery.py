import numpy as np
from sklearn.mixture import GaussianMixture
from sklearn.decomposition import PCA
from typing import Dict, Tuple, Optional, Union, List
import logging

logger = logging.getLogger(__name__)

# Lazy imports for optional scientific packages to prevent startup failure
def get_umap():
    try:
        import umap
        return umap.UMAP
    except ImportError:
        logger.warning("umap-learn is not installed or import failed, falling back to PCA.")
        return None

def get_hdbscan():
    try:
        import hdbscan
        return hdbscan.HDBSCAN
    except ImportError:
        logger.warning("hdbscan is not installed or import failed, falling back to DBSCAN.")
        from sklearn.cluster import DBSCAN
        return DBSCAN

class RegimeDiscoverer:
    """
    Stage III - Layer 7: Regime Discovery.
    Applies UMAP/PCA and clustering (HDBSCAN, GMM) to latent space embeddings Z.
    """
    def __init__(
        self,
        n_regimes: int = 4,
        reduction_method: str = "pca",
        n_components: int = 2,
        random_state: int = 42
    ):
        """
        Args:
            n_regimes: Number of target regimes for Gaussian Mixture Model.
            reduction_method: 'umap' or 'pca'.
            n_components: Target projection dimensions for regime visualization/mapping.
            random_state: Random state for repeatability.
        """
        self.n_regimes = n_regimes
        self.reduction_method = reduction_method
        self.n_components = n_components
        self.random_state = random_state
        
        self.reducer = None
        self.gmm = None
        self.hdbscan_clusterer = None

    def fit_transform_latent_space(self, Z: np.ndarray) -> np.ndarray:
        """Projects high-dim embeddings into 2D/3D representation space."""
        import pickle
        if self.reduction_method == "umap":
            UMAP_class = get_umap()
            if UMAP_class is not None:
                self.reducer = UMAP_class(
                    n_components=self.n_components,
                    random_state=self.random_state,
                    n_neighbors=15,
                    min_dist=0.1
                )
                Z_proj = self.reducer.fit_transform(Z)
                try:
                    with open("umap_reducer.pkl", "wb") as f:
                        pickle.dump(self.reducer, f)
                    logger.info("UMAP reducer pickled and saved to umap_reducer.pkl")
                except Exception as e:
                    logger.error(f"Failed to pickle UMAP reducer: {str(e)}")
                return Z_proj
            
        # Fallback/Default to PCA
        self.reducer = PCA(n_components=self.n_components, random_state=self.random_state)
        Z_proj = self.reducer.fit_transform(Z)
        try:
            with open("umap_reducer.pkl", "wb") as f:
                pickle.dump(self.reducer, f)
            logger.info("PCA reducer pickled and saved to umap_reducer.pkl")
        except Exception as e:
            logger.error(f"Failed to pickle PCA reducer: {str(e)}")
        return Z_proj

    def discover_regimes(
        self,
        Z: np.ndarray
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        """
        Runs density-based HDBSCAN and probabilistic GMM to partition latent space.
        
        Args:
            Z: Embeddings of shape (N, D).
            
        Returns:
            hdbscan_labels: Density-based labels (-1 = noise/transition region).
            gmm_probs: Probabilistic cluster assignments of shape (N, n_regimes).
            gmm_labels: Probabilistic regime assignments of shape (N,).
        """
        N = Z.shape[0]
        
        # 1. Density-Based Clustering (HDBSCAN)
        import pickle
        HDBSCAN_class = get_hdbscan()
        if HDBSCAN_class.__name__ == 'HDBSCAN':
            # Use smaller min_cluster_size if dataset is small
            min_size = max(2, min(5, N // 4))
            self.hdbscan_clusterer = HDBSCAN_class(
                min_cluster_size=min_size,
                prediction_data=True
            )
            hdbscan_labels = self.hdbscan_clusterer.fit_predict(Z)
            try:
                with open("hdbscan_model.pkl", "wb") as f:
                    pickle.dump(self.hdbscan_clusterer, f)
                logger.info("HDBSCAN model pickled and saved to hdbscan_model.pkl")
            except Exception as e:
                logger.error(f"Failed to pickle HDBSCAN model: {str(e)}")
        else:
            # DBSCAN fallback
            self.hdbscan_clusterer = HDBSCAN_class(eps=0.5, min_samples=2)
            hdbscan_labels = self.hdbscan_clusterer.fit_predict(Z)
            try:
                with open("hdbscan_model.pkl", "wb") as f:
                    pickle.dump(self.hdbscan_clusterer, f)
                logger.info("DBSCAN model pickled and saved to hdbscan_model.pkl")
            except Exception as e:
                logger.error(f"Failed to pickle DBSCAN model: {str(e)}")
            
        # 2. Probabilistic Clustering (GMM)
        # Handle case where dataset has fewer samples than n_regimes
        k = min(self.n_regimes, N)
        self.gmm = GaussianMixture(
            n_components=k,
            random_state=self.random_state,
            covariance_type="full",
            reg_covar=1e-3
        )
        try:
            self.gmm.fit(Z)
        except ValueError as e:
            logger.warning(f"GMM fit with full covariance failed ({str(e)}), falling back to diagonal covariance.")
            self.gmm = GaussianMixture(
                n_components=k,
                random_state=self.random_state,
                covariance_type="diag",
                reg_covar=1e-3
            )
            self.gmm.fit(Z)
            
        gmm_probs = self.gmm.predict_proba(Z)
        gmm_labels = self.gmm.predict(Z)
        
        return hdbscan_labels, gmm_probs, gmm_labels

    def compute_manifold_metrics(self, Z: np.ndarray, Z_proj: np.ndarray) -> Dict[str, float]:
        """
        Computes manifold projection quality metrics: Trustworthiness and Shepard Correlation.
        """
        from sklearn.manifold import trustworthiness
        from scipy.spatial.distance import pdist
        from scipy.stats import pearsonr
        
        k = min(15, len(Z) - 1)
        if k > 0:
            tw = float(trustworthiness(Z, Z_proj, n_neighbors=k))
        else:
            tw = 1.0
            
        dist_high = pdist(Z)
        dist_low = pdist(Z_proj)
        
        shepard_corr, _ = pearsonr(dist_high, dist_low)
        
        return {
            "trustworthiness": tw,
            "shepard_correlation": float(shepard_corr)
        }

    def compute_regime_separation(self, Z: np.ndarray, labels: np.ndarray) -> Dict[str, float]:
        """
        Computes cluster separation quality: Silhouette score and Davies-Bouldin index.
        """
        from sklearn.metrics import silhouette_score, davies_bouldin_score
        
        unique_labels = np.unique(labels)
        if len(unique_labels) < 2 or len(unique_labels) >= len(Z):
            return {"silhouette": 0.0, "davies_bouldin": 999.0}
            
        sil = float(silhouette_score(Z, labels))
        db = float(davies_bouldin_score(Z, labels))
        
        return {
            "silhouette": sil,
            "davies_bouldin": db
        }

    def compute_ecological_coherence(
        self,
        cubes: List[np.ndarray],
        labels: np.ndarray,
        variables: List[str]
    ) -> Dict[str, float]:
        """
        Validates cluster/regime ecological coherence by comparing
        within-cluster variable variance to global variable variance.
        """
        N = len(cubes)
        V = cubes[0].shape[-1]
        data = np.stack(cubes, axis=0) # shape (N, H, W, V)
        
        # Extract mean values per tile
        sample_means = np.mean(data, axis=(1, 2)) # shape (N, V)
        global_stds = np.std(sample_means, axis=0) + 1e-6
        
        unique_labels = np.unique(labels)
        within_stds = []
        
        for lbl in unique_labels:
            if lbl == -1:
                continue # Skip noise in HDBSCAN
            cluster_samples = sample_means[labels == lbl]
            if len(cluster_samples) > 1:
                within_stds.append(np.std(cluster_samples, axis=0))
                
        if len(within_stds) == 0:
            return {"mean_ecological_coherence": 0.0}
            
        mean_within_std = np.mean(within_stds, axis=0)
        coherence = 1.0 - (mean_within_std / global_stds)
        
        results = {}
        for v_idx, var in enumerate(variables):
            results[f"{var}_coherence"] = float(coherence[v_idx])
            
        results["mean_ecological_coherence"] = float(np.mean(coherence))
        return results
