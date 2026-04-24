"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   CONFIG — Tweak these values to customize the scene
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  // StarField
  STAR_COUNT: 3000,
  STAR_SPREAD: 60,
  STAR_DEPTH: 40,

  // Qi Energy Particles
  QI_COUNT: 800,
  QI_SPREAD: 28,
  QI_SPEED: 0.006,
  QI_COLOR: "#aa44ff",

  // Floating Runes
  RUNES: ["道", "氣", "元", "仙", "∞"] as const,
  RUNE_RADIUS: 5,
  RUNE_SIZE: 0.8,
  RUNE_ROTATE_SPEED: 0.15,

  // Energy Orb
  ORB_RADIUS: 0.6,
  ORB_COLOR: "#8844ff",
  ORB_INTENSITY: 2.5,
  ORB_RING_COUNT: 3,

  // Camera
  CAM_PARALLAX_X: 1.2,
  CAM_PARALLAX_Y: 0.8,
  CAM_LERP: 0.025,
  CAM_SCROLL_DEPTH: 12,

  // Bloom
  BLOOM_INTENSITY: 1.2,
  BLOOM_THRESHOLD: 0.2,
  BLOOM_RADIUS: 0.8,
};

/* ─── GLOW TEXTURE (shared) ─── */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
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

/* ═══════════════════════════════════════════
   1. STAR FIELD — dark cosmic background
   ═══════════════════════════════════════════ */
function StarField() {
  const positions = useMemo(() => {
    const arr = new Float32Array(CONFIG.STAR_COUNT * 3);
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * CONFIG.STAR_SPREAD;
      arr[i * 3 + 1] = (Math.random() - 0.5) * CONFIG.STAR_SPREAD;
      arr[i * 3 + 2] = -Math.random() * CONFIG.STAR_DEPTH - 2;
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(CONFIG.STAR_COUNT);
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      s[i] = 0.02 + Math.random() * 0.04;
    }
    return s;
  }, []);

  const glowTex = useMemo(() => makeGlowTexture(), []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.7}
        color="#c8d8ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ═══════════════════════════════════════════
   2. QI ENERGY PARTICLES — flowing streams
   ═══════════════════════════════════════════ */
function QiParticles() {
  const points = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(CONFIG.QI_COUNT * 3);
    const vel = new Float32Array(CONFIG.QI_COUNT * 3);
    const col = new Float32Array(CONFIG.QI_COUNT * 3);
    const purple = new THREE.Color("#aa44ff");
    const cyan = new THREE.Color("#00ccff");

    for (let i = 0; i < CONFIG.QI_COUNT; i++) {
      const i3 = i * 3;
      // Spawn in a cylindrical volume
      const angle = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * CONFIG.QI_SPREAD * 0.5;
      pos[i3] = Math.cos(angle) * r;
      pos[i3 + 1] = (Math.random() - 0.5) * 18;
      pos[i3 + 2] = Math.sin(angle) * r - 6;
      // Upward spiraling velocity
      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = CONFIG.QI_SPEED + Math.random() * 0.004;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
      // Color gradient purple → cyan
      const t = Math.random();
      const c = purple.clone().lerp(cyan, t);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
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
      // Spiral flow
      arr[i3] += velocities[i3] + Math.sin(time * 0.2 + i * 0.05) * 0.003;
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.15 + i * 0.03) * 0.002;
      // Reset if too high
      if (arr[i3 + 1] > 12) {
        arr[i3 + 1] = -12;
        const angle = Math.random() * Math.PI * 2;
        const r = 2 + Math.random() * CONFIG.QI_SPREAD * 0.5;
        arr[i3] = Math.cos(angle) * r;
        arr[i3 + 2] = Math.sin(angle) * r - 6;
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
        opacity={0.65}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. FLOATING RUNES — 道 氣 元 仙 ∞ rotating in 3D space
   Uses canvas-rendered texture sprites (no external font file)
   ═══════════════════════════════════════════════════════════ */

// Render a single character to a canvas texture
function makeRuneTexture(char: string, color: string): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Glow backdrop
  const glow = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  glow.addColorStop(0, color + "44");
  glow.addColorStop(0.5, color + "11");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  // Character
  ctx.font = `bold ${size * 0.55}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.fillText(char, size / 2, size / 2);
  // Double pass for stronger glow
  ctx.fillText(char, size / 2, size / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function FloatingRunes() {
  const group = useRef<THREE.Group>(null);

  // Precomputed positions + textures
  const runeData = useMemo(() =>
    CONFIG.RUNES.map((rune, i) => {
      const angle = (i / CONFIG.RUNES.length) * Math.PI * 2;
      const color = i % 2 === 0 ? "#bb66ff" : "#00ccff";
      return {
        rune,
        x: Math.cos(angle) * CONFIG.RUNE_RADIUS,
        y: Math.sin(angle) * CONFIG.RUNE_RADIUS * 0.6,
        z: Math.sin(angle) * 2,
        phase: i * 1.2,
        texture: makeRuneTexture(rune, color),
      };
    }),
  []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.rotation.y = time * CONFIG.RUNE_ROTATE_SPEED;

    group.current.children.forEach((child, i) => {
      const data = runeData[i];
      if (!data) return;
      child.position.y = data.y + Math.sin(time * 0.5 + data.phase) * 0.5;
    });
  });

  return (
    <group ref={group} position={[0, 0, -5]}>
      {runeData.map((d) => (
        <sprite
          key={d.rune}
          position={[d.x, d.y, d.z]}
          scale={[CONFIG.RUNE_SIZE * 2, CONFIG.RUNE_SIZE * 2, 1]}
        >
          <spriteMaterial
            map={d.texture}
            transparent
            opacity={0.9}
            toneMapped={false}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   4. ENERGY ORB — central glowing sphere + rings
   ═══════════════════════════════════════════════════ */
function EnergyOrb() {
  const group = useRef<THREE.Group>(null);
  const orbMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();

    // Pulsing orb
    const pulse = 1 + Math.sin(time * 2) * 0.08;
    group.current.scale.setScalar(pulse);

    // Rotate rings
    group.current.children.forEach((child, i) => {
      if (i > 0) {
        child.rotation.x = time * 0.3 * (i % 2 === 0 ? 1 : -1) + i * 0.5;
        child.rotation.z = time * 0.2 * (i % 2 === 0 ? -1 : 1);
      }
    });

    // Pulsing brightness
    if (orbMat.current) {
      const brightness = 0.8 + Math.sin(time * 3) * 0.2;
      orbMat.current.opacity = brightness;
    }
  });

  const ringConfigs = useMemo(
    () => [
      { radius: 1.2, tube: 0.012, color: "#aa44ff", opacity: 0.4 },
      { radius: 1.6, tube: 0.01, color: "#00ccff", opacity: 0.3 },
      { radius: 2.1, tube: 0.008, color: "#6622cc", opacity: 0.2 },
    ],
    []
  );

  return (
    <group ref={group} position={[0, 0, -6]}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[CONFIG.ORB_RADIUS, 32, 32]} />
        <meshBasicMaterial
          ref={orbMat}
          color={CONFIG.ORB_COLOR}
          transparent
          opacity={0.85}
          toneMapped={false}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[CONFIG.ORB_RADIUS * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={CONFIG.ORB_COLOR}
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        color={CONFIG.ORB_COLOR}
        intensity={CONFIG.ORB_INTENSITY}
        distance={15}
        decay={2}
      />

      {/* Rotating rings */}
      {ringConfigs.map((ring, i) => (
        <mesh key={i} rotation={[0.5 + i * 0.8, i * 0.3, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 64]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════
   5. CAMERA RIG — parallax + scroll
   ═══════════════════════════════════════════ */
function CameraRig({
  scrollProgress,
}: {
  scrollProgress: React.RefObject<number>;
}) {
  useFrame((state) => {
    const scroll = scrollProgress.current ?? 0;

    // Mouse parallax
    const targetX = state.pointer.x * CONFIG.CAM_PARALLAX_X;
    const targetY = state.pointer.y * CONFIG.CAM_PARALLAX_Y;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      CONFIG.CAM_LERP
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      CONFIG.CAM_LERP
    );

    // Scroll: camera moves deeper into scene
    const targetZ = 10 - scroll * CONFIG.CAM_SCROLL_DEPTH;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      CONFIG.CAM_LERP
    );

    state.camera.lookAt(0, 0, -6);
  });

  return null;
}

/* ═══════════════════════════════════════════════════
   7. NEBULA BACKGROUND — subtle purple-cyan glow
   ═══════════════════════════════════════════════════ */
function NebulaGlow() {
  return (
    <group>
      <ambientLight intensity={0.08} color="#8866cc" />
      <directionalLight position={[5, 8, 5]} intensity={0.15} color="#aa66ff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.08} color="#00ccff" />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SCENE — exported, consumed by Hero3D.tsx via dynamic
   ═══════════════════════════════════════════════════════════ */
export default function Hero3DScene({
  scrollProgress,
}: {
  scrollProgress: React.RefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#020208", 18, 40]} />

      <NebulaGlow />
      <StarField />
      <QiParticles />
      <FloatingRunes />
      <EnergyOrb />
      <CameraRig scrollProgress={scrollProgress} />

      {/* Postprocessing — Bloom for the glow */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={CONFIG.BLOOM_THRESHOLD}
          intensity={CONFIG.BLOOM_INTENSITY}
          mipmapBlur
          radius={CONFIG.BLOOM_RADIUS}
        />
      </EffectComposer>
    </Canvas>
  );
}
