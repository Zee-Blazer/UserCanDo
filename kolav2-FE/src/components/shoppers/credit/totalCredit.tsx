import { Typography } from "@material-tailwind/react";

const TotalCreditTab = () => {
  return (
    <div className="flex flex-col gap-y-2 border border-1 border-[#0000000D] rounded-lg items-center justify-center py-5">
      <Typography className="font-inter text-xs">Amount in credit</Typography>
      <Typography className="text-[#B87C16] text-2xl font-bold font-inter">
        GHS 4,354<span className="text-sm">.87</span>
      </Typography>
      <div className=" border border-1 border-[#FECACA] bg-[#FEF2F2] rounded-full px-3 py-[6px] ">
        <Typography className="text-[#7F1D1D] font-semibold text-[10px] ">
          Overdue <span className="text-[#EF4444]">14 days</span>
        </Typography>
      </div>
    </div>
  );
};

export default TotalCreditTab;
