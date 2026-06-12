import { useAuthSelector } from "@/Redux/selectors";
import {
	appraiserNavItems,
	brokerNavItems,
	homeOwnerNavItems,
} from "@/types/mockData";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLists = () => {
	const { user } = useAuthSelector();
	const role = user?.role;
	const navItems =
		role === "homeowner"
			? homeOwnerNavItems
			: role?.includes("broker")
			? brokerNavItems
			: appraiserNavItems;

	const pathName = usePathname();

	return (
		<div className=''>
			<Breadcrumbs separator='' className='bg-transparent'>
				{navItems.map(({ icon, link, title, activeIcon }, index) => {
					const isActive = pathName === link;
					return (
						<div
							key={index}
							className={`${
								isActive
									? "dark:bg-darkBg bg-lightBg p-2 px-4 rounded-full"
									: "opacity-70"
							} dark:text-white text-black`}
						>
							<Link href={link} className='flex items-center gap-2'>
								{isActive ? activeIcon : icon}
								<Typography
									href={link}
									className='text-sm font-medium hidden 2xl:block'
								>
									{title}
								</Typography>
							</Link>
						</div>
					);
				})}
			</Breadcrumbs>
		</div>
	);
};

export default NavLists;
