import { IOrderItem, OrderItem } from "@/types";
import FormattedPrice from "@/components/shoppers/orders/formattedPrice";
import {
  DecrementIcon,
  DeleteIcon,
  EditIcon,
  IncrementIcon,
} from "@/assets/svg";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface IOrderItemCardProps {
  item: OrderItem;
  setIsEditOrder: (newValue: boolean) => void;
  isEdit?: boolean;
}

const OrderItemCard = ({
  item,
  setIsEditOrder,
  isEdit = false,
}: IOrderItemCardProps) => {
  return (
    <div>
      <div className={"flex flex-row justify-between gap-4"}>
        <div className={"flex flex-row gap-3"}>
          <img
            src={item?.product_image}
            alt={item?.product_name}
            className="h-[96px] w-[96px] rounded-[8px]"
          />
          <div
            className={
              "flex flex-col gap-2 max-w-[240px] h-full justify-between"
            }
          >
            <div className="flex flex-col gap-1">
              <p className={"text-black_0 font-[600] text-[14px]"}>
                {item.product_name}
              </p>
              <p className={"text-dark_gray text-[12px] font-[600]"}>
                Qty: {item.quantity}
              </p>
            </div>
            <span className={"text-[#B87C16] font-semibold"}>
              GHS {item.price}
            </span>
          </div>
        </div>
        {/* The Edit and Delete will be below */}
      </div>
    </div>
  );
};

export default OrderItemCard;
