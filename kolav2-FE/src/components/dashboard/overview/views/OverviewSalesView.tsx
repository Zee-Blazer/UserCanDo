import React from "react";
import OverviewSalesStats from "@/components/dashboard/overview/overviewSalesStats";
import OverviewSalesAnalytics from "../overviewSalesAnalytics";
import OverviewSalesTableSection from "../overviewSalesTable";
import { UIGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const OverviewSalesView = () => {
  return (
    <UIGuard permission="VIEW_SALES">
      <div className="flex flex-col gap-y-4">
        <OverviewSalesStats />
        <OverviewSalesAnalytics />
        <OverviewSalesTableSection />
      </div>
    </UIGuard>
  );
};

export default OverviewSalesView;
