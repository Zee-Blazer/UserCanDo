import { FormInput, FormTextArea } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { getStatusDisplay, getStatusStyle } from "@/utils/helpers";
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
import React, { useState, useEffect } from "react";

interface StatusHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  closeFlyout: () => void;
  orderData: any;
  selectedStatus: any;
}

interface FormData {
  request_date: string;
  comment: string;
}

const UpdateHistory = ({
  isOpen,
  onClose,
  orderData,
  selectedStatus,
  closeFlyout,
}: StatusHistoryProps) => {
  const [formData, setFormData] = useState<FormData>({
    request_date: new Date().toISOString().split("T")[0],
    comment: "",
  });

  useEffect(() => {
    if (selectedStatus) {
      setFormData({
        request_date:
          selectedStatus.status_date || new Date().toISOString().split("T")[0],
        comment: selectedStatus.comment || "",
      });
    }
  }, [selectedStatus]);

  const { handleUpdateSaleStatus, isSaleStatusUpdating } = useDash();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStatus) return;

    const payload = {
      id: orderData.id,
      status: selectedStatus.status,
      status_date: formData.request_date,
      comment: formData.comment,
    };

    handleUpdateSaleStatus(payload, () => {
      onClose();
      closeFlyout();
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="md"
      open={isOpen}
      handler={onClose}
      className="relative p-5"
    >
      <form onSubmit={handleSubmit}>
        <DialogHeader className="relative m-0 block">
          <Typography className="text-xl font-medium">
            Update Status Info
          </Typography>
          <IconButton
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </IconButton>
        </DialogHeader>

        <DialogBody>
          <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 w-full">
            <label className="text-sm font-medium text-[#101828] self-center">
              Status
            </label>
            <div className="w-full flex items-center gap-3">
              <div
                className={`rounded-md p-2 font-medium min-w-[130px] text-center ${getStatusStyle(
                  selectedStatus?.status
                )}`}
              >
                {getStatusDisplay(selectedStatus?.status)}
              </div>
            </div>

            <label className="text-sm font-medium text-[#101828] self-center">
              Request Date
            </label>
            <div className="w-full">
              <FormInput
                name="request_date"
                type="date"
                className="bg-inherit w-full"
                paddingY="3"
                value={formData.request_date}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-4">
              <label className="text-sm font-medium text-black">Comment</label>
              <FormTextArea
                name="comment"
                className="border w-full border-gray-300 min-h-[130px]"
                placeholder="Add a comment about this status update"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </DialogBody>

        <DialogFooter className="flex justify-end gap-4 mt-4">
          <Button
            type="submit"
            className="bg-pry2 normal-case text-white font-normal min-w-[180px] text-sm px-4 py-3 rounded-lg shadow-sm"
            disabled={isSaleStatusUpdating || !selectedStatus}
            loading={isSaleStatusUpdating}
          >
            Update Info
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-white text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2"
            disabled={isSaleStatusUpdating}
          >
            <X className="h-5 w-5" />
            Close
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default UpdateHistory;
