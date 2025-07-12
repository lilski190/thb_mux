"use client";

import { useState } from "react";
import { pushMealData } from "@/app/actions/formAction";
import { useToast } from "@/app/components/modals/Toast";
import { ICONS } from "@/lib/globals";

export default function MealForm({ dict }) {
  const { showToast } = useToast();
  const [meal, setMeal] = useState(null);

  const handleClick = (value) => {
    setMeal(value);
  };

  const mealOptions = [
    { value: "vegan", icon: ICONS.vegan, label: dict.options[0] },
    { value: "vegetarian", icon: ICONS.vegetarian, label: dict.options[1] },
    { value: "fish", icon: ICONS.fish, label: dict.options[2] },
    { value: "meat", icon: ICONS.meat, label: dict.options[3] },
    { value: "salat", icon: ICONS.salat, label: dict.options[4] },
    { value: "none", icon: null, label: dict.options[5] }, // Kein Icon hier
  ];

  return (
    <form
      action={pushMealData}
      className=""
      onSubmit={() =>
        showToast("success", 5, "Benutzer erfolgreich gespeichert!")
      }
    >
      <div className="flex flex-wrap justify-center gap-2">
        {mealOptions.map((item) =>
          item.value !== "none" ? (
            <label key={item.value} className="flex flex-col items-center">
              <input
                type="radio"
                name="meal"
                value={item.value}
                checked={meal === item.value}
                onChange={() => handleClick(item.value)}
                className="hidden"
              />
              <div
                onClick={() => handleClick(item.value)}
                className={`w-15 h-15 flex items-center justify-center rounded-full cursor-pointer transition  ${
                  meal === item.value
                    ? "bg-accent text-accent-content hoverButtonRoundActive"
                    : "bg-base-200 text-base-content hoverButtonRound"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 96 96"
                  className="h-12 w-12"
                >
                  <path d={item.icon} />
                </svg>
              </div>
              <span className="mt-1 hidden">{item.label}</span>
            </label>
          ) : (
            // Sonderbehandlung für "none"
            <label key="none" className="flex flex-col items-center mt-4">
              <input
                type="radio"
                name="meal"
                value="none"
                checked={meal === "none"}
                onChange={() => handleClick("none")}
                className="hidden"
              />
              <div className=" text100 text text-center mt-2 ">
                <button
                  onClick={() => handleClick("none")}
                  className={`underline hover:text-accent hover:underline hover:font-semibold cursor-pointer active:text-secondary ${
                    meal === "none" ? "TextSelect" : "text-base-content"
                  }`}
                >
                  {item.label}
                </button>
              </div>
            </label>
          )
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="btn btn-primary buttonStyle mt-8 text75 text-primary-content Textbold hoverButtonPrim"
        >
          <div className="">{dict.save}</div>
        </button>
      </div>
    </form>
  );
}
