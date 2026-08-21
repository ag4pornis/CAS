import { casProject, experiences } from "../data/experiences";

function collectUniqueUrls(arr) {
  const seen = new Set();
  const result = [];
  for (const url of arr) {
    const id = url.split("?")[0];
    if (!seen.has(id)) {
      seen.add(id);
      result.push(url);
    }
  }
  return result;
}

function fillToNine(urls) {
  if (urls.length === 0) return [];
  const out = [];
  while (out.length < 9) {
    out.push(urls[out.length % urls.length]);
  }
  return out;
}

export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getImagesBySection() {
  const projectRaw = [
    ...casProject.images,
    ...casProject.timeline.flatMap((p) => p.images || []),
  ];
  const project = fillToNine(collectUniqueUrls(projectRaw));

  const creativityRaw = experiences.creativity.flatMap((e) => e.images || []);
  const creativity = fillToNine(collectUniqueUrls(creativityRaw));

  const activityRaw = experiences.activity.flatMap((e) => e.images || []);
  const activity = fillToNine(collectUniqueUrls(activityRaw));

  const serviceRaw = experiences.service.flatMap((e) => e.images || []);
  const service = fillToNine(collectUniqueUrls(serviceRaw));

  return { project, creativity, activity, service };
}

export function preloadImages() {
  const allRaw = [
    ...casProject.images,
    ...casProject.timeline.flatMap((p) => p.images || []),
    ...experiences.creativity.flatMap((e) => e.images || []),
    ...experiences.activity.flatMap((e) => e.images || []),
    ...experiences.service.flatMap((e) => e.images || []),
  ];
  const unique = collectUniqueUrls(allRaw);

  return Promise.all(
    unique.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = url;
        })
    )
  );
}
