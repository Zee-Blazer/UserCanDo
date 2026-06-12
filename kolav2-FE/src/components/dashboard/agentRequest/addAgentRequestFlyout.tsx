import FlyoutLayout from "@/components/General/flyoutLayout";
import AddAgentRequestForm from "./addAgentRequestForm";

interface AddAgentRequestFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddAgentRequestFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: AddAgentRequestFlyoutProps) {
  return (
    <>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading="Add Agent Request"
        subheading="Add a new agent request with the details below."
        buttonContainerClass="justify-between flex py-10"
        buttonWidth="w-40"
        showButtons={false}
      >
        <AddAgentRequestForm onClose={closeFlyout} />
      </FlyoutLayout>
    </>
  );
}

export default AddAgentRequestFlyout;
