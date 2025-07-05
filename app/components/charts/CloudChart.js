import React from "react";

const Cloudchart = ({ data, labels, colors }) => {
  const max = Math.max(...data);

  const maxSize = 200;
  const minSize = 10;

  const getSize = (value) => {
    if (max === 0) return minSize; // Sicherheit bei Division durch 0
    const scaled = (value / max) * (maxSize - minSize) + minSize;
    return scaled;
  };

  return (
    <div className="">
      <div className="flex items-end gap-2 justify-center w-screen">
        {data.map((value, i) => {
          const size = getSize(value);
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              >
                <div className="bg-primary/20 w-full h-full">CLOUD ICON </div>
              </div>
              <span
                className={`font-semibold -mt-6 `}
                style={{
                  color: colors[i],
                }}
              >
                {value.toFixed(1)}
              </span>
              <span className="text-xs mt-1 text-gray-500">{labels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cloudchart;
