import { ROUTES } from "@/constants/routes";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const SalePosHeaderLinks = () => {
  const routes = [
    {
      label: "Business Details",
      to: ROUTES.businesses,
    },
    {
      label: "Sales",
      to: ROUTES.sales,
    },
    {
      label: "Orders",
      to: ROUTES.orders,
    },
    {
      label: "Sale Agent",
      to: ROUTES.saleAgent,
    },
    {
      label: "Customers",
      to: ROUTES.customers,
    },
    {
      label: "Sale Pos",
      to: "#",
      active: true,
    },
  ];

  return (
    <main className="flex lg:flex-row md:flex-col flex-col items-start lg:items-center gap-4">
      <Typography className="font-semibold flex justify-start">
        Test Kola Market
      </Typography>
      <span className="lg:block hidden">|</span>
      <div className="flex mt-2 items-center gap-5">
        {routes.map((route, index) => (
          <Link
            key={index}
            href={route.to}
            className="text-gray_4 relative group pb-2"
          >
            <Typography className="cursor-pointer font-normal">
              {route.label}
            </Typography>
            {route.active ? (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
            ) : (
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SalePosHeaderLinks;
