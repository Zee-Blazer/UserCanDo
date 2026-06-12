import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction } from "react";
import { ModalProps } from "@/types";
import RolePicker from "./rolePicker";

interface ChooseRoleModalProps extends ModalProps {
	setRole: Dispatch<SetStateAction<string>>;
}
const ChooseRoleModal = ({
	open,
	handleOpen,
	closeModal,
	setRole,
	action,
	loading,
}: ChooseRoleModalProps) => {
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			dismiss={{ enabled: false }}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			{/* <div className='flex items-center justify-between mb-6'> */}
			<Typography
				className='text-black dark:text-white  font-medium text-left'
				variant='h5'
			>
				Select your role
			</Typography>

			<RolePicker setRole={setRole} />

			<Button
				onClick={action}
				loading={loading}
				className='bg-pry text-white normal-case'
			>
				Continue
			</Button>
		</Dialog>
	);
};

export default ChooseRoleModal;
