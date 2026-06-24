// EEF Gate A Stage 2 — Relationship Graph Geometry
//
// Builds a thin-cylinder "edge" mesh connecting neighboring grid cells whose
// relationship-tensor channel value exceeds a threshold. Mirrors the merged
// BufferGeometry tube pattern used by rootGeometry.ts (buildRootMesh).

import * as THREE from "three";
import { getRelationshipChannelGrid, type RelationshipTensor } from "./relationshipTensor";
import { getScalarFieldColor } from "./colormaps";

const SIDES = 6;

export interface RelationshipEdge {
  start: [number, number, number];
  end: [number, number, number];
  weight: number; // 0..1
}

// Maps a (row, col) grid cell to its world-space (x, z) position, matching
// the PlaneGeometry(16,16) convention used across rootGeometry.ts/lsystem.ts.
function cellToWorld(row: number, col: number, gridSize: number): [number, number] {
  const x = (col / (gridSize - 1)) * 16 - 8;
  const z = (row / (gridSize - 1)) * 16 - 8;
  return [x, z];
}

export function buildRelationshipEdges(
  tensor: RelationshipTensor,
  channelIdx: number,
  gridSize: number,
  spacing: number,
  threshold: number
): RelationshipEdge[] {
  const grid = getRelationshipChannelGrid(tensor, channelIdx);

  // Position edges above the existing 7-layer terrain stack, level with /
  // just above the spatial overlay plane (overlay sits at 4.5*spacing).
  const y = 5 * spacing;

  const edges: RelationshipEdge[] = [];

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const idx = r * gridSize + c;
      const value = grid[idx];

      // Right neighbor (r, c+1)
      if (c + 1 < gridSize) {
        const rightIdx = r * gridSize + (c + 1);
        const weight = (value + grid[rightIdx]) / 2;
        if (weight > threshold) {
          const [x0, z0] = cellToWorld(r, c, gridSize);
          const [x1, z1] = cellToWorld(r, c + 1, gridSize);
          edges.push({ start: [x0, y, z0], end: [x1, y, z1], weight });
        }
      }

      // Down neighbor (r+1, c)
      if (r + 1 < gridSize) {
        const downIdx = (r + 1) * gridSize + c;
        const weight = (value + grid[downIdx]) / 2;
        if (weight > threshold) {
          const [x0, z0] = cellToWorld(r, c, gridSize);
          const [x1, z1] = cellToWorld(r + 1, c, gridSize);
          edges.push({ start: [x0, y, z0], end: [x1, y, z1], weight });
        }
      }
    }
  }

  return edges;
}

export function buildRelationshipMesh(edges: RelationshipEdge[]): THREE.Mesh {
  const nEdges = edges.length;
  const vertsPerEdge = (SIDES + 1) * 2;
  const trisPerEdge = SIDES * 2;
  const totalVerts = nEdges * vertsPerEdge;
  const totalIndices = nEdges * trisPerEdge * 3;

  const positions = new Float32Array(totalVerts * 3);
  const normals = new Float32Array(totalVerts * 3);
  const colors = new Float32Array(totalVerts * 3);
  const indices = new Uint32Array(totalIndices);

  const up = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3();
  const perp = new THREE.Vector3();
  const perp2 = new THREE.Vector3();
  const circleVec = new THREE.Vector3();
  const norm = new THREE.Vector3();

  let vi = 0;
  let ii = 0;

  for (let e = 0; e < nEdges; e++) {
    const edge = edges[e];
    const radius = 0.02 + 0.08 * edge.weight;
    const { r: cr, g: cg, b: cb } = getScalarFieldColor(edge.weight);
    const colR = cr / 255;
    const colG = cg / 255;
    const colB = cb / 255;

    dir.set(
      edge.end[0] - edge.start[0],
      edge.end[1] - edge.start[1],
      edge.end[2] - edge.start[2]
    ).normalize();

    if (Math.abs(dir.dot(up)) > 0.99) {
      perp.set(1, 0, 0);
    } else {
      perp.crossVectors(dir, up).normalize();
    }
    perp2.crossVectors(dir, perp).normalize();

    const baseVi = vi;

    for (let ring = 0; ring < 2; ring++) {
      const cx = ring === 0 ? edge.start[0] : edge.end[0];
      const cy = ring === 0 ? edge.start[1] : edge.end[1];
      const cz = ring === 0 ? edge.start[2] : edge.end[2];

      for (let i = 0; i <= SIDES; i++) {
        const angle = (i / SIDES) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        circleVec.copy(perp).multiplyScalar(cos * radius).addScaledVector(perp2, sin * radius);
        norm.copy(circleVec).normalize();

        positions[vi * 3] = cx + circleVec.x;
        positions[vi * 3 + 1] = cy + circleVec.y;
        positions[vi * 3 + 2] = cz + circleVec.z;
        normals[vi * 3] = norm.x;
        normals[vi * 3 + 1] = norm.y;
        normals[vi * 3 + 2] = norm.z;

        colors[vi * 3] = colR;
        colors[vi * 3 + 1] = colG;
        colors[vi * 3 + 2] = colB;
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
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    transparent: true,
    roughness: 0.6,
    metalness: 0.15,
  });

  return new THREE.Mesh(geometry, material);
}
