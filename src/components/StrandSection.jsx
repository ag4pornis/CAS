import React from "react";
import { Palette, Dumbbell, HandHeart } from "lucide-react";

const icons = {
  creativity: Palette,
  activity: Dumbbell,
  service: HandHeart,
};

const colors = {
  creativity: {
    color: "var(--creativity)",
    glow: "var(--creativity-glow)",
    bg: "var(--creativity-bg)",
    btnClass: "creativity-btn",
  },
  activity: {
    color: "var(--activity)",
    glow: "var(--activity-glow)",
    bg: "var(--activity-bg)",
    btnClass: "activity-btn",
  },
  service: {
    color: "var(--service)",
    glow: "var(--service-glow)",
    bg: "var(--service-bg)",
    btnClass: "service-btn",
  },
};

export default function StrandSection({
  strand,
  isVisible,
  onEnter,
  alignment = "left",
}) {
  const Icon = icons[strand.id];
  const theme = colors[strand.id];
  const isLeft = alignment === "left";

  return (
    <section
      className="strand-section"
      id={strand.id}
      style={{
        justifyContent: isLeft ? "flex-start" : "flex-end",
        paddingLeft: isLeft ? "8vw" : "2rem",
        paddingRight: isLeft ? "2rem" : "8vw",
      }}
    >
      <div className={`strand-content ${isVisible ? "visible" : ""}`}>
        <div
          className="strand-icon-wrapper"
          style={{
            color: theme.color,
            borderColor: theme.color,
            background: theme.bg,
            boxShadow: `0 0 30px ${theme.glow}`,
          }}
        >
          <Icon size={28} />
        </div>
        <h2 style={{ color: theme.color }}>{strand.name}</h2>
        <p>{strand.description}</p>
        <button className={`cta-button ${theme.btnClass}`} onClick={onEnter}>
          <Icon size={16} />
          Explorar {strand.name}
        </button>
      </div>

      <style>{`
        .strand-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }
      `}</style>
    </section>
  );
}
