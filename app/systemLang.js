"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Clientseitige Komponente zur automatischen Sprachweiterleitung basierend auf
 * - einer gespeicherten Benutzersprache (`loggedInLang`)
 * - oder der Systemsprache des Browsers.
 *
 * Wenn die aktuelle Route-Sprache (`current`) nicht mit der bevorzugten Sprache übereinstimmt,
 * erfolgt ein Redirect auf die passende Sprachroute.
 *
 * @component
 * @param {Object} props - Eigenschaften der Komponente.
 * @param {string} props.current - Aktuell aktive Sprache aus der URL (z. B. "de", "en").
 * @param {string} [props.loggedInLang] - Optional gespeicherte Benutzersprache (z. B. aus Cookie oder DB).
 *
 * @returns {null} Diese Komponente rendert kein UI, sondern führt nur einen clientseitigen Redirect aus.
 */
export default function SystemLanguage({ current, loggedInLang }) {
  const router = useRouter();
  const allowedLangs = ["de", "en", "sp", "pl", "ar"];

  useEffect(() => {
    let cookieLang = undefined;
    if (loggedInLang || loggedInLang != undefined) {
      cookieLang = loggedInLang;
    }
    const systemLangFull = navigator.language || "de-DE";
    const systemLang = systemLangFull.split("-")[0];

    const preferredLang = allowedLangs.includes(cookieLang)
      ? cookieLang
      : allowedLangs.includes(systemLang)
      ? systemLang
      : "de";

    if (current && preferredLang !== current) {
      router.replace(`/${preferredLang}`);
    }
  }, [current, router]);

  return null;
}
