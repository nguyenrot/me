"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ─── GLOW TEXTURE ─── */
function makeGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
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

/* ─── GOLDEN QI PARTICLES ─── */
function GoldenQiParticles() {
  const COUNT = 2500;
  const points = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = 0.004 + Math.random() * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      s[i] = 0.03 + Math.random() * 0.06;
    }
    return s;
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const time = clock.getElapsedTime();
    const mx = pointer.x * 12;
    const my = pointer.y * 8;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Apply velocity
      arr[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.002;
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      // Reset if too high
      if (arr[i3 + 1] > 12) {
        arr[i3 + 1] = -12;
        arr[i3] = (Math.random() - 0.5) * 30;
        arr[i3 + 2] = (Math.random() - 0.5) * 16 - 2;
      }

      // Mouse repulsion
      const dx = arr[i3] - mx;
      const dy = arr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.015;
        arr[i3] += (dx / dist) * force;
        arr[i3 + 1] += (dy / dist) * force;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.75}
        color="#ffd700"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── NEON CYBER PARTICLES ─── */
function NeonParticles() {
  const COUNT = 1200;
  const points = useRef<THREE.Points>(null);
  const glowTex = useMemo(() => makeGlowTexture(), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const neonColors = [
      [0, 0.96, 1], // cyan
      [1, 0, 0.67], // magenta
      [0.67, 0, 1], // violet
    ];
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 3;
      const c = neonColors[i % 3];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const attr = points.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += Math.sin(time * 0.15 + i * 0.5) * 0.003;
      arr[i3 + 1] += Math.cos(time * 0.12 + i * 0.3) * 0.002;
      arr[i3 + 2] += Math.sin(time * 0.1 + i * 0.7) * 0.001;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        map={glowTex}
        alphaMap={glowTex}
        transparent
        opacity={0.5}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── SPIRITUAL ORBS ─── */
function SpiritualOrbs() {
  const group = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    return [
      { pos: [-7, 3, -6] as [number, number, number], color: "#ffd700", size: 0.25, speed: 0.3 },
      { pos: [8, -2, -8] as [number, number, number], color: "#00f5ff", size: 0.2, speed: 0.25 },
      { pos: [-5, -4, -5] as [number, number, number], color: "#aa00ff", size: 0.18, speed: 0.35 },
      { pos: [6, 4, -7] as [number, number, number], color: "#ff00aa", size: 0.22, speed: 0.28 },
      { pos: [0, 5, -9] as [number, number, number], color: "#ffd700", size: 0.3, speed: 0.2 },
      { pos: [-9, 0, -6] as [number, number, number], color: "#00f5ff", size: 0.15, speed: 0.32 },
    ];
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.y =
        orb.pos[1] + Math.sin(time * orb.speed + i * 2) * 0.8;
      child.position.x =
        orb.pos[0] + Math.cos(time * orb.speed * 0.7 + i) * 0.5;
    });
  });

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos}>
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.6}
          />
          <pointLight
            color={orb.color}
            intensity={0.8}
            distance={6}
            decay={2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── ENERGY RINGS ─── */
function EnergyRings() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.15 * (i % 2 === 0 ? 1 : -1);
      child.rotation.z = time * 0.1 * (i % 2 === 0 ? -1 : 1);
    });
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -8]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[4, 0.015, 8, 64]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, -8]} rotation={[1.2, 0.8, 0]}>
        <torusGeometry args={[5.5, 0.012, 8, 64]} />
        <meshBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, -8]} rotation={[0.3, 1.5, 0.5]}>
        <torusGeometry args={[7, 0.01, 8, 64]} />
        <meshBasicMaterial
          color="#aa00ff"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

/* ─── FLOATING LOTUS ─── */
function FloatingLotus({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.getElapsedTime();
    group.current.position.y =
      position[1] + Math.sin(time * 0.4) * 0.3;
    group.current.rotation.y = time * 0.2;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Lotus petals - golden cones arranged in circle */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 6) * 0.25,
            0,
            Math.sin((i * Math.PI * 2) / 6) * 0.25,
          ]}
          rotation={[0.6, (i * Math.PI * 2) / 6, 0]}
        >
          <coneGeometry args={[0.12, 0.35, 4]} />
          <meshBasicMaterial
            color="#ffd700"
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.8} />
      </mesh>
      <pointLight color="#ffd700" intensity={0.5} distance={4} decay={2} />
    </group>
  );
}

/* ─── CAMERA RIG ─── */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.8,
      0.02
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.5,
      0.02
    );
    state.camera.lookAt(0, 0, -4);
  });

  return null;
}

/* ─── MAIN SCENE ─── */
export default function MeThreeScene() {
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
      <fog attach="fog" args={["#020208", 14, 28]} />
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.3}
        color="#ffd700"
      />
      <directionalLight
        position={[-5, 3, 2]}
        intensity={0.15}
        color="#00f5ff"
      />
      <GoldenQiParticles />
      <NeonParticles />
      <SpiritualOrbs />
      <EnergyRings />
      <FloatingLotus position={[-6, 3, -5]} scale={0.8} />
      <FloatingLotus position={[7, -2, -6]} scale={0.6} />
      <FloatingLotus position={[3, 5, -7]} scale={0.5} />
      <FloatingLotus position={[-4, -3, -4]} scale={0.7} />
      <CameraRig />
    </Canvas>
  );
}
