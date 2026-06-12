import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form";
import CurrencyInput from "@/components/General/currencyInput";
import PercentageInput from "@/components/General/percentageInput";

interface AddDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDiscount: (discount: {
    discount_type: string;
    discount_value: number;
  }) => void;
  discountType: string;
  discountValue: number;
}

export function AddDiscountModal({
  isOpen,
  onClose,
  onApplyDiscount,
  discountType: parentDiscountType,
  discountValue: parentDiscountValue,
}: AddDiscountModalProps) {
  const [discountType, setDiscountType] = useState<string>(
    "percentage"
  );
  const [discountValue, setDiscountValue] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setDiscountType(parentDiscountType);
      setDiscountValue(parentDiscountValue);
    }
  }, [isOpen, parentDiscountType, parentDiscountValue]);

  const isPercentageInvalid =
    discountType === "percentage" && (discountValue < 0 || discountValue > 100);
  const isApplyDisabled = isPercentageInvalid || discountValue === 0;

  const handleApply = () => {
    onApplyDiscount({
      discount_type: discountType,
      discount_value: discountValue,
    });
    onClose();
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
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-medium">Add Discount</Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-6 mb-3">
        <div className="flex gap-5 items-center">
          <label className="font-normal text-black text-sm">
            Discount Type
          </label>
          <Radio
            crossOrigin=""
            name="type"
            label="Percentage"
            checked={discountType === "percentage"}
            onChange={() => setDiscountType("percentage")}
          />
          <Radio
            crossOrigin=""
            name="type"
            label="Fixed Amount"
            checked={discountType === "amount"}
            onChange={() => setDiscountType("amount")}
          />
        </div>
        <div className="space-y-5">
          {discountType === "percentage" ? (
            <PercentageInput
              label="Percentage"
              labelGap="gap-[2.3em]"
              value={discountValue}
              onChange={(value) => setDiscountValue(parseFloat(value) || 0)}
            />
          ) : (
            <CurrencyInput
              label="Amount"
              labelGap="gap-[2.3em]"
              value={discountValue}
              onChange={(value) => setDiscountValue(parseFloat(value) || 0)}
            />
          )}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button
          className="bg-[#002147] text-white rounded-md py-3 w-3/4 capitalize"
          onClick={handleApply}
          disabled={isApplyDisabled}
        >
          Apply
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default AddDiscountModal;
