"use client";

import { Canvas, extend, useFrame, useThree, type ThreeElement } from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { FORMATION_COLORS, FORMATION_COUNT, FORMATION_POSITIONS } from "@/components/marketing/formation-data";
import { bindParticleSwarmWake, type SwarmPointer } from "@/components/marketing/swarm-pointer";

extend({ UnrealBloomPass });

declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: ThreeElement<typeof UnrealBloomPass>;
  }
}

const swarmMotion = { logo: 0, field: 0 };

function restSwarm(state: { set: (next: { frameloop: "demand" }) => void }) {
  if (swarmMotion.logo === 0 && swarmMotion.field === 0) state.set({ frameloop: "demand" });
}

const FIELD_COLS = 72;
const FIELD_ROWS = 40;
const FIELD_COUNT = FIELD_COLS * FIELD_ROWS;
const CAMERA_Z = 156;
const CAMERA_FOV = 40;

function frameOf(width: number, height: number) {
  const halfH = Math.tan(((CAMERA_FOV * Math.PI) / 180) / 2) * CAMERA_Z;
  const halfW = halfH * (width / Math.max(height, 1));
  const scale = Math.max((halfW * 2.35) / 70, (halfH * 2.35) / 80);
  return { halfW, halfH, scale };
}

function jitter(index: number) {
  const n = (index * 1103515245 + 12345) & 0x7fffffff;
  return (n % 1000) / 1000 - 0.5;
}

function writeFieldTargets(targets: Float32Array, halfW: number, halfH: number) {
  let index = 0;
  for (let row = 0; row < FIELD_ROWS; row += 1) {
    for (let col = 0; col < FIELD_COLS; col += 1) {
      const offset = index * 3;
      targets[offset] = ((col / (FIELD_COLS - 1)) - 0.5) * halfW * 2.3;
      targets[offset + 1] = ((row / (FIELD_ROWS - 1)) - 0.5) * halfH * 2.3;
      targets[offset + 2] = jitter(index) * 10;
      index += 1;
    }
  }
}

function Particles({ pointer }: { pointer: RefObject<SwarmPointer> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const settled = useRef(false);
  const reduced = useRef(false);
  const positions = useRef<Float32Array | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ffffff" }), []);
  const setFrameloop = useThree((state) => state.set);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduced.current = prefersReduced;
    const values = new Float32Array(FORMATION_COUNT * 3);
    if (prefersReduced) {
      values.set(FORMATION_POSITIONS);
      settled.current = true;
    } else {
      for (let index = 0; index < FORMATION_COUNT; index += 1) {
        const offset = index * 3;
        values[offset] = (Math.random() - 0.5) * 100;
        values[offset + 1] = (Math.random() - 0.5) * 100;
        values[offset + 2] = (Math.random() - 0.5) * 36;
      }
    }
    positions.current = values;
    bindParticleSwarmWake(() => {
      if (!reduced.current) setFrameloop({ frameloop: "always" });
    });

    const { scale } = frameOf(window.innerWidth, window.innerHeight);
    for (let index = 0; index < FORMATION_COUNT; index += 1) {
      const offset = index * 3;
      color.setRGB(
        FORMATION_COLORS[offset] / 255,
        FORMATION_COLORS[offset + 1] / 255,
        FORMATION_COLORS[offset + 2] / 255,
        THREE.SRGBColorSpace,
      );
      dummy.scale.set(scale, scale, scale);
      dummy.position.set(values[offset] * scale, values[offset + 1] * scale, values[offset + 2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      mesh.setColorAt(index, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    return () => {
      bindParticleSwarmWake(() => {});
      geometry.dispose();
      material.dispose();
      positions.current = null;
    };
  }, [color, dummy, geometry, material, pointer, setFrameloop]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const values = positions.current;
    if (!mesh || !values || reduced.current) return;

    const point = pointer.current;
    const { scale, halfW } = frameOf(state.size.width, state.size.height);
    let px = 0;
    let py = 0;
    let active = false;

    if (point?.inside) {
      const rect = state.gl.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        ndc.set(((point.x - rect.left) / rect.width) * 2 - 1, -(((point.y - rect.top) / rect.height) * 2 - 1));
        raycaster.setFromCamera(ndc, state.camera);
        const origin = raycaster.ray.origin;
        const direction = raycaster.ray.direction;
        if (Math.abs(direction.z) > 0.0001) {
          const travel = -origin.z / direction.z;
          if (travel > 0) {
            px = origin.x + direction.x * travel;
            py = origin.y + direction.y * travel;
            active = true;
          }
        }
      }
    }

    const spring = Math.min(0.2, delta * 3.4);
    const radius = Math.max(10, halfW * 0.19);
    const radiusSq = radius * radius;
    const strength = 8 * Math.min(delta, 0.033) * 60;
    let moving = 0;

    for (let index = 0; index < FORMATION_COUNT; index += 1) {
      const offset = index * 3;
      let x = values[offset] + (FORMATION_POSITIONS[offset] - values[offset]) * spring;
      let y = values[offset + 1] + (FORMATION_POSITIONS[offset + 1] - values[offset + 1]) * spring;
      let z = values[offset + 2] + (FORMATION_POSITIONS[offset + 2] - values[offset + 2]) * spring;

      if (active) {
        const dx = x * scale - px;
        const dy = y * scale - py;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          const push = (falloff * falloff * strength) / scale;
          const inv = 1 / dist;
          x += dx * inv * push - dy * inv * push * 0.5;
          y += dy * inv * push + dx * inv * push * 0.5;
          z += falloff * 2.2;
        }
      }

      values[offset] = x;
      values[offset + 1] = y;
      values[offset + 2] = z;
      const driftX = FORMATION_POSITIONS[offset] - x;
      const driftY = FORMATION_POSITIONS[offset + 1] - y;
      if (driftX * driftX + driftY * driftY > 0.004) moving += 1;
      dummy.scale.set(scale, scale, scale);
      dummy.position.set(x * scale, y * scale, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    swarmMotion.logo = moving === 0 && !active ? 0 : 1;
    if (moving === 0 && !active) settled.current = true;
    else settled.current = false;
    restSwarm(state);
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, FORMATION_COUNT]} />;
}

function Field({ pointer }: { pointer: RefObject<SwarmPointer> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reduced = useRef(false);
  const positions = useRef<Float32Array | null>(null);
  const targets = useRef(new Float32Array(FIELD_COUNT * 3));
  const sized = useRef({ width: 0, height: 0 });
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.22), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#c8c8c2" }), []);

  function place(width: number, height: number) {
    if (Math.abs(sized.current.width - width) < 8 && Math.abs(sized.current.height - height) < 8) return;
    sized.current = { width, height };
    const { halfW, halfH } = frameOf(width, height);
    writeFieldTargets(targets.current, halfW, halfH);
  }

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduced.current = prefersReduced;
    place(window.innerWidth, window.innerHeight);
    const values = new Float32Array(FIELD_COUNT * 3);
    if (prefersReduced) values.set(targets.current);
    else {
      for (let index = 0; index < FIELD_COUNT; index += 1) {
        const offset = index * 3;
        values[offset] = jitter(index + 3) * 140;
        values[offset + 1] = jitter(index + 9) * 90;
        values[offset + 2] = jitter(index + 17) * 24;
      }
    }
    positions.current = values;
    for (let index = 0; index < FIELD_COUNT; index += 1) {
      const offset = index * 3;
      dummy.position.set(values[offset], values[offset + 1], values[offset + 2]);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return () => {
      geometry.dispose();
      material.dispose();
      positions.current = null;
    };
  }, [dummy, geometry, material]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const values = positions.current;
    if (!mesh || !values || reduced.current) return;
    place(state.size.width, state.size.height);
    const point = pointer.current;
    const { halfW } = frameOf(state.size.width, state.size.height);
    let px = 0;
    let py = 0;
    let active = false;
    if (point?.inside) {
      const rect = state.gl.domElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        ndc.set(((point.x - rect.left) / rect.width) * 2 - 1, -(((point.y - rect.top) / rect.height) * 2 - 1));
        raycaster.setFromCamera(ndc, state.camera);
        const origin = raycaster.ray.origin;
        const direction = raycaster.ray.direction;
        if (Math.abs(direction.z) > 0.0001) {
          const travel = -origin.z / direction.z;
          if (travel > 0) {
            px = origin.x + direction.x * travel;
            py = origin.y + direction.y * travel;
            active = true;
          }
        }
      }
    }
    const spring = Math.min(0.18, delta * 3);
    const radius = Math.max(10, halfW * 0.19);
    const radiusSq = radius * radius;
    const strength = 9 * Math.min(delta, 0.033) * 60;
    const home = targets.current;
    let moving = 0;
    for (let index = 0; index < FIELD_COUNT; index += 1) {
      const offset = index * 3;
      let x = values[offset] + (home[offset] - values[offset]) * spring;
      let y = values[offset + 1] + (home[offset + 1] - values[offset + 1]) * spring;
      const z = values[offset + 2] + (home[offset + 2] - values[offset + 2]) * spring;
      if (active) {
        const dx = x - px;
        const dy = y - py;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          const push = falloff * falloff * strength;
          const inv = 1 / dist;
          x += dx * inv * push - dy * inv * push * 0.5;
          y += dy * inv * push + dx * inv * push * 0.5;
        }
      }
      values[offset] = x;
      values[offset + 1] = y;
      values[offset + 2] = z;
      const driftX = home[offset] - x;
      const driftY = home[offset + 1] - y;
      if (driftX * driftX + driftY * driftY > 0.01) moving += 1;
      dummy.position.set(x, y, z);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    swarmMotion.field = moving === 0 && !active ? 0 : 1;
    restSwarm(state);
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, FIELD_COUNT]} />;
}

function Bloom() {
  const resolution = useMemo(() => new THREE.Vector2(512, 512), []);
  return (
    <Effects disableGamma multisamping={0}>
      <unrealBloomPass args={[resolution, 0.42, 0.28, 0.35]} />
    </Effects>
  );
}

export function ParticleSwarm({ pointer }: { pointer: RefObject<SwarmPointer> }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, CAMERA_Z], fov: CAMERA_FOV, near: 0.1, far: 420 }}
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      onCreated={(state) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          state.set({ frameloop: "demand" });
          state.invalidate();
        }
      }}
    >
      <color attach="background" args={["#070707"]} />
      <Field pointer={pointer} />
      <Particles pointer={pointer} />
      <Bloom />
    </Canvas>
  );
}
