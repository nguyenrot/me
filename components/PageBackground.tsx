"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import dynamic from "next/dynamic";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededUnit(seed: number) {
  const value = Math.sin(seed) * 43758.5453;
  return value - Math.floor(value);
}

/* ─── GLOW TEXTURE ─── */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.6)");
  g.addColorStop(0.7, "rgba(255,255,255,0.1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── STAR FIELD ─── */
function Stars() {
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const { positions } = useMemo(() => {
    const rand = mulberry32(3001);
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (rand() - 0.5) * 50;
      p[i * 3 + 1] = (rand() - 0.5) * 30;
      p[i * 3 + 2] = -2 - rand() * 30;
    }
    return { positions: p };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.5}
        color="#c8d8ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── DRIFTING SPARKLE PARTICLES ─── */
function DriftSparkles() {
  const COUNT = 400;
  const pointsRef = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const { positions, velocities, phases } = useMemo(() => {
    const rand = mulberry32(4001);
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const pha = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (rand() - 0.5) * 30;
      pos[i * 3 + 1] = (rand() - 0.5) * 20;
      pos[i * 3 + 2] = rand() * 8 - 4;
      vel[i * 3] = (rand() - 0.5) * 0.04;
      vel[i * 3 + 1] = (rand() - 0.5) * 0.04;
      vel[i * 3 + 2] = (rand() - 0.5) * 0.02;
      pha[i] = rand() * Math.PI * 2;
    }
    return { positions: pos, velocities: vel, phases: pha };
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const mx = pointer.x * 10;
    const my = pointer.y * 6;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 1.2 + phases[i]) * 0.012;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 1.0 + phases[i]) * 0.012;
      arr[i3 + 2] += velocities[i3 + 2];

      const dx = mx - arr[i3];
      const dy = my - arr[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12 && dist > 0.5) {
        const force = 0.001 * (12 - dist);
        arr[i3] += (dx / dist) * force;
        arr[i3 + 1] += (dy / dist) * force;
      }

      if (arr[i3 + 2] > 4) arr[i3 + 2] = -4;
      if (arr[i3 + 2] < -6) arr[i3 + 2] = 2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        color="#ffd700"
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── QI ENERGY STREAMS ─── */
function QiStreams() {
  const COUNT = 400;
  const pointsRef = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const { positions, velocities } = useMemo(() => {
    const rand = mulberry32(5001);
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = rand() * Math.PI * 2;
      const r = 2 + rand() * 14;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (rand() - 0.5) * 18;
      pos[i * 3 + 2] = Math.sin(angle) * r - 6;
      vel[i * 3] = (rand() - 0.5) * 0.002;
      vel[i * 3 + 1] = 0.006 + rand() * 0.004;
      vel[i * 3 + 2] = (rand() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const attr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 0.2 + i * 0.05) * 0.003;
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.15 + i * 0.03) * 0.002;
      if (arr[i3 + 1] > 12) {
        arr[i3 + 1] = -12;
        const angle = seededUnit(i * 17.719 + Math.floor(time) * 31.371) * Math.PI * 2;
        const r = 2 + seededUnit(i * 41.413 + Math.floor(time) * 13.137) * 14;
        arr[i3] = Math.cos(angle) * r;
        arr[i3 + 2] = Math.sin(angle) * r - 6;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#aa44ff"
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── CAMERA PARALLAX ─── */
function CameraParallax() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 1.0, 0.02);
    state.camera.lookAt(0, 0, -4);
  });
  return null;
}

/* ─── MAIN ─── */
function PageBackgroundCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[0.8, 1.2]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#020208", 16, 32]} />
        <ambientLight intensity={0.1} color="#8866cc" />
        <Stars />
        <DriftSparkles />
        <QiStreams />
        <CameraParallax />
      </Canvas>
    </div>
  );
}

/* ─── DYNAMIC EXPORT ─── */
const PageBackground = dynamic(() => Promise.resolve(PageBackgroundCanvas), {
  ssr: false,
  loading: () => null,
});

export default PageBackground;
