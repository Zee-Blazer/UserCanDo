import React from "react";
import OverviewOrderStats from "@/components/dashboard/overview/overviewOrderStats";
import OverviewOrderAnalytics from "../overviewOrderAnalytics";
import OverviewOrderTableSection from "../overviewOrderTablle";

const OverviewOrdersView = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <OverviewOrderStats />
      <OverviewOrderAnalytics />
      <OverviewOrderTableSection />
    </div>
  );
};

export default OverviewOrdersView;
