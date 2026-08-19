import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { casDescription, casProject, experiences } from "../data/experiences";
import { X, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DetailOverlay({ section, onClose, isClosing, scrollDetailTo }) {
  const containerRef = useRef(null);
  const isProject = section === "project";
  const [selectedExperience, setSelectedExperience] = useState(null);
  const scrollPosRef = useRef(0);
  const prevSelectedForScroll = useRef(null);
  const prevSelectedForLenis = useRef(null);

  // Get data correctly
  const data = isProject ? casProject : casDescription.strands.find((s) => s.id === section);

  // Get experiences for this section
  const sectionExperiences = isProject ? [] : experiences[section] || [];

  // --- Lógica Real de Seguimiento ---
  // Extraemos todos los resultados marcados en las experiencias de esta sección
  const achievedOutcomes = new Set();
  sectionExperiences.forEach(exp => {
    (exp.learningOutcomes || []).forEach(lo => achievedOutcomes.add(Number(lo)));
  });

  const prevSelectedRef = useRef(selectedExperience);

  useGSAP(() => {
    const isBackToGrid = selectedExperience === null && prevSelectedRef.current !== null;
    const isEnteringExp = selectedExperience !== null && prevSelectedRef.current === null;
    prevSelectedRef.current = selectedExperience;

    const delay = isBackToGrid ? 0 : isEnteringExp ? 0 : 0.35;
    const introDur = isBackToGrid ? 0.5 : isEnteringExp ? 0.5 : 0.8;
    const sidebarDur = isBackToGrid ? 0.5 : isEnteringExp ? 0.5 : 0.7;
    const cardDur = isBackToGrid ? 0.5 : isEnteringExp ? 0.5 : 0.7;
    const cardDelay = isBackToGrid ? 0.1 : isEnteringExp ? 0.1 : 0.5;

    // Forzamos estado inicial invisible para evitar el "destello"
    gsap.set(".detail-intro, .experiences-section h3, .experience-card, .outcomes-sidebar, .stats-card", {
      opacity: 0,
      y: 20
    });

    const tl = gsap.timeline({ delay });

    // Fase 1: Intro y Título Principal
    tl.fromTo(".detail-intro",
      { opacity: 0, y: 10, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" }
    );

    if (!isEnteringExp) {
      // Fase 2: Título de Experiencias
      tl.fromTo(".experiences-section h3",
        { opacity: 0, y: 10, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur * 0.8, ease: "sine.inOut" },
        "-=0.3"
      );

      // Batch: carga tarjetas en grupos (2 filas por vez) a medida que entran al viewport
      ScrollTrigger.batch(".experience-card", {
        scroller: containerRef.current,
        start: "top 110%",
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: cardDur,
            stagger: 0.06,
            ease: "sine.out"
          });
        }
      });
    }

    // Fase 3: Sidebar y stats (siempre se anima)
    tl.fromTo(".outcomes-sidebar, .stats-card",
      { opacity: 0, x: 10, filter: "blur(4px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: sidebarDur, stagger: 0.1, ease: "sine.inOut" },
      "-=0.2"
    );
  }, { scope: containerRef, dependencies: [section, selectedExperience] });

  // Manejo de scroll: scrollear arriba al entrar en experiencia, restaurar al volver
  useLayoutEffect(() => {
    const wasNull = prevSelectedForScroll.current === null;
    const prevExp = prevSelectedForScroll.current;
    prevSelectedForScroll.current = selectedExperience;

    const el = containerRef.current?.closest('.detail-view');
    if (!el) return;

    if (wasNull && selectedExperience !== null) {
      el.scrollTop = 0;
    } else if (prevExp !== null && selectedExperience === null) {
      el.scrollTop = scrollPosRef.current;
    }
  }, [selectedExperience]);

  // Sincronizar Lenis después del paint para que no sobreescriba el scrollTop
  useEffect(() => {
    const wasNull = prevSelectedForLenis.current === null;
    prevSelectedForLenis.current = selectedExperience;

    if (wasNull && selectedExperience !== null) {
      scrollDetailTo(0);
    } else if (!wasNull && selectedExperience === null) {
      scrollDetailTo(scrollPosRef.current);
    }
  }, [selectedExperience, scrollDetailTo]);

  // Animación de salida simétrica REVERSA
  useEffect(() => {
    if (isClosing) {
      const tlExit = gsap.timeline();

      // 1. Quitar Sidebar
      tlExit.to(".outcomes-sidebar, .stats-card", {
        opacity: 0, x: 20, filter: "blur(10px)", duration: 0.8, stagger: 0.1, ease: "sine.inOut"
      });

      // 2. Quitar Experiencias
      tlExit.to(".experience-card, .experiences-section h3", {
        opacity: 0, y: 30, filter: "blur(10px)", duration: 0.8, stagger: 0.1, ease: "sine.inOut"
      }, "-=0.4");

      // 3. Quitar Intro
      tlExit.to(".detail-intro", {
        opacity: 0, y: -20, filter: "blur(10px)", duration: 0.8, ease: "sine.inOut"
      }, "-=0.4");
    }
  }, [isClosing]);

  if (!data) return null;

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="detail-overlay" ref={containerRef} data-lenis-prevent>
      <main className="detail-body">
        <div className="detail-grid">

          <div className="main-column">
            {isProject ? (
              <div className="project-detail-view">
                <div className="detail-intro animate-in">
                  <h1 className="editorial-title">{data.title}</h1>
                  <p className="subtitle">{data.description}</p>
                </div>

                {data.image && (
                  <div className="experience-image-container animate-in">
                    <img src={data.image} alt={data.title} className="experience-image" />
                  </div>
                )}

                <section className="project-detail-section animate-in">
                  <h3>Descripción del Proyecto</h3>
                  <p className="project-detail-text">{data.details}</p>
                </section>

                <section className="project-timeline-section animate-in">
                  <h3>Fases del Proyecto</h3>
                  <div className="project-timeline-grid">
                    {data.timeline.map((step, idx) => (
                      <div key={idx} className="project-phase-card glass-panel">
                        <div className="phase-card-header">
                          <span className="phase-badge">{step.phase}</span>
                          <span className="phase-date">{step.date}</span>
                        </div>
                        <p>{step.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : selectedExperience ? (
              <div className="experience-detail-view">
                <button
                  className="back-button glass-panel"
                  onClick={() => setSelectedExperience(null)}
                >
                  <ChevronLeft size={16} /> Volver a {data.name || data.title}
                </button>

                <div className="detail-intro">
                  <span className="date">
                    <Calendar size={14} /> {selectedExperience.date}
                  </span>
                  <h1 className="editorial-title">{selectedExperience.title}</h1>
                </div>

                {selectedExperience.image && (
                  <div className="experience-image-container">
                    <img src={selectedExperience.image} alt={selectedExperience.title} className="experience-image" />
                  </div>
                )}

                <div className="experience-text-content">
                  <div className="text-section">
                    <h5>Descripción</h5>
                    <p>{selectedExperience.details || selectedExperience.description}</p>
                  </div>

                  <div className="text-section">
                    <h5>Reflexión de la Experiencia</h5>
                    <blockquote className="reflection-quote">
                      <p>{selectedExperience.reflection}</p>
                    </blockquote>
                  </div>

                  <div className="text-section">
                    <h5>Resultados de Aprendizaje (LO)</h5>
                    <div className="card-tags">
                      {(selectedExperience.learningOutcomes || []).map((loId, j) => (
                        <span key={j} className={`tag-pill ${section}`}>
                          Resultado {loId}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="detail-intro animate-in">
                  <h1 className="editorial-title">{data.title || data.name}</h1>
                  <p className="subtitle">{data.description || data.text}</p>
                </div>

                <section className="experiences-section">
                  <h3 className="animate-in">Experiencias y Reflexiones</h3>
                  <div className="experiences-grid">
                    {sectionExperiences.map((exp, i) => (
                      <div
                        key={i}
                        className="experience-card glass-panel animate-in clickable"
                        onClick={() => {
                          scrollPosRef.current = containerRef.current?.closest('.detail-view')?.scrollTop || 0;
                          setSelectedExperience(exp);
                        }}
                      >
                        <div className="card-header">
                          <span className="date">
                            <Calendar size={14} />
                            {exp.date}
                          </span>
                          <h4>{exp.title}</h4>
                        </div>
                        <p>{exp.reflection}</p>
                        <div className="card-tags">
                          {(exp.learningOutcomes || []).map((loId, j) => (
                            <span key={j} className={`tag-pill ${section}`}>
                              Resultado {loId}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                    {sectionExperiences.length === 0 && (
                      <p className="empty-msg">No hay experiencias registradas todavía en esta sección.</p>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>

          <aside className="sidebar-column">
            {!isProject && (
              <section className="outcomes-sidebar glass-panel animate-in">
                <div className="sidebar-group">
                  <h4>Learning Outcomes</h4>
                  <div className="outcomes-vertical-list">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                      const isActive = achievedOutcomes.has(num);
                      return (
                        <div key={num} className={`outcome-item ${isActive ? 'active' : 'inactive'}`}>
                          <div className="outcome-number">{num}</div>
                          <div className="outcome-dot"></div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="sidebar-note">Objetivos de aprendizaje detectados en tus reflexiones.</p>
                </div>
              </section>
            )}

            <div className="sidebar-group glass-panel stats-card animate-in">
              <h4>Resumen de Sección</h4>
              <div className="stat-row">
                <span>Experiencias</span>
                <strong>{sectionExperiences.length}</strong>
              </div>
              <div className="stat-row">
                <span>Estado</span>
                <span className={`status-badge ${sectionExperiences.length > 0 ? 'active' : 'idle'}`}>
                  <span className="status-dot"></span>
                  {sectionExperiences.length > 0 ? 'En curso' : 'Sin iniciar'}
                </span>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <style>{`
        /* Estado inicial para evitar parpadeos */
        .detail-intro, 
        .experience-card, 
        .outcomes-sidebar, 
        .stats-card,
        .experiences-section h3 {
          opacity: 0;
          will-change: opacity, transform, filter;
        }

        .detail-body {
          flex: 1;
          padding: 4rem 2rem 4rem 4rem; /* Reducimos el de la derecha a 2rem para que sea más clean */
          width: 100% !important;
          max-width: none !important;
          margin: 0 !important;
          display: flex;
          flex-direction: column;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 4rem;
          width: 100%;
          justify-content: space-between;
          align-items: start;
        }

        .detail-overlay {
          width: 100% !important;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .sidebar-column {
          position: sticky !important;
          top: 4rem !important;
          height: fit-content !important;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          z-index: 10;
        }

        .detail-intro {
          margin-bottom: 5rem;
        }

        .editorial-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .subtitle {
          font-size: 1.2rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .sidebar-group h4 {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 2rem;
          display: block;
        }

        .outcomes-vertical-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
          padding-left: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .outcome-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          height: 35px;
          position: relative;
        }

        .outcome-number {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          width: 15px;
        }

        .outcome-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #eee;
          position: relative;
          z-index: 2;
        }

        .outcome-item.active .outcome-dot {
          background: var(--${section});
          box-shadow: 0 0 12px var(--${section});
        }

        .outcome-item.active .outcome-number {
          color: var(--text-primary);
        }

        .outcomes-vertical-list::before {
          content: '';
          position: absolute;
          left: calc(0.5rem + 15px + 1.5rem + 4px - 0.5px);
          top: 15px;
          bottom: 15px;
          width: 1px;
          background: #eee;
          z-index: 1;
        }

        .sidebar-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .outcomes-sidebar, .stats-card {
          padding: 2rem !important;
          border-radius: 24px !important;
        }

        .stats-card h4 {
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          margin-bottom: 1.5rem;
        }

        .stat-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .stat-row strong {
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .status-badge.active {
          color: var(--${section});
        }

        .status-badge.idle {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .active .status-dot {
          animation: status-pulse 2s infinite;
        }

        .idle .status-dot {
          box-shadow: none;
        }

        @keyframes status-pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }

        .experiences-section h3 {
          font-family: var(--font-body);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .experience-card {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .experience-card.clickable {
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .experience-card.clickable:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05),
                      inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .experience-detail-view, .project-detail-view {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
          animation: experience-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes experience-fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: none;
          cursor: pointer;
          width: fit-content;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02),
                      inset 0 1px 1px rgba(255, 255, 255, 0.5);
          transition: all 0.3s var(--ease-smooth);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.25);
          color: var(--text-primary);
          transform: translateX(-4px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04),
                      inset 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        .experience-image-container {
          width: 100%;
          height: 380px;
          border-radius: 24px;
          overflow: hidden;
          padding: 0 !important;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
        }

        .experience-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .experience-image-container:hover .experience-image {
          transform: scale(1.03);
        }

        .experience-text-content {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .text-section h5 {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
        }

        .text-section p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .reflection-quote {
          border-left: 3px solid var(--${section});
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
        }

        .reflection-quote p {
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1.7;
        }

        .project-detail-section h3, .project-timeline-section h3 {
          font-family: var(--font-body);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .project-detail-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .project-timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .project-timeline-grid {
            grid-template-columns: 1fr;
          }
        }

        .project-phase-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          border-radius: 16px;
        }

        .phase-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .phase-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--project);
          text-transform: uppercase;
          background: #ecfdf5;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
        }

        .phase-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .project-phase-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .card-header h4 {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          margin-top: 0.5rem;
        }

        .card-header .date {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .experience-card p {
          font-size: 1rem;
          line-height: 1.8;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
        }

        .tag-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          background: #f1f1f1;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .tag-pill.creativity { background: #f3f0f9; color: var(--creativity); }
        .tag-pill.activity { background: #fef3c7; color: var(--activity); }
        .tag-pill.service { background: #e0f2fe; color: var(--service); }
        .tag-pill.project { background: #ecfdf5; color: var(--project); }

        @media (max-width: 1100px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .sidebar-column {
            position: static;
            order: -1;
          }
        }
      `}</style>
    </div>
  );
}
