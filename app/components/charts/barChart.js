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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ ChartData, dict, labels }) {
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

  return (
    <div className="pt-2 pr-3">
      <Bar data={formattedData} options={options} />
    </div>
  );
}
