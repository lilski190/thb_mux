import React from "react";
import { ICONS } from "@/lib/globals";

const IconScaleChart = ({ data, labels, dict }) => {
  const max = Math.max(...data);
  const maxSize = 90;
  const minSize = 40;

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
      <div className="flex justify-between w-full mt-3">
        {sortedItems.map((item, i) => {
          const size = getSize(item.value);
          const isFirst = i === 0;
          const isStrokeIcon = item.label === "walk" || item.label === "bike";

          return (
            <div
              key={i}
              className={`${
                isFirst ? "w-16 Textbold mx-2" : "w-14"
              } flex flex-col items-center justify-between `}
            >
              <span className={`${isFirst ? "Textbold" : ""} text text75`}>
                {item.value.toFixed(0)}
              </span>
              <div
                className="flex items-end justify-end h-full"
                style={{
                  width: `${size}px`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isStrokeIcon ? "none" : "currentColor"}
                  stroke={isStrokeIcon ? "currentColor" : "none"}
                  strokeWidth={isStrokeIcon ? 2 : 0}
                  viewBox="0 0 96 96"
                  style={{
                    width: `${size}px`,
                  }}
                  className=""
                >
                  <path d={ICONS[item.label]} />
                </svg>
              </div>
              <span className={`${isFirst ? "Textbold" : ""} text text75 `}>
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
