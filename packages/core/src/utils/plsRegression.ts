// Partial Least Squares (PLS1) regression — the chemometrics standard for
// predicting a target from many COLLINEAR spectral bands. Unlike random-forest
// impurity importance (which arbitrarily zeroes out features that are redundant
// with another already-used feature), PLS projects the predictors onto a few
// latent components that maximise covariance with the target, and its VIP
// (Variable Importance in Projection) scores stay meaningful under collinearity:
// two perfectly-correlated informative bands both get a high VIP rather than one
// stealing all the credit.
//
// Everything here is plain-array NIPALS so there's no extra dependency and we get
// full access to the weights/scores the VIP formula needs. Deterministic given a
// seed (the app's reproducible-analytics commitment).

import { mulberry32, rSquared, rmse } from "./mlData";

const EPS = 1e-12;

export interface PLSModel {
  /** Regression coefficients in standardized-X → standardized-y space. */
  B: number[];
  /** Per-component weight vectors (unit norm), W[a] has length p. */
  W: number[][];
  /** Per-component X loadings, P[a] has length p. */
  P: number[][];
  /** Per-component y loadings (scalars, PLS1). */
  Q: number[];
  /** Per-component score sum-of-squares tᵀt. */
  tt: number[];
  xMeans: number[];
  xStds: number[];
  yMean: number;
  yStd: number;
  nComponents: number;
}

function columnStats(X: number[][]): { means: number[]; stds: number[] } {
  const n = X.length;
  const p = n > 0 ? X[0].length : 0;
  const means = new Array(p).fill(0);
  const stds = new Array(p).fill(0);
  for (let j = 0; j < p; j++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += X[i][j];
    means[j] = s / n;
    let v = 0;
    for (let i = 0; i < n; i++) { const dx = X[i][j] - means[j]; v += dx * dx; }
    stds[j] = Math.sqrt(v / n) || 1e-9;
  }
  return { means, stds };
}

function vecStats(y: number[]): { mean: number; std: number } {
  const n = y.length;
  let s = 0;
  for (let i = 0; i < n; i++) s += y[i];
  const mean = s / n;
  let v = 0;
  for (let i = 0; i < n; i++) { const dy = y[i] - mean; v += dy * dy; }
  return { mean, std: Math.sqrt(v / n) || 1e-9 };
}

// Solve M x = b for small A×A M via Gauss–Jordan (A ≤ ~15, so this is trivial).
function solve(M: number[][], b: number[]): number[] {
  const A = b.length;
  const aug = M.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < A; col++) {
    // partial pivot
    let piv = col;
    for (let r = col + 1; r < A; r++) if (Math.abs(aug[r][col]) > Math.abs(aug[piv][col])) piv = r;
    if (Math.abs(aug[piv][col]) < EPS) continue;
    [aug[col], aug[piv]] = [aug[piv], aug[col]];
    const d = aug[col][col];
    for (let k = col; k <= A; k++) aug[col][k] /= d;
    for (let r = 0; r < A; r++) {
      if (r === col) continue;
      const f = aug[r][col];
      for (let k = col; k <= A; k++) aug[r][k] -= f * aug[col][k];
    }
  }
  return aug.map((row) => row[A]);
}

/**
 * Fit a PLS1 model. Standardizes X and y internally (storing the stats so
 * predictPLS can apply the same transform to new rows). nComponents is clamped
 * to what the data supports.
 */
export function fitPLS(X: number[][], y: number[], nComponents: number): PLSModel {
  const n = X.length;
  const p = n > 0 ? X[0].length : 0;
  const { means: xMeans, stds: xStds } = columnStats(X);
  const { mean: yMean, std: yStd } = vecStats(y);

  // Working copies in standardized space.
  const E = X.map((row) => row.map((v, j) => (v - xMeans[j]) / xStds[j]));
  const f = y.map((v) => (v - yMean) / yStd);

  const maxA = Math.max(1, Math.min(nComponents, p, n - 1));
  const W: number[][] = [];
  const P: number[][] = [];
  const Q: number[] = [];
  const tt: number[] = [];

  for (let a = 0; a < maxA; a++) {
    // w = Eᵀf / ‖Eᵀf‖
    const w = new Array(p).fill(0);
    for (let j = 0; j < p; j++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += E[i][j] * f[i];
      w[j] = s;
    }
    let norm = 0;
    for (let j = 0; j < p; j++) norm += w[j] * w[j];
    norm = Math.sqrt(norm);
    if (norm < EPS) break; // target fully explained — no more components
    for (let j = 0; j < p; j++) w[j] /= norm;

    // t = E w
    const t = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let j = 0; j < p; j++) s += E[i][j] * w[j];
      t[i] = s;
    }
    let tta = 0;
    for (let i = 0; i < n; i++) tta += t[i] * t[i];
    if (tta < EPS) break;

    // p_load = Eᵀt / tᵀt ;  q = fᵀt / tᵀt
    const pl = new Array(p).fill(0);
    for (let j = 0; j < p; j++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += E[i][j] * t[i];
      pl[j] = s / tta;
    }
    let q = 0;
    for (let i = 0; i < n; i++) q += f[i] * t[i];
    q /= tta;

    // Deflate X and y.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < p; j++) E[i][j] -= t[i] * pl[j];
      f[i] -= t[i] * q;
    }

    W.push(w); P.push(pl); Q.push(q); tt.push(tta);
  }

  const A = W.length;
  // B = W (PᵀW)⁻¹ q   (all in standardized space)
  let B = new Array(p).fill(0);
  if (A > 0) {
    const M: number[][] = [];
    for (let a = 0; a < A; a++) {
      M.push([]);
      for (let b = 0; b < A; b++) {
        let s = 0;
        for (let j = 0; j < p; j++) s += P[a][j] * W[b][j];
        M[a].push(s);
      }
    }
    const c = solve(M, Q); // c = (PᵀW)⁻¹ q
    for (let j = 0; j < p; j++) {
      let s = 0;
      for (let a = 0; a < A; a++) s += c[a] * W[a][j];
      B[j] = s;
    }
  }

  return { B, W, P, Q, tt, xMeans, xStds, yMean, yStd, nComponents: A };
}

/** Predict the target (original units) for new rows. */
export function predictPLS(model: PLSModel, X: number[][]): number[] {
  const { B, xMeans, xStds, yMean, yStd } = model;
  const p = B.length;
  return X.map((row) => {
    let s = 0;
    for (let j = 0; j < p; j++) s += ((row[j] - xMeans[j]) / xStds[j]) * B[j];
    return s * yStd + yMean;
  });
}

/**
 * Variable Importance in Projection. VIP_j = sqrt( p · Σ_a SSₐ·w_aj² / Σ_a SSₐ )
 * where SSₐ = qₐ²·(tₐᵀtₐ) is the y-variance explained by component a and the w
 * vectors are unit-norm. Mean VIP ≈ 1; a band with VIP > 1 is above-average
 * influential. Crucially, two collinear informative bands BOTH score high.
 */
export function vipScores(model: PLSModel): number[] {
  const { W, Q, tt } = model;
  const A = W.length;
  const p = A > 0 ? W[0].length : 0;
  const vip = new Array(p).fill(0);
  if (A === 0) return vip;
  const ss = Q.map((q, a) => q * q * tt[a]);
  const total = ss.reduce((acc, v) => acc + v, 0) || EPS;
  for (let j = 0; j < p; j++) {
    let s = 0;
    for (let a = 0; a < A; a++) s += ss[a] * W[a][j] * W[a][j];
    vip[j] = Math.sqrt((p * s) / total);
  }
  return vip;
}

export interface PLSCVResult {
  nComponents: number;
  cvR2: number;
  cvRmse: number;
  /** Held-out (cross-validated) prediction per row, original order + units. */
  cvPredicted: number[];
  vip: number[];
  featureNames: string[];
  /** CV RMSE at each component count tried (for diagnostics / selection display). */
  perComponentRmse: { components: number; rmse: number }[];
}

/** Pooled k-fold cross-validated predictions for a fixed component count. */
function crossValPredict(
  rows: number[][],
  y: number[],
  nComponents: number,
  folds: number,
  seed: number
): number[] {
  const n = rows.length;
  const order = Array.from({ length: n }, (_, i) => i);
  // Seeded shuffle so fold assignment is reproducible.
  const rng = mulberry32(seed);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const pred = new Array(n).fill(0);
  for (let k = 0; k < folds; k++) {
    const testIdx: number[] = [];
    const trainIdx: number[] = [];
    for (let pos = 0; pos < n; pos++) {
      (pos % folds === k ? testIdx : trainIdx).push(order[pos]);
    }
    if (trainIdx.length === 0 || testIdx.length === 0) continue;
    const Xtr = trainIdx.map((i) => rows[i]);
    const ytr = trainIdx.map((i) => y[i]);
    const model = fitPLS(Xtr, ytr, nComponents);
    const Xte = testIdx.map((i) => rows[i]);
    const yhat = predictPLS(model, Xte);
    testIdx.forEach((i, t) => { pred[i] = yhat[t]; });
  }
  return pred;
}

/**
 * Train PLS with k-fold cross-validation. Sweeps component counts 1..maxComponents,
 * picks the count with the lowest CV RMSE (honest held-out error), and reports VIP
 * from a final fit on all rows at that count. CV — not re-substitution — so the
 * R²/RMSE are a real generalization estimate.
 */
export function trainPLSWithCV(
  rows: number[][],
  y: number[],
  featureNames: string[],
  opts: { maxComponents?: number; folds?: number; seed?: number } = {}
): PLSCVResult {
  const n = rows.length;
  const p = n > 0 ? rows[0].length : 0;
  const folds = Math.max(2, Math.min(opts.folds ?? 5, n));
  const seed = opts.seed ?? 42;
  const maxComp = Math.max(1, Math.min(opts.maxComponents ?? 10, p, n - 1, 15));

  const perComponentRmse: { components: number; rmse: number }[] = [];
  let bestA = 1;
  let bestRmse = Infinity;
  let bestPred: number[] = [];
  for (let A = 1; A <= maxComp; A++) {
    const pred = crossValPredict(rows, y, A, folds, seed);
    const e = rmse(y, pred);
    perComponentRmse.push({ components: A, rmse: e });
    if (e < bestRmse - EPS) {
      bestRmse = e;
      bestA = A;
      bestPred = pred;
    }
  }

  const finalModel = fitPLS(rows, y, bestA);
  return {
    nComponents: bestA,
    cvR2: rSquared(y, bestPred),
    cvRmse: bestRmse,
    cvPredicted: bestPred,
    vip: vipScores(finalModel),
    featureNames,
    perComponentRmse,
  };
}
