import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Typography } from "@material-tailwind/react";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface AnalyticsChartProps {
  title: string;
  subtitle: string;
  initialStartDate: string;
  initialEndDate: string;
  seriesData: {
    series1: number[];
    series2: number[];
  };
  seriesNames: {
    series1: string;
    series2: string;
  };
}

const AnalyticsChart = ({
  title,
  subtitle,
  initialStartDate,
  initialEndDate,
  seriesData,
  seriesNames,
}: AnalyticsChartProps) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [chartData, setChartData] = useState({
    categories: [] as string[],
    series1: [] as number[],
    series2: [] as number[],
  });

  useEffect(() => {
    const categories: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Loop to generate categories between startDate and endDate
    while (start <= end) {
      categories.push(start.toLocaleString("default", { month: "short" }));
      start.setMonth(start.getMonth() + 1);
    }

    // Find the index to slice the data correctly
    const startIndex = 0;
    const endIndex = startIndex + categories.length;

    setChartData({
      categories,
      series1: seriesData.series1.slice(startIndex, endIndex),
      series2: seriesData.series2.slice(startIndex, endIndex),
    });
  }, [startDate, endDate, seriesData]);

  const series = [
    {
      name: seriesNames.series1,
      data: chartData.series1,
    },
    {
      name: seriesNames.series2,
      data: chartData.series2,
    },
  ];

  const maxDataValue = Math.max(...series[0].data, ...series[1].data);

  const margin = maxDataValue * 0.6;
  const yAxisMax = maxDataValue + margin;
  const roundedYAxisMax = Math.ceil(yAxisMax / 100) * 100;

  const options: ApexOptions = {
    chart: {
      type: "bar" as const,

      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: "Poppins, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 0,
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
      position: "back",
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#6F6F6F",
          fontSize: "14px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      max: roundedYAxisMax,
      labels: {
        style: {
          colors: "#6F6F6F",
          fontSize: "14px",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
        },
        formatter: (value: number) => value.toString(),
      },
    },
    colors: ["#F5AA29", "#B692F6"],
    legend: {
      show: true,
      position: "top" as const,
      horizontalAlign: "right" as const,
      fontSize: "14px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      markers: {
        shape: "circle",
        size: 5,
        strokeWidth: 0,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val.toString();
        },
      },
    },
  };

  const formatDateDisplay = (date: string) => {
    const [year, month] = date.split("-");
    const dateObj = new Date(parseInt(year), parseInt(month) - 1);
    return dateObj.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full bg-white border border-[#D5D8DC] rounded-[0.375rem] p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-4">
          <Typography className="text-base font-semibold">{title}</Typography>
          <Typography className="text-sm text-[#6F6F6F]">{subtitle}</Typography>
        </div>
        <div className="relative">
          <button
            className="inline-flex items-center rounded-md border border-[#D5D8DC] px-4 py-2 hover:bg-gray-200 transition-colors"
            aria-label="Open date picker"
          >
            <svg
              className="mr-2 h-4 w-4 text-[#6F6F6F]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <Typography className="text-sm text-[#6F6F6F]">
              {`${formatDateDisplay(startDate)} - ${formatDateDisplay(
                endDate
              )}`}
            </Typography>
          </button>
        </div>
      </div>
      <div className="h-[400px]">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="100%"
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;
