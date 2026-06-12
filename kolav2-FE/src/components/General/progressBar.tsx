import React from "react";

interface ProgressBarProps {
  percentage: number;
  height?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, height = "1.5" }) => {
  const safePercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div
      className={`w-full bg-gray-300 rounded-full h-${height} ${
        safePercentage === 0 ? 'border border-gray-400' : ''
      }`}
    >
      <div
        className={`h-${height} rounded-full bg-[#F5AA29] transition-all duration-500 ease-in-out`}
        style={{ width: `${safePercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;