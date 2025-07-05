import React from "react";

const IconScaleChart = ({ data, labels, dict }) => {
  const max = Math.max(...data);
  const maxSize = 200;
  const minSize = 10;

  // Kombiniere Werte und Labels und sortiere nach Wert (absteigend)
  const sortedItems = data
    .map((value, index) => ({ value, label: labels[index] }))
    .sort((a, b) => b.value - a.value); // Sortiere absteigend

  const getSize = (value) => {
    if (max === 0) return minSize; // Sicherheit bei Division durch 0
    const scaled = (value / max) * (maxSize - minSize) + minSize;
    return scaled;
  };

  return (
    <div className="mt-2">
      <div className="flex justify-center  w-screen grow ">
        {sortedItems.map((item, i) => {
          const size = getSize(item.value);
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-between m-3"
            >
              <span className="font-semibold -mt-6">
                {item.value.toFixed(0)}
              </span>
              <div
                className="flex items-center justify-center"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <div className="bg-primary/20 w-full h-full rounded-full">
                  ICON
                </div>
              </div>

              <span className="text-xs mt-1 text-gray-500">
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
