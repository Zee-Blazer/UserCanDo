"use client";
import React from "react";
import ImageSlider from "./imageSlider";
import InvPriceDetails from "./invPriceDetails";
import InvFormDetails from "./invFormDetails";
import { InventoryFormProps, InventoryListProps } from "@/types";
import DocumentList from "./documentList";

export interface InvDetailsContainerProps {
	isEditable: boolean;
	inventoryDetails?: InventoryListProps | null;
	inventoryData: InventoryFormProps | null;
	handleChange: any;
	callback: () => void;
}
const InvDetailsContainer = ({
	isEditable,
	handleChange,
	inventoryData,
	inventoryDetails,
	callback,
}: InvDetailsContainerProps) => {
	return (
		<div className='p-4 flex flex-col xl:flex-row gap-4 overflow-hidden bg-lightBg dakr:bg-darkBg mt-4 rounded-md'>
			<div className='w-full xl:max-w-[480px]'>
				<ImageSlider
					images={inventoryDetails?.inventory_photo_video_url || []}
				/>
				<InvPriceDetails
					price={inventoryDetails?.purchase_price || 0}
					quantity={inventoryDetails?.quantity || 0}
				/>
			</div>
			<div className='w-full'>
				<InvFormDetails
					isEditable={isEditable}
					handleChange={handleChange}
					inventoryData={inventoryData}
					callback={callback}
				/>
				<DocumentList
					documents={inventoryDetails?.inventory_documents || []}
					callBack={callback}
				/>
			</div>
		</div>
	);
};

export default InvDetailsContainer;
