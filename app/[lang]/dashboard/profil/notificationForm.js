"use client";

import { useState } from "react";
import { pushNotoficationData } from "@/app/actions/formAction";
import { useToast } from "@/app/components/modals/Toast";

export default function NotificationForm({ params, dict, closeModal }) {
  const [checkboxes, setCheckboxes] = useState({
    mo: false,
    di: false,
    mi: false,
    don: false,
    fr: false,
  });

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await pushNotoficationData(formData);
      showToast("success", 3, result || "Erfolgreich gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      showToast("error", 3, "Fehler beim Speichern");
    }
    closeModal?.()
  };

  const allChecked = Object.values(checkboxes).every(Boolean);

  const dayKeys = ["mo", "di", "mi", "don", "fr"];
  const dayLabels = dict.options.slice(0, 5); // Mo–Fr

  const handleCheckboxChange = (day, checked) => {
    setCheckboxes((prev) => ({
      ...prev,
      [day]: checked,
    }));
  };

  const handleSelectAll = () => {
    const newValue = !allChecked;
    const newCheckboxes = {};
    dayKeys.forEach((day) => {
      newCheckboxes[day] = newValue;
    });
    setCheckboxes(newCheckboxes);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset
        className="flex flex-wrap justify-center gap-2"
        aria-labelledby="weekday-group-label"
      >
        <legend id="weekday-group-label" className="sr-only">
          {dict.legendDays || "Benachrichtigungstage auswählen"}
        </legend>

        {dayKeys.map((day, index) => {
          const inputId = `day-${day}`;
          return (
            <div key={day} className="flex flex-col items-center">
              <label htmlFor={inputId} className={"cursor-pointer"}>
                <input
                  type="checkbox"
                  id={inputId}
                  name={day}
                  checked={checkboxes[day]}
                  onChange={(e) => handleCheckboxChange(day, e.target.checked)}
                  className={"sr-only peer"}
                />
                <span
                  className={`
                    w-13 h-13 flex items-center justify-center rounded-full
                    transition
                    peer-focus:ring-2 peer-focus:ring-info text124 text
                    ${
                      checkboxes[day]
                        ? "bg-accent text-accent-content hoverButtonRoundActive peer-focus:ring-none"
                        : "bg-base-200 text-base-content hover:bg-base-300/40 hoverButtonRound"
                    }
                  `}
                >
                  {dayLabels[index]}
                </span>
              </label>
            </div>
          );
        })}
      </fieldset>

      {/* Alle auswählen */}
      <div className="flex items-center gap-3 ml-4">
        <label
          htmlFor="select-all"
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            id="select-all"
            checked={allChecked}
            onChange={handleSelectAll}
            className={"sr-only peer"}
            aria-label={dict.options[5]} // z. B. „Alle Tage auswählen“
          />

          <div
            aria-hidden="true"
            className={`
          w-5 h-5 rounded-full flex items-center justify-center transition
          bg-[#EFE9E5] border border-base-content
         
        `}
          >
            {allChecked && (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-base-content"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span
            className="text text96 
        
                    peer-focus:ring-2 peer-focus:ring-info
          focus-within:ring-2 focus-within:ring-info focus-within:ring-offset-2"
          >
            {dict.options[5]}
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-center mb-24">
        <button
          type="submit"
          className="btn btn-primary buttonStyle mt-4 text75 text-primary-content Textbold hoverButtonPrim"
        >
          {dict.save}
        </button>
      </div>
    </form>
  );
}
