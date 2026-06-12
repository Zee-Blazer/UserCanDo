"use client";

import React, { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useAgentSelector } from "@/Redux/selectors";
import cartImage from "@/assets/images/cat3.png";
import { getInitials } from "@/utils/helpers";
import EmptyState from "@/components/shoppers/agents/emptyState";
import { LocationIcon } from "@/assets/svg";
import { useAgent } from "@/context/agentContext";

const SalesDetails = () => {
  const { loadAgentSalesData } = useAgent();
  const router = useRouter();
  const params = useParams();
  const { sales } = useAgentSelector();

  useEffect(() => {
    loadAgentSalesData();
  }, [loadAgentSalesData]);

  const salesData: any = sales?.find((sale: any) => {
    const matchById = sale?.id === params?.id;
    const matchBySaleId = sale?.sale_id === params?.id;

    return matchById || matchBySaleId;
  });
  const shortenId = (id: string) => `#${id?.substring(0, 8)}`;

  const calculateTotalAmount = () => {
    if (!salesData?.products || salesData.products.length === 0) {
      return 0;
    }

    return salesData.products.reduce((total: number, product: any) => {
      return total + (product?.total_price || 0);
    }, 0);
  };

  const totalAmount = calculateTotalAmount();

  const handleGoBack = () => {
    router.back();
  };

  if (!salesData) {
    return (
      <main className="p-6">
        <EmptyState />
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex justify-between mb-6">
        <div className="flex gap-x-6 items-center">
          <IconButton onClick={handleGoBack} variant="text">
            <ArrowLeft size={20} color="#2B2525" />
          </IconButton>
          <Typography className="text-lg font-medium text-[#2B2525]">
            Sales Details - {shortenId(salesData?.id)}
          </Typography>
        </div>
      </div>

      <section className="mb-10">
        <span className="text-lg font-medium">Sold To</span>
        <div className="flex flex-col md:flex-row w-full gap-6 mt-3">
          <div className="flex gap-1 flex-col flex-1 py-3 px-6 rounded-2xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
            <div className="flex gap-3">
              <div className="bg-[#CCD6E0] flex justify-center text-center rounded-full w-[45px] h-[45px] p-2">
                <Typography className="text-pry2 items-center text-xl font-medium">
                  {getInitials(salesData?.customer?.name)}
                </Typography>
              </div>
              <div className="flex items-start flex-col">
                <Typography className="text-[#787486] font-medium text-lg">
                  {salesData?.customer?.name}
                </Typography>
                <Typography className="text-[#787486] flex gap-1 items-center font-normal text-md">
                  <LocationIcon />
                  {salesData?.customer?.location}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex gap-1 justify-between items-center flex-1 py-3 px-6 rounded-2xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
            <Typography className="text-gray-600 text-sm">
              Total Cost
            </Typography>
            <Typography className="text-black font-medium text-md">
              GHS {totalAmount.toLocaleString()}
            </Typography>
          </div>
        </div>
      </section>

      <section>
        <Typography className="text-md mb-8 font-medium">Items</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {salesData?.products?.map((product: any, index: number) => (
            <div
              key={product?.product_id || index}
              className="bg-white border-b px-8 py-6 rounded-tl-2xl rounded-t-3xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A]"
            >
              <div className="flex gap-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img
                    src={product?.product?.image_url || cartImage}
                    alt={product?.product_name}
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-between flex-1">
                  <Typography className="text-lg mb-4 font-semibold text-[#2B2525]">
                    {product?.product?.name}
                  </Typography>
                  <Typography className="text-[#787486] font-normal">
                    Quantity: {product?.quantity}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography className="text-[#787486] font-normal">
                      Unit Price:
                    </Typography>
                    <span className="font-medium">
                      GHS {product?.unit_price?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography className="font-medium text-[#2B2525]">
                      Total Price:
                    </Typography>
                    <span className="font-medium">
                      GHS {product?.total_price?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SalesDetails;
