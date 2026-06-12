import { BinIcon, RecieptIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { ROUTES } from "@/constants/routes";
import { creditPayback } from "@/utils/mockData";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const CreditPayback = ({ onDelete }: any) => {
  const columns = [
    {
      header: "Application Number",
      accessorKey: "applicationNumber",
    },
    {
      header: "Application Date",
      accessorKey: "applicationDate",
    },
    {
      header: "Purchase order Number",
      accessorKey: "purchaseOrderNumber",
    },
    {
      header: "Payment Amount",
      accessorKey: "paymentAmount",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.paymentAmount}
        </Typography>
      ),
    },
    {
      header: "Balance",
      accessorKey: "balance",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.balance}
        </Typography>
      ),
    },
    {
      header: "Payment Date",
      accessorKey: "PaymentDate",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.PaymentDate}
        </Typography>
      ),
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Link href={ROUTES.creditInvoice}>
            <button>
              <RecieptIcon />
            </button>
          </Link>
          <button
            className="cursor-pointer"
            onClick={() => onDelete(row.original)}
          >
            <BinIcon color="#667085" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <TanTable
      columnData={columns}
      data={creditPayback}
      showSearch
      showDateFilter
      showFilter
      showSortFilter
      length={5}
      tableId="credit-payback-table"
    />
  );
};

export default CreditPayback;
