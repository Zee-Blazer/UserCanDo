import FlyoutLayout from "@/components/General/flyoutLayout";
import ManualNewProductForm from "./manualNewProductForm";

interface ManualNewProductFlyoutProps {
  isManualOpen: boolean;
  closeFlyout: () => void;
}

function ManualNewProductFlyout({
  isManualOpen,
  closeFlyout,
}: ManualNewProductFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isManualOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Product"
      subheading="Add the details of this product."
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <ManualNewProductForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default ManualNewProductFlyout;
