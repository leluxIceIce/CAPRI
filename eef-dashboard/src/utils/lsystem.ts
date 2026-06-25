export interface RootSegment {
  start: [number, number, number];
  end: [number, number, number];
  radius: number;
  depth: number;
  cellIndex: number;
  certainty: number; // 0 to 1, inverse of uncertainty
  dominance: number; // 0 to 1
  regimeId: number;
}

import { EcologicalGraph } from "../types";

function expandLSystem(depth: number): string {
  let s = "F";
  for (let i = 0; i < depth; i++) {
    let next = "";
    for (const ch of s) {
      next += ch === "F" ? "F[+F][-F]" : ch;
    }
    s = next;
  }
  return s;
}

interface TurtleState {
  x: number; y: number; z: number;
  dx: number; dy: number; dz: number;
  length: number;
  radius: number;
  depthLevel: number;
}

function crossProduct(
  ax: number, ay: number, az: number,
  bx: number, by: number, bz: number
): [number, number, number] {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function rotateAroundAxis(
  dx: number, dy: number, dz: number,
  ax: number, ay: number, az: number,
  angle: number
): [number, number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dot = dx * ax + dy * ay + dz * az;
  const [cx, cy, cz] = crossProduct(ax, ay, az, dx, dy, dz);
  return [
    dx * cos + cx * sin + ax * dot * (1 - cos),
    dy * cos + cy * sin + ay * dot * (1 - cos),
    dz * cos + cz * sin + az * dot * (1 - cos),
  ];
}

function interpretLSystem(
  lstr: string,
  cellIndex: number,
  startX: number, startY: number, startZ: number,
  yaw: number,
  branchAngle: number,
  trunkLength: number,
  baseRadius: number,
  certainty: number,
  dominance: number,
  regimeId: number
): RootSegment[] {
  const segments: RootSegment[] = [];

  const initDx = Math.sin(yaw) * 0.15;
  const initDy = -1;
  const initDz = Math.cos(yaw) * 0.15;
  const mag = Math.sqrt(initDx * initDx + initDy * initDy + initDz * initDz);

  const state: TurtleState = {
    x: startX, y: startY, z: startZ,
    dx: initDx / mag, dy: initDy / mag, dz: initDz / mag,
    length: trunkLength,
    radius: baseRadius,
    depthLevel: 0,
  };
  const stack: TurtleState[] = [];

  // Right vector for rotation axis
  let rx = -state.dz, ry = 0, rz = state.dx;
  const rmag = Math.sqrt(rx * rx + ry * ry + rz * rz) || 1;
  rx /= rmag; ry /= rmag; rz /= rmag;

  for (const ch of lstr) {
    switch (ch) {
      case "F": {
        const ex = state.x + state.dx * state.length;
        const ey = state.y + state.dy * state.length;
        const ez = state.z + state.dz * state.length;
        segments.push({
          start: [state.x, state.y, state.z],
          end: [ex, ey, ez],
          radius: state.radius,
          depth: state.depthLevel,
          cellIndex,
          certainty,
          dominance,
          regimeId
        });
        state.x = ex; state.y = ey; state.z = ez;
        break;
      }
      case "+": {
        const [ndx, ndy, ndz] = rotateAroundAxis(
          state.dx, state.dy, state.dz, rx, ry, rz, branchAngle
        );
        state.dx = ndx; state.dy = ndy; state.dz = ndz;
        break;
      }
      case "-": {
        const [ndx, ndy, ndz] = rotateAroundAxis(
          state.dx, state.dy, state.dz, rx, ry, rz, -branchAngle
        );
        state.dx = ndx; state.dy = ndy; state.dz = ndz;
        break;
      }
      case "[":
        stack.push({ ...state });
        state.depthLevel++;
        state.length *= 0.7;
        state.radius *= 0.65;
        break;
      case "]":
        if (stack.length > 0) {
          const prev = stack.pop()!;
          Object.assign(state, prev);
        }
        break;
    }
  }
  return segments;
}

export function generateAllRoots(
  projections: Float64Array,
  eigenvalues: Float64Array,
  gridSize: number,
  spacing: number,
  maxDepth: number
): RootSegment[] {
  const n = gridSize * gridSize;
  const allSegments: RootSegment[] = [];

  // Global eigenvalue stats for depth mapping
  const totalLambda = eigenvalues.reduce((s, v) => s + Math.max(0, v), 0) || 1;
  const pc1Ratio = Math.max(0, eigenvalues[0]) / totalLambda;
  const depth = Math.max(1, Math.min(maxDepth, Math.ceil(pc1Ratio * maxDepth)));

  const lstr = expandLSystem(depth);

  // Compute projection norms for trunk length scaling
  let maxNorm = 0;
  let maxP3 = 0;
  const norms = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const p1 = projections[i * 3];
    const p2 = projections[i * 3 + 1];
    const p3 = projections[i * 3 + 2];
    norms[i] = Math.sqrt(p1 * p1 + p2 * p2 + p3 * p3);
    if (norms[i] > maxNorm) maxNorm = norms[i];
    if (Math.abs(p3) > maxP3) maxP3 = Math.abs(p3);
  }
  if (maxNorm < 1e-10) maxNorm = 1;
  if (maxP3 < 1e-10) maxP3 = 1;

  // Bottom layer y position (layer 0 = CHL, out of 9 total layers)
  const anchorY = (0 - (9 - 1) / 2) * spacing;

  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const worldX = (col / (gridSize - 1)) * 16 - 8;
    const worldZ = (row / (gridSize - 1)) * 16 - 8;

    const p1 = projections[i * 3];
    const p2 = projections[i * 3 + 1];
    const p3 = projections[i * 3 + 2];

    const yaw = Math.atan2(p2, p1);
    const branchAngle = (15 + 25 * Math.abs(p3) / maxP3) * Math.PI / 180;
    const trunkLength = 0.3 + 0.7 * (norms[i] / maxNorm);

    const segments = interpretLSystem(
      lstr, i,
      worldX, anchorY - 0.5, worldZ,
      yaw, branchAngle, trunkLength, 0.06,
      1.0, 1.0, 0 // Local cube defaults
    );
    for (const seg of segments) allSegments.push(seg);
  }

  return allSegments;
}

// Epic 12: Generates the macroscopic root structure connecting tiles
export function generateGraphRoots(graph: EcologicalGraph, anchorY: number): RootSegment[] {
  const allSegments: RootSegment[] = [];

  // 1. Trunks (Edges between nodes)
  for (const edge of graph.edges) {
    const s = graph.nodes[edge.source];
    const t = graph.nodes[edge.target];
    
    // Calculate certainty from weight
    const certainty = edge.weight / (graph.maxWeight || 1);
    
    // Draw an arc between nodes to represent the trunk
    const midX = (s.worldX + t.worldX) / 2;
    const midZ = (s.worldZ + t.worldZ) / 2;
    const dist = Math.sqrt(Math.pow(s.worldX - t.worldX, 2) + Math.pow(s.worldZ - t.worldZ, 2));
    
    // Arch height based on distance
    const archY = anchorY + (edge.isSpatial ? 1.0 : dist * 0.15);
    
    allSegments.push({
      start: [s.worldX, anchorY, s.worldZ],
      end: [midX, archY, midZ],
      radius: 0.2 + certainty * 0.3,
      depth: 0,
      cellIndex: s.id,
      certainty: certainty,
      dominance: certainty,
      regimeId: s.regimeId
    });
    
    allSegments.push({
      start: [midX, archY, midZ],
      end: [t.worldX, anchorY, t.worldZ],
      radius: 0.2 + certainty * 0.3,
      depth: 0,
      cellIndex: t.id,
      certainty: certainty,
      dominance: certainty,
      regimeId: t.regimeId
    });
  }

  // 2. Roots (Nodes downwards into the latent space)
  const lstr = expandLSystem(3); // 3 levels for node roots
  
  for (const node of graph.nodes) {
    // Dominance is max embedding value
    let dominance = 0;
    for(let i=0; i<9; i++) if (node.embedding[i] > dominance) dominance = node.embedding[i];
    
    const branchAngle = (20 + dominance * 15) * Math.PI / 180;
    const yaw = node.regimeId * Math.PI * 0.25; // Yaw based on regime
    
    const nodeRoots = interpretLSystem(
      lstr, node.id,
      node.worldX, anchorY, node.worldZ,
      yaw, branchAngle, 1.5, 0.15,
      1.0, dominance, node.regimeId
    );
    for (const seg of nodeRoots) allSegments.push(seg);
  }

  return allSegments;
}
