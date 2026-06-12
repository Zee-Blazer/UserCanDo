import { useDash } from "@/context/dashboardContext";
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
import React, { useState, useEffect } from "react";

interface PaymentChannelModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  cartItems: CartItem[];
  selectedCustomer: CreateCustomerProps | null;
  discountType: string | null;
  discountValue: number;
}

const PaymentChannelModal = ({
  open,
  onClose,
  onSuccess,
  cartItems,
  selectedCustomer,
  discountType,
  discountValue,
}: PaymentChannelModalProps) => {
  const { isSaleCartCreating, handleCreateSaleCart } = useDash();
  const [paymentMode, setPaymentMode] = useState<string>("cash");

  useEffect(() => {
    if (open) {
      setPaymentMode("cash");
    }
  }, [open]);

  const handlePaymentModeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMode(event?.target?.value || "cash");
  };

  const handleCreateSale = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before placing a sale.");
      return;
    }

    if (cartItems?.length === 0) {
      alert("Your cart is empty. Please add items before placing a sale.");
      return;
    }

    const saleCartPayload: any = {
      customer_entity_id: selectedCustomer?.customer_entity_id,
      customer_entity_type: selectedCustomer?.customer_entity_type,
      type: "sale_pos",
      payment_mode: paymentMode,
      discount_type: discountType || "none",
      discount_value: discountValue,
      products: cartItems?.map((item) => ({
        product_id: item?.id,
        quantity: item?.quantity,
        unit_price: Number(item?.product_retail_price),
        total_price: Number(item?.product_retail_price * item?.quantity),
      })),
    };

    handleCreateSaleCart(saleCartPayload, () => {
      onSuccess();
    });
  };

  return (
    <Dialog open={open} handler={onClose} size="sm" className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-medium">Payment Channel</Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="w-full">
        <Typography variant="small" className="text-black">
          Select how customer will make payment
        </Typography>
        <div className="flex mt-3 flex-col gap-4">
          <Radio
            crossOrigin=""
            name="paymentMode"
            id="cash"
            value="cash"
            label={
              <div className="flex flex-col">
                <span className="text-black">Cash</span>
                <span className="text-gray_3 text-sm">Pay with cash</span>
              </div>
            }
            checked={paymentMode === "cash"}
            onChange={handlePaymentModeChange}
          />
          <Radio
            crossOrigin=""
            name="paymentMode"
            id="mobile_money"
            value="mobile_money"
            label={
              <div className="flex flex-col">
                <span className="text-black">Mobile Money</span>
                <span className="text-gray_3 text-sm">
                  Mobile money payment
                </span>
              </div>
            }
            checked={paymentMode === "mobile_money"}
            onChange={handlePaymentModeChange}
          />
          <Radio
            crossOrigin=""
            name="paymentMode"
            id="cheque"
            value="cheque"
            label={
              <div className="flex flex-col">
                <span className="text-black">Cheque</span>
                <span className="text-gray_3 text-sm">Cheque payment</span>
              </div>
            }
            checked={paymentMode === "cheque"}
            onChange={handlePaymentModeChange}
          />
          <Radio
            crossOrigin=""
            name="paymentMode"
            id="bank_transfer"
            value="bank_transfer"
            label={
              <div className="flex flex-col">
                <span className="text-black">Bank Transfer</span>
                <span className="text-gray_3 text-sm">Bank Transfer</span>
              </div>
            }
            checked={paymentMode === "bank_transfer"}
            onChange={handlePaymentModeChange}
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-between gap-4">
        <Button
          className="w-[40%] shadow-none border border-gray_3 bg-gray_1 font-normal normal-case text-sm text-pry2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="w-[40%] flex justify-center normal-case text-sm font-normal bg-pry2"
          onClick={handleCreateSale}
          disabled={isSaleCartCreating}
          loading={isSaleCartCreating}
        >
          Done
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PaymentChannelModal;
