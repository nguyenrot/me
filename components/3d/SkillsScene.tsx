"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Scene3DWrapper from "./Scene3DWrapper";

/* ─── Glow texture ─── */
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

/* ═══ Skill colors/levels passed as props to keep in sync ═══ */
const SKILL_COLORS = ["#ffd700", "#00f5ff", "#aa00ff", "#ff00aa", "#ffd700", "#00f5ff", "#aa00ff"];
const SKILL_LEVELS = [92, 88, 90, 85, 83, 78, 87];

/* ═══ 1. Energy Pillars — one vertical beam per skill ═══ */
function EnergyPillars() {
  const group = useRef<THREE.Group>(null);

  const pillars = useMemo(() =>
    SKILL_COLORS.map((color, i) => ({
      x: (i - 3) * 3.2,
      height: (SKILL_LEVELS[i] / 100) * 6,
      color,
      phase: i * 0.8,
    })),
  []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const p = pillars[i];
      if (!p) return;
      const pulse = 0.08 + Math.sin(t * 0.8 + p.phase) * 0.04;
      (child as THREE.Mesh).material = (child as THREE.Mesh).material;
      ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = pulse;
    });
  });

  return (
    <group ref={group} position={[0, -2, -10]}>
      {pillars.map((p, i) => (
        <mesh key={i} position={[p.x, p.height / 2 - 2, 0]}>
          <cylinderGeometry args={[0.06, 0.12, p.height, 6]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={0.1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══ 2. Rune Circle — rotating rune sprites ═══ */
function makeRuneTexture(char: string, color: string): THREE.CanvasTexture {
  const size = 96;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, color + "33");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  ctx.font = `bold ${size * 0.5}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillText(char, size / 2, size / 2);
  ctx.fillText(char, size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function RuneCircle() {
  const group = useRef<THREE.Group>(null);
  const RUNES = ["道", "氣", "元", "仙", "劍", "靈", "功", "修"];

  const runeData = useMemo(() =>
    RUNES.map((r, i) => {
      const angle = (i / RUNES.length) * Math.PI * 2;
      const color = i % 2 === 0 ? "#aa44ff" : "#00ccff";
      return {
        rune: r,
        x: Math.cos(angle) * 8,
        z: Math.sin(angle) * 8,
        texture: makeRuneTexture(r, color),
      };
    }),
  []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.getElapsedTime() * 0.06;
  });

  return (
    <group ref={group} position={[0, 0, -12]}>
      {runeData.map((d) => (
        <sprite key={d.rune} position={[d.x, 0, d.z]} scale={[1.4, 1.4, 1]}>
          <spriteMaterial
            map={d.texture}
            transparent
            opacity={0.5}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ═══ 3. QiStreams — horizontal flowing particles ═══ */
function QiStreams() {
  const points = useRef<THREE.Points>(null);
  const COUNT = 300;
  const glow = useMemo(() => makeGlow(), []);

  const { positions, velocities } = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    const v = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12;
      p[i * 3 + 2] = -6 - Math.random() * 12;
      v[i] = 0.02 + Math.random() * 0.04;
    }
    return { positions: p, velocities: v };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const arr = (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const t = clock.getElapsedTime();
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += velocities[i];
      arr[i * 3 + 1] += Math.sin(t * 0.5 + i * 0.1) * 0.003;
      if (arr[i * 3] > 15) arr[i * 3] = -15;
    }
    (points.current.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={glow}
        alphaMap={glow}
        transparent
        opacity={0.4}
        color="#00ccff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ═══ Assembled ═══ */
function SkillsSceneContent() {
  return (
    <>
      <EnergyPillars />
      <RuneCircle />
      <QiStreams />
    </>
  );
}

export default function SkillsScene() {
  return (
    <Scene3DWrapper fog={[14, 36]} bloomIntensity={0.9} cameraParallax={0.5}>
      <SkillsSceneContent />
    </Scene3DWrapper>
  );
}
