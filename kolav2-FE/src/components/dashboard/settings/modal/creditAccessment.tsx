import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";

interface CreditAccessmentModalProps {
  open: boolean;
  onClose: () => void;
}

const CreditAccessment = ({ open, onClose }: CreditAccessmentModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <Dialog
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      size="lg"
      open={open}
      handler={onClose}
      className="relative p-5 max-h-[90vh] overflow-hidden"
    >
      <header className="pb-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <button title="close_icon" onClick={onClose}>
              <XIcon color="#101828" />
            </button>
            <div>
              <Typography className="font-semibold text-black text-2xl">
                Credit Limit Assessment
              </Typography>
              <Typography className="text-gray_6 text-lg mt-1">
                Answer the following questions to determine your eligibility
              </Typography>
            </div>
          </div>
          <Typography className="text-gray_6 text-lg">
            Step {currentStep}/3
          </Typography>
        </div>
      </header>
      <DialogBody className="overflow-y-auto max-h-[calc(90vh-200px)] pr-2">
        <div className="transition-all duration-300 ease-in-out transform">
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-end mt-4 pt-4">
        <Button
          className="bg-pry2 py-2 normal-case"
          onClick={handleNext}
          disabled={currentStep === 3}
        >
          <Typography className="text-white">
            {currentStep === 3 ? "Check Credit Limit" : "Next"}
          </Typography>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default CreditAccessment;
