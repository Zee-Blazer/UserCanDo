import { useAgentSelector } from "@/Redux/selectors";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getInitials } from "@/utils/helpers";
import { useAgent } from "@/context/agentContext";
import { TrashModal } from "@/components/General/trashModal";
import { Ellipsis, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const SalesHistory = () => {
  const { loadAgentSalesData } = useAgent();
  const { sales } = useAgentSelector();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const { handleDeleteAgentSales, isAgentSaleDeleting } = useAgent();

  const displayedSales = sales?.slice(0, 3) || [];

  useEffect(() => {
    loadAgentSalesData();
  }, [loadAgentSalesData]);

  const handleOpenPopover = (saleId: string) => {
    setOpenPopover(openPopover === saleId ? null : saleId);
  };

  const handleDeleteModal = (sale: any) => {
    setSelectedRow(sale);
    setIsDeleteModalOpen(true);
    setOpenPopover(null);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteAgentSales(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const router = useRouter();

  const handleOrderClick = (orderId: string) => {
    router.push(`/agent/sales/${orderId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography className="text-lg font-semibold">Sales History</Typography>
        <Link href={ROUTES.agentSales}>
          <button className="text-[#003366] font-normal">View All</button>
        </Link>
      </div>
      <section className="mt-6 grid grid-cols-1 gap-4">
        {displayedSales && displayedSales.length > 0 ? (
          displayedSales.map((sale) => (
            <div
              key={sale.id}
              className="rounded-xl border py-5 grid grid-cols-1 px-4 border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div
                  className="flex gap-4 items-center cursor-pointer flex-1"
                  onClick={() => handleOrderClick(sale.id)}
                >
                  <div className="bg-[#CCD6E0] rounded-full w-[45px] h-[45px] flex items-center justify-center">
                    <Typography className="text-[#003366] text-xl font-medium">
                      {getInitials(sale?.customer?.name)}
                    </Typography>
                  </div>
                  <div className="flex flex-col">
                    <Typography className="text-gray_4 font-medium">
                      {sale?.customer?.name}
                    </Typography>
                    <div className="flex text-sm text-gray_3 gap-4">
                      <span>
                        {new Date(sale.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>{" "}
                      | {sale.products.length} product
                      {sale.products.length !== 1 ? "s" : ""}
                    </div>
                    <Typography className="text-sm text-gray_3">
                      GHS {sale.sales_price.toLocaleString()}
                    </Typography>
                  </div>
                </div>
                <Popover
                  open={openPopover === sale.id}
                  handler={() => handleOpenPopover(sale.id)}
                  placement="bottom-end"
                >
                  <PopoverHandler>
                    <button>
                      <Ellipsis strokeWidth={0.75} />
                    </button>
                  </PopoverHandler>
                  <PopoverContent className="flex flex-col gap-2 rounded-lg py-2 px-3 w-auto min-w-[120px]">
                    <button
                      className="text-left gap-2 text-sm flex items-center hover:bg-gray-100 rounded p-1"
                      onClick={() => handleDeleteModal(sale)}
                      disabled={
                        isAgentSaleDeleting && selectedRow?.id === sale.id
                      }
                    >
                      <Trash2Icon size={15} />
                      <span className="text-[#0D121D]">
                        {isAgentSaleDeleting && selectedRow?.id === sale.id
                          ? "Deleting..."
                          : "Delete"}
                      </span>
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border py-5 grid grid-cols-1 px-4 border-gray-200">
            <Typography className="text-gray-600 font-medium text-lg">
              No sale history available
            </Typography>
            <Typography className="text-gray-500 text-sm mt-2">
              Record a sale to see history here
            </Typography>
          </div>
        )}
      </section>

      <TrashModal
        warning={true}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        header="Delete Sale"
        title={`Are you sure you want to delete this sale for ${selectedRow?.sale?.business?.name}? This action cannot be undone.`}
        proceedText="Delete"
        returnText="Cancel"
        loading={isAgentSaleDeleting}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default SalesHistory;
