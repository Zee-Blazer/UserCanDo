import React, { useState } from "react";
import FlyoutLayout from "@/components/General/flyoutLayout";
import AgentRequestDetailsForm from "./agentRequestDetailsForm";
import Details from "./details";
import History from "./history";
import Status from "./status";
import UpdateStatusModal from "../orders/modals/updateStatus";

interface AgentRequestDetailsFlyoutProps {
  isDetailsRightDrawerOpen: boolean;
  closeFlyout: () => void;
  data: AgentRequestProps;
}

function AgentRequestDetailsFlyout({
  isDetailsRightDrawerOpen,
  closeFlyout,
  data,
}: AgentRequestDetailsFlyoutProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const handleOpenDialog = (statusData: any = null) => {
    setSelectedStatus(statusData);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStatus(null);
  };

  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isDetailsRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading="Agent Request Details"
        subheading="View and manage agent request details."
        showButtons={false}
        headingRightComponent={
          <Status onOpenModal={handleOpenDialog} agentRequestData={data} />
        }
        drawerSize={750}
      >
        <AgentRequestDetailsForm
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
        />
        <div className="py-4">
          {activeTabIndex === 0 && (
            <Details agentRequestData={data} onClose={closeFlyout} />
          )}
          {activeTabIndex === 1 && (
            <History onOpenModal={handleOpenDialog} agentRequestData={data} />
          )}
        </div>
        <UpdateStatusModal
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          closeFlyout={closeFlyout}
          orderData={data}
          selectedStatus={selectedStatus}
        />
      </FlyoutLayout>
    </>
  );
}

export default AgentRequestDetailsFlyout;
