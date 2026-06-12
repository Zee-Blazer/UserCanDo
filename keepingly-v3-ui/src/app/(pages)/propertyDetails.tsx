"use client";
import PropertyDetailsHeader from "@/components/Dashboard/propertyDetails/headerComp";
import React, { useEffect, useState } from "react";
import PropertyDetail from "@/components/Dashboard/propertyDetails/propertyDetail";
import ListCard from "@/components/Dashboard/overview/listCard";
import { FileDoc, Image } from "@phosphor-icons/react";
import { Button } from "@material-tailwind/react";
import PhotoList from "@/components/Dashboard/propertyDetails/photoList";
import DocumentList from "@/components/Dashboard/propertyDetails/documentList";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/api/hooks/useFetch";
import Loading from "@/components/General/loading";
import { AddPropertyProps, CommissionProps } from "@/types";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "../context";
import UploadDocumentModal from "@/components/Dashboard/documents/uploadDocumentModal";
import { toast } from "react-toastify";
import { useAuthSelector } from "@/Redux/selectors";
import TopBar from "@/components/Dashboard/layout/topBar";

const PropertyDetails = ({ id }: { id: string }) => {
	const {
		data,
		fetchRequest,
		isSuccess,
		loading,
		error: propertyNotFetched,
	} = useFetch();
	const [propertyDetails, setPropertyDetails] =
		useState<AddPropertyProps | null>(null);
	const [formErrors, setFormErrors] = useState<AddPropertyProps | null>(null);
	const [isEdit, setIsEdit] = useState(false);
	const [commissionArr, setCommissionArr] = useState<CommissionProps[]>([]);
	const [isDocumentModalShown, setIsDocumentModalShown] = useState(false);
	const [uploadedDoc, setUplaodedDoc] = useState<File | null>(null);
	const [documentType, setDocumentType] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [subCategory, setSubCategory] = useState<string>("");
	const { user } = useAuthSelector();
	const isBroker = user?.role?.includes("broker");
	const [initialEmail, setInitialEmail] = useState<string | null>(null);
	const router = useRouter();
	const {
		isSuccess: isEditSuccess,
		loading: isEditLoading,
		postRequest,
	} = usePostRequest();

	const {
		getProperties,
		uploadDocument,
		isDocUploaded,
		isUplaoding,
		isDeleted,
		isDeleting,
		handleDelete,
		resetDeleteState,
	} = useAppContext();

	const handlePropertyInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setPropertyDetails({ ...propertyDetails, [name]: value });
	};

	const getPropertyDetails = async () =>
		await fetchRequest(`/get_property?property_id=${id}`);

	useEffect(() => {
		getPropertyDetails();
	}, [id]);

	useEffect(() => {
		if (isSuccess) {
			setPropertyDetails(data?.payload);
			setCommissionArr(data?.payload?.tiers || []);
			setInitialEmail(data?.payload?.email);
		}
		if (propertyNotFetched) {
			router.back();
		}
	}, [isSuccess, propertyNotFetched]);

	const editProperty = async () => {
		const payload = {
			...propertyDetails,
			tiers: commissionArr,
			property_id: id,
		};
		await postRequest("/update_property", payload);
	};

	const handleDocumentUpload = async (type: string, doc: File) => {
		if (!doc) {
			return toast.error("Please select a file");
		}
		const payload = {
			file_type: type,
			category: isBroker ? "Closing Document" : category,
			sub_category: subCategory,
			property_id: id,
			document_file: doc,
		};
		await uploadDocument(payload);
	};

	useEffect(() => {
		if (isDocUploaded) {
			getPropertyDetails();
			setIsDocumentModalShown(false);
			getProperties();
			setUplaodedDoc(null);
		}
	}, [isDocUploaded]);

	useEffect(() => {
		if (!isDocumentModalShown && uploadedDoc) {
			setUplaodedDoc(null);
		}
	}, [isDocumentModalShown]);

	useEffect(() => {
		if (isEditSuccess) {
			getPropertyDetails();
			getProperties();
			setIsEdit(false);
		}
	}, [isEditSuccess]);

	useEffect(() => {
		if (isDeleted) {
			getProperties();
			resetDeleteState();
			router.back();
		}
	}, [isDeleted]);

	return (
		<div className='p-4'>
			<TopBar pageTitle='Property Info' showPropertySelector />
			<PropertyDetailsHeader
				address={``}
				editProperty={editProperty}
				isEdit={true}
				setIsEdit={setIsEdit}
				loadingState={isEditLoading}
				propId={propertyDetails?.id || ""}
				email={propertyDetails?.email || ""}
				handledDelete={() => handleDelete(id)}
			/>
			<PropertyDetail
				formErrors={formErrors}
				handleChange={handlePropertyInputChange}
				propertyDetails={propertyDetails}
				isEdit={true}
				initialEmail={initialEmail}
				commissionArr={commissionArr}
				setCommissionArr={setCommissionArr}
				getPropertyDetails={getPropertyDetails}
				setPropertyDetails={setPropertyDetails}
				openCoverImageModal={() => {
					setIsDocumentModalShown(true);
					setDocumentType("cover_photo");
				}}
			/>

			<div className='grid grid-cols-1 md:grid-cols-2 my-4 gap-4'>
				<ListCard
					hideEmptyState
					icon={<FileDoc size={18} />}
					title='Add Property Documents'
					list={propertyDetails?.document_url || []}
					headerRight={
						<Button
							variant='outlined'
							className='text-pry border-pry lowercase first-letter:capitalize'
							loading={isUplaoding}
							onClick={() => {
								setDocumentType("document");
								uploadedDoc
									? handleDocumentUpload("document", uploadedDoc)
									: setIsDocumentModalShown(true);
							}}
						>
							Upload document
						</Button>
					}
				>
					<DocumentList
						callBack={getPropertyDetails}
						documents={propertyDetails?.document_url || []}
						setFile={setUplaodedDoc}
						openDocumentModal={() => {
							setDocumentType("document");
							setIsDocumentModalShown(true);
						}}
					/>
				</ListCard>
				<ListCard
					hideEmptyState
					icon={<Image size={18} />}
					title='Photos/videos'
					list={propertyDetails?.photos_videos_url || []}
					headerRight={
						<Button
							variant='outlined'
							className='text-pry border-pry lowercase first-letter:capitalize'
							loading={isUplaoding}
							onClick={() => {
								setDocumentType("photo/video");
								uploadedDoc
									? handleDocumentUpload("photo/video", uploadedDoc)
									: setIsDocumentModalShown(true);
							}}
						>
							Upload photo/video
						</Button>
					}
				>
					<PhotoList
						photosAndVideos={propertyDetails?.photos_videos_url || []}
						callBack={getPropertyDetails}
						setFile={setUplaodedDoc}
						openDocumentModal={() => {
							setDocumentType("photo/video");
							setIsDocumentModalShown(true);
						}}
					/>
				</ListCard>
			</div>
			<Loading isLoading={loading || isDeleting} />
			<UploadDocumentModal
				closeModal={() => setIsDocumentModalShown(false)}
				open={isDocumentModalShown}
				handleOpen={() => setIsDocumentModalShown(!isDocumentModalShown)}
				handleUpload={() => handleDocumentUpload(documentType, uploadedDoc!)}
				setFile={setUplaodedDoc}
				loading={isUplaoding}
				type={documentType === "cover_photo" ? "cover photo" : documentType}
				category={isBroker ? "Closing Document" : category}
				disabled={isBroker}
				hideCategory={documentType === "cover_photo"}
				setCategory={setCategory}
				subCategory={subCategory}
				setSubCategory={setSubCategory}
				file={uploadedDoc}
			/>
		</div>
	);
};

export default PropertyDetails;
