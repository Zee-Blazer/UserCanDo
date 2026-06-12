import React from "react";
import MessageComponent from "@/components/shoppers/orders/messageComponent";

interface IShopperOrderMessageProps {
  onClose: () => void;
  orderId?: string;
}

const ShopperOrderMessage = ({
  onClose,
  orderId,
}: IShopperOrderMessageProps) => {
  return (
    <div
      className={
        "fixed h-[calc(100vh-90px)] w-full top-[90px] left-0 bottom-0 bg-[#fff] overflow-hidden px-10 py-4 flex items-center justify-center"
      }
    >
      <div className={"h-full w-full max-w-[1280px]"}>
        <div
          className={
            "flex md:flex-row flex-col gap-3 md:justify-between items-center w-full"
          }
        >
          <h2 className={"text-[24px] font-[500]"}>Message Vendor</h2>
        </div>
        <div
          className={
            "w-full h-full flex flex-row justify-center items-center pt-10 pb-16"
          }
        >
          <MessageComponent onClose={onClose} orderId={orderId} />
        </div>
      </div>
    </div>
  );
};

export default ShopperOrderMessage;