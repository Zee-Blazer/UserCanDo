
interface SelectFilterConfig {
  label: string;
  field: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Download, Plus, RefreshCw } from "lucide-react";
import * as React from "react";
import { FC, useEffect, useMemo, useState } from "react";
import { Spinner } from "react-activity";
import TanBody from "./body";
import DateFilter from "./dateFilter";
import TableFilter from "./filter";
import FilterDialog from "./filterDialog";
import Pagination from "./pagination";
import SearchComp from "./searchComp";
import SortFilter from "./sortFilter";

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
  headerBtnLoading?: boolean;
  showSearch?: boolean;
  showHeader?: { title: string, subTitle?: string, btnTxt?: string, search?: boolean | { value: string; onChange: (val: string) => void }, addUser?: string | { label: string; onClick: () => void }, noColor?: boolean };
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
  rowBorderLine?: boolean;
  colBorderLine?: boolean;
  customContent?: React.ReactNode;
  selectFilters?: SelectFilterConfig[];
  onRefresh?: () => void;
  refreshStatus?: boolean;
  onDateRangeChange?: (startDate: string | null, endDate: string | null) => void;
  preservePageOnDataChange?: boolean;
}

const TanTable: FC<TanTableProps> = ({
  columnData,
  data,
  loadingState,
  onClick,
  headerBtnLoading = false,
  showSearch,
  showHeader,
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
  rowBorderLine = false,
  colBorderLine = false,
  customContent,
  selectFilters,
  onRefresh,
  refreshStatus,
  onDateRangeChange,
  preservePageOnDataChange = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
    const buttons: React.ReactElement[] = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => {
            table.setPageIndex(i);
            setPageIndex(i);
          }}
          className={`${isPageActive(i, currentPage)
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

    // If external callback is provided, use it for server-side filtering
    if (onDateRangeChange) {
      const formatDateForAPI = (date: Date | null) => {
        if (!date) return null;
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      };
      onDateRangeChange(formatDateForAPI(start), formatDateForAPI(end));
      return;
    }

    // Fallback to client-side filtering if no external callback
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
    if (!preservePageOnDataChange) {
      setPageIndex(0);
    }
  }, [data, preservePageOnDataChange]);

  return (
    <div className="font-sans">
      <div className={` ${showBorder ? "border border-gray-300 px-3 pt-3" : ""}`}>
        <div className="flex flex-col lg:flex-col justify-between gap-4 lg:items-center mb-4">
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
          {showHeader && (
            <div className="md:flex w-full justify-between items-center gap-4">
              <div>
                <h2 className="text-lg font-bold">{showHeader.title}</h2>
                <p className="text-sm text-gray-500">{showHeader.subTitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {showHeader.search && (
                  <SearchComp
                    setSearchTerm={
                      (showHeader && typeof showHeader.search === 'object' && showHeader.search && 'onChange' in showHeader.search)
                        ? ((val) => (showHeader.search as { onChange: (val: string) => void }).onChange(val as string))
                        : setSearchTerm
                    }
                    setPageIndex={setPageIndex}
                    searchTerm={typeof showHeader.search === 'object' ? showHeader.search.value : searchTerm}
                    handleFilterChange={handleFilterChange}
                    filterList={filterList}
                    placeholder={searchPlaceholder}
                    maxWidth={searchMaxWidth}
                  />
                )}
                {showHeader.btnTxt && (
                  <button
                    color="green"
                    onClick={onClick}
                    disabled={headerBtnLoading}
                    className={`
                      ${showHeader.noColor ?
                        "p-2 cursor-pointer bg-transparent border text-[#272932] border-gray-300 rounded-md flex items-center gap-2 normal-case whitespace-nowrap transition-colors duration-150 hover:bg-gray-100 hover:border-[#bdbdbd]"
                        :
                        "p-2 cursor-pointer bg-transparent border text-green-500 border-green-500 rounded-md flex items-center gap-2 normal-case whitespace-nowrap transition-colors duration-150 hover:bg-green-50 hover:border-green-600"
                      }
                    `}
                  >
                    {headerBtnLoading ? (
                      // spinner should inherit the button's text color — use `border-current`
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Download size={18} className={` ${showHeader.noColor ? "text-[#ADACAC]" : "text-green-500"} `} />
                    )}
                    {showHeader.btnTxt}
                  </button>
                )}
                {showHeader.addUser && (
                  typeof showHeader.addUser === 'string' ? (
                    <button
                      className={`p-2 cursor-pointer bg-transparent border text-[#272932] border-gray-300 rounded-md flex items-center gap-2 normal-case whitespace-nowrap transition-colors duration-150 hover:bg-gray-100 hover:border-[#bdbdbd]`}
                    >
                      <Plus size={18} className={` ${showHeader.noColor ? "text-[#ADACAC]" : "text-green-500"} `} />
                      {showHeader.addUser}
                    </button>
                  ) : (
                    <button
                      className={`p-2 cursor-pointer bg-transparent border text-[#272932] border-gray-300 rounded-md flex items-center gap-2 normal-case whitespace-nowrap transition-colors duration-150 hover:bg-gray-100 hover:border-[#bdbdbd]`}
                      onClick={showHeader.addUser.onClick}
                    >
                      <Plus size={18} className={` ${showHeader.noColor ? "text-[#ADACAC]" : "text-green-500"} `} />
                      {showHeader.addUser.label}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
          <div className="lg:mr-auto flex flex-wrap gap-4 items-center">
            {showDateFilter && (
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                onDateChange={handleDateFilterChange}
              />
            )}

            {/* Select Filter Group */}
            {Array.isArray(selectFilters) && selectFilters.length > 0 && (
              <div className="flex gap-2">
                {selectFilters.map((filter: SelectFilterConfig, idx: number) => (
                  <div
                    key={filter.field || idx}
                    className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1 bg-white"
                  >
                    <span className="text-sm text-gray-700 font-medium">{filter.label}:</span>
                    <select
                      className="text-sm bg-transparent border-none outline-none min-w-[80px] max-w-[120px] px-1 py-0.5"
                      style={{ boxShadow: 'none' }}
                      value={filter.value}
                      onChange={e => filter.onChange(e.target.value)}
                    >
                      <option value="">All</option>
                      {filter.options.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Refresh Button */}
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-sm text-[#272932] bg-transparent cursor-pointer transition-colors duration-150 hover:bg-gray-100 hover:border-[#bdbdbd]"
              >
                <RefreshCw size={16} className="" />
                {refreshStatus ? "Refreshing..." : "Refresh"}
              </button>
            )}

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
          </div>
        </div>
        {customContent && (
          <div className="mb-4">{customContent}</div>
        )}
      </div>
      {customContent ? null : (
        <div className="bg-lightBg dark:bg-darkBg text-sm text-gray-600">
          {loadingState ? (
            <div className="flex flex-col items-center justify-center my-16 py-12">
              <Spinner />
              <p className="mt-4 text-gray-500 text-sm">Loading data, please wait...</p>
            </div>
          ) : data?.length < 1 ? (
            <div className="flex flex-col items-center justify-center my-16 py-12">
              <div className="text-gray-400 text-6xl mb-4">📋</div>
              <h2 className="text-lg font-medium text-gray-600 mb-2">No Data Available</h2>
              <p className="text-sm text-gray-500">There are currently no records to display.</p>
            </div>
          ) : (
            <TanBody
              table={table}
              loadingState={loadingState}
              onClick={onClick}
              onRowClick={onRowClick}
              tableId={tableId}
              rowBorderLine={rowBorderLine}
              colBorderLine={colBorderLine}
            />
          )}
        </div>
      )}
      {!hidePaging && !customContent && tableData?.length > pageSize && (
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
