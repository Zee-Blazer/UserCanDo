"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { ChevronLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  formatDate,
  getAgentRequestStatusClasses,
  getCurrentAgentRequestStatus,
} from "@/utils/helpers";

interface AgentRequestInvoiceComponentProps {
  itemData: any;
  title: string;
}

const getStatusApproval = (
  request_history: AgentRequestHistoryProps[]
): { approvedBy: string; approvedOn: string } => {
  if (!request_history || request_history.length === 0) {
    return { approvedBy: "-", approvedOn: "-" };
  }

  const approvedHistory = request_history.find(
    (history) => history.status === "approved"
  );

  return {
    approvedBy: approvedHistory ? "Admin" : "-",
    approvedOn: approvedHistory
      ? formatDate(approvedHistory?.created_at || "")
      : "-",
  };
};

const AgentRequestInvoiceComponent = ({
  itemData,
  title = "Agent Request Invoice",
}: AgentRequestInvoiceComponentProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleDownload = () => {
    // Implement download functionality here
    window.print();
  };

  const currentStatus = itemData?.request_history
    ? getCurrentAgentRequestStatus(itemData.request_history)
    : "pending";

  const { approvedBy, approvedOn } = itemData?.request_history
    ? getStatusApproval(itemData.request_history)
    : { approvedBy: "-", approvedOn: "-" };

  const calculateTotal = () => {
    if (!itemData?.products || itemData.products.length === 0) {
      return parseFloat(itemData?.total_request_price || "0");
    }

    return itemData.products.reduce(
      (sum: number, product: ProductProps) =>
        sum +
        (typeof product?.total_price === "string"
          ? parseFloat(product?.total_price || "0")
          : product?.total_price || 0),
      0
    );
  };

  const total = calculateTotal();

  return (
    <main className="bg-white p-6 rounded-lg shadow-sm">
      <header className="flex justify-between mb-6 items-center">
        <div className="flex gap-4 items-center">
          <Button
            onClick={handleGoBack}
            className="bg-pry2 flex px-2 items-center normal-case py-2"
          >
            <ChevronLeft />
            <Typography className="text-white font-normal">Back</Typography>
          </Button>
          <Typography variant="h4" className="font-medium">
            {title}
          </Typography>
          <div
            className={`rounded-md p-2 font-semibold ${getAgentRequestStatusClasses(
              currentStatus
            )}`}
          >
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </div>
        </div>
        <Button
          onClick={handleDownload}
          className="inline-flex items-center justify-center whitespace-nowrap normal-case gap-2 bg-inherit border border-gray-300 font-normal shadow-none hover:shadow-none py-2 px-4"
        >
          <Download size={16} className="text-[#434343]" />
          <Typography className="text-[#434343] font-normal">
            Download
          </Typography>
        </Button>
      </header>

      <section className="flex mb-8 justify-between items-center">
        <Image src={logo} alt="logo" className="w-28 h-auto object-contain" />
        <div className="flex flex-col text-end">
          <Typography className="font-normal">
            {itemData?.business_name || "-"}
          </Typography>
          <Typography className="font-normal">
            {itemData?.location || "-"}
          </Typography>
          <Typography className="font-normal">
            tel: {itemData?.business_phone || "-"}
          </Typography>
        </div>
      </section>

      <section className="grid grid-cols-2 my-8 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Typography className="text-gray-600">Requested By</Typography>
            <Typography className="font-semibold">
              {itemData?.sales_agent_name || "-"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="text-gray-600">Status</Typography>
            <div
              className={`p-2 rounded-md ${getAgentRequestStatusClasses(
                currentStatus
              )}`}
            >
              <Typography variant="small" className="font-medium">
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </Typography>
            </div>
          </div>

          <div className="flex justify-between">
            <Typography className="text-gray-600">Approved By</Typography>
            <Typography className="font-semibold">{approvedBy}</Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="text-gray-600">Approved On</Typography>
            <Typography className="font-semibold">{approvedOn}</Typography>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Typography className="text-gray-600">Request Number</Typography>
            <Typography className="font-semibold">
              #{itemData?.request_number || "-"}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="text-gray-600">Request Date</Typography>
            <Typography className="font-normal">
              {itemData?.created_at ? formatDate(itemData.created_at) : "-"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="text-gray-600">Delivery Location</Typography>
            <Typography className="font-normal">
              {itemData?.location || "-"}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="text-gray-600">Total Cost</Typography>
            <Typography className="font-normal">
              GHS {total.toFixed(2)}
            </Typography>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="grid grid-cols-[100px_1fr_200px_200px] border border-gray-300">
          <div className="bg-pry2 text-white p-3 text-center border-r border-white">
            <Typography className="font-semibold">Qty</Typography>
          </div>
          <div className="bg-pry2 text-white p-3 border-r border-white">
            <Typography className="font-semibold">Description</Typography>
          </div>
          <div className="bg-pry2 text-white p-3 text-right border-r border-white">
            <Typography className="font-semibold">Unit Price</Typography>
          </div>
          <div className="bg-pry2 text-white p-3 text-right">
            <Typography className="font-semibold">Total</Typography>
          </div>

          {itemData?.products && itemData.products.length > 0 ? (
            itemData?.products.map((product: ProductProps, index: number) => (
              <React.Fragment key={product.product_id || index}>
                <div className="p-3 text-center border-r border-b border-gray-300">
                  {product.quantity}
                </div>
                <div className="p-3 border-r border-b border-gray-300">
                  {product.product_name}
                </div>
                <div className="p-3 text-right border-r border-b border-gray-300">
                  GHS{" "}
                  {typeof product?.unit_price === "string"
                    ? parseFloat(product.unit_price).toFixed(2)
                    : product?.unit_price?.toFixed(2) || "0.00"}
                </div>
                <div className="p-3 text-right border-b border-gray-300">
                  GHS{" "}
                  {typeof product?.total_price === "string"
                    ? parseFloat(product.total_price).toFixed(2)
                    : product?.total_price?.toFixed(2) || "0.00"}
                </div>
              </React.Fragment>
            ))
          ) : (
            <React.Fragment>
              <div className="p-3 text-center border-r border-b border-gray-300">
                -
              </div>
              <div className="p-3 border-r border-b border-gray-300">
                No products available
              </div>
              <div className="p-3 text-right border-r border-b border-gray-300">
                -
              </div>
              <div className="p-3 text-right border-b border-gray-300">-</div>
            </React.Fragment>
          )}
          <React.Fragment>
            <div className="p-3 border-r border-gray-300"></div>
            <div className="p-3 border-r border-gray-300 text-right">
              <Typography className="font-semibold">
                Total (VAT inclusive)
              </Typography>
            </div>
            <div className="p-3 border-r border-gray-300"></div>
            <div className="p-3 text-right border-gray-300">
              <Typography className="font-semibold">
                GHS {total.toFixed(2)}
              </Typography>
            </div>
          </React.Fragment>
        </div>
      </section>

      <section className="flex justify-between">
        <div>
          <div className="flex flex-col items-start">
            <div
              className="border-t-[1px] border-gray-300 mb-3 py-4"
              style={{ width: "fit-content" }}
            >
              <Typography className="text-gray-600">
                Sales Manager's Signature
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start">
            <div
              className="border-t-[1px] border-gray-300 mb-3 py-4"
              style={{ width: "fit-content" }}
            >
              <Typography className="text-gray-600">
                Finance Manager's Signature
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AgentRequestInvoiceComponent;
