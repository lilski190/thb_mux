"use client";

import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/getDictionary";

/**
 * Fehlerseite-Komponente, die einen unerwarteten Fehler anzeigt.
 * Lädt die Übersetzungen basierend auf der Sprache aus der URL.
 *
 * Zeigt eine barrierefreie Fehleranzeige mit ARIA-Rollen und Live-Region.
 *
 * @param {Object} props
 * @param {Error} props.error - Der gefangene Fehler
 * @param {Function} props.reset - Funktion zum Zurücksetzen des Fehlerzustands
 * @returns {JSX.Element|null} Die Fehlerseite oder null während des Ladens
 */
export default function ErrorPage({ error, reset }) {
  const [dict, setDict] = useState(null);

  useEffect(() => {
    console.error("Ein unerwarteter Fehler ist aufgetreten:", error);
    const pathname = window.location.pathname;
    const lang = pathname.split("/")[1] || "de";

    getDictionary(lang)
      .then(setDict)
      .catch(() => {
        setDict({
          errors: {
            errorAltText: "Fehler beim Laden der Seite",
            error: "Fehler",
            errorDescription:
              "Es ist ein Fehler aufgetreten. Bitte lade die Seite neu.",
          },
        });
      });
  }, [error]);

  if (!dict) return null;

  const altText = dict.errors.errorAltText || "Error loading page";
  const title = dict.errors.error || "Error";
  const description =
    dict.errors.errorDescription ||
    "There was an error, please reload the page.";

  return (
    <div className="bg-base-200 h-screen">
      <section
        className="fixed inset-0 bg-[#fbedda] z-50 flex flex-col items-start justify-start h-screen w-screen"
        role="alert"
        aria-live="assertive"
        aria-label={title}
      >
        <img
          src="/error.gif"
          alt={altText}
          className="w-full mt-6"
          aria-hidden="true"
        />
        <header className="px-10 mt-4 w-full">
          <h1 className="title titleBig text.center" tabIndex={-1}>
            {title}
          </h1>
        </header>
        <p className="px-10 text text96 text-center w-full mt-3 my-6">
          {description}
        </p>
      </section>
    </div>
  );
}
