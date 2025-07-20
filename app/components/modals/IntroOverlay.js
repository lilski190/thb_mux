"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ← Importiere den Router

export function IntroOverlay({ altText, name, userLoggedIn, lang }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter(); // ← Initialisiere Router

  useEffect(() => {
    const timer = setTimeout(() => {
      //      setShowOverlay(false);
      // Wenn User eingeloggt ist, weiterleiten
      if (userLoggedIn && lang) {
        router.push(`/${lang}/dashboard`);
      } else {
        setShowOverlay(false);
      }
      // setShowOverlay(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [userLoggedIn, lang, router]); // ← Abhängigkeiten

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-center justify-center h-screen w-screen"
      role="alert"
      aria-live="assertive"
      aria-label={altText}
    >
      <img src="/start.GIF" alt={altText} className="w-full" />
    </div>
  );
}
