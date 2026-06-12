"use client";

import { Typography } from "@material-tailwind/react";
import TanTable from "@/components/General/TanTable";
import Image from "next/image";
import CartSummary from "./cartOrderSummary";
import { useDashboardSelector } from '@/Redux/selectors';

import CartImage from "@/assets/images/bag2.png";

const dummyData = [
  {
    product: "Product A",
    quantity: 1,
    unit_price: "GHS 40,000",
    amount: "GHS 800,000",
  },
  {
    product: "Product B",
    quantity: 3,
    unit_price: "GHS 15,000",
    amount: "GHS 45,000",
  },
  {
    product: "Product C",
    quantity: 2,
    unit_price: "GHS 22,500",
    amount: "GHS 45,000",
  },
];

interface Props {
    currentStatus?: string;
}

const OrdersInfoStatus = ({ currentStatus }: Props) => {
  const { activeOrderStatus } = useDashboardSelector();

  const orderProducts = activeOrderStatus?.products || dummyData;
  
  const columns = [
    {
      header: "Item(s)",
      accessorKey: "product_name",
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Image
            src={CartImage}
            alt="No image"
            width={40}
            height={40}
            className="rounded-full mr-2"
          />
          <Typography className="text-[#101828] text-sm font-inter">
            {row.original.product_name || row.original.product || 'N/A'}
          </Typography>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }: any) => (
        <Typography className="text-[#1B1E21] font-inter text-sm justify-end flex mr-3">
          {row.original.quantity || 0}
        </Typography>
      ),
    },
    {
      header: "Unit Price",
      accessorKey: "unit_price",
      cell: ({ row }: any) => {
        const price = row.original.unit_price || row.original.price || 0;
        return (
          <Typography className="text-[#1B1E21] font-inter text-sm">
            GHS {typeof price === 'string' ? price : price.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "total_price",
      cell: ({ row }: any) => {
        const total = row.original.total_price || row.original.amount || row.original.total || 0;
        return (
          <Typography className="text-[#1B1E21] font-inter text-sm">
            GHS {typeof total === 'string' ? total : total.toFixed(2)}
          </Typography>
        );
      },
    },
  ];

  return (
    <div className="mt-8">
      <Typography className="uppercase text-base font-inter font-bold mb-2.5">
        Orders
      </Typography>

      <div>
        <TanTable columnData={columns} data={orderProducts} />
      </div>
    </div>
  );
};

export default OrdersInfoStatus;
