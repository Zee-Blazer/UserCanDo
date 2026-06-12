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
import Remove from "@/assets/images/remove_icon.svg";
import { Warning } from "@phosphor-icons/react";

interface TrashModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  title: string;
  onDelete?: () => void;
  loading?: boolean;
  returnText?: string;
  proceedText?: string;
  warning?: boolean;
  color?: string;
}

export function TrashModal({
  isOpen,
  onClose,
  header,
  title,
  onDelete,
  loading,
  returnText,
  proceedText,
  warning = false,
  color,
}: TrashModalProps) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative p-0"
    >
      <div className="p-12">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <div className="flex">
            {warning ? (
              <Warning size={64} color="#FF3A44" />
            ) : (
              <Image src={Remove} alt="warning" height={60} width={60} />
            )}
            <IconButton
              variant="text"
              className="!absolute right-3.5"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </IconButton>
          </div>
          <Typography className="text-xl font-medium text-black">
            {header}
          </Typography>
          <div className="flex flex-col">
            <Typography className="text-[#667085]">{title}</Typography>
          </div>
        </DialogBody>

        <DialogFooter className="flex items-center justify-center gap-5 p-0 mt-9 w-full">
          <Button
            loading={loading}
            disabled={loading}
            onClick={onDelete}
            className={`${
              color ? `bg-[${color}]` : "bg-[#FF000D]"
            } normal-case flex justify-center text-center text-white font-medium text-sm shadow-md rounded-lg flex-1`}
          >
            {proceedText ?? "Delete"}
          </Button>
          <Button
            onClick={onClose}
            className="bg-white text-[#344054] font-medium normal-case text-sm border border-[#D0D5DD66] shadow-md rounded-lg flex-1"
          >
            {returnText ?? "Cancel"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}
