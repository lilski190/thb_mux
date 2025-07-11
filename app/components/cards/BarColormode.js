"use client";
import React, { useRef, useState } from "react";
import { ICONS } from "@/lib/globals";
import { setColorMode } from "@/app/actions/colorAction";

const BarColormode = ({ title, icon, mode }) => {
  const formRef = useRef(null);
  const [selectedMode, setSelectedMode] = useState(mode);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedMode(value);
    formRef.current?.requestSubmit();
  };

  return (
    <div className="w-full">
      <div className="card bg-base-100 border border-base-300 p-0 m-0">
        <div className="card-body text h-10 p-0 m-0">
          <div className="flex items-center justify-between">
            <div className="text-base-content flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS[icon]}
                />
              </svg>
              <div className="text100 text">{title}</div>
              <form ref={formRef} action={setColorMode}>
                <label>
                  Main
                  <input
                    type="radio"
                    name="colormode"
                    value="main"
                    checked={selectedMode === "main"}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Dark
                  <input
                    type="radio"
                    name="colormode"
                    value="dark"
                    checked={selectedMode === "dark"}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  High Contrast
                  <input
                    type="radio"
                    name="colormode"
                    value="contrast"
                    checked={selectedMode === "contrast"}
                    onChange={handleChange}
                  />
                </label>
              </form>
            </div>
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller mr-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarColormode;
