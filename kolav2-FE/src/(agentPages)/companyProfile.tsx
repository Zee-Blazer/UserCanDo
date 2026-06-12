"use client";

import { Avatar, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import React from "react";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAgentSelector } from "@/Redux/selectors";

const CompanyProfile = () => {
  const router = useRouter();
  const { activeBusiness } = useAgentSelector();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main>
      <Typography className="font-semibold text-black text-xl">
        My Profile
      </Typography>
      <div className="px-4 md:px-8 lg:px-16 pb-8 w-full lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white lg:shadow-lg rounded-lg">
        <div className="flex items-center justify-between relative">
          <div
            onClick={handleGoBack}
            className="absolute left-0 cursor-pointer flex items-center gap-2"
          >
            <ChevronLeft color="#0052A3" />
            <span className="text-[#0052A3] font-semibold">Back</span>
          </div>

          <Typography className="text-[#5A5555] font-semibold mx-auto">
            {activeBusiness?.business_name}
          </Typography>
        </div>

        <div className="mt-4">
          <Image src={rectangle} alt="profile_picture" className="w-full" />
        </div>

        <div className="flex flex-col sm:flex-row lg:items-center text-[#0052A3] justify-between -mt-8">
          <div className="flex items-cente gap-2">
            <Avatar
              src={
                activeBusiness?.business_logo ||
                "https://docs.material-tailwind.com/img/face-2.jpg"
              }
              alt={activeBusiness?.business_name}
              size="xl"
            />
            <Typography className="font-medium mt-10">
              {activeBusiness?.business_name}
            </Typography>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyProfile;
