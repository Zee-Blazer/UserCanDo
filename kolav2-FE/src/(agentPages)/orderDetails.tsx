"use client";

import { Typography, IconButton } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import ProductImageCarousel from "@/components/agent/orders/productImageCarousel";
import { formatCurrency, getInitials } from "@/utils/helpers";
import { Train, CreditCard, Package, CheckCircle } from "@phosphor-icons/react";
import { useAgentSelector } from "@/Redux/selectors";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import EmptyState from "@/components/shoppers/agents/emptyState";
import { useAgent } from "@/context/agentContext";
import { useEffect } from "react";

const OrderDetails = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const { loadAgentOrderHistoryByRange } = useAgent();
  const { orderHistory } = useAgentSelector();

  useEffect(() => {
    loadAgentOrderHistoryByRange();
  }, [loadAgentOrderHistoryByRange]);

  const fullOrder = orderHistory?.find((data) => data?.order_id === orderId);

  if (!fullOrder) {
    return (
      <main className="p-10">
        <EmptyState />
      </main>
    );
  }

  const totalAmount = fullOrder.products.reduce(
    (sum, p) => sum + p.total_price,
    0
  );

  const productImages = fullOrder.products?.map((p) => p?.product_image);

  return (
    <main className="p-6">
      <div className="flex gap-x-6 items-center">
        <IconButton variant="text" onClick={() => router.back()}>
          <ArrowLeft size={20} color="#2B2525" />
        </IconButton>
        <Typography className="text-lg font-medium text-[#2B2525]">
          Order Details - {fullOrder.order_number}
        </Typography>
      </div>

      <div className="bg-white w-full max-w-xl mx-auto px-10 py-8 rounded-3xl shadow-md mt-14">
        <ProductImageCarousel images={productImages} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="bg-white w-full lg:w-[48%] px-10 py-8 items-stretch rounded-3xl shadow-md mt-14">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
              <div className="bg-[#CCD6E0] rounded-full p-2">
                <Typography className="text-pry2 text-xl font-medium">
                  {getInitials(fullOrder?.customer_name)}
                </Typography>
              </div>
              <Typography className="font-medium">
                {fullOrder?.customer_name}
              </Typography>
            </div>
            <Typography className="font-medium">
              {formatCurrency(totalAmount, "GHS")}
            </Typography>
          </div>

          {fullOrder.products?.map((product, index) => (
            <div className="py-4" key={index}>
              <Typography className="font-medium">
                {product?.product_name}
              </Typography>
              <Typography className="text-sm text-[#787486]">
                {formatCurrency(product?.unit_price, "GHS")}
              </Typography>
              <Typography className="text-sm text-[#787486]">
                {product?.quantity} item(s)
              </Typography>
            </div>
          ))}
        </div>

        <div className="bg-white w-full lg:w-[48%] px-10 py-8 items-stretch rounded-3xl shadow-md mt-14">
          <div className="flex justify-between items-center">
            <Typography className="font-medium">Delivery</Typography>
            <Typography className="font-medium">
              {formatCurrency(690, "GHS")}
            </Typography>
          </div>
          <div className="py-4">
            <Typography className="text-sm text-[#787486]">Location</Typography>
            <Typography className="text-sm text-[#787486]">TBD</Typography>
          </div>

          <div className="flex justify-between border-t border-gray-50 pt-3 mt-1">
            <Typography className="font-medium">Total Cost</Typography>
            <Typography className="font-medium">
              {formatCurrency(690, "GHS")}
            </Typography>
          </div>
        </div>
      </div>

      <div className="bg-white w-full lg:w-[40%] px-10 py-8 rounded-3xl shadow-md mt-14">
        <Typography className="text-md font-medium">Order Status</Typography>
        <div className="flex flex-col items-start gap-y-4 pt-8">
          {[
            { label: "Order Placed", icon: <Train size={20} />, bg: "#F2A921" },
            {
              label: "Processing Payment",
              icon: <CreditCard size={20} color="white" />,
              bg: "#D9D9D9",
            },
            {
              label: "Order Confirmed",
              icon: <CheckCircle size={20} color="white" />,
              bg: "#D9D9D9",
            },
            {
              label: "Out for Delivery",
              icon: <Train size={20} color="white" />,
              bg: "#D9D9D9",
            },
            {
              label: "Delivered",
              icon: <Package size={20} color="white" />,
              bg: "#D9D9D9",
            },
          ].map((step, idx) => (
            <div className="flex gap-x-4 items-center" key={idx}>
              <div
                className="flex items-center justify-center rounded-full w-8 h-8"
                style={{ backgroundColor: step.bg }}
              >
                {step.icon}
              </div>
              <Typography className="font-md">{step?.label}</Typography>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
