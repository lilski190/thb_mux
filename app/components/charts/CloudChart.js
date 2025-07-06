"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ICONS } from "@/lib/globals";

const Cloudchart = ({ data, labels, colors }) => {
  const chartRef = useRef();
  const max = Math.max(...data);

  const maxSize = 150;
  const minSize = 2;

  const getSize = (value) => {
    if (max === 0) return minSize;
    return (value / max) * (maxSize - minSize) + minSize;
  };

  const downloadPDF = async () => {
    const element = chartRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("cloudchart.pdf");
  };

  // Tailwind-compatible spacing classes
  const marginRightClasses = ["-mr-10 z-10", "-ml-10 z-20", "-ml-20 z-10"];

  return (
    <div className="p-4">
      <div ref={chartRef}>
        <div className="flex items-end justify-center w-full h-full bg-secondary">
          {data.map((value, i) => {
            const size = getSize(value);
            const mrClass = marginRightClasses[i] || ""; // fallback if i > 2

            return (
              <div
                key={i}
                className={`flex flex-col items-center  justify-end h-38  ${mrClass}`}
              >
                <div className="relative">
                  <div className={`flex items-center  h-24`}>
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 96 96"
                        className=""
                        style={{
                          width: `${size}px`,
                        }}
                      >
                        <path d={ICONS.cloud} />
                      </svg>
                    </div>
                  </div>
                  <div
                    className=" bg-primary"
                    style={{ color: colors[i], width: `${size}px` }}
                  >
                    {value.toFixed(1)}
                  </div>
                </div>

                <div className="text-xs mt-1 text-gray-500">{labels[i]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cloudchart;
