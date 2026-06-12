import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "@phosphor-icons/react";
import PaymentStatus from "./paymentStatus";

interface RepaymentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RepaymentHistoryModal = ({
  isOpen,
  onClose,
}: RepaymentHistoryModalProps) => {
  const paymentHistory = [
    {
      status: "success",
      method: "Card",
      date: "22-07-2023",
      amount: "96.00",
    },
    {
      status: "failed",
      method: "Mobile Money",
      date: "22-07-2023",
      amount: "96.00",
    },
  ];

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
      <div className="flex w-full justify-end pr-5">
        <IconButton
          className=" bg-[#FAFAFA] p-2 rounded-full"
          onClick={onClose}
        >
          {" "}
          <X size={12} color="#6D7280" />{" "}
        </IconButton>
      </div>
      <DialogHeader className="px-5">
        <Typography className="font-inter font-bold text-2xl text-[#0D121D]">
          Repayment history
        </Typography>
      </DialogHeader>
      <hr className="border border-1 border-[#F1F1F1] border-opacity-40 my-2" />
      <DialogBody className="flex flex-col gap-y-2 px-5">
        {paymentHistory.map((item, index) => (
          <PaymentStatus
            key={index}
            status={item.status}
            method={item.method}
            date={item.date}
            amount={item.amount}
          />
        ))}
      </DialogBody>
    </Dialog>
  );
};

export default RepaymentHistoryModal;
