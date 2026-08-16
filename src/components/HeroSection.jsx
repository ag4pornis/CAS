import React from "react";
import { personalInfo, casDescription } from "../data/experiences";

export default function HeroSection({ onStrandClick }) {
  return (
    <section className="section hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-badge glass-panel">IB Diploma Programme — CAS Portfolio</div>

        <h1>
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>
        <p className="hero-subtitle">{personalInfo.school}</p>
        <p className="hero-bio">{personalInfo.bio}</p>

        <div className="hero-stats">
          {casDescription.strands.map((strand) => (
            <div
              key={strand.id}
              className="stat-pill glass-panel"
              style={{ color: "var(--text-primary)" }}
              onClick={() => onStrandClick && onStrandClick(strand.id)}
            >
              <span className="stat-dot" style={{ background: strand.color }} />
              {strand.name}
            </div>

          ))}
        </div>



        <div className="cas-explanation glass-panel">
          <h3>{casDescription.title}</h3>
          <p>{casDescription.text}</p>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          text-align: left;
          padding: 8rem 12%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          position: relative;
        }

        .hero-content {
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
          z-index: 2;
        }


        .hero-badge {
          padding: 0.6rem 1.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }



        .hero-subtitle {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--text-secondary);
          margin-top: -1rem;
        }

        .hero-bio {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.8;
        }

        .hero-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin: 1rem 0;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.4rem;
          border-radius: 14px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: transform 0.3s var(--ease-smooth);
          cursor: pointer;
        }



        .stat-pill:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.2);
        }


        .stat-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .cas-explanation {
          margin-top: 2rem;
          max-width: 700px;
          text-align: left;
        }


        .cas-explanation h3 {
          margin-bottom: 1rem;
          font-size: 1.8rem;
          color: var(--text-primary);
        }

        .cas-explanation p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
