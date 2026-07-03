// Shared grid helpers for spatial/relationship tensor extraction.
// Ports small pieces of scipy.ndimage behavior (uniform_filter, generic
// 3x3 convolution, reflect-padding) used throughout capri's
// spatial_structure.py and relationship_tensor.py.

/** Row-major flatten of a 2D grid into a Float32Array. */
export function flattenGrid(grid: number[][], gridSize: number): Float32Array {
  const out = new Float32Array(gridSize * gridSize);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      out[r * gridSize + c] = grid[r][c];
    }
  }
  return out;
}

/**
 * Builds a halo-padded, row-major flattened grid of size
 * (gridSize + 2*halo) x (gridSize + 2*halo), using scipy's `mode='reflect'`
 * convention (edge row/col is duplicated, i.e. padded[0] === grid[0]).
 *
 * This is intentionally a stub mirroring capri's `build_haloed_cube`
 * (spatial_structure.py): in capri, halo cells are filled from real
 * neighbor-tile data when available, falling back to reflect-padding at
 * true regional boundaries. The dashboard currently has no neighbor-tile
 * data, so we always reflect-pad. When multi-tile support is added, this
 * function should be extended to accept neighbor edge data for the N/S/E/W
 * sides (and corners), matching `build_haloed_cube`'s behavior.
 */
export function buildPaddedGrid(grid: number[][], halo: number, gridSize: number): Float32Array {
  const paddedSize = gridSize + 2 * halo;
  const out = new Float32Array(paddedSize * paddedSize);

  for (let pr = 0; pr < paddedSize; pr++) {
    // Reflect index into [0, gridSize-1] using scipy 'reflect' (edge duplication)
    const r = reflectIndex(pr - halo, gridSize);
    for (let pc = 0; pc < paddedSize; pc++) {
      const c = reflectIndex(pc - halo, gridSize);
      out[pr * paddedSize + pc] = grid[r][c];
    }
  }
  return out;
}

// scipy mode='reflect' (a.k.a. "symmetric"): edge value is duplicated,
// e.g. for indices -1,-2 -> 0,1 and for gridSize, gridSize+1 -> gridSize-1, gridSize-2.
function reflectIndex(i: number, size: number): number {
  if (size === 1) return 0;
  let idx = i;
  while (idx < 0 || idx >= size) {
    if (idx < 0) idx = -idx - 1;
    else if (idx >= size) idx = 2 * size - idx - 1;
  }
  return idx;
}

/**
 * 3x3 uniform (box) filter equivalent to scipy.ndimage.uniform_filter with
 * mode='reflect'. `padded` must be a (paddedSize x paddedSize) flattened
 * grid built with halo=1 via `buildPaddedGrid`. Returns a (gridSize x gridSize)
 * flattened result.
 */
export function boxBlur3x3(padded: Float32Array, paddedSize: number, gridSize: number): Float32Array {
  const out = new Float32Array(gridSize * gridSize);
  const halo = (paddedSize - gridSize) / 2;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      let sum = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const pr = r + halo + dr;
          const pc = c + halo + dc;
          sum += padded[pr * paddedSize + pc];
        }
      }
      out[r * gridSize + c] = sum / 9;
    }
  }
  return out;
}

/**
 * Generic 3x3 convolution helper for custom kernels (Sobel, Laplacian,
 * Moran weight matrix, etc.).
 *
 * `kernel` is a 3x3 row-major array (length 9), applied as a correlation
 * (no kernel flipping, matching scipy.ndimage.convolve's default which
 * flips internally — for symmetric kernels like ours this distinction is
 * irrelevant; for Sobel we use the kernels exactly as scipy.ndimage.sobel
 * would produce after its internal flip, see spatialTensor.ts comments).
 *
 * `mode` controls out-of-bounds handling:
 *  - 'reflect': use `padded`/`paddedSize` (built via buildPaddedGrid with halo=1)
 *  - 'constant': operate directly on `grid`/`gridSize`, treating out-of-bounds
 *    cells as `cval` (default 0)
 */
export function convolve3x3(
  kernel: number[],
  gridSize: number,
  options:
    | { mode: "reflect"; padded: Float32Array; paddedSize: number }
    | { mode: "constant"; grid: Float32Array; cval?: number }
): Float32Array {
  const out = new Float32Array(gridSize * gridSize);

  if (options.mode === "reflect") {
    const { padded, paddedSize } = options;
    const halo = (paddedSize - gridSize) / 2;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        let sum = 0;
        let k = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const pr = r + halo + dr;
            const pc = c + halo + dc;
            sum += kernel[k] * padded[pr * paddedSize + pc];
            k++;
          }
        }
        out[r * gridSize + c] = sum;
      }
    }
  } else {
    const { grid } = options;
    const cval = options.cval ?? 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        let sum = 0;
        let k = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const rr = r + dr;
            const cc = c + dc;
            const val =
              rr >= 0 && rr < gridSize && cc >= 0 && cc < gridSize
                ? grid[rr * gridSize + cc]
                : cval;
            sum += kernel[k] * val;
            k++;
          }
        }
        out[r * gridSize + c] = sum;
      }
    }
  }

  return out;
}
