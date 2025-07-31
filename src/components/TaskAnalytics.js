import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TaskAnalytics({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const priorities = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📈 Task Analytics</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <Doughnut
          data={{
            labels: ["Completed", "Pending"],
            datasets: [
              {
                data: [completed, pending],
                backgroundColor: ["#2ecc71", "#e74c3c"],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />

        <Bar
          data={{
            labels: ["High", "Medium", "Low"],
            datasets: [
              {
                label: "Tasks by Priority",
                data: [
                  priorities.high,
                  priorities.medium,
                  priorities.low,
                ],
                backgroundColor: ["#e74c3c", "#f1c40f", "#2ecc71"],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
}

export default TaskAnalytics;
