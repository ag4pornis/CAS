import React from "react";
import { casProject } from "../data/experiences";
import { ExternalLink, Calendar } from "lucide-react";

export default function ProjectSection({ onEnter }) {
  const project = casProject;

  return (
    <section className="section project-section" id="project">
      <div className="project-container glass-panel">
        <div className="project-label">Collaborative Project</div>
        <h2>{project.title}</h2>
        <p className="project-desc">{project.description}</p>

        <div className="project-timeline">
          {project.timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-date">
                <Calendar size={14} />
                {item.date}
              </div>
              <div className="timeline-event">{item.event}</div>
            </div>
          ))}
        </div>

        <button className="cta-button" onClick={onEnter}>
          Explorar Proyecto
          <ExternalLink size={18} />
        </button>
      </div>

      <style>{`
        .project-section {
          min-height: 120vh;
          padding: 6rem 12%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .project-container {
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .project-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--project);
        }

        .project-desc {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .project-timeline {
          width: 100%;
          max-width: 500px;
          margin: 1.5rem 0 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }

        .project-timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(0,0,0,0.05);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          padding: 0.8rem 1.5rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          align-self: center;
          width: fit-content;
          min-width: 250px;
        }

        .timeline-date {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--project);
          margin-bottom: 0.3rem;
          text-transform: uppercase;
        }

        .timeline-event {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
        }
      `}</style>
    </section>
  );
}
