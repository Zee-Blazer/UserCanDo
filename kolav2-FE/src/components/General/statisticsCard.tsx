import React from "react";
import { Typography } from "@material-tailwind/react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatisticsCard = ({ title, value }: StatisticsCardProps) => {
  return (
    <div className="w-full max-w-[24rem]">
      <div className="flex items-center gap-4">
        <div>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray">
            {value}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
