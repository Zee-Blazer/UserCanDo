import React, { ReactNode } from "react";
import { Typography } from "@material-tailwind/react";

const StatsDataItem = ({
  title,
  numbers,
  children,
}: {
  title: string;
  numbers: string | number;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Typography className="text-#6F6F6F text-sm pb-2">{title}</Typography>
      <Typography className="text-2xl font-bold">{numbers}</Typography>
      {children}
    </div>
  );
};

export default StatsDataItem;
