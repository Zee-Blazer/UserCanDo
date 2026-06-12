import { BinIcon, ClockIcon, MessageIcon, SortIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { suppliersTermAllRequest } from "@/utils/mockData";
import { Pen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface WindowRecoveryProps {
  openDeleteModal: (item: any) => void;
  openFilterModal: () => void;
}

const WindowRecovery = ({
  openDeleteModal,
  openFilterModal,
}: WindowRecoveryProps) => {
  const modifiedData = suppliersTermAllRequest.map((item, index) => ({
    ...item,
    customerPaymentStatus:
      index % 3 === 0
        ? "Fully Paid"
        : index % 2 === 0
        ? "Partially paid"
        : "Unpaid",
  }));

  const columns = [
    {
      header: "Terms",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Requested Date",
      accessorKey: "requestedDate",
    },
    {
      header: "Customer",
      accessorKey: "customer",
    },
    {
      header: "Total Payable (GHS)",
      accessorKey: "totalPayable",
    },
    {
      header: "Approval Status",
      accessorKey: "approvalStatus",
      cell: ({ row }: any) => (
        <span
          className={`inline-block w-32 text-center px-2 py-1 rounded-lg font-medium ${
            row.original.approvalStatus === "CEO Approved"
              ? "bg-[#F2FEF7] text-[#027A48]"
              : row.original.approvalStatus === "Under Review"
              ? "bg-[#F0EBF9] text-[#6941C6]"
              : ""
          }`}
        >
          {row.original.approvalStatus}
        </span>
      ),
    },
    {
      header: "Disbursement Date",
      accessorKey: "disbursementDate",
    },
    {
      header: "Customer Payment Status",
      accessorKey: "customerPaymentStatus",
      cell: ({ row }: any) => (
        <span
          className={`inline-block text-center px-2 py-1 rounded-md font-medium ${
            row.original.customerPaymentStatus === "Fully Paid"
              ? "bg-[#F2FEF7] text-[#027A48]"
              : row.original.customerPaymentStatus === "Partially paid"
              ? "bg-[#F0EBF9] text-[#6941C6]"
              : row.original.customerPaymentStatus === "Unpaid"
              ? "bg-[#FDECEC] text-[#D32F2F]"
              : ""
          }`}
        >
          {row.original.customerPaymentStatus}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2 px-4">
          <MessageIcon />
            <button>
              <Pen size={20} />
            </button>
          <button onClick={openDeleteModal} className="cursor-pointer">
            <BinIcon color="#667085" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <TanTable
        columnData={columns}
        data={modifiedData}
        showSearch
        length={5}
        showDateFilter
        showSortFilter
        sortOptions={[
          {
            key: "business_name",
            label: "Sort Alphabetically",
            icon: <SortIcon />,
            type: "string",
            defaultDirection: "asc",
          },
          {
            key: "last_updated",
            label: "Sort By Recently Updated",
            icon: <ClockIcon />,
            type: "date",
            defaultDirection: "desc",
          },
        ]}
        customFilterButton={() => openFilterModal()}
      />
    </div>
  );
};

export default WindowRecovery;
