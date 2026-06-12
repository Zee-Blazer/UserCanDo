import FlyoutLayout from "@/components/General/flyoutLayout";
import AddAgentForm from "./addAgentForm";

interface AddAgentFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  isEdit?: boolean;
}

function AddAgentFlyout({
  isRightDrawerOpen,
  closeFlyout,
  isEdit = false,
}: AddAgentFlyoutProps) {
  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading={isEdit ? "Edit Agent" : "Add Agent"}
        subheading={
          isEdit
            ? "Edit the agent details."
            : "Add a new agent with the details below."
        }
        showButtons={false}
        buttonContainerClass="justify-between flex py-10"
        buttonWidth="w-40"
        primaryBtnText="Add Sale"
      >
        <AddAgentForm closeFlyout={closeFlyout} isEdit={isEdit} />
      </FlyoutLayout>
    </>
  );
}

export default AddAgentFlyout;
