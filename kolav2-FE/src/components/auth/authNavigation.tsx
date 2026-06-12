import { Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import React from "react";

interface AuthNavigationProps {
  activeIndex?: number;
  visible?: boolean;
  onBack?: () => void;
}
const AuthNavigation = ({
  activeIndex = 0,
  visible = false,
  onBack,
}: AuthNavigationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
        <ChevronLeft color={"#0052A3"} />
        <Typography className="text-[#0052A3] font-medium">Back</Typography>
      </div>

      {visible && (
        <div className="flex gap-1">
          <div
            className={`w-[48px] h-[8px] bg-yellow_pry rounded-full ${
              activeIndex !== 0 && "bg-opacity-50"
            }`}
          />
          <div
            className={`w-[48px] h-[8px] bg-yellow_pry rounded-full ${
              activeIndex !== 1 && "bg-opacity-50"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default AuthNavigation;
