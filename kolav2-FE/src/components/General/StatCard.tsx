import React from "react";
import type { LucideIcon } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  timeframe?: string;
  Icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  timeframe = "Last 30 days",
  Icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="flex flex-row items-center bg-white p-5 rounded-lg border border-gray-200 shadow-sm gap-x-4">
      <div
        className={`mt-4 p-3 rounded-full ${iconBgColor} flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>

      <div className=" flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-1 text-sm text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span>{change}</span>
          <span className="text-[#667085] text-[10px] whitespace-nowrap ">
            {timeframe}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
