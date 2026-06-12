import { AddSupplier } from "@/assets/svg";
import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import React from "react";

interface SuppliersPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  // handleAddSupplier: () => void;
  onCreateSupplier: () => void;
  onAddSupplier: () => void;
}
const SuppliersPageHeader = ({
  activeIndex,
  setActiveIndex,
  // handleAddSupplier,
  onCreateSupplier,
  onAddSupplier,
}: SuppliersPageHeaderProps) => {
  const { activeBusiness } = useDashboardSelector();

  const btnTexts = [
    { label: "Suppliers" },
    { label: "Purchase Order History" },
  ];

  return (
    <div className="pt-8 px-10">
      <Typography className="text-xs text-[#6F6F6F]">
        {activeBusiness?.business_name || "Kola Market"} /
        <span className={"text-[#101828] font-medium"}>Suppliers</span>
      </Typography>
      <div className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="text-base font-semibold text-[#101828]">
          {btnTexts[activeIndex].label.split(" ")[0]}
        </Typography>
        <UIGuard permission="CREATE_SUPPLIER">
          <div className="flex items-center flex-wrap gap-4">
            <button
              className="flex items-center justify-center gap-2 text-sm text-sec"
              onClick={onAddSupplier}
            >
              <CirclePlus size={20} color={colors.sec} />
              Add a supplier
            </button>
          </div>
        </UIGuard>
      </div>
      <div className="flex gap-8 border-b-[1px] border-b-gray_2 -mx-10 px-10">
        {btnTexts.map((btn, index) => {
          return (
            <div
              key={index}
              className={`text-sm p-0 py-2 cursor-pointer ${
                activeIndex === index
                  ? "font-medium text-[#101828] border-b-[#DB8E0A]"
                  : "font-normal text-[#6F6F6F] border-b-transparent"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="text-center">{btn.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuppliersPageHeader;
