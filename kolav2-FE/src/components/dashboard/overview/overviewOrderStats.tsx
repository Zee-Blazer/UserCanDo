"use client";
import React, { useEffect } from "react";
import StatsDataItem from "./StatsDataItem";
import ProgressBar from "@/components/General/progressBar";
import { Typography } from "@material-tailwind/react";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { formatAmount, formatNumber } from "@/utils/helpers";

const OverviewOrderStats = () => {
  const orderOperation = useSelector(
    (state: RootState) => state.dashboard.orderOperation
  );

  const percentage = 44;

  return (
    <div className="py-7 px-11 mt-2 rounded-md bg-white border border-1 border-[#D5D8DC] flex justify-between lg:gap-x-8">
      <StatsDataItem
        title="Total Orders Received"
        numbers={`"${orderOperation.total_orders || 0} M"`}
      />
      <StatsDataItem
        title="Total Value of Orders "
        numbers={`${formatNumber(
          Number(orderOperation.total_order_value || 0)
        )} M`}
      >
        <div className="flex gap-x-2 items-center">
          <ProgressBar percentage={percentage} height="1.5" />
          <Typography className="text-xs text-[#6F6F6F]">
            ({percentage}%)
          </Typography>
        </div>
      </StatsDataItem>
      <StatsDataItem
        title="Average Order Value"
        numbers={`${formatNumber(
          Number(orderOperation.average_order_value || 0)
        )}`}
      />
    </div>
  );
};

export default OverviewOrderStats;
