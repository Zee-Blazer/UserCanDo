import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";

const AllTimeCredit = () => {
  const { loadCreditData } = useDash();
  const { creditScore } = useDashboardSelector();

  useEffect(() => {
    loadCreditData();
  }, [loadCreditData]);

  return (
    <div className="border-gray_2 border-t border-b py-5 px-5 -mx-4" data-credit-cards="true">
      <div className="flex gap-2">
        <Typography className="font-medium">Credit</Typography>
        <div className="rounded-full bg-[#F4F8FE] px-2">
          <Typography className="text-[#6941C6] font-medium">
            All Time
          </Typography>
        </div>
      </div>
      <section className="flex py-5 justify-between">
        <div className="flex w-full flex-col gap-3">
          <Typography className="text-gray_7 font-normal">
            Credits Score
          </Typography>
          <Typography className="font-semibold text-[#027A48] text-3xl">
            {creditScore?.score || "0.00"}
          </Typography>
        </div>
        <div className="w-full flex justify-center">
          <div className="h-full border-r border-gray_2"></div>
        </div>
        <div className="flex flex-col w-full gap-3">
          <Typography className="text-gray_7 font-normal">
            Total Credit Received (GHS)
          </Typography>
          <Typography className="font-semibold text-3xl">0</Typography>
        </div>
        <div className="w-full flex justify-center">
          <div className="h-full border-r border-gray_2"></div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Typography className="text-gray_7 whitespace-nowrap font-normal">
            Total Outstanding Credit (GHS)
          </Typography>
          <Typography className="font-semibold text-3xl">0</Typography>
        </div>
      </section>
    </div>
  );
};

export default AllTimeCredit;
