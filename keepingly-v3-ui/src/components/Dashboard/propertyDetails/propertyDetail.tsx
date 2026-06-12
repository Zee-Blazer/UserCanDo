import React, { useEffect } from "react";
import PropertyImage from "./propertyImage";
import PropertyCommission from "./propertyCommission";
import PropertyFormStep1 from "../properties/step1";
import { AddPropertyProps, CommissionProps } from "@/types";
import Step2 from "../properties/step2";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import { useAuthSelector } from "@/Redux/selectors";

interface PropertyDetailsProps {
	formErrors: AddPropertyProps | null;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	propertyDetails: AddPropertyProps | null;
	isEdit: boolean;
	commissionArr: CommissionProps[];
	setCommissionArr: React.Dispatch<React.SetStateAction<CommissionProps[]>>;
	openCoverImageModal: () => void;
	getPropertyDetails: () => void;
	setPropertyDetails: any;
	initialEmail?: string | null;
}
const PropertyDetail = ({
	formErrors,
	handleChange,
	propertyDetails,
	isEdit,
	commissionArr,
	setCommissionArr,
	openCoverImageModal,
	getPropertyDetails,
	setPropertyDetails,
	initialEmail,
}: PropertyDetailsProps) => {
	const { isSuccess, loading, postRequest } = usePostRequest();
	const { getProperties } = useAppContext();
	const { user } = useAuthSelector();
	//@ts-ignore
	const coverImage = propertyDetails?.cover_photo_url;
	const coverImg =
		coverImage && coverImage?.length > 0
			? coverImage[coverImage.length - 1]?.url
			: "";

	const removeCoverPhoto = async () =>
		await postRequest("/remove_cover_photo", {
			property_id: propertyDetails?.id,
		});

	useEffect(() => {
		if (isSuccess) {
			getProperties();
			getPropertyDetails();
		}
	}, [isSuccess]);
	return (
		<div className='flex flex-col md:flex-row mt-4 gap-4'>
			<div className='md:w-[50%]'>
				<PropertyImage
					loading={loading}
					removePhoto={removeCoverPhoto}
					openModal={openCoverImageModal}
					imageUrl={coverImg}
					label='Upload Cover Image'
				/>
				{user?.role !== "homeowner" && (
					<PropertyCommission
						closingPrice={propertyDetails?.closing_price || 0}
						totalCommission={propertyDetails?.total_commission || 0}
					/>
				)}
			</div>
			<div className='flex flex-col gap-4 md:w-[50%]'>
				<PropertyFormStep1
					formErrors={formErrors}
					handleChange={handleChange}
					propertyDetails={propertyDetails}
					notEditable={!isEdit}
					setPropertyDetails={setPropertyDetails}
					// disableEdit
					// initialEmail={initialEmail}
				/>
				{isEdit && user?.role !== "homeowner" && (
					<Step2
						key={1}
						commissionArr={commissionArr}
						setCommissionArr={setCommissionArr}
						handleChange={handleChange}
						formErrors={formErrors}
						propertyDetails={propertyDetails}
					/>
				)}
			</div>
		</div>
	);
};

export default PropertyDetail;
