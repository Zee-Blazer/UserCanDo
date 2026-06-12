import React from "react";
import dynamic from "next/dynamic";
import { Typography } from "@material-tailwind/react";
import { MenuWithCheckbox } from "./menuWithCheckbox";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
  type: "bar" as const,
  height: 350,
  series: [
    {
      name: "Sales",
      data: [500, 0, 0, 0, 0, 0, 0],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end" as "end",
        columnWidth: "20%",
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      max: 500,
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function SalesGraph() {
  return (
    <div className="w-full md:w-[550px]">
      <div className="flex justify-between items-center">
        <Typography className="text-lg font-semibold">Sales </Typography>
        <MenuWithCheckbox />
      </div>
      <Chart
        type={chartConfig.type}
        height={chartConfig.height}
        series={chartConfig.series}
        options={chartConfig.options}
      />
    </div>
  );
}
