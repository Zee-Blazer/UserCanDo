import { colors } from "@/constants/colors";
import { Button, Typography } from "@material-tailwind/react";
import { File, FileDoc, SprayBottle, Users } from "@phosphor-icons/react";
import React from "react";

interface AppraiserNavigatorProps {
	activeSlideIndex: number;
	setActiveSlideIndex: (index: number) => void;
	role: string;
}

const AppraiserNavigator = ({
	activeSlideIndex,
	setActiveSlideIndex,
	role,
}: AppraiserNavigatorProps) => {
	const buttonArr = [
		{
			activeIcon: <Users weight='fill' color={colors.pry} />,
			inactiveIcon: <Users />,
			label: "Appraisers",
		},
		{
			activeIcon: <FileDoc weight='fill' color={colors.pry} />,
			inactiveIcon: <FileDoc />,
			label: "Documents",
		},
		{
			activeIcon: <SprayBottle weight='fill' color={colors.pry} />,
			inactiveIcon: <SprayBottle />,
			label: "Renovations",
		},
		{
			activeIcon: <File weight='fill' color={colors.pry} />,
			inactiveIcon: <File />,
			label: "Requirements",
		},
	];

	const appraiserBtnArr = [
		{
			activeIcon: <FileDoc weight='fill' color={colors.pry} />,
			inactiveIcon: <FileDoc />,
			label: "Documents",
		},
		{
			activeIcon: <SprayBottle weight='fill' color={colors.pry} />,
			inactiveIcon: <SprayBottle />,
			label: "Renovations",
		},
		{
			activeIcon: <File weight='fill' color={colors.pry} />,
			inactiveIcon: <File />,
			label: "Requirements",
		},
	];

	const array = role === "appraiser" ? appraiserBtnArr : buttonArr;

	return (
		<div className='flex gap-4 mb-4 border-b-2 border-borderLight dark:border-borderDark'>
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

export default AppraiserNavigator;
