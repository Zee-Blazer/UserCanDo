import { DeliveryBus, GiftBox, ThumbsDown, ThumbsUp } from "@/assets/svg";
import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import UpdateStatus from "./modals/updateStatus";
import { getStatusDisplay, getStatusStyle } from "@/utils/helpers";
import UpdateStatusModal from "./modals/updateStatus";

interface OrderStatusProps {
  orderData: any;
  closeFlyout: () => void;
}

const OrderStatus = ({ orderData, closeFlyout }: OrderStatusProps) => {
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<string>("");

  const getCurrentStatus = () => {
    if (!orderData?.status_history || orderData?.status_history.length === 0) {
      return null;
    }

    const sortedHistory = [...orderData.status_history].sort(
      (a, b) =>
        new Date(b?.created_at).getTime() - new Date(a?.created_at)?.getTime()
    );

    return sortedHistory[0]?.status;
  };

  const currentStatus = getCurrentStatus();

  const handleStatusChange = (newStatus: string) => {
    setTargetStatus(newStatus);
    setIsUpdateStatusOpen(true);
  };

  const renderActionButtons = () => {
    if (!currentStatus || currentStatus?.toLowerCase() === "pending") {
      return (
        <>
          <Button
            onClick={() => handleStatusChange("approved")}
            className="border normal-case gap-1 p-2 items-center flex shadow-none bg-[#027A48]"
          >
            <ThumbsUp />
            <Typography className="font-normal text-sm text-white">
              Approve
            </Typography>
          </Button>
          <Button
            onClick={() => handleStatusChange("rejected")}
            variant="outlined"
            className="bg-none border normal-case gap-1 p-2 items-center flex border-[#F7E9E8] shadow-none"
          >
            <ThumbsDown />
            <span className="font-normal text-sm text-[#B42318]">Reject</span>
          </Button>
        </>
      );
    } else if (currentStatus?.toLowerCase() === "approved") {
      return (
        <Button
          onClick={() => handleStatusChange("out for delivery")}
          className="normal-case gap-2 p-2 items-center flex shadow-none bg-inherit border border-gray_2"
        >
          <DeliveryBus />
          <Typography className="text-gray_7 font-medium">
            Out for Delivery
          </Typography>
        </Button>
      );
    } else if (currentStatus?.toLowerCase() === "out for delivery") {
      return (
        <Button
          onClick={() => handleStatusChange("delivered")}
          className="border normal-case gap-1 p-2 items-center flex shadow-none bg-[#027A48]"
        >
          <GiftBox color="white" />
          <Typography className="font-normal  text-white">
            Set as Delivered
          </Typography>
        </Button>
      );
    } else if (currentStatus?.toLowerCase() === "delivered") {
      return (
        <Button
          onClick={() => handleStatusChange("refunded")}
          variant="outlined"
          className="bg-none border normal-case gap-1 p-2 items-center flex border-[#F7E9E8] shadow-none"
        >
          <GiftBox color="#B42318" />
          <Typography className="font-normal text-[#B42318]">Refund</Typography>
        </Button>
      );
    }

    return null;
  };

  return (
    <main className="flex gap-4 items-center">
      <div
        className={`rounded-md p-2 font-semibold ${getStatusStyle(
          currentStatus
        )}`}
      >
        {getStatusDisplay(currentStatus)}
      </div>
      {renderActionButtons()}
      {/* <UpdateStatusModal
        isOpen={isUpdateStatusOpen}
        onClose={() => setIsUpdateStatusOpen(false)}
        orderData={orderData}
        targetStatus={targetStatus}
        closeFlyout={closeFlyout}
      /> */}
    </main>
  );
};

export default OrderStatus;
