import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import customerProfile from "@/assets/images/customer_profile.svg";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";

const EmptyState = () => {
  const { loginData } = useAuthSelector();
  const USE_CASE = loginData?.use_case?.toLowerCase() as UseCase;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={customerProfile}
          alt="Customer Profile"
          width={150}
          height={150}
        />
        <p className="text-2xl font-bold mt-4">You have no customers.</p>
        <p className="mb-4">You can start by adding new customers.</p>

        <Link
          className="w-full"
          href={
            USE_CASE === USE_CASES.AGENT
              ? ROUTES.agentAddCustomer
              : ROUTES.shopperAddCustomer
          }
        >
          <Button className="bg-blue_pry w-full normal-case mt-4">
            <Typography className="text-white font-normal">
              Add Customer
            </Typography>
          </Button>
        </Link>
        <Button className="bg-[#E0F0FF] w-full normal-case mt-2">
          <Typography className="text-blue_pry font-normal">
            Invite Customers
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
