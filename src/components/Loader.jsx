import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ ready, onComplete }) {
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const strokes = container.querySelectorAll(".cas-path");
    const fills = container.querySelectorAll(".cas-fill-path");

    const tl = gsap.timeline();
    tlRef.current = tl;

    strokes.forEach((el) => {
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });

    // 1. Draw each letter stroke
    strokes.forEach((el, i) => {
      tl.to(
        el,
        { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" },
        i === 0 ? 0.3 : "-=0.08"
      );
    });

    // 2. Fill in
    tl.to(fills, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.06,
    }, "+=0.15");

    // 3. Hide strokes
    tl.to(strokes, {
      opacity: 0,
      duration: 0.25,
      ease: "power1.out",
    }, "-=0.3");

    // 4. Wait for images
    tl.pause();

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (ready) {
      tlRef.current.resume();
      tlRef.current.eventCallback("onComplete", () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete,
        });
      });
    }
  }, [ready, onComplete]);

  return (
    <div ref={containerRef} className="loader">
      <svg
        className="loader-svg"
        viewBox="0 0 360 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── C ── */}
        <path
          className="cas-path"
          d="M 95 25 C 85 12, 62 8, 50 18 C 36 30, 34 52, 38 68 C 42 84, 55 98, 75 100 C 88 101, 96 96, 100 88"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="cas-fill-path"
          d="M 95 25 C 85 12, 62 8, 50 18 C 36 30, 34 52, 38 68 C 42 84, 55 98, 75 100 C 88 101, 96 96, 100 88"
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{ opacity: 0 }}
        />

        {/* ── A ── */}
        <path
          className="cas-path"
          d="M 135 100 L 170 22 L 205 100 M 148 68 L 192 68"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          className="cas-fill-path"
          d="M 135 100 L 170 22 L 205 100 M 148 68 L 192 68"
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ opacity: 0 }}
        />

        {/* ── S ── */}
        <path
          className="cas-path"
          d="M 310 30 C 295 18, 265 18, 258 30 C 250 44, 262 52, 278 58 C 294 64, 312 68, 315 82 C 318 96, 305 108, 285 106 C 270 104, 258 96, 250 85"
          stroke="var(--text-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="cas-fill-path"
          d="M 310 30 C 295 18, 265 18, 258 30 C 250 44, 262 52, 278 58 C 294 64, 312 68, 315 82 C 318 96, 305 108, 285 106 C 270 104, 258 96, 250 85"
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
}
