import React from "react";
import { casProject } from "../data/experiences";

export default function GlobalReflection() {
  if (!casProject.globalReflection) return null;

  return (
    <section className="section global-reflection-section" id="reflection">
      <div className="global-reflection-card glass-panel">
        <div className="global-reflection-label">Reflexión CAS</div>
        <h2>Mi experiencia con CAS</h2>
        <p>{casProject.globalReflection}</p>
      </div>

      <style>{`
        .global-reflection-section {
          min-height: 80vh;
          padding: 6rem 12%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .global-reflection-card {
          max-width: 800px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 3rem;
        }

        .global-reflection-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-muted);
        }

        .global-reflection-card h2 {
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .global-reflection-card p {
          font-size: 1.1rem;
          line-height: 1.9;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .global-reflection-section {
            padding: 4rem 1.5rem;
            justify-content: center;
          }
          .global-reflection-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
