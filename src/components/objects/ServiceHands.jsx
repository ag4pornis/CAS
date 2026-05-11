import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ServiceHands({ visible }) {
  const groupRef = useRef();

  // Heart shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.35);
    shape.bezierCurveTo(x, y + 0.55, x - 0.1, y + 0.8, x - 0.5, y + 0.8);
    shape.bezierCurveTo(x - 1.0, y + 0.8, x - 1.0, y + 0.35, x - 1.0, y + 0.35);
    shape.bezierCurveTo(x - 1.0, y + 0.0, x - 0.5, y - 0.45, x, y - 0.8);
    shape.bezierCurveTo(x + 0.5, y - 0.45, x + 1.0, y + 0.0, x + 1.0, y + 0.35);
    shape.bezierCurveTo(x + 1.0, y + 0.35, x + 1.0, y + 0.8, x + 0.5, y + 0.8);
    shape.bezierCurveTo(x + 0.1, y + 0.8, x, y + 0.55, x, y + 0.35);
    return shape;
  }, []);

  const heartExtrude = useMemo(
    () => ({
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 5,
    }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Gentle floating
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08;
    groupRef.current.rotation.z = Math.cos(t * 0.35) * 0.05;

    // Pulse scale
    const pulse = 1 + Math.sin(t * 1.5) * 0.03;

    const targetScale = visible ? pulse : 0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.03
    );

    const targetY = visible ? 0 : -4;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.03;
  });

  return (
    <group ref={groupRef} scale={0} position={[0, -4, 0]}>
      {/* Heart */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <extrudeGeometry args={[heartShape, heartExtrude]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.3}
          metalness={0.2}
          emissive="#38bdf8"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Left hand (simplified as curved shapes) */}
      <group position={[-0.7, -0.5, 0.15]} rotation={[0, 0, 0.3]}>
        {/* Palm */}
        <mesh castShadow>
          <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial
            color="#e8c9a0"
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
        {/* Fingers */}
        {[-0.2, -0.07, 0.06, 0.19].map((x, i) => (
          <mesh key={`lf${i}`} position={[x, 0.25 + i * 0.02, 0]} castShadow>
            <capsuleGeometry args={[0.04, 0.2 + i * 0.02, 4, 8]} />
            <meshStandardMaterial color="#e0b98a" roughness={0.8} />
          </mesh>
        ))}
        {/* Thumb */}
        <mesh position={[-0.28, 0.05, 0.05]} rotation={[0, 0, -0.8]} castShadow>
          <capsuleGeometry args={[0.045, 0.15, 4, 8]} />
          <meshStandardMaterial color="#e0b98a" roughness={0.8} />
        </mesh>
      </group>

      {/* Right hand (mirrored) */}
      <group position={[0.7, -0.5, 0.15]} rotation={[0, 0, -0.3]}>
        <mesh castShadow>
          <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial
            color="#e8c9a0"
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
        {[-0.19, -0.06, 0.07, 0.2].map((x, i) => (
          <mesh key={`rf${i}`} position={[x, 0.25 + i * 0.02, 0]} castShadow>
            <capsuleGeometry args={[0.04, 0.2 + i * 0.02, 4, 8]} />
            <meshStandardMaterial color="#e0b98a" roughness={0.8} />
          </mesh>
        ))}
        <mesh position={[0.28, 0.05, 0.05]} rotation={[0, 0, 0.8]} castShadow>
          <capsuleGeometry args={[0.045, 0.15, 4, 8]} />
          <meshStandardMaterial color="#e0b98a" roughness={0.8} />
        </mesh>
      </group>

      {/* Glow */}
      <pointLight
        color="#38bdf8"
        intensity={visible ? 3 : 0}
        distance={6}
        position={[0, 0.3, 1.5]}
      />
    </group>
  );
}
