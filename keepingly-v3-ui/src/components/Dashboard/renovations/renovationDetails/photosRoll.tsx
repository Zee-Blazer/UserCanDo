import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import DocCard from "../../propertyDetails/docCard";
import { DocProps } from "@/types";
import UploadDocumentModal from "../../documents/uploadDocumentModal";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";

interface PhotosRollProps {
	title: string;
	items: DocProps[];
	subCategory: "Before" | "During" | "After";
	renovationId: string;
	callback: () => void;
}
const PhotosRoll = ({
	items,
	title,
	subCategory,
	renovationId,
	callback,
}: PhotosRollProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isSuccess, loading, postRequest } = usePostRequest();
	const [file, setFile] = useState<File | null>(null);
	const { activeProperty } = useDashboardSelector();

	const uploadPhotoVideo = async () => {
		let payload: any = {
			property_id: activeProperty?.id,
			renovation_id: renovationId,
		};

		if (subCategory === "Before") {
			payload = {
				...payload,
				doc_type: "before_photo_video",
				before_photo_video: file,
			};
		} else if (subCategory === "During") {
			payload = {
				...payload,
				doc_type: "during_photos_video",
				during_photos_video: file,
			};
		} else if (subCategory === "After") {
			payload = {
				...payload,
				doc_type: "after_photos_video",
				after_photos_video: file,
			};
		}
		const formData = new FormData();
		for (const key in payload) {
			formData.append(key, payload[key]);
		}
		postRequest("/add_renovation_documents", formData);
	};

	useEffect(() => {
		if (isSuccess) {
			setIsModalOpen(false);
			callback();
		}
	}, [isSuccess]);

	return (
		<div className='mt-4'>
			<div className='flex items-center justify-between gap-4'>
				<Typography className='font-semibold'>{title}</Typography>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize'
					onClick={() => setIsModalOpen(true)}
				>
					Upload photos/video
				</Button>
			</div>
			<div className='flex overflow-x-auto space-x-4'>
				{items?.map((photo) => {
					return (
						<div className='min-w-[180px]' key={photo.id}>
							<DocCard docType='photo' item={photo} callBack={callback} />
						</div>
					);
				})}
			</div>
			<UploadDocumentModal
				category='Renovation Photo/Video'
				subCategory={subCategory}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(true)}
				disabled
				open={isModalOpen}
				file={file}
				setFile={setFile}
				disableSubCategory
				hideCategory
				handleUpload={uploadPhotoVideo}
				loading={loading}
				type={`photo/video`}
			/>
		</div>
	);
};

export default PhotosRoll;
