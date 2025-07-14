"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// ➜ Passe ggf. den Importpfad an:
import { setLang } from "../actions/colorAction";

export default function LanguageSwitcher({ dict }) {
  const pathname = usePathname();
  const router = useRouter();

  // Aktuelle Sprache aus der URL ermitteln
  const currentLang = pathname.split("/")[1] || "de";

  // Lokaler State für die (neu) gewählte Sprache
  const [selectedLang, setSelectedLang] = useState(currentLang);
  const [isSaving, setIsSaving] = useState(false);

  const languageKeys = ["de", "en", "sp", "pl", "ar"];
  const langLabels = {
    de: "Deutsch",
    en: "English",
    sp: "Español",
    pl: "Polski",
    ar: "العربية",
  };

  /** Router‑Pfad anpassen und Action aufrufen */
  const handleSave = async () => {
    if (selectedLang === currentLang) return; // Nichts zu tun
    setIsSaving(true);
    try {
      // 1) Action ausführen (z. B. in der DB / Session speichern)
      await setLang(selectedLang);

      // 2) URL umschreiben
      const segments = pathname.split("/").filter(Boolean);
      segments[0] = selectedLang;
      router.push(`/${segments.join("/")}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-6 flex items-center flex-col"
    >
      {/* Sprachwahl */}
      <fieldset
        className="flex flex-wrap justify-center items-center gap-2 mt-4 w-full"
        aria-labelledby="language-group-label"
      >
        <legend id="language-group-label" className="sr-only">
          {dict.general.sr_lang}
        </legend>

        {languageKeys.map((lang) => (
          <div key={lang} className="flex flex-col  items-center px-3 py-3">
            <label htmlFor={`lang-${lang}`} className="cursor-pointer">
              <input
                type="radio"
                id={`lang-${lang}`}
                name="language"
                value={lang}
                checked={lang === selectedLang}
                onChange={() => setSelectedLang(lang)}
                className="sr-only peer"
              />
              <span
                className={`
                  w-13 h-13 flex items-center justify-center rounded-full
                  transition text124 text uppercase
                  peer-focus:ring-2 peer-focus:ring-info
                  ${
                    lang === selectedLang
                      ? "bg-accent text-accent-content hoverButtonRoundActive"
                      : "bg-base-200 text-base-content hover:bg-base-300/40 hoverButtonRound"
                  }
                `}
              >
                {lang}
              </span>
            </label>
            <span className="text text80 mt-2">{langLabels[lang]}</span>
          </div>
        ))}
      </fieldset>

      {/* Speichern‑Button */}
      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className="btn btn-primary buttonStyle mt-4 text-base font-bold text-primary-content hoverButtonPrim"
        >
          {dict.general.save}
        </button>
      </div>
    </form>
  );
}
