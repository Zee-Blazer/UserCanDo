import { useAuthSelector } from "@/Redux/selectors";
import { brokerNavItems, homeOwnerNavItems } from "@/types/mockData";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NativeMobileNav = () => {
	const { user } = useAuthSelector();
	const role = user?.role;
	const navItems = role === "homeowner" ? homeOwnerNavItems : brokerNavItems;
	const pathName = usePathname();
	return (
		<div className='fixed bottom-0 bg-white justify-between dark:bg-black p-4 w-full flex items-center'>
			{navItems.map(({ link, activeIcon }, index) => {
				const isActive = pathName === link;
				return (
					<Link
						href={link}
						key={index}
						className={`${
							isActive ? "dark:bg-gray_5 bg-gray_2 rounded-full" : "opacity-70"
						} dark:text-white text-black w-10 h-10 flex items-center justify-center`}
					>
						{activeIcon}
					</Link>
				);
			})}
		</div>
	);
};

export default NativeMobileNav;
