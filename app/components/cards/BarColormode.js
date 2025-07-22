"use client";
import React, { useRef, useState } from "react";
import { ICONS } from "@/lib/globals";
import { setColorMode } from "@/app/actions/colorAction";
import { useToast } from "@/app/components/modals/Toast";

/**
 * React-Komponente für die Farbauswahl (Colormode) mit Speicherung und Feedback.
 *
 * @param {Object} props - Die Props für die Komponente.
 * @param {string} props.title - Titel (derzeit nicht genutzt, kann für Überschrift o.Ä. sein).
 * @param {React.ReactNode} props.icon - Icon-Komponente (derzeit nicht genutzt, evtl. Erweiterung).
 * @param {string} props.mode - Der aktuell ausgewählte Farbmodus ("main", "dark" oder "contrast").
 * @param {Object} props.dict - Wörterbuch für Übersetzungen/Textinhalte.
 * @param {Object} props.dict.general - Generelle Texte.
 * @param {string[]} props.dict.general.colormodes - Array mit Bezeichnungen der Farbmodes (Licht, Dunkel, Kontrast).
 * @param {string} props.dict.general.sr_color - Beschreibung für Screenreader (z.B. "Farbmodus").
 * @param {Object} [props.toast] - Optional, Übersetzungen für Toast-Nachrichten.
 * @param {string} [props.toast.success] - Erfolgsmeldung.
 * @param {string} [props.toast.auth] - Authentifizierungs-Fehlermeldung.
 * @param {string} [props.toast.general] - Allgemeine Fehlermeldung.
 *
 * @returns {JSX.Element} JSX-Element mit Farbauswahl und Speicherung.
 */
const BarColormode = ({ title, icon, mode, dict, toast }) => {
  const formRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(mode);
  const [isSaving, setIsSaving] = useState(false);

  const { showToast } = useToast();

  const handleSave = async (modeToSave) => {
    setIsSaving(true);

    try {
      const result = await setColorMode(modeToSave);

      if (result?.success) {
        showToast(
          "success",
          3,
          toast?.success || result.message || "Farbmodus gespeichert"
        );
      } else {
        let msg =
          result?.message === "Missing Authorization Header"
            ? toast?.auth || "Nicht eingeloggt"
            : toast?.general || result?.message || "Fehler beim Speichern";

        showToast("error", 3, msg);
      }
    } catch (error) {
      console.error("Fehler beim Speichern (unexpected):", error);
      showToast("error", 3, "Ein unerwarteter Fehler ist aufgetreten");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedMode(value);
    handleSave(value);
  };
  return (
    <div className="w-full mb-2">
      <form>
        <fieldset
          className="flex justify-evenly gap-4 w-full"
          aria-labelledby="color-group-label"
        >
          <legend id="color-group-label" className="sr-only">
            {dict.general.sr_color}
          </legend>
          <label
            htmlFor={`color-main`}
            className="cursor-pointer w-1/3 flex items-center justify-center"
          >
            <input
              type="radio"
              name="colormode"
              id="color-main"
              value="main"
              checked={"main" === selectedMode}
              onChange={handleChange}
              className="sr-only peer"
            />
            <span
              aria-hidden="true"
              className={`
                    main
                  w-15 h-15 flex items-center justify-center rounded-lg
                  transition text124 text uppercase
                  peer-focus:ring-2 peer-focus:ring-info
                bg-base-100 text-base-content 
                  ${
                    "main" === selectedMode
                      ? "border border-primary border-3"
                      : "hover:bg-base-200/40 border border-3 border-base-300"
                  }
                    ${isSaving ? "opacity-50 pointer-events-none" : ""}
                `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                fill={"currentColor"}
                stroke={"none"}
                strokeWidth={3}
                className="w-15 h-15"
                aria-hidden="true"
              >
                <path d={ICONS.colormodeLight} />
              </svg>
            </span>
            <span className="text text80 mt-2 sr-only">
              {dict.general.colormodes[0]}
            </span>
          </label>
          <label
            htmlFor={`color-dark`}
            className="cursor-pointer w-1/3 flex items-center justify-center"
          >
            <input
              type="radio"
              name="colormode"
              id="color-dark"
              value="dark"
              checked={"dark" === selectedMode}
              onChange={handleChange}
              className="sr-only peer"
            />
            <span
              aria-hidden="true"
              className={`
                    dark
                 w-15 h-15 flex items-center justify-center rounded-lg
                  transition text124 text uppercase
                  peer-focus:ring-2 peer-focus:ring-info
                  bg-base-100 text-base-content 
                  ${
                    "dark" === selectedMode
                      ? "border border-primary border-3"
                      : "hover:bg-base-200/40 border border-3 border-base-300"
                  }
                    ${isSaving ? "opacity-50 pointer-events-none" : ""}
                `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                fill={"currentColor"}
                stroke={"none"}
                strokeWidth={3}
                className="w-15 h-15"
                aria-hidden="true"
              >
                <path d={ICONS.colormodeDark} />
              </svg>
            </span>
            <span className="text text80 mt-2 sr-only">
              {dict.general.colormodes[1]}
            </span>
          </label>
          <label
            htmlFor={`color-contrast`}
            className="cursor-pointer w-1/3 flex items-center justify-center"
          >
            <input
              type="radio"
              name="colormode"
              id="color-contrast"
              value="contrast"
              checked={"contrast" === selectedMode}
              onChange={handleChange}
              className="sr-only peer"
            />
            <span
              aria-hidden="true"
              className={`
                  contrast
                  w-15 h-15 flex items-center justify-center rounded-lg
                  transition text124 text uppercase
                  peer-focus:ring-2 peer-focus:ring-info
                  bg-base-100 text-base-content 
                  ${
                    "contrast" === selectedMode
                      ? "border border-primary border-3"
                      : "hover:bg-base-200/40 border border-3 border-base-300"
                  }
                    ${isSaving ? "opacity-50 pointer-events-none" : ""}
                `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 96 96"
                fill={"currentColor"}
                stroke={"none"}
                strokeWidth={3}
                className="w-15 h-15"
                aria-hidden="true"
              >
                <path d={ICONS.colormodeContrast} />
              </svg>
            </span>
            <span className="text text80 mt-2 sr-only">
              {dict.general.colormodes[0]}
            </span>
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default BarColormode;
