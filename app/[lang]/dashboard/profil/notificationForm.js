"use client";

import { useState } from "react";
import { pushNotoficationData } from "@/app/actions/formAction";

export default function NotificationFrom({ params, dict }) {
  const [checkboxes, setCheckboxes] = useState({
    mo: false,
    di: false,
    mi: false,
    don: false,
    fr: false,
  });
  const [allSelected, setAllSelected] = useState(false);

  const allChecked = Object.values(checkboxes).every(Boolean);

  const handleCheckboxChange = (name, checked) => {
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setAllSelected(false);
  };

  const handleSelectAll = () => {
    const checked = !allSelected;
    setCheckboxes({
      mo: checked,
      di: checked,
      mi: checked,
      don: checked,
      fr: checked,
    });
    setAllSelected(!allSelected);
  };

  const dayKeys = ["mo", "di", "mi", "don", "fr"];
  const dayLabels = dict.options.slice(0, 5); // Mo–Fr

  return (
    <div>
      <form action={pushNotoficationData}>
        <div className="flex justify-center gap-4 flex-wrap">
          {dayKeys.map((day, index) => (
            <label key={day} className="flex flex-col items-center">
              <input
                type="checkbox"
                name={day}
                value="1"
                checked={checkboxes[day]}
                onChange={(e) => handleCheckboxChange(day, e.target.checked)}
                className="hidden"
              />
              <div
                onClick={(e) => handleCheckboxChange(day, checkboxes[day])}
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition ${
                  checkboxes[day]
                    ? "bg-accent text-accent-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                <span className="text124 text">{dayLabels[index]}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={allChecked}
            className="hidden"
            id="select-all"
          />
          <div className="flex items-center" onClick={handleSelectAll}>
            <div
              className={`w-5 h-5 rounded-full cursor-pointer transition flex items-center justify-center ${
                allChecked ? "bg-[#EFE9E5]" : "bg-[#EFE9E5]"
              }`}
            >
              {allChecked && (
                <svg
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
            <div className="ml-2 cursor-pointer text96 text">
              {dict.options[5]}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <div className="text75 Textbold">{dict.save}</div>
        </button>
      </form>
    </div>
  );
}
