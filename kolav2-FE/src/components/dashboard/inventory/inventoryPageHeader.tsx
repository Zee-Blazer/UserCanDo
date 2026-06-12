import { UploadGray } from "@/assets/svg";
import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

interface InventoryPageHeaderProps {
  onAddProduct: () => void;
}

const InventoryPageHeader = ({ onAddProduct }: InventoryPageHeaderProps) => {
  const { activeBusiness } = useDashboardSelector();

  return (
    <div className="px-4 py-3">
      <Typography>
        {activeBusiness?.business_name || "Kola Market"} /{" "}
        <span className="font-medium text-black">Inventory</span>{" "}
      </Typography>
      <div className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="font-bold">Inventory</Typography>
        <UIGuard permission="CREATE_PRODUCT">
          <div className="flex items-center flex-wrap gap-4">
            <Button
              onClick={onAddProduct}
              className="flex items-center justify-center normal-case gap-1 text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
            >
              <CirclePlus size={20} color={colors.sec} />
              Add Product
            </Button>
            <Link href={ROUTES.inventoryBulkUpload}>
              <Button className="flex items-center justify-center normal-case gap-1 text-gray_4 bg-transparent font-normal shadow-none p-0 hover:shadow-none">
                <UploadGray />
                Bulk Upload
              </Button>
            </Link>
          </div>
        </UIGuard>
      </div>
    </div>
  );
};

export default InventoryPageHeader;
