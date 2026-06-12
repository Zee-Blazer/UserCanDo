import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import RatingStars from "@/components/General/RatingStars";
import { useShopperSelector } from "@/Redux/selectors";
import logo from "@/assets/images/logo.png";
import { ROUTES } from "@/constants/routes";

const Vendors = () => {
  const { vendors } = useShopperSelector();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography className="font-semibold text-xl">
          Vendors near you
        </Typography>
        <Link href={ROUTES.allVendors}>
          <Button
            className="normal-case text-blue-500 p-0 font-medium"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
        {vendors?.map((vendor) => (
          <div key={vendor.id} className="min-w-[190px] flex-shrink-0">
            <div className="rounded-lg overflow-hidden mb-2 h-[110px] relative shadow">
              <Image
                src={vendor?.business_logo || logo}
                alt={vendor?.business_name || ""}
                className="object-cover w-full h-full"
                width={190}
                height={110}
              />
            </div>
            <div className="space-y-1">
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

export default Vendors;
