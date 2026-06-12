import { Pencil } from "@/assets/svg";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import UpdateHistory from "./modals/updateHistory";
import { formatDate, formatTime } from "@/utils/helpers";

interface StatusHistoryProps {
  orderData: any;
  onClose: () => void;
}

const StatusHistory = ({ orderData, onClose }: StatusHistoryProps) => {
  const [isUpdateHistoryOpen, setIsUpdateHistoryOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const sortedStatusHistory = [...orderData?.status_history].sort(
    (a, b) =>
      new Date(a?.created_at)?.getTime() - new Date(b?.created_at)?.getTime()
  );

  const currentStatus =
    sortedStatusHistory.length > 0
      ? sortedStatusHistory[sortedStatusHistory.length - 1].status
      : "";

  const statusOrder = [
    "pending",
    "approved",
    "out for delivery",
    "delivered",
    "refunded",
  ];
  const currentStatusIndex = statusOrder?.indexOf(currentStatus);

  const pendingStatus =
    sortedStatusHistory.find((status) => status?.status === "pending") || {};
  const approvedStatus =
    sortedStatusHistory.find((status) => status?.status === "approved") || {};
  const outForDeliveryStatus =
    sortedStatusHistory?.find(
      (status) => status.status === "out for delivery"
    ) || {};
  const deliveredStatus =
    sortedStatusHistory?.find((status) => status?.status === "delivered") || {};
  const refundedStatus =
    sortedStatusHistory?.find((status) => status?.status === "refunded") || {};

  const isCompleted = (statusName: string) => {
    const index = statusOrder?.indexOf(statusName);
    return index <= currentStatusIndex && currentStatusIndex >= 0;
  };

  const isDelivered = currentStatus === "delivered";
  const isRefunded = currentStatus === "refunded";

  const handleOpenUpdateModal = (statusData: any) => {
    setSelectedStatus(statusData);
    setIsUpdateHistoryOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateHistoryOpen(false);
    setSelectedStatus(null);
  };

  return (
    <main>
      <nav className="relative">
        <ul className="list-none pl-12 relative">
          <div
            className={`absolute w-[2px] ${
              isDelivered || isRefunded ? "bg-red-500" : "bg-[#E9EEF2]"
            } left-5 top-10 bottom-10 -z-10`}
            aria-hidden="true"
          />

          <li className="py-4 min-h-[80px] relative">
            <div className="flex justify-between items-start w-full">
              <div className="relative flex flex-col gap-2">
                <span
                  className={`absolute w-5 h-5 left-[-39px] top-1 rounded-full flex-shrink-0 ${
                    isCompleted("pending") ? "bg-red-500" : "bg-[#E9EEF2]"
                  }`}
                />
                <Typography className="text-black text-lg font-normal block">
                  Order Placed
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus.created_at
                    ? `${formatDate(pendingStatus.created_at)} at ${formatTime(
                        pendingStatus.created_at
                      )}`
                    : "N/A"}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus?.comment || "Order Placed - Default"}
                </Typography>
              </div>
              <Button
                type="button"
                className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                onClick={() => handleOpenUpdateModal(pendingStatus)}
              >
                <Pencil color="#003366" />
                Update
              </Button>
            </div>
          </li>

          <li className="py-6 min-h-[100px] -mt-4 relative">
            <div className="flex justify-between items-start w-full">
              <div className="relative flex flex-col gap-3">
                <span
                  className={`absolute w-5 h-5 left-[-39px] top-1 rounded-full flex-shrink-0 ${
                    isCompleted("approved") ? "bg-red-500" : "bg-[#E9EEF2]"
                  }`}
                />
                <Typography className="text-black text-lg font-normal block">
                  Approved
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus.created_at
                    ? `${formatDate(pendingStatus.created_at)} at ${formatTime(
                        pendingStatus.created_at
                      )}`
                    : "N/A"}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {approvedStatus.comment || "Approved - Default"}
                </Typography>
              </div>
              {isCompleted("approved") && (
                <Button
                  type="button"
                  className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                  onClick={() => handleOpenUpdateModal(approvedStatus)}
                >
                  <Pencil color="#003366" />
                  Update
                </Button>
              )}
            </div>
          </li>

          <li className="py-6 min-h-[100px] relative">
            <div className="flex justify-between items-start w-full">
              <div className="relative flex flex-col gap-3">
                <span
                  className={`absolute w-5 h-5 left-[-39px] top-1 rounded-full flex-shrink-0 ${
                    isCompleted("out for delivery")
                      ? "bg-red-500"
                      : "bg-[#E9EEF2]"
                  }`}
                />
                <Typography className="text-black text-lg font-normal block">
                  Out for Delivery
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus.created_at
                    ? `${formatDate(pendingStatus.created_at)} at ${formatTime(
                        pendingStatus.created_at
                      )}`
                    : "N/A"}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {outForDeliveryStatus.comment || "Out for Delivery - Default"}
                </Typography>
              </div>
              {isCompleted("out for delivery") && (
                <Button
                  type="button"
                  className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                  onClick={() => handleOpenUpdateModal(outForDeliveryStatus)}
                >
                  <Pencil color="#003366" />
                  Update
                </Button>
              )}
            </div>
          </li>

          <li className="pt-6 min-h-[80px] relative">
            <div className="flex justify-between items-start w-full">
              <div className="relative flex flex-col gap-3">
                <span
                  className={`absolute w-5 h-5 left-[-39px] top-1 rounded-full flex-shrink-0 ${
                    isCompleted("delivered") ? "bg-red-500" : "bg-[#E9EEF2]"
                  }`}
                />
                <Typography className="text-black text-lg font-normal block">
                  Delivered
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus.created_at
                    ? `${formatDate(pendingStatus.created_at)} at ${formatTime(
                        pendingStatus.created_at
                      )}`
                    : "N/A"}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {deliveredStatus?.comment || "Delivered - Default"}
                </Typography>
              </div>
              {isCompleted("delivered") && (
                <Button
                  type="button"
                  className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                  onClick={() => handleOpenUpdateModal(deliveredStatus)}
                >
                  <Pencil color="#003366" />
                  Update
                </Button>
              )}
            </div>
          </li>

          {isRefunded && (
            <li className="pt-6 min-h-[80px] relative">
              <div className="flex justify-between items-start w-full">
                <div className="relative flex flex-col gap-3">
                  <span
                    className={`absolute w-5 h-5 left-[-39px] top-1 rounded-full flex-shrink-0 ${
                      isCompleted("refunded") ? "bg-red-500" : "bg-[#E9EEF2]"
                    }`}
                  />
                  <Typography className="text-black text-lg font-normal block">
                    Refunded
                  </Typography>
                  <Typography className="block text-[#6F6F6F]">
                    {pendingStatus.created_at
                      ? `${formatDate(
                          pendingStatus.created_at
                        )} at ${formatTime(pendingStatus.created_at)}`
                      : "N/A"}
                  </Typography>
                  <Typography className="block text-[#6F6F6F]">
                    {refundedStatus.comment || "Refunded - Default"}
                  </Typography>
                </div>
                {isCompleted("refunded") && (
                  <Button
                    type="button"
                    className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                    onClick={() => handleOpenUpdateModal(refundedStatus)}
                  >
                    <Pencil color="#003366" />
                    Update
                  </Button>
                )}
              </div>
            </li>
          )}
        </ul>
      </nav>
      <UpdateHistory
        isOpen={isUpdateHistoryOpen}
        onClose={handleCloseUpdateModal}
        closeFlyout={onClose}
        orderData={orderData}
        selectedStatus={selectedStatus}
      />
    </main>
  );
};

export default StatusHistory;
