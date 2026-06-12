"use client";

import { useState } from "react";
import FlyoutLayout from "@/components/General/flyoutLayout";
import StatusUpdateForm from "./StatusUpdateForm";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from '@/Redux/selectors';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/constants/routes";

interface Props {
    setActiveFlyer: React.Dispatch<React.SetStateAction<string>>;
    status: "approved" | "out for delivery" | "delivered" | "cancelled";
    onStatusUpdate?: (newStatus?: string) => Promise<void>;
}

const StatusUpdateFlyout = ({ setActiveFlyer, status, onStatusUpdate }: Props) => {
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(true);
  const router = useRouter();
  const [statusDate, setStatusDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleChangeOrderStatus, refreshAllOrdersData } = useDash();
  const { activeOrderStatus } = useDashboardSelector();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          title: "Approve Order",
          heading: "Approved",
          dateLabel: "Approval Date"
        };
      case "out for delivery":
        return {
          title: "Mark Out for Delivery",
          heading: "Out for Delivery",
          dateLabel: "Delivery Start Date"
        };
      case "delivered":
        return {
          title: "Mark as Delivered",
          heading: "Delivered",
          dateLabel: "Delivery Date"
        };
      case "cancelled":
        return {
          title: "Cancel Order",
          heading: "Cancelled",
          dateLabel: "Cancellation Date"
        };
      default:
        return {
          title: "Update Status",
          heading: "Update Status",
          dateLabel: "Status Date"
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const closeFlyout = () => {
    setIsRightDrawerOpen(false);
    setActiveFlyer("");
  };

  const handleUpdateStatus = async () => {
    if (!statusDate) {
      return;
    }

    if (!activeOrderStatus?.id) {
      return;
    }

    setIsLoading(true);
    try {
      await handleChangeOrderStatus(
        activeOrderStatus.id.toString(),
        status,
        statusDate,
        ""
      );
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await refreshAllOrdersData();
      
      if (onStatusUpdate) {
        await onStatusUpdate(status);
      }
      
      window.dispatchEvent(new CustomEvent('orderStatusUpdated', {
        detail: { 
          orderId: activeOrderStatus.id, 
          newStatus: status,
          statusDate: statusDate
        }
      }));
      
      closeFlyout();
      
    } catch (error) {
    } finally {
      setIsLoading(false);
      router.push(ROUTES.orders);
    }
  };

  return (
    <div>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading={statusConfig.heading}
        showButtons={false}
      >
        <StatusUpdateForm
          statusConfig={statusConfig}
          statusDate={statusDate}
          setStatusDate={setStatusDate}
          handleUpdateStatus={handleUpdateStatus}
          isLoading={isLoading}
        />
      </FlyoutLayout>
    </div>
  );
};

export default StatusUpdateFlyout;
