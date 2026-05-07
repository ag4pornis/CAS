import React, { useEffect } from "react";
import { casDescription, casProject, experiences } from "../data/experiences";
import { X, Calendar, CheckCircle2, ChevronLeft } from "lucide-react";

export default function DetailOverlay({ section, onClose }) {
  const isProject = section === "project";

  // Get data correctly
  const data = isProject ? casProject : casDescription.strands.find((s) => s.id === section);

  // Get experiences for this section
  const sectionExperiences = isProject ? [] : experiences[section] || [];

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
    <div className="detail-overlay" data-lenis-prevent>

      <header className="detail-header glass-panel">

        <button className="back-button glass-panel" onClick={onClose}>

          <ChevronLeft size={18} />
          Volver
        </button>
        <div className="header-title">
          <span className="header-label">{isProject ? "Proyecto" : "Aspecto CAS"}</span>
          <h2>{data.name || data.title}</h2>
        </div>
      </header>

      <main className="detail-body">
        <div className="detail-intro">
          <h1 className="editorial-title">{data.title || data.name}</h1>
          <p className="subtitle">{data.description || data.text}</p>
        </div>

        {!isProject && (
          <section className="outcomes-section">
            <h3>Resultados de Aprendizaje</h3>
            <div className="outcomes-list">
              {/* Note: In your experiences.js, outcomes are just strings in description or elsewhere? 
                  Actually, strands don't have outcomes defined in experiences.js yet. 
                  I'll add a check or just show a message. */}
              <div className="outcome-tag">
                <CheckCircle2 size={16} />
                Desarrollo de nuevas habilidades
              </div>
            </div>
          </section>
        )}

        <section className="experiences-section">
          <h3>Experiencias y Reflexiones</h3>
          <div className="experiences-grid">
            {sectionExperiences.map((exp, i) => (
              <div key={i} className="experience-card glass-panel">

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
              <p>No hay experiencias registradas todavía en esta sección.</p>
            )}
          </div>
        </section>
      </main>

      <style>{`
        .header-title {
          margin-left: 1rem;
        }

        .header-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          display: block;
        }

        .header-title h2 {
          font-size: 1.1rem;
          margin-top: -0.2rem;
        }

        .detail-intro {
          margin-bottom: 4rem;
          max-width: 800px;
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

        .outcomes-section {
          margin-bottom: 4rem;
        }

        .outcomes-section h3, .experiences-section h3 {
          font-family: var(--font-body);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
          margin-bottom: 2rem;
          border-bottom: 1px solid #eee;
          padding-bottom: 1rem;
        }

        .outcomes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .outcome-tag {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #fff;
          border: 1px solid #eee;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .experience-card {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
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
      `}</style>
    </div>
  );
}
