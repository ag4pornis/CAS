import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { getImagesBySection, shuffleArray } from "../utils/sectionImages";

const CONTENT_SECTIONS = ["project", "creativity", "activity", "service"];

export default function ImageGrid({ activeSection }) {
  const gridRef = useRef(null);
  const imagesBySection = useMemo(() => getImagesBySection(), []);
  const prevSection = useRef(activeSection);
  const prevVisible = useRef(CONTENT_SECTIONS.includes(activeSection));

  useEffect(() => {
    if (!gridRef.current) return;

    const container = gridRef.current;
    const imgs = container.querySelectorAll(".grid-cell");
    const from = prevSection.current;
    const to = activeSection;
    const wasVisible = prevVisible.current;
    const nowVisible = CONTENT_SECTIONS.includes(to);

    prevSection.current = to;
    prevVisible.current = nowVisible;

    if (from === to && !nowVisible) return;

    if (!wasVisible && nowVisible) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
      const urls = shuffleArray(imagesBySection[to] || imagesBySection.project);
      imgs.forEach((img, i) => {
        if (urls[i]) img.src = urls[i];
      });
      gsap.set(imgs, { opacity: 0, scale: 0.92 });
      gsap.to(imgs, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: { each: 0.06, from: "random" },
        delay: 0.2,
      });
      return;
    }

    if (wasVisible && !nowVisible) {
      gsap.killTweensOf(container);
      gsap.to(container, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.inOut",
      });
      return;
    }

    if (wasVisible && nowVisible && from !== to) {
      const urls = shuffleArray(imagesBySection[to] || imagesBySection.project);
      gsap.to(imgs, {
        opacity: 0,
        scale: 0.92,
        duration: 0.45,
        ease: "power2.in",
        stagger: { each: 0.03, from: "random" },
        onComplete: () => {
          imgs.forEach((img, i) => {
            if (urls[i]) img.src = urls[i];
          });
          gsap.to(imgs, {
            opacity: 1,
            scale: 1,
            duration: 0.65,
            ease: "power2.out",
            stagger: { each: 0.05, from: "random" },
          });
        },
      });
    }
  }, [activeSection, imagesBySection]);

  const initialUrls = useMemo(
    () => shuffleArray(imagesBySection.project),
    [imagesBySection]
  );

  return (
    <div
      className="image-grid"
      ref={gridRef}
      style={{ opacity: 0, transform: "scale(0.95)" }}
    >
      {initialUrls.map((url, i) => (
        <img key={i} className="grid-cell" src={url} alt="" loading="lazy" />
      ))}
    </div>
  );
}
