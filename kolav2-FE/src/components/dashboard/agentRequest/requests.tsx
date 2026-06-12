import { RecieptIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { useDashboardSelector } from "@/Redux/selectors";
import {
  getAgentRequestStatusClasses,
  getAverageFulfillmentTime,
  getCurrentAgentRequestStatus,
  getHistoryItemDate,
} from "@/utils/helpers";
import { Eye, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import Confirm from "@/assets/images/fulfilled.png";
import Star from "@/assets/images/star.png";
import Time from "@/assets/images/time.png";
import { useState } from "react";
import { useDash } from "@/context/dashboardContext";
import { DeleteModal } from "@/components/General/deleteModal";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { UIGuard } from "@/components/guards/roleGuard";
import { usePageData } from "@/api/hooks/usePageData";

interface RequestsProps {
  onEditButtonClick?: (data: AgentRequestProps) => void;
  openDetailsModal?: (data: AgentRequestProps) => void;
}

const Requests = ({ onEditButtonClick, openDetailsModal }: RequestsProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const { agentRequests, products } = useDashboardSelector();
  const {
    loadAgentRequestsData,
    loadProductsData,
    handleDeleteAgentRequest,
    isAgentRequestDeleting,
  } = useDash();

  const handleViewRequestDetails = (requestData: any) => {
    if (openDetailsModal) {
      openDetailsModal(requestData);
    }
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteAgentRequest(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  usePageData([loadAgentRequestsData, loadProductsData]);

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Request Date",
      accessorKey: "request_date",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => {
        const currentStatus = getCurrentAgentRequestStatus(
          row.original?.request_history || []
        );
        return (
          <span className="text-gray_5">
            {getHistoryItemDate(
              row.original?.request_history || [],
              currentStatus
            )}
          </span>
        );
      },
    },
    {
      header: "Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original.sales_agent_name
              ? row.original.sales_agent_name
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Product Detail",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => {
        const productNames = row.original.products.map((product) => {
          const matchedProduct = products.find(
            (p) => p.id === product.product_id
          );
          return matchedProduct
            ? matchedProduct.product_name
            : "Unknown Product";
        });
        const displayNames =
          productNames.length > 3
            ? productNames.slice(0, 3).join(", ") + "..."
            : productNames.join(", ");

        return (
          <span className="text-gray_5" title={productNames.join(", ")}>
            {displayNames || "N/A"}
          </span>
        );
      },
    },
    {
      header: "Total Price",
      accessorKey: "total_request_price",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => (
        <span className="text-gray_5">
          GHS
          {row.original.total_request_price
            ? row.original.total_request_price.toLocaleString()
            : 0}
        </span>
      ),
    },
    {
      header: "Delivery Info",
      accessorKey: "location",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.location ? row.original.location : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => {
        const currentStatus = getCurrentAgentRequestStatus(
          row.original?.request_history || []
        );
        const statusClasses = getAgentRequestStatusClasses(currentStatus);
        return (
          <span className={`px-2 py-1 rounded-md capitalize ${statusClasses}`}>
            {currentStatus}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }: { row: { original: AgentRequestProps } }) => (
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <UIGuard permission="VIEW_AGENT">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openDetailsModal && openDetailsModal(row.original);
              }}
              aria-label="View Request"
            >
              <Eye size={18} />
            </button>
          </UIGuard>
          <UIGuard permission="UPDATE_AGENT">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditButtonClick && onEditButtonClick(row.original);
                setSelectedRow(row.original);
              }}
              aria-label="Edit Agent Request"
            >
              <Pen size={18} />
            </button>
          </UIGuard>
          <UIGuard permission="VIEW_AGENT">
            <Link
              href={`${ROUTES.agentRequestInvoice}?agentRequestId=${row.original.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" aria-label="Agent Request Invoice">
                <RecieptIcon />
              </button>
            </Link>
          </UIGuard>
          <UIGuard permission="DELETE_AGENT">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteModal(row.original);
              }}
              aria-label="Delete Agent Request"
            >
              <Trash2 size={18} />
            </button>
          </UIGuard>
        </div>
      ),
    },
  ];

  const stats = [
    {
      img: Confirm,
      title: "Total Requests Fulfilled",
      label:
        agentRequests?.filter(
          (req) =>
            getCurrentAgentRequestStatus(req.request_history || []) ===
            "completed"
        ).length || 0,
    },
    {
      img: Star,
      title: "Fulfillment Rate",
      label:
        agentRequests && agentRequests.length > 0
          ? `${Math.round(
              (agentRequests?.filter(
                (req) =>
                  getCurrentAgentRequestStatus(req.request_history || []) ===
                  "completed"
              ).length /
                agentRequests.length) *
                100
            )}%`
          : "0%",
    },
    {
      img: Time,
      title: "Avg. Fulfillment Time",
      label: getAverageFulfillmentTime(agentRequests || []),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 flex items-center gap-4"
          >
            <Image src={stat?.img} alt={stat?.title} width={50} height={50} />
            <div>
              <p className="text-gray-500 text-sm">{stat?.title}</p>
              <p className="text-xl font-semibold">{stat?.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <TanTable
          data={agentRequests || []}
          columnData={columns}
          showSearch
          length={5}
          showDateFilter
          dateField="request_date"
          onRowClick={(row: any) => handleViewRequestDetails(row.original)}
        />

        <DeleteModal
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedRow(null);
          }}
          onDelete={confirmDelete}
          loading={isAgentRequestDeleting}
          header="Remove Agent Request"
          message="Are you sure you want to remove this agent request from the library?"
        />
      </div>
    </div>
  );
};

export default Requests;
