import React from "react";
import { ICONS } from "@/lib/globals";

const IconScaleChart = ({ data, labels, dict }) => {
  const max = Math.max(...data);
  const maxSize = 120;
  const minSize = 20;

  const sortedItems = data
    .map((value, index) => ({ value, label: labels[index] }))
    .sort((a, b) => b.value - a.value);

  const getSize = (value) => {
    if (max === 0) return minSize;
    const scaled = (value / max) * (maxSize - minSize) + minSize;
    return scaled;
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between w-full">
        {sortedItems.map((item, i) => {
          const size = getSize(item.value);
          const isFirst = i === 0;
          const isStrokeIcon = item.label === "walk" || item.label === "bike";

          return (
            <div
              key={i}
              className={`${
                isFirst ? "w-18 Textbold" : "w-13"
              } flex flex-col items-center justify-between m-3 w-15 `}
            >
              <span
                className={`${isFirst ? "Textbold" : ""} text text75 -mt-6`}
              >
                {item.value.toFixed(0)}
              </span>
              <div
                className="flex items-end justify-between"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <div className="text-base-content">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isStrokeIcon ? "none" : "currentColor"}
                    stroke={isStrokeIcon ? "currentColor" : "none"}
                    strokeWidth={isStrokeIcon ? 2 : 0}
                    viewBox="0 0 96 96"
                    style={{
                      width: `${size}px`,
                      color: "#5c4033",
                    }}
                  >
                    <path d={ICONS[item.label]} />
                  </svg>
                </div>
              </div>
              <span
                className={`${isFirst ? "Textbold" : ""} text text75 -mt-3`}
              >
                {dict.labels[item.label]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconScaleChart;
