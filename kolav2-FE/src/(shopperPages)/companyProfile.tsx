"use client";

import EditProfile from "@/components/dashboard/profile/company/editProfile";
import { Typography } from "@material-tailwind/react";

const CompanyProfile = () => {
  return (
    <>
      <Typography className="font-semibold text-black text-xl">
        My Profile
      </Typography>
      <EditProfile />
    </>
  );
};

export default CompanyProfile;
