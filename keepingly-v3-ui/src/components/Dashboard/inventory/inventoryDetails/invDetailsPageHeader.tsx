import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";

const InvDetailsPageHeader = ({
	openModal,
	makeEditable,
	isEditable,
	action,
	loading,
	name,
}: {
	openModal: () => void;
	makeEditable: () => void;
	isEditable: boolean;
	action: () => void;
	loading: boolean;
	name: string;
}) => {
	const router = useRouter();
	return (
		<div className='flex flex-col md:flex-row md:items-center gap-4 justify-between'>
			<div className='flex items-center gap-4'>
				<IconContainer onClick={() => router.back()} icon={<ArrowLeft />} />
				<Typography className='dark:text-white text-black font-medium text-xl'>
					{name}
				</Typography>
			</div>
			<div className='flex items-center gap-4'>
				<Button
					className='lowercase first-letter:capitalize text-pry border-pry text-base'
					variant='outlined'
					onClick={openModal}
				>
					Upload document
				</Button>
				<Button
					className='lowercase first-letter:capitalize bg-pry text-base'
					onClick={isEditable ? action : makeEditable}
					loading={loading}
					disabled={loading}
				>
					{isEditable ? "Update inventory" : "Edit item"}
				</Button>
			</div>
		</div>
	);
};

export default InvDetailsPageHeader;
