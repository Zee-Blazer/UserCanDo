import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import CreditFinancialInfoForm from "../creditFinancialInfoForm";
import PersonalInfoForm from "../personalinformationForm";

interface ApplyForCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  formData: CreditLimitFormProps;
  setFormData: React.Dispatch<React.SetStateAction<CreditLimitFormProps>>;
}

export function ApplyForCreditModal({
  isOpen,
  onClose,
  onApply,
  formData,
  setFormData,
}: ApplyForCreditModalProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(1);

  return (
    <Dialog open={isOpen} handler={onClose} size="xxl">
      <DialogHeader className="flex justify-between items-center px-20 py-6">
        <div className="flex items-center gap-x-6">
          <Image src={logo} alt="Kola logo" className="w-[116px]" />
          <div className=" bg-[#DEDFE0] w-[1px] h-12" />
          {activeSlideIndex === 1 ? (
            <Typography>Step 1 of 2 : Personal Information</Typography>
          ) : (
            <Typography>Step 2 of 2 : Financial Information</Typography>
          )}
        </div>
        <div
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={onClose}
        >
          <Typography className="pt-1 text-sm font-bold text-[#4B525A]">
            Exit
          </Typography>
          <X />
        </div>
      </DialogHeader>

      <div className="flex items-center flex-nowrap">
        <div className={`bg-pry2 w-1/2 h-[4px] rounded-r-lg`} />
        <div
          className={`${
            activeSlideIndex !== 1 ? "bg-pry2" : "bg-transparent"
          } w-1/2 h-[2px] rounded-l-lg`}
        />
      </div>

      <DialogBody className="bg-[#F8FAFB] pt-12">
        <div className="lg:w-1/2 bg-white lg:mx-auto rounded-lg">
          {activeSlideIndex === 1 && (
            <PersonalInfoForm
              handleBack={onClose}
              handleContinue={() => setActiveSlideIndex(2)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {activeSlideIndex === 2 && (
            <CreditFinancialInfoForm
              handleBack={() => setActiveSlideIndex(1)}
              handleContinue={() => {
                onApply();
              }}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default ApplyForCreditModal;
