import { FC, useEffect, useMemo, useState } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from "@tanstack/react-table";
import Pagination from "./pagination";
import TanBody from "./body";
import SearchComp from "./searchComp";
import { Spinner } from "react-activity";

interface TanTableProps {
	columnData: any[];
	data: any[];
	loadingState?: boolean;
	onClick?: () => void;
	showSearch?: boolean;
	hidePaging?: boolean;
	length?: number;
	filterList?: string[];
}

const TanTable: FC<TanTableProps> = ({
	columnData,
	data,
	loadingState,
	onClick,
	showSearch,
	hidePaging,
	length,
	filterList,
}) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [sorting, setSorting] = useState<any[]>([]);
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [columnFilters, setColumnFilters] = useState<any[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>(data);

	const tableData = useMemo(() => filteredData, [filteredData]);
	const columns = useMemo(() => columnData, [columnData]);
	const pageSize: number = length || 10;

	const options = useMemo(
		() => ({
			data: tableData,
			columns,
			state: {
				globalFilter: searchTerm,
				sorting: sorting,
				columnFilters: columnFilters,
				pagination: {
					pageIndex: pageIndex,
					pageSize: pageSize,
				},
			},
			onColumnFiltersChange: setColumnFilters,
			getCoreRowModel: getCoreRowModel(),
			getFilteredRowModel: getFilteredRowModel(),
			onGlobalFilterChange: setSearchTerm,
			onSortingChange: setSorting,
			getPaginationRowModel: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
			columnSizing: {},
			columnSizingInfo: {
				startOffset: null,
				startSize: null,
				deltaOffset: null,
				deltaPercentage: null,
				isResizingColumn: false,
				columnSizingStart: [],
			},
		}),
		[
			tableData,
			columns,
			searchTerm,
			sorting,
			columnFilters,
			pageIndex,
			pageSize,
		]
	);

	const table = useReactTable(options);

	const startPage = useMemo(() => {
		const totalPages = table.getPageCount();
		return Math.max(
			0,
			Math.min(totalPages - 1, pageIndex - Math.floor(pageSize / 2))
		);
	}, [pageIndex, pageSize, table]);

	const endPage = useMemo(() => {
		const totalPages = table.getPageCount();
		return Math.min(totalPages - 1, startPage + pageSize - 1);
	}, [startPage, pageSize, table, data, tableData]);

	function isPageActive(pageIndex: number, currentPage: number) {
		return pageIndex === currentPage;
	}

	const currentPage = table.getState().pagination.pageIndex;

	const paginationButtons = useMemo(() => {
		const totalPages = table.getPageCount();
		if (totalPages <= 1) return [];
		const buttons: JSX.Element[] = [];
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => {
						table.setPageIndex(i);
						setPageIndex(i);
					}}
					className={`${
						isPageActive(i, currentPage)
							? "current-page text-black dark:text-white dark:bg-darkBg bg-lightBg shadow-md"
							: "text-sec"
					} transition-background-color duration-300 transition-text-color rounded-md px-2 py-1 flex items-center text-sm cursor-pointer`}
				>
					{i + 1}
				</button>
			);
		}
		return buttons;
	}, [startPage, endPage, currentPage, table, data, tableData]);

	const handleFilterChange = (selectedFilter: string) => {
		if (selectedFilter === "") {
			setFilteredData(data);
			return;
		}

		const filtered = data.filter((item) =>
			Object.values(item).some((value: any) =>
				value
					?.toString()
					?.toLowerCase()
					?.includes(selectedFilter?.toLowerCase())
			)
		);

		setFilteredData(filtered);
		setPageIndex(0);
	};

	useEffect(() => {
		setPageIndex(0);
	}, [searchTerm]);

	// console.log(tableData);

	return (
		<div>
			{showSearch && (
				<SearchComp
					setSearchTerm={setSearchTerm}
					setPageIndex={setPageIndex}
					searchTerm={searchTerm}
					handleFilterChange={handleFilterChange}
					filterList={filterList}
				/>
			)}
			<div className='bg-lightBg dark:bg-darkBg text-sm text-gray-600 p-4'>
				{loadingState ? (
					<div className='flex items-center justify-center my-10'>
						<Spinner />
					</div>
				) : data.length < 1 ? (
					<h2>No Data to display</h2>
				) : (
					<TanBody
						table={table}
						loadingState={loadingState}
						onClick={onClick}
					/>
				)}
			</div>
			{!hidePaging && tableData.length > pageSize && (
				<Pagination
					setPageIndex={setPageIndex}
					buttons={paginationButtons}
					table={table}
				/>
			)}
		</div>
	);
};

export default TanTable;
