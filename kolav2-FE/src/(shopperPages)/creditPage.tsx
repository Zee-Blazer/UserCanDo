"use client";

import OrderHeader from "@/components/shoppers/orders/orderHeader";
import { useEffect, useState } from "react";
import { TOrderFilter } from "@/types";
import OrderList from "@/components/shoppers/orders/orderList";
import { useShopperSelector } from "@/Redux/selectors";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import CreditList from "@/components/shoppers/credit/creditList";
import CreditDetails from "@/components/shoppers/credit/creditDetails";

const OrderListing = () => {
  const [orderFilter, setOrderFilter] = useState<TOrderFilter>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const { bnplOrders } = useShopperSelector();

  const [isMessageVendor, setIsMessageVendor] = useState(false);
  const [isEditOrder, setIsEditOrder] = useState(false);

  useEffect(() => {
    setSelectedOrderId(bnplOrders[0]?.id);
  }, []);

  const filteredOrders = bnplOrders?.filter((order) => {
    if (orderFilter === "all") return true;
    if (orderFilter === "pending") return order.status === "pending";
    if (orderFilter === "shipped") return order.status === "shipped";
    if (orderFilter === "delivered") return order.status === "delivered";
    if (orderFilter === "cancelled") return order.status === "cancelled";
    return false;
  });

  useEffect(() => {
    if (selectedOrderId && filteredOrders.length > 0) {
      const isSelectedOrderInFiltered = filteredOrders.some(
        (order) => order.id === selectedOrderId
      );

      if (!isSelectedOrderInFiltered) {
        setSelectedOrderId(filteredOrders[0]?.id || "");
      }
    } else if (filteredOrders.length === 0) {
      setSelectedOrderId("");
    }
  }, [orderFilter, filteredOrders, selectedOrderId]);

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowMobileDetails(true);
  };

  const closeMobileDetails = () => {
    setShowMobileDetails(false);
  };

  return (
    <div
      className={`w-full flex flex-col gap-5 ${
        (isEditOrder || isMessageVendor) &&
        "max-h-[calc(100vh-200px)] h-[calc(100vh-200px)] overflow-hidden"
      }`}
    >
      <OrderHeader
        orderFilter={orderFilter}
        setOrderFilter={setOrderFilter}
        title="Credit History"
      />
      <div className="hidden md:grid md:grid-cols-12 gap-10 items-start">
        <CreditList
          orders={filteredOrders}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
        <CreditDetails
          selectedOrderId={selectedOrderId}
          setIsMessageVendor={setIsMessageVendor}
          isMessageVendor={isMessageVendor}
          setIsEditOrder={setIsEditOrder}
          isEditOrder={isEditOrder}
        />
      </div>
      <div className="md:hidden">
        <OrderList
          orders={filteredOrders}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={handleOrderSelect}
        />
      </div>

      <Dialog
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xxl"
        open={showMobileDetails && window.innerWidth < 768}
        handler={closeMobileDetails}
        className="relative p-2 md:hidden max-h-[90vh] overflow-hidden"
      >
        <DialogHeader className="relative m-0 block p-4">
          <Typography className="text-lg font-medium">Order Details</Typography>
          <IconButton
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={closeMobileDetails}
          >
            <X className="h-5 w-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody className="p-0 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-2">
            <CreditDetails
              selectedOrderId={selectedOrderId}
              setIsMessageVendor={setIsMessageVendor}
              isMessageVendor={isMessageVendor}
              setIsEditOrder={setIsEditOrder}
              isEditOrder={isEditOrder}
            />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default OrderListing;
