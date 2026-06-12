import React from 'react';

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  listingData?: {
    count?: number;
    has_previous?: boolean;
    has_next?: boolean;
    page?: number;
    total_pages?: number;
    items_per_page?: number;
    page_size?: number;
  };
  onPageChange: (newPageIndex: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  pageSize,
  listingData,
  onPageChange,
  onPageSizeChange,
}) => {
  const fallbackPage = typeof page === 'number' ? page : 1;

  const rawPage =
    typeof listingData?.page === 'number' ? listingData.page : undefined;

  const effectivePageSize =
    (listingData?.items_per_page && listingData.items_per_page > 0
      ? listingData.items_per_page
      : listingData?.page_size && listingData.page_size > 0
        ? listingData.page_size
        : undefined) || (pageSize && pageSize > 0 ? pageSize : 10);

  const computeTotalPages = () => {
    if (typeof listingData?.total_pages === 'number') {
      if (listingData.total_pages > 0) {
        return listingData.total_pages;
      }

      if (
        listingData.total_pages === 0 &&
        listingData.count &&
        listingData.count > 0
      ) {
        return Math.max(
          1,
          Math.ceil((listingData.count ?? 0) / effectivePageSize)
        );
      }

      return 0;
    }

    if (listingData?.count && listingData.count > 0) {
      return Math.max(
        1,
        Math.ceil((listingData.count ?? 0) / effectivePageSize)
      );
    }

    return fallbackPage > 0 ? fallbackPage : 0;
  };

  const totalPages = computeTotalPages();

  const normalizePageToZeroBased = () => {
    if (typeof rawPage === 'number') {
      if (rawPage < 0) {
        return 0;
      }

      // Handle explicit 0 (already zero-based) or 1 (assume 1-based first page)
      if (rawPage === 0) {
        return 0;
      }

      if (rawPage === 1) {
        return totalPages > 0 ? 0 : Math.max(0, fallbackPage - 1);
      }

      // If totalPages is known and rawPage fits within 1..totalPages, treat as 1-based
      if (totalPages > 0 && rawPage <= totalPages) {
        return rawPage - 1;
      }

      // If fallback page matches rawPage, assume 1-based
      if (rawPage === fallbackPage) {
        return Math.max(0, rawPage - 1);
      }

      // Otherwise treat as already zero-based
      return Math.max(0, rawPage);
    }

    return Math.max(0, fallbackPage - 1);
  };

  const zeroBasedCurrentPage = normalizePageToZeroBased();
  const displayCurrentPage =
    totalPages > 0 ? Math.min(zeroBasedCurrentPage + 1, totalPages) : 0;
  const hasPrevious =
    listingData?.has_previous ?? zeroBasedCurrentPage > 0;
  const hasNext =
    listingData?.has_next ??
    (totalPages > 0 ? zeroBasedCurrentPage < totalPages - 1 : false);

  const basePageSizeOptions = [10, 20, 50, 100];
  const pageSizeOptions = (() => {
    const validPageSize = pageSize && pageSize > 0 ? pageSize : basePageSizeOptions[0];
    const optionSet = new Set<number>(basePageSizeOptions);
    optionSet.add(validPageSize);
    const optionsArray = Array.from(optionSet).sort((a, b) => a - b);
    return optionsArray;
  })();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (displayCurrentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (displayCurrentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = displayCurrentPage - 1; i <= displayCurrentPage + 1; i++)
          pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-500">
          Total {listingData?.count || 0} items
        </p>

        <button
          onClick={() =>
            onPageChange(Math.max(0, zeroBasedCurrentPage - 1))
          }
          disabled={!hasPrevious}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === '...' ? (
                <span className="px-3 py-1 text-sm text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(Number(pageNum) - 1)}
                  className={`min-w-[32px] h-8 px-3 py-1 text-sm font-medium rounded transition-colors cursor-pointer ${pageNum === displayCurrentPage
                    ? 'bg-green-50 text-green-600 border border-green-200'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => {
            const nextIndex =
              totalPages > 0
                ? Math.min(totalPages - 1, zeroBasedCurrentPage + 1)
                : zeroBasedCurrentPage + 1;
            onPageChange(Math.max(0, nextIndex));
          }}
          disabled={!hasNext}
          className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          <select
            value={pageSize}
            onChange={(e) => {
              if (onPageSizeChange) {
                onPageSizeChange(Number(e.target.value));
              }
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white cursor-pointer"
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;