import React, { useState, useMemo } from "react";
import TableToggleView from "./views/tableToggleView";
import { Typography } from "@material-tailwind/react";
import TopOrdersTable from "./topOrdersTable";
import { useDashboardSelector } from "@/Redux/selectors";
import { formatDate } from "@/utils/helpers";

const OverviewOrderTableSection = () => {
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const selector = useDashboardSelector();
  const list = ["Top Orders received", "Top converted to sales"];

  const allOrders = useMemo(() => {
    return [
      ...(selector?.pendingOrders ?? []),
      ...(selector?.approvedOrders ?? []),
      ...(selector?.outForDeliveryOrders ?? []),
      ...(selector?.deliveredOrders ?? []),
      ...(selector?.cancelledOrders ?? []),
    ];
  }, [selector]);

  const topOrdersReceived = useMemo(() => {
    return allOrders
      .slice()
      .sort(
        (a: any, b: any) =>
          (b?.total_sale_amount ?? 0) - (a?.total_sale_amount ?? 0)
      )
      .slice(0, 10);
  }, [allOrders]);

  const topOrdersConverted = useMemo(() => {
    return allOrders
      .filter((order: any) => order?.status?.toLowerCase() !== "owing")
      .slice()
      .sort(
        (a: any, b: any) =>
          (b?.total_sale_amount ?? 0) - (a?.total_sale_amount ?? 0)
      )
      .slice(0, 10);
  }, [allOrders]);

  const transformData = (orders: any[]) => {
    return orders.map((order: any) => ({
      date: order?.created_at ? formatDate(order.created_at) : "N/A",
      customer: order?.customer_name ?? "N/A",
      agent: order?.sales_agent_name ?? "N/A",
      total_due: order?.total_sale_amount ?? 0,
      order_status: order?.status_history?.[0]?.status ?? "pending",
      status: order?.status?.toLowerCase() === "owing" ? "Owing" : "Paid",
    }));
  };

  const currentData =
    selectedTableIndex === 0
      ? transformData(topOrdersReceived)
      : transformData(topOrdersConverted);

  return (
    <div className="bg-white p-4 border rounded-md border-gray_2">
      <TableToggleView
        activeState={selectedTableIndex}
        setActiveState={setSelectedTableIndex}
        toggleList={list}
      />
      <Typography className="font-semibold my-4">
        {list[selectedTableIndex]}{" "}
        <span className="text-[#6941C6] rounded-full font-normal text-sm bg-[#F8FAFB] p-1">
          All time
        </span>
      </Typography>
      <TopOrdersTable data={currentData} />
    </div>
  );
};

export default OverviewOrderTableSection;
