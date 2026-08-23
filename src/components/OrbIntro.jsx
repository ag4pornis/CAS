import { useRef, useEffect } from "react";

function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

export default function OrbIntro({ isLoaded }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const vh = window.innerHeight;

    const pts = [
      [90, -80],
      [100, 40],
      [150, 160],
      [55, 210],
      [70, 180],
      [-20, 165],
      [-80, 175],
    ];
    const padStart = [pts[0][0] + 20, pts[0][1] - 60];
    const padEnd = [pts[6][0] - 40, pts[6][1] + 20];
    const all = [padStart, ...pts, padEnd];

    const segCount = all.length - 3;
    const duration = 2600;
    const startTime = Date.now();

    let done = false;

    function tick() {
      if (!ref.current || done) return;
      const now = Date.now();
      const t = Math.min((now - startTime) / duration, 1);

      const raw = t * segCount;
      const seg = Math.min(Math.floor(raw), segCount - 1);
      const local = raw - seg;

      const x = catmullRom(all[seg][0], all[seg + 1][0], all[seg + 2][0], all[seg + 3][0], local);
      const y = catmullRom(all[seg][1], all[seg + 1][1], all[seg + 2][1], all[seg + 3][1], local);

      const pulse = 1 + Math.sin(now * 0.0008) * 0.06;
      ref.current.style.transform =
        `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${pulse})`;

      if (t >= 1) {
        done = true;
      } else {
        requestAnimationFrame(tick);
      }
    }

    const frameId = requestAnimationFrame(tick);

    return () => {
      done = true;
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && ref.current) {
      ref.current.style.opacity = 0;
    }
  }, [isLoaded]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        borderRadius: "50%",
        backgroundColor: "rgb(30, 41, 59)",
        boxShadow: "0 0 40px 10px rgba(30, 41, 59, 0.5)",
        filter: "blur(15px)",
        zIndex: 10000,
        pointerEvents: "none",
        marginTop: -30,
        marginLeft: -30,
        willChange: "transform",
        opacity: 1,
      }}
    />
  );
}
