import FlyoutLayout from "@/components/General/flyoutLayout";
import AddNewStockForm from "./addNewStockForm";

interface UpdateStockFlyoutProps {
  isStockOpen: boolean;
  closeFlyout: () => void;
}

function UpdateStockFlyout({
  isStockOpen,
  closeFlyout,
}: UpdateStockFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isStockOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Update Stock"
      subheading="Update the details of this stock."
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <AddNewStockForm closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default UpdateStockFlyout;
