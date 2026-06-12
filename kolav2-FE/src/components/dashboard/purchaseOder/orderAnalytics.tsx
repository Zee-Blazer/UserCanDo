"use client";

import React from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import type { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarChartData {
  categories: string[];
  series: { name: string; data: number[] }[];
}

interface ConversionData {
  series: number[];
}

interface AnalyticsData {
  totalOrdersValue: string;
  barChart: BarChartData;
  conversion: ConversionData;
}

interface OrdersAnalyticsProps {
  analyticsData: AnalyticsData;
  interval: string;
  onIntervalChange: (interval: string) => void;
}

const OrdersAnalytics: React.FC<OrdersAnalyticsProps> = ({
  analyticsData,
  interval,
  onIntervalChange,
}) => {
  const { totalOrdersValue, barChart, conversion } = analyticsData;

  const barChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: barChart.categories,
      labels: {
        style: {
          colors: "#E9EEF2",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: false,
      },
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
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " orders";
        },
      },
    },
    legend: {
      show: false,
    },
    colors: ["#2B4A8E", "#E9EEF2"],
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
  };

  const radialChartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "60%",
          background: "#fff",
        },
        track: {
          background: "#E9EEF2",
          strokeWidth: "90%",
        },
        dataLabels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            formatter: function (val: number) {
              return val.toFixed(1) + "%";
            },
            color: "#111",
            fontSize: "36px",
            fontWeight: "bold",
            show: true,
          },
        },
      },
    },
    fill: {
      colors: ["#2B4A8E"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Conversion"],
  };

  return (
    <div className="mb-6">
      <Typography variant="h5" color="blue-gray" className="mb-4">
        Orders Analytics
      </Typography>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardBody>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="">
                <Typography variant="h6" color="blue-gray">
                  Total Orders Value: {totalOrdersValue}
                </Typography>
              </div>
              <div className="w-full sm:w-[20%] sm:mr-12 ">
                <Select
                  label="Interval"
                  value={interval}
                  onChange={(val) => onIntervalChange(val || "monthly")}
                >
                  <Option value="daily">Daily</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="monthly">Monthly</Option>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              {barChart.categories.length > 0 ? (
                <Chart
                  options={barChartOptions}
                  series={barChart.series}
                  type="bar"
                  height={350}
                />
              ) : (
                <div className="flex items-center justify-center h-[350px] text-gray-500">
                  No data available for the selected period
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#2B4A8E]"></span>
                <Typography color="gray" className="font-normal">
                  Total Order Received
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#E9EEF2]"></span>
                <Typography color="gray" className="font-normal">
                  Total Order Converted To Sale
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="col-span-1">
          <CardBody className="flex flex-col items-center justify-between">
            <Typography variant="h6" color="blue-gray" className="self-start">
              Order To Sales Conversion
            </Typography>
            <div className="flex-grow flex items-center justify-center">
              <Chart
                options={radialChartOptions}
                series={conversion.series}
                type="radialBar"
                height={300}
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#2B4A8E]"></span>
                <Typography color="gray" className="font-normal">
                  Order Received
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#E9EEF2]"></span>
                <Typography color="gray" className="font-normal">
                  Order Converted To Sale
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrdersAnalytics;
