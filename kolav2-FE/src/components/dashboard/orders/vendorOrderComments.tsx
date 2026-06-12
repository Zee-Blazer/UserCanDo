import MessageComponent from "@/components/shoppers/orders/messageComponent";
import React from "react";

interface IVendorOrderCommentsProps {
  onClose: () => void;
  orderId?: string;
}

const VendorOrderComments = ({
  onClose,
  orderId,
}: IVendorOrderCommentsProps) => {
  return (
    <div className="w-full h-full">
      <MessageComponent onClose={onClose} orderId={orderId} />
    </div>
  );
};

export default VendorOrderComments;
