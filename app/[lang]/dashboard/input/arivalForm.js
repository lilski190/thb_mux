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
    <form action={pushArivalData} className="space-y-6 p-4">
      <div className="flex justify-around gap-4">
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
                className="h-24"
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
                className="h-24"
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
                className="h-24"
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
                className="h-24"
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
            <div
              onClick={() => handleClick(item.value)}
              className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition ${
                transportation === item.value
                  ? "bg-accent text-accent-content"
                  : "bg-base-200 text-base-content"
              }`}
            >
              {item.icon}
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <label className="mb-2 text100 text">{dict.distance}</label>
        <div className="text300 text">{distance}</div>
        <input
          type="range"
          name="distance"
          min="1"
          max="150"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full range"
        />
      </div>

      <div className="underline text100 text">{dict.usual}</div>

      <button type="submit" className="btn btn-primary ">
        <div className="text75 Textbold">{dict.save}</div>
      </button>
    </form>
  );
}
