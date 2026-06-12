"use client";
import usePostRequest from "@/api/hooks/usePost";
import UploadDocumentModal from "@/components/Dashboard/documents/uploadDocumentModal";
import TopBar from "@/components/Dashboard/layout/topBar";
import ListCard from "@/components/Dashboard/overview/listCard";
import DocumentList from "@/components/Dashboard/propertyDetails/documentList";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button } from "@material-tailwind/react";
import { FileDoc } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { toast } from "react-toastify";
import DocEmptyStateModal from "@/components/Dashboard/documents/docEmptyStateModal";

const DocumentsPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [isDocEmpty, setIsDocEmpty] = useState(false);
	const { activeProperty, documents } = useDashboardSelector();
	const {
		getDocuments,
		uploadDocument,
		isDocUploaded,
		isUplaoding,
		isDocumentFetching,
	} = useAppContext();

	const uploadDoc = async () => {
		const payload = {
			file_type: "document",
			category,
			sub_category: subCategory,
			property_id: activeProperty?.id,
			document_file: file,
		};
		await uploadDocument(payload);
	};

	useEffect(() => {
		if (isDocUploaded) {
			setIsModalOpen(false);
			getDocuments();
			setCategory("");
			setSubCategory("");
		}
	}, [isDocUploaded]);
	useEffect(() => {
		if (documents.length < 1 && !isDocumentFetching) {
			setTimeout(() => setIsDocEmpty(true), 1000);
		}
	}, [documents]);
	return (
		<div className='p-4'>
			<TopBar pageTitle='Docs, Photos & Videos' showPropertySelector />
			<ListCard
				hideEmptyState
				icon={<FileDoc size={18} />}
				title='Docs, Photos & Videos'
				list={documents}
				loadingState={isDocumentFetching}
				headerRight={
					<Button
						variant='outlined'
						className='text-pry border-pry lowercase first-letter:capitalize'
						onClick={() => setIsModalOpen(true)}
						disabled={!activeProperty}
					>
						Upload file
					</Button>
				}
			>
				<DocumentList
					isDocumentPage
					documents={documents}
					openDocumentModal={() => setIsModalOpen(true)}
					callBack={getDocuments}
				/>
			</ListCard>

			<UploadDocumentModal
				open={isModalOpen}
				handleOpen={() => setIsModalOpen(true)}
				category={category}
				setCategory={setCategory}
				subCategory={subCategory}
				setSubCategory={setSubCategory}
				closeModal={() => setIsModalOpen(false)}
				handleUpload={uploadDoc}
				setFile={setFile}
				type='file'
				file={file}
				loading={isUplaoding}
				disableUpload={!activeProperty}
			/>
			<DocEmptyStateModal
				closeModal={() => setIsDocEmpty(false)}
				handleOpen={() => setIsDocEmpty(!isDocEmpty)}
				open={isDocEmpty}
				action={() => {
					setIsDocEmpty(false);
					setIsModalOpen(true);
				}}
			/>
		</div>
	);
};

export default DocumentsPage;
