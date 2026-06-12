// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogBody,
//   DialogFooter,
//   DialogHeader,
//   IconButton,
//   Textarea,
//   Typography,
// } from "@material-tailwind/react";
// import { X } from "lucide-react";
// import { FormInput, FormSelect } from "@/components/General/form";
// import { useDash } from "@/context/dashboardContext";
// import { initialAgentRequestStatus } from "@/utils/initialStates";
// import { getCurrentAgentRequestStatus } from "@/utils/helpers";

// interface UpdateStatusModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   agentRequestData: AgentRequestProps;
//   preselectedStatus?: string;
// }

// export function UpdateStatusModal({
//   isOpen,
//   onClose,
//   agentRequestData,
//   preselectedStatus = "",
// }: UpdateStatusModalProps) {
//   const { handleUpdateAgentRequestStatus, isAgentRequestStatusEditing } =
//     useDash();

//   const [statusInputs, setStatusInputs] =
//     useState<UpdateAgentRequestStatusProps>(initialAgentRequestStatus);

//   const statusOptions = [
//     "pending",
//     "placed",
//     "approved",
//     "rejected",
//     "delivered",
//     "completed",
//   ];
//   const currentStatus = getCurrentAgentRequestStatus(
//     agentRequestData?.request_history || []
//   );

//   useEffect(() => {
//     if (agentRequestData) {
//       setStatusInputs({
//         id: agentRequestData.id,
//         status: preselectedStatus || currentStatus || "pending",
//         request_date: new Date().toISOString().split("T")[0],
//         comment: "",
//       });
//     }
//   }, [agentRequestData, preselectedStatus, isOpen]);

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setStatusInputs((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     handleUpdateAgentRequestStatus(statusInputs, () => {
//       onClose();
//       setStatusInputs(initialAgentRequestStatus);
//     });
//   };

//   return (
//     <Dialog
//       animate={{
//         mount: { scale: 1, y: 0 },
//         unmount: { scale: 0.9, y: -100 },
//       }}
//       size="md"
//       open={isOpen}
//       handler={onClose}
//       className="relative p-5"
//     >
//       <form onSubmit={handleSubmit}>
//         <DialogHeader className="relative m-0 block">
//           <Typography className="text-xl font-medium">Update Status</Typography>
//           <IconButton
//             variant="text"
//             className="!absolute right-3.5 top-3.5"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5" />
//           </IconButton>
//         </DialogHeader>

//         <DialogBody>
//           <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 w-full">
//             <label className="text-sm font-medium text-[#101828] self-center">
//               Update Status
//             </label>
//             <div className="w-full">
//               <FormSelect
//                 name="status"
//                 value={statusInputs.status}
//                 onChange={handleInputChange}
//                 options={statusOptions}
//                 className="w-full"
//                 paddingY="3"
//               />
//             </div>

//             <label className="text-sm font-medium text-[#101828] self-center">
//               Request Date
//             </label>
//             <div className="w-full">
//               <FormInput
//                 name="request_date"
//                 value={statusInputs.request_date}
//                 onChange={handleInputChange}
//                 type="date"
//                 className="bg-inherit w-full"
//                 paddingY="3"
//               />
//             </div>

//             <div className="col-span-2 flex flex-col gap-4">
//               <label className="text-sm font-medium text-black">Comment</label>
//               <Textarea
//                 name="comment"
//                 value={statusInputs.comment}
//                 onChange={handleInputChange}
//                 size="lg"
//                 className="border w-full border-gray-300 min-h-[130px]"
//                 placeholder="Add a comment about this status update"
//               />
//             </div>
//           </div>
//         </DialogBody>

//         <DialogFooter className="flex justify-end gap-4 mt-4">
//           <Button
//             type="submit"
//             disabled={isAgentRequestStatusEditing}
//             className="bg-pry2 normal-case text-white font-normal text-sm px-4 py-3 rounded-lg shadow-sm"
//           >
//             {isAgentRequestStatusEditing ? "Updating..." : "Change Status"}
//           </Button>
//           <Button
//             type="button"
//             onClick={onClose}
//             className="bg-white text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2"
//           >
//             <X className="h-5 w-5" />
//             Close
//           </Button>
//         </DialogFooter>
//       </form>
//     </Dialog>
//   );
// }

// export default UpdateStatusModal;

import { Pencil } from "@/assets/svg";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { formatDate, formatTime } from "@/utils/helpers";
import UpdateHistory from "./updateHistory";

interface StatusHistoryProps {
  orderData: any;
  onClose: () => void;
}

const StatusHistory = ({ orderData, onClose }: StatusHistoryProps) => {
  const [isUpdateHistoryOpen, setIsUpdateHistoryOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const statusHistory = orderData?.request_history || [];

  const sortedStatusHistory = [...statusHistory].sort(
    (a, b) =>
      new Date(a?.created_at)?.getTime() - new Date(b?.created_at)?.getTime()
  );

  const currentStatus =
    sortedStatusHistory?.length > 0
      ? sortedStatusHistory[sortedStatusHistory?.length - 1]?.status
      : "";

  const statusOrder = [
    "pending",
    "approved",
    "out for delivery",
    "delivered",
    "refunded",
  ];
  const currentStatusIndex = statusOrder?.indexOf(currentStatus);

  // Find status objects for each stage
  const pendingStatus =
    sortedStatusHistory.find((status) => status?.status === "pending") || null;
  const approvedStatus =
    sortedStatusHistory.find((status) => status?.status === "approved") || null;
  const outForDeliveryStatus =
    sortedStatusHistory?.find(
      (status) => status.status === "out for delivery"
    ) || null;
  const deliveredStatus =
    sortedStatusHistory?.find((status) => status?.status === "delivered") ||
    null;
  const refundedStatus =
    sortedStatusHistory?.find((status) => status?.status === "refunded") ||
    null;

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

  // Helper function to get date display for a status
  const getStatusDateDisplay = (statusObj: any) => {
    if (!statusObj) return "N/A";

    const dateToUse = statusObj.status_date || statusObj.created_at;
    if (!dateToUse) return "N/A";

    return `${formatDate(dateToUse)} at ${formatTime(dateToUse)}`;
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

          {/* Order Placed */}
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
                  {getStatusDateDisplay(pendingStatus)}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {pendingStatus?.comment || "Order Placed - Default"}
                </Typography>
              </div>
              {pendingStatus && (
                <Button
                  type="button"
                  className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
                  onClick={() => handleOpenUpdateModal(pendingStatus)}
                >
                  <Pencil color="#003366" />
                  Update
                </Button>
              )}
            </div>
          </li>

          {/* Approved */}
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
                  {getStatusDateDisplay(approvedStatus)}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {approvedStatus?.comment || "Approved - Default"}
                </Typography>
              </div>
              {isCompleted("approved") && approvedStatus && (
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

          {/* Out for Delivery */}
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
                  {getStatusDateDisplay(outForDeliveryStatus)}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {outForDeliveryStatus?.comment ||
                    "Out for Delivery - Default"}
                </Typography>
              </div>
              {isCompleted("out for delivery") && outForDeliveryStatus && (
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

          {/* Delivered */}
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
                  {getStatusDateDisplay(deliveredStatus)}
                </Typography>
                <Typography className="block text-[#6F6F6F]">
                  {deliveredStatus?.comment || "Delivered - Default"}
                </Typography>
              </div>
              {isCompleted("delivered") && deliveredStatus && (
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

          {/* Refunded - Only show if refunded */}
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
                    {getStatusDateDisplay(refundedStatus)}
                  </Typography>
                  <Typography className="block text-[#6F6F6F]">
                    {refundedStatus?.comment || "Refunded - Default"}
                  </Typography>
                </div>
                {isCompleted("refunded") && refundedStatus && (
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
