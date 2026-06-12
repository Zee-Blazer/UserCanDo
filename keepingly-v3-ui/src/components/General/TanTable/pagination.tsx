import React from "react";

interface PaginationProps {
	table: any;
	buttons: React.ReactNode[];
	setPageIndex: (index: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	table,
	buttons,
	setPageIndex,
}) => {
	const currentPage = table.getState().pagination.pageIndex + 1;
	const totalPages = table.getPageCount();

	const handlePreviousPage = () => {
		const newPageIndex = table.getState().pagination.pageIndex - 1;
		table.setPageIndex(newPageIndex);
		setPageIndex(newPageIndex);
	};

	const handleNextPage = () => {
		const newPageIndex = table.getState().pagination.pageIndex + 1;
		table.setPageIndex(newPageIndex);
		setPageIndex(newPageIndex);
	};

	const renderPageButtons = () => {
		if (totalPages <= 5) {
			return buttons;
		}

		const firstTwoButtons = buttons.slice(0, 2);
		const lastTwoButtons = buttons.slice(-2);

		return (
			<>
				{firstTwoButtons}
				{currentPage > 3 && <span className='mx-2'>...</span>}
				{currentPage > 2 &&
					currentPage < totalPages - 1 &&
					buttons[currentPage - 1]}
				{currentPage < totalPages - 2 && <span className='mx-2'>...</span>}
				{lastTwoButtons}
			</>
		);
	};

	return (
		<div>
			<div className='flex items-center justify-center mt-5 bg-lightBg dark:bg-darkBg w-fit mx-auto p-4 rounded-full px-8 text-xs'>
				<div className='flex'>
					<button
						disabled={!table.getCanPreviousPage()}
						onClick={handlePreviousPage}
						className='mr-5'
					>
						Prev
					</button>
					<ul className='flex justify-end gap-4'>{renderPageButtons()}</ul>
					<button
						disabled={!table.getCanNextPage()}
						onClick={handleNextPage}
						className='ml-5 text-pry'
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
