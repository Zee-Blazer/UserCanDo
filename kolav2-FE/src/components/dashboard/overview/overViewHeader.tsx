"use client";
import React from "react";
import { Typography, Button } from "@material-tailwind/react";

import ProgressBar from "@/components/General/progressBar";
import { useDashboardSelector } from "@/Redux/selectors";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

const OverViewHeader = () => {

  const profileCompletion = useSelector(
    (state: RootState) => state.dashboard.profileCompletion
  );

  const percentage = profileCompletion.completion;
  const { userProfile } = useDashboardSelector();

  return (
    <section className="pb-2 text-[#101828] flex items-start justify-between">
      <div className="">
        <Typography className="text-xl font-semibold pb-2">
          {" "}
          Hello, {userProfile?.first_name}!{" "}
        </Typography>
        <Typography className="text-sm">
          Here's an overview of your business!
        </Typography>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between gap-x-16">
          <Typography className="text-sm">Profile Completion</Typography>
          <Typography className="text-xl font-semibold">
            {percentage}%
          </Typography>
        </div>
        <ProgressBar percentage={percentage} />
        <Link href={ROUTES.settings}>
          <Button
            className="self-end mt-2 normal-case bg-black"
            variant="filled"
          >
            Complete Your Profile
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OverViewHeader;
