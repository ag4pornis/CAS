import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function FloatingParticles() {
  const particlesRef = useRef();
  const count = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.elapsedTime;
    particlesRef.current.rotation.y = t * 0.02;
    particlesRef.current.position.y = Math.sin(t * 0.1) * 0.5;
  });

  return (
    <group ref={particlesRef}>
      {/* Use simple points for background particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.04}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* A few larger glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Float
          key={i}
          speed={0.5 + Math.random()}
          rotationIntensity={0}
          floatIntensity={0.5 + Math.random() * 0.5}
          floatingRange={[-0.3, 0.3]}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 6 - 2,
            ]}
          >
            <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
            <meshStandardMaterial
              color={
                ["#c084fc", "#fb923c", "#38bdf8", "#34d399"][
                  Math.floor(Math.random() * 4)
                ]
              }
              emissive={
                ["#c084fc", "#fb923c", "#38bdf8", "#34d399"][
                  Math.floor(Math.random() * 4)
                ]
              }
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
