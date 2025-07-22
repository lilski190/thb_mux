"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

/**
 * Komponente für ein Eingabe-Modal mit Icon, Titel und Beschreibung.
 *
 * Zeigt ein gruppiertes Element mit einem SVG-Icon, einem Titel und einer Beschreibung.
 * Bei bestimmten Icons ("bike", "walk") wird das SVG anders gefüllt/gezeichnet.
 *
 * @param {Object} props - Komponenten-Props.
 * @param {string} props.icon - Schlüssel für das Icon im ICONS-Objekt.
 * @param {string} props.title - Titeltext der Eingabe.
 * @param {string} props.description - Beschreibungstext unter dem Titel.
 *
 * @returns {JSX.Element} JSX-Element des Eingabe-Modals.
 */
const HomeInputModal = ({ icon, title, description }) => {
  let stroke = "none";
  let fill = "currentColor";
  if (icon == "bike" || icon == "walk") {
    stroke = "currentColor";
    fill = "none";
  }
  return (
    <div
      className="card bg-base-100 border border-base-300"
      role="group"
      aria-labelledby="input-title"
    >
      <div className="py-6 pl-4 rtl:pr-4 pr-1 hover:bg-base-300/10">
        <div className="flex justify-between items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={fill}
            viewBox="0 0 96 96"
            strokeWidth={3}
            stroke={stroke}
            aria-hidden="true"
            className="h-18 bg-base-200 rounded rounded-full bg-base-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={ICONS[icon]}
            />
          </svg>

          <div className="w-1/2 ml-4 rtl:mr-4">
            <h3 className="Textbold text124 text " id="input-title">
              {title}
            </h3>
            <p className="text96">{description}</p>
          </div>
          <div className="text-base-300" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 96 96"
              strokeWidth={3}
              stroke="currentColor"
              className="h-12 rtl:scale-x-[-1]"
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
  );
};

export default HomeInputModal;
