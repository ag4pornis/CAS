import { useEffect, useRef, useState } from "react";
import { Letters } from "@kumailnanji/letters";
import gsap from "gsap";

export default function Loader({ ready, onComplete }) {
  const containerRef = useRef(null);
  const [animDone, setAnimDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && animDone && !fadeOut) {
      setFadeOut(true);
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete,
      });
    }
  }, [ready, animDone, fadeOut, onComplete]);

  return (
    <div ref={containerRef} className="loader">
      <Letters
        text="cas"
        autoPlay
        animation={{ type: "tween", duration: 2.5, ease: "easeInOut" }}
        strokeWidth={2}
        color="#000000"
      />
    </div>
  );
}
