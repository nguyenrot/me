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

const JOURNEY_ACCENTS = ["#ffd700", "#00f5ff", "#aa00ff", "#ff00aa", "#ffd700"];

function PortalRings() {
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(() =>
    JOURNEY_ACCENTS.map((color, i) => ({
      y: 4 - i * 3, z: -8 - i * 2, radius: 2.5 + i * 0.5,
      color, rotSpeed: 0.12 + i * 0.03, rotOffset: i * 0.8,
    })), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const r = rings[i]; if (!r) return;
      child.rotation.x = t * r.rotSpeed + r.rotOffset;
      child.rotation.z = Math.sin(t * 0.2 + r.rotOffset) * 0.3;
    });
  });

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} position={[0, r.y, r.z]} rotation={[0.4 + i * 0.3, 0, 0]}>
          <torusGeometry args={[r.radius, 0.02, 8, 48]} />
          <meshBasicMaterial color={r.color} transparent opacity={0.18} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function TimePath() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 400;
  const glow = useMemo(() => makeGlow(), []);
  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = -8 + Math.random() * 2;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = -5 - Math.random() * 8;
    }
    return p;
  }, []);

  useFrame(() => {
    if (!points.current) return;
    const arr = (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 1] -= 0.015;
      if (arr[i * 3 + 1] < -15) { arr[i * 3 + 1] = 15; arr[i * 3] = -8 + Math.random() * 2; }
    }
    (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} map={glow} alphaMap={glow} transparent opacity={0.35}
        color="#aa66ff" depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function MiniSwords() {
  const COUNT = 20;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const swords = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => ({
      angle: (i / COUNT) * Math.PI * 2, radius: 9 + Math.random() * 4,
      y: (Math.random() - 0.5) * 12, speed: 0.04 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
    })), []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const v = new Float32Array([0, 0.4, 0, -0.04, 0, 0, 0.04, 0, 0, 0, -0.15, 0, -0.03, 0, 0, 0.03, 0, 0]);
    g.setAttribute("position", new THREE.BufferAttribute(v, 3));
    g.setIndex([0, 1, 2, 3, 4, 5]);
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    swords.forEach((s, i) => {
      const a = s.angle + t * s.speed;
      dummy.position.set(Math.cos(a) * s.radius, s.y + Math.sin(t * 0.3 + s.phase) * 0.5, Math.sin(a) * s.radius - 10);
      dummy.rotation.set(0, 0, a + Math.PI / 2);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, COUNT]} frustumCulled={false}>
      <meshBasicMaterial color="#8844ff" transparent opacity={0.5} toneMapped={false} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

function ExperienceSceneContent() {
  return (<><PortalRings /><TimePath /><MiniSwords /></>);
}

export default function ExperienceScene() {
  return (
    <Scene3DWrapper fog={[14, 38]} bloomIntensity={0.8} cameraParallax={0.4}>
      <ExperienceSceneContent />
    </Scene3DWrapper>
  );
}
