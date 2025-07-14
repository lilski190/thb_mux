"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ ChartData, dict, labels, ariaDescribedBy }) {
  const [fontSettings, setFontSettings] = useState({
    size: 10,
    color: "#000",
  });

  useEffect(() => {
    const rootEl = document.body; // oder document.documentElement
    const classes = rootEl.classList;
    let colorModeClass = null;

    if (classes.contains("main")) colorModeClass = "main";
    else if (classes.contains("dark")) colorModeClass = "dark";
    else if (classes.contains("contrast")) colorModeClass = "contrast";

    const rootStyles = getComputedStyle(rootEl);
    const fontColor =
      rootStyles.getPropertyValue("--color-base-content").trim() || "#000";
    const chartColor =
      rootStyles.getPropertyValue("--color-accent").trim() || "#94C09E";

    setFontSettings({
      size: 10,
      color: fontColor,
      bar: chartColor,
    });
  }, []);

  const translatedLabels = labels.map((label) => dict.labels[label] || label);

  const formattedData = {
    labels: translatedLabels,
    datasets: ChartData.map((dataset) => ({
      ...dataset,
      borderRadius: 3,
    })),
  };

  const data = {
    labels: translatedLabels,
    datasets: ChartData.map((ds) => ({ ...ds, borderRadius: 3 })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: fontSettings.color,
          font: {
            size: fontSettings.size,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          color: fontSettings.color,
        },
        ticks: {
          color: fontSettings.color,
          font: { size: fontSettings.size },
        },
      },
      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        border: {
          color: fontSettings.color,
        },
        ticks: {
          color: fontSettings.color,
          font: { size: fontSettings.size },
        },
      },
    },
  };

  const chartRef = useRef(null);
  useEffect(() => {
    const canvas = chartRef.current?.canvas; // <canvas> DOM‑Element
    if (canvas instanceof HTMLCanvasElement) {
      canvas.setAttribute("role", "img");
      canvas.setAttribute(
        "aria-label",
        dict.altText || dict.title || "Liniendiagramm"
      );
      if (ariaDescribedBy)
        canvas.setAttribute("aria-describedby", ariaDescribedBy);
    }
  }, [dict, ariaDescribedBy]);

  return (
    <figure className="pt-2 pr-3">
      <Bar data={formattedData} options={options} />
      <table className="sr-only">
        <thead>
          <tr>
            <th scope="col">{dict.colLabel || "Kategorie"}</th>
            <th scope="col">{dict.colValue || "Wert"}</th>
          </tr>
        </thead>
        <tbody>
          {translatedLabels.map((lbl, i) => (
            <tr key={lbl}>
              <td>{lbl}</td>
              <td>{ChartData[0].data[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
