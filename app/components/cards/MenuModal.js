"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const MenuModal = ({ icon, title, dict, color }) => {
  let stroke = "none";
  let fill = "currentColor";

  if (icon === "bike" || icon === "walk") {
    stroke = "currentColor";
    fill = "none";
  }

  return (
    <div className="w-full">
      <div className="card bg-base-100 border border-base-300 p-0 m-0 focus:outline-none focus:ring-2 focus:ring-primary">
        <div className="card-body h-10 p-0 m-0 hover:bg-base-300/10 mr-1.5">
          <div className="flex justify-between items-center h-full">
            <div
              className={`flex items-center ${
                color ? `text-${color}` : "text-base-content"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={fill}
                viewBox="0 0 96 96"
                strokeWidth={4}
                stroke={stroke}
                className="w-10"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS[icon]}
                />
              </svg>
              <span className="text100 text ml-2">{title}</span>
            </div>

            <div className="text-base-300" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 96 96"
                strokeWidth={6}
                stroke="currentColor"
                className="w-6"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.arrowRight}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
