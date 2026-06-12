import { FormCheckbox } from "@/components/General/form";
import { DocProps } from "@/types";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { formatFileSize, getDocurl } from "@/utils/helpers";
import DocumentCardDropdown from "../propertyDetails/documentCardDropdown";
import LazyImage from "@/components/General/imageComp";

interface DocCardProps {
	item: DocProps;
	selectedItems: DocProps[];
	addToList: (item: DocProps) => void;
	docType: string;
	callBack?: () => void;
}
const AppraiserDocCard = ({
	item,
	addToList,
	selectedItems,
	docType,
	callBack,
}: DocCardProps) => {
	const { id, category, file_size, name, url } = item;
	const maxTextLength = 10;

	const isChecked = selectedItems.some((selected) => selected.id === id);
	const isPhoto = url?.includes("jpeg") || url?.includes("png");
	return (
		<div
			className={`rounded-md overflow-hidden border border-borderLight dark:border-borderDark w-full`}
		>
			<div className='h-[160px] flex justify-center items-center bg-lightBg dark:bg-darkBg relative'>
				<LazyImage
					src={isPhoto ? url : getDocurl(id, 1)}
					alt='propery'
					fill
					className='h-[160px] object-cover w-full'
				/>

				{/* <span className='absolute top-3 right-3'>
					<FormCheckbox
						checked={isChecked}
						setChecked={() => addToList(item)}
					/>
				</span> */}
			</div>

			<div className='p-3 h-full flex justify-between'>
				<div>
					<Typography className='font-bold'>
						{name?.length > maxTextLength
							? `${name?.slice(0, maxTextLength)}...`
							: name}
					</Typography>
					<Typography className='text-xs'>
						{category}, {formatFileSize(Number(file_size || 0))}
					</Typography>
				</div>
				<DocumentCardDropdown
					isAppraiserEdge={true}
					docType={docType}
					url={url}
					id={id}
					docName={name}
					callBack={() => callBack && callBack()}
					isPhoto={isPhoto}
				/>
			</div>
		</div>
	);
};

export default AppraiserDocCard;
