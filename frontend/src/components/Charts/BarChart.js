import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./BarChart.css";

Chart.defaults.plugins.legend.display = false;

export default function BarChart({ chartData, horizontal, title, subtitle }) {
  const indexAxis = horizontal ? "y" : "x";

  return (
    <div className="barChart__container">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <Bar
        data={chartData}
        options={{
          indexAxis: indexAxis,
          elements: { bar: { borderWidth: 2 } },
        }}
      />
    </div>
  );
}
