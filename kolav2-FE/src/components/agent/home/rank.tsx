import { Typography } from "@material-tailwind/react";
import React from "react";
import { Rank1, Rank2, Rank3, Rank4, Rank5, Rank6, Rank7 } from "@/assets/svg";
import { useAgentSelector } from "@/Redux/selectors";

const Rank = () => {
  const { salesAgents } = useAgentSelector();

  const salesAgentLeaderboard = [...salesAgents].sort((a, b) => {
    const valueA = a.total_sales_value || a.latest_target || 0;
    const valueB = b.total_sales_value || b.latest_target || 0;
    return valueB - valueA;
  });

  const topThreeAgents = salesAgentLeaderboard.slice(0, 3);
  const remainingAgents = salesAgentLeaderboard.slice(3);

  const getBusinessInitials = (name: string) => {
    const words = name?.split(" ") || [];
    const firstChar = words[0]?.charAt(0).toUpperCase() || "";
    const secondChar = words[1]?.charAt(0).toUpperCase() || "";
    return firstChar + secondChar;
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return "GHS 0";
    return `GHS ${value.toLocaleString()}`;
  };

  const getRankIcon = (index: number) => {
    const icons = [
      <Rank4 key={4} />,
      <Rank5 key={5} />,
      <Rank6 key={6} />,
      <Rank7 key={7} />,
    ];
    return icons[index] || <Rank7 key={7} />;
  };

  return (
    <main className="mt-8 flex flex-col px-4">
      <section className="flex gap-4 max-w-lg w-full mx-auto items-center flex-col relative">
        {/* First Place */}
        {topThreeAgents[0] && (
          <div className="flex flex-col items-center gap-2 z-10">
            <Rank1 width="40" className="sm:w-[50px] lg:w-[60px]" />
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[80px] lg:h-[80px] rounded-full bg-[#D8ED9A] flex items-center justify-center">
              <span className="font-bold text-lg sm:text-xl lg:text-2xl">
                {getBusinessInitials(topThreeAgents[0].name)}
              </span>
            </div>
            <div className="flex flex-col text-center">
              <Typography className="font-medium text-sm sm:text-base lg:text-lg">
                {topThreeAgents[0].name}
              </Typography>
              <span className="text-xs sm:text-sm">
                {formatCurrency(
                  topThreeAgents[0].total_sales_value ||
                    topThreeAgents[0].latest_target
                )}
              </span>
            </div>
          </div>
        )}

        <div className="flex w-full justify-between items-end absolute top-12 sm:top-14 lg:top-16 left-0 right-0 max-w-lg mx-auto">
          {/* Third Place */}
          {topThreeAgents[2] && (
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Rank3 width="30" className="sm:w-[40px] lg:w-[50px]" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-[#9AD8ED] flex items-center justify-center">
                <span className="font-bold text-base sm:text-lg lg:text-xl">
                  {getBusinessInitials(topThreeAgents[2].name)}
                </span>
              </div>
              <div className="flex flex-col text-center">
                <Typography className="font-medium text-xs sm:text-base lg:text-lg">
                  {topThreeAgents[2].name}
                </Typography>
                <span className="text-xs sm:text-sm">
                  {formatCurrency(
                    topThreeAgents[2].total_sales_value ||
                      topThreeAgents[2].latest_target
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Second Place */}
          {topThreeAgents[1] && (
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Rank2 width="28" className="sm:w-[34px] lg:w-[40px]" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 rounded-full bg-[#ED9AC9] flex items-center justify-center">
                <span className="font-bold text-base sm:text-lg lg:text-xl">
                  {getBusinessInitials(topThreeAgents[1].name)}
                </span>
              </div>
              <div className="flex flex-col text-center">
                <Typography className="font-medium text-xs sm:text-base lg:text-lg">
                  {topThreeAgents[1].name}
                </Typography>
                <span className="text-xs sm:text-sm">
                  {formatCurrency(
                    topThreeAgents[1].total_sales_value ||
                      topThreeAgents[1].latest_target
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mt-20 sm:mt-24 lg:mt-28">
        <div className="grid grid-cols-1 gap-5 max-w-sm">
          {remainingAgents.map((agent, index) => (
            <div
              key={agent.id}
              className="flex items-start border border-gray-200 py-4 sm:py-6 px-4 sm:px-5 rounded-xl max-w-sm w-full justify-between"
            >
              <div className="flex gap-2 items-center">
                {getRankIcon(index)}
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center text-sm">
                  {getBusinessInitials(agent.name)}
                </div>
                <span className="font-medium text-sm sm:text-base">
                  {agent.name}
                </span>
              </div>
              <span className="font-normal text-sm sm:text-base">
                {formatCurrency(agent.total_sales_value || agent.latest_target)}
              </span>
            </div>
          ))}

          {salesAgents.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <Typography className="text-gray-500">
                No sales agents data available
              </Typography>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Rank;
