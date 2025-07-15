"use client";

import { useState } from "react";
import { pushMealData } from "@/app/actions/formAction";
import { useToast } from "@/app/components/modals/Toast";
import { ICONS } from "@/lib/globals";

export default function MealForm({ dict, closeModal }) {
  const { showToast } = useToast();
  const [meal, setMeal] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const result = await pushMealData(formData);
      showToast("success", 3, result || "Erfolgreich gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      showToast("error", 3, "Fehler beim Speichern");
    }
    closeModal?.()
  };

  const handleClick = (value) => {
    setMeal(value);
  };

  const mealOptions = [
    { value: "vegan", icon: ICONS.vegan, label: dict.options[0] },
    { value: "vegetarian", icon: ICONS.vegetarian, label: dict.options[1] },
    { value: "fish", icon: ICONS.fish, label: dict.options[2] },
    { value: "meat", icon: ICONS.meat, label: dict.options[3] },
    { value: "salat", icon: ICONS.salat, label: dict.options[4] },
    { value: "none", icon: null, label: dict.options[5] },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset
        role="radiogroup"
        aria-labelledby="meal-choice-legend"
        className="flex flex-wrap justify-center gap-4"
      >
        <legend id="meal-choice-legend" className="sr-only">
          {dict.legendMeal}
        </legend>
        {mealOptions.map((item) => {
          const inputId = `meal-${item.value}`;
          const isSelected = meal === item.value;

          if (item.value !== "none") {
            return (
              <div
                key={item.value}
                className="flex flex-col items-center w-1/4"
              >
                <input
                  type="radio"
                  id={inputId}
                  name="meal"
                  value={item.value}
                  checked={isSelected}
                  onChange={() => handleClick(item.value)}
                  className="sr-only peer"
                />
                <label
                  htmlFor={inputId}
                  className={`
                    w-16 h-16 flex items-center justify-center rounded-full cursor-pointer
                    transition peer-focus:ring-2 peer-focus:ring-info
                    ${
                      isSelected
                        ? "bg-accent text-accent-content"
                        : "bg-base-200 text-base-content hover:bg-base-300/40"
                    }
                  `}
                  aria-label={item.label}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 96 96"
                    fill="currentColor"
                    className="h-15 w-15"
                    aria-hidden="true"
                  >
                    <path d={item.icon} />
                  </svg>
                </label>
                <span className="text text80 mt-3">{item.label}</span>
              </div>
            );
          } else {
            return (
              <div key={item.value} className="flex flex-col items-center mt-2">
                <input
                  type="radio"
                  id={inputId}
                  name="meal"
                  value="none"
                  checked={isSelected}
                  onChange={() => handleClick("none")}
                  className="sr-only peer"
                />
                <label
                  htmlFor={inputId}
                  className={`
                    underline text80  text-center mt-2 cursor-pointer transition
                    peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-info
                    ${
                      isSelected
                        ? "text-accent font-semibold"
                        : "text-base-content hover:text-accent"
                    }
                  `}
                >
                  {item.label}
                </label>
              </div>
            );
          }
        })}
      </fieldset>

      {/* Submit-Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="btn btn-primary buttonStyle mt-4 text-base font-bold text-primary-content hoverButtonPrim"
        >
          {dict.save}
        </button>
      </div>
    </form>
  );
}
