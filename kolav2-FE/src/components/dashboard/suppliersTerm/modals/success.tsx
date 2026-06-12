import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import SuccessIcon from "@/assets/images/successIcon.svg";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface SuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Success({ isOpen, onClose }: SuccessProps) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative p-7"
    >
      <div className="p-6">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <Image src={SuccessIcon} alt="success" />
          <Typography className="text-xl font-medium text-pry2">
            Invoice Sent Successfully
          </Typography>
        </DialogBody>

        <DialogFooter className="flex items-center justify-center gap-5 p-0 mt-6 w-full">
          <Link href={ROUTES.creditRequests} className="w-full">
            <Button className="bg-blue_pry text-white font-medium text-sm border w-full shadow-md rounded-lg">
              Back to home
            </Button>
          </Link>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
