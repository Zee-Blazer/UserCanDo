import TanTable from "@/components/General/TanTable";
import { formatNumber } from "@/utils/helpers";
import React, { useEffect, useMemo } from "react";
import TableCategoryFilter from "./views/tableCategoryFilter";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

const TopSellingAgentSection = () => {
  const { loadTopSellingAgentData, isTopSellingAgentsLoading } = useDash();
  const { topSellingAgents } = useDashboardSelector();

  useEffect(() => {
    loadTopSellingAgentData();
  }, [loadTopSellingAgentData]);

  const sortedAgents = useMemo(() => {
    if (!topSellingAgents || !Array.isArray(topSellingAgents)) {
      return [];
    }

    return [...topSellingAgents].sort((a, b) => {
      return parseFloat(b.total_sales_value) - parseFloat(a.total_sales_value);
    });
  }, [topSellingAgents]);

  const columns = [
    {
      header: "Rank",
      cell: ({ row }: any) => <span className="">#{row.index + 1}</span>,
    },
    {
      header: "Agent Name",
      accessorKey: "name",
    },
    {
      header: "# Sales",
      accessorKey: "total_sales_volume",
    },
    {
      header: "Sales value (GHS)",
      accessorKey: "total_sales_value",
      cell: ({ row }: any) =>
        `GHS ${formatNumber(row.original.total_sales_value)}`,
    },
  ];

  return (
    <div>
      <TableCategoryFilter />

      <TanTable
        columnData={columns}
        data={sortedAgents}
        showSearch
        length={5}
        showDateFilter
        showFilter={false}
        loadingState={isTopSellingAgentsLoading}
      />
    </div>
  );
};

export default TopSellingAgentSection;
