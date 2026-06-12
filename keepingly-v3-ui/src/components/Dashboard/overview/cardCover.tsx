import React, { ReactNode, useState } from "react";
import { Sentry } from "react-activity";

import { Typography, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { colors } from "@/constants/colors";

import { LucideIcon } from "lucide-react"; // Adjust icon based on icon type

interface CardCoverProps {
  bottomComp?: ReactNode;
  children?: ReactNode;
  isGradient?: boolean;
  title: string;
  icon?: LucideIcon;
  isFilterable?: boolean;
  loadingState?: boolean;
  loadingText?: string;
  handleSelect?: (value: string) => void;
}

const CardCover = ({
  bottomComp,
  children,
  isGradient,
  isFilterable,
  title,
  icon: Icon,
  loadingState,
  loadingText,
  handleSelect,
}: CardCoverProps) => {
  const [selected, setSelected] = useState("");
  const theme = useTheme();

  return (
    <div
      className={`${
        isGradient
          ? "bg-gradient-to-r from-[#28264B] to-[#A61D4A]"
          : "dark:bg-black bg-lightBg"
      } p-4 rounded-xl min-h-[240px] flex flex-col flex-1`} 
      // dark:bg-darkBg
    >
      <div>
        <div className="flex justify-between items-center">
          
          <div className="flex items-center">
            {
              Icon && 
              <div className="border-gray-300 border dark:border-transparent p-1.5 mr-3 rounded-full">
                <Icon size={18} className={`"text-[${ colors.iconLight }] dark:text-[${ colors.iconDark }]"`} />
              </div>
            }
            <Typography
              className={`whitespace-nowrap font-medium ${
                isGradient ? "text-white" : "text-black dark:text-white"
              } `}
            >
              {title}
            </Typography>
          </div>

          {isFilterable && (
            <div>
              <Select
                value={selected}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelected(val ?? "");
                  handleSelect && handleSelect(val ?? "");
                }}
                displayEmpty
                sx={{
                  minWidth: 120,
                  height: 40,
                  fontSize: "0.875rem",
                  padding: "8px",
                  backgroundColor: isGradient ? "transparent" : undefined,
                  color: isGradient
                    ? "white"
                    : theme.palette.mode === "dark"
                    ? "white"
                    : "black",
                  border: isGradient
                    ? "1px solid rgba(255, 255, 255, 0.5)"
                    : "1px solid #ccc",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover": {
                    backgroundColor: "grey",
                  },
                  "&.Mui-focused": {
                    borderColor: isGradient ? "white" : undefined,
                  },
                }}
                className={`whitespace-nowrap font-medium ${
                  isGradient ? "text-white" : "text-black dark:text-white"
                } `}
              >
                <MenuItem value="">All time</MenuItem>
                <MenuItem value="yearly">This year</MenuItem>
                <MenuItem value="monthly">This month</MenuItem>
                <MenuItem value="weekly">This week</MenuItem>
                <MenuItem value="daily">Today</MenuItem>
              </Select>
            </div>
          )}
        </div>

        {loadingState ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Sentry />
          </div>
        ) : (
          children
        )}

        <div className="flex-1" />
        <div>{bottomComp}</div>
      </div>
    </div>
  );
};

export default CardCover;
