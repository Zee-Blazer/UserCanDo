import React, { useEffect, useState } from "react";
import DocCard from "./docCard";
import { Button } from "@material-tailwind/react";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { DocProps } from "@/types";
import SearchComp from "@/components/General/TanTable/searchComp";

interface DocumentListProps {
	isDocumentPage?: boolean;
	documents: DocProps[] | [];
	callBack?: () => void;
	setFile?: (file: File) => void;
	openDocumentModal?: () => void;
	isBin?: boolean;
}
const DocumentList: React.FC<DocumentListProps> = ({
	isDocumentPage,
	documents,
	callBack,
	setFile,
	openDocumentModal,
}: DocumentListProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<string>("");
	const [limit, setLimit] = useState(0);

	const toggleLimit = () => {
		if (limit === 6) {
			setLimit(documents.length);
		} else {
			setLimit(6);
		}
	};

	useEffect(() => {
		if (isDocumentPage) {
			setLimit(documents.length);
		} else if (!isDocumentPage && documents?.length > 6) {
			setLimit(6);
		} else {
			setLimit(6);
		}
	}, [documents, isDocumentPage]);

	const categories = Array.from(
		new Set(
			documents
				.map((doc) => doc.category)
				.filter((cat): cat is string => cat !== undefined)
		)
	);

	const filteredDocuments = documents.filter(
		(doc) =>
			Object.values(doc)
				.filter((value) => typeof value === "string")
				.some((value) =>
					value.toLowerCase().includes(searchTerm.toLowerCase())
				) &&
			(selectedFilter === "" || doc.category === selectedFilter)
	);

	return (
		<div>
			{documents?.length > 0 ? (
				<div>
					<SearchComp
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						filterList={categories}
						handleFilterChange={setSelectedFilter}
					/>
					<div
						className={`grid grid-cols-1 sm:grid-cols-2 ${
							isDocumentPage && "lg:grid-cols-5 xl:grid-cols-6"
						} md:grid-cols-3 gap-4`}
					>
						{filteredDocuments.slice(0, limit).map((item, index) => (
							<DocCard
								isDocumentPage={isDocumentPage}
								docType='document'
								item={item}
								key={index}
								callBack={() => callBack && callBack()}
							/>
						))}
					</div>

					{!isDocumentPage && documents?.length > 6 && (
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
					onFileSelect={(files) => setFile && setFile(files[0])}
					addBgGraphics
					singleFile
					size='lg'
					type='file'
					id='document-upload'
					acceptedFormats={[
						".mp4",
						".pdf",
						".doc",
						".docx",
						"xls",
						".jpg",
						".jpeg",
						".png",
						".mov",
					]}
					clickFunction={openDocumentModal}
				/>
			)}
		</div>
	);
};

export default DocumentList;
