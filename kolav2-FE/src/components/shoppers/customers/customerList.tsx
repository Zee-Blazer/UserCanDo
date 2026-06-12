import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getInitials } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import MenuDropdown from "@/components/General/menuDropdown";
import { TrashModal } from "@/components/General/trashModal";
import { useDash } from "@/context/dashboardContext";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { useAgent } from "@/context/agentContext";

interface CustomerListProps {
  customers: any[];
  onBack?: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onBack }) => {
  const { loginData } = useAuthSelector();
  const pathname = usePathname();
  const addCustomerPath = `${pathname}/add-customer`;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const USE_CASE = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = USE_CASE === USE_CASES.AGENT;
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);
  const { handleDeleteCustomer, isCustomerDeleting } = isAgent
    ? useAgent()
    : useDash();

  const handleDeleteClick = (customer: any) => {
    setCustomerToDelete(customer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      handleDeleteCustomer(customerToDelete, () => {
        setIsDeleteDialogOpen(false);
        setCustomerToDelete(null);
      });
    }
  };

  return (
    <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="text-pry2 flex items-center text-sm font-medium"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
        <p className="text-lg font-medium text-[#5A5555]">Customers</p>
        <div className="w-10"></div>
      </div>

      <div className="space-y-4">
        {customers?.map((customer) => (
          <div key={customer?.id} className="flex justify-between">
            <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              {customer?.customer_logo ? (
                <img
                  src={customer.customer_logo}
                  className="w-10 h-10 rounded-full"
                  alt="customer logo"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                  {getInitials(customer?.customer_name)}
                </div>
              )}
              <div className="text-[#787486]">
                <p className="font-medium">{customer?.customer_name}</p>
                <p className="text-sm">{customer?.country}</p>
              </div>
            </div>
            <MenuDropdown
              onDelete={() => handleDeleteClick(customer)}
              isDeleting={
                isCustomerDeleting && customerToDelete?.id === customer?.id
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href={addCustomerPath}>
          <Button className="bg-blue_pry w-full normal-case mt-4">
            <Typography className="text-white font-normal">
              Add New Customer
            </Typography>
          </Button>
        </Link>
      </div>

      <TrashModal
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCustomerToDelete(null);
        }}
        header="Delete Customer"
        title={`Are you sure you want to delete ${customerToDelete?.customer_name}? You can't undo this action.`}
        returnText="Cancel"
        proceedText="Delete"
        warning={true}
        loading={isCustomerDeleting}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default CustomerList;
