"use client";
import React from "react";
import { ICONS } from "@/lib/globals";

const MedalModal = ({ count, title, description }) => {
  const showMiddle = count >= 5;
  const showBig = count >= 10;

  return (
    <div className="">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="relative w-28  h-28">
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
            <div className="text350">{count}</div>
            <div className="w-1/2">
              <div className="Textbold text100 text ">{title}</div>
              <div className="text">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedalModal;
