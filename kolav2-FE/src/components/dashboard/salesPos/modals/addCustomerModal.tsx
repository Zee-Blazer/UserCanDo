import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Search, X } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormInput } from "@/components/General/form";
import { useDashboardSelector } from "@/Redux/selectors";
import { AddCustomer } from "@/assets/svg";
import { useDash } from "@/context/dashboardContext";

interface AddCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
  onSelectCustomer: (customer: CreateCustomerProps) => void;
}

const AddCustomerModal = ({
  open,
  onClose,
  onClick,
  onSelectCustomer,
}: AddCustomerModalProps) => {
  const { loadCustomersData } = useDash();
  const { customers } = useDashboardSelector();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCustomersData();
  }, [loadCustomersData]);

  const filteredCustomer =
    customers?.filter((customer) =>
      customer?.customer_name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Dialog open={open} handler={onClose} size="md" className="p-3">
      <DialogHeader className="relative m-0 justify-between items-center flex">
        <div className="flex items-center">
          <IconButton variant="text" onClick={onClose}>
            <X className="h-5 w-5 stroke-2" />
          </IconButton>
          <Typography className="text-xl font-medium text-black">
            Add Customer
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Button
            onClick={onClick}
            className="inline-flex items-center justify-center normal-case gap-2 text-white bg-pry2 font-normal shadow-none hover:shadow-none py-2"
          >
            <AddCustomer />
            <span className="truncate">Add Customer</span>
          </Button>
        </div>
      </DialogHeader>
      <DialogBody>
        <div>
          <FormInput
            placeholder="Search customer here"
            icon={<Search />}
            iconPosition="left"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {filteredCustomer?.map((business, index) => {
            const [a, b] = (business?.customer_name ?? "").split(" ");
            const firstChar = a?.charAt(0).toUpperCase() || "";
            const secondChar = b?.charAt(0).toUpperCase() || "";

            return (
              <Button
                key={index}
                className="flex items-center gap-4 bg-[#F9FAFB] shadow-none p-2 hover:bg-gray_2 normal-case"
                variant="text"
                onClick={() => {
                  onSelectCustomer(business);
                  onClose();
                }}
              >
                <div className="w-10 h-10 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center">
                  {firstChar}
                  {secondChar}
                </div>
                <Typography className="text-pry_1 font-medium">
                  {business?.customer_name}
                </Typography>
              </Button>
            );
          })}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddCustomerModal;
