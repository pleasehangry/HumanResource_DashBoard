import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchAttandanceChart } from "../../actions/employeeActions";
import { Dropdown } from "../../components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [attendanceChart, setAttendanceData] = useState([]);
  const today = new Date().toISOString().substr(0, 10);
  console.log(attendanceChart);
  useEffect(() => {
    const month = today.split("-")[1];
    const year = today.split("-")[0];
    fetchAttandanceChart(month, year)
      .then((data) => setAttendanceData(data))
      .catch((error) => {
        console.log(error);
        setAttendanceData([]);
      });
  }, []);

  const options1 = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sơ đồ số ngày điểm danh của các nhân viên trong tháng ".concat(
          today.split("-")[1]
        ),
      },
    },
  };
  const options2 = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sơ đồ số giờ điểm danh của các nhân viên trong tháng ".concat(
          today.split("-")[1]
        ),
      },
    },
  };

  const data1 = {
    labels: attendanceChart.map((att) => att.first_name),
    datasets: [
      {
        label: "Số ngày",
        data: attendanceChart.map((att) => att.total_days),
        borderColor: "rgb(187, 247 ,208)",
        backgroundColor: "rgb(187, 247, 208, 0.7)",
      },
    ],
  };
  const data2 = {
    labels: attendanceChart.map((att) => att.first_name),
    datasets: [
      {
        label: "Số giờ",
        data: attendanceChart.map((att) => att.total_hours),
        borderColor: "rgb(255, 247 ,208)",
        backgroundColor: "rgb(255, 247, 208, 0.7)",
      },
    ],
  };
  return (
    <div className="flex-col items-center justify-center p-12">
      <div className="flex items-center justify-center">
        <Bar options={options1} data={data1} />
      </div>
      <div className="mt-4">
        <Bar options={options2} data={data2} />
      </div>
    </div>
  );
};

export default Chart;
