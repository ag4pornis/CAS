import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, BookOpen } from "lucide-react";
import { experiences, casProject, learningOutcomes } from "../data/experiences";

const strandNames = {
  creativity: "Creatividad",
  activity: "Actividad",
  service: "Servicio",
  project: "Proyecto CAS",
};

const strandColors = {
  creativity: "var(--creativity)",
  activity: "var(--activity)",
  service: "var(--service)",
  project: "var(--project)",
};

export default function DetailOverlay({ section, onClose }) {
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 600);
  };

  const renderProjectContent = () => (
    <div className="detail-project">
      <p className="detail-description">{casProject.details}</p>

      <h3 style={{ color: strandColors.project, marginTop: "2rem" }}>
        Línea Temporal
      </h3>
      <div className="detail-timeline">
        {casProject.timeline.map((phase, i) => (
          <div key={i} className="detail-timeline-item glass-panel">
            <div
              className="detail-timeline-phase"
              style={{ color: strandColors.project }}
            >
              {phase.phase}
            </div>
            <div className="detail-timeline-date">{phase.date}</div>
            <p>{phase.description}</p>
          </div>
        ))}
      </div>

      <h3 style={{ color: strandColors.project, marginTop: "2rem" }}>
        Reflexión
      </h3>
      <div className="glass-panel">
        <p>
          Aquí puedes escribir tu reflexión general sobre el proyecto CAS.
          ¿Qué aprendiste? ¿Cómo te transformó? ¿Qué harías diferente?
        </p>
      </div>
    </div>
  );

  const renderStrandContent = () => {
    const items = experiences[section] || [];
    return (
      <div>
        <div className="experiences-grid">
          {items.map((exp) => (
            <div key={exp.id} className="experience-card">
              <h4>{exp.title}</h4>
              <div className="date">
                <Calendar size={12} style={{ marginRight: "0.3rem" }} />
                {exp.date}
              </div>
              <p>{exp.description}</p>

              <div className="reflection-box">
                <BookOpen
                  size={14}
                  style={{ color: strandColors[section], flexShrink: 0 }}
                />
                <span>{exp.reflection}</span>
              </div>

              <div className="tags">
                {exp.learningOutcomes.map((lo) => {
                  const outcome = learningOutcomes.find((o) => o.id === lo);
                  return (
                    <span key={lo} className={`tag ${section}`}>
                      {outcome?.short}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={overlayRef}
      className={`detail-overlay ${isVisible ? "detail-overlay-enter" : "detail-overlay-exit"}`}
      style={{
        "--strand-color": strandColors[section],
      }}
    >
      {/* 3D-like opening effect */}
      <div className={`detail-portal ${isVisible ? "portal-open" : "portal-closed"}`}>
        <div className="detail-header">
          <button className="back-button" onClick={handleClose}>
            <ArrowLeft size={16} />
            Volver
          </button>
          <h3 style={{ color: strandColors[section], fontSize: "1rem" }}>
            {strandNames[section]}
          </h3>
        </div>

        <div className="detail-body">
          <h1 style={{ color: strandColors[section] }}>
            {strandNames[section]}
          </h1>
          <p className="subtitle">
            {section === "project"
              ? casProject.subtitle
              : `Mis experiencias de ${strandNames[section]?.toLowerCase()}`}
          </p>

          {section === "project" ? renderProjectContent() : renderStrandContent()}
        </div>
      </div>

      <style>{`
        .detail-overlay {
          --strand-color: var(--text-primary);
        }

        .detail-portal {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          transform-origin: center center;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .portal-closed {
          transform: scale(0) rotateY(90deg);
          opacity: 0;
          border-radius: 50%;
        }

        .portal-open {
          transform: scale(1) rotateY(0deg);
          opacity: 1;
          border-radius: 0;
        }

        .detail-overlay-enter {
          background: var(--bg-primary);
        }

        .detail-overlay-exit {
          background: transparent;
          pointer-events: none;
        }

        .reflection-box {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          margin-top: 0.75rem;
          padding: 0.75rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border-left: 2px solid var(--strand-color);
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .detail-description {
          font-size: 1.05rem;
          line-height: 1.8;
        }

        .detail-timeline {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .detail-timeline-item {
          padding: 1.2rem;
        }

        .detail-timeline-phase {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }

        .detail-timeline-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .experience-card:hover {
          border-color: var(--strand-color);
          box-shadow: 0 0 20px rgba(255,255,255,0.02);
        }
      `}</style>
    </div>
  );
}
