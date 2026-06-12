"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useShopperSelector } from "@/Redux/selectors";
import { BackIcon } from "@/assets/svg";
import RatingStars from "@/components/General/RatingStars";
import logo from "@/assets/images/logo.png";
import { ROUTES } from "@/constants/routes";

const AllVendors = () => {
  const { vendors } = useShopperSelector();

  return (
    <div className="">
      <Link href={ROUTES.shopperHome} className="flex items-center gap-2 mb-6">
        <BackIcon />
        <Typography className="font-semibold text-xl">All Vendors</Typography>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {vendors?.map((vendor) => (
          <div
            key={vendor.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-lg"
          >
            <div className="rounded-lg overflow-hidden mb-2 h-[160px] relative shadow">
              <Image
                src={vendor?.business_logo || logo}
                alt={vendor?.business_name || ""}
                className="object-cover w-full h-full"
                width={240}
                height={160}
              />
            </div>
            <div className="space-y-1 p-2">
              <Typography className="font-medium text-sm line-clamp-1">
                {vendor?.business_name || ""}
              </Typography>
              <Typography className="text-gray-600 text-xs">
                {vendor?.km_away || ""}
              </Typography>
              <RatingStars
                rating={3}
                totalRatings={0}
                showCount={false}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVendors;
