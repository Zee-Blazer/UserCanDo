import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	itemsPerPage: number;
	nextPage: () => void;
	prevPage: () => void;
	setPage: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	nextPage,
	prevPage,
	setPage,
}: PaginationProps) {
	const getItemProps = (index: number) => ({
		className: `rounded-md ${
			currentPage === index
				? "bg-lightBg dark:bg-darkBg text-gray_5 dark:text-gray_1"
				: "bg-transparent text-gray_3"
		} text-xs shadow-none`,
		onClick: () => setPage(index),
	});

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				pageNumbers.push(
					<IconButton key={i} {...getItemProps(i)}>
						{i}
					</IconButton>
				);
			} else if (i === currentPage - 2 || i === currentPage + 2) {
				pageNumbers.push(
					<span key={i} className='text-gray_3'>
						...
					</span>
				);
			}
		}
		return pageNumbers;
	};

	return (
		<div className='w-full'>
			<div className='flex flex-col sm:flex-row justify-between items-center mt-4'>
				<Typography className='mb-2 sm:mb-0 dark:text-gray_1'>
					Showing{" "}
					<span className='font-medium'>
						{(currentPage - 1) * itemsPerPage + 1}-
						{Math.min(currentPage * itemsPerPage, totalItems)}
					</span>{" "}
					of <span className='font-medium'>{totalItems}</span> results
				</Typography>
				<div className='flex items-center gap-4'>
					<Button
						variant='text'
						className='flex items-center gap-2 dark:text-white'
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<CaretLeft />
					</Button>
					<div className='flex items-center gap-2'>{renderPageNumbers()}</div>
					<Button
						variant='text'
						className='flex items-center gap-2 dark:text-white'
						onClick={nextPage}
						disabled={currentPage === totalPages}
					>
						<CaretRight />
					</Button>
				</div>
			</div>
		</div>
	);
}
