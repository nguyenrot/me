"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Scene3DWrapper from "./Scene3DWrapper";

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

const PROJECT_ACCENTS = ["#ffd700", "#00f5ff", "#aa00ff", "#ff00aa", "#00ff88", "#ffaa00"];

/* ═══ TreasureOrbs — glowing orbs per project ═══ */
function TreasureOrbs() {
  const group = useRef<THREE.Group>(null);
  const orbs = useMemo(() =>
    PROJECT_ACCENTS.map((color, i) => {
      const angle = (i / PROJECT_ACCENTS.length) * Math.PI * 2;
      return { x: Math.cos(angle) * 7, y: Math.sin(angle) * 4, z: -8 - i, color, phase: i * 1.1 };
    }), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const o = orbs[i]; if (!o) return;
      child.position.y = o.y + Math.sin(t * 0.4 + o.phase) * 0.6;
      child.position.x = o.x + Math.cos(t * 0.3 + o.phase) * 0.3;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh key={i} position={[o.x, o.y, o.z]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshBasicMaterial color={o.color} transparent opacity={0.6} toneMapped={false} />
          <pointLight color={o.color} intensity={0.5} distance={4} decay={2} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ VaultGate — wireframe hexagonal gate ═══ */
function VaultGate() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = clock.getElapsedTime() * 0.05;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -14]}>
      <torusGeometry args={[8, 0.03, 6, 6]} />
      <meshBasicMaterial color="#ffd700" transparent opacity={0.1} toneMapped={false} wireframe />
    </mesh>
  );
}

/* ═══ SpiritDust — ambient golden particles ═══ */
function SpiritDust() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 300;
  const glow = useMemo(() => makeGlow(), []);
  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 28;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14;
      p[i * 3 + 2] = -4 - Math.random() * 12;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const arr = (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] += 0.005;
      arr[i * 3] += Math.sin(t * 0.2 + i * 0.3) * 0.002;
      if (arr[i * 3 + 1] > 7) { arr[i * 3 + 1] = -7; arr[i * 3] = (Math.random() - 0.5) * 28; }
    }
    (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} map={glow} alphaMap={glow} transparent opacity={0.3}
        color="#ffd700" depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function LinksSceneContent() {
  return (<><TreasureOrbs /><VaultGate /><SpiritDust /></>);
}

export default function LinksScene() {
  return (
    <Scene3DWrapper fog={[14, 36]} bloomIntensity={0.85} cameraParallax={0.5}>
      <LinksSceneContent />
    </Scene3DWrapper>
  );
}
