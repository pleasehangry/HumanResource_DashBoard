import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
const LineChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const chartLabels = Object.keys(data);
      const chartValues = Object.values(data);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "",
            data: chartValues,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
          ref={chartRef}
        />
      )}
    </div>
  );
};

export default LineChart;
