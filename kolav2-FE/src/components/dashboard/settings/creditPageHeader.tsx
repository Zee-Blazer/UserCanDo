import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface CreditPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const CreditPageHeader = ({
  activeIndex,
  setActiveIndex,
}: CreditPageHeaderProps) => {
  const btnTexts = [
    { label: "Personal and Financial Information" },
    { label: "Credit Assessment" },
  ];

  return (
    <div className="flex gap-10 border-b-[1px] border-b-gray_2 -mx-4 px-4">
      {btnTexts.map((btn, index) => {
        return (
          <Button
            key={index}
            className={`normal-case bg-transparent shadow-none p-0 py-2 hover:shadow-none ${
              activeIndex === index
                ? "text-black font-medium border-b-sec"
                : "text-gray_4 font-medium border-b-transparent"
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

export default CreditPageHeader;
