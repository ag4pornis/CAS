import { useState, useEffect, useRef, useCallback } from "react";
import Scene3D from "./components/Scene3D";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import StrandSection from "./components/StrandSection";
import DetailOverlay from "./components/DetailOverlay";
import { casDescription } from "./data/experiences";
import Lenis from "lenis";

// Editorial Light Theme Colors
const sectionColors = {
  hero: { from: "226, 232, 240", to: "248, 250, 252", accent: "30, 41, 59" }, // Deep Obsidian
  project: { from: "236, 253, 245", to: "248, 250, 252", accent: "5, 150, 105" },
  creativity: { from: "232, 225, 245", to: "250, 248, 255", accent: "142, 125, 190" },
  activity: { from: "254, 243, 199", to: "255, 255, 255", accent: "217, 119, 6" },
  service: { from: "191, 232, 255", to: "240, 249, 255", accent: "14, 165, 233" },
};


export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const activeColors = sectionColors[activeSection] || sectionColors.hero;




  const [scrollProgress, setScrollProgress] = useState(0);
  const [detailView, setDetailView] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [visibleStrands, setVisibleStrands] = useState({
    creativity: false,
    activity: false,
    service: false,
  });


  const contentRef = useRef(null);
  const lenisRef = useRef(null);

  // ─── Initialize Lenis (Restored for premium inertia) ───
  useEffect(() => {
    const scrollContainer = detailView ? document.querySelector('.detail-view') : document.querySelector('.main-view');

    if (!scrollContainer) return;

    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer.firstChild,
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.3,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ({ progress }) => {
      setScrollProgress(progress);
    });

    return () => {
      lenis.destroy();
    };
  }, [detailView]); // Se reinicia al cambiar de vista para capturar el nuevo contenedor

  // ─── Intersection Observer ───
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;

        if (["project", "creativity", "activity", "service"].includes(id)) {
          setVisibleStrands((prev) => ({
            ...prev,
            [id]: entry.isIntersecting,
          }));
        }


        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("[id]");
    sections.forEach((section) => {
      if (["hero", "project", "creativity", "activity", "service"].includes(section.id)) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  // ─── Sync Native Scroll with 3D/Orb (Kept as fallback or for progress) ───
  // Note: Lenis handles progress now, but we keep the structure clean

  const openDetail = useCallback((section) => {
    setDetailView(section);
    // lenisRef.current?.stop();
    // document.body.classList.add("no-scroll");
  }, []);

  const closeDetail = useCallback(() => {
    setIsClosing(true);
    // Esperamos 2 segundos exactos (la duración de la transición)
    setTimeout(() => {
      setDetailView(null);
      setIsClosing(false);
    }, 2000);
  }, []);

  const orbRef = useRef(null);
  const orbPos = useRef({ x: 0, y: 0 });
  const orbVel = useRef({ x: 2, y: 2 });
  const orbWanderTarget = useRef({ x: 0, y: 0, lastUpdate: 0, nextInterval: 3000 });


  useEffect(() => {
    // Autonomous Animation Loop for the Scroll-Orb
    // This loop runs independently of React renders for 60FPS smoothness
    const animFrame = () => {
      if (!orbRef.current) return;


      const panels = Array.from(document.querySelectorAll('.glass-panel'));
      let targetCard = null;
      for (const panel of panels) {
        const r = panel.getBoundingClientRect();
        if (r.bottom > 50 && r.top < window.innerHeight - 50) {
          targetCard = panel;
          break;
        }
      }

      // --- Unified High-Inertia Steering Engine ---
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const safetyMarginX = 65; // More freedom on the sides
      const safetyMarginY = 90; // Balanced safety for top/bottom
      const now = Date.now();

      // 1. Establish the "Goal" (Combined Card + Wander)
      let goalX, goalY;
      const minX = safetyMarginX;
      const maxX = vw - safetyMarginX;
      const minY = safetyMarginY;
      const maxY = vh - safetyMarginY;


      if (targetCard) {
        const rect = targetCard.getBoundingClientRect();
        const cardCenter = (rect.top + rect.bottom) / 2;
        const viewportCenter = vh / 2;
        goalX = rect.left - 30; // Closer to the edge for better focus
        goalY = (cardCenter > viewportCenter) ? rect.top : rect.bottom;
      } else {
        goalX = vw * 0.12;
        goalY = vh * 0.3;
      }

      goalX = Math.max(minX, Math.min(maxX, goalX));
      goalY = Math.max(minY, Math.min(maxY, goalY));

      // 2. The Brain: Rotational Steering with Organic Chaos
      if (!orbVel.current) orbVel.current = { x: 0.5, y: 0.5 };
      if (!orbWanderTarget.current) orbWanderTarget.current = { x: 0, y: 0, lastUpdate: 0, nextInterval: 3000 };

      // Update curiosity target at random intervals (3s to 7s)
      if (now - orbWanderTarget.current.lastUpdate > orbWanderTarget.current.nextInterval) {
        orbWanderTarget.current = {
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          lastUpdate: now,
          nextInterval: 3000 + Math.random() * 4000
        };
      }

      const finalTargetX = goalX + orbWanderTarget.current.x;
      const finalTargetY = goalY + orbWanderTarget.current.y;

      const targetAngle = Math.atan2(
        finalTargetY - orbPos.current.y,
        finalTargetX - orbPos.current.x
      );

      const currentSpeedRaw = Math.sqrt(orbVel.current.x ** 2 + orbVel.current.y ** 2);
      let currentAngle = (currentSpeedRaw < 0.1) ?
        Math.atan2(finalTargetY - orbPos.current.y, finalTargetX - orbPos.current.x) :
        Math.atan2(orbVel.current.y, orbVel.current.x);

      // --- 3. Proactive Angular Boundary Avoidance (Anti-Stuck Logic) ---
      const buffer = 160;
      const edgeRepulsion = 0.04; // Stronger turn force

      // Adjust the targetAngle directly if we are in the danger zone
      // This makes the 'Brain' think the goal is actually away from the wall
      let avoidanceAngle = targetAngle;

      if (orbPos.current.y < minY + buffer) {
        const factor = (1 - (orbPos.current.y - minY) / buffer);
        avoidanceAngle += edgeRepulsion * factor; // Steer away from top
      }
      if (orbPos.current.y > maxY - buffer) {
        const factor = (1 - (maxY - orbPos.current.y) / buffer);
        avoidanceAngle -= edgeRepulsion * factor; // Steer away from bottom
      }
      if (orbPos.current.x < minX + buffer) {
        const factor = (1 - (orbPos.current.x - minX) / buffer);
        avoidanceAngle += edgeRepulsion * factor; // Steer away from left
      }
      if (orbPos.current.x > maxX - buffer) {
        const factor = (1 - (maxX - orbPos.current.x) / buffer);
        avoidanceAngle -= edgeRepulsion * factor; // Steer away from right
      }

      let angleDiff = avoidanceAngle - currentAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      // Complex Steering: Multi-frequency wiggle for non-periodic movement
      const distToGoal = Math.sqrt((goalX - orbPos.current.x) ** 2 + (goalY - orbPos.current.y) ** 2);

      // Dynamic steering: Relax when close to goal to prevent 'orbiting'
      const proximityFactor = Math.max(0.2, Math.min(1, distToGoal / 100));
      const steeringStrength = 0.015 * proximityFactor;

      const wiggleScale = distToGoal < 50 ? 0.3 : 1.0;
      const wiggle = (Math.sin(now * 0.0007) * 0.015 +
        Math.sin(now * 0.0013) * 0.01 +
        (Math.random() - 0.5) * 0.005) * wiggleScale;

      currentAngle += (angleDiff * steeringStrength) + wiggle;

      // Adaptive Cruise Speed
      const cruiseSpeed = distToGoal < 70 ? 0.45 : 0.65;

      orbVel.current.x = Math.cos(currentAngle) * cruiseSpeed;
      orbVel.current.y = Math.sin(currentAngle) * cruiseSpeed;


      // 4. Update position
      orbPos.current.x += orbVel.current.x;
      orbPos.current.y += orbVel.current.y;

      // FINAL RENDER CLAMP (Strict Safety)
      const finalX = Math.max(minX, Math.min(maxX, orbPos.current.x));
      const finalY = Math.max(minY, Math.min(maxY, orbPos.current.y));
      orbPos.current.x = finalX;
      orbPos.current.y = finalY;

      const pulse = 1 + Math.sin(now * 0.0008) * 0.06;
      orbRef.current.style.transform = `translate3d(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px), 0) scale(${pulse})`;

      requestAnimationFrame(animFrame);
    };

    const frameId = requestAnimationFrame(animFrame);
    return () => cancelAnimationFrame(frameId);
  }, []);





  // Autonomous, no dependencies needed





  return (
    <div className="app-container">
      {/* Smooth Background Transition Layer */}
      <div
        className="dynamic-bg"
        style={{
          backgroundColor: `rgb(${activeColors.from})`,
          transition: 'background-color 2s cubic-bezier(0.23, 1, 0.32, 1)',
          zIndex: -2
        }}
      >
        {/* Persistent Mist Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 100%)`,
            pointerEvents: 'none'
          }}
        />
      </div>


      <Scene3D
        activeSection={activeSection}
        scrollProgress={scrollProgress}
      />

      <div
        ref={orbRef}
        className="scroll-orb"
        style={{
          backgroundColor: `rgb(${activeColors.accent})`,
          boxShadow: `0 0 40px 10px rgba(${activeColors.accent}, 0.5)`,
        }}
      />

      <div className={`sliding-wrapper ${detailView && !isClosing ? "is-detail" : ""}`}>

        <div className="main-view" ref={contentRef}>
          <div className="view-content">
            <HeroSection />
            <ProjectSection onEnter={() => openDetail("project")} />

            <StrandSection
              strand={casDescription.strands[0]}
              isVisible={visibleStrands.creativity}
              onEnter={() => openDetail("creativity")}
              alignment="left"
            />
            <StrandSection
              strand={casDescription.strands[1]}
              isVisible={visibleStrands.activity}
              onEnter={() => openDetail("activity")}
              alignment="left"
            />
            <StrandSection
              strand={casDescription.strands[2]}
              isVisible={visibleStrands.service}
              onEnter={() => openDetail("service")}
              alignment="left"
            />

            <footer className="site-footer glass-panel">
              <div className="footer-content">
                <p className="footer-text">CAS Portfolio — IB Diploma Programme</p>
                <p className="footer-sub">Creatividad · Actividad · Servicio</p>
              </div>
            </footer>
          </div>
        </div>

        <div className="vertical-rail" onClick={detailView ? closeDetail : undefined}>
          <div className="rail-text">
            {detailView ? (
              <div className="rail-active-info">
                <span className="rail-label">
                  {detailView === 'project' ? 'Colaborativo' : 'Dimensión CAS'}
                </span>
                <span className="rail-section-name">
                  {detailView === 'project'
                    ? 'Proyecto'
                    : casDescription.strands.find(s => s.id === detailView)?.name}
                </span>
                <span className="rail-back-hint">← Click para Volver</span>
              </div>
            ) : "Explorar Portfolio · CAS"}
          </div>
        </div>

        <div className="detail-view">
          <div className="view-content">
            {(detailView || isClosing) && (
              <DetailOverlay
                section={detailView || "project"}
                onClose={closeDetail}
                isClosing={isClosing}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .content-layer {
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .scroll-orb {
          position: fixed;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          filter: blur(15px);
          z-index: 0;
          pointer-events: none;
          /* Negative margins to center it on the corner vertex (half-in, half-out) */
          margin-top: -30px;
          margin-left: -30px;
          transition: 
            background-color 1s ease,
            box-shadow 1s ease;

          will-change: top, left, background-color;
        }


        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-15px); }
        }




        .dynamic-bg {



          position: fixed;
          inset: 0;
          z-index: -2;
          transition: background 2s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .no-scroll {
          overflow: hidden;
        }

        .site-footer {
          margin: 6rem 0 0 0;
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          background: transparent !important;
          border: none !important;
          border-radius: 40px 40px 0 0 !important;
          width: 100%;
        }



        .footer-text {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .footer-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
