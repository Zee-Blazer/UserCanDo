import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface CreditTabProps {
  activeIndex: number;
  onClick: () => void;
  setActiveIndex: (index: number) => void;
}

const CreditTabs = ({
  activeIndex,
  setActiveIndex,
  onClick,
}: CreditTabProps) => {
  const btnTexts = [
    { label: "Apply/Decision for Credit" },
    { label: "Credit Purchases" },
    { label: "Credit PayBack" },
    // { label: "Messaging" },
  ];

  return (
    <div className="flex mt-4 gap-8 border-b-[1px] border-b-gray_2 -mx-4 px-4">
      {btnTexts?.map((btn, index) => {
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
            <Typography>{btn.label}</Typography>
          </Button>
        );
      })}
    </div>
  );
};

export default CreditTabs;
