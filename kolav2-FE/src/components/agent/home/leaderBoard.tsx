import { Typography } from "@material-tailwind/react";
import mr from "@/assets/images/mr.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Rank1, Rank2, Rank3 } from "@/assets/svg";
import { ROUTES } from "@/constants/routes";
import { useAgentSelector } from "@/Redux/selectors";

const LeaderBoard = () => {
  const { salesAgents } = useAgentSelector();

  // Sort agents by total_sales_value (or use latest_target if total_sales_value is null)
  const salesAgentLeaderboard = [...salesAgents]
    .sort((a, b) => {
      const valueA = a.total_sales_value || a.latest_target || 0;
      const valueB = b.total_sales_value || b.latest_target || 0;
      return valueB - valueA;
    })
    .slice(0, 3); // Show top 3 agents

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

  return (
    <div className="mt-14 flex flex-col">
      <header className="flex justify-between items-center">
        <Typography className="text-xl font-medium">Leaderboard</Typography>
        <Link href={ROUTES.agentBoard}>
          <span className="text-[#003366] font-normal">View More</span>
        </Link>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-10">
        {salesAgentLeaderboard.length > 0 ? (
          salesAgentLeaderboard.map((agent, index) => (
            <div key={agent.id} className="mt-8 flex gap-4 items-center text-center flex-col">
              {index === 0 && <Rank1 width="25" />}
              {index === 1 && <Rank2 width="25" />}
              {index === 2 && <Rank3 width="25" />}
              <div className="w-16 h-16 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center text-sm">
                {getBusinessInitials(agent.name)}
              </div>
              <div>
                <Typography className="font-medium text-lg">{agent.name}</Typography>
                <span>{formatCurrency(agent.total_sales_value || agent.latest_target)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="mt-8 flex gap-4 items-center text-center flex-col">
            <Rank1 width="25" />
            <Image src={mr} alt="mr" />
            <div>
              <Typography className="font-medium text-lg">No agents yet</Typography>
              <span>GHS 0</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LeaderBoard;
