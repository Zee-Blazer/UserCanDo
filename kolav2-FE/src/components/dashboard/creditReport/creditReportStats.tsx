import StatsDataItem from "../overview/StatsDataItem";
import { Typography } from "@material-tailwind/react";
import ProgressBar from "@/components/General/progressBar";

const CreditReportStats = () => {
  const percentage = 45;

  return (
    <div>
      <div className="py-7 -mx-4 mt-2 bg-white border-t border-b px-9 border-[#D5D8DC]">
        <Typography
          variant="small"
          className="font-normal items-center flex gap-2 mb-4"
        >
          Credits and Repayments
          <span className="text-[#6941C6] rounded-full font-normal text-sm bg-[#F8FAFB] p-1">
            All time
          </span>
        </Typography>
        <div className="flex items-center justify-between">
          <StatsDataItem title="Credit Extended (GHS)" numbers={2500} />
          <div className="h-14 w-px bg-gray-200" />
          <StatsDataItem title="Repayment Received (GHS)" numbers={2000}>
            <div className="flex gap-x-2 items-center">
              <ProgressBar percentage={percentage} height="1.5" />
              <Typography className="text-xs text-[#6F6F6F]">
                ({percentage}%)
              </Typography>
            </div>
          </StatsDataItem>
          <div className="h-14 w-px bg-gray-200" />
          <StatsDataItem title="Average Repyament Days" numbers={70} />
        </div>
      </div>
    </div>
  );
};

export default CreditReportStats;
