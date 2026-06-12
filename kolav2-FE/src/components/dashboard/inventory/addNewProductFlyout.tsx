import FlyoutLayout from "@/components/General/flyoutLayout";
import NewProductOptionsForm from "./newProductOptionsForm";

interface AddNewProductFlyoutProps {
  isAddNewProductOpen: boolean;
  closeFlyout: () => void;
}

function AddNewProductFlyout({
  isAddNewProductOpen,
  closeFlyout,
}: AddNewProductFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isAddNewProductOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Product"
      subheading="Add the details of this new product."
      showButtons={false}
    >
      <NewProductOptionsForm />
    </FlyoutLayout>
  );
}

export default AddNewProductFlyout;
