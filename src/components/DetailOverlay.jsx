import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { casDescription, casProject, experiences, learningOutcomes } from "../data/experiences";
import { X, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ImageGallery({ images, alt, galleryKey }) {
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const currentRef = useRef(null);
  const prevRef = useRef(null);
  const dotsRef = useRef(null);
  const animating = useRef(false);
  const len = (images || []).length;

  const navigate = (dir) => {
    if (len <= 1 || animating.current) return;
    const next = (idx + dir + len) % len;
    animating.current = true;
    setPrevIdx(idx);
    setIdx(next);

    if (dotsRef.current) {
      gsap.fromTo(dotsRef.current,
        { scale: 1.3, boxShadow: "0 4px 20px rgba(255,255,255,0.15), inset 0 1px 3px rgba(255,255,255,0.9)" },
        { scale: 1, boxShadow: "0 4px 16px rgba(0,0,0,0.04), inset 0 1px 2px rgba(255,255,255,0.6)", duration: 1.2, ease: "power2.out" }
      );
    }
  };

  useEffect(() => {
    if (prevIdx === null || !prevRef.current || !currentRef.current) return;

    gsap.set(currentRef.current, { opacity: 0 });
    const tl = gsap.timeline({
      onComplete: () => {
        setPrevIdx(null);
        animating.current = false;
      },
    });
    tl.to(prevRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" });
    tl.to(currentRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.1");
  }, [prevIdx]);

  if (!images || images.length === 0) return null;

  return (
    <div className="experience-image-container">
      {prevIdx !== null && (
        <img
          ref={prevRef}
          src={images[prevIdx]}
          alt={alt}
          className="experience-image"
          style={{ position: "absolute", inset: 0 }}
        />
      )}
      <img
        ref={currentRef}
        src={images[idx]}
        alt={alt}
        className="experience-image"
        style={{ position: "absolute", inset: 0 }}
      />
      {len > 1 && (
        <>
          <button className="img-nav-btn img-nav-left" onClick={() => navigate(-1)} aria-label="Imagen anterior">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 4 6 10 12 16" />
            </svg>
          </button>
          <button className="img-nav-btn img-nav-right" onClick={() => navigate(1)} aria-label="Imagen siguiente">
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="8 4 14 10 8 16" />
            </svg>
          </button>
          <div className="img-dots" ref={dotsRef}>
            {images.map((_, i) => (
              <span key={i} className={`img-dot${i === idx ? " active" : ""}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function DetailOverlay({ section, onClose, isClosing, scrollDetailTo }) {
  const containerRef = useRef(null);
  const isProject = section === "project";
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState(null);
  const scrollPosRef = useRef(0);
  const prevSelectedForScroll = useRef(null);

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
  const loLookup = Object.fromEntries(learningOutcomes.map(lo => [lo.id, lo.short]));
  const loFullLookup = Object.fromEntries(learningOutcomes.map(lo => [lo.id, lo.name]));

  const prevSelectedRef = useRef(selectedExperience || selectedPhase);

  useGSAP(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const currentDetail = selectedExperience || selectedPhase;
    const isBackToGrid = currentDetail === null && prevSelectedRef.current !== null;
    const isEnteringExp = currentDetail !== null && prevSelectedRef.current === null;
    prevSelectedRef.current = currentDetail;

    const delay = isBackToGrid ? 0 : isEnteringExp ? 0 : 0.35;
    const introDur = isBackToGrid ? 0.3 : isEnteringExp ? 0.5 : 0.8;
    const sidebarDur = isBackToGrid ? 0.4 : isEnteringExp ? 0.5 : 0.7;
    const cardDur = isBackToGrid ? 0.4 : isEnteringExp ? 0.5 : 0.7;
    const cardDelay = isBackToGrid ? 0.05 : isEnteringExp ? 0.1 : 0.5;

    // Forzamos estado inicial invisible para evitar el "destello"
    gsap.set(".detail-intro, .experiences-section h3, .experience-card, .outcomes-sidebar, .stats-card, .project-phase-card, .project-detail-section, .project-timeline-section, .experience-image-container, .project-global-reflection, .diary-entry, .phase-diary", {
      opacity: 0,
      y: 20
    });

    const tl = gsap.timeline({ delay });

    // Fase 1: Intro y Título Principal
    tl.fromTo(".detail-intro",
      { opacity: 0, y: 10, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" }
    );

    // Fase 1.5: Imagen
    tl.fromTo(".experience-image-container",
      { opacity: 0, scale: 0.95, filter: "blur(6px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: introDur * 0.8, ease: "sine.inOut" },
      "-=0.4"
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
            delay: cardDelay,
            stagger: 0.06,
            ease: "sine.out",
            onComplete: function () {
              batch.forEach(el => {
                el.style.removeProperty('transform');
              });
            }
          });
        }
      });

      // Fase proyecto: descripción + timeline + cards
      if (isProject && !isEnteringExp) {
        tl.fromTo(".project-detail-section",
          { opacity: 0, y: 10, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" },
          "-=0.3"
        );

        tl.fromTo(".project-timeline-section",
          { opacity: 0, y: 10, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" },
          "-=0.3"
        );

        tl.fromTo(".project-phase-card",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: cardDur, stagger: 0.08, ease: "sine.out" },
          "-=0.2"
        );

        tl.fromTo(".project-global-reflection",
          { opacity: 0, y: 15, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" },
          "-=0.2"
        );
      }
    }

    // Fase 3: Sidebar y stats (siempre se anima)
    tl.fromTo(".outcomes-sidebar, .stats-card",
      { opacity: 0, x: 10, filter: "blur(4px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: sidebarDur, stagger: 0.1, ease: "sine.inOut" },
      isBackToGrid ? "-=0.2" : "+=0.1"
    );

    // Fase 4: Diario de la fase (al entrar en detalle de fase del proyecto)
    if (isProject && selectedPhase && selectedPhase.diary && selectedPhase.diary.length > 0) {
      tl.fromTo(".phase-diary",
        { opacity: 0, y: 15, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: introDur, ease: "sine.inOut" },
        "-=0.3"
      );
      tl.fromTo(".diary-entry",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: cardDur, stagger: 0.08, ease: "sine.out" },
        "-=0.4"
      );
    }
  }, { scope: containerRef, dependencies: [section, selectedExperience, selectedPhase] });

  // Manejo de scroll: restaurar al volver a la grilla
  const activeDetail = selectedExperience || selectedPhase;
  useLayoutEffect(() => {
    const wasNull = prevSelectedForScroll.current === null;
    const prevDetail = prevSelectedForScroll.current;
    prevSelectedForScroll.current = activeDetail;

    // Solo restaurar scroll cuando volvemos a la grilla (activeDetail → null)
    if (prevDetail !== null && activeDetail === null) {
      scrollDetailTo(scrollPosRef.current);
    }
  }, [activeDetail, scrollDetailTo]);

  // Animación de salida simétrica REVERSA
  useEffect(() => {
    if (isClosing) {
      const tlExit = gsap.timeline();

      // 1. Quitar Sidebar
      tlExit.to(".outcomes-sidebar, .stats-card", {
        opacity: 0, x: 20, filter: "blur(10px)", duration: 0.8, stagger: 0.1, ease: "sine.inOut"
      });

      // 2. Quitar Experiencias / Fases
      tlExit.to(".experience-card, .experiences-section h3, .project-phase-card, .project-detail-section, .project-timeline-section, .experience-image-container, .project-global-reflection, .diary-entry, .phase-diary", {
        opacity: 0, y: 30, filter: "blur(10px)", duration: 0.8, stagger: 0.1, ease: "sine.inOut"
      }, "-=0.4");

      // 2.5. Quitar Detalle de Experiencia
      tlExit.to(".experience-detail-view .text-section, .experience-detail-view .experience-image-container, .experience-detail-view .back-button", {
        opacity: 0, y: 20, filter: "blur(10px)", duration: 0.6, stagger: 0.05, ease: "sine.inOut"
      }, "-=0.4");

      // 3. Quitar Intro (título)
      tlExit.to(".detail-intro", {
        opacity: 0, y: -20, filter: "blur(10px)", duration: 0.8, ease: "sine.inOut"
      }, "-=0.8");
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
    <div className="detail-overlay" ref={containerRef}>
      <main className="detail-body">
        {isProject ? (
          selectedPhase ? (
            <div className="experience-detail-view">
              <button
                className="back-button glass-panel"
                onClick={() => setSelectedPhase(null)}
              >
                <ChevronLeft size={16} /> Volver a {data.title}
              </button>

              <div className="detail-intro">
                <span className="date">
                  <Calendar size={14} /> {selectedPhase.date}
                </span>
                <h1 className="editorial-title">{selectedPhase.phase}</h1>
              </div>

              {selectedPhase.images && selectedPhase.images.length > 0 && (
                <ImageGallery images={selectedPhase.images} alt={selectedPhase.phase} galleryKey={`phase-${selectedPhase.phase}`} />
              )}

              <div className="experience-text-content">
                <div className="text-section">
                  <h5>Descripción</h5>
                  <p>{selectedPhase.details}</p>
                </div>

                <div className="text-section">
                  <h5>Reflexión de la Fase</h5>
                  <blockquote className="reflection-quote">
                    <p>{selectedPhase.reflection}</p>
                  </blockquote>
                </div>

                <div className="text-section">
                  <h5>Resultados de Aprendizaje (LO)</h5>
                  <div className="card-tags">
                    {(selectedPhase.learningOutcomes || []).map((loId, j) => (
                      <span key={j} className="tag-pill project">
                        {loFullLookup[loId]}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedPhase.diary && selectedPhase.diary.length > 0 && (
                  <div className="text-section">
                    <h5>Diario de la Fase</h5>
                    <div className="phase-diary">
                      {selectedPhase.diary.map((entry, i) => (
                        <div key={i} className="diary-entry glass-panel">
                          <span className="diary-date">{entry.date}</span>
                          <h6 className="diary-title">{entry.title}</h6>
                          <p className="diary-content">{entry.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="project-detail-view">
              <div className="detail-intro animate-in">
                <h1 className="editorial-title">{data.title}</h1>
                <p className="subtitle">{data.description}</p>
              </div>

              {data.images && data.images.length > 0 && (
                <div className="animate-in">
                  <ImageGallery images={data.images} alt={data.title} galleryKey="project" />
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
                    <div
                      key={idx}
                      className="project-phase-card glass-panel clickable"
                      onClick={() => {
                        const detailViewEl = containerRef.current?.closest('.detail-view') || document.querySelector('.detail-view');
                        scrollPosRef.current = detailViewEl?.scrollTop || 0;
                        if (detailViewEl) {
                          detailViewEl.scrollTop = 0;
                        }
                        scrollDetailTo(0);
                        setTimeout(() => {
                          if (detailViewEl) detailViewEl.scrollTop = 0;
                        }, 0);
                        setSelectedPhase(step);
                      }}
                    >
                      <div className="phase-card-header">
                        <span className="phase-badge">{step.phase}</span>
                        <span className="phase-date">{step.date}</span>
                      </div>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {data.globalReflection && (
                <section className="project-global-reflection animate-in">
                  <h3 className="global-reflection-title">Reflexión Global del Proyecto</h3>
                  <blockquote className="reflection-quote">
                    <p>{data.globalReflection}</p>
                  </blockquote>
                </section>
              )}
            </div>
          )
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

            {selectedExperience.images && selectedExperience.images.length > 0 && (
              <ImageGallery images={selectedExperience.images} alt={selectedExperience.title} galleryKey={selectedExperience.id} />
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
                      {loFullLookup[loId]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-grid">
            <div className="main-column">
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
                        const detailViewEl = containerRef.current?.closest('.detail-view') || document.querySelector('.detail-view');
                        scrollPosRef.current = detailViewEl?.scrollTop || 0;
                        // Reset scroll to top BEFORE React re-renders
                        if (detailViewEl) detailViewEl.scrollTop = 0;
                        scrollDetailTo(0);
                        setTimeout(() => {
                          if (detailViewEl) detailViewEl.scrollTop = 0;
                        }, 0);
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
                            {loLookup[loId]}
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
            </div>

            <aside className="sidebar-column">
              <section className="outcomes-sidebar glass-panel animate-in">
                <div className="sidebar-group">
                  <h4>Learning Outcomes</h4>
                  <div className="outcomes-vertical-list">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                      const isActive = achievedOutcomes.has(num);
                      return (
                        <div key={num} className={`outcome-item ${isActive ? 'active' : 'inactive'}`}>
                          <div className="outcome-dot"></div>
                          <div className="outcome-name">{loLookup[num]}</div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="sidebar-note">Objetivos de aprendizaje detectados en tus reflexiones.</p>
                </div>
              </section>

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
        )}
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
          margin-bottom: 2rem;
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
          padding-left: 0;
          margin-bottom: 1.5rem;
        }

        .outcome-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          height: 35px;
          position: relative;
        }

        .outcome-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .outcome-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #eee;
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        .outcome-item.active .outcome-dot {
          background: var(--${section});
          box-shadow: 0 0 12px var(--${section});
        }

        .outcome-item.active .outcome-name {
          color: var(--text-primary);
        }

        .outcomes-vertical-list::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 17px;
          bottom: 17px;
          width: 1px;
          transform: translateX(-50%);
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
          border: none;
          overflow: visible;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02),
                      inset 0 1px 1px rgba(255, 255, 255, 0.5);
          transition: background 0.15s var(--ease-smooth),
                      box-shadow 0.15s var(--ease-smooth),
                      transform 0.15s var(--ease-smooth);
        }

        .experience-card.clickable::after {
          display: none;
        }

        .experience-card.clickable:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: scale(1.06) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06),
                      inset 0 1px 1px rgba(255, 255, 255, 0.6);
          transition: background 0.3s var(--ease-smooth),
                      box-shadow 0.3s var(--ease-smooth),
                      transform 0.3s var(--ease-smooth);
        }

        .project-phase-card.clickable {
          cursor: pointer;
          border: none;
          overflow: visible;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02),
                      inset 0 1px 1px rgba(255, 255, 255, 0.5);
          transition: background 0.15s var(--ease-smooth),
                      box-shadow 0.15s var(--ease-smooth),
                      transform 0.15s var(--ease-smooth);
        }

        .project-phase-card.clickable::after {
          display: none;
        }

        .project-phase-card.clickable:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: scale(1.06) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06),
                      inset 0 1px 1px rgba(255, 255, 255, 0.6);
          transition: background 0.3s var(--ease-smooth),
                      box-shadow 0.3s var(--ease-smooth),
                      transform 0.3s var(--ease-smooth);
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
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 24px;
          overflow: clip;
          padding: 0 !important;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
        }

        .experience-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .img-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.04),
            inset 0 2px 3px rgba(255, 255, 255, 0.8),
            inset 2px 0 3px rgba(255, 255, 255, 0.4);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.3s ease, background 0.15s var(--ease-smooth),
                      transform 0.3s var(--ease-smooth);
        }

        .experience-image-container:hover .img-nav-btn {
          opacity: 1;
          transform: translateY(-50%) scale(1.2);
          animation: nav-pulse 0.5s ease-out;
        }

        .img-nav-left {
          left: 20px;
        }

        .img-nav-right {
          right: 20px;
        }

        .img-nav-btn:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: translateY(-50%) scale(1.3) !important;
        }

        @keyframes nav-pulse {
          0%   { transform: translateY(-50%) scale(1); }
          35%  { transform: translateY(-50%) scale(1.4); }
          60%  { transform: translateY(-50%) scale(1.05); }
          85%  { transform: translateY(-50%) scale(1.35); }
          100% { transform: translateY(-50%) scale(1.2); }
        }

        .img-dots {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
          padding: 8px 14px;
          border-radius: 20px;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-top-color: var(--glass-border-top);
          border-left-color: var(--glass-border-left);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.6);
        }

        .img-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.4;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .img-dot.active {
          opacity: 1;
          transform: scale(1.3);
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

        .project-detail-section h3, .project-timeline-section h3, .global-reflection-title {
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

        .project-global-reflection {
          margin-top: 2rem;
        }

        .project-global-reflection .reflection-quote {
          font-size: 1.1rem;
          line-height: 1.9;
        }

        .phase-diary {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .diary-entry {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          border-radius: 16px;
        }

        .diary-date {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--project);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .diary-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: var(--text-primary);
        }

        .diary-content {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

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
