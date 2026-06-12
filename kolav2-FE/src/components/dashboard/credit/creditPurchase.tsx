import { BinIcon, RecieptIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { ROUTES } from "@/constants/routes";
import { useShopperSelector } from "@/Redux/selectors";
import { generateUUID } from "@/utils/helpers";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const CreditPurchase = ({ onDelete }: any) => {
  const { bnplOrders } = useShopperSelector();

  const transformedData =
    bnplOrders?.map((order: any) => {
      const uuidParts = generateUUID().split("-");
      const applicationNumber = uuidParts.slice(0, 2).join("-");

      const orderParts = order.id.split("-");
      const purchaseOrderNumber = orderParts.slice(0, 2).join("-");

      return {
        id: order.id,
        applicationNumber,
        purchaseOrderNumber,
        supplier: order.order_items[0]?.business_name || "N/A",
        totalCredit: `${order.total_price || "0.00"}`,
        amountPaid: "0.00",
        amountDue: `${order.total_price || "0.00"}`,
        originalOrder: order,
      };
    }) || [];

  const columns = [
    {
      header: "Application Number",
      accessorKey: "applicationNumber",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          {row.original.applicationNumber}
        </Typography>
      ),
    },
    {
      header: "Order Number",
      accessorKey: "purchaseOrderNumber",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          {row.original.purchaseOrderNumber}
        </Typography>
      ),
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.supplier}
        </Typography>
      ),
    },
    {
      header: "Total Credit",
      accessorKey: "totalCredit",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          GHS {row.original.totalCredit}
        </Typography>
      ),
    },
    {
      header: "Amount Paid",
      accessorKey: "amountPaid",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          GHS {row.original.amountPaid}
        </Typography>
      ),
    },
    {
      header: "Amount Due",
      accessorKey: "amountDue",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          GHS {row.original.amountDue}
        </Typography>
      ),
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Link href={`${ROUTES.creditInvoice}?orderId=${row.original.id}`}>
            <button>
              <RecieptIcon />
            </button>
          </Link>
          {/* <button
            className="cursor-pointer"
            onClick={() => onDelete(row.original)}
          >
            <BinIcon color="#667085" />
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <TanTable
      columnData={columns}
      data={transformedData}
      showSearch
      showDateFilter
      showFilter
      showSortFilter
      length={5}
      tableId="credit-purchase-table"
    />
  );
};

export default CreditPurchase;
