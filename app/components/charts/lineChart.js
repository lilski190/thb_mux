"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({
  ChartData,
  dict,
  labels,
  color,
  ariaDescribedBy,
  rtl,
}) {
  const [fontSettings, setFontSettings] = useState({
    size: 15,
    color: "#000",
    bar: "#94C09E",
    family: `"Athiti", sans-serif`,
    weight: "400",
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
      size: 15,
      color: fontColor,
      bar: chartColor,
      family: `"Athiti", sans-serif`,
      weight: "400",
    });
  }, []);

  const translatedLabels = labels.map((label) => dict.labels[label] || label);

  const data = {
    labels: translatedLabels,
    datasets: ChartData.map((ds) => ({ ...ds, borderRadius: 3 })),
  };

  const formattedData = {
    labels: translatedLabels,
    datasets: ChartData.map((dataset) => ({
      ...dataset,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: false,
      backgroundColor: fontSettings.bar,
      borderColor: fontSettings.bar,
    })),
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
            family: fontSettings.family,
            weight: fontSettings.weight,
          },
        },
      },
    },
    scales: {
      x: {
        reverse: rtl,
        grid: { display: false },
        border: {
          color: fontSettings.color, // <-- Achsenlinie (x-Achse)
        },
        ticks: {
          color: fontSettings.color,
          font: {
            size: fontSettings.size,
            family: fontSettings.family,
            weight: fontSettings.weight,
          },
        },
      },
      y: {
        grid: { display: false },
        beginAtZero: true,
        border: {
          color: fontSettings.color, // <-- Achsenlinie (y-Achse)
        },
        ticks: {
          color: fontSettings.color,
          font: {
            size: fontSettings.size,
            family: fontSettings.family,
            weight: fontSettings.weight,
          },
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
    <figure className="mt-2 mr-3">
      <Line data={formattedData} options={options} />
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
