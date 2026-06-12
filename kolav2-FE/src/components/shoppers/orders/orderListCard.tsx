import { IOrder, Order } from "@/types";
import { HorizontalDivider } from "@/components/General/divider";
import FormattedPrice from "@/components/shoppers/orders/formattedPrice";
import OrderStatusTag from "@/components/shoppers/orders/orderStatusTag";
import { LocationIcon } from "@/assets/svg";
import { formatDate } from "@/utils/helpers";

interface IOrderListCard {
  order: Order;
  selectedOrderId: string;
  setSelectedOrderId: (value: string) => void;
}

const OrderListCard = ({
  order,
  selectedOrderId,
  setSelectedOrderId,
}: IOrderListCard) => {
  return (
    <div
      className={`${
        order.id === selectedOrderId
          ? "bg-[#E0F0FF4D] drop-shadow-sm rounded-[10px]"
          : ""
      } p-3 w-full cursor-pointer flex flex-col gap-2`}
      onClick={() =>
        order?.id !== selectedOrderId ? setSelectedOrderId(order.id) : undefined
      }
    >
      <div className={"w-full flex flex-row items-center justify-between"}>
        <h3 className={"text-[14px] font-[400]"}>
          ID: <span className={"text-black_0 font-[600]"}>#{order.id}</span>
        </h3>
        <OrderStatusTag status={order.status} />
      </div>
      <HorizontalDivider color={"#D2D5DA"} />
      <div className={"flex flex-col gap-2 w-full"}>
        <div
          className={`flex flex-row items-center justify-between font-bold text-[#B87C16]`}
        >
          GHS: {order.total_price}
        </div>
        <div className={"flex flex-row items-center justify-between"}>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row items-center gap-2"}>
              <LocationIcon />
              <p className={"text-black_0 font-[400] text-[14px]"}>
                {order.checkout_items.delivery_address}
              </p>
            </div>
            <div
              className={`flex flex-row items-center gap-1.5 text-blue_pry text-[14px] font-[600]`}
            >
              <p>{formatDate(order.checkout_items.created_at)}</p>
              <div className={"h-[12px] w-[1px] bg-[#D2D5DA]"} />
              <p>
                {order.order_items.length} item
                {order.order_items?.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            className={
              "py-2.5 px-4 rounded-[4px] flex justify-center items-center bg-powder_blue text-pry2 font-[600] text-[12px] shadow-[#007AF53D] shadow-sm"
            }
          >
            View Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
