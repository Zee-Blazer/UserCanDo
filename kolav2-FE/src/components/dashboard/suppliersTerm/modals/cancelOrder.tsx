import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface CancelOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CancelOrder({ isOpen, onClose }: CancelOrderProps) {
  const router = useRouter();

  const handleConfirm = () => {
    onClose();
    router.push(ROUTES.creditRequests);
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative px-5 pb-5"
    >
      <DialogHeader>
        <Typography className="text-xl font-medium text-black">
          Cancel Supplier Terms Addition
        </Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody>
        <Typography className="text-[#667085] text-lg">
          You will be redirected to the Credit Request page
        </Typography>
      </DialogBody>

      <DialogFooter className="flex items-center justify-end gap-5 w-full">
        <Button
          onClick={onClose}
          className="bg-white text-[#344054] w-32 normal-case py-2 font-medium text-sm border border-[#D0D5DD66] shadow-md rounded-lg"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          className="bg-[#F63838] py-2 w-32 normal-case text-white font-medium text-sm shadow-md rounded-lg"
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
