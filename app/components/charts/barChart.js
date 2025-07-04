"use client";

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
  const translatedLabels = labels.map((label) => dict.labels[label] || label);

  const formattedData = {
    labels: translatedLabels,
    datasets: ChartData.map((dataset) => ({
      ...dataset,
      borderRadius: 3, // Rundung hier setzen
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Grid-Linien auf der x-Achse ausblenden
        },
      },
      y: {
        grid: {
          display: false, // Grid-Linien auf der y-Achse ausblenden
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={formattedData} options={options} />;
}
