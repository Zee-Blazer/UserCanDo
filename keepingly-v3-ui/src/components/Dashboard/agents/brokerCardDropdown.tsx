import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import { TrashSimple } from "@phosphor-icons/react";
import { EllipsisVertical, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChangeRoleModal from "./changeRoleModal";
import SuspendBrokerModal from "./suspendBrokerModal";
import DeleteBrokerModal from "./deleteBrokerModal";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";

interface BrokerCardDropdownProps {
	user_id: string;
	role: string;
	is_suspended: boolean;
}
const BrokerCardDropdown = ({
	user_id,
	role,
	is_suspended,
}: BrokerCardDropdownProps) => {
	const {
		isSuccess: isSuspended,
		loading: isSuspending,
		postRequest: suspendBroker,
	} = usePostRequest();

	const {
		isSuccess: isDeleted,
		loading: isDeleting,
		postRequest: deleteBroker,
	} = usePostRequest();

	const {
		isSuccess: isUpdated,
		loading: isUpdating,
		postRequest: updateBroker,
	} = usePostRequest();

	const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
	const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { getBrokers, loadOverView } = useAppContext();
	const [newRole, setNewRole] = useState(role);

	const suspend = async () => {
		suspendBroker("/suspend_broker_user", { user_id });
	};
	const deleteBrokerAction = async () => {
		deleteBroker("/delete_broker_user", { user_id });
	};
	const updateBrokerAction = async () => {
		updateBroker("/update_broker_role", {
			user_id,
			role:
				newRole === "Broker admin"
					? "broker_admin"
					: newRole === "Broker super-user"
					? "broker_admin_user"
					: "broker_agent",
		});
	};

	useEffect(() => {
		if (isSuspended) {
			setIsSuspendModalOpen(false);
			getBrokers();
		}

		if (isDeleted) {
			setIsDeleteModalOpen(false);
			getBrokers();
			loadOverView();
		}

		if (isUpdated) {
			setIsChangeModalOpen(false);
			getBrokers();
		}
	}, [isSuspended, isDeleted, isUpdated]);

	useEffect(() => {
		setNewRole(role);
	}, []);

	return (
		<>
			<Popover placement='bottom-end'>
				<PopoverHandler>
					<EllipsisVertical size={20} className='cursor-pointer' />
				</PopoverHandler>
				<PopoverContent className='w-60 dark:bg-black bg-white border-none flex flex-col'>
					<Button
						variant='text'
						className='flex items-center gap-2 text-gray_5 dark:text-gray_3 cursor-pointer'
						onClick={() => setIsChangeModalOpen(true)}
					>
						<UserPlus size={20} />
						<Typography className='lowercase first-letter:capitalize'>
							Change role
						</Typography>
					</Button>
					<Button
						variant='text'
						className='flex items-center gap-2 text-[#A89D00A3]  cursor-pointer lowercase first-letter:capitalize border-none'
						onClick={() => setIsSuspendModalOpen(true)}
					>
						<TrashSimple size={20} />
						<Typography className='lowercase first-letter:capitalize border-none'>
							{is_suspended ? "Restore" : "Suspend"}
						</Typography>
					</Button>
					<Button
						variant='text'
						className='flex items-center gap-2 text-pry cursor-pointer lowercase first-letter:capitalize border-none'
						onClick={() => setIsDeleteModalOpen(true)}
					>
						<TrashSimple size={20} />
						<Typography className='lowercase first-letter:capitalize'>
							Delete
						</Typography>
					</Button>
				</PopoverContent>
			</Popover>
			<ChangeRoleModal
				closeModal={() => setIsChangeModalOpen(false)}
				handleOpen={() => setIsChangeModalOpen(!isChangeModalOpen)}
				open={isChangeModalOpen}
				setNewRole={setNewRole}
				newRole={newRole}
				action={updateBrokerAction}
				loading={isUpdating}
			/>
			<SuspendBrokerModal
				closeModal={() => setIsSuspendModalOpen(false)}
				handleOpen={() => setIsSuspendModalOpen(!isSuspendModalOpen)}
				open={isSuspendModalOpen}
				action={suspend}
				loading={isSuspending}
			/>
			<DeleteBrokerModal
				closeModal={() => setIsDeleteModalOpen(false)}
				handleOpen={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
				open={isDeleteModalOpen}
				action={deleteBrokerAction}
				loading={isDeleting}
			/>
		</>
	);
};

export default BrokerCardDropdown;
