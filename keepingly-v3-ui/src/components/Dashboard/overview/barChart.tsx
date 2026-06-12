// components/BarChart.tsx
"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppContext } from "@/app/context";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type PaymentTask = {
  serial: number;
  date: string;
  payment: string;
  principal: string;
  interest: string;
  remainBal: string;
};

interface BarChartProps {
  paymentTasks: PaymentTask[];
}

export const BarChart = ({ paymentTasks }: BarChartProps) => {
  const { isDarkMode } = useAppContext();

  const data = {
    labels: paymentTasks.map((task) => task.date),
    datasets: [
      {
        label: "Principal",
        data: paymentTasks.map((task) =>
          parseFloat(task.principal.replace(/[^0-9.-]+/g, ""))
        ),
        backgroundColor: "#A61D4A",
        stack: "stack1",
      },
      {
        label: "Interest",
        data: paymentTasks.map((task) =>
          parseFloat(task.interest.replace(/[^0-9.-]+/g, ""))
        ),
        backgroundColor: "#A61D4A53",
        stack: "stack1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: isDarkMode ? "white" : "#111",
        },
      },
    },
    scales: {
      x: {
        stacked: true,  // Enable stacking on x axis
        grid: {
          color: "#A61D4A0A",
        },
        ticks: {
          color: isDarkMode ? "white" : "#111",
        },
      },
      y: {
        stacked: true,  // Enable stacking on y axis
        grid: {
          color: "#A61D4A0A",
        },
        ticks: {
          color: isDarkMode ? "white" : "#111",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
