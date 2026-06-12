import { useState } from "react";
import { useGetInvestorInvestmentsQuery } from "../queries/businessApi";

interface UseInvestorInvestmentsParams {
  start_date?: string | null;
  end_date?: string | null;
}

const DEFAULT_INVESTMENTS_PAGE_SIZE = 4;

export interface UseInvestorInvestmentsOptions {
  initialPageSize?: number;
  enabled?: boolean;
}

export const useInvestorInvestments = (
  dateRange?: UseInvestorInvestmentsParams,
  options: UseInvestorInvestmentsOptions = {}
) => {
  const { initialPageSize: optionPageSize, enabled = true } = options;

  const initialPageSize = Math.max(
    1,
    optionPageSize ?? DEFAULT_INVESTMENTS_PAGE_SIZE
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const {
    data: investorInvestmentsData,
    isLoading: isLoadingInvestments,
    error: investmentsError,
    refetch: refetchInvestments,
  } = useGetInvestorInvestmentsQuery(
    {
      search: searchQuery,
      category: categoryFilter,
      status: statusFilter,
      start_date: dateRange?.start_date || null,
      end_date: dateRange?.end_date || null,
      page: currentPage,
      page_size: pageSize,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !enabled,
    }
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryFilterChange = (category: string | null) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, page));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(Math.max(1, newPageSize));
    setCurrentPage(1);
  };

  const refreshData = () => {
    refetchInvestments();
  };

  return {
    // Data
    investorInvestmentsData,
    isLoadingInvestments,
    investmentsError,

    // State
    searchQuery,
    categoryFilter,
    statusFilter,
    currentPage,
    pageSize,

    // Actions
    handleSearchChange,
    handleCategoryFilterChange,
    handleStatusFilterChange,
    handlePageChange,
    handlePageSizeChange,
    refreshData,

    // Computed values
    totalPages: investorInvestmentsData?.total_pages || 0,
    totalCount: investorInvestmentsData?.count || 0,
    hasNextPage: investorInvestmentsData?.has_next || false,
    hasPreviousPage: investorInvestmentsData?.has_previous || false,
  };
};
