import React from "react";
import { Typography } from "@material-tailwind/react";
import { ArrowUp, ArrowDown } from "lucide-react";
import StatsDataItem from "./StatsDataItem";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

interface ArrowState {
  status: boolean;
}

const ArrowStatus = ({ status }: ArrowState) => (
  <>
    {status ? (
      <ArrowUp color="#32A071" size="16" />
    ) : (
      <ArrowDown color="#FF0000" size="16" />
    )}
  </>
);

const OverviewStats = () => {
  const { customers, retailers, wholesalers } = useSelector(
    (state: RootState) => state?.dashboard?.customerOverview
  );

  return (
    <div className="py-7 px-11 mt-2 rounded-md bg-white border border-1 border-[#D5D8DC] flex justify-between lg:gap-x-8">
      <StatsDataItem title="Customers" numbers={customers?.total}>
        <div className="flex items-center gap-x-1">
          {<ArrowStatus status={customers?.percent_change >= 0} />}
          <Typography
            className={`${
              customers?.percent_change >= 0
                ? "text-[#32A071]"
                : "text-[#FF0000]"
            } text-xs`}
          >
            {customers?.percent_change}%
          </Typography>
          <Typography className="text-xs text-#6F6F6F">
            ({customers?.active} of active customers)
          </Typography>
        </div>
      </StatsDataItem>
      <StatsDataItem title="Retailer" numbers={retailers?.total}>
        <div className="flex items-center gap-x-1">
          {<ArrowStatus status={retailers?.percent_change >= 0} />}
          <Typography
            className={`${
              retailers?.percent_change >= 0
                ? "text-[#32A071]"
                : "text-[#FF0000]"
            } text-xs`}
          >
            {retailers?.percent_change}%
          </Typography>
          <Typography className="text-xs text-#6F6F6F">
            ({retailers?.active} of active retailers)
          </Typography>
        </div>
      </StatsDataItem>
      <StatsDataItem title="Wholesaler" numbers={wholesalers?.total}>
        <div className="flex items-center gap-x-1">
          {<ArrowStatus status={wholesalers?.percent_change >= 0} />}
          <Typography
            className={`${
              wholesalers?.percent_change >= 0
                ? "text-[#32A071]"
                : "text-[#FF0000]"
            } text-xs`}
          >
            {wholesalers?.percent_change}%
          </Typography>
          <Typography className="text-xs text-#6F6F6F">
            ({wholesalers?.active} of active wholesalers)
          </Typography>
        </div>
      </StatsDataItem>
    </div>
  );
};

export default OverviewStats;
