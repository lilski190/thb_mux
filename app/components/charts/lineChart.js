"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

export default function LineChart({ ChartData, dict, labels, color }) {
  const [fontSettings, setFontSettings] = useState({
    size: 10,
    color: "#000",
    bar: "#94C09E",
  });

  useEffect(() => {
    const mainEl = document.querySelector(".main");
    const mainStyles = mainEl ? getComputedStyle(mainEl) : null;
    const fontSize = 10;
    const fontColor =
      mainStyles?.getPropertyValue("--color-base-content").trim() || "#000";
    const chartColor =
      mainStyles?.getPropertyValue("--color-accent").trim() || "#94C09E";

    setFontSettings({
      size: fontSize,
      color: fontColor,
      bar: chartColor,
    });
  }, []);

  const translatedLabels = labels.map((label) => dict.labels[label] || label);

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
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: {
          color: fontSettings.color, // <-- Achsenlinie (x-Achse)
        },
        ticks: {
          color: fontSettings.color,
          font: { size: fontSettings.size },
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
          font: { size: fontSettings.size },
        },
      },
    },
  };

  return (
    <div className="mt-2 mr-3">
      <Line data={formattedData} options={options} />
    </div>
  );
}
