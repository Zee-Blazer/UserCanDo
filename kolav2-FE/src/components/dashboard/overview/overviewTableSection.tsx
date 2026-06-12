import React, { useState } from "react";
import TopSellingAgentSection from "@/components/dashboard/overview/topSellingAgentSection";
import TableToggleView from "./views/tableToggleView";
import TopSellingProductSection from "./topSellingProductSection";
import { Typography } from "@material-tailwind/react";

const OverviewTableSection = () => {
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const list = ["Top Selling Agents", "Top Selling Products"];
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
      {selectedTableIndex === 0 && <TopSellingAgentSection />}
      {selectedTableIndex === 1 && <TopSellingProductSection />}
    </div>
  );
};

export default OverviewTableSection;
