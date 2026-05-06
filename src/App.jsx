import React, { useState, useEffect, useRef, useCallback } from "react";
import Scene3D from "./components/Scene3D";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import StrandSection from "./components/StrandSection";
import DetailOverlay from "./components/DetailOverlay";
import { casDescription } from "./data/experiences";
import Lenis from "@studio-freight/lenis";

// Background color configs per section
const sectionColors = {
  hero: { from: "10, 10, 18", to: "15, 12, 25", accent: "100, 80, 160" },
  project: { from: "5, 15, 12", to: "8, 18, 14", accent: "52, 211, 153" },
  creativity: { from: "15, 8, 22", to: "18, 10, 25", accent: "192, 132, 252" },
  activity: { from: "18, 12, 6", to: "22, 14, 8", accent: "251, 146, 60" },
  service: { from: "6, 12, 18", to: "8, 14, 22", accent: "56, 189, 248" },
};

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [detailView, setDetailView] = useState(null);
  const [visibleStrands, setVisibleStrands] = useState({
    creativity: false,
    activity: false,
    service: false,
  });

  const contentRef = useRef(null);
  const lenisRef = useRef(null);

  // ─── Initialize Lenis for PERFECT smooth scroll ───
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4, // Even heavier
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.3, // Heavy global feel
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
      
      // Dynamic resistance: check if we are in the "sweet spot" of a section
      const sections = document.querySelectorAll(".strand-section, .project-section");
      let inSweetSpot = false;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const centerDist = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
        // Half of viewport height for sweet spot
        if (centerDist < window.innerHeight * 0.5) {
          inSweetSpot = true;
        }
      });

      // Normal: 0.3, In section: 0.005 (Total immersion/viscosity)
      lenis.options.wheelMultiplier = inSweetSpot ? 0.005 : 0.3;
    });





    return () => {
      lenis.destroy();
    };
  }, []);

  // ─── Intersection Observer for section detection ───
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;

        if (["creativity", "activity", "service"].includes(id)) {
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
    lenisRef.current?.stop(); // Stop scroll when overlay is open
    document.body.classList.add("no-scroll");
  }, []);

  const closeDetail = useCallback(() => {
    setDetailView(null);
    lenisRef.current?.start(); // Resume scroll
    document.body.classList.remove("no-scroll");
  }, []);

  const colors = sectionColors[activeSection] || sectionColors.hero;

  return (
    <>
      <div
        className="dynamic-bg"
        style={{
          backgroundColor: `rgb(${colors.from})`,
          backgroundImage: `linear-gradient(180deg, rgba(${colors.from}, 1) 0%, rgba(${colors.to}, 1) 100%)`,
        }}
      >
        <div 
          className="bg-glow" 
          style={{ 
            background: `radial-gradient(circle at 50% 50%, rgba(${colors.accent}, 0.15) 0%, transparent 70%)` 
          }} 
        />
      </div>

      <Scene3D
        activeSection={activeSection}
        scrollProgress={scrollProgress}
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
          alignment="right"
        />
        <StrandSection
          strand={casDescription.strands[2]}
          isVisible={visibleStrands.service}
          onEnter={() => openDetail("service")}
          alignment="left"
        />

        <footer className="site-footer">
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
        html.lenis {
          height: auto;
        }

        .lenis.lenis-smooth {
          scroll-behavior: auto !important;
        }

        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }

        .lenis.lenis-stopped {
          overflow: hidden;
        }

        .dynamic-bg {
          position: fixed;
          inset: 0;
          z-index: -2;
          transition: background 1.5s ease-in-out;
        }

        .bg-glow {
          position: absolute;
          inset: 0;
          transition: background 1.5s ease-in-out;
          pointer-events: none;
        }

        .no-scroll {
          overflow: hidden;
        }

        .site-footer {
          padding: 4rem 2rem;
          text-align: center;
          border-top: 1px solid var(--glass-border);
          position: relative;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
        }

        .footer-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .footer-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
}
