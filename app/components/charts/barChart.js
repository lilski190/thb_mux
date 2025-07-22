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

/**
 * BarChart-Komponente zur Anzeige eines Balkendiagramms mit Chart.js und React.
 *
 * @param {Object} props - Komponenten-Props
 * @param {Array<Object>} props.ChartData - Array von Datensätzen für das Diagramm, jeweils mit Feldern wie `label`, `data`, `backgroundColor` etc.
 * @param {Object} props.dict - Wörterbuch-Objekt zur Übersetzung von Labels und für BarChart-Beschriftungen (z.B. `labels`, `altText`, `title`, `colLabel`, `colValue`)
 * @param {Array<string>} props.labels - Array von Label-Schlüsseln, die in `dict.labels` übersetzt werden
 * @param {string} [props.ariaDescribedBy] - Optionaler Wert für `aria-describedby` Attribut am Canvas für Screenreader
 * @param {boolean} [props.rtl=false] - Falls true, wird die X-Achse im Diagramm umgekehrt (für Rechts-nach-Links-Sprachen)
 *
 * @returns {JSX.Element} JSX-Element mit dem gerenderten Balkendiagramm und einer unsichtbaren Tabelle für Screenreader
 */
export default function BarChart({
  ChartData,
  dict,
  labels,
  ariaDescribedBy,
  rtl,
}) {
  const [fontSettings, setFontSettings] = useState({
    size: 15,
    family: `"Athiti", sans-serif`,
    weight: "400",
    color: "#000",
  });

  useEffect(() => {
    const rootEl = document.body;
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
      family: `"Athiti", sans-serif`,
      weight: "400",
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
            family: fontSettings.family,
            weight: fontSettings.weight,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        reverse: rtl,
        grid: {
          display: false,
        },
        border: {
          color: fontSettings.color,
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
        grid: {
          display: false,
        },
        beginAtZero: true,
        border: {
          color: fontSettings.color,
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
    const canvas = chartRef.current?.canvas;
    if (canvas instanceof HTMLCanvasElement) {
      canvas.setAttribute("role", "img");
      canvas.setAttribute(
        dict.altText || dict.title || "Balkendiagramm",
        "aria-label"
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
