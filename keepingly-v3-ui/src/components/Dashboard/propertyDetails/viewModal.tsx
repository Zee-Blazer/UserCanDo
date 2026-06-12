import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ViewModalProps } from "@/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { DownloadSimple } from "@phosphor-icons/react";
import LazyImage from "@/components/General/imageComp";
import { colors } from "@/constants/colors";
import { getDocurl } from "@/utils/helpers";

const ViewModal = ({
	open,
	handleOpen,
	closeModal,
	type,
	url,
	isPhoto,
	id,
	isVideo,
}: ViewModalProps) => {
	const [pageNo, setPageNo] = useState(1);
	const incrementPage = () =>
		setPageNo((prevPageNo) => (prevPageNo === 5 ? 5 : prevPageNo + 1));
	const decrementPage = () =>
		setPageNo((prevPageNo) => (prevPageNo > 1 ? prevPageNo - 1 : prevPageNo));

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
					View {isPhoto ? "Image" : isVideo ? "Video" : "Document"}
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			{!isVideo &&
				(type === "document" && !isPhoto ? (
					<div className='h-[60vh]'>
						<LazyImage
							src={getDocurl(id, pageNo)}
							alt='property'
							fill
							className='w-full object-contain'
						/>
					</div>
				) : (
					<div className='h-[300px]'>
						<LazyImage src={url} alt='property' fill className='object-cover' />
					</div>
				))}

			{isVideo && (
				<video
					// ref={videoRef}
					src={url}
					controls
					className='w-full rounded-lg'
				/>
			)}

			<div className='flex justify-between gap-4 items-center mt-4'>
				{!isPhoto && !isVideo && (
					<div className='flex gap-2 items-center'>
						<span
							onClick={decrementPage}
							className='w-10 h-10 rounded-full flex items-center justify-center border-2 opacity-50 border-pry cursor-pointer'
						>
							<ChevronLeft color={colors.pry} />
						</span>
						{pageNo}
						<span
							onClick={incrementPage}
							className='w-10 h-10 rounded-full flex items-center justify-center border-2 opacity-50 border-pry cursor-pointer'
						>
							<ChevronRight color={colors.pry} />
						</span>
					</div>
				)}

				<div className='flex justify-end gap-4 ml-auto'>
					<Button
						variant='text'
						className='text-pry lowercase first-letter:capitalize'
						onClick={closeModal}
					>
						Cancel
					</Button>
					<Button className='bg-pry rounded-md flex items-center gap-2'>
						<DownloadSimple size={20} />
						<a href={url}>
							<Typography className='lowercase first-letter:capitalize'>
								Download
							</Typography>
						</a>
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default ViewModal;
