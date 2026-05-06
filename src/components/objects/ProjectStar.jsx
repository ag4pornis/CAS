import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ProjectStar({ scrollProgress, visible }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ringsRef = useRef([]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Slow majestic rotation
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;

    // Inner core spins faster
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.x = t * 0.3;
    }

    // Orbital rings
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * (0.2 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.4 + i) * 0.2;
      }
    });

    const targetScale = visible ? 1.3 : 0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.03
    );

    const targetY = visible ? 0 : -5;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.03;
  });

  return (
    <group ref={groupRef} scale={0} position={[0, -5, 0]}>
      {/* Outer icosahedron (wireframe) */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.3}
          emissive="#34d399"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner dodecahedron */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#34d399"
          roughness={0.2}
          metalness={0.5}
          emissive="#34d399"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#34d399"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* Orbital rings */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation={[Math.PI * 0.5, 0, (i * Math.PI) / 3]}
        >
          <torusGeometry args={[1.0 + i * 0.2, 0.015, 8, 64]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Removed particles for a clean, professional look */}

      {/* Main glow light */}
      <pointLight
        color="#34d399"
        intensity={visible ? 4 : 0}
        distance={8}
        position={[0, 0, 0]}
      />
    </group>
  );
}
