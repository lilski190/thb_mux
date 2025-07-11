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
    const rootStyles = getComputedStyle(document.documentElement);
    const mainEl = document.querySelector(".main");
    const mainStyles = mainEl ? getComputedStyle(mainEl) : null;

    const fontSize = 10;
    const fontColor =
      mainStyles?.getPropertyValue("--color-base-content").trim() || "#000";

    setFontSettings({
      size: fontSize,
      color: fontColor,
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

  return <Bar data={formattedData} options={options} />;
}
