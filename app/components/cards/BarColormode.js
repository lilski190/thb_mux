"use client";
import React, { useRef, useState } from "react";
import { ICONS } from "@/lib/globals";
import { setColorMode } from "@/app/actions/colorAction";
import { useToast } from "@/app/components/modals/Toast";

const BarColormode = ({ title, icon, mode, dict }) => {
  const formRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(mode);
  const [isSaving, setIsSaving] = useState(false);

  const { showToast } = useToast();

  const handleSave = async (modeToSave) => {
    setIsSaving(true);
    try {
      let result = await setColorMode(modeToSave);
      showToast("success", 3, result || "Erfolgreich gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      showToast("error", 3, "Fehler beim Speichern");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedMode(value);
    handleSave(value); // Direkt speichern mit dem neuen Wert
  };
  return (
    <div className="w-full mb-2">
      <form>
        <fieldset
          className="flex gap-4 w-full"
          aria-labelledby="color-group-label"
        >
          <legend id="color-group-label" className="sr-only">
            {dict.general.sr_color}
          </legend>
          <label htmlFor={`color-main`} className="cursor-pointer w-1/3">
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
          <label htmlFor={`color-dark`} className="cursor-pointer w-1/3">
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
          <label htmlFor={`color-contrast`} className="cursor-pointer w-1/3">
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
