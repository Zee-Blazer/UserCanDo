import { FormCheckbox } from "@/components/General/form";
import { DeletedItemsProps } from "@/types";
import { Typography } from "@material-tailwind/react";
import { FileText, Recycle } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import ConfirmRestoreModal from "./confirmRestore";

interface DocCardProps {
	item: DeletedItemsProps;
	selectedItems: DeletedItemsProps[];
	addToList: (type: string, item: DeletedItemsProps) => void;
	restoreItem: (items: DeletedItemsProps[]) => void;
	loading: boolean;
}
const BinCard = ({
	item,
	addToList,
	selectedItems,
	restoreItem,
	loading,
}: DocCardProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id, deletion_timestamp, identifier, type } = item;
	const maxTextLength = 10;

	// Derive `isChecked` directly from `selectedItems`
	const isChecked = selectedItems.some((selected) => selected.id === id);

	return (
		<div
			className={`rounded-md overflow-hidden border border-borderLight dark:border-borderDark w-full`}
		>
			<div className='h-[160px] flex justify-center items-center bg-lightBg dark:bg-darkBg relative'>
				<FileText size={32} className='opacity-50' />
				<span className='absolute top-3 right-3'>
					{/* Toggle selection on checkbox change */}
					<FormCheckbox
						checked={isChecked}
						setChecked={() => addToList(type, item)}
					/>
				</span>
			</div>

			<div className='p-3 h-full flex justify-between'>
				<div>
					<Typography className='font-bold'>
						{identifier?.length > maxTextLength
							? `${identifier?.slice(0, maxTextLength)}...`
							: identifier}
					</Typography>
					<Typography className='text-xs'>Type: {type}</Typography>
				</div>
				<Recycle
					className='cursor-pointer'
					onClick={() => setIsModalOpen(true)}
				/>
			</div>
			<ConfirmRestoreModal
				open={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				type={type}
				action={() => restoreItem([item])}
				loading={loading}
			/>
		</div>
	);
};

export default BinCard;
