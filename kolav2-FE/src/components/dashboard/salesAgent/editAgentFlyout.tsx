import FlyoutLayout from "@/components/General/flyoutLayout";
import AddAgentForm from "./addAgentForm";

interface EditAgentFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  data?: SalesAgentListProps | null;
  isEdit?: boolean;
}

function EditAgentFlyout({
  isRightDrawerOpen,
  closeFlyout,
  data,
  isEdit = true,
}: EditAgentFlyoutProps) {
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
        <AddAgentForm
          isEdit
          //@ts-ignoreorm
          isEdit
          //@ts-ignore
          initialData={data}
        />
      </FlyoutLayout>
    </>
  );
}

export default EditAgentFlyout;
