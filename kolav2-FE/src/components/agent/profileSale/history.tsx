import MenuDropdown from "@/components/General/menuDropdown";
import { orderHistory } from "@/utils/mockData";
import { ChevronLeft } from "lucide-react";
import { Typography, Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  nextAgentRequestSlide?: () => void;
}

const AddSalesHistory = ({ nextAgentRequestSlide }: Props) => {
  const router = useRouter();

  const handleOrderClick = (orderId: string) => {
    router.push(`/agent/sales/${orderId}`);
  };

  return (
    <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-t-3xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] mt-8">
      <div className="flex items-center justify-between mb-6">
        <div
          className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
          onClick={() => router.back()}
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </div>
        <p className="text-lg font-medium text-[#5A5555]">Select Customer</p>
        <div className="w-10"></div>
      </div>
      <section className="flex flex-col gap-5">
        {orderHistory.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center mt-12 w-full cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            onClick={() => handleOrderClick(order.id)}
          >
            <div className="flex gap-2">
              <div className="bg-[#CCD6E0] rounded-full w-[45px] h-[45px] p-2">
                <Typography className="text-pry2 items-center text-xl font-medium">
                  AG
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography className="text-[#787486] font-Poppins font-medium">
                  {order.name}
                </Typography>
                <Typography className="text-[rgb(120,116,134)]">
                  GHS 630.00 | 1 Product
                </Typography>
                <Typography className="text-xs">March 24, 2025</Typography>
              </div>
            </div>

            {/* <div
              className="w-44 px-2 py-1.5 rounded-md gap-2 text-sm font-semibold text-center"
              style={{
                backgroundColor: order.statusBg,
                color: order.statusTextColor,
              }}
            >
              <p className="self-center">{order.status}</p>
            </div> */}

            <MenuDropdown />
          </div>
        ))}
      </section>

      <div className="mt-8">
        <Button
          className="bg-blue_pry w-full normal-case mt-4"
          onClick={nextAgentRequestSlide}
          // disabled={
          //   !shopperProfileSaleInputs.customer_entity_id ||
          //   !shopperProfileSaleInputs.customer_entity_type
          // }
        >
          <Typography className="text-white font-normal">Continue</Typography>
        </Button>
      </div>
    </div>
  );
};

export default AddSalesHistory;
