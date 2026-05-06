import React from "react";
import { casProject } from "../data/experiences";
import { Rocket } from "lucide-react";

export default function ProjectSection({ onEnter }) {
  return (
    <section className="section project-section" id="project">
      <div className="project-content">
        <div className="project-label project-accent">
          <Rocket size={14} />
          El Gran Proyecto
        </div>
        <h2>
          <span className="project-accent">{casProject.title}</span>
        </h2>
        <p className="project-subtitle">{casProject.subtitle}</p>
        <p className="project-description">{casProject.description}</p>

        <div className="project-timeline">
          {casProject.timeline.map((phase, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">{phase.date}</span>
                <h4>{phase.phase}</h4>
                <p>{phase.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="cta-button project-btn" onClick={onEnter}>
          <Rocket size={16} />
          Explorar Proyecto
        </button>
      </div>

      <style>{`
        .project-section {
          min-height: 120vh;
          padding: 6rem 2rem;
          text-align: center;
        }

        .project-content {
          max-width: 650px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .project-label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          border: 1px solid var(--project);
          background: var(--project-bg);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .project-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .project-description {
          font-size: 0.95rem;
          line-height: 1.7;
          text-align: center;
        }

        .project-timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 1.5rem 0;
          position: relative;
          padding-left: 1.5rem;
          text-align: left;
        }

        .project-timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: linear-gradient(to bottom, var(--project), transparent);
          border-radius: 1px;
        }

        .timeline-item {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 0;
          position: relative;
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          min-width: 12px;
          border-radius: 50%;
          background: var(--project);
          box-shadow: 0 0 10px var(--project-glow);
          margin-top: 0.25rem;
          position: absolute;
          left: -1.5rem;
          transform: translateX(-2.5px);
        }

        .timeline-content h4 {
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .timeline-content p {
          font-size: 0.85rem;
        }

        .timeline-date {
          font-size: 0.75rem;
          color: var(--project);
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}
