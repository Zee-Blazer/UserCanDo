"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import VerticalStepper from "@/components/General/verticalStepper";
import Image from "next/image";
import buyOnline from "@/assets/images/buyOnline.png";
import { BagIcon, Bell, ConfirmIcon, ProductIcon } from "@/assets/svg";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const UploadInvoiceSteps = () => {
  const steps = [
    {
      icon: <BagIcon color="#003366" />,
      label: "Step 1: Select a supplier(s)",
    },
    {
      icon: <ProductIcon />,
      label: "Step 2 : Select a reminder option",
    },
    {
      icon: <ConfirmIcon />,
      label: "Step 3: Wait for approval from admin",
    },
    {
      icon: <Bell color="#003366" />,
      label:
        "Step 5: You will recieve an update notification an appproval or declined from admin within 24hr-48hr",
    },
  ];
  return (
    <main>
      <div className="flex pb-8 flex-col gap-3">
        <Typography className="text-xl font-semibold md:text-left">
          Follow these steps to Upload an invoice:
        </Typography>
        <Typography className="text-gray-600 text-sm md:text-left">
          Follow the appropriate steps to successfully apply for Credit Request.
          click on <br /> the button below to apply.
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row pb-7 justify-between items-center gap-6 md:gap-0">
        <VerticalStepper steps={steps} />
        <div className="hidden lg:block">
          <Image src={buyOnline} alt="buy-online" />
        </div>
      </div>
      <div className="flex justify-center md:justify-start">
        <Link href={ROUTES.uploadInvoice}>
          <Button className="text-sm text-pry2 bg-[#F5AA29] font-medium shadow-none hover:shadow-none px-6 py-3">
            Upload an invoice
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default UploadInvoiceSteps;
