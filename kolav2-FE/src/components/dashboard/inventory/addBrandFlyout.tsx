import FlyoutLayout from "@/components/General/flyoutLayout";
import AddBrandForm from "./addBrandForm";

interface AddBrandFlyoutProps {
  isCreateBrandOpen: boolean;
  closeFlyout: () => void;
}

function AddBrandFlyout({
  isCreateBrandOpen,
  closeFlyout,
}: AddBrandFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isCreateBrandOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Brand"
      subheading="Enter the Brand name below"
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <AddBrandForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default AddBrandFlyout;
