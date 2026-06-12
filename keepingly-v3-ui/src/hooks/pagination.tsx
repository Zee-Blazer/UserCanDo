import { useState } from "react";

interface UsePaginationProps<T> {
	data: T[];
	itemsPerPage: number;
}

interface UsePaginationReturn<T> {
	currentPage: number;
	totalPages: number;
	paginatedData: T[];
	nextPage: () => void;
	prevPage: () => void;
	setPage: (page: number) => void;
	totalItems: number;
}

export function usePagination<T>({
	data,
	itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(data.length / itemsPerPage);

	const paginatedData = data.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const setPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return {
		currentPage,
		totalPages,
		paginatedData,
		nextPage,
		prevPage,
		setPage,
		totalItems: data.length,
	};
}
