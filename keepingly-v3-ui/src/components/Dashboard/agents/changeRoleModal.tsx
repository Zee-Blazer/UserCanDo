import React from "react";
import { Button, Dialog, Typography } from "@material-tailwind/react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form/select";
import { brokerRoles } from "@/types/mockData";

interface ChangeRoleModalProps extends ModalProps {
	setNewRole: (role: string) => void;
	newRole: string;
}

const ChangeRoleModal = ({
	open,
	handleOpen,
	closeModal,
	newRole,
	setNewRole,
	action,
	loading,
}: ChangeRoleModalProps) => {
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography
					className='text-black dark:text-white font-medium text-center'
					variant='h5'
				>
					Change role
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				Select desired role. Please note that changing a broker&apos;s role will
				not affect the broker&apos;s previous activities.
			</Typography>
			<FormSelect
				placeholder='Role'
				options={brokerRoles}
				required
				value={
					newRole === "broker_agent"
						? "Broker agent"
						: newRole === "broker_admin"
						? "Broker admin"
						: newRole === "broker_admin_user"
						? "Broker super-user"
						: newRole
				}
				name='role'
				onChange={(e) => {
					const val = e.target.value;
					setNewRole(val);
				}}
				// error={formErrors?.role}
			/>
			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md flex items-center justify-center'
					onClick={action}
					loading={loading}
				>
					Update
				</Button>
			</div>
		</Dialog>
	);
};

export default ChangeRoleModal;
