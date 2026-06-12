"use client";

import { Typography, Button } from "@material-tailwind/react";
import { Spinner } from "react-activity";
import { useEffect, useState } from "react";
import OrderItemPreview from "./OrderItemPreview";
import { Plus } from "lucide-react";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";
import { TrashModal } from "@/components/General/trashModal";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/shoppers/agents/emptyState";
import { getStatusDisplay } from "@/utils/helpers";

const OrderHistory = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    loadAgentOrderHistoryByRange,
    handleDeleteSpecificOrderHistory,
    isDeletingOrderHistory,
    nextOrderSaleSlide,
    goToOrderSaleSlide,
    orderSaleSlides,
  } = useAgent();

  const { orderHistory, todayOrderHistory, weekOrderHistory } =
    useAgentSelector();

  useEffect(() => {
    loadAgentOrderHistoryByRange();
  }, [loadAgentOrderHistoryByRange]);

  const tabs = ["Today", "This Week", "Past Month"];

  const handleTabChange = (index: number) => {
    setLoading(true);
    setActiveTabIndex(index);
    setTimeout(() => setLoading(false), 1000);
  };

  const orders =
    activeTabIndex === 0
      ? todayOrderHistory
      : activeTabIndex === 1
      ? weekOrderHistory
      : orderHistory;

  const handleDelete = async () => {
    if (orderToDelete) {
      try {
        await handleDeleteSpecificOrderHistory(orderToDelete);
        setIsDeleteDialogOpen(false);
        setOrderToDelete(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleStartNewOrder = () => {
    if (orderSaleSlides && orderSaleSlides?.length > 1) {
      goToOrderSaleSlide(1);
    } else {
      nextOrderSaleSlide();
    }
  };

  const handleOrderClick = (orderId: string) => {
    router.push(`/agent/orders/${orderId}`);
  };

  return (
    <>
      <main>
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <Typography className="text-lg font-medium">Order History</Typography>

          <div className="bg-[#F2F4F7] flex gap-1 md:gap-2 items-center rounded-t-lg p-1 md:p-2 w-full md:w-auto">
            {tabs?.map((label, idx) => (
              <Button
                key={idx}
                className={`flex-1 md:flex-none md:w-fit normal-case px-2 md:px-4 py-2 rounded-lg text-center ${
                  activeTabIndex === idx
                    ? "bg-white shadow-md"
                    : "bg-inherit shadow-none"
                }`}
                onClick={() => handleTabChange(idx)}
              >
                <Typography
                  className={`font-medium text-xs md:text-sm ${
                    activeTabIndex === idx ? "text-[#344054]" : "text-[#667085]"
                  } whitespace-nowrap`}
                >
                  {label}
                </Typography>
              </Button>
            ))}
          </div>
        </header>

        <div className="min-h-[200px] flex justify-center items-center mt-10">
          {loading || (orders && orders?.length > 0) ? (
            <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-t-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] mt-4">
              <Typography className="text-center text-[#5A5555] text-lg font-semibold">
                Order History
              </Typography>

              {loading ? (
                <Spinner className="h-8 w-8 mx-auto my-10" />
              ) : (
                <div className="mt-4 flex flex-col gap-y-8">
                  {orders?.map((order, index) => (
                    <OrderItemPreview
                      key={order.order_id}
                      index={index}
                      onClick={() => handleOrderClick(order.order_id)}
                      business_name={order.customer_name}
                      order_date={
                        order.order_date
                          ? new Date(order.order_date).toLocaleDateString()
                          : "N/A"
                      }
                      products={order.products?.length || 0}
                      status={getStatusDisplay(order?.status)}
                      onDelete={() => {
                        setOrderToDelete(order.order_id);
                        setIsDeleteDialogOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        <TrashModal
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          header="Delete Order From List"
          title="You can't undo this action."
          returnText="Cancel"
          proceedText="Delete"
          warning={true}
          loading={isDeletingOrderHistory}
          onDelete={handleDelete}
        />
      </main>

      <button
        onClick={handleStartNewOrder}
        className="absolute bottom-[10%] right-4 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <Plus color="white" />
      </button>
    </>
  );
};

export default OrderHistory;
