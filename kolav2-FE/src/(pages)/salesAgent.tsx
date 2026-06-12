"use client";

import AddAgentFlyout from "@/components/dashboard/salesAgent/addAgentFlyout";
import Agents from "@/components/dashboard/salesAgent/agents";
import AgentStock from "@/components/dashboard/salesAgent/agentStock";
import All from "@/components/dashboard/salesAgent/all";
import EditAgentFlyout from "@/components/dashboard/salesAgent/editAgentFlyout";
import Managers from "@/components/dashboard/salesAgent/managers";
import Owners from "@/components/dashboard/salesAgent/owners";
import SalesAgentPageHeader from "@/components/dashboard/salesAgent/salesAgentPageHeader";
import { TrashModal } from "@/components/General/trashModal";
import { useDash } from "@/context/dashboardContext";
import { useState } from "react";

const SalesAgent = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isEditRightDrawerOpen, setIsEditRightDrawerOpen] = useState(false);
  const { handleDeleteSalesgent, isSalesAgentDeleting } = useDash();
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [agentDetails, setAgentDetails] = useState<SalesAgentListProps | null>(
    null
  );

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteSalesgent(selectedRow, () => {
        setIsDialogOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row.original);
    setIsDialogOpen(true);
  };

  return (
    <main className="border-[1px] border-gray_2 rounded-md p-4">
      <SalesAgentPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onClick={() => {
          setIsRightDrawerOpen(true);
        }}
      />
      {activeTabIndex === 0 && (
        <All
          onEditButtonClick={(data: SalesAgentListProps) => {
            setAgentDetails(data);
            setIsEditRightDrawerOpen(true);
          }}
          handleDelete={handleDeleteModal}
        />
      )}
      {activeTabIndex === 1 && (
        <Owners
          onClick={() => {
            setIsEditRightDrawerOpen(true);
          }}
          onOpenModal={handleOpenDialog}
        />
      )}
      {activeTabIndex === 2 && (
        <Managers
          onClick={() => {
            setIsEditRightDrawerOpen(true);
          }}
          onOpenModal={handleOpenDialog}
        />
      )}
      {activeTabIndex === 3 && (
        <Agents
          onClick={() => {
            setIsEditRightDrawerOpen(true);
          }}
          onOpenModal={handleOpenDialog}
        />
      )}
      {activeTabIndex === 4 && <AgentStock />}
      <AddAgentFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
      />
      <EditAgentFlyout
        isRightDrawerOpen={isEditRightDrawerOpen}
        closeFlyout={() => {
          setIsEditRightDrawerOpen(false);
        }}
        data={agentDetails || null}
      />
      <TrashModal
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        header="Delete Agent"
        title="Are you sure you want to remove this agent?"
        onDelete={confirmDelete}
        loading={isSalesAgentDeleting}
      />
    </main>
  );
};

export default SalesAgent;
