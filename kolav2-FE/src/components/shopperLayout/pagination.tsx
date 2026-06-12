import React from "react";
import { Button } from "@material-tailwind/react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	totalItems: number;
	showItemCount?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage,
	totalItems,
	showItemCount = true,
}) => {
	return (
		<div className='mt-8 space-y-4'>
			<div className='flex justify-center items-center gap-2'>
				<Button
					variant='outlined'
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
					className='flex items-center gap-2 normal-case font-normal'
				>
					Previous
				</Button>

				<div className='flex gap-2'>
					{[...Array(totalPages)].map((_, index) => {
						const pageNumber = index + 1;
						if (
							pageNumber === 1 ||
							pageNumber === totalPages ||
							(pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
						) {
							return (
								<Button
									key={pageNumber}
									variant={currentPage === pageNumber ? "filled" : "outlined"}
									onClick={() => onPageChange(pageNumber)}
									className={`min-w-[40px] ${
										currentPage === pageNumber
											? "bg-pry2 text-white"
											: "text-pry2"
									}`}
								>
									{pageNumber}
								</Button>
							);
						} else if (
							pageNumber === currentPage - 2 ||
							pageNumber === currentPage + 2
						) {
							return (
								<span key={pageNumber} className='px-2'>
									...
								</span>
							);
						}
						return null;
					})}
				</div>

				<Button
					variant='outlined'
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(currentPage + 1)}
					className='flex items-center gap-2 normal-case font-normal'
				>
					Next
				</Button>
			</div>

			{showItemCount && (
				<div className='text-center text-gray-600 text-sm'>
					Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
					{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
					items
				</div>
			)}
		</div>
	);
};

export default Pagination;
