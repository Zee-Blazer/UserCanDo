"use client";

import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import buyOnline from "@/assets/images/buy_online.png";
import newRequst from "@/assets/images/new_request.png";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PlaceOrderModal from "@/components/dashboard/suppliersTerm/modals/placeOrderModal";

const NewSuppliersTerm = () => {
  const [isPlaceOrderModalOpen, setIsPlaceOrderModalOpen] = useState(false);
  const [isRenewal, setIsRenewal] = useState(false);

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleOpenRenewal = () => {
    setIsRenewal(true);
    setIsPlaceOrderModalOpen(true);
  };

  return (
    <main className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <ArrowLeft onClick={handleGoBack} className="cursor-pointer" />
        <Typography variant="h4">Add New Credit Request</Typography>
      </header>
      <section className="flex flex-col md:flex-row gap-4 md:gap-2 justify-between">
        <div className="bg-[#F8FAFB] w-full items-center flex md:flex-row justify-between rounded-lg p-3">
          <div className="flex gap-4 flex-col">
            <Typography variant="h5" className="font-semibold">
              What is Credit Request?
            </Typography>
            <Typography className="text-[#6F6F6F] text-sm">
              Credit Request define agreements between suppliers and customers,
              specifying conditions such as credits limit, payment terms, and
              required documentation, ensuring transparent and efficient
              business operation.
            </Typography>
          </div>
          <Image src={buyOnline} alt="buy-online" className="object-contain" />
        </div>
      </section>
      <section>
        <Typography>Select Request Type</Typography>
        <div className="grid mt-4 md:grid-cols-2 gap-4">
          <Link href={ROUTES.orderType}>
            <div className="flex flex-col gap-3 items-center justify-center p-10 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
              <Image src={newRequst} alt="new_request" />
              <Typography className="text-black font-bold text-center">
                New Request
              </Typography>
            </div>
          </Link>
          <div onClick={handleOpenRenewal}>
            <div className="flex flex-col gap-3 items-center justify-center p-10 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
              <Image src={newRequst} alt="new_request" />
              <Typography className="text-black font-bold text-center">
                Renewal Upgrade
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <PlaceOrderModal
        isOpen={isPlaceOrderModalOpen}
        onClose={() => {
          setIsPlaceOrderModalOpen(false);
          setIsRenewal(false);
        }}
        isRenewal={isRenewal}
      />
    </main>
  );
};

export default NewSuppliersTerm;
