import FlyoutLayout from "@/components/General/flyoutLayout";
import AddStaffForm from "./addStaffForm";

interface EditStaffFlyoutProps {
  isEditDrawerOpen: boolean;
  closeFlyout: () => void;
  data?: StaffProps | null;
}

function EditStaffFlyout({
  isEditDrawerOpen,
  closeFlyout,
  data,
}: EditStaffFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isEditDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Edit Staff"
      subheading="Edit the details of this staff"
      showButtons={false}
    >
      <AddStaffForm
        isEdit
        //@ts-ignore
        initialData={data}
        onClose={closeFlyout}
      />
    </FlyoutLayout>
  );
}

export default EditStaffFlyout;
