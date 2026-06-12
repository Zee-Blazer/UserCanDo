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
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { useShopperSelector } from "@/Redux/selectors";
import ShopperOrderMessage from "../orders/shopperOrderMessage";
import { formatDate, getPaymentStatusStyle } from "@/utils/helpers";
import { useShopper } from "@/context/shopperContext";

interface IOrderDetailsProps {
  selectedOrderId: string;
  isMessageVendor: boolean;
  setIsMessageVendor: (isMessageVendor: boolean) => void;
  isEditOrder: boolean;
  setIsEditOrder: (isEditOrder: boolean) => void;
}

const CreditDetails = ({
  selectedOrderId,
  isMessageVendor,
  setIsMessageVendor,
  isEditOrder,
  setIsEditOrder,
}: IOrderDetailsProps) => {
  const { bnplOrders } = useShopperSelector();
  const { creditPayment, creditPaymentLoading } = useShopper();

  const order = useMemo(() => {
    const selectedOrder = bnplOrders.find(
      (order) => order?.id === selectedOrderId
    );
    return selectedOrder;
  }, [selectedOrderId, bnplOrders]);
  console.log("selected credit", order);
  const [openPopover, setOpenPopover] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

  const handleMessageVendor = async () => {
    setIsMessageVendor(true);
    setOpenPopover(false);
  };

  const getInstallmentPlanType = () => {
    const paymentOption = order?.checkout_items?.payment_option;
    if (paymentOption?.includes("2_weeks")) {
      return "2 Weeks Plan";
    } else if (paymentOption?.includes("4_weeks")) {
      return "4 Weeks Plan";
    }
    return "Installment Plan";
  };

  const isPayNowEnabled = (installment: any, index: number) => {
    const currentDate = new Date();
    const dueDate = new Date(installment?.due_date);

    // If already paid, disable
    if (installment?.status === "paid") return false;

    // If overdue, enable
    if (installment?.status === "overdue" || dueDate < currentDate) return true;

    // For first installment, enable if due date is today or past
    if (index === 0) return dueDate <= currentDate;

    // For subsequent installments, check if previous ones are paid
    const previousInstallments = order?.installments?.slice(0, index) || [];
    const allPreviousPaid = previousInstallments.every(
      (prev) => prev.status === "paid"
    );

    return allPreviousPaid && dueDate <= currentDate;
  };

  const handlePayNow = async (installmentIndex: number) => {
    if (!order?.installments?.[installmentIndex]) return;

    const installmentId = order.installments[installmentIndex].id;

    await creditPayment(installmentId, () => {
      console.log(`Payment initiated for installment ${installmentIndex + 1}`);
    });
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
            <OrderStatusTag status={order?.status} />
          </div>
          <HorizontalDivider color={"#D2D5DA"} />
        </div>
        <div className={`flex flex-row items-center justify-between px-3`}>
          <p className={"text-dark_gray text-[14px] font-[400]"}>
            {formatDate(order.checkout_items?.created_at)}
          </p>
        </div>
        <div className={"flex flex-row items-center gap-2 px-3"}>
          <LocationIcon />
          <p className={"text-black_1 font-[400] text-[12px]"}>
            {order.checkout_items?.delivery_address}
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
      </div>

      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col w-full gap-3"}>
          <div className={"flex flex-row items-center justify-between px-3"}>
            <div className={"flex flex-col gap-1"}>
              <h3 className={"font-[700] text-[14px] text-black_1"}>
                Payment Schedule
              </h3>
              <p className={"text-[12px] text-gray-600 font-[400]"}>
                {getInstallmentPlanType()}
              </p>
            </div>
            <p className={"font-[600] text-[14px] text-black_0"}>
              {order?.installments?.length} installment
              {order?.installments?.length > 1 ? "s" : ""}
            </p>
          </div>
          <HorizontalDivider color={"#D2D5DA"} />
        </div>
        <div className={"flex flex-col gap-3 px-3"}>
          {order?.installments?.map((installment, index) => (
            <div
              key={`installment-${index}`}
              className={
                "flex flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
              }
            >
              <div className={"flex flex-col gap-1"}>
                <p className={"text-black_1 font-[600] text-[14px]"}>
                  Payment {index + 1}
                </p>
                <p className={"text-dark_gray text-[12px] font-[400]"}>
                  Due: {formatDate(installment?.due_date)}
                </p>
              </div>
              <div className={"flex flex-row items-center gap-3"}>
                {/*Hidden when not available */}
                {isPayNowEnabled(installment, index) &&
                  installment.status !== "paid" && (
                    <Button
                      onClick={() => handlePayNow(index)}
                      className="px-3 py-1.5 rounded-md text-[12px] font-[500] bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      loading={creditPaymentLoading}
                    >
                      Pay Now
                    </Button>
                  )}

                <div className={"flex flex-col items-end gap-1"}>
                  <span className={"text-[#B87C16] font-[600] text-[14px]"}>
                    GHS {installment.amount}
                  </span>
                  <span
                    className={`text-[12px] font-[500] capitalize ${getPaymentStatusStyle(
                      installment.status
                    )}`}
                  >
                    {installment.status === "paid"
                      ? "✓ Paid"
                      : installment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"flex flex-col gap-3"}>
          <HorizontalDivider color={"#D2D5DA"} />
          <div className={"flex flex-row items-center justify-between px-3"}>
            <h3 className={"font-[600] text-[14px] text-black_1"}>
              Total Installments
            </h3>
            <span className={"text-[#B87C16] font-semibold"}>
              GHS {order?.total_installments}
            </span>
          </div>
        </div>
      </div>

      {isMessageVendor && (
        <ShopperOrderMessage
          onClose={() => setIsMessageVendor(false)}
          orderId={selectedOrderId}
        />
      )}
    </div>
  );
};

export default CreditDetails;
