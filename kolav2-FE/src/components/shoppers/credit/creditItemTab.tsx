import React from "react";
import OrderStatusTag from "@/components/shoppers/orders/orderStatusTag";
import { truncateText } from "@/utils/helpers";
import { MapPin } from "@phosphor-icons/react";
import { Typography, Button } from "@material-tailwind/react";
import { formatAmount } from "@/utils/helpers";

interface CreditItemTabProps {
  order_ID: string;
  status: "pending" | "shipped" | "cancelled";
  store_name: string;
  location: string;
  due_date: string;
  items: number;
  amount: number;
  selected?: boolean;
  onClick: () => void;
}

const CreditItemTab = ({
  order_ID,
  status,
  store_name,
  location,
  due_date,
  items,
  amount,
  selected,
  onClick,
}: CreditItemTabProps) => {
  const { whole, decimal } = formatAmount(amount);

  return (
    <div
      className={` ${
        selected ? "bg-[#E0F0FF4D]" : ""
      } rounded-lg pt-3 pl-3 pr-6 pb-6`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <Typography className="text-sm">
          ID: <span className="font-semibold">{order_ID}</span>
        </Typography>

        <OrderStatusTag width="16" status={status} />
      </div>
      <hr className="border border-1 border-[#D2D5DA] my-4 " />
      <div className="flex justify-between  ">
        <div className="flex flex-col gap-y-3">
          <Typography className="text-sm font-semibold font-inter">
            {store_name}
          </Typography>
          <div className="flex gap-x-1 items-center">
            <MapPin size={16} />
            <Typography className="font-inter text-sm">
              {truncateText(location, 24)}
            </Typography>
          </div>
          <div className="flex items-center gap-x-2">
            <Typography className="text-sm text-red_pry2">
              Due Date: <span className="font-semibold ">{due_date}</span>
            </Typography>
            <div className="h-3/4 py-2 border border-1 border-[#D2D5DA]" />
            <Typography className="text-sm font-semibold text-blue_pry">
              {items} items
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Typography className="font-inter font-bold text-sm text-[#B87C16] ">
            GHS {whole}
            <span className="text-[10px]">.{decimal} </span>
          </Typography>
          <Button className="normal-case bg-[#E0F0FF] text-xs font-semibold text-pry2">
            View Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreditItemTab;
