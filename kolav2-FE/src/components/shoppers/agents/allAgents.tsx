import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { getInitials } from "@/utils/helpers";
import { TrashModal } from "@/components/General/trashModal";
import EmptyState from "./emptyState";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import MenuDropdown from "@/components/General/menuDropdown";

interface AllAgentsProps {
  searchQuery: string;
}

const AllAgents = ({ searchQuery }: AllAgentsProps) => {
  const { salesAgents } = useDashboardSelector();
  const [filteredAgents, setFilteredAgents] = useState<CreateSalesAgentProps[]>(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] =
    useState<CreateSalesAgentProps | null>(null);
  const { handleDeleteSalesgent, isSalesAgentDeleting } = useDash();

  const handleDeleteClick = (agent: CreateSalesAgentProps) => {
    setAgentToDelete(agent);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      handleDeleteSalesgent(agentToDelete, () => {
        setIsDeleteModalOpen(false);
        setAgentToDelete(null);
      });
    }
  };

  useEffect(() => {
    if (salesAgents && salesAgents.length > 0) {
      const filtered = salesAgents.filter((agent: CreateSalesAgentProps) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAgents(filtered);
    } else {
      setFilteredAgents([]);
    }
  }, [searchQuery, salesAgents]);

  return (
    <>
      {filteredAgents?.length === 0 ? (
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
              Agents{" "}
              <span className="ml-2 inline-flex items-center justify-center text-sm text-pry2 bg-[#FDF7ED] rounded-full w-6 h-6">
                {salesAgents?.length || 0}
              </span>
            </p>
            <div className="w-10"></div>
          </div>

          <div className="space-y-4">
            {filteredAgents?.map((agent: CreateSalesAgentProps) => (
              <div
                key={agent.id}
                className="flex items-center justify-between gap-4 p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                    {getInitials(agent.name)}
                  </div>

                  <div className="text-[#787486]">
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.location}</p>
                  </div>
                </div>
                <MenuDropdown
                  onDelete={() => handleDeleteClick(agent)}
                  isDeleting={
                    isSalesAgentDeleting && agentToDelete?.id === agent?.id
                  }
                />
              </div>
            ))}
          </div>

          <TrashModal
            warning={true}
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setAgentToDelete(null);
            }}
            header="Are you sure you want to remove this agent?"
            title="This action cannot be undone."
            returnText="Cancel"
            proceedText="Delete"
            loading={isSalesAgentDeleting}
            onDelete={confirmDelete}
          />
        </div>
      )}
    </>
  );
};

export default AllAgents;
