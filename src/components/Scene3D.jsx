import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import PaintPalette from "./objects/PaintPalette";
import Dumbbell from "./objects/Dumbbell";
import ServiceHands from "./objects/ServiceHands";
import ProjectStar from "./objects/ProjectStar";
import FloatingParticles from "./objects/FloatingParticles";

export default function Scene3D({ activeSection, scrollProgress }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <directionalLight position={[-3, -3, 2]} intensity={0.2} color="#8080ff" />

          {/* Background particles - always visible */}
          <FloatingParticles />

          {/* 3D Objects - visibility driven by scroll position */}
          <ProjectStar
            scrollProgress={scrollProgress}
            visible={activeSection === "project"}
          />
          <PaintPalette
            scrollProgress={scrollProgress}
            visible={activeSection === "creativity"}
          />
          <Dumbbell
            scrollProgress={scrollProgress}
            visible={activeSection === "activity"}
          />
          <ServiceHands
            scrollProgress={scrollProgress}
            visible={activeSection === "service"}
          />

          {/* Subtle environment reflection */}
          <Environment preset="night" />

          {/* Light fog - transparent to let CSS background through */}
          <fog attach="fog" args={["rgba(0,0,0,0)", 8, 20]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
