import IconContainer from "@/components/General/iconContainer";
import { Typography } from "@material-tailwind/react";
import { Image } from "@phosphor-icons/react";
import React from "react";
import PhotosRoll from "./photosRoll";
import { RenovationListProps } from "@/types";

const RenovationPhotos = ({
	renovationId,
	callback,
	renovationItem,
}: {
	renovationId: string;
	callback: () => void;
	renovationItem: RenovationListProps | null;
}) => {
	return (
		<div className='mt-4 bg-lightBg dark:bg-darkBg p-4 rounded-md'>
			<div className='flex gap-4 items-center '>
				<IconContainer icon={<Image />} />
				<Typography className='text-2xl font-semibold'>
					Photos/videos
				</Typography>
			</div>
			<div className='flex flex-col gap-4 mb-4'>
				<PhotosRoll
					subCategory='Before'
					items={renovationItem?.before_photo_video || []}
					title='Before photos/videos'
					renovationId={renovationId}
					callback={callback}
				/>
				<PhotosRoll
					subCategory='During'
					items={renovationItem?.during_photos_video || []}
					title='During photos/videos'
					renovationId={renovationId}
					callback={callback}
				/>
				<PhotosRoll
					subCategory='After'
					items={renovationItem?.after_photos_video || []}
					title='After photos/videos'
					renovationId={renovationId}
					callback={callback}
				/>
			</div>
		</div>
	);
};

export default RenovationPhotos;
