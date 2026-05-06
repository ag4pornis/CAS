import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function PaintPalette({ scrollProgress, visible }) {
  const groupRef = useRef();

  // Palette shape
  const paletteShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Kidney/palette shape
    shape.moveTo(0, -1.2);
    shape.bezierCurveTo(1.8, -1.2, 2.2, 0, 2.0, 0.8);
    shape.bezierCurveTo(1.8, 1.6, 0.5, 1.8, 0, 1.5);
    shape.bezierCurveTo(-0.5, 1.8, -1.8, 1.6, -2.0, 0.8);
    shape.bezierCurveTo(-2.2, 0, -1.8, -1.2, 0, -1.2);

    // Thumb hole
    const holePath = new THREE.Path();
    holePath.absellipse(-0.6, 0.3, 0.35, 0.35, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    }),
    []
  );

  // Paint blob positions and colors
  const paintBlobs = useMemo(
    () => [
      { pos: [0.8, 0.8, 0.18], color: "#e74c3c", scale: 0.18 },
      { pos: [1.3, 0.3, 0.18], color: "#f1c40f", scale: 0.15 },
      { pos: [1.4, -0.3, 0.18], color: "#2ecc71", scale: 0.17 },
      { pos: [0.9, -0.6, 0.18], color: "#3498db", scale: 0.16 },
      { pos: [0.3, -0.8, 0.18], color: "#9b59b6", scale: 0.14 },
      { pos: [1.0, 0.0, 0.18], color: "#e67e22", scale: 0.13 },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Floating animation
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.1 - 0.3;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 + t * 0.1;
    groupRef.current.rotation.z = Math.cos(t * 0.4) * 0.05;

    // Scale based on visibility
    const targetScale = visible ? 1 : 0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.03
    );

    // Vertical position: rise from below
    const targetY = visible ? 0 : -4;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.03;
  });

  return (
    <group ref={groupRef} scale={0} position={[0, -4, 0]}>
      {/* Palette base */}
      <mesh castShadow>
        <extrudeGeometry args={[paletteShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#8B6914"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Paint blobs */}
      {paintBlobs.map((blob, i) => (
        <mesh key={i} position={blob.pos} castShadow>
          <sphereGeometry args={[blob.scale, 16, 16]} />
          <meshStandardMaterial
            color={blob.color}
            roughness={0.3}
            metalness={0.1}
            emissive={blob.color}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Brush handle */}
      <group position={[1.6, -0.8, 0.15]} rotation={[0, 0, -0.7]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.05, 2.2, 8]} />
          <meshStandardMaterial color="#D2691E" roughness={0.7} />
        </mesh>
        {/* Brush ferrule */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Brush tip */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <coneGeometry args={[0.06, 0.3, 8]} />
          <meshStandardMaterial color="#c084fc" roughness={0.5} emissive="#c084fc" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Glow */}
      <pointLight
        color="#c084fc"
        intensity={visible ? 2 : 0}
        distance={5}
        position={[0, 0, 1]}
      />
    </group>
  );
}
