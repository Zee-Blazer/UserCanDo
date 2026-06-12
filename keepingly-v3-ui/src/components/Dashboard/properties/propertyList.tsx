import React from "react";
import PropertyCard from "./propertyCard";
import { usePagination } from "@/hooks/pagination";
import { Pagination } from "@/components/General/pagination";
import { PropertyProps } from "@/types";

const PropertyList = ({ properties }: { properties: PropertyProps[] }) => {
	const {
		currentPage,
		totalPages,
		paginatedData,
		nextPage,
		prevPage,
		setPage,
		totalItems,
	} = usePagination({
		data: properties,
		itemsPerPage: 8,
	});
	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{paginatedData.map((item, index) => (
					<PropertyCard item={item} key={`${index}-${item.id}`} />
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				totalItems={totalItems}
				itemsPerPage={8}
				nextPage={nextPage}
				prevPage={prevPage}
				setPage={setPage}
			/>
		</>
	);
};

export default PropertyList;
