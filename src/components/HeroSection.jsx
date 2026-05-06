import React from "react";
import { personalInfo, casDescription } from "../data/experiences";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="section hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-badge">IB Diploma Programme — CAS Portfolio</div>
        <h1>
          <span className="gradient-text">{personalInfo.name}</span>
        </h1>
        <p className="hero-subtitle">{personalInfo.school}</p>
        <p className="hero-bio">{personalInfo.bio}</p>

        <div className="hero-stats">
          {casDescription.strands.map((strand) => (
            <div
              key={strand.id}
              className={`stat-pill`}
              style={{ borderColor: strand.color, color: strand.color }}
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

      <div className="scroll-indicator">
        <span>Descubre mi experiencia</span>
        <ChevronDown className="bounce-arrow" size={20} />
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          text-align: center;
          padding-top: 6rem;
          gap: 2rem;
        }

        .hero-content {
          max-width: 700px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .hero-badge {
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          border: 1px solid var(--glass-border);
          background: var(--bg-glass);
          backdrop-filter: blur(10px);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-top: -0.5rem;
        }

        .hero-bio {
          font-size: 1.05rem;
          text-align: center;
          line-height: 1.7;
        }

        .hero-stats {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin: 0.5rem 0;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          border: 1px solid;
          font-size: 0.85rem;
          font-weight: 500;
          background: rgba(0,0,0,0.3);
        }

        .stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .cas-explanation {
          margin-top: 1rem;
          max-width: 600px;
          text-align: left;
        }

        .cas-explanation h3 {
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--creativity), var(--activity), var(--service));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cas-explanation p {
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-top: auto;
          padding-bottom: 1rem;
        }

        .bounce-arrow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(6px); }
          60% { transform: translateY(3px); }
        }

        @media (max-width: 768px) {
          .hero-section { padding-top: 4rem; }
          .cas-explanation { margin: 0.5rem 0; }
        }
      `}</style>
    </section>
  );
}
