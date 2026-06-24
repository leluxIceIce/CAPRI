import React, { useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {
  DataCube,
  LayerState,
  VARIABLE_METADATA,
  SIGNED_VARIABLES,
  VariableName,
  RootVisualizationState,
  SpatialOverlayState,
  RelationshipGraphState,
  ConfidenceOverlayState
} from "../types";
import { interpolateColormap, generateRampFromHex, generateRampFromTwoHex, getScalarFieldColor } from "../utils/colormaps";
import { type RootAnalysis } from "../utils/eigenmath";
import { generateAllRoots, generateGraphRoots } from "../utils/lsystem";
import { buildRootMesh } from "../utils/rootGeometry";
import { type RelationshipTensor, relationshipChannelIndex } from "../utils/relationshipTensor";
import { buildRelationshipEdges, buildRelationshipMesh } from "../utils/relationshipGeometry";
import { ZoneClass, type BloomHotspot } from "../utils/bloomDetector";

export interface ThreeViewportHandle {
  exportLayerPng: (varName: VariableName) => void;
}

export interface PixelClickEvent {
  gridSize: number;
  row: number;
  col: number;
}

interface ThreeViewportProps {
  dataCube: DataCube;
  layerState: Record<VariableName, LayerState>;
  spacing: number;
  displacementGain: number;
  showTerrain: boolean;
  showWireframe: boolean;
  showLabels: boolean;
  cameraPreset: "iso" | "top" | "profile";
  customColors?: Partial<Record<VariableName, string>>;
  customColorsFrom?: Partial<Record<VariableName, string>>;
  rootAnalysis?: RootAnalysis;
  ecologicalGraph?: any; // To avoid strict type issues if missing in some imports
  rootState?: RootVisualizationState;
  spatialOverlay?: SpatialOverlayState;
  spatialOverlayGrid?: Float32Array | null;
  relationshipGraph?: RelationshipGraphState;
  relationshipTensor?: RelationshipTensor | null;
  confidenceOverlay?: ConfidenceOverlayState;
  confidenceOverlayGrid?: number[][];
  latentOverlayVisible?: boolean;
  bloomOverlay?: { visible: boolean; opacity: number };
  bloomZones?: Uint8Array | null;
  bloomHotspots?: BloomHotspot[];
  onPixelClick?: (event: PixelClickEvent) => void;
}

function ThreeViewportInner(
  {
    dataCube,
    layerState,
  spacing,
  displacementGain,
  showTerrain,
  showWireframe,
  showLabels,
  cameraPreset,
  customColors,
  customColorsFrom,
  rootAnalysis,
  ecologicalGraph,
  rootState,
  spatialOverlay,
  spatialOverlayGrid,
  relationshipGraph,
  relationshipTensor,
  confidenceOverlay,
  confidenceOverlayGrid,
  latentOverlayVisible = true,
  bloomOverlay,
  bloomZones,
  bloomHotspots,
  onPixelClick,
  }: ThreeViewportProps,
  ref: React.Ref<ThreeViewportHandle>
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep references to Three.js elements for direct animation updates (saves re-mounting overhead!)
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshesGroupRef = useRef<THREE.Group | null>(null);
  const rootMeshRef = useRef<THREE.Mesh | null>(null);
  const prevRootAnalysisRef = useRef<RootAnalysis | null>(null);
  const prevEcologicalGraphRef = useRef<any>(null);
  const prevRootDepthRef = useRef<number | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);

  // Spatial overlay plane (Gate A Stage 2)
  const spatialOverlayMeshRef = useRef<THREE.Mesh | null>(null);
  const spatialOverlayPixelBufferRef = useRef<Uint8ClampedArray | null>(null);

  // Confidence overlay plane (Gate 0.5 Stage 6)
  const confidenceOverlayMeshRef = useRef<THREE.Mesh | null>(null);
  const confidenceOverlayPixelBufferRef = useRef<Uint8ClampedArray | null>(null);

  // Latent-space geometric overlay (above CHL_disagreement layer)
  const latentOverlayGroupRef = useRef<THREE.Group | null>(null);
  const prevLatentAnalysisRef = useRef<RootAnalysis | null>(null);

  // Bloom-risk heatmap overlay + hotspot markers (Squad F)
  const bloomOverlayGroupRef = useRef<THREE.Group | null>(null);

  // Relationship graph mesh (Gate A Stage 2)
  const relationshipMeshRef = useRef<THREE.Mesh | null>(null);
  const prevRelationshipTensorRef = useRef<RelationshipTensor | null>(null);
  const prevRelationshipChannelRef = useRef<string | null>(null);
  const prevRelationshipThresholdRef = useRef<number | null>(null);
  const layersMeshesMap = useRef<Map<string, {
    mesh: THREE.Mesh;
    wireframe: THREE.LineSegments;
    border: THREE.LineSegments;
    label: THREE.Sprite;
    textureCanvas: HTMLCanvasElement;
    pixelBuffer: Uint8ClampedArray;
  }>>(new Map());

  // Expose PNG export imperative handle
  useImperativeHandle(ref, () => ({
    exportLayerPng(varName: VariableName): void {
      const data = layersMeshesMap.current.get(varName);
      if (!data) return;
      const { textureCanvas } = data;
      const tmp = document.createElement("canvas");
      tmp.width = 200;
      tmp.height = 200;
      const ctx2 = tmp.getContext("2d");
      if (!ctx2) return;
      ctx2.imageSmoothingEnabled = false;
      ctx2.drawImage(textureCanvas, 0, 0, 200, 200);
      const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const a = document.createElement("a");
      a.href = tmp.toDataURL("image/png");
      a.download = `EEF_${varName}_${ts}.png`;
      a.click();
    },
  }));

  // 1. Initial Scene Setup
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 450;

    // Create Scene — light canvas to match the redesigned app shell (#EEF2F8).
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEEF2F8);
    // Soft light fog matching the background so distant geometry fades into the
    // light canvas instead of darkening. Pushed back so it never muddies the view.
    scene.fog = new THREE.Fog(0xEEF2F8, 90, 220);
    sceneRef.current = scene;

    // Create Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 500);
    camera.position.set(22, 24, 30);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0xEEF2F8, 1);

    // Effect Composer for Bloom (Glassmorphic Perception Layer)
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.18, 0.4, 0.95);
    // On a LIGHT background additive bloom blows everything toward white, so it is
    // kept very restrained: a high luminance threshold means only the genuinely
    // bright accent elements (hotspot dots, high-dominance root cores) glow faintly.
    // The terrain planes and labels must stay crisp and readable, never hazed out.
    bloomPass.threshold = 0.95;
    bloomPass.strength = 0.18; // Barely-there glow reserved for the brightest accents only
    bloomPass.radius = 0.3;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    // Lights — rebalanced for a LIGHT scene. A bright hemisphere fill (white sky,
    // cool light-slate ground bounce) keeps the lit terrain readable against the
    // light canvas, while a softened key light gives gentle directional shading
    // without washing the planes out to flat white.
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xC7D2E2, 0.85);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.55);
    dirLight1.position.set(15, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xC9D8F0, 0.22);
    dirLight2.position.set(-20, 20, -10);
    scene.add(dirLight2);

    // Grid Floor — calm slate hairlines on the light canvas (dark-on-light),
    // replacing the old neon-on-dark grid.
    const gridHelper = new THREE.GridHelper(32, 32, 0x1B2740, 0x8492AD);
    const gridMat = gridHelper.material as THREE.Material | THREE.Material[];
    if (Array.isArray(gridMat)) {
      gridMat.forEach((m) => { m.transparent = true; m.opacity = 0.22; });
    } else {
      gridMat.transparent = true;
      gridMat.opacity = 0.22;
    }
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // Group for Stacked Layers
    const meshesGroup = new THREE.Group();
    scene.add(meshesGroup);
    meshesGroupRef.current = meshesGroup;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 8;
    controls.maxDistance = 100;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.screenSpacePanning = true;
    // Prevent OrbitControls from stealing wheel events and collapsing the page layout
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };
    controlsRef.current = controls;

    // Animation Loop
    let animationFrameId: number;
    const tick = () => {
      controls.update();
      
      // Face labels towards scientific camera viewport
      layersMeshesMap.current.forEach(({ label }) => {
        if (label.visible) {
          label.quaternion.copy(camera.quaternion);
        }
      });

      if (composerRef.current) {
        composerRef.current.render();
      } else {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    // Resize Handler — observes the container element directly so resizable
    // panel drags (which don't fire window "resize") are picked up too.
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composerRef.current) composerRef.current.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Pixel Click Detection (Gate 1: Pixel Inspector)
    const handleCanvasClick = (event: MouseEvent) => {
      if (!onPixelClick || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = -(y / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(normalizedX, normalizedY);
      raycaster.setFromCamera(mouse, camera);

      // Check intersection with layer meshes
      const meshes = Array.from(layersMeshesMap.current.values()).map(({ mesh }) => mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const intersection = intersects[0];
        const gridSize = dataCube.gridSize;

        // Get the geometry face index and convert to grid coordinates
        if (intersection.face) {
          const faceIndex = intersection.faceIndex ?? 0;
          const row = Math.floor(faceIndex / (gridSize - 1) / 2);
          const col = Math.floor((faceIndex / 2) % (gridSize - 1));

          // Clamp to valid grid bounds
          const clampedRow = Math.min(Math.max(row, 0), gridSize - 1);
          const clampedCol = Math.min(Math.max(col, 0), gridSize - 1);

          onPixelClick({
            gridSize,
            row: clampedRow,
            col: clampedCol
          });
        }
      }
    };

    canvasRef.current?.addEventListener("click", handleCanvasClick);

    // Cleanup
    return () => {
      canvasRef.current?.removeEventListener("click", handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      controls.dispose();
      
      // Dispose layer geometries & textures
      layersMeshesMap.current.forEach(({ mesh, wireframe, border, label }) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
        wireframe.geometry.dispose();
        (wireframe.material as THREE.Material).dispose();
        border.geometry.dispose();
        (border.material as THREE.Material).dispose();
        label.geometry.dispose();
        label.material.dispose();
      });
      layersMeshesMap.current.clear();

      // Dispose spatial overlay plane
      if (spatialOverlayMeshRef.current) {
        spatialOverlayMeshRef.current.geometry.dispose();
        const mat = spatialOverlayMeshRef.current.material;
        if (Array.isArray(mat)) {
          mat.forEach((m) => m.dispose());
        } else {
          mat.dispose();
          if (mat instanceof THREE.MeshStandardMaterial && mat.map) {
            mat.map.dispose();
          }
        }
        spatialOverlayMeshRef.current = null;
      }

      // Dispose confidence overlay plane
      if (confidenceOverlayMeshRef.current) {
        confidenceOverlayMeshRef.current.geometry.dispose();
        const cmat = confidenceOverlayMeshRef.current.material;
        if (Array.isArray(cmat)) {
          cmat.forEach((m) => m.dispose());
        } else {
          cmat.dispose();
          if (cmat instanceof THREE.MeshStandardMaterial && cmat.map) {
            cmat.map.dispose();
          }
        }
        confidenceOverlayMeshRef.current = null;
      }

      // Dispose relationship graph mesh
      if (relationshipMeshRef.current) {
        relationshipMeshRef.current.geometry.dispose();
        (relationshipMeshRef.current.material as THREE.Material).dispose();
        relationshipMeshRef.current = null;
      }
    };
  }, []);

  // 2. Camera Preset Adjustments
  useEffect(() => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (cameraPreset === "top") {
      camera.position.set(0, 36, 0.1);
      controls.target.set(0, 0, 0);
    } else if (cameraPreset === "profile") {
      camera.position.set(38, 0, 0);
      controls.target.set(0, 0, 0);
    } else {
      // Isometric view
      camera.position.set(22, 24, 30);
      controls.target.set(0, 0, 0);
    }
    controls.update();
  }, [cameraPreset]);

  // 3. Populate or Update Stack Layers
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const keys = Object.keys(VARIABLE_METADATA) as VariableName[];
    const gridSize = dataCube.gridSize;

    // Check if we need to reconstruct or simply updates geometry arrays & textures
    let reCreateNeeded = layersMeshesMap.current.size !== keys.length;

    if (reCreateNeeded) {
      // Empty the group first
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }
      layersMeshesMap.current.clear();

      keys.forEach((varName, layerIdx) => {
        const metadata = VARIABLE_METADATA[varName];
        
        // 2D Heatmap texture canvas — one pixel per data cell, GPU-upscaled with
        // bilinear filtering for a smooth gradient instead of per-frame canvas redraws
        const texCanvas = document.createElement("canvas");
        texCanvas.width = gridSize;
        texCanvas.height = gridSize;

        const texture = new THREE.CanvasTexture(texCanvas);
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearFilter;
        const pixelBuffer = new Uint8ClampedArray(gridSize * gridSize * 4);

        // Custom plane geometry (20x20 cell grid)
        const planeGeo = new THREE.PlaneGeometry(16, 16, gridSize - 1, gridSize - 1);

        // Core visual material
        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: layerState[varName]?.opacity ?? 0.7,
          side: THREE.DoubleSide,
          roughness: 0.45,
          metalness: 0.1,
          emissive: new THREE.Color(metadata.color),
          emissiveIntensity: 0.05
        });

        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = -Math.PI / 2;

        // Floating border wireframe
        const borderGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(16, 0.05, 16));
        const borderMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(metadata.color),
          transparent: true,
          opacity: 0.4
        });
        const border = new THREE.LineSegments(borderGeo, borderMat);

        // Neon high-frequency wireframe
        const wireGeo = new THREE.WireframeGeometry(planeGeo);
        const wireMat = new THREE.LineBasicMaterial({
          color: new THREE.Color(metadata.color),
          transparent: true,
          opacity: 0.22
        });
        const wireframe = new THREE.LineSegments(wireGeo, wireMat);
        wireframe.rotation.x = -Math.PI / 2;

        // Overlay Label Billboard Sprite
        const labelCanvas = document.createElement("canvas");
        labelCanvas.width = 192;
        labelCanvas.height = 40;
        const lctx = labelCanvas.getContext("2d");
        if (lctx) {
          // Light frosted chip with a calm slate hairline, so the label reads as a
          // crisp dark-on-light tag on the light scene (matches the app's glass UI).
          // Near-opaque so the chip fully occludes the busy translucent terrain
          // layers behind it and the label stays legible.
          lctx.fillStyle = "rgba(255, 255, 255, 0.96)";
          lctx.roundRect(0, 0, 192, 40, 6);
          lctx.fill();
          lctx.lineWidth = 1.5;
          lctx.strokeStyle = "rgba(23, 39, 64, 0.18)";
          lctx.stroke();

          // Primary deep-slate text (#1B2740)
          lctx.fillStyle = "#1B2740";
          lctx.font = "bold 15px sans-serif";
          lctx.textAlign = "left";
          lctx.textBaseline = "middle";
          lctx.fillText(varName.replace(/_/g, " "), 12, 20);

          // Secondary muted-slate caption (#51607A)
          lctx.fillStyle = "rgba(81, 96, 122, 0.85)";
          lctx.font = "12px monospace";
          lctx.fillText(metadata.label.length > 15 ? metadata.label.substring(0, 15) + "..." : metadata.label, 52, 20);
        }

        const labelTex = new THREE.CanvasTexture(labelCanvas);
        const labelMat = new THREE.SpriteMaterial({
          map: labelTex,
          transparent: true,
          opacity: 1,
          depthTest: false
        });
        const labelSprite = new THREE.Sprite(labelMat);
        labelSprite.scale.set(4.5, 0.94, 1);

        // Append to meshes group
        group.add(mesh);
        group.add(wireframe);
        group.add(border);
        group.add(labelSprite);

        layersMeshesMap.current.set(varName, {
          mesh,
          wireframe,
          border,
          label: labelSprite,
          textureCanvas: texCanvas,
          pixelBuffer
        });
      });
    }

    // Now, let's update data: height displacement & colors for the layers
    keys.forEach((varName, layerIdx) => {
      const data = layersMeshesMap.current.get(varName);
      if (!data) return;

      const { mesh, wireframe, border, label, textureCanvas, pixelBuffer } = data;
      const grid = dataCube.channels[varName];
      const stats = dataCube.stats[varName];

      const ls = layerState[varName] || { visible: true, opacity: 0.7 };

      // S1: normalize to [0,1] for colormapping. Signed variables (CHL_disagreement)
      // are stored as ~[-2,+2]; map [-1.5,+1.5] → [0,1] so midpoint = agreement.
      const isSigned = SIGNED_VARIABLES.has(varName);
      const normalizedGrid: number[] = new Array(gridSize * gridSize);
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const val = grid[r][c];
          normalizedGrid[r * gridSize + c] = isSigned
            ? Math.max(0, Math.min(1, (val + 1.5) / 3.0))
            : Math.max(0, Math.min(1, val));
        }
      }

      // S3: vertex displacement — normalized × displacementGain
      const planeGeo = mesh.geometry as THREE.PlaneGeometry;
      const posAttr = planeGeo.attributes.position;
      const wireGeo = wireframe.geometry as THREE.WireframeGeometry;
      const wirePosAttr = wireGeo.attributes.position;

      for (let i = 0; i < normalizedGrid.length; i++) {
        const height = showTerrain ? normalizedGrid[i] * displacementGain : 0;
        posAttr.setZ(i, height);
        wirePosAttr.setZ(i, height);
      }
      posAttr.needsUpdate = true;
      planeGeo.computeVertexNormals();
      wirePosAttr.needsUpdate = true;

      // S2: hue-saturation texture — white/transparent at 0, full variable hue at 1.
      // Written directly into a per-cell pixel buffer (one putImageData call) instead
      // of hundreds of fillRect/stroke calls — the prior approach was the main cause
      // of per-tick main-thread stutter. Bilinear texture filtering smooths the result.
      const customHex = customColors?.[varName];
      const customFromHex = customColorsFrom?.[varName];
      const customStops = customHex && customFromHex
        ? generateRampFromTwoHex(customFromHex, customHex)
        : customHex
          ? generateRampFromHex(customHex)
          : undefined;
      const ctx = textureCanvas.getContext("2d");
      if (ctx) {
        // Pre-fetch grids for turbidity residual composite (CHL_disagreement only)
        const tsmGrid = varName === "CHL_disagreement" ? dataCube.channels.TSM : null;
        const aphyGrid = varName === "CHL_disagreement" ? dataCube.channels.aphy : null;
        const kdGrid = varName === "CHL_disagreement" ? dataCube.channels.KD490 : null;
        const tsmStats = varName === "CHL_disagreement" ? dataCube.stats.TSM : null;
        const aphyStats = varName === "CHL_disagreement" ? dataCube.stats.aphy : null;
        const kdStats = varName === "CHL_disagreement" ? dataCube.stats.KD490 : null;

        for (let i = 0; i < normalizedGrid.length; i++) {
          const tc = normalizedGrid[i];
          let { r: cr, g: cg, b: cb } = interpolateColormap(varName, tc, customStops);

          // M2: turbidity residual green composite — inorganic suspension not explained
          // by biological absorption or expected attenuation lifts the green channel.
          if (tsmGrid && aphyGrid && kdGrid && tsmStats && aphyStats && kdStats) {
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            const zTSM  = tsmStats.std  > 1e-10 ? (tsmGrid[row][col]  - tsmStats.mean)  / tsmStats.std  : 0;
            const zAphy = aphyStats.std > 1e-10 ? (aphyGrid[row][col] - aphyStats.mean) / aphyStats.std : 0;
            const zKD   = kdStats.std   > 1e-10 ? (kdGrid[row][col]   - kdStats.mean)   / kdStats.std   : 0;
            const R = zTSM - 0.35 * zAphy - 0.45 * zKD;
            const greenBoost = Math.min(255, Math.round(Math.max(0, R / 3.0) * 110));
            cg = Math.min(255, cg + greenBoost);
          }

          const a = 0.05 + tc * 0.90;
          const o = i * 4;
          pixelBuffer[o] = cr;
          pixelBuffer[o + 1] = cg;
          pixelBuffer[o + 2] = cb;
          pixelBuffer[o + 3] = Math.round(a * 255);
        }
        ctx.putImageData(new ImageData(pixelBuffer, gridSize, gridSize), 0, 0);

        if (mesh.material instanceof THREE.MeshStandardMaterial && mesh.material.map) {
          mesh.material.map.needsUpdate = true;
        }
      }

      // 3. Positioning and visibility of layers
      // Vertical stacked positions symmetrically centered
      const yPos = (layerIdx - (keys.length - 1) / 2) * spacing;
      
      mesh.position.y = yPos;
      border.position.y = yPos;
      wireframe.position.y = yPos;
      label.position.set(-11.5, yPos, 0);

      // Visibility controls
      mesh.visible = ls.visible;
      border.visible = ls.visible;
      wireframe.visible = ls.visible && showWireframe;
      label.visible = ls.visible && showLabels;

      // Opacity updates
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.opacity = ls.opacity;
      }

      // Apply custom accent color (if set) to emissive tint, border and wireframe
      const accentColor = new THREE.Color(customHex || VARIABLE_METADATA[varName].color);
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissive.copy(accentColor);
      }
      (border.material as THREE.LineBasicMaterial).color.copy(accentColor);
      (wireframe.material as THREE.LineBasicMaterial).color.copy(accentColor);
    });

  }, [dataCube, layerState, spacing, displacementGain, showTerrain, showWireframe, showLabels, customColors, customColorsFrom]);

  // Root system mesh lifecycle
  useEffect(() => {
    const scene = sceneRef.current;
    const group = meshesGroupRef.current;
    if (!scene || !group) return;

    const visible = rootState?.visible ?? false;
    const depth = rootState?.depth ?? 3;
    const opacity = rootState?.opacity ?? 0.85;

    if (!visible || !rootAnalysis) {
      if (rootMeshRef.current) {
        group.remove(rootMeshRef.current);
        rootMeshRef.current.geometry.dispose();
        (rootMeshRef.current.material as THREE.Material).dispose();
        rootMeshRef.current = null;
      }
      prevRootAnalysisRef.current = null;
      prevRootDepthRef.current = null;
      return;
    }

    const needsRebuild =
      !rootMeshRef.current ||
      (ecologicalGraph ? prevEcologicalGraphRef.current !== ecologicalGraph : prevRootAnalysisRef.current !== rootAnalysis) ||
      prevRootDepthRef.current !== depth;

    if (needsRebuild) {
      if (rootMeshRef.current) {
        group.remove(rootMeshRef.current);
        rootMeshRef.current.geometry.dispose();
        (rootMeshRef.current.material as THREE.Material).dispose();
        rootMeshRef.current = null;
      }

      prevRootAnalysisRef.current = rootAnalysis;
      prevEcologicalGraphRef.current = ecologicalGraph;
      prevRootDepthRef.current = depth;

      let segments;
      if (ecologicalGraph) {
        // Epic 12/14: Use graph roots
        const numLayers = Object.keys(VARIABLE_METADATA).length;
        const anchorY = (0 - (numLayers - 1) / 2) * spacing;
        segments = generateGraphRoots(ecologicalGraph, anchorY);
      } else {
        // Local tile roots fallback
        segments = generateAllRoots(
          rootAnalysis.projections,
          rootAnalysis.eigenvalues,
          dataCube.gridSize,
          spacing,
          depth
        );
      }

      if (segments.length === 0) return;

      // Since graph roots might not have valid cluster labels per node in the same format,
      // we pass a dummy array or modify buildRootMesh to not depend solely on it if missing.
      // Actually, rootGeometry.ts buildRootMesh handles cellIndex.
      const clusterLabels = rootAnalysis ? rootAnalysis.clusterLabels : new Uint8Array(segments.length).fill(0);
      const mesh = buildRootMesh(segments, clusterLabels);
      group.add(mesh);
      rootMeshRef.current = mesh;
    }

    if (rootMeshRef.current?.material instanceof THREE.MeshPhysicalMaterial || rootMeshRef.current?.material instanceof THREE.MeshStandardMaterial) {
      rootMeshRef.current.material.opacity = opacity;
    }
  }, [rootAnalysis, ecologicalGraph, rootState?.visible, rootState?.depth, rootState?.opacity, spacing, dataCube.gridSize]);

  // Spatial overlay plane lifecycle (Gate A Stage 2)
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const visible = spatialOverlay?.visible ?? false;
    const opacity = spatialOverlay?.opacity ?? 0.7;
    const gridSize = dataCube.gridSize;

    if (!visible || !spatialOverlayGrid) {
      if (spatialOverlayMeshRef.current) {
        group.remove(spatialOverlayMeshRef.current);
        spatialOverlayMeshRef.current.geometry.dispose();
        const mat = spatialOverlayMeshRef.current.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.map?.dispose();
          mat.dispose();
        }
        spatialOverlayMeshRef.current = null;
        spatialOverlayPixelBufferRef.current = null;
      }
      return;
    }

    // Create the overlay mesh on first use
    if (!spatialOverlayMeshRef.current) {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = gridSize;
      texCanvas.height = gridSize;

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;

      const planeGeo = new THREE.PlaneGeometry(16, 16, gridSize - 1, gridSize - 1);
      const planeMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        roughness: 0.45,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = -Math.PI / 2;
      const _numLayersS = Object.keys(VARIABLE_METADATA).length;
      mesh.position.y = ((_numLayersS - 1) / 2 + 1.5) * spacing;

      group.add(mesh);
      spatialOverlayMeshRef.current = mesh;
      spatialOverlayPixelBufferRef.current = new Uint8ClampedArray(gridSize * gridSize * 4);
    }

    const mesh = spatialOverlayMeshRef.current;
    const pixelBuffer = spatialOverlayPixelBufferRef.current!;

    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.opacity = opacity;
      const texture = mesh.material.map as THREE.CanvasTexture;
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (let i = 0; i < spatialOverlayGrid.length; i++) {
          const { r, g, b } = getScalarFieldColor(spatialOverlayGrid[i]);
          const o = i * 4;
          pixelBuffer[o] = r;
          pixelBuffer[o + 1] = g;
          pixelBuffer[o + 2] = b;
          pixelBuffer[o + 3] = 255;
        }
        ctx.putImageData(new ImageData(pixelBuffer, gridSize, gridSize), 0, 0);
        texture.needsUpdate = true;
      }
    }

    // Reposition in case spacing changed
    const _numLayersS2 = Object.keys(VARIABLE_METADATA).length;
    mesh.position.y = ((_numLayersS2 - 1) / 2 + 1.5) * spacing;
  }, [spatialOverlay?.visible, spatialOverlay?.opacity, spatialOverlayGrid, spacing, dataCube.gridSize]);

  // Confidence overlay plane lifecycle (Gate 0.5 Stage 6) — mirrors the spatial
  // overlay plane pattern above. Red (low confidence) -> Green (high confidence).
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const visible = confidenceOverlay?.visible ?? false;
    const opacity = confidenceOverlay?.opacity ?? 0.6;
    const gridSize = dataCube.gridSize;

    if (!visible || !confidenceOverlayGrid) {
      if (confidenceOverlayMeshRef.current) {
        group.remove(confidenceOverlayMeshRef.current);
        confidenceOverlayMeshRef.current.geometry.dispose();
        const mat = confidenceOverlayMeshRef.current.material;
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.map?.dispose();
          mat.dispose();
        }
        confidenceOverlayMeshRef.current = null;
        confidenceOverlayPixelBufferRef.current = null;
      }
      return;
    }

    // Create the overlay mesh on first use
    if (!confidenceOverlayMeshRef.current) {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = gridSize;
      texCanvas.height = gridSize;

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;

      const planeGeo = new THREE.PlaneGeometry(16, 16, gridSize - 1, gridSize - 1);
      const planeMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        roughness: 0.45,
        metalness: 0.1
      });

      const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = -Math.PI / 2;
      const _numLayersC = Object.keys(VARIABLE_METADATA).length;
      mesh.position.y = ((_numLayersC - 1) / 2 + 2.5) * spacing;

      group.add(mesh);
      confidenceOverlayMeshRef.current = mesh;
      confidenceOverlayPixelBufferRef.current = new Uint8ClampedArray(gridSize * gridSize * 4);
    }

    const mesh = confidenceOverlayMeshRef.current;
    const pixelBuffer = confidenceOverlayPixelBufferRef.current!;

    if (mesh.material instanceof THREE.MeshStandardMaterial) {
      mesh.material.opacity = opacity;
      const texture = mesh.material.map as THREE.CanvasTexture;
      const canvas = texture.image as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (let r = 0; r < gridSize; r++) {
          for (let c = 0; c < gridSize; c++) {
            const i = r * gridSize + c;
            const v = Math.max(0, Math.min(1, confidenceOverlayGrid[r]?.[c] ?? 1));
            // Lerp red (low confidence) -> green (high confidence)
            const cr = Math.round(239 + (74 - 239) * v);   // 239 -> 74
            const cg = Math.round(68 + (222 - 68) * v);    // 68 -> 222
            const cb = Math.round(68 + (128 - 68) * v);    // 68 -> 128
            const o = i * 4;
            pixelBuffer[o] = cr;
            pixelBuffer[o + 1] = cg;
            pixelBuffer[o + 2] = cb;
            pixelBuffer[o + 3] = 255;
          }
        }
        ctx.putImageData(new ImageData(pixelBuffer, gridSize, gridSize), 0, 0);
        texture.needsUpdate = true;
      }
    }

    // Reposition in case spacing changed
    const _numLayersC2 = Object.keys(VARIABLE_METADATA).length;
    mesh.position.y = ((_numLayersC2 - 1) / 2 + 2.5) * spacing;
  }, [confidenceOverlay?.visible, confidenceOverlay?.opacity, confidenceOverlayGrid, spacing, dataCube.gridSize]);

  // Relationship graph mesh lifecycle (Gate A Stage 2) — mirrors the root-mesh
  // create/dispose/rebuild pattern above.
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const visible = relationshipGraph?.visible ?? false;
    const opacity = relationshipGraph?.opacity ?? 0.8;
    const channelName = relationshipGraph?.channelName ?? null;
    const threshold = relationshipGraph?.threshold ?? 0.5;

    if (!visible || !relationshipTensor || !channelName) {
      if (relationshipMeshRef.current) {
        group.remove(relationshipMeshRef.current);
        relationshipMeshRef.current.geometry.dispose();
        (relationshipMeshRef.current.material as THREE.Material).dispose();
        relationshipMeshRef.current = null;
      }
      prevRelationshipTensorRef.current = null;
      prevRelationshipChannelRef.current = null;
      prevRelationshipThresholdRef.current = null;
      return;
    }

    const needsRebuild =
      !relationshipMeshRef.current ||
      prevRelationshipTensorRef.current !== relationshipTensor ||
      prevRelationshipChannelRef.current !== channelName ||
      prevRelationshipThresholdRef.current !== threshold;

    if (needsRebuild) {
      if (relationshipMeshRef.current) {
        group.remove(relationshipMeshRef.current);
        relationshipMeshRef.current.geometry.dispose();
        (relationshipMeshRef.current.material as THREE.Material).dispose();
        relationshipMeshRef.current = null;
      }

      prevRelationshipTensorRef.current = relationshipTensor;
      prevRelationshipChannelRef.current = channelName;
      prevRelationshipThresholdRef.current = threshold;

      const channelIdx = relationshipChannelIndex(relationshipTensor, channelName);
      if (channelIdx >= 0) {
        const edges = buildRelationshipEdges(
          relationshipTensor,
          channelIdx,
          dataCube.gridSize,
          spacing,
          threshold
        );

        if (edges.length > 0) {
          const mesh = buildRelationshipMesh(edges);
          group.add(mesh);
          relationshipMeshRef.current = mesh;
        }
      }
    }

    if (relationshipMeshRef.current?.material instanceof THREE.MeshStandardMaterial) {
      relationshipMeshRef.current.material.opacity = opacity;
    }
  }, [
    relationshipTensor,
    relationshipGraph?.visible,
    relationshipGraph?.channelName,
    relationshipGraph?.threshold,
    relationshipGraph?.opacity,
    spacing,
    dataCube.gridSize
  ]);

  // M3 — Latent-space geometric overlay: vertex-colored PCA distance field + cluster convex hulls
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const disposeGroup = (g: THREE.Group) => {
      g.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        const mat = (child as THREE.Mesh).material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else (mat as THREE.Material).dispose();
        }
      });
    };

    if (!latentOverlayVisible || !rootAnalysis) {
      if (latentOverlayGroupRef.current) {
        group.remove(latentOverlayGroupRef.current);
        disposeGroup(latentOverlayGroupRef.current);
        latentOverlayGroupRef.current = null;
      }
      prevLatentAnalysisRef.current = null;
      return;
    }

    if (prevLatentAnalysisRef.current === rootAnalysis) return;
    prevLatentAnalysisRef.current = rootAnalysis;

    if (latentOverlayGroupRef.current) {
      group.remove(latentOverlayGroupRef.current);
      disposeGroup(latentOverlayGroupRef.current);
    }

    const { projections, clusterLabels, clusterCount } = rootAnalysis;
    const gridSize = dataCube.gridSize;
    const n = gridSize * gridSize;

    // Position: just above CHL_disagreement (last layer, index = numLayers-1)
    const numLayers = Object.keys(VARIABLE_METADATA).length;
    const chlDisY = ((numLayers - 1) - (numLayers - 1) / 2) * spacing;
    const overlayY = chlDisY + spacing * 0.35;

    // Step 1: find CHL-dominant cluster
    const chlFlat: number[] = [];
    const chlGrid = dataCube.channels.CHL;
    for (let r = 0; r < gridSize; r++) for (let c = 0; c < gridSize; c++) chlFlat.push(chlGrid[r][c]);
    const clusterChlSum = new Float64Array(clusterCount);
    const clusterCnt = new Int32Array(clusterCount);
    for (let i = 0; i < n; i++) { clusterChlSum[clusterLabels[i]] += chlFlat[i]; clusterCnt[clusterLabels[i]]++; }
    let kCHL = 0;
    let maxMean = -Infinity;
    for (let k = 0; k < clusterCount; k++) {
      const m = clusterCnt[k] > 0 ? clusterChlSum[k] / clusterCnt[k] : 0;
      if (m > maxMean) { maxMean = m; kCHL = k; }
    }

    // Step 2: centroid of CHL cluster in PCA space
    const cCHL = [0, 0, 0];
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      if (clusterLabels[i] === kCHL) {
        cCHL[0] += projections[i * 3]; cCHL[1] += projections[i * 3 + 1]; cCHL[2] += projections[i * 3 + 2]; cnt++;
      }
    }
    if (cnt > 0) { cCHL[0] /= cnt; cCHL[1] /= cnt; cCHL[2] /= cnt; }

    // Step 3: per-cell distance to CHL centroid
    const dist = new Float32Array(n);
    let maxDist = 0;
    for (let i = 0; i < n; i++) {
      const dx = projections[i * 3] - cCHL[0], dy = projections[i * 3 + 1] - cCHL[1], dz = projections[i * 3 + 2] - cCHL[2];
      dist[i] = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist[i] > maxDist) maxDist = dist[i];
    }
    if (maxDist > 1e-10) for (let i = 0; i < n; i++) dist[i] /= maxDist;

    // Step 3b: vertex-colored smooth overlay (amber near CHL, indigo far)
    const geo = new THREE.PlaneGeometry(16, 16, gridSize - 1, gridSize - 1);
    const colorsArr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const d = dist[i];
      colorsArr[i * 3]     = (245 * (1 - d) + 79  * d) / 255;
      colorsArr[i * 3 + 1] = (158 * (1 - d) + 70  * d) / 255;
      colorsArr[i * 3 + 2] = (11  * (1 - d) + 229 * d) / 255;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
    const overlayMat = new THREE.MeshStandardMaterial({
      vertexColors: true, transparent: true, opacity: 0.50,
      roughness: 0.9, metalness: 0, side: THREE.DoubleSide, depthWrite: false,
    });
    const overlayMesh = new THREE.Mesh(geo, overlayMat);
    overlayMesh.rotation.x = -Math.PI / 2;
    overlayMesh.position.y = overlayY;

    // Step 4: convex hull outlines per cluster
    const PALETTE_HEX = [
      new THREE.Color(0.85, 0.35, 0.25),
      new THREE.Color(0.30, 0.75, 0.55),
      new THREE.Color(0.45, 0.40, 0.85),
      new THREE.Color(0.90, 0.65, 0.20),
      new THREE.Color(0.55, 0.80, 0.90),
    ];

    const overlayGroup = new THREE.Group();
    overlayGroup.add(overlayMesh);

    // Build a height sampler from the CHL_disagreement layer's displaced vertices
    const chlDisData = layersMeshesMap.current.get("CHL_disagreement");
    const chlDisPosAttr = chlDisData
      ? (chlDisData.mesh.geometry as THREE.PlaneGeometry).attributes.position
      : null;

    function sampleBumpmapHeight(xWorld: number, zWorld: number): number {
      if (!chlDisPosAttr) return 0;
      const u = ((xWorld + 8) / 16) * (gridSize - 1);
      const v = ((zWorld + 8) / 16) * (gridSize - 1);
      const u0 = Math.max(0, Math.min(gridSize - 2, Math.floor(u)));
      const v0 = Math.max(0, Math.min(gridSize - 2, Math.floor(v)));
      const fu = u - u0, fv = v - v0;
      const i00 = v0 * gridSize + u0;
      const i10 = v0 * gridSize + u0 + 1;
      const i01 = (v0 + 1) * gridSize + u0;
      const i11 = (v0 + 1) * gridSize + u0 + 1;
      const z00 = chlDisPosAttr.getZ(i00);
      const z10 = chlDisPosAttr.getZ(i10);
      const z01 = chlDisPosAttr.getZ(i01);
      const z11 = chlDisPosAttr.getZ(i11);
      return z00 * (1 - fu) * (1 - fv) + z10 * fu * (1 - fv) + z01 * (1 - fu) * fv + z11 * fu * fv;
    }

    for (let k = 0; k < clusterCount; k++) {
      const pts: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        if (clusterLabels[i] !== k) continue;
        const row = Math.floor(i / gridSize), col = i % gridSize;
        pts.push([(col / (gridSize - 1)) * 16 - 8, (row / (gridSize - 1)) * 16 - 8]);
      }
      if (pts.length < 3) continue;
      const hull = convexHull2D(pts);
      if (hull.length < 2) continue;

      // Subdivide long hull edges for smooth draping
      const subdividedPts: THREE.Vector3[] = [];
      const closedHull = [...hull, hull[0]];
      const SUBDIV_STEP = 16 / (gridSize - 1); // one grid cell in world units
      for (let hi = 0; hi < closedHull.length - 1; hi++) {
        const [x0, z0] = closedHull[hi];
        const [x1, z1] = closedHull[hi + 1];
        const segLen = Math.sqrt((x1 - x0) ** 2 + (z1 - z0) ** 2);
        const steps = Math.max(1, Math.ceil(segLen / SUBDIV_STEP));
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const x = x0 + (x1 - x0) * t;
          const z = z0 + (z1 - z0) * t;
          const h = sampleBumpmapHeight(x, z);
          subdividedPts.push(new THREE.Vector3(x, h, z));
        }
      }
      // Close the loop
      if (subdividedPts.length > 0) {
        subdividedPts.push(subdividedPts[0].clone());
      }

      const hullGeo = new THREE.BufferGeometry().setFromPoints(subdividedPts);
      const hullMat = new THREE.LineBasicMaterial({ color: PALETTE_HEX[k % PALETTE_HEX.length], transparent: true, opacity: 0.8 });
      const hullLine = new THREE.Line(hullGeo, hullMat);
      hullLine.position.y = chlDisY + 0.03;
      overlayGroup.add(hullLine);
    }

    group.add(overlayGroup);
    latentOverlayGroupRef.current = overlayGroup;
  }, [rootAnalysis, latentOverlayVisible, spacing, dataCube]);

  // Squad F — Bloom-risk overlay: categorical green/amber/red risk plane + red hotspot markers,
  // draped clear above CHL_disagreement's own terrain so it reads as a clean safety map rather
  // than colliding with that layer's displaced peaks. Rebuilt on every change (20x20 grid, cheap).
  useEffect(() => {
    const group = meshesGroupRef.current;
    if (!group) return;

    const disposeGroup = (g: THREE.Group) => {
      g.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        const mat = (child as THREE.Mesh).material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else (mat as THREE.Material).dispose();
        }
      });
    };

    if (bloomOverlayGroupRef.current) {
      group.remove(bloomOverlayGroupRef.current);
      disposeGroup(bloomOverlayGroupRef.current);
      bloomOverlayGroupRef.current = null;
    }

    const overlay = bloomOverlay;
    if (!overlay?.visible || !bloomZones || bloomZones.length === 0) {
      return;
    }

    const gridSize = dataCube.gridSize;
    const n = gridSize * gridSize;
    const keys = Object.keys(VARIABLE_METADATA) as VariableName[];
    const numLayers = keys.length;
    const chlDisIndex = keys.indexOf("CHL_disagreement");
    const chlDisY = (chlDisIndex - (numLayers - 1) / 2) * spacing;
    // Clear above CHL_disagreement's own displaced terrain peak (height is
    // bounded by displacementGain — see the per-layer height formula above)
    // so this flat risk plane never clips through that layer's mountains.
    const overlayY = chlDisY + displacementGain + spacing * 0.3;

    const overlayGroup = new THREE.Group();

    // Categorical risk plane: green/amber/red per cell (safe → caution → stay away).
    const geo = new THREE.PlaneGeometry(16, 16, gridSize - 1, gridSize - 1);
    const colorsArr = new Float32Array(n * 3);
    const ZONE_COLOR: Record<number, [number, number, number]> = {
      [ZoneClass.Green]: [0.20, 0.75, 0.40],
      [ZoneClass.Amber]: [0.95, 0.70, 0.15],
      [ZoneClass.Red]: [0.90, 0.20, 0.20],
    };
    for (let i = 0; i < n; i++) {
      const [r, g, b] = ZONE_COLOR[bloomZones[i]] ?? ZONE_COLOR[ZoneClass.Green];
      colorsArr[i * 3] = r;
      colorsArr[i * 3 + 1] = g;
      colorsArr[i * 3 + 2] = b;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));
    const planeMat = new THREE.MeshStandardMaterial({
      vertexColors: true, transparent: true, opacity: overlay.opacity,
      roughness: 0.9, metalness: 0, side: THREE.DoubleSide, depthWrite: false,
    });
    const planeMesh = new THREE.Mesh(geo, planeMat);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = overlayY;
    overlayGroup.add(planeMesh);

    // Red dot + coordinate/risk label at each contiguous high-risk blob centroid.
    (bloomHotspots ?? []).forEach((hotspot) => {
      const x = (hotspot.col / (gridSize - 1)) * 16 - 8;
      const z = (hotspot.row / (gridSize - 1)) * 16 - 8;

      const dotGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const dotMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xC8553D),
        emissive: new THREE.Color(0xC8553D),
        emissiveIntensity: 0.45,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(x, overlayY + 0.25, z);
      overlayGroup.add(dot);

      const labelCanvas = document.createElement("canvas");
      labelCanvas.width = 220;
      labelCanvas.height = 56;
      const lctx = labelCanvas.getContext("2d");
      if (lctx) {
        // Light frosted chip with a burnt-red hairline; risk value in the muted
        // alert red, coordinates in deep slate — readable dark-on-light.
        lctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        lctx.roundRect(0, 0, 220, 56, 8);
        lctx.fill();
        lctx.lineWidth = 1.5;
        lctx.strokeStyle = "rgba(200, 85, 61, 0.55)";
        lctx.stroke();

        lctx.fillStyle = "#C8553D";
        lctx.font = "bold 14px sans-serif";
        lctx.textAlign = "left";
        lctx.textBaseline = "middle";
        lctx.fillText(`RISK ${Math.round(hotspot.meanRisk * 100)}%`, 12, 18);

        lctx.fillStyle = "rgba(27, 39, 64, 0.85)";
        lctx.font = "11px monospace";
        const coordText =
          hotspot.lat !== null && hotspot.lon !== null
            ? `${hotspot.lat.toFixed(4)}, ${hotspot.lon.toFixed(4)}`
            : `grid (${Math.round(hotspot.row)}, ${Math.round(hotspot.col)})`;
        lctx.fillText(coordText, 12, 40);
      }

      const labelTex = new THREE.CanvasTexture(labelCanvas);
      const labelMat = new THREE.SpriteMaterial({ map: labelTex, transparent: true, opacity: 0.92, depthTest: false });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(2.6, 0.66, 1);
      labelSprite.position.set(x, overlayY + 0.75, z);
      overlayGroup.add(labelSprite);
    });

    group.add(overlayGroup);
    bloomOverlayGroupRef.current = overlayGroup;
  }, [bloomZones, bloomHotspots, bloomOverlay?.visible, bloomOverlay?.opacity, spacing, displacementGain, dataCube]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-4 right-4 text-[10px] font-mono select-none px-2 py-1 rounded backdrop-blur-md border border-[var(--eef-border)] bg-[var(--eef-surface-2)] text-[var(--eef-text-3)]">
        GL_VERSION: WebGL 2.0 · Orbit: Mouse/Touch
      </div>
    </div>
  );
}

export const ThreeViewport = React.forwardRef(ThreeViewportInner);

// Andrew's monotone chain convex hull algorithm
function convexHull2D(pts: [number, number][]): [number, number][] {
  if (pts.length < 3) return pts;
  const s = [...pts].sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const p of s) { while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
  const upper: [number, number][] = [];
  for (let i = s.length - 1; i >= 0; i--) { const p = s[i]; while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
  lower.pop(); upper.pop();
  return [...lower, ...upper];
}
