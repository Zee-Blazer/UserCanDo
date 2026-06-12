import FlyoutLayout from "@/components/General/flyoutLayout";
import React from "react";
import ProductItemForm from "./productItemForm";
import { Button } from "@material-tailwind/react";
import { Plus } from "lucide-react";

interface ProductItemsFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  onComplete: () => void;
  selectedBrand?: string;
  onProductSelect: (products: any[]) => void;
  activeBrandID: string;
}

function ProductItemsFlyout({
  isRightDrawerOpen,
  closeFlyout,
  onProductSelect,
  activeBrandID,
  onComplete,
}: ProductItemsFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      heading="Add new Products"
      subheading="Select products to add to your inventory."
      buttonContainerClass="justify-between flex py-10"
      showButtons={false}
      headingRightComponent={
        <div>
          <Button
            onClick={onComplete}
            className="inline-flex items-center justify-center whitespace-nowrap normal-case gap-2  text-pry2 bg-inherit font-normal border border-gray_2 text-sm shadow-none hover:shadow-none px-5"
          >
            <Plus className="text-[#027A48]" />
            <span>Add Product</span>
          </Button>
        </div>
      }
    >
      <ProductItemForm onProductSelect={onProductSelect} activeBrandID={activeBrandID} />
    </FlyoutLayout>
  );
}

export default ProductItemsFlyout;
