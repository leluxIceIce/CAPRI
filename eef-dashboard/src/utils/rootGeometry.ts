import * as THREE from "three";
import type { RootSegment } from "./lsystem";

const SIDES = 6;

const CLUSTER_PALETTE = [
  new THREE.Color(0.85, 0.35, 0.25),  // warm red
  new THREE.Color(0.30, 0.75, 0.55),  // teal green
  new THREE.Color(0.45, 0.40, 0.85),  // indigo
  new THREE.Color(0.90, 0.65, 0.20),  // amber
  new THREE.Color(0.55, 0.80, 0.90),  // sky blue
  new THREE.Color(0.80, 0.45, 0.70),  // mauve
  new THREE.Color(0.35, 0.60, 0.30),  // forest
  new THREE.Color(0.95, 0.50, 0.50),  // coral
];

export function buildRootMesh(
  segments: RootSegment[],
  clusterLabels: Uint8Array
): THREE.Mesh {
  const nSegs = segments.length;
  const vertsPerSeg = (SIDES + 1) * 2;
  const trisPerSeg = SIDES * 2;
  const totalVerts = nSegs * vertsPerSeg;
  const totalIndices = nSegs * trisPerSeg * 3;

  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  const colors = new Float32Array(totalVerts * 4); // RGBA for certainty
  const indices = new Uint32Array(totalIndices);

  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const perp = new THREE.Vector3();
  const perp2 = new THREE.Vector3();
  const circleVec = new THREE.Vector3();
  const norm = new THREE.Vector3();

  let vi = 0;
  let ii = 0;

  for (let s = 0; s < nSegs; s++) {
    const seg = segments[s];
    const clusterIdx = clusterLabels[seg.cellIndex] || 0;
    const col = CLUSTER_PALETTE[clusterIdx % CLUSTER_PALETTE.length];

    dir.set(
      seg.end[0] - seg.start[0],
      seg.end[1] - seg.start[1],
      seg.end[2] - seg.start[2]
    );
    // A zero-length segment (start === end) makes normalize() produce NaN, which
    // would poison the whole position buffer and can hang/lose the GL context.
    // Skip degenerate segments rather than feeding NaN vertices to the GPU.
    if (dir.lengthSq() < 1e-12) {
      continue;
    }
    dir.normalize();

    if (Math.abs(dir.dot(up)) > 0.99) {
      perp.set(1, 0, 0);
    } else {
      perp.crossVectors(dir, up).normalize();
    }
    perp2.crossVectors(dir, perp).normalize();

    const r0 = seg.radius;
    const r1 = seg.radius * 0.75;
    const baseVi = vi;

    for (let ring = 0; ring < 2; ring++) {
      const cx = ring === 0 ? seg.start[0] : seg.end[0];
      const cy = ring === 0 ? seg.start[1] : seg.end[1];
      const cz = ring === 0 ? seg.start[2] : seg.end[2];
      const r = ring === 0 ? r0 : r1;

      for (let i = 0; i <= SIDES; i++) {
        const angle = (i / SIDES) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        circleVec.copy(perp).multiplyScalar(cos * r).addScaledVector(perp2, sin * r);
        norm.copy(circleVec).normalize();

        positions[vi * 3] = cx + circleVec.x;
        positions[vi * 3 + 1] = cy + circleVec.y;
        positions[vi * 3 + 2] = cz + circleVec.z;
        normals[vi * 3] = norm.x;
        normals[vi * 3 + 1] = norm.y;
        normals[vi * 3 + 2] = norm.z;

        // Certainty controls opacity, dominance controls brightness glow
        const certainty = seg.certainty !== undefined ? seg.certainty : 1.0;
        const dominance = seg.dominance !== undefined ? seg.dominance : 1.0;
        
        const brightness = 0.5 + 1.5 * dominance * (1 - seg.depth * 0.2);
        
        colors[vi * 4] = Math.min(1, col.r * brightness);
        colors[vi * 4 + 1] = Math.min(1, col.g * brightness);
        colors[vi * 4 + 2] = Math.min(1, col.b * brightness);
        colors[vi * 4 + 3] = 0.1 + 0.9 * certainty; // Alpha
        vi++;
      }
    }

    const ringStride = SIDES + 1;
    for (let i = 0; i < SIDES; i++) {
      const a = baseVi + i;
      const b = baseVi + i + 1;
      const c = baseVi + ringStride + i;
      const d = baseVi + ringStride + i + 1;
      indices[ii++] = a; indices[ii++] = c; indices[ii++] = b;
      indices[ii++] = b; indices[ii++] = c; indices[ii++] = d;
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 4));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    roughness: 0.4,
    metalness: 0.15,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  return new THREE.Mesh(geometry, material);
}
