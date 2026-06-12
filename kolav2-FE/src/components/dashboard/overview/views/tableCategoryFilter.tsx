import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const TableCategoryFilter = () => {
  const list = ["By Value", "History"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex items-center gap-4 border-b">
      {list.map((item, index) => (
        <Typography
          key={index}
          className={`text-sm ${
            selectedIndex === index
              ? "text-gray_5 border-b-sec"
              : "text-gray_3 border-b-transparent"
          } cursor-pointer select-none border-b-[1px] pb-2`}
          onClick={() => setSelectedIndex(index)}
        >
          {item}
        </Typography>
      ))}
    </div>
  );
};

export default TableCategoryFilter;
