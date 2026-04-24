"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Scene3DWrapper from "./Scene3DWrapper";

const CONFIG = {
  STAR_COUNT: 900,
  STAR_SPREAD: 44,
  STAR_DEPTH: 34,
  QI_COUNT: 320,
  QI_SPREAD: 24,
  QI_SPEED: 0.005,
  RUNES: ["道", "氣", "元", "仙", "∞"] as const,
  RUNE_RADIUS: 6,
  RUNE_SIZE: 0.9,
};

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

function makeGlowTexture(size = 64): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.3, "rgba(255,255,255,0.6)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function makeRuneTexture(char: string, color: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const glow = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, `${color}44`);
  glow.addColorStop(0.5, `${color}11`);
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  ctx.font = `bold ${size * 0.55}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.fillText(char, size / 2, size / 2);
  ctx.fillText(char, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function NebulaGlow() {
  return (
    <group>
      <mesh position={[0, 0, -30]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color="#1a0533" transparent opacity={0.28} toneMapped={false} />
      </mesh>
      <ambientLight intensity={0.08} color="#8866cc" />
      <directionalLight position={[5, 8, 5]} intensity={0.12} color="#aa66ff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.08} color="#00ccff" />
    </group>
  );
}

function StarField() {
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const positions = useMemo(() => {
    const rand = mulberry32(1001);
    const arr = new Float32Array(CONFIG.STAR_COUNT * 3);
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      arr[i * 3] = (rand() - 0.5) * CONFIG.STAR_SPREAD;
      arr[i * 3 + 1] = (rand() - 0.5) * CONFIG.STAR_SPREAD;
      arr[i * 3 + 2] = -rand() * CONFIG.STAR_DEPTH - 2;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.58}
        color="#c8d8ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function QiParticles() {
  const points = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const { positions, velocities, colors } = useMemo(() => {
    const rand = mulberry32(2002);
    const pos = new Float32Array(CONFIG.QI_COUNT * 3);
    const vel = new Float32Array(CONFIG.QI_COUNT * 3);
    const col = new Float32Array(CONFIG.QI_COUNT * 3);
    const purple = new THREE.Color("#aa44ff");
    const cyan = new THREE.Color("#00ccff");

    for (let i = 0; i < CONFIG.QI_COUNT; i++) {
      const i3 = i * 3;
      const angle = rand() * Math.PI * 2;
      const radius = 2 + rand() * CONFIG.QI_SPREAD * 0.5;
      pos[i3] = Math.cos(angle) * radius;
      pos[i3 + 1] = (rand() - 0.5) * 14;
      pos[i3 + 2] = Math.sin(angle) * radius - 7;
      vel[i3] = (rand() - 0.5) * 0.002;
      vel[i3 + 1] = CONFIG.QI_SPEED + rand() * 0.004;
      vel[i3 + 2] = (rand() - 0.5) * 0.002;

      const color = purple.clone().lerp(cyan, rand());
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < CONFIG.QI_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 0.2 + i * 0.05) * 0.003;
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.15 + i * 0.03) * 0.002;

      if (arr[i3 + 1] > 10) {
        const angle = seededUnit(i * 12.9898 + Math.floor(time) * 78.233) * Math.PI * 2;
        const radius = 2 + seededUnit(i * 39.3468 + Math.floor(time) * 11.135) * CONFIG.QI_SPREAD * 0.5;
        arr[i3] = Math.cos(angle) * radius;
        arr[i3 + 1] = -10;
        arr[i3 + 2] = Math.sin(angle) * radius - 7;
      }
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.62}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRunes() {
  const group = useRef<THREE.Group>(null);
  const runeData = useMemo(
    () =>
      CONFIG.RUNES.map((rune, i) => {
        const angle = (i / CONFIG.RUNES.length) * Math.PI * 2;
        const color = i % 2 === 0 ? "#bb66ff" : "#00ccff";
        return {
          rune,
          x: Math.cos(angle) * CONFIG.RUNE_RADIUS,
          y: Math.sin(angle) * CONFIG.RUNE_RADIUS * 0.55,
          z: Math.sin(angle) * 2 - 5,
          phase: i * 1.2,
          texture: makeRuneTexture(rune, color),
        };
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = time * 0.12;
    group.current.children.forEach((child, i) => {
      const data = runeData[i];
      if (!data) return;
      child.position.y = data.y + Math.sin(time * 0.5 + data.phase) * 0.45;
    });
  });

  return (
    <group ref={group} position={[0, 0, -4]}>
      {runeData.map((data) => (
        <sprite key={data.rune} position={[data.x, data.y, data.z]} scale={[CONFIG.RUNE_SIZE * 2, CONFIG.RUNE_SIZE * 2, 1]}>
          <spriteMaterial
            map={data.texture}
            transparent
            opacity={0.58}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

function EnergyOrb() {
  const group = useRef<THREE.Group>(null);
  const orbMat = useRef<THREE.MeshBasicMaterial>(null);
  const rings = useMemo(
    () => [
      { radius: 1.2, tube: 0.012, color: "#aa44ff", opacity: 0.34 },
      { radius: 1.6, tube: 0.01, color: "#00ccff", opacity: 0.26 },
      { radius: 2.1, tube: 0.008, color: "#6622cc", opacity: 0.18 },
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.scale.setScalar(1 + Math.sin(time * 2) * 0.08);
    group.current.children.forEach((child, i) => {
      if (i > 0) {
        child.rotation.x = time * 0.3 * (i % 2 === 0 ? 1 : -1) + i * 0.5;
        child.rotation.z = time * 0.2 * (i % 2 === 0 ? -1 : 1);
      }
    });
    if (orbMat.current) {
      orbMat.current.opacity = 0.68 + Math.sin(time * 3) * 0.14;
    }
  });

  return (
    <group ref={group} position={[0, 0, -8]}>
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial ref={orbMat} color="#8844ff" transparent opacity={0.75} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshBasicMaterial color="#8844ff" transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <pointLight color="#8844ff" intensity={2} distance={14} decay={2} />
      {rings.map((ring, i) => (
        <mesh key={ring.color} rotation={[0.5 + i * 0.8, i * 0.3, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 64]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroSectionScene() {
  return (
    <Scene3DWrapper fog={[18, 40]} bloomIntensity={1.05} bloomThreshold={0.2} bloomRadius={0.8} cameraParallax={0.7}>
      <NebulaGlow />
      <StarField />
      <QiParticles />
      <FloatingRunes />
      <EnergyOrb />
    </Scene3DWrapper>
  );
}
