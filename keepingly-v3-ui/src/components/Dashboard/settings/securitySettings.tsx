import { Button, Typography } from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import ChangePasswordModal from "./changePasswordModal";
import ConfirmLogoutModal from "./confirmLogout";
import { useDispatch } from "react-redux";

const SecuritySettings = () => {
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
		useState(false);
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const dispatch = useDispatch();

	const logout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	return (
		<div className='mt-8'>
			<Typography className='text-base font-bold text-black dark:text-white'>
				Security settings
			</Typography>
			<div className='flex flex-col gap-4 mt-4'>
				<Button
					onClick={() => setIsChangePasswordModalOpen(true)}
					className='dark:bg-darkBg bg-lightBg w-full flex items-center justify-between p-4'
				>
					<Typography className='lowercase first-letter:capitalize text-black dark:text-white'>
						Change password
					</Typography>
					<ChevronRight className='text-black dark:text-white' />
				</Button>
				<Button
					onClick={() => setIsLogoutModalOpen(true)}
					className='dark:bg-darkBg bg-lightBg w-full flex items-center justify-between p-4'
				>
					<Typography className='lowercase first-letter:capitalize text-black dark:text-white'>
						Logout
					</Typography>
					<ChevronRight className='text-black dark:text-white' />
				</Button>
			</div>
			<ChangePasswordModal
				closeModal={() => setIsChangePasswordModalOpen(false)}
				handleOpen={() =>
					setIsChangePasswordModalOpen(isChangePasswordModalOpen)
				}
				open={isChangePasswordModalOpen}
			/>
			<ConfirmLogoutModal
				closeModal={() => setIsLogoutModalOpen(false)}
				handleOpen={() => setIsLogoutModalOpen(!isLogoutModalOpen)}
				open={isLogoutModalOpen}
				action={logout}
			/>
		</div>
	);
};

export default SecuritySettings;
