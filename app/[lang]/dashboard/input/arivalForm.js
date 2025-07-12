"use client";

import { pushArivalData } from "@/app/actions/formAction";
import { useState } from "react";
import { ICONS } from "@/lib/globals";

export default function ArrivalForm({ dict }) {
  const [transportation, setTransportation] = useState(null);
  const [distance, setDistance] = useState(5); // Standardwert

  const handleClick = (value) => {
    setTransportation(value);
  };

  return (
    <form action={pushArivalData} className="">
      <div className="flex justify-evenly gap-2">
        {[
          {
            value: "walk",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="currentColor"
                className="h-18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.walk}
                />
              </svg>
            ),
            label: dict.options[0],
          },
          {
            value: "bike",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="currentColor"
                className="h-18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.bike}
                />
              </svg>
            ),
            label: dict.options[1],
          },
          {
            value: "train",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="h-18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.train}
                />
              </svg>
            ),
            label: dict.options[2],
          },
          {
            value: "car",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 96 96"
                strokeWidth={3}
                stroke="none"
                className="h-18"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={ICONS.car}
                />
              </svg>
            ),
            label: dict.options[3],
          },
        ].map((item) => (
          <label key={item.value} className="flex flex-col items-center">
            <input
              type="radio"
              name="transportation"
              value={item.value}
              checked={transportation === item.value}
              onChange={() => handleClick(item.value)}
              className="hidden"
            />
            <button
              onClick={() => handleClick(item.value)}
              className={`w-15 h-15 flex items-center justify-center rounded-full cursor-pointer transition  ${
                transportation === item.value
                  ? "bg-accent text-accent-content hoverButtonRoundActive"
                  : "bg-base-200 text-base-content hoverButtonRound"
              }`}
            >
              {item.icon}
            </button>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <div className="text100 text text-center w-full">{dict.distance}</div>
        <div className="text300 text text-center mb-1">{distance}</div>
        <input
          type="range"
          name="distance"
          min="0"
          max="150"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full range range-xs"
        />
      </div>

      <div className=" text100 text text-center mt-6 ">
        <button className="underline hover:text-accent hover:underline hover:font-semibold cursor-pointer active:text-secondary">
          {dict.usual}
        </button>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="btn btn-primary buttonStyle mt-4 text75 text-primary-content Textbold hoverButtonPrim"
        >
          <div className="">{dict.save}</div>
        </button>
      </div>
    </form>
  );
}
