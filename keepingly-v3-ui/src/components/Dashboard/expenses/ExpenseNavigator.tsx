import { colors } from "@/constants/colors";
import {  Typography } from "@material-tailwind/react";
import { Bank, ListBullets, Money } from "@phosphor-icons/react";
import React from "react";

interface AppraiserNavigatorProps {
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  role: string;
}

const ExpenseNavigator = ({
  activeSlideIndex,
  setActiveSlideIndex,
  role,
}: AppraiserNavigatorProps) => {
  const buttonArr = [
    {
      activeIcon: <Money weight="fill" color={colors.pry} />,
      inactiveIcon: <Money />,
      label: "Expenses",
    },
    {
      activeIcon: <Bank weight="fill" color={colors.pry} />,
      inactiveIcon: <Bank />,
      label: "Bank Accounts",
    },
    {
      activeIcon: <ListBullets weight="fill" color={colors.pry} />,
      inactiveIcon: <ListBullets />,
      label: "Transactions",
    },
  ];

  const appraiserBtnArr = [
    {
      activeIcon: <Money weight="fill" color={colors.pry} />,
      inactiveIcon: <Money />,
      label: "Expenses",
    },
  ];

  const array = role === "appraiser" ? appraiserBtnArr : buttonArr;

  return (
    <div className="flex gap-4 mb-4 border-b-2 border-borderLight dark:border-borderDark">
      {array.map((btn, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center ${
            activeSlideIndex === index ? "border-b-2 border-pry" : ""
          } cursor-pointer px-4 py-2`}
          onClick={() => setActiveSlideIndex(index)}
        >
          <i>
            {activeSlideIndex === index ? btn.activeIcon : btn.inactiveIcon}
          </i>
          <Typography
            className={`${
              activeSlideIndex === index && "text-pry"
            } font-medium`}
          >
            {btn.label}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ExpenseNavigator;
