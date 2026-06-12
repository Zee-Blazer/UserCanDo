import React, { useEffect, useState } from "react";
import OrdersAnalytics from "../purchaseOder/orderAnalytics";
import StatCard from "@/components/General/StatCard";
import { ShoppingCart, Wallet, Landmark, Percent } from "lucide-react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { formatNumber } from "@/utils/helpers";

const OrdersOverview = () => {
  const { orderOperation } = useDashboardSelector();
  const { loadOrderOperation } = useDash();
  const [interval, setInterval] = useState("monthly");

  const formatToTwoDecimals = (value: string | number): string => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  const getTimeframeText = (interval: string) => {
    switch (interval) {
      case "daily":
        return "Last 30 days";
      case "weekly":
        return "Last 12 weeks";
      case "monthly":
        return "Last 12 months";
      default:
        return "Last 30 days";
    }
  };
  useEffect(() => {
    loadOrderOperation(interval);
  }, [loadOrderOperation, interval]);

  const transformDataForChart = () => {
    if (
      !orderOperation?.monthly_data ||
      orderOperation.monthly_data.length === 0
    ) {
      return {
        categories: [],
        series: [
          { name: "Total Order Received", data: [] },
          { name: "Total Order Converted To Sale", data: [] },
        ],
      };
    }

    const data = orderOperation.monthly_data;

    let categories: string[] = [];
    let receivedData: number[] = [];
    let convertedData: number[] = [];

    data.forEach((item) => {
      const date = new Date(item.month);

      if (interval === "monthly") {
        categories.push(
          date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        );
      } else if (interval === "weekly") {
        const weekStart = new Date(date);
        const weekEnd = new Date(date);
        weekEnd.setDate(weekStart.getDate() + 6);
        categories.push(
          `${weekStart.getDate()}/${
            weekStart.getMonth() + 1
          } - ${weekEnd.getDate()}/${weekEnd.getMonth() + 1}`
        );
      } else {
        categories.push(
          date.toLocaleDateString("en-US", { day: "numeric", month: "short" })
        );
      }

      receivedData.push(item.received);
      convertedData.push(item.converted);
    });

    return {
      categories,
      series: [
        { name: "Total Order Received", data: receivedData },
        { name: "Total Order Converted To Sale", data: convertedData },
      ],
    };
  };

  const chartData = transformDataForChart();

  const analyticsData = {
    totalOrdersValue: `GHS ${formatNumber(
      Number(orderOperation?.total_order_value || 0)
    )}`,
    barChart: chartData,
    conversion: {
      percentage: parseFloat(
        formatToTwoDecimals(orderOperation?.conversion_rate || 0)
      ),
      series: [
        parseFloat(formatToTwoDecimals(orderOperation?.conversion_rate || 0)),
      ],
    },
  };

  const currentTimeframe = getTimeframeText(interval);

  const statsData = [
    {
      title: "Number Of Orders",
      value: orderOperation?.total_orders?.toString() || "0",
      change: "0.5%",
      timeframe: currentTimeframe,
      Icon: ShoppingCart,
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Order Value",
      value: `GHS ${formatNumber(
        Number(orderOperation?.total_order_value || 0)
      )}`,
      change: "0.5%",
      timeframe: currentTimeframe,
      Icon: Landmark,
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Average Order Value",
      value: `GHS ${formatNumber(
        Number(orderOperation?.average_order_value || 0)
      )}`,
      change: "0.5%",
      timeframe: currentTimeframe,
      Icon: Wallet,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Order to sales conversion",
      value: `${formatToTwoDecimals(orderOperation?.conversion_rate || 0)}%`,
      change: "0.5%",
      timeframe: currentTimeframe,
      Icon: Percent,
      iconBgColor: "bg-blue-50",
      iconColor: "text-pry2",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            timeframe={stat.timeframe}
            Icon={stat.Icon}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>
      <OrdersAnalytics
        analyticsData={analyticsData}
        interval={interval}
        onIntervalChange={setInterval}
      />
    </div>
  );
};

export default OrdersOverview;
