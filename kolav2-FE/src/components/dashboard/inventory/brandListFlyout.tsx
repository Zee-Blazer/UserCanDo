import FlyoutLayout from "@/components/General/flyoutLayout";
import BrandList from "./brandList";
import { Button } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import { colors } from "@/constants/colors";

interface BrandListFlyoutProps {
  isBrandListOpen: boolean;
  closeFlyout: () => void;
  onAddBrandClick: () => void;
}

function BrandListFlyout({
  isBrandListOpen,
  closeFlyout,
  onAddBrandClick,
}: BrandListFlyoutProps) {
  const handleAddBrandClick = () => {
    closeFlyout();
    onAddBrandClick();
  };

  return (
    <FlyoutLayout
      isRightDrawerOpen={isBrandListOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="Add New Brand"
      primaryBtnText="Save Changes"
      headingRightComponent={
        <Button
          onClick={handleAddBrandClick}
          className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
        >
          <CirclePlus size={20} color={colors.sec} />
          Add New Brand
        </Button>
      }
      showButtons={false}
    >
      <BrandList />
    </FlyoutLayout>
  );
}

export default BrandListFlyout;
