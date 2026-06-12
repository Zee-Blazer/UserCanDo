import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import BySpecificCredit from "./views/bySpecificCredit";
import ByBusiness from "./views/byBusiness";

const OverviewCreditReport = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const btnTexts = [{ label: "By Specific Credit" }, { label: "By Business" }];

  return (
    <div className="py-8">
      <div className="flex gap-5 border-b-[1px] border-b-gray_2 -mx-4 px-9">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent font-normal shadow-none p-0 py-2 hover:shadow-none ${
                activeTabIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4 border-b-transparent"
              } border-b-[1px] rounded-none`}
              onClick={() => setActiveTabIndex(index)}
            >
              <Typography className="flex items-center gap-2">
                {btn.label}
              </Typography>
            </Button>
          );
        })}
      </div>
      <div className="py-4 px-5">
        {activeTabIndex === 0 && <BySpecificCredit />}
        {activeTabIndex === 1 && <ByBusiness />}
      </div>
    </div>
  );
};

export default OverviewCreditReport;
