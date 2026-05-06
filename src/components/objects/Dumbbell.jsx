import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Dumbbell({ scrollProgress, visible }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Floating and rotating
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.y = t * 0.15 + Math.sin(t * 0.3) * 0.1;
    groupRef.current.rotation.z =
      Math.cos(t * 0.5) * 0.1 + Math.PI * 0.1;

    // Scale animation
    const targetScale = visible ? 1 : 0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.03
    );

    // Rise from below
    const targetY = visible ? 0 : -4;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.03;
  });

  const plateColor = "#333340";
  const barColor = "#888890";

  return (
    <group ref={groupRef} scale={0} position={[0, -4, 0]}>
      {/* Central bar */}
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.06, 3.0, 16]} />
        <meshStandardMaterial
          color={barColor}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Grip texture (knurling) */}
      <mesh>
        <cylinderGeometry args={[0.065, 0.065, 1.2, 16]} />
        <meshStandardMaterial
          color={barColor}
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Left weight plates */}
      {[0, 0.18, 0.36].map((offset, i) => (
        <mesh key={`l${i}`} position={[0, -1.1 - offset, 0]} castShadow>
          <cylinderGeometry
            args={[0.45 - i * 0.08, 0.45 - i * 0.08, 0.12, 24]}
          />
          <meshStandardMaterial
            color={plateColor}
            metalness={0.8}
            roughness={0.25}
            emissive="#fb923c"
            emissiveIntensity={0.05 + i * 0.03}
          />
        </mesh>
      ))}

      {/* Right weight plates */}
      {[0, 0.18, 0.36].map((offset, i) => (
        <mesh key={`r${i}`} position={[0, 1.1 + offset, 0]} castShadow>
          <cylinderGeometry
            args={[0.45 - i * 0.08, 0.45 - i * 0.08, 0.12, 24]}
          />
          <meshStandardMaterial
            color={plateColor}
            metalness={0.8}
            roughness={0.25}
            emissive="#fb923c"
            emissiveIntensity={0.05 + i * 0.03}
          />
        </mesh>
      ))}

      {/* Collars */}
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
        <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Orange glow */}
      <pointLight
        color="#fb923c"
        intensity={visible ? 2 : 0}
        distance={5}
        position={[0, 0, 1]}
      />
    </group>
  );
}
