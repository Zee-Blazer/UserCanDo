"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SettingIcon } from "@/assets/icons";
import NavLists from "./navLists";
import { ChevronRight, EllipsisVertical, SunDim } from "lucide-react";
import { Moon } from "@phosphor-icons/react";
import { useAppContext } from "@/app/context";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAuthSelector } from "@/Redux/selectors";
import LazyImage from "@/components/General/imageComp";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import ConfirmLogoutModal from "../settings/confirmLogout";

const Navbar = () => {
	const { isDarkMode, toggleTheme, isMobile } = useAppContext();
	const { profileUser } = useAuthSelector();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const profileImage = profileUser?.profile_url;
	const firstNameInitial = profileUser?.first_name?.slice(0, 1);
	const lastNameInitial = profileUser?.last_name?.slice(0, 1);

	const userInitiatial = `${firstNameInitial || ""}${lastNameInitial || ""}`;

	const logout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	return (
		<div className='flex items-center justify-between p-4'>
			{isMobile ? (
				<div className='w-10 h-10 flex items-center justify-center'>
					{profileImage ? (
						<LazyImage
							alt='image'
							width={40}
							className='w-full h-full object-cover rounded-full'
							height={40}
							src={profileImage}
						/>
					) : (
						<div className='text-pry bg-[#A61D4A29] text-sm w-10 h-10 rounded-md flex items-center justify-center font-bold'>
							{userInitiatial}
						</div>
					)}
				</div>
			) : (
				<div className='items-center gap-4 flex'>
					<Image
						src={"/images/logo2.png"}
						alt='logo'
						className='w-10 h-10 hidden md:block'
						width={40}
						height={40}
					/>
					<NavLists />
				</div>
			)}

			<div className='flex items-center gap-4'>
				<i onClick={toggleTheme} className='text-gray_3 cursor-pointer'>
					{isDarkMode ? <SunDim size={24} /> : <Moon size={24} />}
				</i>
				<Link href={ROUTES.settings}>
					<SettingIcon />
				</Link>
				{!isMobile && (
					<Popover placement='bottom-end'>
						<PopoverHandler>
							<div className='w-10 h-10 flex items-center justify-center cursor-pointer'>
								{profileImage ? (
									<LazyImage
										alt='image'
										width={40}
										className='w-full h-full rounded-full object-cover'
										height={40}
										src={profileImage}
									/>
								) : (
									<div className='text-pry bg-[#A61D4A29] text-sm w-10 h-10 rounded-md flex items-center justify-center font-bold'>
										{userInitiatial}
									</div>
								)}
							</div>
						</PopoverHandler>
						<PopoverContent className='w-60 dark:bg-black bg-white border-none flex flex-col gap-3'>
							<Link
								href={ROUTES.settings}
								className='dark:bg-darkBg bg-lightBg w-full flex items-center justify-between p-2 cursor-pointer'
							>
								<Typography className='lowercase first-letter:capitalize text-black dark:text-white'>
									Profile
								</Typography>
								<ChevronRight className='text-black dark:text-white' />
							</Link>
							<Link
								href={ROUTES.bin}
								className='dark:bg-darkBg bg-lightBg w-full flex items-center justify-between p-2 cursor-pointer'
							>
								<Typography className='lowercase first-letter:capitalize text-black dark:text-white'>
									Bin
								</Typography>
								<ChevronRight className='text-black dark:text-white' />
							</Link>
							<div
								onClick={() => setIsLogoutModalOpen(true)}
								className='dark:bg-darkBg bg-lightBg w-full flex items-center justify-between p-2 cursor-pointer'
							>
								<Typography className='lowercase first-letter:capitalize text-black dark:text-white'>
									Logout
								</Typography>
								<ChevronRight className='text-black dark:text-white' />
							</div>
						</PopoverContent>
					</Popover>
				)}
			</div>
			<ConfirmLogoutModal
				closeModal={() => setIsLogoutModalOpen(false)}
				handleOpen={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
				open={isLogoutModalOpen}
				action={logout}
			/>
		</div>
	);
};

export default Navbar;
