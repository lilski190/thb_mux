"use client";
import { logoutAction } from "@/app/actions/authAction";
import { ICONS } from "@/lib/globals";
import React from "react";

/**
 * MenuBar-Komponente mit Logout-Button.
 *
 * @param {Object} props - Komponenten-Props
 * @param {string} [props.title="Logout"] - Beschriftung des Buttons und aria-label
 * @param {string} [props.mode] - Optionaler Modus (derzeit ungenutzt)
 * @param {string} [props.icon=ICONS.logout] - SVG-Pfad für das Icon
 *
 * @returns {JSX.Element} JSX-Element mit Logout-Formular und Button
 */
export default function MenuBar({
  title = "Logout",
  mode,
  icon = ICONS.logout,
}) {
  return (
    <div className="w-full my-3">
      <form action={logoutAction} className="w-full">
        <button
          type="submit"
          className="w-full focus:outline-none focus:ring-2 focus:ring-info rounded-lg"
          aria-label={title}
        >
          <div className="card bg-base-100 hover:bg-base-300/30 p-0 m-0">
            <div
              className="card-body h-10 flex items-center justify-center border border-base-300 rounded-lg gap-2"
              role="group"
              aria-labelledby="logout-label"
            >
              {icon && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-accent"
                  viewBox="0 0 96 96"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={icon} />
                </svg>
              )}

              <span
                id="logout-label"
                className="text100 text-center text-accent"
              >
                {title}
              </span>
            </div>
          </div>
        </button>
      </form>
    </div>
  );
}
