import { HorizontalDivider } from "@/components/General/divider";
import { IOrderUpdate } from "@/types";
import OrderTrackerItem from "@/components/shoppers/orders/orderTrackerItem";

interface IOrderTrackerProps {
  orderUpdate: IOrderUpdate[];
}

const OrderTracker = ({ orderUpdate }: IOrderTrackerProps) => {
  return (
    <div className={"w-full max-w-[390px] flex flex-col gap-3 mt-3"}>
      <h3 className={"font-[700] text-[14px] text-black_1 px-3"}>
        Order Update
      </h3>
      <HorizontalDivider color={"#D2D5DA"} />
      <div className={"flex flex-col px-3"}>
        {orderUpdate.map((update, index) => (
          <OrderTrackerItem
            key={index}
            update={update}
            isLast={index === orderUpdate.length - 1}
            afterDone={orderUpdate[index + 1]?.done}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTracker;
