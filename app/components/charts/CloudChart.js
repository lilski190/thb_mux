"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ICONS } from "@/lib/globals";

const Cloudchart = ({ data, labels, colors, ariaDescribedBy, dict }) => {
  const chartRef = useRef();
  const max = Math.max(...data);

  const maxSize = 180;
  const minSize = 50;

  const items = data
    .map((value, i) => ({ value, label: labels[i] }))
    .sort((a, b) => b.value - a.value);

  const getSize = (value) => {
    if (max === 0) return minSize;
    return (value / max) * (maxSize - minSize) + minSize;
  };

  const srTable = (
    <table
      className="sr-only"
      aria-label={dict.altTableLabel || "Statistikwerte"}
    >
      <thead>
        <tr>
          <th scope="col">{dict.colLabel || "Kategorie"}</th>
          <th scope="col">{dict.colValue || "Wert"}</th>
        </tr>
      </thead>
      <tbody>
        {items.map(({ label, value }) => (
          <tr key={label}>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

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
            aria-hidden="true"
          >
            <svg
              aria-hidden="true"
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
          <figure
            role="img"
            aria-label={dict.altText || dict.title || "Symbol‑Skalendiagramm"}
            aria-describedby={ariaDescribedBy}
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
            <span className="sr-only">{labels}: </span>
            <span className={`${i === 1 ? "mr-3 " : ""} `}>
              {value.toFixed(1)}
            </span>
          </figure>
        );
      })}
      {srTable}
    </div>
  );
};

export default Cloudchart;
