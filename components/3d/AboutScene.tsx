"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Scene3DWrapper from "./Scene3DWrapper";

/* ─── Glow texture helper ─── */
function makeGlow(size = 64): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.4)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/* ═══ 1. Floating Scrolls — translucent cylinders ═══ */
function FloatingScrolls() {
  const group = useRef<THREE.Group>(null);

  const scrolls = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => ({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 10,
      z: -6 - Math.random() * 8,
      rotSpeed: 0.1 + Math.random() * 0.2,
      phase: i * 1.3,
      scale: 0.3 + Math.random() * 0.3,
    })),
  []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const s = scrolls[i];
      if (!s) return;
      child.position.y = s.y + Math.sin(t * 0.3 + s.phase) * 0.6;
      child.rotation.x = t * s.rotSpeed;
      child.rotation.z = t * s.rotSpeed * 0.5;
    });
  });

  return (
    <group ref={group}>
      {scrolls.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} scale={s.scale}>
          <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.15} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ 2. QiMist — ground-level foggy particles ═══ */
function QiMist() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 200;
  const glow = useMemo(() => makeGlow(), []);

  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = -4 + Math.random() * 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const arr = (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += Math.sin(t * 0.05 + i) * 0.003;
      arr[i * 3 + 1] += Math.cos(t * 0.03 + i * 0.5) * 0.001;
    }
    (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.25}
        map={glow}
        alphaMap={glow}
        transparent
        opacity={0.2}
        color="#ffd700"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ═══ 3. OrbitalLanterns — golden glowing spheres ═══ */
function OrbitalLanterns() {
  const group = useRef<THREE.Group>(null);

  const lanterns = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      angle: (i / 4) * Math.PI * 2,
      radius: 7 + i * 1.5,
      y: (i - 1.5) * 2,
      speed: 0.08 + i * 0.02,
      color: i % 2 === 0 ? "#ffd700" : "#ffaa44",
    })),
  []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const l = lanterns[i];
      if (!l) return;
      const a = l.angle + t * l.speed;
      child.position.x = Math.cos(a) * l.radius;
      child.position.z = Math.sin(a) * l.radius - 8;
      child.position.y = l.y + Math.sin(t * 0.4 + i) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {lanterns.map((l, i) => (
        <mesh key={i} position={[0, l.y, -8]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshBasicMaterial color={l.color} transparent opacity={0.7} toneMapped={false} />
          <pointLight color={l.color} intensity={0.6} distance={5} decay={2} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ Assembled Scene ═══ */
function AboutSceneContent() {
  return (
    <>
      <FloatingScrolls />
      <QiMist />
      <OrbitalLanterns />
    </>
  );
}

export default function AboutScene() {
  return (
    <Scene3DWrapper fog={[14, 35]} bloomIntensity={0.7} cameraParallax={0.4}>
      <AboutSceneContent />
    </Scene3DWrapper>
  );
}
