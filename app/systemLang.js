"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SystemLanguage({ current }) {
  const [sysLang, setSysLang] = useState("");
  const router = useRouter();

  const allowedLangs = ["de", "en"];

  useEffect(() => {
    const systemLangFull = navigator.language; // z. B. "de-DE"
    const systemLang = systemLangFull.split("-")[0]; // → "de"

    console.log("Systemsprache:", systemLang, "Aktuelle Route:", current);

    // Wenn System-Sprache unterschiedlich und erlaubt → redirect
    if (systemLang !== current && allowedLangs.includes(systemLang)) {
      router.replace(`/${systemLang}`);
    }

    setSysLang(systemLangFull); // Für Anzeige im UI
  }, [current, router]);

  return <div></div>;
}
