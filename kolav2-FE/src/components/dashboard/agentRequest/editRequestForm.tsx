import { BinIcon } from "@/assets/svg";
import { FormInput, FormSelect } from "@/components/General/form";
import TanTable from "@/components/General/TanTable";
import { agentProductRequest } from "@/utils/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { Pen, Plus } from "lucide-react";
import React from "react";

interface EditRequestFormProps {
  onOpenModal: () => void;
}

const EditRequestForm = ({ onOpenModal }: EditRequestFormProps) => {
  const columns = [
    {
      header: "Product",
      accessorKey: "product",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Price",
      accessorKey: "unitPrice",
    },
    {
      header: "Total Price",
      accessorKey: "totalPrice",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <BinIcon color="#667085" />
          <Pen color="#6F6F6F" size={18} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="grid mb-6 md:grid-cols-[auto_1fr] grid-cols-1 gap-y-7 gap-x-5 items-center">
        <label className="text-sm font-medium text-[#101828]">
          Sales Agent {""}*
        </label>
        <FormSelect
          options={["Racy Ventures"]}
          placeholder="e.g Kola Market Place"
          className="rounded-none w-full ga"
          paddingY="2"
        />
        <label className="text-sm font-medium text-[#101828]">
          Delivery Location {""} *
        </label>
        <FormInput
          placeholder="Accra"
          className="rounded-none bg-inherit"
          paddingY="2"
        />
        <label className="text-sm font-medium text-[#101828]">
          Request Date
        </label>
        <FormInput
          type="date"
          className="w-full rounded-none bg-inherit"
          paddingY="2"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography className="font-normal">Products</Typography>
        <Button
          onClick={onOpenModal}
          className="px-5 flex items-center normal-case gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#003366] text-white hover:opacity-90"
        >
          <Plus />
          Add Product
        </Button>
      </div>
      <div className="mt-6">
        <TanTable columnData={columns} data={agentProductRequest} length={5} />
      </div>
    </div>
  );
};

export default EditRequestForm;
