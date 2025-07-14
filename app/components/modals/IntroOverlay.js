"use client";

import { useEffect, useState } from "react";

export function IntroOverlay({ altText, name }) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 1700);
    return () => clearTimeout(timer);
  }, []);

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 bg-base-200 z-50 flex flex-col items-center justify-center h-screen w-screen"
      role="alert"
      aria-live="assertive"
      aria-label={altText}
    >
      <img src="/loading.GIF" alt={altText} className="w-full " />
    </div>
  );
}
