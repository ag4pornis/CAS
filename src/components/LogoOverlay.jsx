import { useRef, useEffect } from "react";
import gsap from "gsap";

const LOGO_SECTIONS = ["hero", "reflection"];

export default function LogoOverlay({ activeSection }) {
  const ref = useRef(null);
  const isVisible = useRef(LOGO_SECTIONS.includes(activeSection));
  const mounted = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const shouldShow = LOGO_SECTIONS.includes(activeSection);

    if (!mounted.current) {
      mounted.current = true;
      if (shouldShow) {
        gsap.set(ref.current, { opacity: 0.35, scale: 1 });
      }
      return;
    }

    if (shouldShow && !isVisible.current) {
      isVisible.current = true;
      gsap.killTweensOf(ref.current);
      gsap.fromTo(ref.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 0.35, scale: 1, duration: 0.9, ease: "power2.out" }
      );
    } else if (!shouldShow && isVisible.current) {
      isVisible.current = false;
      gsap.killTweensOf(ref.current);
      gsap.to(ref.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [activeSection]);

  return (
    <>
      <img
        ref={ref}
        src={`${import.meta.env.BASE_URL}CAS_logo.png`}
        alt=""
        className="logo-overlay"
      />
      <style>{`
        .logo-overlay {
          position: fixed;
          right: 6%;
          top: 50%;
          transform: translateY(-50%);
          width: clamp(500px, 55vw, 800px);
          aspect-ratio: 1 / 1;
          height: auto;
          opacity: 0;
          filter: blur(1.3px);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
      `}</style>
    </>
  );
}
