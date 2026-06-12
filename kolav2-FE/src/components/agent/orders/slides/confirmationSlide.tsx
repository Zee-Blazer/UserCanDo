import React from "react";
import addSalesSuccess from "@/assets/images/add_sales_success.svg";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useAgent } from "@/context/agentContext";

const ConfirmationSlide = () => {
  const { setActiveOrderSaleSlideIndex, resetOrderSaleSlides } = useAgent();

  return (
    <div>
      <p className="text-xl font-medium mb-6">Order Confirmation</p>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={addSalesSuccess}
            alt="Sale Success"
            width={150}
            height={150}
          />
          <p className="text-2xl font-bold mt-4">Order has been placed</p>

          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={() => {
              resetOrderSaleSlides(true); 
              setActiveOrderSaleSlideIndex(0);
            }}
          >
            <Typography className="text-white font-normal">
              Place New Order
            </Typography>
          </Button>
          <Button
            onClick={() => {
              resetOrderSaleSlides(true);
              setActiveOrderSaleSlideIndex(0);
            }}
            className="bg-[#E0F0FF] w-full normal-case mt-2"
          >
            <Typography className="text-blue_pry font-normal">Done</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSlide;
