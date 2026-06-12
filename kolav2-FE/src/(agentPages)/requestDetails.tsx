"use client";

import React, { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useAgentSelector } from "@/Redux/selectors";
import cartImage from "@/assets/images/cat3.png";
import { useAgent } from "@/context/agentContext";

const RequestDetails = () => {
  const router = useRouter();
  const params = useParams();
  const { loadAgentRequestHistoryByRange } = useAgent();
  const { requestOrderHistory } = useAgentSelector();

  useEffect(() => {
    loadAgentRequestHistoryByRange();
  }, [loadAgentRequestHistoryByRange]);

  const requestData = requestOrderHistory?.find(
    (request: any) => request?.request_id === params?.id
  );

  const handleGoBack = () => {
    router.back();
  };

  const shortenId = (id: string) => `#${id?.substring(0, 8)}`;

  if (!requestData) {
    return (
      <main className="p-6">
        <div className="flex gap-x-6 items-center">
          <IconButton onClick={handleGoBack} variant="text">
            <ArrowLeft size={20} color="#2B2525" />
          </IconButton>
          <Typography className="text-lg font-medium text-[#2B2525]">
            Request not found
          </Typography>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div className="flex gap-x-6 items-center">
          <IconButton onClick={handleGoBack} variant="text">
            <ArrowLeft size={20} color="#2B2525" />
          </IconButton>
          <Typography className="text-lg font-medium text-[#2B2525]">
            Request Details - {shortenId(requestData?.request_number)}
          </Typography>
        </div>
        <div className="w-32 px-2 py-1.5 bg-[#F4FBF3] text-[#2AB40E] rounded-md text-sm font-semibold text-center">
          {requestData?.status}
        </div>
      </div>

      <section className="mb-10">
        <span className="text-lg font-medium">Request Info</span>
        <div className="flex flex-col md:flex-row w-full gap-6 mt-3">
          <div className="flex flex-col gap-1 flex-1 py-3 px-6 rounded-2xl shadow-md">
            <Typography className="text-gray-600 text-sm">Location</Typography>
            <Typography className="text-black font-medium text-md">
              {requestData?.location}
            </Typography>
          </div>
          <div className="flex flex-col gap-1 flex-1 py-3 px-6 rounded-2xl shadow-md">
            <Typography className="text-gray-600 text-sm">
              Total Request Price
            </Typography>
            <Typography className="text-black font-medium text-md">
              GHS {requestData?.total_request_price?.toLocaleString()}
            </Typography>
          </div>
        </div>
      </section>

      <section>
        <Typography className="text-md mb-8 font-medium">Items</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {requestData?.products?.map((product: any, index: number) => (
            <div
              key={product?.product_id || index}
              className="bg-white border-b px-8 py-6 rounded-2xl shadow-md"
            >
              <div className="flex gap-6">
                <div className="w-28 h-28 flex-shrink-0">
                  <img
                    src={product?.product_image || cartImage}
                    alt={product?.product_name}
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <Typography className="text-lg font-semibold text-[#2B2525]">
                    {product?.product_name}
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Quantity: {product?.quantity}
                  </Typography>
                  <Typography className="text-sm text-gray-500">
                    Unit Price: GHS {product?.unit_price?.toLocaleString()}
                  </Typography>
                  <Typography className="text-sm font-medium text-[#2B2525]">
                    Total Price: GHS {product?.total_price?.toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RequestDetails;
