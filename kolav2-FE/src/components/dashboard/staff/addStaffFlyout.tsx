import FlyoutLayout from "@/components/General/flyoutLayout";
import AddStaffForm from "./addStaffForm";

interface AddStaffFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddStaffFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: AddStaffFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add Team"
      subheading="Add a new Team"
      buttonContainerClass="justify-between flex py-10"
      buttonWidth="w-40"
      showButtons={false}
    >
      <AddStaffForm onClose={closeFlyout} />
    </FlyoutLayout>
  );
}

export default AddStaffFlyout;
