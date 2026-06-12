"use client";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import cart from "@/assets/images/cart.png";
import invoice from "@/assets/images/invoice.png";
import { ChevronRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import PlaceOrderModal from "@/components/dashboard/suppliersTerm/modals/placeOrderModal";
import UploadInvoiceModal from "@/components/dashboard/suppliersTerm/modals/uploadInvoiceModal";

const OrderType = () => {
  const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
  const [isUploadInvoiceModalOpen, setIsUploadInvoiceModalOpen] =
    useState(false);

  const orderOptions = [
    {
      id: 1,
      title: "Place Order Manually",
      image: cart,
      alt: "cart",
      onClick: () => setIsPlaceOrderModalOpen(true),
    },
    {
      id: 2,
      title: "Upload an invoice",
      image: invoice,
      alt: "invoice",
      onClick: () => setIsUploadInvoiceModalOpen(true),
    },
  ];

  return (
    <main className="bg-[#F8FAFB] max-w-3xl rounded-md py-10 mx-auto h-auto gap-6 flex flex-col">
      <Typography className="text-[#6F6F6F] text-center text-sm font-medium">
        Welcome! Lets get started
      </Typography>
      <Typography variant="h4" className="text-center">
        How Would You Be Placing Your Order?
      </Typography>
      <div className="flex flex-col gap-4 items-center">
        {orderOptions.map((option) => (
          <div
            className="w-full max-w-xl cursor-pointer"
            onClick={option.onClick}
          >
            <div className="border flex w-full justify-between items-center border-[#D5D8DC] rounded-lg px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <Image
                  src={option.image}
                  alt={option.alt}
                  height={50}
                  width={50}
                />
                <Typography className="text-black text-sm font-bold">
                  {option.title}
                </Typography>
              </div>
              <ChevronRight />
            </div>
          </div>
        ))}
      </div>
      <PlaceOrderModal
        isOpen={isPlaceOrderModalOpen}
        onClose={() => setIsPlaceOrderModalOpen(false)}
      />
      <UploadInvoiceModal
        isOpen={isUploadInvoiceModalOpen}
        onClose={() => setIsUploadInvoiceModalOpen(false)}
        onApply={() => {
          setIsUploadInvoiceModalOpen(false);
        }}
      />
    </main>
  );
};

export default OrderType;
