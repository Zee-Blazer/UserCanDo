import { ArrowLeft, ArrowRight } from "lucide-react";
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
			<div className='mt-5 w-fit ml-auto text-xs'>
				<div className='flex'>
					<button
						disabled={!table.getCanPreviousPage()}
						onClick={handlePreviousPage}
						className='mr-5 border-[1px] border-gray_2 p-2 px-4 justify-center rounded-md flex items-center gap-2'
					>
						<ArrowLeft size={18} />
						Previous
					</button>
					<ul className='flex justify-end gap-4'>{renderPageButtons()}</ul>
					<button
						disabled={!table.getCanNextPage()}
						onClick={handleNextPage}
						className='ml-5 text-pry border-[1px] border-gray_2 p-2 px-4 justify-center rounded-md flex items-center gap-2'
					>
						Next
						<ArrowRight size={18} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
