import React from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const AuthHeader = (props?: { pageType?: "login" | "" }) => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
      <Link href={ROUTES.home}>
        <Image
          src={logo}
          alt="logo"
          className="w-[112px] h-[40px] object-contain"
        />
      </Link>
      {props?.pageType === "login" ? (
        <div className="flex gap-3">
          <Typography className="hidden sm:block">
            Don't have an account?
          </Typography>
          <Link className="text-blue_pry" href={ROUTES.createAccount}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className="flex gap-3">
          <Typography className="hidden sm:block">
            Already have an account?
          </Typography>
          <Link className="text-blue_pry" href={ROUTES.login}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthHeader;
