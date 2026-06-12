import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { getInitials } from "@/utils/helpers";
import EmptyState from "./emptyState";
import FilterAgentRequestModal from "./FilterAgentRequestModal";
import MenuDropdown from "@/components/General/menuDropdown";
import { TrashModal } from "@/components/General/trashModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

interface AgentRequestsProps {
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
}

const AgentRequests = ({
  isFilterModalOpen,
  setIsFilterModalOpen,
}: AgentRequestsProps) => {
  const { agentRequests } = useDashboardSelector();
  const { handleDeleteAgentRequest, isAgentRequestDeleting } = useDash();

  const [filteredAgentRequests, setFilteredAgentRequests] = useState(
    agentRequests || []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [agentRequestToDelete, setAgentRequestToDelete] = useState<any>(null);

  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const handleDeleteClick = (agentRequest: any) => {
    setAgentRequestToDelete(agentRequest);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (agentRequestToDelete) {
      handleDeleteAgentRequest(agentRequestToDelete, () => {
        setIsDeleteModalOpen(false);
        setAgentRequestToDelete(null);
      });
    }
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  useEffect(() => {
    if (agentRequests) {
      let filtered = [...agentRequests];

      // Add date filtering logic here if needed
      if (filters.dateFrom || filters.dateTo) {
        // Implement date filtering based on your date field
        // filtered = filtered.filter(request => {
        //   // Your date filtering logic
        // });
      }

      setFilteredAgentRequests(filtered);
    }
  }, [agentRequests, filters]);

  return (
    <>
      {filteredAgentRequests?.length === 0 ? (
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
              Agent Request
              <span className="ml-2 inline-flex items-center justify-center text-sm text-pry2 bg-[#FDF7ED] rounded-full w-6 h-6">
                {agentRequests?.length || 0}
              </span>
            </p>
            <div className="w-10"></div>
          </div>

          <div className="space-y-4">
            {filteredAgentRequests?.map((agent: any) => (
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
                      {agent.initials || getInitials(agent.sales_agent_name)}
                    </div>
                  )}
                  <div className="text-[#787486]">
                    <p className="font-medium">{agent.sales_agent_name}</p>
                  </div>
                </div>
                <MenuDropdown
                  onDelete={() => handleDeleteClick(agent)}
                  isDeleting={
                    isAgentRequestDeleting &&
                    agentRequestToDelete?.id === agent?.id
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <FilterAgentRequestModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />

      <TrashModal
        warning={true}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAgentRequestToDelete(null);
        }}
        header="Delete Agent Request"
        title={`Are you sure you want to delete the request from ${agentRequestToDelete?.sales_agent_name}? This action cannot be undone.`}
        returnText="Cancel"
        proceedText="Delete"
        loading={isAgentRequestDeleting}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default AgentRequests;
