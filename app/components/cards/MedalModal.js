"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const MedalModal = ({ count, title, description, sr, allOptions }) => {
  const showMiddle = count >= 5;
  const showBig = count >= 10;

    let descriptionText =
    description ||
    allOptions[allOptions.length - 1] ||
    "No description available";
  
  return (
    <article
      className="card bg-base-100 border border-base-300"
      aria-label={` ${count} ${title} `}
      role="region"
    >
      <div className="py-6 pl-3">
        <div className="flex justify-between items-center">
          <div className="relative w-28  h-28" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fbedda"
              viewBox="0 0 96 96"
              strokeWidth={1.5}
              stroke="none"
              className="h-full absolute z-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={ICONS.flameSmall}
              />
            </svg>
            {showMiddle && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#efc11a"
                viewBox="0 0 96 96"
                strokeWidth={1.5}
                stroke="none"
                className="h-full absolute z-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.flameMiddle}
                />
              </svg>
            )}
            {showBig && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#e88744"
                viewBox="0 0 96 96"
                strokeWidth={1.5}
                stroke="none"
                className="h-full absolute "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.flameBig}
                />
              </svg>
            )}
          </div>
          <div className="text350 mr-4 ml-4" role="text">
            <span aria-hidden="true">{count}</span>
            <span className="sr-only">{sr}</span>
          </div>
          <div className="w-1/2">
            <h3 className="Textbold w-5/6 text124 text">{title}</h3>
            <p className="text96 w-5/6">{descriptionText}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MedalModal;
