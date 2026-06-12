"use client";

import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import StatusUpdateFlyout from "./approveStatusFlyout";

const list = [
  "Awaiting approval",
  "Approved",
  "Out for delivery",
  "Delivered",
  "Cancelled",
  "Declined",
  "Partially refunded",
  "Awaiting payment",
  "Partially shipped",
  "Completed",
  "Shipped",
  "Refunded",
  "Disputed",
  "Manual verification required",
  "Partially refunded",
];

interface Props {
  activeStatus: string;
  onStatusUpdate?: (newStatus?: string) => Promise<void>;
}

const SetOrderStatus = ({ activeStatus, onStatusUpdate }: Props) => {
  const [activeFlyer, setActiveFlyer] = useState("");

  const normalizeStatus = (status: string) => {
    return status.toLowerCase().trim();
  };

  const handleClick = (item: string) => {
    const validStatusesForUpdate = [
      "awaiting approval",
      "approved", 
      "out for delivery", 
      "delivered", 
      "cancelled"
    ];
    
    const normalizedClickedItem = normalizeStatus(item);
    const normalizedActiveStatus = normalizeStatus(activeStatus);
    
    if (normalizedClickedItem === normalizedActiveStatus) {
      return;
    }
    
    if (validStatusesForUpdate.includes(normalizedClickedItem)) {
      setActiveFlyer(item);
    }
  };

  return (
    <div className="mb-8">
      <Typography className="uppercase text-base font-inter font-bold mb-4">
        Status
      </Typography>

      <div className="border border-[#DEDFE0] rounded p-6">
        {list.map((item, key) => {
          const isActive = normalizeStatus(item) === normalizeStatus(activeStatus);

          return (
            <div
              key={key}
              className="flex flex-col gap-1 cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <div className="flex justify-between items-center my-2">
                <Typography
                  className={`text-[#7B8086] text-sm font-inter ${
                    isActive ? "font-bold text-[#1B1E21]" : ""
                  }`}
                >
                  {item}
                </Typography>

                {isActive ? (
                  <div className="w-6 h-6 rounded-full border-2 border-[#003366]">
                    <div className="w-4 h-4 bg-[#003366] rounded-full mt-0.5 ml-0.5"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-[#E1E1E8]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Update Flyouts */}
      {(activeFlyer.toLowerCase() === "awaiting approval" ||
        activeFlyer.toLowerCase() === "approved" || 
        activeFlyer.toLowerCase() === "out for delivery" || 
        activeFlyer.toLowerCase() === "delivered" || 
        activeFlyer.toLowerCase() === "cancelled") && (
        <StatusUpdateFlyout 
          setActiveFlyer={setActiveFlyer} 
          status={
            activeFlyer.toLowerCase() === "awaiting approval" ? "approved" :
            activeFlyer.toLowerCase() === "approved" ? "approved" :
            activeFlyer.toLowerCase() === "out for delivery" ? "out for delivery" :
            activeFlyer.toLowerCase() === "delivered" ? "delivered" :
            "cancelled"
          }
          onStatusUpdate={onStatusUpdate}
        />
      )}
    </div>
  );
};

export default SetOrderStatus;
