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

/* ═══ LotusFormation — golden lotus petals ═══ */
function LotusFormation() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.4) * 0.3;
    group.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={group} position={[0, 0, -8]} scale={1.2}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i}
          position={[Math.cos((i * Math.PI * 2) / 6) * 0.3, 0, Math.sin((i * Math.PI * 2) / 6) * 0.3]}
          rotation={[0.6, (i * Math.PI * 2) / 6, 0]}>
          <coneGeometry args={[0.14, 0.4, 4]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      ))}
      <mesh><sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.8} toneMapped={false} />
      </mesh>
      <pointLight color="#ffd700" intensity={0.8} distance={5} decay={2} />
    </group>
  );
}

/* ═══ QiSeal — golden torus circle ═══ */
function QiSeal() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.z = t * 0.08;
    const scale = 1 + Math.sin(t * 0.6) * 0.05;
    mesh.current.scale.set(scale, scale, 1);
  });

  return (
    <mesh ref={mesh} position={[0, 0, -10]}>
      <torusGeometry args={[3, 0.025, 8, 64]} />
      <meshBasicMaterial color="#ffd700" transparent opacity={0.15} toneMapped={false} />
    </mesh>
  );
}

/* ═══ SealParticles — spiral inward ═══ */
function SealParticles() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 100;
  const glow = useMemo(() => makeGlow(), []);
  const { positions, angles } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const a = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      a[i] = (i / COUNT) * Math.PI * 2;
      const r = 3 + Math.random() * 3;
      p[i * 3] = Math.cos(a[i]) * r;
      p[i * 3 + 1] = Math.sin(a[i]) * r;
      p[i * 3 + 2] = -8 - Math.random() * 4;
    }
    return { positions: p, angles: a };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const arr = (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      angles[i] += 0.003;
      const r = 2 + Math.sin(t * 0.3 + i * 0.2) * 2;
      arr[i * 3] = Math.cos(angles[i]) * r;
      arr[i * 3 + 1] = Math.sin(angles[i]) * r;
    }
    (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} map={glow} alphaMap={glow} transparent opacity={0.4}
        color="#ffd700" depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function FooterSceneContent() {
  return (<><LotusFormation /><QiSeal /><SealParticles /></>);
}

export default function FooterScene() {
  return (
    <Scene3DWrapper fog={[12, 30]} bloomIntensity={0.7} cameraParallax={0.3}>
      <FooterSceneContent />
    </Scene3DWrapper>
  );
}
