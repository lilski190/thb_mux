"use client";
import React from "react";
import { ICONS } from "@/lib/globals";
import Tooltip from "../tooltips/InformationTooltip";

const MenuModal = ({ icon, title, impl, dict, color }) => {
  let stroke = "none";
  let fill = "currentColor";
  if (icon == "bike" || icon == "walk") {
    stroke = "currentColor";
    fill = "none";
  }
  return (
    <div className="w-full">
      <div className="card bg-base-100 border border-base-300 p-0 m-0 ">
        <div className="card-body h-10 p-0 m-0">
          <div className="flex justify-between items-center h-full ">
            <div
              className={`flex items-center ${
                color ? `text-${color}` : "text-base-content"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={fill}
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke={stroke}
                className="w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS[icon]}
                />
              </svg>{" "}
              <div className="text100 text "> {title}</div>
            </div>

            <div className="text-base-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5"
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
