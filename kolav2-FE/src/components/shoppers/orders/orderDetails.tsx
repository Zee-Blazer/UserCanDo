import React, { useMemo, useState } from "react";
import {
  CancelIcon,
  ChevronRightIcon,
  LocationIcon,
  MessageIcon,
  OptionsIcon,
} from "@/assets/svg";
import OrderStatusTag from "@/components/shoppers/orders/orderStatusTag";
import { HorizontalDivider } from "@/components/General/divider";
import OrderItemCard from "@/components/shoppers/orders/orderItemCard";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useShopperSelector } from "@/Redux/selectors";
import ShopperOrderMessage from "./shopperOrderMessage";

interface IOrderDetailsProps {
  selectedOrderId: string;
  isMessageVendor: boolean;
  setIsMessageVendor: (isMessageVendor: boolean) => void;
  isEditOrder: boolean;
  setIsEditOrder: (isEditOrder: boolean) => void;
}
//ORDER COMPONENT
const OrderDetails = ({
  selectedOrderId,
  isMessageVendor,
  setIsMessageVendor,
  isEditOrder,
  setIsEditOrder,
}: IOrderDetailsProps) => {
  const { orders } = useShopperSelector();
  const order = useMemo(() => {
    const selectedOrder = orders.find((order) => order.id === selectedOrderId);
    return selectedOrder;
  }, [selectedOrderId, orders]);
  const [openPopover, setOpenPopover] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleMessageVendor = async () => {
    setIsMessageVendor(true);
    setOpenPopover(false);
  };

  if (!selectedOrderId) {
    return (
      <div className="md:col-span-7 self-start p-5 border-[1px] border-solid border-[#EDEEF0] rounded-[20px] flex flex-col gap-4">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-[16px] font-[400] text-center">
            Please click on an order to see the details
          </p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="md:col-span-7 self-start p-5 border-[1px] border-solid border-[#EDEEF0] rounded-[20px] flex flex-col gap-4">
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-[16px] font-[400] text-center">
            Order not found
          </p>
        </div>
      </div>
    );
  }

  const itemsToDisplay = showAllItems
    ? order.order_items
    : order.order_items.slice(0, 3);

  return (
    <div
      className={
        "md:col-span-7 p-5 border-[1px] border-solid border-[#EDEEF0] rounded-[20px] flex flex-col gap-4"
      }
    >
      <div className={"flex flex-col gap-4 px-3"}>
        <div className={"flex flex-row items-center justify-between"}>
          <h2 className={"text-[18px] text-black_0 font-[600]"}>
            Order ID: #{order?.id}
          </h2>
          <Popover
            open={openPopover}
            handler={() => setOpenPopover(!openPopover)}
            placement="bottom-end"
          >
            <PopoverHandler>
              <button title="options_icon" type="button">
                <OptionsIcon />
              </button>
            </PopoverHandler>
            <PopoverContent className="flex flex-col p-0">
              <button
                className={"flex flex-row items-center px-4 pt-2.5 pb-2 gap-2"}
                onClick={handleMessageVendor}
              >
                <MessageIcon />
                <span className={"text-black_0 text-[14px] font-[400]"}>
                  Message vendor
                </span>
              </button>
              <HorizontalDivider color={"#F9FAFB"} />
              <button
                className={"flex flex-row items-center px-4 pb-2.5 pt-2 gap-2"}
                onClick={() => setCancelModalOpen(true)}
              >
                <CancelIcon />
                <span className={"text-black_0 text-[14px] font-[400]"}>
                  Cancel order
                </span>
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col w-full gap-3"}>
          <div className={"flex flex-row items-center justify-between px-3"}>
            <h3 className={"font-[700] text-[14px] text-black_1"}>
              Order status
            </h3>
            <OrderStatusTag status={order.status} />
          </div>
          <HorizontalDivider color={"#D2D5DA"} />
        </div>
        <div className={`flex flex-row items-center justify-between px-3`}>
          <p className={"text-dark_gray text-[14px] font-[400]"}>
            {order.checkout_items.created_at}
          </p>
        </div>
        <div className={"flex flex-row items-center gap-2 px-3"}>
          <LocationIcon />
          <p className={"text-black_1 font-[400] text-[12px]"}>
            {order.checkout_items.delivery_address}
          </p>
        </div>
      </div>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col w-full gap-3"}>
          <div className={"flex flex-row items-center justify-between px-3"}>
            <h3 className={"font-[700] text-[14px] text-black_1"}>
              Order details
            </h3>
            <p className={"font-[600] text-[14px] text-black_0"}>
              {order?.order_items.length} item
              {order?.order_items?.length > 1 ? "s" : ""}
            </p>
          </div>
          <HorizontalDivider color={"#D2D5DA"} />
        </div>
        <div className={"flex flex-col gap-3 px-3"}>
          <div className={"flex flex-col w-full gap-3"}>
            {itemsToDisplay.map((item, index) => (
              <OrderItemCard
                key={`item--${index}`}
                item={item}
                setIsEditOrder={setIsEditOrder}
              />
            ))}
          </div>
          {order.order_items.length > 3 && (
            <div className={"w-full flex flex-row justify-center items-center"}>
              <button
                className={
                  "text-blue_pry font-[600] flex flex-row items-center"
                }
                onClick={() => setShowAllItems(!showAllItems)}
              >
                {showAllItems ? "Show Less" : "View All"} <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>
        <div className={"flex flex-col gap-3"}>
          <HorizontalDivider color={"#D2D5DA"} />
          <div className={"flex flex-row items-center justify-between px-3"}>
            <h3 className={"font-[600] text-[14px] text-black_1"}>
              Total cost
            </h3>
            <span className={"text-[#B87C16] font-semibold"}>
              GHS {order?.total_price}
            </span>
          </div>
        </div>
        {/* <OrderTracker orderUpdate={order?.orderUpdate} /> */}
      </div>

      {/* <TrashModal
        isOpen={cancelModalOpen}
        title={`Confirm that you want to cancel the order with the ID #${order.id}, with ${order.storeName} and 2 others?`}
        header={"Are you sure you want to cancel this order?"}
        onClose={() => setCancelModalOpen((prev) => !prev)}
        returnText={"No, please"}
        proceedText={"Yes, cancel"}
      /> */}
      {isMessageVendor && (
        <ShopperOrderMessage
          onClose={() => setIsMessageVendor(false)}
          orderId={selectedOrderId}
        />
      )}

      {/* {isEditOrder && (
        <EditOrder
          selectedOrderId={selectedOrderId}
          setIsEditOrder={setIsEditOrder}
        />
      )} */}
    </div>
  );
};

export default OrderDetails;
