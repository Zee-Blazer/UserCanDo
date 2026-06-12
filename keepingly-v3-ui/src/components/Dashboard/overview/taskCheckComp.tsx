import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import { FormCheckbox } from "@/components/General/form";
import Loading from "@/components/General/loading";
import React, { useEffect, useState } from "react";
import UploadDocumentModal from "../documents/uploadDocumentModal";
import { TaskCheckCompProps } from "@/types";

const TaskCheckComp = ({
	property_id,
	task_id,
	isCompleted,
	type,
	category,
	subCategory,
}: TaskCheckCompProps) => {
	const [isChecked, setIsChecked] = useState(false);
	const { isSuccess, loading, postRequest } = usePostRequest();
	const {
		isSuccess: isDocUplaoded,
		loading: isDocUploading,
		postRequest: uploadDocReq,
	} = usePostRequest();
	const { getChecklists, loadOverView } = useAppContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const handleCheckList = async () => {
		if (type === "Document upload checklist" && !isCompleted) {
			return setIsModalOpen(true);
		}
		await postRequest("/mark_check_list", { property_id, task_id });
	};

	const uploadDoc = async () => {
		const payload = {
			property_id,
			task_id,
			check_list_file: file,
			category,
			sub_category: subCategory,
		};
		const formData = new FormData();
		for (const key in payload) {
			//@ts-ignore
			formData.append(key, payload[key]);
		}
		await uploadDocReq("/mark_check_list", formData);
	};

	useEffect(() => {
		if (isSuccess || isDocUplaoded) {
			getChecklists({});
			loadOverView();
		}
	}, [isSuccess, isDocUplaoded]);

	useEffect(() => {
		setIsChecked(isCompleted);
	}, [isCompleted]);
	return (
		<div className='flex items-center justify-center  p-0'>
			<FormCheckbox
				checked={isChecked}
				setChecked={setIsChecked}
				callback={handleCheckList}
			/>
			<UploadDocumentModal
				category={category || ""}
				subCategory={subCategory || ""}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				handleUpload={uploadDoc}
				open={isModalOpen}
				setFile={setFile}
				file={file}
				type='document'
				disabled
				disableSubCategory
				loading={isDocUploading}
			/>
			<Loading isLoading={loading} loadingText='Processing...' />
		</div>
	);
};

export default TaskCheckComp;
