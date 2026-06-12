"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShopperSelector } from "@/Redux/selectors";

const CreditInvoice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { bnplOrders } = useShopperSelector();
  const [orderData, setOrderData] = useState<any>(null);

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (orderId && bnplOrders && bnplOrders.length > 0) {
      const selectedOrder = bnplOrders.find(
        (order: any) => order.id === orderId
      );
      if (selectedOrder) {
        setOrderData(selectedOrder);
      }
    }
  }, [orderId, bnplOrders]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const subTotal =
    orderData?.order_items?.reduce(
      (sum: number, item: any) => sum + parseFloat(item.total_price || "0"),
      0
    ) || 0;

  const vatRate = 0;
  const discountRate = 0.05;
  const vatAmount = subTotal * vatRate;
  const discountAmount = subTotal * discountRate;
  const totalAmount = subTotal + vatAmount - discountAmount;

  return (
    <main>
      <header className="flex justify-between mb-[1.5em] items-center">
        <div className="flex gap-10 items-center">
          <div className="flex gap-4 items-center">
            <Button
              onClick={handleGoBack}
              className="bg-pry2 flex px-2 items-center normal-case py-2"
            >
              <ChevronLeft />
              <Typography className="text-white font-normal">Back</Typography>
            </Button>
            <Typography variant="h4" className="font-medium">
              Order Invoice
            </Typography>
          </div>
          <div className="rounded-md p-2 font-semibold bg-[#F9F5FF] text-[#6941C6]">
            {orderData?.status?.charAt(0).toUpperCase() +
              orderData?.status?.slice(1) || "Awaiting Approval"}
          </div>
        </div>
        <Button className="inline-flex items-center justify-center whitespace-nowrap normal-case gap-2 bg-inherit border border-text-gray-300 font-normal shadow-none hover:shadow-none py-2 px-4">
          <Typography className="text-[#434343] font-normal">
            Download
          </Typography>
        </Button>
      </header>

      <header className="text-center uppercase mb-[2em] font-extrabold text-2xl">
        invoice
      </header>

      <section className="flex mb-[2.5em] justify-between ">
        <Image src={logo} alt="logo" className="w-[116px] object-contain" />
      </section>

      <section className="flex mb-8 items-center justify-between">
        <div className="flex flex-col">
          <Typography className="font-bold text-pry2">Supplier</Typography>
          <Typography className="font-normal text-gray_7">
            {orderData?.order_items?.[0]?.business_name || "N/A"}
          </Typography>
          <Typography className="font-normal text-gray_7">
            {orderData?.checkout_items?.delivery_address || "N/A"}
          </Typography>
        </div>
        <div className="flex flex-col">
          <Typography className="font-bold text-pry2">Customer</Typography>
          <Typography className="font-normal text-gray_7">N/A</Typography>
          <Typography className="font-normal text-gray_7">N/A</Typography>
          <Typography className="font-normal text-gray_7">
            {orderData?.checkout_items?.delivery_address || "N/A"}
          </Typography>
          <Typography className="font-normal text-gray_7">Tel: N/A</Typography>
        </div>
      </section>

      <section className="flex border-b border-t py-6 border-[#DEE2E6] justify-between mb-[1em] gap-[3em]">
        <div>
          <Typography className="font-bold text-lg text-pry2">
            Invoice Number
          </Typography>
          <Typography className="font-medium text-gray_7 text-lg">
            {orderData?.id || "N/A"}
          </Typography>
        </div>

        <div>
          <Typography className="font-bold text-lg text-pry2">
            Payment Due Date
          </Typography>
          <Typography className="font-medium text-gray_7 text-lg">
            {formatDate(orderData?.due_date)}
          </Typography>
        </div>

        <div>
          <Typography className="font-bold text-lg text-pry2">
            Amount Due
          </Typography>
          <Typography className="font-extrabold text-gray_7 text-lg">
            GHS {orderData?.total_price || "0.00"}
          </Typography>
        </div>
      </section>

      <section className="flex justify-between mb-[2em] gap-[3em]">
        <div className="flex max-w-sm w-full flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Payment Details
          </Typography>
          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Payment Method:
            </Typography>
            <Typography className="font-normal text-gray_7">
              {orderData?.checkout_items?.payment_option?.replace(/_/g, " ") ||
                "N/A"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Payment terms:
            </Typography>
            <Typography className="font-normal text-gray_7">
              {orderData?.checkout_items?.pay_later_weekly_option?.replace(
                /_/g,
                " "
              ) || "N/A"}
            </Typography>
          </div>
        </div>

        <div className="flex max-w-sm w-full flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Order Details
          </Typography>
          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Order Number:
            </Typography>
            <Typography className="font-normal text-gray_7">
              # {orderData?.id?.split("-")[0] || "N/A"}
            </Typography>
          </div>

          <div className="flex justify-between">
            <Typography className="font-normal text-gray_7">
              Issue Date:
            </Typography>
            <Typography className="font-normal text-gray_7">
              {formatDate(orderData?.created_at)}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Typography className="font-bold text-lg text-pry2">
            Delivery Detail
          </Typography>

          <Typography className="font-normal text-gray_7">
            {orderData?.checkout_items?.delivery_address || "N/A"}
          </Typography>

          <Typography className="font-normal text-gray_7">
            Method:{" "}
            {orderData?.checkout_items?.delivery_method?.replace(/_/g, " ") ||
              "N/A"}
          </Typography>
        </div>
      </section>

      <section className="mb-[2em]">
        <div className="grid grid-cols-[1fr_190px_190px_190px] border border-gray-300">
          <div className="bg-pry2 text-white p-2 border-r border-white">
            <Typography className="font-semibold">Item(s)</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center border-r border-white">
            <Typography className="font-semibold">Quantity</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center border-r border-white">
            <Typography className="font-semibold">Unit Price</Typography>
          </div>
          <div className="bg-pry2 text-white p-2 text-center">
            <Typography className="font-semibold">Amount</Typography>
          </div>

          {orderData?.order_items?.map((item: any, index: number) => (
            <React.Fragment key={item.id || index}>
              <div className="p-2 border-r border-b border-gray-300">
                {item.product_name || "N/A"}
              </div>
              <div className="p-2 text-center border-r border-b border-gray-300">
                {item.quantity || "0"}
              </div>
              <div className="p-2 text-center border-r border-b border-gray-300">
                GHS {item.price || "0.00"}
              </div>
              <div className="p-2 text-center border-b border-gray-300">
                GHS {item.total_price || "0.00"}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="w-full mb-[2.5em] gap-2 flex flex-col">
        <div className="flex items-center justify-between">
          <Typography className="font-normal text-[#212529]">
            Sub Total
          </Typography>
          <Typography className="font-normal text-[#212529]">
            GHS {subTotal.toFixed(2)}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography className="uppercase font-normal text-[#212529]">
            vat {vatRate * 100}%
          </Typography>
          <Typography className="font-normal text-[#212529]">
            GHS {vatAmount.toFixed(2)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-normal text-[#212529]">
            Discount
          </Typography>
          <Typography className="font-normal text-[#212529]">
            {discountRate * 100}% (GHS {discountAmount.toFixed(2)})
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography className="font-normal text-[#212529]">
            Total + VAT - Discount
          </Typography>
          <Typography className="font-normal text-[#212529]">
            GHS {totalAmount.toFixed(2)}
          </Typography>
        </div>
      </section>

      <section className="flex mb-[3em] justify-between">
        <Typography className="font-normal text-[#212529]">
          Total Amount
        </Typography>
        <Typography className="font-bold text-[#212529]">
          GHS {orderData?.total_price || "0.00"}
        </Typography>
      </section>

      <section className="flex justify-between">
        <div>
          <div className="flex flex-col items-start">
            <div
              className="mb-3 py-4"
              style={{
                width: "fit-content",
                borderTop: "3px dotted #000",
              }}
            >
              <Typography className="font-normal text-lg text-gray_7">
                Finance's Signature
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-start">
            <div
              className="mb-3 py-4"
              style={{
                width: "fit-content",
                borderTop: "3px dotted #000",
              }}
            >
              <Typography className="font-normal text-lg text-gray_7">
                Warehouse Manager's Signature
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreditInvoice;
