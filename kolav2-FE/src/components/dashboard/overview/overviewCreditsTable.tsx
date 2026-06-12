import React, { useState } from "react";
import TableToggleView from "./views/tableToggleView";
import { Typography } from "@material-tailwind/react";
import TopCreditSection from "./topCreditTable";

const OverviewCreditsTableSection = () => {
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const list = ["Top Specific Credit", "Customer Credits"];
  return (
    <div className="bg-white p-4 border rounded-md border-gray_2">
      <TableToggleView
        activeState={selectedTableIndex}
        setActiveState={setSelectedTableIndex}
        toggleList={list}
      />
      <Typography className="font-semibold my-4">
        {list[selectedTableIndex]}{" "}
        <span className="text-[#6941C6] rounded-full font-normal text-sm bg-[#F8FAFB] p-1">
          All time
        </span>
      </Typography>
      {selectedTableIndex === 0 && <TopCreditSection />}
      {selectedTableIndex === 1 && <TopCreditSection />}
    </div>
  );
};

export default OverviewCreditsTableSection;
