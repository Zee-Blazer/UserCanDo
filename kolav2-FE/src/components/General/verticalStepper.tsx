import React, { ReactNode } from "react";
import { Typography } from "@material-tailwind/react";

interface Step {
  icon: ReactNode;
  label: string;
}

interface VerticalStepperProps {
  steps: Step[];
  labelColor?: string;
  className?: string;
}

const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  labelColor,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4 relative">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center z-10">
              {step.icon}
            </div>
            {index !== steps.length - 1 && (
              <div className="h-10 w-0.5 bg-pry2 my-1" />
            )}
          </div>

          <Typography
            variant="paragraph"
            className="text-sm pt-1.5"
            style={{ color: labelColor }}
          >
            {step.label}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default VerticalStepper;
