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
  const v = Math.sin(seed) * 43758.5453;
  return v - Math.floor(v);
}

/* ─── GLOW TEXTURE ─── */
function makeGlowTexture(size = 64): THREE.CanvasTexture {
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

/* ─── NEBULA TEXTURE ─── */
function makeNebulaTexture(
  blobs: { cx: number; cy: number; r: number; color: string }[],
  size = 512
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  blobs.forEach(({ cx, cy, r, color }) => {
    const g = ctx.createRadialGradient(
      cx * size, cy * size, 0,
      cx * size, cy * size, r * size
    );
    g.addColorStop(0, color);
    g.addColorStop(0.5, color.replace(/[\d.]+\)$/, "0.3)"));
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── RUNE TEXTURE ─── */
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
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ─── COSMIC SKY — dark purple-blue base ─── */
function CosmicSky() {
  return (
    <mesh position={[0, 0, -45]} renderOrder={-10}>
      <planeGeometry args={[220, 130]} />
      <meshBasicMaterial color="#04010d" toneMapped={false} />
    </mesh>
  );
}

/* ─── NEBULA FIELD ─── */
const NEBULA_DEFS = [
  {
    pos: [-14, 4, -36] as [number, number, number],
    scale: 48,
    opacity: 0.28,
    blobs: [
      { cx: 0.5, cy: 0.45, r: 0.5, color: "rgba(130,30,255,0.9)" },
      { cx: 0.3, cy: 0.6, r: 0.35, color: "rgba(80,10,200,0.7)" },
      { cx: 0.7, cy: 0.3, r: 0.28, color: "rgba(60,0,160,0.5)" },
    ],
  },
  {
    pos: [16, -3, -32] as [number, number, number],
    scale: 38,
    opacity: 0.22,
    blobs: [
      { cx: 0.5, cy: 0.5, r: 0.5, color: "rgba(0,160,240,0.85)" },
      { cx: 0.65, cy: 0.35, r: 0.3, color: "rgba(0,100,200,0.6)" },
      { cx: 0.35, cy: 0.65, r: 0.25, color: "rgba(0,200,200,0.5)" },
    ],
  },
  {
    pos: [8, 10, -40] as [number, number, number],
    scale: 34,
    opacity: 0.18,
    blobs: [
      { cx: 0.5, cy: 0.5, r: 0.48, color: "rgba(220,0,130,0.8)" },
      { cx: 0.4, cy: 0.4, r: 0.3, color: "rgba(180,0,90,0.5)" },
    ],
  },
  {
    pos: [-6, -9, -38] as [number, number, number],
    scale: 40,
    opacity: 0.18,
    blobs: [
      { cx: 0.5, cy: 0.5, r: 0.5, color: "rgba(20,60,220,0.8)" },
      { cx: 0.6, cy: 0.4, r: 0.32, color: "rgba(40,20,180,0.5)" },
    ],
  },
  {
    pos: [2, 2, -28] as [number, number, number],
    scale: 26,
    opacity: 0.12,
    blobs: [
      { cx: 0.5, cy: 0.5, r: 0.5, color: "rgba(0,200,160,0.7)" },
      { cx: 0.4, cy: 0.6, r: 0.3, color: "rgba(0,160,120,0.4)" },
    ],
  },
];

function NebulaField() {
  const mats = useRef<THREE.SpriteMaterial[]>([]);
  const textures = useMemo(
    () => NEBULA_DEFS.map((n) => makeNebulaTexture(n.blobs)),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mats.current.forEach((mat, i) => {
      if (!mat) return;
      const base = NEBULA_DEFS[i].opacity;
      mat.opacity = base + Math.sin(t * 0.18 + i * 1.4) * base * 0.22;
    });
  });

  return (
    <group>
      {NEBULA_DEFS.map((n, i) => (
        <sprite key={i} position={n.pos} scale={[n.scale, n.scale, 1]}>
          <spriteMaterial
            ref={(el) => { if (el) mats.current[i] = el; }}
            map={textures[i]}
            transparent
            opacity={n.opacity}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ─── STARS — varied colors & sizes ─── */
function Stars() {
  const glowTex = useMemo(() => makeGlowTexture(), []);
  const COUNT = 2200;

  const { positions, colors, sizes } = useMemo(() => {
    const rand = mulberry32(3001);
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const siz = new Float32Array(COUNT);

    const starColors = [
      new THREE.Color("#c8d8ff"), // blue-white
      new THREE.Color("#ffffff"), // pure white
      new THREE.Color("#ffd8a8"), // warm yellow-white
      new THREE.Color("#a8c8ff"), // blue
      new THREE.Color("#ffcccc"), // reddish
      new THREE.Color("#ccffee"), // mint
    ];

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (rand() - 0.5) * 60;
      pos[i * 3 + 1] = (rand() - 0.5) * 40;
      pos[i * 3 + 2] = -2 - rand() * 36;

      const c = starColors[Math.floor(rand() * starColors.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      // Most stars small, some bigger/brighter
      const roll = rand();
      siz[i] = roll > 0.97 ? 0.18 + rand() * 0.12 : roll > 0.88 ? 0.07 + rand() * 0.06 : 0.03 + rand() * 0.04;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.85}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── MILKY WAY BAND — diagonal dense stars ─── */
function MilkyWay() {
  const glowTex = useMemo(() => makeGlowTexture(32), []);
  const COUNT = 1400;
  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(7777);
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const bandColor = new THREE.Color("#b8d0ff");
    const accentColor = new THREE.Color("#e8d4ff");

    for (let i = 0; i < COUNT; i++) {
      // Diagonal band: x correlates with y
      const t = (rand() - 0.5) * 50;
      const spread = (rand() - 0.5) * 8;
      pos[i * 3] = t * 0.7 + spread;
      pos[i * 3 + 1] = t * 0.4 + (rand() - 0.5) * 6;
      pos[i * 3 + 2] = -18 - rand() * 18;

      const c = rand() > 0.4 ? bandColor : accentColor;
      col[i * 3] = c.r * (0.5 + rand() * 0.5);
      col[i * 3 + 1] = c.g * (0.5 + rand() * 0.5);
      col[i * 3 + 2] = c.b * (0.5 + rand() * 0.5);
    }
    return { positions: pos, colors: col };
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.45}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── DRIFTING SPARKLES ─── */
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
        opacity={0.75}
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

/* ─── FLOATING RUNES ─── */
const RUNES = ["道", "氣", "元", "仙", "∞"] as const;
const RUNE_RADIUS = 7;

function FloatingRunes() {
  const group = useRef<THREE.Group>(null);
  const runeData = useMemo(
    () =>
      RUNES.map((rune, i) => {
        const angle = (i / RUNES.length) * Math.PI * 2;
        const color = i % 2 === 0 ? "#bb66ff" : "#00ccff";
        return {
          rune,
          x: Math.cos(angle) * RUNE_RADIUS,
          y: Math.sin(angle) * RUNE_RADIUS * 0.55,
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
    group.current.rotation.y = time * 0.1;
    group.current.children.forEach((child, i) => {
      const data = runeData[i];
      if (!data) return;
      child.position.y = data.y + Math.sin(time * 0.45 + data.phase) * 0.5;
    });
  });

  return (
    <group ref={group} position={[0, 0, -4]}>
      {runeData.map((data) => (
        <sprite key={data.rune} position={[data.x, data.y, data.z]} scale={[1.6, 1.6, 1]}>
          <spriteMaterial
            map={data.texture}
            transparent
            opacity={0.35}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
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
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <CosmicSky />
        <NebulaField />
        <MilkyWay />
        <Stars />
        <DriftSparkles />
        <QiStreams />
        <FloatingRunes />
        <CameraParallax />
      </Canvas>
    </div>
  );
}

const PageBackground = dynamic(() => Promise.resolve(PageBackgroundCanvas), {
  ssr: false,
  loading: () => null,
});

export default PageBackground;
