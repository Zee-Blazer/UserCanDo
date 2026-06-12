import React from "react";
import FlyoutLayout from "@/components/General/flyoutLayout";
import AddAgentRequestForm from "./addAgentRequestForm";
import {
  getAgentRequestStatusClasses,
  getCurrentAgentRequestStatus,
} from "@/utils/helpers";

interface EditAgentRequestFlyoutProps {
  isEditRightDrawerOpen: boolean;
  closeFlyout: () => void;
  data?: AgentRequestProps | null;
}

function EditAgentRequestFlyout({
  isEditRightDrawerOpen,
  closeFlyout,
  data,
}: EditAgentRequestFlyoutProps) {
  const currentStatus = getCurrentAgentRequestStatus(
    data?.request_history || []
  );
  const statusClasses = getAgentRequestStatusClasses(currentStatus);

  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isEditRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading="Edit Agent Request"
        subheading="Add a new agent request with the details below."
        showButtons={false}
        headingRightComponent={
          <div className={`px-2 py-1 rounded-md capitalize ${statusClasses}`}>
            {currentStatus}
          </div>
        }
      >
        <AddAgentRequestForm
          isEdit
          //@ts-ignore
          initialData={data}
          onClose={closeFlyout}
        />
      </FlyoutLayout>
    </>
  );
}

export default EditAgentRequestFlyout;
