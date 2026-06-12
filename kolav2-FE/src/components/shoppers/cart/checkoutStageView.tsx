import { Typography } from "@material-tailwind/react";
import { Check } from "@phosphor-icons/react";

export default function CheckoutStageView({
  activeCheckoutSlideIndex,
}: {
  activeCheckoutSlideIndex: number;
}) {
  const stages = ["Delivery", "Payment", "Review"];

  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-[#F9FAFB]">
      {stages.map((stage, index) => (
        <div key={index} className="flex items-center gap-x-1">
          <div
            className={`rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center ${
              index === activeCheckoutSlideIndex
                ? "bg-[#6D7280]"
                : index < activeCheckoutSlideIndex
                ? "bg-[#007AF5]"
                : "bg-[#D2D5DA]"
            } text-white text-[9px] sm:text-[10px]`}
          >
            {index < activeCheckoutSlideIndex ? (
              <Check
                color="white"
                size={10}
                stroke="4"
                className="sm:size-12"
              />
            ) : (
              <Typography className="font-semibold text-[9px] sm:text-sm">
                {index + 1}
              </Typography>
            )}
          </div>
          <Typography
            className={`font-inter font-semibold text-xs sm:text-sm lg:text-base ${
              index > activeCheckoutSlideIndex && "text-[#6D7280]"
            }`}
          >
            {stage}
          </Typography>
        </div>
      ))}
    </div>
  );
}
