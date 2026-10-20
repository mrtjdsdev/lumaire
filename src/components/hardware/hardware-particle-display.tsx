"use client";

import { Canvas, extend, useFrame, type ThreeElement } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

extend({ UnrealBloomPass });

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>;
  }
}

const COLS = 296;
const ROWS = 167;
const COUNT = COLS * ROWS;
const SPACING = 0.085;
const WIDTH = (COLS - 1) * SPACING;
const HEIGHT = (ROWS - 1) * SPACING;

type FrameSource = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

type VideoState = {
  video: HTMLVideoElement | null;
  mode: "video" | "buffer";
};

type PanelPointer = {
  x: number;
  y: number;
  inside: boolean;
};

// Local pointer disturbance: ~2.3 world units on a 25-unit-wide field,
// with a tangential swirl, depth lift, and a brightness/scale flare.
const POINTER_RADIUS = 2.3;
const POINTER_PUSH = 0.85;
const POINTER_SWIRL = 0.45;

function createFrameSource(): FrameSource | null {
  const canvas = document.createElement("canvas");
  canvas.width = COLS;
  canvas.height = ROWS;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
}

function drawBufferFrame(ctx: CanvasRenderingContext2D, time: number) {
  const w = COLS;
  const h = ROWS;
  ctx.fillStyle = "#060606";
  ctx.fillRect(0, 0, w, h);

  const pulse = 0.5 + 0.5 * Math.sin(time * 0.7);
  const sweep = ((time * 28) % (w + 40)) - 20;

  ctx.fillStyle = "#121212";
  ctx.fillRect(6, 6, w - 12, h - 12);

  ctx.strokeStyle = `rgba(244,244,240,${0.45 + pulse * 0.25})`;
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, w - 24, h - 24);

  for (let row = 0; row < 14; row += 1) {
    const y = 26 + row * 9;
    const phase = time * 1.4 + row * 0.35;
    const len = 48 + Math.sin(phase) * 34 + row * 3;
    const x = 22 + ((row * 17 + time * 14) % (w - 90));
    const shade = 170 + ((row * 19) % 70);
    ctx.fillStyle = `rgb(${shade},${shade},${Math.max(140, shade - 16)})`;
    ctx.fillRect(x, y, len, 4);
  }

  ctx.fillStyle = `rgba(244,244,240,${0.55 + pulse * 0.4})`;
  ctx.fillRect(sweep, 16, 4, h - 32);

  ctx.font = "700 22px ui-monospace, monospace";
  ctx.fillStyle = "#f7f7f4";
  ctx.fillText("800×480", 22, h - 30);
  ctx.font = "13px ui-monospace, monospace";
  ctx.fillStyle = "#c8c8c2";
  ctx.fillText("PANEL BUFFER · ESP32-S3", 22, h - 12);

  const cx = w * 0.7;
  const cy = h * 0.4;
  const radius = 34 + pulse * 7;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, Math.PI * 0.12, Math.PI * 1.88);
  ctx.strokeStyle = "#f7f7f4";
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.52, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(244,244,240,${0.45 + pulse * 0.45})`;
  ctx.lineWidth = 3;
  ctx.stroke();

  for (let i = 0; i < 24; i += 1) {
    const a = (i / 24) * Math.PI * 2 + time * 0.45;
    const r = radius + 12 + (i % 4) * 4;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    const s = 2 + (i % 3);
    ctx.fillStyle = i % 2 === 0 ? "#f7f7f4" : "#b7b7b1";
    ctx.fillRect(px, py, s, s);
  }
}

function Particles({
  source,
  videoState,
  pointer,
}: {
  source: FrameSource;
  videoState: RefObject<VideoState>;
  pointer: RefObject<PanelPointer>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reduced = useRef(false);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  // Smoothed pointer trails slightly behind the real cursor, so the
  // disturbance feels fluid rather than rigidly pinned to the mouse.
  const smoothed = useRef({ x: 0, y: 0, primed: false });
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.045), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffffff",
        toneMapped: false,
      }),
    [],
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    color.setRGB(0.05, 0.05, 0.05);

    for (let i = 0; i < COUNT; i += 1) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      dummy.position.set(col * SPACING - WIDTH / 2, -(row * SPACING - HEIGHT / 2), 0);
      dummy.scale.setScalar(0.2);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [color, dummy, geometry, material]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // 50k matrix writes are heavy — skip alternate frames when the tab is busy.
    if (!reduced.current && state.clock.elapsedTime > 0.2 && Math.floor(state.clock.elapsedTime * 60) % 2 === 1) {
      return;
    }

    const time = state.clock.elapsedTime;
    const { ctx } = source;
    const { video, mode } = videoState.current;

    if (mode === "video" && video && video.readyState >= 2) {
      ctx.drawImage(video, 0, 0, COLS, ROWS);
    } else {
      drawBufferFrame(ctx, reduced.current ? 0 : time);
    }

    const { data } = ctx.getImageData(0, 0, COLS, ROWS);
    const breath = reduced.current ? 0 : Math.sin(time * 0.8) * 0.015;

    // Map the pointer onto the z=0 plane for a small local repulsion.
    let wx = 0;
    let wy = 0;
    let pointerActive = false;
    const point = pointer.current;
    if (point?.inside && !reduced.current) {
      const rect = state.gl.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        ndc.set(((point.x - rect.left) / rect.width) * 2 - 1, -(((point.y - rect.top) / rect.height) * 2 - 1));
        raycaster.setFromCamera(ndc, state.camera);
        const { origin, direction } = raycaster.ray;
        if (Math.abs(direction.z) > 0.0001) {
          const travel = -origin.z / direction.z;
          if (travel > 0) {
            const targetX = origin.x + direction.x * travel;
            const targetY = origin.y + direction.y * travel;
            if (!smoothed.current.primed) {
              smoothed.current.x = targetX;
              smoothed.current.y = targetY;
              smoothed.current.primed = true;
            } else {
              smoothed.current.x += (targetX - smoothed.current.x) * 0.22;
              smoothed.current.y += (targetY - smoothed.current.y) * 0.22;
            }
            wx = smoothed.current.x;
            wy = smoothed.current.y;
            pointerActive = true;
          }
        }
      }
    }
    if (!pointerActive) smoothed.current.primed = false;
    const radiusSq = POINTER_RADIUS * POINTER_RADIUS;

    for (let i = 0; i < COUNT; i += 1) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const px = i * 4;
      const r = Math.min(1, 0.1 + data[px] / 255);
      const g = Math.min(1, 0.1 + data[px + 1] / 255);
      const b = Math.min(1, 0.1 + data[px + 2] / 255);
      const bright = (r + g + b) / 3;
      let posX = col * SPACING - WIDTH / 2;
      let posY = -(row * SPACING - HEIGHT / 2);
      let posZ = bright * 3.2 + breath;
      let scale = 0.28 + bright * 1.1;
      let flare = 0;

      if (pointerActive) {
        const dx = posX - wx;
        const dy = posY - wy;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / POINTER_RADIUS;
          const push = falloff * falloff * POINTER_PUSH;
          const inv = 1 / dist;
          // Radial push plus a tangential swirl, so particles curl
          // around the cursor instead of only sliding straight out.
          posX += (dx * inv - dy * inv * POINTER_SWIRL) * push;
          posY += (dy * inv + dx * inv * POINTER_SWIRL) * push;
          posZ += falloff * 0.9;
          flare = falloff;
          scale += falloff * 0.5;
        }
      }

      dummy.position.set(posX, posY, posZ);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(bright * 0.6 + flare * 2.2, bright * 1.1 + flare * 3, bright * 0.3);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.setRGB(Math.min(1, r + flare * 0.3), Math.min(1, g + flare * 0.3), Math.min(1, b + flare * 0.34));
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, COUNT]} />;
}

function Bloom() {
  const resolution = useMemo(() => new THREE.Vector2(512, 512), []);
  return (
    <Effects disableGamma multisamping={0}>
      <unrealBloomPass args={[resolution, 0.35, 0.3, 0.25]} />
    </Effects>
  );
}

function Scene({
  source,
  videoState,
  pointer,
}: {
  source: FrameSource;
  videoState: RefObject<VideoState>;
  pointer: RefObject<PanelPointer>;
}) {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <Particles source={source} videoState={videoState} pointer={pointer} />
      <Bloom />
    </>
  );
}

export function HardwareParticleDisplay() {
  const [source] = useState<FrameSource | null>(() => createFrameSource());
  const videoState = useRef<VideoState>({ video: null, mode: "buffer" });
  const pointer = useRef<PanelPointer>({ x: 0, y: 0, inside: false });
  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const el = canvasEl.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.inside =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    };
    const onLeave = () => {
      pointer.current.inside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!source) return;
    const frame = videoState.current;

    let cancelled = false;
    const provided = document.getElementById("export-video") as HTMLVideoElement | null;
    const video = provided ?? document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";

    const tryPlay = async () => {
      try {
        await video.play();
        if (!cancelled) {
          frame.video = video;
          frame.mode = "video";
        }
      } catch {
        frame.mode = "buffer";
      }
    };

    video.addEventListener("loadeddata", () => {
      void tryPlay();
    });
    video.addEventListener("error", () => {
      frame.mode = "buffer";
    });

    // Optional page-provided <video id="export-video"> or local clip;
    // buffer mode remains the reliable default.
    if (provided) {
      frame.video = provided;
      frame.mode = "video";
      void tryPlay();
    } else {
      video.src = "/hardware/panel-signal.mp4";
    }

    return () => {
      cancelled = true;
      if (!provided) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      frame.video = null;
      frame.mode = "buffer";
    };
  }, [source]);

  if (!source) {
    return <div className="absolute inset-0 bg-[#050505]" />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0.15, 24.5], fov: 40, near: 0.1, far: 80 }}
      dpr={[1, 1.25]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
      style={{ width: "100%", height: "100%" }}
      onCreated={(state) => {
        canvasEl.current = state.gl.domElement;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          state.set({ frameloop: "demand" });
          state.invalidate();
        }
      }}
    >
      <Scene source={source} videoState={videoState} pointer={pointer} />
    </Canvas>
  );
}
