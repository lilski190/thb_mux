"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ← Importiere den Router

/**
 * IntroOverlay zeigt ein Overlay mit einem GIF beim Start.
 * Nach 2,5 Sekunden wird entweder:
 * - das Overlay ausgeblendet (wenn der Nutzer nicht eingeloggt ist), oder
 * - der Nutzer auf das Dashboard weitergeleitet (wenn eingeloggt).
 *
 * @param {Object} props
 * @param {string} props.altText - Alternativtext für das Bild (Wichtig für Barrierefreiheit)
 * @param {string} props.name - (Optional) Name des Nutzers (wird aktuell nicht genutzt)
 * @param {boolean} props.userLoggedIn - Status, ob der Nutzer eingeloggt ist
 * @param {string} props.lang - Sprachcode, der für die Weiterleitung genutzt wird (z.B. "de", "en")
 *
 * @returns {JSX.Element|null} JSX für das Overlay oder null wenn ausgeblendet
 */
export function IntroOverlay({ altText, name, userLoggedIn, lang }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (userLoggedIn && lang) {
        router.push(`/${lang}/dashboard`);
      } else {
        setShowOverlay(false);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [userLoggedIn, lang, router]);

  if (!showOverlay) return null;

  return (
    <div
      className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-center justify-center h-screen w-screen"
      role="alert"
      aria-live="assertive"
      aria-label={altText}
    >
      <img src="/start.gif" alt={altText} className="w-full" />
    </div>
  );
}
