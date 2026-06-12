import React from "react";
import {
  DialogHeader,
  DialogBody,
  Typography,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { SuccessIcon } from "@/assets/svg";
import { LoginSlideProps } from "./loginOTPSlide";

const LoginPasscodeChanged = ({ onContinue }: LoginSlideProps) => {
  return (
    <>
      <DialogHeader className="pt-10 flex flex-col justify-center align-center">
        <SuccessIcon className="border-8 border-[#FFD68F]  rounded-full" />
      </DialogHeader>
      <DialogBody>
        <Typography className="font-semibold text-[#0052A3] text-center">
          Your password has been <br />
          changed successfully
        </Typography>
      </DialogBody>
      <DialogFooter className="px-12 pb-10">
        <Button
          className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4`}
          disabled={false}
          onClick={onContinue}
        >
          Login now
        </Button>
      </DialogFooter>
    </>
  );
};

export default LoginPasscodeChanged;
