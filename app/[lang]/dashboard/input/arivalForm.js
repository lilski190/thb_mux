"use client";
import { pushArivalData } from "@/app/actions/formAction";
import { useState } from "react";
import { ICONS } from "@/lib/globals";
import { useToast } from "@/app/components/modals/Toast";

export default function ArrivalForm({ dict, closeModal, usual }) {
  const [transportation, setTransportation] = useState("");
  const [distance, setDistance] = useState(5);

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await pushArivalData(formData);
      showToast("success", 3, result || "Erfolgreich gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      showToast("error", 3, "Fehler beim Speichern");
    }
    closeModal?.();
  };

  /* Hilfsfunktion für IDs */
  const id = (val) => `transport-${val}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* --------- Verkehrsmittel --------- */}
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
              {/* Visuell runder Icon-Button */}
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

              {/* Sichtbarer Klartext unter dem Icon */}
              <span className="text text80 mt-3">{dict.options[idx]}</span>
            </div>
          );
        })}
      </fieldset>

      {/* --------- Distanz-Slider --------- */}
      <div className="text-center space-y-1">
        <label htmlFor="distance-slider" className="text-lg font-medium">
          {dict.distance}
        </label>

        {/* Live‑Ausgabe für Screenreader und Sicht */}
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
          min="0"
          max="150"
          value={distance}
          className="w-full range range-xs focus:outline-none focus:ring-2 focus:ring-info"
          onChange={(e) => setDistance(Number(e.target.value))}
          aria-describedby="distance-value"
        />
      </div>

      {/* --------- Gewohnheits-Link --------- */}
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

      {/* --------- Speichern --------- */}
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
