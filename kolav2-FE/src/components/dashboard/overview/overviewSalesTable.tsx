import React, { useState } from "react";

import TableToggleView from "./views/tableToggleView";
import TopSellingProductSection from "./topSellingProductSection";
import { Typography } from "@material-tailwind/react";
import TotalSalesTable from "./totalSalesTable";

const OverviewSalesTableSection = () => {
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const list = ["Total Sales", "Top Credit Sales"];
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
      {selectedTableIndex === 0 && <TotalSalesTable />}
      {selectedTableIndex === 1 && <TotalSalesTable />}
    </div>
  );
};

export default OverviewSalesTableSection;
