import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [bgColors, setBgColors] = useState({
    active: sectionColors.hero,
    previous: sectionColors.hero,
    isTransitioning: false
  });

  useEffect(() => {
    const newColors = sectionColors[activeSection] || sectionColors.hero;
    if (newColors.accent !== bgColors.active.accent) {
      setBgColors(prev => ({
        previous: prev.active,
        active: newColors,
        isTransitioning: true
      }));
      
      const timer = setTimeout(() => {
        setBgColors(prev => ({ ...prev, isTransitioning: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeSection]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [detailView, setDetailView] = useState(null);
  const [projectVisible, setProjectVisible] = useState(false);
  const [visibleStrands, setVisibleStrands] = useState({
    creativity: false,
    activity: false,
    service: false,
  });


  const contentRef = useRef(null);
  const lenisRef = useRef(null);

  // ─── Initialize Lenis ───
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.3,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll, limit, velocity, progress }) => {
      setScrollProgress(progress);
    });


    return () => {
      lenis.destroy();
    };
  }, []);

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

  const openDetail = useCallback((section) => {
    setDetailView(section);
    lenisRef.current?.stop();
    document.body.classList.add("no-scroll");
  }, []);

  const closeDetail = useCallback(() => {
    setDetailView(null);
    lenisRef.current?.start();
    document.body.classList.remove("no-scroll");
  }, []);

  const orbRef = React.useRef(null);
  const orbPos = React.useRef({ x: 0, y: 0 });
  const orbState = React.useRef('idle');

  // Defined outside the loop for performance
  const triggerBonk = (transform) => {
    if (!orbRef.current) return;
    orbRef.current.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    orbRef.current.style.transform = `translate(-50%, -50%) ${transform}`;
    setTimeout(() => {
      if (orbRef.current) {
        orbRef.current.style.transition = 'transform 0.3s ease-out';
        orbRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 150);
  };

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

      const ease = 0.1;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      let targetX, targetY;

      if (targetCard) {
        const rect = targetCard.getBoundingClientRect();

        // --- NEW: Dynamic Corner Selection ---
        // If the card center is below the viewport center, target TOP corner.
        // If we've scrolled past the card center, target BOTTOM corner.
        const cardCenter = (rect.top + rect.bottom) / 2;
        const viewportCenter = vh / 2;

        targetX = rect.left;
        targetY = (cardCenter > viewportCenter) ? rect.top : rect.bottom;

        // --- Wide Safety Margins & Rebounds ---
        const margin = 120;
        const topLimit = margin;
        const bottomLimit = vh - margin;

        // Note: We check against the actual corner the orb is currently targeting
        if (targetY < topLimit) {
          targetY = vh * 0.25;
          targetX = vw * 0.08;
          if (orbState.current !== 'bonked_top') {
            orbState.current = 'bonked_top';
            triggerBonk('scale(1.4, 0.6)');
          }
        } else if (targetY > bottomLimit) {
          targetY = vh * 0.75;
          targetX = vw * 0.08;
          if (orbState.current !== 'bonked_bottom') {
            orbState.current = 'bonked_bottom';
            triggerBonk('scale(1.4, 0.6)');
          }
        } else {
          orbState.current = 'following';
        }
      } else {
        orbState.current = 'confused';
        targetX = vw * 0.08;
        targetY = vh * 0.25;
      }



      function triggerBonk(transform) {
        if (!orbRef.current) return;
        orbRef.current.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        orbRef.current.style.transform = `translate(-50%, -50%) ${transform}`;
        setTimeout(() => {
          if (orbRef.current) orbRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
      }

      orbPos.current.x += (targetX - orbPos.current.x) * ease;
      orbPos.current.y += (targetY - orbPos.current.y) * ease;

      // --- Organic Floating Drift (Enhanced) ---
      const time = Date.now() * 0.0015;
      const driftX = Math.sin(time) * 15;
      const driftY = Math.cos(time * 0.8) * 20;

      // Increase drift factor when following to stay 'alive'
      const driftFactor = (orbState.current === 'following') ? 0.5 : 1;

      // Breathing pulse effect
      const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.08;

      orbRef.current.style.top = `${orbPos.current.y + driftY * driftFactor}px`;
      orbRef.current.style.left = `${orbPos.current.x + driftX * driftFactor}px`;
      orbRef.current.style.transform = `translate(-50%, -50%) scale(${pulse})`;


      if (targetCard) {
        const section = targetCard.closest('section');
        if (section && section.id) {
          const sectionColor = sectionColors[section.id] || sectionColors.hero;
          orbRef.current.style.backgroundColor = `rgb(${sectionColor.accent})`;
          orbRef.current.style.boxShadow = `0 0 40px 10px rgba(${sectionColor.accent}, 0.4)`;
        }
      }

      requestAnimationFrame(animFrame);
    };

    const frameId = requestAnimationFrame(animFrame);
    return () => cancelAnimationFrame(frameId);
  }, []);




  // Autonomous, no dependencies needed



  const colors = sectionColors[activeSection] || sectionColors.hero;


  return (
    <>
      {/* Smooth Background Transition Layer */}
      <div 
        className="dynamic-bg" 
        style={{ 
          backgroundColor: `rgb(${bgColors.active.from})`,
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
          backgroundColor: `rgb(${colors.accent})`,
          boxShadow: `0 0 40px 10px rgba(${colors.accent}, 0.5)`,
        }}
      />

      <div className="content-layer" ref={contentRef}>

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

      {detailView && (
        <DetailOverlay section={detailView} onClose={closeDetail} />
      )}

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
    </>
  );
}
