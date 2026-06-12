import Image from "next/image";
import crunch from "@/assets/images/crunch.png";
import { Typography, IconButton } from "@material-tailwind/react";
import { PencilSimple, Trash } from "@phosphor-icons/react";

const CreditProductTab = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-x-2">
        <Image
          src={crunch}
          alt="image of product"
          className="bg-[#F9FAFB] py-4 px-6  "
        />
        <div className="flex flex-col gap-y-1 pt-1">
          <Typography className="font-inter text-sm font-bold w-[70%]">
            Catalina Crunch{" "}
            <span className="text-xs font-normal">
              Peanut Butter Sandwich Cookies
            </span>
          </Typography>
          <Typography className="text-xs font-semibold text-[#6D7280]">
            Qty: 12 <span className="font-normal">/ 4kg (Small)</span>
          </Typography>
          <Typography className="font-semibold text-base text-[#B87C16] pt-1 ">
            GHS 45<span className="text-[10px]">.99</span>
          </Typography>
        </div>
      </div>
      <div className="flex items-center self-start">
        <IconButton variant="text">
          <PencilSimple size={16} color="#6D7280" />
        </IconButton>
        <IconButton variant="text">
          <Trash size={16} color="#6D7280" />
        </IconButton>
      </div>
    </div>
  );
};

export default CreditProductTab;
