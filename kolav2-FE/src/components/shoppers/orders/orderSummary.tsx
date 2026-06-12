import FormattedPrice from "@/components/shoppers/orders/formattedPrice";

interface IOrderSummaryProps {
  price: number;
}

const OrderSummary = ({ price }: IOrderSummaryProps) => (
  <div
    className={
      "col-span-4 p-5 border-[1px] border-solid border-[#EDEEF0] rounded-[20px] h-fit flex flex-col gap-6"
    }
  >
    <h3 className={"text-[#5A5555] font-[500] text-[20px]"}>Order Summary</h3>
    <div className={"flex flex-col gap-3"}>
      <div className={"flex flex-row items-center w-full justify-between"}>
        <p className={"text-[#5A5555] font-[400]"}>Sub-Total</p>
        <FormattedPrice
          price={price}
          className={"text-[24px]"}
          smallClassName={"text-[18px]"}
        />
      </div>
      <div className={"flex flex-row items-center w-full justify-between"}>
        <p className={"text-[#5A5555] font-[400]"}>Delivery Fees TBD</p>
        {/*<FormattedPrice price={30.00} className={"text-[24px]"} smallClassName={"text-[18px]"}/>*/}
      </div>
    </div>
    <button
      className={
        "bg-blue_pry rounded-[8px] w-full flex justify-center items-center py-3 px-4 text-white font-[600]"
      }
    >
      Save Changes
    </button>
  </div>
);

export default OrderSummary;
