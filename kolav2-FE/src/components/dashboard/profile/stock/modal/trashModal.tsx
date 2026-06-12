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
import Image from "next/image";
import Trash from "@/assets/images/product_trash.png";

interface TrashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  loading?: boolean;
  onConfirm?: () => void;
}

export function TrashModal({
  isOpen,
  onClose,
  onDelete,
  loading,
  onConfirm,
}: TrashModalProps) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xs"
      open={isOpen}
      handler={onClose}
      className="relative p-0 mx-4 sm:mx-0"
    >
      <IconButton
        variant="text"
        className="!absolute top-3 right-3.5"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </IconButton>
      <div className="p-6 sm:p-8 md:p-12">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <div className="flex">
            <Image src={Trash} alt="warning" height={60} width={60} />
          </div>
          <div>
            <Typography className="text-lg sm:text-xl font-bold text-black">
              Are you sure you want to remove this stock?
            </Typography>
            <Typography className="text-[#667085] mt-2 text-sm sm:text-base">
              This action cannot be undone
            </Typography>
          </div>
        </DialogBody>

        <DialogFooter className="flex items-center justify-center gap-3 sm:gap-5 p-0 mt-6 sm:mt-9 w-full">
          <Button
            onClick={onClose}
            className="bg-white text-[#344054] font-medium normal-case text-sm border border-[#D0D5DD66] shadow-md rounded-lg flex-1"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            onClick={onDelete || onConfirm}
            className="bg-[#EF4444] normal-case flex justify-center text-center text-white font-medium text-sm shadow-md rounded-lg flex-1"
          >
            Remove
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
