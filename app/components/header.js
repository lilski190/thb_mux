"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

/**
 * DashboardHeader Komponente zeigt einen fixierten Header mit einem Icon und einem Titel.
 *
 * @param {Object} props
 * @param {string} props.title - Der anzuzeigende Titel im Header
 *
 * @returns {JSX.Element} Ein Header-Element mit Logo und Titel
 */
const DashboardHeader = ({ title }) => {
  return (
    <header
      role="banner"
      className="mb-5 font-bold fixed bg-base-200 w-full z-50 max-w-screen"
      dir="ltr"
    >
      <div className="flex items-center justify-between">
        <div
          className="text-primary w-38 flex justify-left items-center -mt-3"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 96 96"
            strokeWidth={1.5}
            aria-hidden="true"
            stroke="none"
            className="h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={ICONS.sustainAble}
            />
          </svg>
        </div>
        <h2 className="title pt-5"> {title}</h2>
        <div className="w-38" aria-hidden="true"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
