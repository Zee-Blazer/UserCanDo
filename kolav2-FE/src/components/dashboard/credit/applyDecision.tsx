import { BinIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import { formatDate, formatTime } from "@/utils/helpers";
import { useDash } from "@/context/dashboardContext";
import { DeleteModal } from "@/components/General/deleteModal";
import { TrashModal } from "@/components/General/trashModal";

const ApplyDecision = () => {
  const { creditApplications } = useDashboardSelector();
  const {
    loadCreditData,
    handleDeleteCreditAccessment,
    isCreditApplicationDeleting,
  } = useDash();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row.original);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteCreditAccessment(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const mappedData =
    creditApplications?.map((application: any) => ({
      id: application?.id,
      applicationNumber: application?.application_number,
      created_at: application?.created_at,
      name: application?.full_name,
      title: application?.title || "N/A",
      dueDate: application?.due_date || "N/A",
      status: application?.status,
    })) || [];

  useEffect(() => {
    loadCreditData();
  }, [loadCreditData]);

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
      header: "Application Date",
      accessorKey: "created_at",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.created_at);
        const timeStr = formatTime(row.original.created_at);

        return (
          <div className="flex gap-1 items-center">
            <Typography className="font-normal text-sm">{dateStr}</Typography>
            <span className="text-xs text-[#B1B7BE]">{" " + timeStr}</span>
          </div>
        );
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.name}
        </Typography>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }: any) => (
        <Typography className="text-gray_7 text-sm font-normal">
          {row.original.title}
        </Typography>
      ),
    },
    // {
    //   header: "Due Date",
    //   accessorKey: "dueDate",
    //   cell: ({ row }: any) => {
    //     const dueDate = row.original.dueDate;

    //     return (
    //       <Typography className="text-gray_7 text-sm font-normal">
    //         {dueDate}
    //       </Typography>
    //     );
    //   },
    // },
    {
      header: "Application Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const status = row.original.status;
        const getStatusStyle = (status: string) => {
          switch (status?.toLowerCase()) {
            case "pending":
              return "bg-[#FEF3C7] text-[#D97706]";
            case "approved":
              return "bg-[#F2FEF7] text-[#027A48]";
            case "rejected":
              return "bg-[#FEE2E2] text-[#DC2626]";
            default:
              return "bg-[#F2FEF7] text-[#027A48]";
          }
        };

        return (
          <span
            className={`inline-block w-32 text-center px-2 py-1 rounded-lg font-medium ${getStatusStyle(
              status
            )}`}
          >
            {status}
          </span>
        );
      },
    },
    // {
    //   header: "Action",
    //   accessorKey: "order",
    //   cell: ({ row }: any) => (
    //     <div className="flex items-center gap-2">
    //       <button
    //         className="cursor-pointer"
    //         onClick={() => handleDeleteModal(row)}
    //       >
    //         <BinIcon color="#667085" />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <TanTable
        columnData={columns}
        data={mappedData}
        showSearch
        showDateFilter={false}
        showFilter={false}
        showSortFilter
        length={5}
        tableId="apply-decision-table"
      />
      <TrashModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        onDelete={confirmDelete}
        header="Delete Credit Application"
        title={`Are you sure you want to remove "${selectedRow?.applicationNumber}"?`}
        loading={isCreditApplicationDeleting}
      />
    </>
  );
};

export default ApplyDecision;
