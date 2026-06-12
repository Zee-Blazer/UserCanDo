import OrderListCard from "@/components/shoppers/orders/orderListCard";
import { Order } from "@/types";

interface IOrderListProps {
  orders: Order[];
  selectedOrderId: string;
  setSelectedOrderId: (selectedOrderId: string) => void;
}

const CreditList = ({
  orders,
  selectedOrderId,
  setSelectedOrderId,
}: IOrderListProps) => {
  return (
    <div className={"md:col-span-5 flex flex-col"}>
      {orders.length < 1 && (
        <div className="p-5 border-[1px] border-solid border-[#EDEEF0] rounded-[20px] bg-blue-gray-50">
          <div className="flex items-center justify-center h-40">
            <p className="text-black font-[600] text-[14px]">No orders found</p>
          </div>
        </div>
      )}
      {orders.map((order) => (
        <OrderListCard
          key={order.id}
          order={order}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
        />
      ))}
    </div>
  );
};

export default CreditList;
