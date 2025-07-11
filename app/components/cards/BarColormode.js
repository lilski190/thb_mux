"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const BarColormode = ({ title, icon }) => {
  return (
    <div className="w-full">
      <div className="card bg-base-100 border border-base-300 p-0 m-0 ">
        <div className="card-body text h-10 p-0 m-0">
          <div className="flex items-center justify-between">
            <div className="text-base-content flex items-center">
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
              </svg>{" "}
              <div className="text100 text "> {title}</div>
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
