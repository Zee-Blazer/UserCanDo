import { BinIcon, InvoiceIcon, Pencil } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Button, Typography } from "@material-tailwind/react";
import { Pen, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddAgentRequestItemModal from "./modals/addAgentRequestItemModal";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

interface DetailsProps {
  agentRequestData: AgentRequestProps;
  onClose: () => void;
}

const Details = ({ agentRequestData, onClose }: DetailsProps) => {
  const [isAgentRequestItemDialogOpen, setIsAgentRequestItemDialogOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );
  const [agentRequestInputs, setAgentRequestInputs] =
    useState<CreateAgentRequestProps>(agentRequestData);

  const { products } = useDashboardSelector();

  const { loadProductsData, handleUpdateAgentRequest, isAgentRequestEditing } =
    useDash();

  const formattedProducts = agentRequestInputs.products?.map((item) => {
    const productDetails = products.find((p) => p.id === item.product_id);
    return {
      ...item,
      product_name: productDetails ? productDetails.product_name : "Unknown",
    };
  });

  useEffect(() => {
    loadProductsData();
  }, [loadProductsData]);

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

  const handleCloseAgentRequestItemDialog = () => {
    setSelectedProduct(null);
    setIsAgentRequestItemDialogOpen(false);
  };

  const handleAddProduct = (newProduct: ProductProps) => {
    setAgentRequestInputs((prevState) => ({
      ...prevState,
      products: prevState.products?.some(
        (p) => p.product_id === newProduct.product_id
      )
        ? prevState.products?.map((p) =>
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
  return (
    <main>
      <section className="flex gap-2 mb-[4em] justify-between">
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Sale Agent Name
          </Typography>
          <Typography variant="h5" className="font-medium">
            {agentRequestData?.sales_agent_name || "N/A"}
          </Typography>
        </div>
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Number of Products
          </Typography>
          <Typography variant="h5" className="font-medium">
            {agentRequestData?.products?.length || 0}
          </Typography>
        </div>
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Delivery Location
          </Typography>
          <Typography variant="h5" className="font-medium">
            {agentRequestData?.location || "N/A"}
          </Typography>
        </div>
      </section>

      <section className="w-full">
        <div className="bg-[#F8F9FA] -mx-12 p-6">
          <div className="flex w-full justify-between">
            <div className="flex-1">
              <Typography className="font-normal text-gray_4 mb-2">
                Estimated Delivery Date
              </Typography>
              <Typography variant="h5" className="font-medium">
                N/A
              </Typography>
            </div>
            <div className="flex-1">
              <Typography className="font-normal text-gray_4 mb-2">
                Actual Delivery Date
              </Typography>
              <Typography variant="h5" className="font-medium">
                N/A
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateAgentRequest(agentRequestInputs, () => {
            onClose();
          });
        }}
      >
        <section className="py-10">
          <TanTable columnData={columns} data={formattedProducts} length={5} />
        </section>
        <section className="flex justify-between">
          <Link
            href={`${ROUTES.agentRequestInvoice}?agentRequestId=${agentRequestData?.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="inline-flex items-center justify-center whitespace-nowrap normal-case gap-2 text-pry2 bg-[#F8FAFB] font-medium shadow-none hover:shadow-none">
              <InvoiceIcon />
              <span>View Invoice</span>
            </Button>
          </Link>

          <div className="flex gap-3">
            <Button
              type="submit"
              loading={isAgentRequestEditing}
              className="bg-[#003366] items-center px-2 text-white hover:opacity-90 flex gap-2 capitalize"
            >
              <Pencil />
              Save Changes
            </Button>
            <Button
              className="bg-[#F8FAFB] flex gap-2 py-2 items-center border-2 border-[#D0D5DD66] shadow-none text-[#344054] hover:bg-gray-100 capitalize"
              onClick={onClose}
            >
              <X />
              Close
            </Button>
          </div>
        </section>
      </form>
      <AddAgentRequestItemModal
        isOpen={isAgentRequestItemDialogOpen}
        onClose={handleCloseAgentRequestItemDialog}
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
      />
    </main>
  );
};

export default Details;
