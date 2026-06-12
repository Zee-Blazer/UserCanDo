import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import SuccessIcon from "@/assets/images/sale_success.png";

interface PaymentSuccessModalProps {
  isSuccess: boolean;
  onClose: () => void;
}

export function PaymentSuccessModal({
  isSuccess,
  onClose,
}: PaymentSuccessModalProps) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isSuccess}
      handler={onClose}
      className="relative p-7"
    >
      <div className="p-6">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <Image src={SuccessIcon} alt="success" />
          <Typography className="text-xl font-medium text-pry2">
            Sale Placed Successfully !
          </Typography>
        </DialogBody>

        <DialogFooter className="flex items-center justify-center gap-5 p-0 mt-6 w-full">
          <Button
            onClick={onClose}
            className="bg-pry2 text-white font-medium text-sm border w-full shadow-md rounded-lg"
          >
            Okay
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
