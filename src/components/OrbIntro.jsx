import { useRef, useEffect } from "react";

export default function OrbIntro({ isLoaded }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const vh = window.innerHeight;
    const cx = 30;
    const cy = vh * 0.13;
    const R = 70;
    const duration = 2500;
    const startAngle = -Math.PI / 2;
    const startTime = Date.now();

    let done = false;

    function tick() {
      if (!ref.current || done) return;
      const now = Date.now();
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      const angle = startAngle + t * Math.PI * 2;
      const x = cx + R * Math.cos(angle);
      const y = cy + R * Math.sin(angle);

      const pulse = 1 + Math.sin(now * 0.0008) * 0.06;
      const fadeOut = t > 0.7 ? 1 - (t - 0.7) / 0.3 : 1;
      ref.current.style.opacity = fadeOut;
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
        opacity: 0,
      }}
    />
  );
}
