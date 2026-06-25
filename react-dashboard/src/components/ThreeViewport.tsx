import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DataCube, LayerState, VARIABLE_METADATA, VariableName } from "../types";
import { getVariableHueColor } from "../utils/colormaps";

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
}

export const ThreeViewport: React.FC<ThreeViewportProps> = ({
  dataCube,
  layerState,
  spacing,
  displacementGain,
  showTerrain,
  showWireframe,
  showLabels,
  cameraPreset,
  customColors
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep references to Three.js elements for direct animation updates (saves re-mounting overhead!)
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const meshesGroupRef = useRef<THREE.Group | null>(null);
  const layersMeshesMap = useRef<Map<string, {
    mesh: THREE.Mesh;
    wireframe: THREE.LineSegments;
    border: THREE.LineSegments;
    label: THREE.Sprite;
    textureCanvas: HTMLCanvasElement;
    pixelBuffer: Uint8ClampedArray;
  }>>(new Map());

  // 1. Initial Scene Setup
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth || 600;
    const height = containerRef.current.clientHeight || 450;

    // Create Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030307); // Basalt space
    scene.fog = new THREE.FogExp2(0x030307, 0.006);
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

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.61);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(15, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xaaccff, 0.3);
    dirLight2.position.set(-20, 20, -10);
    scene.add(dirLight2);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(32, 32, 0x1f1f35, 0x0c0c16);
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

      renderer.render(scene, camera);
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
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
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

    const keys: VariableName[] = ["CHL", "aphy", "ADG", "bbp", "TSM", "PAR", "KD490"];
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
          lctx.fillStyle = "rgba(8, 8, 16, 0.8)";
          lctx.roundRect(0, 0, 192, 40, 6);
          lctx.fill();
          lctx.lineWidth = 1.5;
          lctx.strokeStyle = metadata.color;
          lctx.stroke();

          lctx.fillStyle = "#ffffff";
          lctx.font = "bold 15px sans-serif";
          lctx.textAlign = "left";
          lctx.textBaseline = "middle";
          lctx.fillText(varName, 12, 20);

          lctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          lctx.font = "12px monospace";
          lctx.fillText(metadata.label.length > 15 ? metadata.label.substring(0, 15) + "..." : metadata.label, 52, 20);
        }

        const labelTex = new THREE.CanvasTexture(labelCanvas);
        const labelMat = new THREE.SpriteMaterial({
          map: labelTex,
          transparent: true,
          opacity: 0.9,
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
      const range = stats.max - stats.min || 1.0;

      // S1: precompute per-cell normalized values [0,1] — shared source for S2 and S3
      const normalizedGrid: number[] = new Array(gridSize * gridSize);
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          normalizedGrid[r * gridSize + c] = Math.max(0, Math.min(1, (grid[r][c] - stats.min) / range));
        }
      }

      // S3: vertex displacement — normalized × displacementGain
      const planeGeo = mesh.geometry as THREE.PlaneGeometry;
      const posAttr = planeGeo.attributes.position;

      for (let i = 0; i < normalizedGrid.length; i++) {
        const height = showTerrain ? normalizedGrid[i] * displacementGain : 0;
        posAttr.setZ(i, height);
      }
      posAttr.needsUpdate = true;
      planeGeo.computeVertexNormals();

      // Rebuild the wireframe from the now-displaced plane. WireframeGeometry
      // produces its own deduplicated edge-vertex buffer with no index
      // correspondence to the source plane's vertices, so it must be
      // regenerated from scratch rather than patched in place — patching it
      // by grid index previously raised arbitrary, mismatched vertices and
      // produced stray branch-like spikes ("root vectors") under the terrain.
      wireframe.geometry.dispose();
      wireframe.geometry = new THREE.WireframeGeometry(planeGeo);

      // S2: hue-saturation texture — white/transparent at 0, full variable hue at 1.
      // Written directly into a per-cell pixel buffer (one putImageData call) instead
      // of hundreds of fillRect/stroke calls — the prior approach was the main cause
      // of per-tick main-thread stutter. Bilinear texture filtering smooths the result.
      const customHex = customColors?.[varName];
      const ctx = textureCanvas.getContext("2d");
      if (ctx) {
        for (let i = 0; i < normalizedGrid.length; i++) {
          const { r: cr, g: cg, b: cb, a } = getVariableHueColor(varName, normalizedGrid[i], customHex);
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

  }, [dataCube, layerState, spacing, displacementGain, showTerrain, showWireframe, showLabels, customColors]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
      <div className="absolute top-4 right-4 text-[10px] font-mono select-none px-2 py-1 border border-white/5 rounded backdrop-blur-md bg-black/45 text-white/50">
        GL_VERSION: WebGL 2.0 · Orbit: Mouse/Touch
      </div>
    </div>
  );
};
