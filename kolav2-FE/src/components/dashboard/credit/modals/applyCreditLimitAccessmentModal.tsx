import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import usePreventRefresh from "@/api/hooks/usePreventRefresh";
import { X } from "lucide-react";
import CreditLimitSlide1 from "../applyForCredit/creditLimitSlide1";
import CreditLimitSlide2 from "../applyForCredit/creditLimitSlide2";
import CreditLimitSlide3 from "../applyForCredit/creditLimitSlide3";

interface ApplyCreditAssessmentModalProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  accessmentFormData: CreditAccessmentFormProps;
  setAccessmentFormData: React.Dispatch<
    React.SetStateAction<CreditAccessmentFormProps>
  >;
}

export const ApplyCreditAssessmentModal = ({
  open,
  onClose,
  onApply,
  accessmentFormData,
  setAccessmentFormData,
}: ApplyCreditAssessmentModalProps) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  usePreventRefresh(true);

  const creditLimitAssessmentSlides = [
    <CreditLimitSlide1
      key="slide1"
      nextSlide={() => setActiveSlideIndex(1)}
      prevSlide={onClose}
      formData={accessmentFormData}
      setFormData={setAccessmentFormData}
    />,
    <CreditLimitSlide2
      key="slide2"
      nextSlide={() => setActiveSlideIndex(2)}
      prevSlide={() => setActiveSlideIndex(0)}
      formData={accessmentFormData}
      setFormData={setAccessmentFormData}
    />,
    <CreditLimitSlide3
      key="slide3"
      nextSlide={onApply}
      prevSlide={() => setActiveSlideIndex(1)}
      formData={accessmentFormData}
      setFormData={setAccessmentFormData}
    />,
  ];

  return (
    <Dialog open={open} handler={onClose} size="lg" className="bg-white">
      <DialogHeader className="flex justify-between items-center border-0 p-4">
        <div className="flex items-center gap-4">
          <IconButton variant="text" onClick={onClose}>
            <X className="h-5 w-5 stroke-2" />
          </IconButton>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-medium text-black">
              Credit Limit Assessment
            </p>
            <p className="text-sm">
              Answer the following questions to determine your eligibility
            </p>
          </div>
        </div>
        <p className="text-sm px-8">
          Step {activeSlideIndex + 1}/{creditLimitAssessmentSlides.length}
        </p>
      </DialogHeader>

      <DialogBody className="p-4 overflow-y-auto max-h-[70vh]">
        <div className="relative w-full">
          {creditLimitAssessmentSlides.map((slide, index) => (
            <div
              key={index}
              className={`w-full transition-transform duration-1000 ease-in-out ${
                index === activeSlideIndex ? "block" : "hidden"
              }`}
            >
              {slide}
            </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  );
};
