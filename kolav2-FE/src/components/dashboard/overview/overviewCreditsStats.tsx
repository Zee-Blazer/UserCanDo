import React from "react";
import StatsDataItem from "./StatsDataItem";
import ProgressBar from "@/components/General/progressBar";
import { Typography } from "@material-tailwind/react";

const OverviewCreditsStats = () => {
  const percentage = 44;

  return (
    <div className="py-7 px-11 mt-2 rounded-md bg-white border border-1 border-[#D5D8DC] flex justify-between lg:gap-x-8">
      <StatsDataItem title="Credit Extended (GHS)" numbers="3.48 M" />
      <StatsDataItem title="Repayments Received (GHS)" numbers="1.54 M">
        <div className="flex gap-x-2 items-center">
          <ProgressBar percentage={percentage} height="1.5" />
          <Typography className="text-xs text-[#6F6F6F]">
            ({percentage}%)
          </Typography>
        </div>
      </StatsDataItem>
      <StatsDataItem title="Average Repayment Days" numbers="7" />
    </div>
  );
};

export default OverviewCreditsStats;
