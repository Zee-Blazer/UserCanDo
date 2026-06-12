import React, { useEffect } from "react";
import StatsDataItem from "./StatsDataItem";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";


const OverviewSalesStats = () => {

  const salesOverview = useSelector(
    (state: RootState) => state.dashboard.salesOverview
  );

  return (
    <div className="py-7 px-11 mt-2 rounded-md bg-white border border-1 border-[#D5D8DC] flex justify-between lg:gap-x-8">
      <StatsDataItem title="Total Number of Sales" numbers={ salesOverview.total_sales || 0 } />
      <StatsDataItem title="Total Value Of Sales (GHS)" numbers={ salesOverview.total_value || 0 } />
      <StatsDataItem title="Avg. Sales Value (GHS)" numbers={ salesOverview.average_value || 0 } />
    </div>
  );
};

export default OverviewSalesStats;
