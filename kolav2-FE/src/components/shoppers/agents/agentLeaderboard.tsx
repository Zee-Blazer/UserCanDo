import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { getInitials } from "@/utils/helpers";
import EmptyState from "./emptyState";

interface AgentLeaderboardProps {
  searchQuery: string;
}

const agentsLeaderboard: any[] = [];

const AgentLeaderboard = ({ searchQuery }: AgentLeaderboardProps) => {
  const [filteredAgentsLeaderboard, setFilteredAgentsLeaderboard] = useState(
    agentsLeaderboard || []
  );

  useEffect(() => {
    const filtered = agentsLeaderboard?.filter(
      (agent: any) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAgentsLeaderboard(filtered);
  }, [searchQuery]);

  return (
    <>
      {filteredAgentsLeaderboard?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
          <div className="flex items-center justify-between mb-6">
            <Link
              href={ROUTES.shopperProfile}
              className="text-pry2 flex items-center text-sm font-medium"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </Link>
            <p className="text-lg font-medium text-[#5A5555] flex items-center">
              Leaderboard{" "}
              <span className="ml-2 inline-flex items-center justify-center text-sm text-pry2 bg-[#FDF7ED] rounded-full w-6 h-6">
                {agentsLeaderboard?.length}
              </span>
            </p>
            <div className="w-10"></div>
          </div>

          <div className="space-y-4">
            {filteredAgentsLeaderboard?.map((agent: any) => (
              <div
                key={agent.id}
                className="flex items-center justify-between gap-4 p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {agent.business_logo ? (
                    <img
                      src={agent.business_logo}
                      className="w-10 h-10 rounded-full"
                      alt="agent logo"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                      {agent.initials || getInitials(agent.name)}
                    </div>
                  )}
                  <div className="text-[#787486]">
                    <p className="font-medium">{agent.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentLeaderboard;
