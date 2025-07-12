"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ICONS } from "@/lib/globals";

const Cloudchart = ({ data, labels, colors }) => {
  const chartRef = useRef();
  const max = Math.max(...data);

  const maxSize = 180;
  const minSize = 60;

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
  const marginClasses = ["-ml-0 z-10", "-ml-10 z-20", "-ml-10 z-30"];

  return (
    <div className="pr-3 grid grid-cols-3 w-64">
      {data.map((value, i) => {
        const size = getSize(value);
        const marginClass = marginClasses[i] || "";

        return (
          <div
            key={i}
            className={
              "bg-primary/30 w-40 flex items-center justify-center h-40"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 96 96"
              style={{
                width: `${size}px`,
                color: "#5c4033", // oder deine Wunschfarbe
              }}
              className=""
            >
              <path d={ICONS.cloud} />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default Cloudchart;
