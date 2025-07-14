"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const COLOR_MAP = {
  FBI: "#00BAE5",
  FBT: "#83BB20",
  FBW: "#F18400",
};

const HomeStatisticModal = ({ data, title, description, sr }) => {
  const entries = Object.entries(data);
  const [bestfb, bestValue] = entries.reduce((max, entry) =>
    entry[1] > max[1] ? entry : max
  );

  const maxValue = bestValue;

  return (
    <div
      className="card bg-base-100 border border-base-300"
      role="group"
      aria-labelledby="stat-title"
    >
      <div className="py-3 pl-5 pr-1  hover:bg-base-300/10">
        <h3 className="Textbold font-bold mb-2">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 justify-start h-24">
            <figure
              className="flex items-end gap-4 justify-start h-24 "
              role="img"
              aria-describedby="stat-desc"
            >
              {entries.map(([key, value]) => {
                const heightPercent = Math.max((value / maxValue) * 100, 1);
                const barColor = COLOR_MAP[key] || "#888"; // fallback-farbe grau

                return (
                  <div
                    key={key}
                    className="flex flex-col items-center h-full justify-end "
                  >
                    <div
                      className="w-6 rounded"
                      aria-hidden="true"
                      style={{
                        height: `${heightPercent}%`,
                        minHeight: "2px",
                        backgroundColor: barColor,
                        transition: "height 0.3s ease-in-out",
                      }}
                      title={`${key}: ${value}`}
                    />
                    <span className="mt-0 text96 ">{key}</span>
                  </div>
                );
              })}
              {/* Unsichtbare Tabelle für Screen‑Reader */}
              <table className="sr-only">
                <thead>
                  <tr>
                    <th scope="col">{title}</th>
                    <th scope="col">{sr.value}</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
            <p className="text w-3/6 ml-3 pb-4">{description[bestfb]}</p>
          </div>
          <div className="text-base-300 pb-8" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 96 96"
              strokeWidth={3}
              stroke="currentColor"
              className="h-12"
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

export default HomeStatisticModal;
