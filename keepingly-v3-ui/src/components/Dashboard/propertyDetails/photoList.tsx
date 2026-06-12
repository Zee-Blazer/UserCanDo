import React, { useState } from "react";
import DocCard from "./docCard";
import { Button } from "@material-tailwind/react";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import SearchComp from "@/components/General/TanTable/searchComp";
import { DocProps } from "@/types";

interface PhotoListProps {
	photosAndVideos: DocProps[];
	callBack: () => void;
	openDocumentModal: () => void;
	setFile: (file: File) => void;
}
const PhotoList = ({
	photosAndVideos,
	callBack,
	setFile,
	openDocumentModal,
}: PhotoListProps) => {
	const [limit, setLimit] = useState(6);
	const [searchTerm, setSearchTerm] = useState("");
	const toggleLimit = () => {
		if (limit === 6) {
			setLimit(photosAndVideos.length);
		} else {
			setLimit(6);
		}
	};

	return (
		<div>
			{photosAndVideos?.length > 0 ? (
				<div>
					<SearchComp searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
						{photosAndVideos.slice(0, limit).map((item, index) => (
							<DocCard
								docType='photo/video'
								item={item}
								key={index}
								callBack={callBack}
							/>
						))}
					</div>
					{photosAndVideos.length > 6 && (
						<Button
							variant='text'
							className='p-0 first-letter:capitalize lowercase text-pry mt-4'
							onClick={toggleLimit}
						>
							{limit === 6 ? "See more" : "See less"}
						</Button>
					)}
				</div>
			) : (
				<DragAndDropFileInput
					onFileSelect={(files) => setFile(files[0])}
					addBgGraphics
					size='lg'
					id='photo-upload'
					clickFunction={openDocumentModal}
				/>
			)}
		</div>
	);
};

export default PhotoList;
