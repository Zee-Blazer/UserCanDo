"use client";
import React, { useState } from "react";
import { PropertyIcon } from "@/assets/icons";
import ListCard from "@/components/Dashboard/overview/listCard";
import AddProperty from "@/components/Dashboard/properties/addProperty";
import BulkUpload from "@/components/Dashboard/properties/bulkUpload";
import PropertyFilter from "@/components/Dashboard/properties/propertyFilter";
import PropertyList from "@/components/Dashboard/properties/propertyList";
import PropertyListBtn from "@/components/Dashboard/properties/propertyListBtn";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { PropertyProps } from "@/types";
import PropertyAnalysis from "@/components/Dashboard/properties/analysis";

const PropertiesPage = () => {
	const [activeSlide, setActiveSlide] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedState, setSelectedState] = useState<string>("");
	const { properties } = useDashboardSelector();
	const { user } = useAuthSelector();

	const filteredProperties = properties.filter((property: PropertyProps) => {
		const searchLower = searchTerm.toLowerCase();
		return (
			Object.keys(property).some((key) => {
				const value = property[key as keyof PropertyProps];
				return value?.toString().toLowerCase().includes(searchLower);
			}) &&
			(!selectedState || property.state === selectedState)
		);
	});

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleStateChange = (state: string) => {
		setSelectedState(state);
	};

	const states = Array.from(
		new Set(
			properties
				.map((property: PropertyProps) => property.state)
				.filter((state): state is string => state !== undefined)
		)
	);
	//

	return (
		<div className='p-4 flex flex-col gap-6'>
			{user?.role !== "homeowner" && <PropertyAnalysis />}
			{activeSlide === 0 && (
				<ListCard
					title='Properties'
					icon={<PropertyIcon />}
					list={filteredProperties}
					emptyStateText='No properties yet'
					headerRight={
						<PropertyListBtn
							btnAction={() => setActiveSlide(1)}
							btnAction2={() => setActiveSlide(2)}
						/>
					}
				>
					<PropertyFilter
						onSearchChange={handleSearchChange}
						states={states}
						selectedState={selectedState}
						onStateChange={handleStateChange}
					/>
					<PropertyList properties={filteredProperties} />
				</ListCard>
			)}
			{activeSlide === 1 && (
				<AddProperty
					open={activeSlide === 1}
					handleOpen={() => setActiveSlide(1)}
				/>
			)}
			{activeSlide === 2 && (
				<BulkUpload backBtnAction={() => setActiveSlide(0)} />
			)}
		</div>
	);
};

export default PropertiesPage;
