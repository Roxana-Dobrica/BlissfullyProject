import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./FeelingsChart.css";

Chart.register(...registerables);

const FeelingsChart = ({ patientId }) => {
  const [feelingsData, setFeelingsData] = useState({
    joy: 0,
    sadness: 0,
    love: 0,
    fear: 0,
    anger: 0,
    surprise: 0,
  });

  useEffect(() => {
    const fetchFeelingsData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_REACT_APP_API_ENDPOINT
          }/JournalEntries/patient/${patientId}/feelings`
        );
        if (response.ok) {
          const data = await response.json();
          setFeelingsData(data.feelingsCount);
        } else {
          console.error("Failed to fetch feelings data");
        }
      } catch (error) {
        console.error("Error fetching feelings data:", error);
      }
    };

    fetchFeelingsData();
  }, [patientId]);

  const data = {
    labels: ["Joy", "Sadness", "Love", "Fear", "Anger", "Surprise"],
    datasets: [
      {
        label: "Feelings",
        data: [
          feelingsData.joy,
          feelingsData.sadness,
          feelingsData.love,
          feelingsData.fear,
          feelingsData.anger,
          feelingsData.surprise,
        ],
        backgroundColor: [
          "#1f4e79", // Joy
          "#347ea1", // Sadness
          "#6cb5c6", // Love
          "#7eaad4", // Fear
          "#4a85c0", // Anger
          "#a9dbe6", // Surprise
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-feelings-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default FeelingsChart;
