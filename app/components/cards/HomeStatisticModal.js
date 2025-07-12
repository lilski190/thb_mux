"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const COLOR_MAP = {
  FBI: "#00BAE5",
  FBT: "#83BB20",
  FBW: "#F18400",
};

const HomeStatisticModal = ({ data, title, description }) => {
  const entries = Object.entries(data);
  const [bestfb, bestValue] = entries.reduce((max, entry) =>
    entry[1] > max[1] ? entry : max
  );

  const maxValue = bestValue;

  return (
    <div className="">
      <div className="card bg-base-100 border border-base-300">
        <div className="py-3 pl-5 pr-1  hover:bg-base-300/10">
          <div className="Textbold font-bold mb-2">{title}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 justify-start h-24">
              <div className="flex items-end gap-4 justify-start h-24 ">
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
                        style={{
                          height: `${heightPercent}%`,
                          minHeight: "2px",
                          backgroundColor: barColor,
                          transition: "height 0.3s ease-in-out",
                        }}
                        title={`${key}: ${value}`}
                      />
                      <div className="mt-0 text96 ">{key}</div>
                    </div>
                  );
                })}
              </div>
              <div className="text w-3/6 ml-3 pb-4">{description[bestfb]}</div>
            </div>
            <div className="text-base-300 pb-8">
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
    </div>
  );
};

export default HomeStatisticModal;
