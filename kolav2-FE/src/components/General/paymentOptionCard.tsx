import { Typography } from "@material-tailwind/react";
import { PaymentPlanCardProps } from "./form/formTypes";
import React from "react";

const PaymentPlanCard: React.FC<PaymentPlanCardProps> = ({
  heading,
  subheading,
  options,
  selectedOption,
  onOptionChange,
  name,
}) => {
  return (
    <main className="mt-8 border border-gray-200">
      <article className="bg-blue_pry1 p-4">
        <Typography variant="h6" className="font-medium text-gray-900">
          {heading}
        </Typography>
        <Typography variant="small" className="text-gray-600">
          {subheading}
        </Typography>
      </article>

      <div className="bg-white">
        {options.map((option) => (
          <div
            key={option?.id}
            className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition-colors"
          >
            <label className="flex items-center justify-between cursor-pointer">
              <article>
                <Typography
                  variant="small"
                  className="mb-1 font-medium text-gray_6"
                >
                  {option.title}
                </Typography>
                <Typography variant="small" className="text-gray_4">
                  {option.description}
                </Typography>
              </article>
              <div>
                <input
                  type="radio"
                  name={name}
                  value={option?.id}
                  checked={selectedOption === option?.id}
                  onChange={() => onOptionChange(option?.id)}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            </label>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PaymentPlanCard;
