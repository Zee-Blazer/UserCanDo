import TanTable from "@/components/General/TanTable";
import { agentStock } from "@/utils/mockData";
import Image from "next/image";
import stock from "@/assets/images/total_stock.svg";
import amount from "@/assets/images/total_amount.svg";
import balance from "@/assets/images/total_balance.svg";
import valueDelivered from "@/assets/images/cart_tilt.svg";
import valueSold from "@/assets/images/cash_vertical.svg";
import balanceGHS from "@/assets/images/money_bag.svg";
import { Typography } from "@material-tailwind/react";

const AgentStock = () => {
  const columns = [
    {
      header: "# Stock History",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
    },
    {
      header: "Agent",
      accessorKey: "agent",
    },
    {
      header: "Total Stock Collected",
      accessorKey: "totalStockCollected",
    },
    {
      header: "Total Stock Value",
      accessorKey: "totalStockValue",
    },
    {
      header: "Total Volume Left",
      accessorKey: "totalVolumeLeft",
    },
    {
      header: "Payment Received",
      accessorKey: "paymentReceived",
    },
    {
      header: "Outstanding Balance",
      accessorKey: "outstandingBalance",
      cell: (info: any) => (
        <span className="text-[#B42318]">{info.getValue()}</span>
      ),
    },
  ];

  const stats = [
    {
      img: stock,
      title: "Total Delivered",
      label: "2000",
    },
    {
      img: amount,
      title: "Total Sold",
      label: "1,200",
    },
    {
      img: balance,
      title: "Balance",
      label: "800",
    },
    {
      img: valueDelivered,
      title: "Total Value Delivered (GHS)",
      label: "GHS 20,000",
    },
    {
      img: valueSold,
      title: "Total Value Sold (GHS)",
      label: "GHS 10,000",
    },
    {
      img: balanceGHS,
      title: "Balance (GHS)",
      label: "GHS 10,000",
    },
  ];

  return (
    <div>
      <div className="py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stats?.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image src={stat?.img} alt={stat?.title} />
              <div className="flex flex-col gap-3">
                <Typography variant="small" className="text-gray_4 font-normal">
                  {stat?.title}
                </Typography>
                <span className="text-2xl font-bold text-gray-900">
                  {stat?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TanTable
        columnData={columns}
        data={agentStock}
        showSearch
        length={5}
        showBorder
        showDateFilter
      />
    </div>
  );
};

export default AgentStock;
