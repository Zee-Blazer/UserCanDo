import { BinIcon } from "@/assets/svg";
import { FormInput, FormSelect } from "@/components/General/form";
import TanTable from "@/components/General/TanTable";
import { Button, Typography } from "@material-tailwind/react";
import { Pen, Plus } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { initialAgentRequestState } from "@/utils/initialStates";
import AddAgentRequestItemModal from "./modals/addAgentRequestItemModal";
import { usePageData } from "@/api/hooks/usePageData";

interface AddAgentRequestFormProps {
  isEdit?: boolean;
  initialData?: CreateAgentRequestProps;
  onClose: () => void;
}

const AddAgentRequestForm = ({
  isEdit,
  initialData,
  onClose,
}: AddAgentRequestFormProps) => {
  const [isAgentRequestItemDialogOpen, setIsAgentRequestItemDialogOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  const handleOpenAgentRequestItemDialog = () =>
    setIsAgentRequestItemDialogOpen(true);
  const handleCloseAgentRequestItemDialog = () => {
    setSelectedProduct(null);
    setIsAgentRequestItemDialogOpen(false);
  };

  const { salesAgents, products } = useDashboardSelector();
  const {
    loadSalesAgentsData,
    loadProductsData,
    isAgentRequestCreating,
    handleCreateAgentRequest,
    handleUpdateAgentRequest,
    isAgentRequestEditing,
  } = useDash();

  usePageData([loadSalesAgentsData, loadProductsData]);

  const [agentRequestInputs, setAgentRequestInputs] =
    useState<CreateAgentRequestProps>(initialAgentRequestState);

  const handleAgentRequestInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgentRequestInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange =
    (name: string, options: { id: string; name?: string }[]) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find(
        (option) => option.name === e.target.value
      );

      setAgentRequestInputs((prevState) => ({
        ...prevState,
        [name]: selectedOption?.id || "",
      }));
    };

  const handleAddProduct = (newProduct: ProductProps) => {
    setAgentRequestInputs((prevState) => ({
      ...prevState,
      products: prevState.products.some(
        (p) => p.product_id === newProduct.product_id
      )
        ? prevState.products.map((p) =>
            p.product_id === newProduct.product_id ? newProduct : p
          )
        : [...prevState.products, newProduct],
    }));

    setSelectedProduct(null);
    setIsAgentRequestItemDialogOpen(false);
  };

  const handleEditProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsAgentRequestItemDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setAgentRequestInputs((prevState) => ({
      ...prevState,
      products: prevState?.products?.filter(
        (product) => product.product_id !== id
      ),
    }));
  };

  const formattedProducts = agentRequestInputs.products.map((item) => {
    const productDetails = products.find((p) => p.id === item.product_id);
    return {
      ...item,
      product_name: productDetails ? productDetails.product_name : "Unknown",
    };
  });

  const columns = [
    {
      header: "Product",
      accessorKey: "product_name",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Price",
      accessorKey: "unit_price",
    },
    {
      header: "Total Price",
      accessorKey: "total_price",
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <div
            onClick={() => handleDeleteProduct(row.original.product_id)}
            className="cursor-pointer"
          >
            <BinIcon color="#667085" />
          </div>
          <div className="cursor-pointer">
            <Pen
              color="#6F6F6F"
              size={18}
              onClick={() => handleEditProduct(row.original)}
            />
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isEdit && initialData) {
      setAgentRequestInputs(initialData);
    }
  }, [initialData]);

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEdit) {
            handleUpdateAgentRequest(agentRequestInputs, () => {
              onClose();
            });
          } else {
            handleCreateAgentRequest(agentRequestInputs, () => {
              onClose();
            });
          }
        }}
      >
        <div className="grid mb-8 md:grid-cols-[auto_1fr] grid-cols-1 gap-y-7 gap-x-5 items-center">
          <label className="text-sm font-normal text-[#101828]">
            Sales Agent {""} *
          </label>
          <FormSelect
            placeholder="Select Sales Agent"
            options={salesAgents?.map((agent) => agent?.name) || []}
            value={
              salesAgents?.find(
                (agent) => agent?.id === agentRequestInputs?.sales_agent_id
              )?.name || ""
            }
            name="sales_agent_id"
            readOnly={!salesAgents?.length}
            required
            className="rounded-none w-full"
            paddingY="2"
            onChange={handleSelectChange("sales_agent_id", salesAgents || [])}
          />
          <label className="text-sm font-normal text-[#101828]">
            Delivery Location {""} *
          </label>
          <FormInput
            type="text"
            placeholder="e.g Accra"
            name="location"
            value={agentRequestInputs.location}
            required
            className="rounded-none bg-inherit"
            onChange={handleAgentRequestInputChange}
            paddingY="2"
          />
          <label className="text-sm font-normal text-[#101828]">
            Request Date
          </label>
          <FormInput
            type="date"
            className="rounded-none text-gray_4 bg-inherit"
            name="request_date"
            value={agentRequestInputs.request_date}
            required={!isEdit}
            onChange={handleAgentRequestInputChange}
            paddingY="2"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <Typography className="font-normal">Products</Typography>
          <Button
            onClick={handleOpenAgentRequestItemDialog}
            className="px-5 flex items-center normal-case gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#003366] text-white hover:opacity-90"
          >
            <Plus />
            Add Product
          </Button>
        </div>
        <div className="mt-7">
          <TanTable columnData={columns} data={formattedProducts} length={5} />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="mt-6 normal-case bg-pry2 text-sm font-normal"
            loading={isAgentRequestCreating || isAgentRequestEditing}
          >
            {isEdit ? "Save changes" : "Create Agent Request"}
          </Button>
        </div>
      </form>
      <AddAgentRequestItemModal
        isOpen={isAgentRequestItemDialogOpen}
        onClose={handleCloseAgentRequestItemDialog}
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default AddAgentRequestForm;
