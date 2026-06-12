import TanTable from "@/components/General/TanTable";
import { CreditReportData } from "@/utils/mockData";
import React from "react";

const BySpecificCredit = () => {
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
      header: "Agent",
      accessorKey: "agent",
    },
    {
      header: "Customer",
      accessorKey: "customer",
    },
    {
      header: "Last Amount Paid",
      accessorKey: "lastAmountPaid",
    },
    {
      header: "Total Credit",
      accessorKey: "totalCredit",
    },
    {
      header: "Outstanding",
      accessorKey: "outStanding",
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },
  ];
  return <TanTable columnData={columns} data={CreditReportData} length={5} />;
};

export default BySpecificCredit;
