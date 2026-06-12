import { colors } from "@/constants/colors";
import { Button, Typography } from "@material-tailwind/react";
import { PencilSimple, Recycle } from "@phosphor-icons/react";
import React, { useState } from "react";
import DeleteAccountModal from "./confirmAccountDelate";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface SettingsHeaderProps {
	deleteAction?: () => void;
}
const SettingsHeader = ({ deleteAction }: SettingsHeaderProps) => {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	return (
		<div className='flex items-center justify-between mb-4'>
			<Typography className='text-2xl text-black dark:text-white font-bold'>
				Settings
			</Typography>
			<div className='flex gap-2 '>
				<Button
					className='border-pry text-pry lowercase first-letter:capitalize'
					variant='outlined'
					onClick={() => setIsDeleteModalOpen(true)}
				>
					Delete account
				</Button>

				<Link
					href={ROUTES.bin}
					className='border-pry border-[1px] px-4 gap-2 text-white bg-pry flex items-center justify-center rounded-md cursor-pointer'
				>
					<Recycle size={16} />
				</Link>
			</div>
			<DeleteAccountModal
				closeModal={() => setIsDeleteModalOpen(false)}
				handleOpen={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
				open={isDeleteModalOpen}
				action={deleteAction}
			/>
		</div>
	);
};

export default SettingsHeader;
