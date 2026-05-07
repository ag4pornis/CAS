import React from "react";
import { ArrowRight } from "lucide-react";

export default function StrandSection({ strand, isVisible, onEnter, alignment = "left" }) {
  return (
    <section className="strand-section" id={strand.id}>
      <div className="strand-card glass-panel">
        <div className="strand-header" style={{ color: strand.color }}>
          <span className="strand-number">0{strand.id === 'creativity' ? '1' : strand.id === 'activity' ? '2' : '3'}</span>
          <span className="strand-label">{strand.name}</span>
        </div>
        <h2>{strand.title}</h2>
        <p>{strand.description}</p>
        <button
          className="cta-button glass-panel"
          onClick={onEnter}
        >
          Ver Experiencias
          <ArrowRight size={18} />
        </button>

      </div>

      <style>{`
        .strand-section {
          min-height: 120vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 4rem 12%;
          width: 100%;
        }

        .strand-card {
          max-width: 550px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .strand-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .strand-number {
          font-family: var(--font-body);
          font-size: 0.9rem;
          opacity: 0.5;
        }

        .strand-label {
          font-size: 0.8rem;
        }

        .strand-card h2 {
          font-style: italic;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
        }

        .strand-card p {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2.5rem;
          font-size: 1.05rem;
        }

        @media (max-width: 1024px) {
          .strand-section {
            padding: 4rem 5%;
          }
        }

        @media (max-width: 900px) {
          .strand-section {
            padding: 4rem 1.5rem;
            justify-content: center !important;
          }
          .strand-card {
            text-align: center;
            align-items: center;
            transform: translateY(60px);
          }
          .strand-card.visible {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
