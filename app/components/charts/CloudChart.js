"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ICONS } from "@/lib/globals";

const Cloudchart = ({ data, labels, colors }) => {
  const chartRef = useRef();
  const max = Math.max(...data);

  const maxSize = 180;
  const minSize = 50;

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

  // negative margin to create overlap

  return (
    <div className="pr-3 grid grid-cols-3 w-64 relative">
      {data.map((value, i) => {
        const size = getSize(value);

        return (
          <div
            key={i}
            className={" w-40 flex items-center justify-center h-28 text"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 96 96"
              style={{
                width: `${size}px`,
              }}
              className=""
            >
              <path d={ICONS.cloud} />
            </svg>
          </div>
        );
      })}
      {data.map((value, i) => {
        const size = getSize(value);

        return (
          <div
            key={value + i}
            className={`${
              i === 2 ? "pr-0 " : "pr-2"
            } z-20 -mt-16 h-6 flex items-end justify-center Textbold `}
            style={{
              width: `${size}px`,
              color: colors[i],
              textAlign: "center",
            }}
          >
            <div className={`${i === 1 ? "mr-3 " : ""} `}>
              {value.toFixed(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cloudchart;
