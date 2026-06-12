import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction } from "react";
import { AgentItemProps, ModalProps } from "@/types";
import { X } from "lucide-react";
import { useAppContext } from "@/app/context";
import { FormSelect } from "@/components/General/form/select";
import { useDashboardSelector } from "@/Redux/selectors";

interface AssignPropertyModalProps extends ModalProps {
	handleAssign: () => void;
	loading: boolean;
	assignedAgent: string;
	setAssignedAgent: Dispatch<SetStateAction<string>>;
	agents: string[];
}
const AssignPropertyModal = ({
	open,
	handleOpen,
	closeModal,
	handleAssign,
	loading,
	assignedAgent,
	setAssignedAgent,
	agents,
}: AssignPropertyModalProps) => {
	const { isDarkMode } = useAppContext();

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography
					className='text-black dark:text-white  font-medium text-center'
					variant='h5'
				>
					Assign Property to an Agent
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				This property will be assigned to the agent selected below.
			</Typography>
			<FormSelect
				placeholder='Select Agent'
				options={agents}
				// icon={<EnvelopeSimple size={20} />}
				value={assignedAgent || ""}
				onChange={(e) => {
					setAssignedAgent(e.target.value);
				}}
				color={isDarkMode ? "white" : "black"}
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
					onClick={handleAssign}
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md'
					loading={loading}
				>
					Assign
				</Button>
			</div>
		</Dialog>
	);
};

export default AssignPropertyModal;
