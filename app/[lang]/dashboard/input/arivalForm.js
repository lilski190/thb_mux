"use client";
import { pushArivalData } from "@/app/actions/formAction";
import { useState } from "react";
import { ICONS } from "@/lib/globals";
import { useToast } from "@/app/components/modals/Toast";

/**
 * ArrivalForm – Formular zur Auswahl des Verkehrsmittels und der Distanz.
 *
 * Diese Client-Komponente rendert eine Radiogruppen-Auswahl für verschiedene
 * Transportarten (zu Fuß, Fahrrad, Zug, Auto) mit passenden Icons sowie einen
 * Distanz-Slider. Es gibt außerdem einen Button, um auf die gewohnte Auswahl zurückzusetzen.
 * Nach dem Absenden werden die Daten per `pushArivalData` gesendet, und es werden
 * Toast-Nachrichten zu Erfolg oder Fehlern angezeigt.
 *
 * @component
 * @param {Object} props - Komponenten-Props.
 * @param {Object} props.dict - Objekt mit sprachspezifischen Texten und Labels.
 * @param {string[]} props.dict.options - Beschriftungen der Transportoptionen.
 * @param {string} props.dict.legendTransportation - ARIA-Legendentext für die Radiogruppe.
 * @param {string} props.dict.distance - Beschriftung für den Distanz-Slider.
 * @param {string} props.dict.usual - Text für den Gewohnheits-Auswahl-Button.
 * @param {string} props.dict.save - Text für den Speichern-Button.
 * @param {Object} props.toast - Optional. Texte für Toast-Nachrichten.
 * @param {string} [props.toast.success] - Erfolgsmeldung.
 * @param {string} [props.toast.error] - Fehler bei ungültigem Transporttyp.
 * @param {string} [props.toast.msg] - Meldung bei fehlender Autorisierung.
 * @param {string} [props.toast.general] - Allgemeine Fehlermeldung.
 * @param {function} props.closeModal - Callback-Funktion zum Schließen des Modals.
 * @param {Object} props.usual - Gewohnheitswerte für Transportart und Distanz.
 * @param {string} props.usual.key - Gewöhnliche Transportart (z.B. "walk").
 * @param {number} props.usual.value - Gewöhnliche Distanz.
 *
 * @returns {JSX.Element} Das gerenderte Formular mit Transportmittel-Auswahl und Distanz-Slider.
 *
 * @example
 * <ArrivalForm
 *   dict={{
 *     options: ["Zu Fuß", "Fahrrad", "Zug", "Auto"],
 *     legendTransportation: "Wähle dein Verkehrsmittel",
 *     distance: "Distanz (km)",
 *     usual: "Gewohnte Auswahl",
 *     save: "Speichern"
 *   }}
 * />
 */

export default function ArrivalForm({ dict, closeModal, usual, toast }) {
  const [transportation, setTransportation] = useState("");
  const [distance, setDistance] = useState(5);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await pushArivalData(formData);

      if (result?.success) {
        showToast(
          "success",
          3,
          toast?.success || result.message || "Erfolgreich gespeichert"
        );
      } else {
        let msg =
          result?.message === "transportationType is invalid"
            ? toast?.error || "Ungültiger Transporttyp"
            : result?.message === "Missing Authorization Header"
            ? toast?.msg || "Nicht eingeloggt"
            : toast?.general || result?.message || "Fehler beim Speichern";

        showToast("error", 3, msg);
      }
    } catch (error) {
      console.error("Fehler beim Speichern (unexpected):", error);
      showToast("error", 3, "Ein unerwarteter Fehler ist aufgetreten");
    }

    closeModal?.();
  };

  const id = (val) => `transport-${val}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset
        role="radiogroup"
        aria-labelledby="legend-transport"
        className="flex justify-evenly gap-3"
      >
        <legend id="legend-transport" className="sr-only">
          {dict.legendTransportation}
        </legend>

        {["walk", "bike", "train", "car"].map((value, idx) => {
          const isStroke = value === "walk" || value === "bike";
          const isChecked = transportation === value;

          return (
            <div key={value} className="flex flex-col items-center">
              <label htmlFor={id(value)} className="cursor-pointer">
                <input
                  type="radio"
                  id={id(value)}
                  name="transportation"
                  value={value}
                  checked={isChecked}
                  onChange={() => setTransportation(value)}
                  className="sr-only peer"
                />

                <span
                  className={`
                    w-16 h-16 flex items-center justify-center rounded-full
                    transition
                    peer-focus:ring-2 peer-focus:ring-info
                    ${
                      isChecked
                        ? "bg-accent text-accent-content hoverButtonRoundActive peer-focus:ring-none"
                        : "bg-base-200 text-base-content hover:bg-base-300/40 hoverButtonRound"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 96"
                    fill={isStroke ? "none" : "currentColor"}
                    stroke={isStroke ? "currentColor" : "none"}
                    strokeWidth={3}
                    className="w-15 h-15"
                    aria-hidden="true"
                  >
                    <path d={ICONS[value]} />
                  </svg>
                </span>
              </label>

              <span className="text text80 mt-3">{dict.options[idx]}</span>
            </div>
          );
        })}
      </fieldset>

      <div className="text-center space-y-1">
        <label htmlFor="distance-slider" className="text-lg font-medium">
          {dict.distance}
        </label>

        <output
          id="distance-value"
          aria-live="polite"
          className="block text300 text text-center mb-1"
        >
          {distance}
        </output>

        <input
          type="range"
          id="distance-slider"
          name="distance"
          min="1"
          max="100"
          value={distance}
          className="w-full range range-xs focus:outline-none focus:ring-2 focus:ring-info"
          onChange={(e) => setDistance(Number(e.target.value))}
          aria-describedby="distance-value"
        />
      </div>

      <button
        type="button"
        className="underline text80 hover:text-accent focus:outline-none focus:ring-2 focus:ring-info w-full"
        onClick={() => {
          if (usual?.key) setTransportation(usual.key);
          if (typeof usual?.value === "number") setDistance(usual.value);
        }}
      >
        {dict.usual}
      </button>
      <div className="text-center">
        <button
          type="submit"
          className="btn btn-primary buttonStyle text-base font-bold hoverButtonPrim"
        >
          {dict.save}
        </button>
      </div>
    </form>
  );
}
