import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import bin from "@/assets/images/bin.png";
import Image from "next/image";
import { X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  onDelete?: () => void;
  selectedItem: any;
}

export function DeleteModal({
  isOpen,
  onClose,
  loading,
  onDelete,
  selectedItem,
}: DeleteModalProps) {
  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative rounded-3xl p-0"
    >
      <IconButton
        variant="text"
        className="!absolute right-3.5"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </IconButton>
      <div className="p-10">
        <DialogBody className="flex flex-col items-center space-y-4 p-0 text-center">
          <Image src={bin} alt="logo" className="w-[116px]" />
          <div>
            <Typography className="font-bold text-black text-2xl">
              Are you sure you want to
            </Typography>
            <Typography className="font-bold text-black text-2xl">
              delete{" "}
              {selectedItem.length === 1
                ? "this item"
                : `${selectedItem.length} items`}
              ?
            </Typography>
          </div>
          <div>
            {selectedItem.length === 1 ? (
              <>
                <Typography className="font-normal text-[#6D7280]">
                  Confirm that you want to delete the item with the
                </Typography>
                <Typography className="font-normal text-[#6D7280]">
                  <span className="truncate mr-1">
                    ID: {selectedItem[0]?.product_id},
                  </span>
                  with {selectedItem[0]?.business_name}.
                </Typography>
              </>
            ) : (
              <Typography className="font-normal text-[#6D7280]">
                Confirm that you want to delete{" "}
                <span className="font-medium">
                  {selectedItem.length} item(s)
                </span>
                {selectedItem[0]?.business_name && (
                  <>
                    {" from "}
                    <span className="font-medium">
                      {selectedItem[0]?.business_name}
                    </span>
                  </>
                )}
                .
              </Typography>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-5 mt-6 w-full">
          <Button
            onClick={onClose}
            className="normal-case shadow-none text-[#474A4E] bg-[#F1F1F1] flex justify-center text-center py-4 font-medium text-md rounded-lg flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            loading={loading}
            disabled={loading}
            className="bg-[#EF4444] shadow-none text-white flex justify-center font-medium normal-case text-md border py-4 border-[#D0D5DD66] rounded-lg flex-1"
          >
            Delete
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

export default DeleteModal;
