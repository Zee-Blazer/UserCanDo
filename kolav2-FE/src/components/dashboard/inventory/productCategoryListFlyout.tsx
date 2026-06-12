import FlyoutLayout from "@/components/General/flyoutLayout";
import { Button } from "@material-tailwind/react";
import { colors } from "@/constants/colors";
import { CirclePlus } from "lucide-react";
import CategoryList from "./categoryList";
import { useState } from "react";

interface ProductCategoryListFlyoutProps {
  isCategoryListOpen: boolean;
  closeFlyout: () => void;
  onAddCategoryClick: () => void;
}

function ProductCategoryListFlyout({
  isCategoryListOpen,
  closeFlyout,
  onAddCategoryClick,
}: ProductCategoryListFlyoutProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isCategoryListOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Product Category"
      headingRightComponent={
        <div>
          <Button
            onClick={onAddCategoryClick}
            className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
          >
            <CirclePlus size={20} color={colors.sec} />
            Add Product Category
          </Button>
        </div>
      }
      primaryBtnText="Save Changes"
      showButtons={false}
    >
      <CategoryList closeFlyout={closeFlyout} />
    </FlyoutLayout>
  );
}

export default ProductCategoryListFlyout;
