"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SystemLanguage({ current, loggedInLang }) {
  const router = useRouter();
  const allowedLangs = ["de", "en", "sp", "pl", "ar"];

  useEffect(() => {
    let cookieLang = undefined;
    if (loggedInLang || loggedInLang != undefined) {
      cookieLang = loggedInLang;
    }
    // Hole System-Sprache als Fallback
    const systemLangFull = navigator.language || "de-DE";
    const systemLang = systemLangFull.split("-")[0];

    // Entscheide, welche Sprache verwendet werden soll
    const preferredLang = allowedLangs.includes(cookieLang)
      ? cookieLang
      : allowedLangs.includes(systemLang)
      ? systemLang
      : "de"; // Standardfallback

    console.log("Preferred Lang:", preferredLang, "| Aktuelle Route:", current);

    // Redirect nur, wenn preferredLang ≠ aktuelle Sprachroute
    if (current && preferredLang !== current) {
      router.replace(`/${preferredLang}`);
    }
  }, [current, router]);

  return null;
}
