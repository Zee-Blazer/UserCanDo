import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import Image from "next/image";
import switchAcc from "@/assets/images/switch_acc.svg";
import AuthStatus from "./authStatus";

export function ConfirmSwitch({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isAuthStatusOpen, setIsAuthStatusOpen] = useState(false);

  const handleContinue = () => {
    onClose();
    setIsAuthStatusOpen(true);
  };
  const handleAuthStatusClose = () => {
    setIsAuthStatusOpen(false);
  };
  return (
    <>
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
        <div className="p-10">
          <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
            <div className="flex">
              <Image src={switchAcc} alt="warning" height={70} width={70} />
            </div>
            <Typography className="text-2xl font-bold text-black">
              Are you sure you want to switch to vendor accounts?
            </Typography>
          </DialogBody>
          <DialogFooter className="flex items-center justify-center gap-5 p-0 mt-9 w-full">
            <Button
              onClick={onClose}
              className="normal-case flex justify-center text-center shadow-[#E0F0FF]  bg-[#E0F0FF] text-[#0052A3] font-medium py-4 text-sm shadow-md rounded-lg flex-1"
            >
              No, please
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-[#007AF5] shadow-sm text-white font-medium shadow-blue_pry  py-4 normal-case text-sm border border-[#D0D5DD66] rounded-lg flex-1"
            >
              Yes, Continue
            </Button>
          </DialogFooter>
        </div>
      </Dialog>
      <AuthStatus isOpen={isAuthStatusOpen} onClose={handleAuthStatusClose} />
    </>
  );
}
