import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { X } from "@phosphor-icons/react";
import PaymentMethodList from "./PaymentMethodList";
import AddNewCardForm from "./addNewCardForm";
import { useState } from "react";

interface CreditPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditPaymentMethodModal = ({
  isOpen,
  onClose,
}: CreditPaymentMethodModalProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <Dialog
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="sm"
      open={isOpen}
      handler={onClose}
      className="relative py-5"
    >
      <DialogHeader className="px-5 flex items-center justify-between ">
        <Typography className="font-inter font-bold text-xl text-[#0D121D]">
          Repayment history
        </Typography>
        <IconButton
          className=" bg-[#FAFAFA] p-2 rounded-full"
          onClick={onClose}
        >
          {" "}
          <X size={12} color="#6D7280" />{" "}
        </IconButton>
      </DialogHeader>
      <hr className="border border-1 border-[#F1F1F1] border-opacity-40 mb-4 mt-1" />
      <DialogBody className="">
        {activeSlideIndex == 0 && (
          <PaymentMethodList nextSlide={() => setActiveSlideIndex(1)} />
        )}
        {activeSlideIndex == 1 && (
          <AddNewCardForm onSave={() => setActiveSlideIndex(0)} />
        )}
      </DialogBody>
    </Dialog>
  );
};

export default CreditPaymentMethodModal;
