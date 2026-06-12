import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface TeamPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const TeamPageHeader = ({
  activeIndex,
  setActiveIndex,
}: TeamPageHeaderProps) => {
  const btnTexts = [{ label: "Teams" }];

  return (
    <div className="px-4 flex flex-col gap-4 py-3">
      <header className="flex flex-col gap-3">
        <Typography variant="h5" className="font-semibold">
          Team
        </Typography>
        <Typography variant="small" className="text-gray_4 font-normal">
          Add People to your business.
        </Typography>
      </header>
      <div className="flex gap-3 -mx-4 px-4">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent shadow-none p-0 py-2 hover:shadow-none ${
                activeIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveIndex(index)}
            >
              <Typography className="flex font-medium items-center gap-2">
                {btn.label}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPageHeader;
