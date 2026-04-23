"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { ReactNode, useRef } from "react";

/* ── Camera parallax rig (reused pattern from Hero) ── */
function CameraRig({ strength = 0.6 }: { strength?: number }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * strength,
      0.02
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * strength * 0.6,
      0.02
    );
    state.camera.lookAt(0, 0, -4);
  });
  return null;
}

/* ── Props ── */
interface Scene3DWrapperProps {
  children: ReactNode;
  /** [near, far] fog distances */
  fog?: [number, number];
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomRadius?: number;
  cameraParallax?: number;
  className?: string;
  /** Absolute height CSS — default "100%" */
  height?: string;
}

/**
 * Reusable per-section 3D scene wrapper.
 * Renders a Canvas with Bloom + fog + camera parallax behind section content.
 */
export default function Scene3DWrapper({
  children,
  fog = [18, 40],
  bloomIntensity = 0.8,
  bloomThreshold = 0.25,
  bloomRadius = 0.6,
  cameraParallax = 0.6,
  className = "",
  height = "100%",
}: Scene3DWrapperProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ height }}
    >
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
        <fog attach="fog" args={["#020208", fog[0], fog[1]]} />
        <ambientLight intensity={0.12} />
        {children}
        <CameraRig strength={cameraParallax} />
        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={bloomThreshold}
            luminanceSmoothing={0.9}
            radius={bloomRadius}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
