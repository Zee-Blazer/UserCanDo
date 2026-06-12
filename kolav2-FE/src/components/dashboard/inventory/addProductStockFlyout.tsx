import FlyoutLayout from "@/components/General/flyoutLayout";
import AddProductStockForm from "./addProductStockForm";
import { useState } from "react";
import { useDash } from "@/context/dashboardContext";

interface AddProductStockFlyoutProps {
  isStockLibraryOpen: boolean;
  closeFlyout: () => void;
}

function AddProductStockFlyout({
  isStockLibraryOpen,
  closeFlyout,
}: AddProductStockFlyoutProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const { handleCreateProduct, isProductCreating } = useDash();

  const handleProductSelect = (products: any[]) => {
    setSelectedProducts(products);
  };

  return (
    <FlyoutLayout
      isRightDrawerOpen={isStockLibraryOpen}
      closeFlyout={closeFlyout}
      onSave={() => {
        handleCreateProduct(selectedProducts, null, () => {
          closeFlyout();
        });
      }}
      heading="Add New Product"
      subheading="Add the details of the product."
      buttonContainerClass="justify-between flex py-10"
      buttonWidth="w-40"
      primaryBtnText="Save Changes"
      loading={isProductCreating}
    >
      <AddProductStockForm onProductSelect={handleProductSelect} />
    </FlyoutLayout>
  );
}

export default AddProductStockFlyout;
