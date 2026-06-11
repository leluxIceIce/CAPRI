import numpy as np
from sklearn.neighbors import NearestNeighbors
from typing import List, Tuple, Dict, Any, Optional

class EcologicalAnalogRetriever:
    """
    Stage III - Layer 8: Ecological Similarity & Analog Retrieval.
    Stores historical latent state embeddings and uses k-Nearest Neighbors
    to retrieve similar past states, compute similarity metrics, and identify novelty.
    """
    def __init__(self, metric: str = "cosine", n_neighbors: int = 5):
        """
        Args:
            metric: Distance metric to use ('cosine' or 'euclidean').
            n_neighbors: Number of nearest analogs to retrieve.
        """
        self.metric = metric
        self.n_neighbors = n_neighbors
        self.knn = None
        self.reference_embeddings = None
        self.novelty_threshold = 0.0

    def fit(self, Z: np.ndarray) -> "EcologicalAnalogRetriever":
        """
        Fits the neighbor index on historical embeddings.
        
        Args:
            Z: Reference embeddings of shape (N, D).
        """
        self.reference_embeddings = Z
        self.knn = NearestNeighbors(
            n_neighbors=min(self.n_neighbors, len(Z)),
            metric=self.metric
        )
        self.knn.fit(Z)
        
        # Calculate standard distances between nearest neighbors in training data
        # to establish a baseline for novelty detection (95th percentile)
        if len(Z) > 1:
            distances, _ = self.knn.kneighbors(Z, n_neighbors=2)
            # Distance to the closest non-self neighbor
            closest_dist = distances[:, 1]
            self.novelty_threshold = float(np.percentile(closest_dist, 95))
        else:
            self.novelty_threshold = 1.0

        return self

    def retrieve_analogs(
        self,
        z_query: np.ndarray,
        k: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Retrieves the top k most similar historical states.
        
        Args:
            z_query: Embedding vector of the new state, shape (D,) or (1, D).
            k: Number of neighbors to return (overrides default).
            
        Returns:
            Dict containing:
                - indices: Indices of closest historical analogs.
                - distances: Distances to analogs.
                - similarities: Similarity scores in [0, 1] range.
                - is_novel: Boolean flag indicating if state is highly novel.
        """
        if z_query.ndim == 1:
            z_query = z_query.reshape(1, -1)
            
        k_val = k if k is not None else self.n_neighbors
        k_val = min(k_val, len(self.reference_embeddings))
        
        distances, indices = self.knn.kneighbors(z_query, n_neighbors=k_val)
        
        # Convert distance to a similarity score [0, 1]
        # For Cosine, similarity = 1 - distance
        # For Euclidean, similarity = 1 / (1 + distance)
        if self.metric == "cosine":
            similarities = 1.0 - distances[0]
        else:
            similarities = 1.0 / (1.0 + distances[0])
            
        # Determine if this query state is novel (i.e. furthest neighbor is beyond threshold)
        nearest_distance = distances[0][0]
        is_novel = bool(nearest_distance > self.novelty_threshold)
        
        # Calculate statistical novelty confidence
        is_novel_stat, p_value, conf_str = self.estimate_novelty_confidence(nearest_distance)
        
        return {
            "indices": indices[0].tolist(),
            "distances": distances[0].tolist(),
            "similarities": similarities.tolist(),
            "is_novel": is_novel,
            "is_novel_statistically": is_novel_stat,
            "novelty_p_value": p_value,
            "novelty_confidence": conf_str,
            "nearest_distance": float(nearest_distance),
            "novelty_threshold": self.novelty_threshold
        }

    def estimate_novelty_confidence(self, nearest_distance: float) -> Tuple[bool, float, str]:
        """
        Estimates the statistical significance of state novelty using log-normal fitting.
        """
        if self.reference_embeddings is None or len(self.reference_embeddings) <= 2:
            return False, 1.0, "0.0% Confidence (No reference data)"
            
        distances, _ = self.knn.kneighbors(self.reference_embeddings, n_neighbors=2)
        closest_dists = distances[:, 1]
        
        from scipy.stats import lognorm
        try:
            shape, loc, scale = lognorm.fit(closest_dists)
            p_value = 1.0 - lognorm.cdf(nearest_distance, shape, loc, scale)
            p_value = np.clip(p_value, 0.0, 1.0)
        except Exception:
            # Fallback to simple z-score
            mean = np.mean(closest_dists)
            std = np.std(closest_dists) + 1e-6
            z_score = (nearest_distance - mean) / std
            from scipy.stats import norm
            p_value = 1.0 - norm.cdf(z_score)
            
        is_novel = p_value < 0.05
        confidence = (1.0 - p_value) * 100
        
        return is_novel, float(p_value), f"{confidence:.1f}% Confidence"

    def explore_trajectory(
        self,
        Z_sequence: np.ndarray,
        labels_sequence: Optional[List[int]] = None
    ) -> Dict[str, Any]:
        """
        Analyzes a sequence of embeddings representing a temporal trajectory.
        Tracks velocities, accelerations, and state transition risk.
        """
        N = Z_sequence.shape[0]
        if N < 2:
            return {
                "velocities": [],
                "accelerations": [],
                "cumulative_distance": 0.0,
                "transitions": []
            }
            
        # 1. Compute velocities (Euclidean steps)
        diffs = Z_sequence[1:] - Z_sequence[:-1]
        velocities = np.linalg.norm(diffs, axis=1).tolist()
        
        # 2. Compute accelerations
        accelerations = [velocities[i] - velocities[i-1] for i in range(1, len(velocities))]
        
        # 3. Cumulative path distance
        cumulative_distance = float(np.sum(velocities))
        
        # 4. Detect transitions if labels are provided
        transitions = []
        if labels_sequence is not None:
            for t in range(1, len(labels_sequence)):
                prev = labels_sequence[t-1]
                curr = labels_sequence[t]
                if prev != curr:
                    transitions.append({
                        "step": t,
                        "from_regime": int(prev),
                        "to_regime": int(curr),
                        "velocity": float(velocities[t-1])
                    })
                    
        return {
            "velocities": velocities,
            "accelerations": accelerations,
            "cumulative_distance": cumulative_distance,
            "transitions": transitions
        }
