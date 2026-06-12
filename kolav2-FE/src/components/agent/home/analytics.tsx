import { Typography } from "@material-tailwind/react";
import km from "@/assets/images/km.png";
import Image from "next/image";
import React, { useEffect } from "react";
import ProgressBar from "@/components/General/progressBar";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";
import { formatNumAmount } from "@/utils/helpers";

const Analytics = () => {
  const { loadAgentOverviewData } = useAgent();
  const { overview, activeBusiness } = useAgentSelector();

  useEffect(() => {
    if (activeBusiness?.id) {
      loadAgentOverviewData();
    }
  }, [loadAgentOverviewData, activeBusiness?.id]);

  if (!activeBusiness?.id || !overview) {
    return (
      <div className="flex flex-col md:flex-row justify-between gap-5 mt-10">
        <div className="flex flex-col flex-1">
          <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 bg-gray-100 animate-pulse border border-gray-100 flex-col min-h-[100px] justify-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 bg-gray-100 animate-pulse border border-gray-100 flex-col min-h-[100px] justify-center">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="flex flex-col flex-[1.5] bg-gray-100 animate-pulse px-6 py-4 rounded-xl min-h-[100px]">
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex px-6 text-center md:px-6 rounded-xl py-4 gap-2 bg-gray-100 animate-pulse border border-gray_1 flex-col min-h-[100px] justify-center">
            <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 bg-gray-100 animate-pulse border border-gray-100 flex-col min-h-[100px] justify-center">
            <div className="h-6 bg-gray-300 rounded w-32 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5 mt-10">
      <div className="flex flex-col flex-1">
        <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 bg-inherit border border-gray-100 flex-col min-h-[100px] justify-center">
          <Typography className="text-[#898b8e] font-normal">
            Total Sales Made
          </Typography>
          <Typography variant="h5" className="font-semibold">
            GHS{" "}
            {overview?.total_sales_made
              ? formatNumAmount(Number(overview?.total_sales_made)?.toFixed(2))
              : "0.0"}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 bg-inherit border border-gray-100 flex-col min-h-[100px] justify-center">
          <Typography className="text-[#898b8e] font-normal">
            Avg. Sales Value
          </Typography>
          <Typography variant="h5" className="font-semibold">
            GHS{" "}
            {overview.avg_sales_value
              ? formatNumAmount(Number(overview?.avg_sales_value)?.toFixed(2))
              : "0.0"}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col flex-[1.5] border border-gray-100 px-6 py-4 rounded-xl min-h-[100px]">
        <div className="flex mb-3 gap-3 items-center">
          <Image src={km} alt="kola" />
          <div className="flex flex-col">
            <Typography className="text-[#898b8e] font-normal">
              Performance
            </Typography>
            <div className="space-y-2">
              <Typography className="font-medium text-[10px]">
                {`Sales Target: ${
                  overview.agent_target
                    ? `GHS ${Number(overview.agent_target).toLocaleString()}`
                    : "Nil"
                }`}
              </Typography>
              <Typography className="font-medium text-[10px]">
                {`Sales Performance: ${
                  overview.agent_target
                    ? `GHS ${Number(
                        overview.total_sales_made || 0
                      ).toLocaleString()}`
                    : "Nil"
                }`}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ProgressBar percentage={Number(overview.performance || 0)} />
          <Typography className="font-medium text-[10px] min-w-[40px]">
            {`${overview.performance || 0}%`}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex px-6 text-center md:px-6 rounded-xl py-4 gap-2 bg-[#FEEBE9] border border-gray_1 flex-col min-h-[100px] justify-center">
          <Typography variant="h5" className="font-semibold">
            GHS{" "}
            {overview?.total_value_in_stock
              ? formatNumAmount(Number(overview?.total_value_in_stock)?.toFixed(2))
              : "0.0"}
          </Typography>
          <Typography className="text-[#898b8e]">
            Total value In Stock
          </Typography>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex px-6 md:px-6 rounded-xl py-4 gap-2 text-center bg-[#E4F3ED] border border-gray_1 flex-col min-h-[100px] justify-center">
          <Typography variant="h5" className="font-semibold">
            {overview?.number_of_items
              ? Number(overview?.number_of_items)?.toFixed(2)
              : "0.0"}
          </Typography>
          <Typography className="text-[#898b8e]">Number of Items</Typography>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
