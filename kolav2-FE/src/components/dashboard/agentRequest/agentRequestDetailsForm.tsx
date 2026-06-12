import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface AgentRequestDetailsFormProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const AgentRequestDetailsForm = ({
  activeIndex,
  setActiveIndex,
}: AgentRequestDetailsFormProps) => {
  const btnTexts = [
    { label: "Agent Request Details" },
    { label: "Status History" },
  ];
  return (
    <div className="flex gap-7 border-b-[1px] -mx-12 border-b-gray_2 px-4">
      {btnTexts.map((btn, index) => {
        return (
          <Button
            key={index}
            className={`normal-case bg-transparent font-normal shadow-none p-0 py-2 hover:shadow-none ${
              activeIndex === index
                ? "text-black border-b-sec"
                : "text-gray_4 border-b-transparent"
            } border-b-[1px] rounded-none`}
            onClick={() => setActiveIndex(index)}
          >
            <Typography className="flex items-center gap-2">
              {btn.label}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
};

export default AgentRequestDetailsForm;
