import MenuDropdown from "@/components/General/menuDropdown";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "react-activity";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { formatDate, getInitials } from "@/utils/helpers";
import { TrashModal } from "@/components/General/trashModal";

interface SalesHistoryProps {
  sales: any[];
  handleDeleteAgentSales: (sale: any, callback: () => void) => void;
  isAgentSaleDeleting: boolean;
  loading?: boolean;
}

const SalesHistory: React.FC<SalesHistoryProps> = ({
  sales,
  handleDeleteAgentSales,
  isAgentSaleDeleting,
  loading,
}) => {
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteModal = (sale: any) => {
    setSelectedRow(sale);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteAgentSales(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleMessageCustomer = (sale: any) => {
    console.log("Message customer:", sale?.customer?.name);
  };

  const router = useRouter();

  const handleOrderClick = (sale: any) => {
    router.push(`/agent/sales/${sale?.id}`);
  };

  return (
    <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-t-3xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] mt-8">
      <Typography className="text-center text-[#5A5555] text-xl font-semibold">
        Sales History
      </Typography>
      {
        loading ?
          <Spinner className="h-8 w-8 mx-auto my-10" />
        :
          <>
            <section className="flex flex-col mt-4 gap-2">
              {sales?.map((sale) => (
                <div
                  key={sale?.id}
                  className="flex justify-between items-center w-full cursor-pointer p-2 rounded-lg hover:bg-[#F2F4F7] transition-colors duration-200 py-2 px-1"
                  onClick={() => handleOrderClick(sale)}
                >
                  <div className="flex gap-2">
                    <div className="bg-[#CCD6E0] flex justify-center text-center rounded-full w-[45px] h-[45px] p-2">
                      <Typography className="text-pry2 items-center text-xl font-medium">
                        {getInitials(sale?.customer?.name)}
                      </Typography>
                    </div>
                    <div className="flex flex-col">
                      <Typography className="text-gray_4 text-lg font-Poppins font-medium">
                        {sale?.customer?.name}
                      </Typography>
                      <Typography className="text-gray_4 font-normal">
                        GHS {sale?.sales_price?.toLocaleString()} |{" "}
                        {sale?.products?.length || 0} Product
                        {(sale?.products?.length || 0) !== 1 ? "s" : ""}
                      </Typography>
                      <Typography className="text-gray_4 font-normal">
                        {formatDate(sale?.created_at)}
                      </Typography>
                    </div>
                  </div>
                  <MenuDropdown
                    onDelete={() => handleDeleteModal(sale)}
                    onMessageCustomer={() => handleMessageCustomer(sale)}
                    isDeleting={isAgentSaleDeleting && selectedRow?.id === sale?.id}
                  />
                </div>
              ))}
            </section>

            <TrashModal
              warning={true}
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedRow(null);
              }}
              header="Delete Sale"
              title={`Are you sure you want to delete this sale for ${selectedRow?.business?.name}? This action cannot be undone.`}
              proceedText="Delete"
              returnText="Cancel"
              loading={isAgentSaleDeleting}
              onDelete={confirmDelete}
            />
          </>
      }
    </div>
  );
};

export default SalesHistory;
