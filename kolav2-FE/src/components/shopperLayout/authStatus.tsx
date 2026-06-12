import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function AuthStatus({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
      open={isOpen}
      handler={onClose}
      className="relative rounded-xl p-0"
    >
      <IconButton
        variant="text"
        className="!absolute bg-[#FAFAFA] rounded-full p-2 top-3 right-3.5"
        onClick={onClose}
      >
        <X className="h-7 w-7" />
      </IconButton>
      <div className="p-10 mt-5">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <div className="max-w-xs px-9">
            <Typography className="text-black font-medium text-lg">
              This action requires you to sign up or sign in
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="flex flex-col items-center justify-center gap-5 p-0 mt-9 w-full">
          <Link href={ROUTES.login} className="w-full">
            <Button className="bg-[#007AF5] w-full shadow-sm text-white font-medium shadow-blue_pry  py-4 normal-case text-sm border border-[#D0D5DD66] rounded-lg flex-1">
              Sign in
            </Button>
          </Link>
          <Link href={ROUTES.createAccount} className="w-full">
            <Button
              onClick={onClose}
              className="normal-case flex w-full justify-center text-center shadow-[#E0F0FF]  bg-[#E0F0FF] text-[#0052A3] font-medium py-4 text-sm shadow-md rounded-lg flex-1"
            >
              Sign up
            </Button>
          </Link>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

export default AuthStatus;
