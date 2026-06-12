import React from "react";
import OverviewAnalytics from "@/components/dashboard/overview/overviewAnalytics";
import OverviewStats from "@/components/dashboard/overview/overviewStats";
import OverviewTableSection from "../overviewTableSection";
import { UIGuard } from "@/components/guards/roleGuard";

const GeneralOverviewSlide = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <UIGuard permission="VIEW_SALES">
        <OverviewStats />
      </UIGuard>
      <OverviewAnalytics />
      <OverviewTableSection />
    </div>
  );
};

export default GeneralOverviewSlide;
