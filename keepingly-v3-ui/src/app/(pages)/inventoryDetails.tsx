"use client";
import useFetch from "@/api/hooks/useFetch";
import UploadDocumentModal from "@/components/Dashboard/documents/uploadDocumentModal";
import InvDetailsContainer from "@/components/Dashboard/inventory/inventoryDetails/invDetailsContainer";
import InvDetailsPageHeader from "@/components/Dashboard/inventory/inventoryDetails/invDetailsPageHeader";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { InventoryFormProps, InventoryListProps } from "@/types";
import Loading from "@/components/General/loading";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";

const InventoryDetailsPage = ({ id }: { id: string }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditable, setIsEditable] = useState(false);
	const [category, setCategory] = useState("");
	const { getInventory } = useAppContext();
	const [subCategory, setSubCategory] = useState("");
	const { data: inventoryData, fetchRequest, loading, isSuccess } = useFetch();
	const {
		postRequest,
		loading: isEditing,
		isSuccess: isEdited,
	} = usePostRequest();

	const [inventoryDetails, setInventoryDetails] =
		useState<InventoryListProps | null>(null);
	const [inventoryFormData, setInventoryFormData] =
		useState<InventoryFormProps | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const { uploadDocument, isUplaoding, isDocUploaded } = useAppContext();
	const { activeProperty } = useDashboardSelector();

	const uploadDoc = async () => {
		const payload = {
			file_type: "document",
			category,
			sub_category: subCategory,
			property_id: activeProperty?.id,
			inventory_id: id,
			document_file: file,
		};
		await uploadDocument(payload);
	};

	const getInventoryDetails = async () =>
		fetchRequest(`/get_inventory_details?inventory_id=${id}`);

	useEffect(() => {
		if (isSuccess) {
			setInventoryDetails(inventoryData?.payload);
			setInventoryFormData(inventoryData?.payload);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isDocUploaded) {
			getInventory();
			getInventoryDetails();
			setIsModalOpen(false);
			setCategory("");
			setSubCategory("");
		}
	}, [isDocUploaded]);

	useEffect(() => {
		if (id) {
			getInventoryDetails();
		}
	}, [id]);

	const handleFormChange = (e: any) => {
		setInventoryFormData({
			...inventoryFormData,
			[e.target.name]: e.target.value,
		});
	};

	const editInventory = async () => {
		const payload = {
			...inventoryFormData,
			inventory_id: inventoryDetails?.id,
		};
		await postRequest("/update_inventory", payload);
	};

	useEffect(() => {
		if (isEdited) {
			getInventoryDetails();
			getInventory();
		}
	}, [isEdited]);

	if (loading) {
		return <Loading isLoading={loading} loadingText='Fetching inventory' />;
	}

	return (
		<div className='p-4'>
			<InvDetailsPageHeader
				makeEditable={() => setIsEditable(true)}
				openModal={() => setIsModalOpen(true)}
				action={editInventory}
				isEditable={isEditable}
				loading={isEditing}
				name={inventoryDetails?.name || ""}
			/>
			<InvDetailsContainer
				isEditable={isEditable}
				inventoryDetails={inventoryDetails}
				inventoryData={inventoryFormData}
				handleChange={handleFormChange}
				callback={() => {
					getInventory();
					getInventoryDetails();
				}}
			/>
			<UploadDocumentModal
				open={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				type='document'
				category={category}
				subCategory={subCategory}
				setSubCategory={setSubCategory}
				setCategory={setCategory}
				file={file}
				setFile={setFile}
				handleUpload={uploadDoc}
				loading={isUplaoding}
			/>
		</div>
	);
};

export default InventoryDetailsPage;
