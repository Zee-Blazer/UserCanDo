import FlyoutLayout from "@/components/General/flyoutLayout";
import AddNewStockForm from "./addNewStockForm";
import ManualNewProductForm from "../../inventory/manualNewProductForm";

interface AddNewStockFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddNewStockFlyout({
  isRightDrawerOpen,
  closeFlyout,
}: AddNewStockFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Stock"
      subheading="Add the details of this stock."
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <AddNewStockForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default AddNewStockFlyout;
