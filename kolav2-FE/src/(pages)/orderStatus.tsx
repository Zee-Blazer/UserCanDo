"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import { Typography, Button } from "@material-tailwind/react";
import OrderDetailsStatus from "@/components/dashboard/orders/orderDetailsStatus";
import OrdersInfoStatus from "@/components/dashboard/orders/ordersInfoStatus";
import SetOrderStatus from "@/components/dashboard/orders/setOrderStatus";
import DocumentOrderStatus from "@/components/dashboard/orders/documentOrderStatus";
import RecordCostFlyout from "@/components/dashboard/orders/recordCostFlyout";
import { useDashboardSelector } from "@/Redux/selectors";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDash } from "@/context/dashboardContext";

const OrderStatusPage = () => {
  const router = useRouter();
  const { activeOrderStatus } = useDashboardSelector();
  const [activeFlyer, setActiveFlyer] = useState("");
  const { refreshAllOrdersData } = useDash();

  // Listen for order status updates to refresh current order data
  useEffect(() => {
    const handleOrderStatusUpdate = async (event: any) => {
      const { orderId } = event.detail || {};
      if (orderId === activeOrderStatus?.id) {
        try {
          await refreshAllOrdersData();
        } catch (error) {
          console.error('Error refreshing order data:', error);
        }
      }
    };

    window.addEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    
    return () => {
      window.removeEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    };
  }, [activeOrderStatus?.id, refreshAllOrdersData]);

  if (!activeOrderStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Typography className="text-gray-500 mb-4">
            No order selected
          </Typography>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const rawStatus =
    activeOrderStatus?.status_history?.[0]?.status?.toLowerCase() || "pending";

  const mapStatusToDisplay = (apiStatus: string) => {
    switch (apiStatus.toLowerCase()) {
      case "pending":
        return "awaiting approval";
      case "approved":
        return "approved";
      case "out for delivery":
        return "out for delivery";
      case "delivered":
        return "delivered";
      case "cancelled":
        return "cancelled";
      case "declined":
        return "declined";
      case "refunded":
        return "refunded";
      default:
        return "awaiting approval";
    }
  };

  const status = mapStatusToDisplay(rawStatus);

  const className =
    status === "approved"
      ? "text-green-600 bg-[#ECFDF3]"
      : status === "awaiting approval"
      ? "text-[#6941C6] bg-[#F0EBF9]"
      : status === "cancelled"
      ? "text-red-600 bg-[#FFF6ED]"
      : status === "declined"
      ? "text-red-600 bg-[#FFF6ED]"
      : status === "out for delivery"
      ? "text-[#DF7405] bg-[#FCECDC]"
      : status === "delivered"
      ? "text-[#365FB6] bg-[#D1E0FF]"
      : status === "refunded"
      ? "text-[#6941C6] bg-[#F0EBF9]"
      : "text-gray-500";

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <ArrowLeft
            className="mr-4 cursor-pointer hover:opacity-65 transition"
            onClick={() => router.back()}
          />
          <Typography className="text-[#101828] text-2xl font-semibold mr-3">
            Order Details -{" "}
            {activeOrderStatus?.order_number || activeOrderStatus?.id || "N/A"}
          </Typography>
          <Typography
            className={`text-xs py-1 px-2 rounded font-medium capitalize ${className}`}
          >
            {status || "Unknown"}
          </Typography>
        </div>

        <div className="flex items-center gap-4">
          {
            status === "approved" && !activeOrderStatus?.costs_recorded && (
              <Button
                className="text-[#003366] border-2 rounded-lg border-[#003366] cursor-pointer text-xs font-medium"
                onClick={() => setActiveFlyer("recordCost")}
              >
                Record Cost
              </Button>
            )
          }
          <div className="bg-[#F8FAFB] cursor-pointer p-2 rounded-full hover:opacity-65 transition">
            <Pencil className="text-[#6F6F6F]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <OrderDetailsStatus />
          <OrdersInfoStatus />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SetOrderStatus activeStatus={status} />
          <DocumentOrderStatus />
        </div>
      </div>

      {activeFlyer === "recordCost" && (
        <RecordCostFlyout setActiveFlyer={setActiveFlyer} />
      )}
    </div>
  );
};

export default OrderStatusPage;
