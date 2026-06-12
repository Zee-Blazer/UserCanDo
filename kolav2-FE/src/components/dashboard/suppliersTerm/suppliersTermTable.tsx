import React, { useMemo, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Pen } from "lucide-react";
import { formatDate } from "@/utils/helpers";
import TanTable from "@/components/General/TanTable";
import { BinIcon } from "@/assets/svg";
import PaybackFlyout from "./paybackFlyout";

interface SuppliersTermsTableProps {
  data: any[];
  onOpenModal: () => void;
  filters: FilterTermState;
  onOpenFilterModal: () => void;
  setSelectedRow: (row: any) => void;
  onOpenEditDrawer: (data: any) => void;
  onViewTermDetails: (data: any) => void;
  isLoading?: boolean;
  activeTabIndex?: number;
}

interface FilterTermState {
  term_number?: string;
  supplier_name?: string;
  approval_status?: string;
  payment_status?: string;
  start_date?: string;
  end_date?: string;
  due_date?: string;
}

const SuppliersTermsTable = ({
  data,
  onOpenModal,
  filters,
  onOpenFilterModal,
  setSelectedRow,
  onOpenEditDrawer,
  onViewTermDetails,
  isLoading = false,
  activeTabIndex = 0,
}: SuppliersTermsTableProps) => {
  const [isCreditPayback, setIsCreditPayback] = useState(false);
  const [selectedPaybackTerm, setSelectedPaybackTerm] = useState<any>(null);

  const closeFlyout = () => {
    setIsCreditPayback(false);
    setSelectedPaybackTerm(null);
  };

  const handleAddCustomer = (term: any) => {
    setSelectedPaybackTerm(term);
    setIsCreditPayback(true);
  };

  const getNextDueDate = (installments: any[]) => {
    if (!installments || installments.length === 0) return null;

    const pendingInstallments = installments.filter(
      (installment) =>
        installment.status === "pending" || installment.status === "overdue"
    );

    if (pendingInstallments.length === 0) return null;

    const sortedInstallments = pendingInstallments.sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    );

    return sortedInstallments[0].due_date;
  };

  const filteredData = useMemo(() => {
    return data.filter((term: any) => {
      let dateMatch = true;
      const termDate = term?.request_date
        ? new Date(term.request_date)
        : new Date();

      if (filters?.start_date && filters?.end_date) {
        const startDate = new Date(filters.start_date);
        const endDate = new Date(filters.end_date);
        dateMatch = termDate >= startDate && termDate <= endDate;
      } else if (filters?.start_date) {
        const startDate = new Date(filters.start_date);
        dateMatch = termDate >= startDate;
      } else if (filters?.end_date) {
        const endDate = new Date(filters.end_date);
        dateMatch = termDate <= endDate;
      }

      let dueDateMatch = true;
      if (filters?.due_date) {
        const nextDueDate = getNextDueDate(term?.installments);
        dueDateMatch = nextDueDate === filters?.due_date;
      }

      let termNumberMatch = true;
      if (filters?.term_number && filters.term_number.trim() !== "") {
        termNumberMatch = Boolean(
          term?.term_number &&
            term.term_number
              .toLowerCase()
              .includes(filters.term_number.toLowerCase())
        );
      }

      let approvalStatusMatch = true;
      if (filters?.approval_status) {
        approvalStatusMatch =
          term?.approval_status === filters?.approval_status;
      }

      let paymentStatusMatch = true;
      if (filters?.payment_status) {
        paymentStatusMatch = term?.payment_status === filters?.payment_status;
      }

      return (
        dateMatch &&
        dueDateMatch &&
        termNumberMatch &&
        approvalStatusMatch &&
        paymentStatusMatch &&
        (!filters?.supplier_name ||
          filters.supplier_name.trim() === "" ||
          (term?.supplier_name &&
            term.supplier_name
              .toLowerCase()
              .includes(filters.supplier_name.toLowerCase())))
      );
    });
  }, [data, filters]);

  const getApprovalStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-[#F2FEF7] text-[#027A48]";
      case "pending":
        return "bg-[#FAF2EF] text-[#CA810A]";
      case "declined":
        return "bg-[#FFF9F2] text-[#FF000D]";
      case "on hold":
        return "bg-[#FFF9F2] text-[#AF7208]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "fully paid":
        return "bg-[#F2FEF7] text-[#027A48]";
      case "partially paid":
        return "bg-[#FAF2EF] text-[#CA810A]";
      case "not_due":
        return "bg-[#F1F6FF] text-[#365FB6]";
      case "overdue":
        return "bg-[#FFF9F2] text-[#FF000D]";
      case "due today":
        return "bg-[#F3E8FF] text-[#7C3AED]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatPaymentStatus = (status: string) => {
    if (status === "not_due") {
      return "Not due";
    }
    return status || "N/A";
  };

  const getDueDateStyling = (dueDate: string) => {
    if (!dueDate) return "text-gray_4";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(0, 0, 0, 0);

    const isOverdue = dueDateObj < today;
    const isDueToday = dueDateObj.getTime() === today.getTime();

    if (isOverdue) return "text-red-600 font-medium";
    if (isDueToday) return "text-orange-600 font-medium";
    return "text-black";
  };

  const columns = [
    {
      header: "Term Number",
      accessorKey: "term_number",
      cell: ({ row }: any) => (
        <Typography className="font-medium text-sm text-black">
          {row.original.term_number || "N/A"}
        </Typography>
      ),
    },
    {
      header: "Request Date",
      accessorKey: "request_date",
      cell: ({ row }: any) => {
        if (!row.original.request_date)
          return <span className="text-gray_4">N/A</span>;

        const dateStr = formatDate(row.original.request_date);

        return (
          <Typography className="font-normal text-sm text-black">
            {dateStr}
          </Typography>
        );
      },
    },
    {
      header: "Date Issued",
      accessorKey: "date_issued",
      cell: ({ row }: any) => {
        const firstInvoice = row.original.invoices?.[0];
        const issueDate = firstInvoice?.invoice_issue_date;

        if (!issueDate) return <span className="text-gray_4">N/A</span>;

        return (
          <Typography className="font-normal text-sm text-black">
            {formatDate(issueDate)}
          </Typography>
        );
      },
    },
    {
      header: "Approval Status",
      accessorKey: "approval_status",
      cell: ({ row }: any) => (
        <span
          className={`inline-block px-3 py-1 rounded-lg font-medium text-sm ${getApprovalStatusStyle(
            row.original.approval_status
          )}`}
        >
          {row.original.approval_status || "N/A"}
        </span>
      ),
    },
    {
      header: "Total Payable",
      accessorKey: "total_payable",
      cell: ({ row }: any) => {
        const total = row.original.total_order_price || 0;
        return (
          <Typography variant="small" className="font-normal text-gray_4">
            GHS{" "}
            {parseFloat(total).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        );
      },
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: ({ row }: any) => {
        const dueDate = getNextDueDate(row.original.installments);

        if (!dueDate) return <span className="text-gray_4">N/A</span>;

        const styling = getDueDateStyling(dueDate);

        return (
          <Typography className={`font-normal text-sm ${styling}`}>
            {formatDate(dueDate)}
          </Typography>
        );
      },
    },
    {
      header: "Payment Status",
      accessorKey: "payment_status",
      cell: ({ row }: any) => (
        <span
          className={`inline-block px-3 py-1 rounded-lg font-medium text-sm ${getPaymentStatusStyle(
            row.original.payment_status
          )}`}
        >
          {formatPaymentStatus(row.original.payment_status)}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => (
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {activeTabIndex === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddCustomer(row.original);
              }}
              className="px-3 py-1 bg-inherit text-pry2 text-sm rounded-lg transition-colors"
              title="Pay Back"
            >
              Pay Back
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenEditDrawer(row.original);
                }}
                title="Edit Term"
              >
                <Pen size={20} className="text-[#667085]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedRow(row.original);
                  onOpenModal();
                }}
                className="cursor-pointer"
                title="Delete Term"
              >
                <BinIcon color="#667085" />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <TanTable
        columnData={columns}
        data={filteredData}
        showSearch
        length={10}
        showDateFilter
        customFilterButton={onOpenFilterModal}
        loadingState={isLoading}
        onRowClick={(row: any) => onViewTermDetails(row.original)}
        searchPlaceholder="Search terms..."
      />
      <PaybackFlyout
        isRightDrawerOpen={isCreditPayback}
        closeFlyout={closeFlyout}
        selectedTerm={selectedPaybackTerm}
      />
    </div>
  );
};

export default SuppliersTermsTable;
