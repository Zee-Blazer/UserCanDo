import React from "react";
import addSalesSuccess from "@/assets/images/add_sales_success.svg";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

const ConfirmationSlide = () => {
  const { setActiveSlideIndex } = useAuth();

  return (
    <div>
      <p className="text-xl font-medium mb-6">Sale Confirmation</p>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={addSalesSuccess}
            alt="Sale Success"
            width={150}
            height={150}
          />
          <p className="text-2xl font-bold mt-4">Sale has been recorded</p>

          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={() => setActiveSlideIndex(0)}
          >
            <Typography className="text-white font-normal">
              Add New Sale
            </Typography>
          </Button>
          <Link className="w-full" href={ROUTES.shopperProfile}>
            <Button className="bg-[#E0F0FF] w-full normal-case mt-2">
              <Typography className="text-blue_pry font-normal">
                Done
              </Typography>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationSlide;
