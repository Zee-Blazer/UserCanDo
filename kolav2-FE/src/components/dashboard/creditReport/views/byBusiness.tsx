import TanTable from "@/components/General/TanTable";
import { CreditReportData, CreditReportDataBusiness } from "@/utils/mockData";
import React from "react";

const ByBusiness = () => {
  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Customer",
      accessorKey: "customer",
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
    },
    {
      header: "Total Paid",
      accessorKey: "totalPaid",
    },
    {
      header: "Total Credit",
      accessorKey: "totalCredit",
    },
    {
      header: "Outstanding",
      accessorKey: "outStanding",
    },
  ];
  return (
    <TanTable columnData={columns} data={CreditReportDataBusiness} length={5} />
  );
};

export default ByBusiness;
