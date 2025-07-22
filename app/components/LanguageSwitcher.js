"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setLang } from "../actions/colorAction";
import { useToast } from "@/app/components/modals/Toast";

/**
 * Komponente zum Umschalten der Sprache der Anwendung.
 *
 * Zeigt eine Liste von Sprachen als Radio-Buttons an und ermöglicht
 * dem Nutzer, eine Sprache auszuwählen und zu speichern.
 *
 * Nach der Auswahl wird die Sprache serverseitig gesetzt (via setLang),
 * und die Seite wird zur neuen Sprachroute weitergeleitet.
 *
 * @param {Object} props
 * @param {Object} props.dict - Das Lokalisierungs-Objekt mit Texten, z.B. für ARIA und Buttons
 * @param {Function} [props.closeModal] - Optionale Callback-Funktion, um ein Modal zu schließen
 *
 * @returns {JSX.Element} Ein Formular mit Sprachwahl und Speichern-Button
 */
export default function LanguageSwitcher({ dict, closeModal }) {
  const pathname = usePathname();
  const router = useRouter();

  const { showToast } = useToast();

  const currentLang = pathname.split("/")[1] || "de";
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
  const handleSave = async () => {
    if (selectedLang === currentLang) return;
    setIsSaving(true);
    try {
      let result = await setLang(selectedLang);
      const segments = pathname.split("/").filter(Boolean);
      segments[0] = selectedLang;
      window.location.href = `/${selectedLang}/dashboard/profil`;
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    } finally {
      setIsSaving(false);
    }
    closeModal?.();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
      className="space-y-6 flex items-center flex-col"
    >
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
                {lang === "sp" ? "es" : lang}
              </span>
            </label>
            <span className="text text80 mt-2">{langLabels[lang]}</span>
          </div>
        ))}
      </fieldset>
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
