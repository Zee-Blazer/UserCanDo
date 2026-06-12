import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import ActionCard from "./actionCard";
import icon1 from "@/assets/images/inactive1.png";
import icon2 from "@/assets/images/active2.png";
import icon3 from "@/assets/images/active1.png";
import icon4 from "@/assets/images/inactive2.png";
import icon5 from "@/assets/images/active3.png";
import icon6 from "@/assets/images/inactive3.png";
import { useAuth } from "@/context/authContext";
// import { useAuth } from "@/context/authContext";

const AuthActions = () => {
	const actions = [
		{
			title: "I am looking to manage my business",
			use_case: "vendor",
			activeIcon: icon3,
			inactiveIcon: icon1,
		},
		{
			title: "I am looking to buy products",
			use_case: "buyer",
			activeIcon: icon2,
			inactiveIcon: icon4,
		},
		{
			title: "Both",
			use_case: "both",
			activeIcon: icon5,
			inactiveIcon: icon6,
		},
	];
	const [activeIndex, setActiveIndex] = useState(0);
	const { setCreateAccountData, createAccountData } = useAuth();

	return (
		<div className='mt-6'>
			<Typography className='text-3xl font-semibold'>
				How do you intend <br /> to use Kola?
			</Typography>
			<div className='flex flex-col gap-4 mt-8'>
				{actions.map((action, index) => {
					return (
						<ActionCard
							key={index}
							action={() => {
								setActiveIndex(index);
								setCreateAccountData({
									...createAccountData,
									use_case: action.use_case,
								});
							}}
							active={activeIndex === index}
							title={action.title}
							activeIcon={action.activeIcon}
							inactiveIcon={action.inactiveIcon}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default AuthActions;
