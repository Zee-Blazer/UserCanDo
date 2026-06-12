import { DocProps } from "@/types";
import { Typography } from "@material-tailwind/react";
import { FileDoc } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import DocumentCardDropdown from "./documentCardDropdown";
import LazyImage from "@/components/General/imageComp";
import { formatFileSize, getDocurl } from "@/utils/helpers";
import VideoThumbnail from "react-video-thumbnail";

interface DocCardProps {
	item: DocProps;
	docType: string;
	isDocumentPage?: boolean;
	callBack?: () => void;
	view?: "grid" | "list";
}

const DocCard = ({
	item,
	docType,
	isDocumentPage,
	callBack,
	view = "grid",
}: DocCardProps) => {
	const { id, name, url, category, file_size, thumbnail_blob_name } = item;

	const maxTextLength = 10;
	const isPhoto =
		url?.includes("jpeg") ||
		url?.includes("png") ||
		url?.includes("jpg") ||
		url?.includes("webp");
	const isVideo = url?.includes("mp4") || url?.includes(".mov");
	const isDoc = url?.includes("pdf");

	const renderGridView = () => (
		<div
			className={`rounded-md overflow-hidden border border-borderLight dark:border-borderDark w-full`}
		>
			<div className='relative w-full h-[160px] flex items-center justify-center bg-lightBg dark:bg-darkBg'>
				<LazyImage
					src={isDoc ? getDocurl(id, 1) : thumbnail_blob_name || url}
					alt={name || "document"}
					isVideo={isVideo}
					fill
					className='h-[160px] object-cover w-full'
				/>
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
					showAppraisalBtn={isDocumentPage}
					docType={docType}
					url={url}
					id={id}
					docName={name}
					callBack={() => callBack && callBack()}
					isPhoto={isPhoto}
					is_appraiser_document={item.is_appraiser_document}
					isVideo={isVideo}
				/>
			</div>
		</div>
	);

	const renderListView = () => (
		<div className='rounded-md dark:bg-darkBg bg-lightBg p-4 border-borderLight dark:border-borderDark border-[1px] flex justify-between items-center gap-4'>
			<div className='flex items-center gap-2'>
				<FileDoc />
				<Typography className='font-bold'>
					{name?.length > maxTextLength
						? `${name?.slice(0, maxTextLength)}...`
						: name}
				</Typography>
			</div>
			<DocumentCardDropdown
				showAppraisalBtn={isDocumentPage}
				docType={docType}
				url={url}
				id={id}
				docName={name}
				callBack={() => callBack && callBack()}
				isPhoto={isPhoto}
			/>
		</div>
	);

	return view === "grid" ? renderGridView() : renderListView();
};

export default DocCard;
