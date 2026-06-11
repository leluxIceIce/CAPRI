/**
 * cube3d.ts — Three.js interactive 3D ecological cube renderer.
 *
 * Renders the 16×16×8 cube as stacked transparent layer planes,
 * supports per-layer opacity, rotation, zoom, and pixel click events.
 */

import * as THREE from 'three';
import type { CubeData } from './api';

// Variable colors matching CSS variables
const VAR_COLORS = [
  0x00ff9d,  // CHL  — green
  0xffd700,  // TSM  — gold
  0x00e5ff,  // APHY — cyan
  0xff7c29,  // ADG  — orange
  0xa855f7,  // BBP  — violet
  0xffec3d,  // PAR  — yellow
  0x4dabf7,  // KD490— blue
  0xff4757,  // SST  — red
];

export type PixelSelectedEvent = CustomEvent<{ x: number; y: number; values: number[] }>;

export class CubeRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;

  private cubeGroup: THREE.Group;
  private layerMeshes: THREE.Mesh[] = [];
  private layerMaterials: THREE.MeshBasicMaterial[] = [];
  private layerOpacities: number[] = new Array(8).fill(0.85);
  private layerVisible: boolean[] = new Array(8).fill(true);

  private isDragging = false;
  private prevMouse = { x: 0, y: 0 };
  private rotX = -0.35;
  private rotY = 0.55;
  private autoRotate = true;
  private animId = 0;

  private raycaster: THREE.Raycaster;
  private mouse2d = new THREE.Vector2();
  private clickPlanes: THREE.Mesh[] = [];

  private currentCube: CubeData | null = null;

  constructor(container: HTMLElement) {
    this.container = container;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cube-canvas';
    container.appendChild(this.canvas);

    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
    this.camera.position.set(0, 0, 4.5);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0x00e5ff, 0.8);
    dir.position.set(2, 3, 4);
    this.scene.add(ambient, dir);

    this.cubeGroup = new THREE.Group();
    this.scene.add(this.cubeGroup);

    this.raycaster = new THREE.Raycaster();

    this.resize();
    this.bindEvents();
    this.animate();
  }

  // ── Load cube data ──────────────────────────────────────────
  loadCube(cube: CubeData) {
    this.currentCube = cube;
    this.cubeGroup.clear();
    this.layerMeshes = [];
    this.layerMaterials = [];
    this.clickPlanes = [];

    const H = cube.shape[0]; // 16
    const W = cube.shape[1]; // 16
    const V = cube.shape[2]; // 8

    const planeW = 2.0;
    const planeH = 2.0;
    const layerSpacing = 0.28;
    const totalDepth = (V - 1) * layerSpacing;

    for (let v = 0; v < V; v++) {
      // Build texture from this layer
      const texData = new Uint8Array(W * H * 4);
      const color = new THREE.Color(VAR_COLORS[v % VAR_COLORS.length]);

      for (let r = 0; r < H; r++) {
        for (let c = 0; c < W; c++) {
          const val = cube.cube[r][c][v];
          const idx = (r * W + c) * 4;
          texData[idx]     = Math.round(color.r * 255 * val + 20);
          texData[idx + 1] = Math.round(color.g * 255 * val + 20);
          texData[idx + 2] = Math.round(color.b * 255 * val + 20);
          texData[idx + 3] = Math.round(180 * val + 40);
        }
      }

      const tex = new THREE.DataTexture(texData, W, H);
      tex.needsUpdate = true;

      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: this.layerOpacities[v],
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      this.layerMaterials.push(mat);

      const geo = new THREE.PlaneGeometry(planeW, planeH);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.z = -totalDepth / 2 + v * layerSpacing;
      mesh.userData = { layerIndex: v };

      // Wireframe edge
      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: VAR_COLORS[v % VAR_COLORS.length],
        transparent: true,
        opacity: 0.25,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      this.cubeGroup.add(mesh);
      this.layerMeshes.push(mesh);

      // Invisible click plane
      const clickGeo = new THREE.PlaneGeometry(planeW, planeH);
      const clickMat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
      const clickPlane = new THREE.Mesh(clickGeo, clickMat);
      clickPlane.position.copy(mesh.position);
      clickPlane.userData = { layerIndex: v, isClick: true };
      this.cubeGroup.add(clickPlane);
      this.clickPlanes.push(clickPlane);
    }

    // Bounding box wireframe
    const boxGeo = new THREE.BoxGeometry(planeW + 0.02, planeH + 0.02, totalDepth + layerSpacing);
    const boxEdges = new THREE.EdgesGeometry(boxGeo);
    const boxLine = new THREE.LineSegments(boxEdges, new THREE.LineBasicMaterial({
      color: 0x00e5ff, transparent: true, opacity: 0.15
    }));
    this.cubeGroup.add(boxLine);

    this.cubeGroup.rotation.x = this.rotX;
    this.cubeGroup.rotation.y = this.rotY;
  }

  // ── Layer controls ──────────────────────────────────────────
  setLayerOpacity(layerIdx: number, opacity: number) {
    this.layerOpacities[layerIdx] = opacity;
    if (this.layerMaterials[layerIdx]) {
      this.layerMaterials[layerIdx].opacity = opacity;
    }
  }

  setLayerVisible(layerIdx: number, visible: boolean) {
    this.layerVisible[layerIdx] = visible;
    if (this.layerMeshes[layerIdx]) {
      this.layerMeshes[layerIdx].visible = visible;
    }
  }

  setAutoRotate(on: boolean) { this.autoRotate = on; }

  resetCamera() {
    this.rotX = -0.35;
    this.rotY = 0.55;
    this.camera.position.z = 4.5;
    this.cubeGroup.rotation.set(this.rotX, this.rotY, 0);
  }

  isolateLayer(idx: number) {
    for (let v = 0; v < 8; v++) this.setLayerVisible(v, v === idx);
  }

  showAllLayers() { for (let v = 0; v < 8; v++) this.setLayerVisible(v, true); }

  // ── Animation ───────────────────────────────────────────────
  private animate = () => {
    this.animId = requestAnimationFrame(this.animate);
    if (this.autoRotate && !this.isDragging) {
      this.rotY += 0.003;
      this.cubeGroup.rotation.y = this.rotY;
    }
    this.renderer.render(this.scene, this.camera);
  };

  // ── Events ──────────────────────────────────────────────────
  private bindEvents() {
    const c = this.canvas;

    c.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { this.isDragging = false; });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      this.prevMouse = { x: e.clientX, y: e.clientY };
      this.rotY += dx * 0.008;
      this.rotX += dy * 0.008;
      this.rotX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotX));
      this.cubeGroup.rotation.x = this.rotX;
      this.cubeGroup.rotation.y = this.rotY;
    });

    c.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z = Math.max(2, Math.min(8, this.camera.position.z + e.deltaY * 0.005));
    }, { passive: false });

    c.addEventListener('click', (e) => {
      if (!this.currentCube) return;
      const rect = c.getBoundingClientRect();
      this.mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse2d, this.camera);
      const hits = this.raycaster.intersectObjects(this.clickPlanes);
      if (hits.length === 0) return;
      const hit = hits[0];
      const uv = hit.uv!;
      const H = this.currentCube.shape[0];
      const W = this.currentCube.shape[1];
      const px = Math.floor(uv.x * W);
      const py = Math.floor((1 - uv.y) * H);
      const x = Math.max(0, Math.min(W - 1, px));
      const y = Math.max(0, Math.min(H - 1, py));
      const values = this.currentCube.cube[y][x];
      this.container.dispatchEvent(new CustomEvent('pixel-selected', {
        detail: { x, y, values }, bubbles: true
      }));
      // Show coords overlay
      const coordEl = document.getElementById('pixel-coords');
      if (coordEl) {
        coordEl.style.display = 'block';
        coordEl.textContent = `📍 (${x}, ${y})`;
      }
    });

    window.addEventListener('resize', () => this.resize());
  }

  private resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    this.renderer.dispose();
    this.canvas.remove();
  }
}
