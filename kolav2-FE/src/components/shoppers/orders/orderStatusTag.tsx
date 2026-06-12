import { MarkIcon } from "@/assets/svg";

interface IOrderStatusTag {
  status: string;
  width?: string;
}

const OrderStatusTag = ({ status, width }: IOrderStatusTag) => (
  <div
    className={`flex flex-row items-center justify-between px-2.5 py-1.5 rounded-full gap-2 border-[1px] border-solid ${
      status === "pending"
        ? "bg-[#FEFAF4] border-[#FFECCC]"
        : status === "shipped"
        ? "bg-[#F0FDF4] border-[#BBF7D0]"
        : status === "cancelled"
        ? "bg-[#FEF2F2] border-[#FECACA]"
        : ""
    }`}
  >
    <p className={"text-[10px] text-black_1 font-[600]"}>Order {status}</p>
    <MarkIcon
      width={width}
      className={`${!width && "h-[8.3px] w-[8.3px]"}`}
      color={
        status === "pending"
          ? "#F5AA29"
          : status === "shipped"
          ? "#22C55E"
          : "#F5AA29"
      }
    />
  </div>
);

export default OrderStatusTag;
