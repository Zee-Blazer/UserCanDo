import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import React from "react";

interface ConfirmCartModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmButtonText: string;
  onConfirm?: (cb?: () => void) => void;
  loading?: boolean;
}

const ConfirmCartModal = ({
  open,
  onClose,
  title,
  description,
  confirmButtonText,
  onConfirm,
  loading,
}: ConfirmCartModalProps) => {
  return (
    <Dialog open={open} handler={onClose} size="sm" className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-medium">{title}</Typography>
        <Typography variant="small" className="text-black mt-6 font-normal">
          {description}
        </Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>

      <DialogFooter className="flex mt-5 justify-between gap-4">
        <Button
          onClick={onClose}
          className="w-[30%] shadow-none border border-gray_3 bg-gray_1 font-normal normal-case text-sm text-pry2"
        >
          Cancel
        </Button>
        <Button
          className="w-[30%] normal-case text-sm font-normal bg-pry2"
          onClick={() => onConfirm?.()}
          loading={loading}
          disabled={loading}
        >
          {confirmButtonText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmCartModal;
