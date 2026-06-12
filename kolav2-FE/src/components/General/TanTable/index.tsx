import { FC, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import TableFilter from "./filter";
import DateFilter from "./dateFilter";
import SortFilter from "./sortFilter";
import FilterDialog from "./filterDialog";

interface SortOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: "string" | "date" | "number";
  defaultDirection?: "asc" | "desc";
}

interface TanTableProps {
  columnData: any[];
  data: any[];
  loadingState?: boolean;
  onClick?: () => void;
  showSearch?: boolean;
  hidePaging?: boolean;
  length?: number;
  filterList?: string[];
  showFilter?: boolean;
  showDateFilter?: boolean;
  dateField?: string;
  customFilterButton?: () => void;
  showSortFilter?: boolean;
  searchPlaceholder?: string;
  searchMaxWidth?: string;
  showBorder?: boolean;
  sortOptions?: SortOption[];
  onRowClick?: (row: any) => void;
  tableId?: string;
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
  showDateFilter,
  dateField = "last_updated",
  showFilter,
  showSortFilter = false,
  searchPlaceholder,
  searchMaxWidth,
  showBorder = false,
  customFilterButton,
  sortOptions = [],
  onRowClick,
  tableId,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get("search") || "";
  const urlHighlight = searchParams.get("highlight") || "";
  const urlPage = parseInt(searchParams.get("page") || "1") - 1;

  const [searchTerm, setSearchTerm] = useState<string>(urlSearch);
  const [sorting, setSorting] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(
    urlPage >= 0 ? urlPage : 0
  );
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [highlightedRowId, setHighlightedRowId] =
    useState<string>(urlHighlight);

  const tableData = useMemo(() => filteredData, [filteredData]);
  const columns = useMemo(() => columnData, [columnData]);
  const pageSize: number = length || 10;

  useEffect(() => {
    if (
      (urlSearch || urlHighlight || searchParams.get("page")) &&
      filteredData.length > 0
    ) {
      const timer = setTimeout(() => {
        const currentUrl = new URL(window.location.href);
        let shouldUpdate = false;

        if (currentUrl.searchParams.has("search")) {
          currentUrl.searchParams.delete("search");
          shouldUpdate = true;
        }

        if (shouldUpdate) {
          router.replace(currentUrl.pathname + currentUrl.search, {
            scroll: false,
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [urlSearch, urlHighlight, searchParams, router, filteredData]);

  useEffect(() => {
    if (highlightedRowId && tableData.length > 0) {
      const timer = setTimeout(() => {
        const rowElement = document.querySelector(
          `[data-row-id="${highlightedRowId}"]`
        );
        if (rowElement) {
          rowElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          rowElement.classList.add("highlight-row");

          setTimeout(() => {
            rowElement.classList.remove("highlight-row");

            const currentUrl = new URL(window.location.href);
            let shouldUpdate = false;

            if (currentUrl.searchParams.has("highlight")) {
              currentUrl.searchParams.delete("highlight");
              shouldUpdate = true;
            }
            if (currentUrl.searchParams.has("page")) {
              currentUrl.searchParams.delete("page");
              shouldUpdate = true;
            }

            if (shouldUpdate) {
              router.replace(currentUrl.pathname + currentUrl.search, {
                scroll: false,
              });
            }
          }, 3000);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [highlightedRowId, tableData, pageIndex, router]);

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

  const handleSort = (sortedData: any[]) => {
    setFilteredData(sortedData);
  };

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
              ? "text-black bg-sec border-sec"
              : "text-black border-gray_2 hidden lg:block"
          } transition-background-color duration-300 transition-text-color rounded-md px-4 border-[1px] py-1 flex items-center text-xs cursor-pointer`}
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

  const handleDateFilterChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);

    if (!start && !end) {
      setFilteredData(data);
      setPageIndex(0);
      return;
    }

    const filtered = data.filter((item) => {
      const dateValue = item[dateField as keyof typeof item];

      if (!dateValue) return false;

      let itemDate: Date;
      if (typeof dateValue === "string") {
        itemDate = new Date(dateValue);
      } else if (dateValue instanceof Date) {
        itemDate = new Date(dateValue);
      } else {
        return false;
      }

      if (isNaN(itemDate.getTime())) {
        return false;
      }

      const itemDateString = itemDate.toISOString().split("T")[0];

      let isWithinRange = true;

      if (start) {
        const startDateString = start.toISOString().split("T")[0];
        isWithinRange = isWithinRange && itemDateString >= startDateString;
      }

      if (end) {
        const endDateString = end.toISOString().split("T")[0];
        isWithinRange = isWithinRange && itemDateString <= endDateString;
      }

      return isWithinRange;
    });

    setFilteredData(filtered);
    setPageIndex(0);
  };

  useEffect(() => {
    setPageIndex(0);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredData(data);
    setPageIndex(0);
  }, [data]);

  return (
    <div className="font-sans">
      <style jsx>{`
        .highlight-row {
          background-color: #fef3c7 !important;
          animation: highlightFade 3s ease-out;
        }

        @keyframes highlightFade {
          0% {
            background-color: #fbbf24;
          }
          100% {
            background-color: #fef3c7;
          }
        }
      `}</style>

      <div
        className={` ${showBorder ? "border border-gray-300 px-3 pt-3" : ""}`}
      >
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center mb-4">
          {showSearch && (
            <SearchComp
              setSearchTerm={setSearchTerm}
              setPageIndex={setPageIndex}
              searchTerm={searchTerm}
              handleFilterChange={handleFilterChange}
              filterList={filterList}
              placeholder={searchPlaceholder}
              maxWidth={searchMaxWidth}
            />
          )}
          <div className="lg:ml-auto flex gap-4 items-center">
            {showSortFilter && sortOptions && (
              <SortFilter
                data={data}
                onSort={handleSort}
                sortOptions={sortOptions}
              />
            )}
            {customFilterButton && (
              <FilterDialog onClick={customFilterButton} />
            )}
            {showFilter && (
              <TableFilter
                filterList={filterList}
                handleFilterChange={handleFilterChange}
              />
            )}
            {showDateFilter && (
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onDateChange={handleDateFilterChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-lightBg dark:bg-darkBg text-sm text-gray-600">
        {loadingState ? (
          <div className="flex items-center justify-center my-10">
            <Spinner />
          </div>
        ) : data?.length < 1 ? (
          <h2>No Data to display</h2>
        ) : (
          <TanBody
            table={table}
            loadingState={loadingState}
            onClick={onClick}
            onRowClick={onRowClick}
            tableId={tableId}
            highlightedRowId={highlightedRowId}
          />
        )}
      </div>
      {!hidePaging && tableData?.length > pageSize && (
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
