import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ModalProps } from "@/types";
import { Check, X } from "lucide-react";
import { Buildings, UserPlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useDashboardSelector } from "@/Redux/selectors";
import AddProperty from "../properties/addProperty";

interface GetStartedModalProps extends ModalProps {
	closeModal: () => void;
	handleOpen: () => void;
	role: string;
	open: boolean;
}
const GetStartedModal = ({
	open,
	handleOpen,
	closeModal,
	role,
}: GetStartedModalProps) => {
	const router = useRouter();
	const { overview } = useDashboardSelector();
	const [isPropModalOpen, setIsPropModalOpen] = useState(false);

	const getStartedArr = [
		{
			icon: <UserPlus size={20} />,
			title: "Add agent",
			desc: "Add an agent to your account as a part of your organization.",
			btnText: "Add an agent",
			isDone: overview?.total_broker_user > 0,
			btnAction: () => router.push(ROUTES.agents),
		},
		{
			icon: <Buildings size={20} />,
			title: "Add property",
			desc: "Add a property to your account for management.",
			btnText: "Add a property",
			isDone: overview?.property_count > 0,
			btnAction: () => {
				setIsPropModalOpen(true);
				closeModal();
			},
		},
	];
	const getStartedArr2 = [
		{
			icon: <Buildings size={20} />,
			title: "Add property",
			desc: "Add a property to your account for management.",
			btnText: "Add a property",
			isDone: overview?.property_count > 0,
			btnAction: () => {
				setIsPropModalOpen(true);
				closeModal();
			},
		},
	];

	const array = role === "homeowner" ? getStartedArr2 : getStartedArr;

	return (
		<>
			<Dialog
				open={open}
				handler={handleOpen}
				className='p-8 rounded-none bg-white dark:bg-black flex flex-1 flex-col'
				size={role === "homeowner" ? "xs" : "md"}
			>
				<div className='flex items-center justify-between mb-6'>
					<Typography
						className='text-black dark:text-white  font-medium text-center'
						variant='h5'
					>
						Let&apos;s get you started
					</Typography>
					<X
						className='cursor-pointer dark:text-gray_3 text-gray_5'
						onClick={closeModal}
					/>
				</div>
				<div
					className={`grid grid-cols-1 ${
						role?.includes("broker") && "md:grid-cols-2"
					} gap-4 flex-1`}
				>
					{array.map(
						({ desc, icon, title, btnText, isDone, btnAction }, index) => {
							return (
								<div
									onClick={() => {}}
									className={`p-6 rounded-lg cursor-pointer relative ${
										isDone
											? "border-[1px] dark:border-darkBg border-gray_1"
											: "dark:bg-darkBg bg-lightBg"
									} flex-1 flex flex-col`}
									key={index}
								>
									<i className='dark:text-gray_3 text-gray_5'>{icon}</i>

									<Typography className='text-black dark:text-white mt-4 mb-2 font-medium'>
										{title}
									</Typography>
									<Typography className='dark:text-gray_3 text-gray_5'>
										{desc}
									</Typography>
									{isDone && (
										<Check className='w-7 h-7 bg-pry text-white rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2' />
									)}
									<div className='flex-1' />
									<Button
										variant='outlined'
										disabled={isDone}
										className='mt-6 w-full lowercase first-letter:capitalize text-pry border-pry shadow-none drop-shadow-none'
										onClick={btnAction}
									>
										{isDone ? "Done" : btnText}
									</Button>
								</div>
							);
						}
					)}
				</div>
				<Button
					variant='text'
					onClick={closeModal}
					className='text-pry block ml-auto lowercase first-letter:capitalize mt-4'
				>
					I&apos;ll do it later
				</Button>
			</Dialog>
			<AddProperty
				handleOpen={() => setIsPropModalOpen(!isPropModalOpen)}
				open={isPropModalOpen}
			/>
		</>
	);
};

export default GetStartedModal;
