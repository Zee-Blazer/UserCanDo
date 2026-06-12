import { BinIcon } from "@/assets/svg";
import { FormInput, FormSelect } from "@/components/General/form";
import TanTable from "@/components/General/TanTable";
import { Button, Typography } from "@material-tailwind/react";
import { Pen, Plus } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";
import AddSalesItemModal from "../sales/modals/addSalesItemModal";
import { initialOrderState } from "@/utils/initialStates";
import AddDiscountModal from "../sales/modals/addDiscountModal";
import { useDash } from "@/context/dashboardContext";
import { usePageData } from "@/api/hooks/usePageData";

const AddOrdersForm = ({
  isEdit,
  initialData,
  onClose,
}: {
  isEdit?: boolean;
  initialData?: CreateOrderProps;
  onClose: () => void;
}) => {
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [isSalesItemDialogOpen, setIsSalesItemDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  const [saleInputs, setSaleInputs] =
    useState<CreateOrderProps>(initialOrderState);
  const { customers, salesAgents, products } = useDashboardSelector();
  const { saleTypes, paymentModes } = useAuthSelector();
  const { isSaleTypesLoading, isPaymentModesLoading } = useAppContext();
  const {
    loadCustomersData,
    loadSalesAgentsData,
    loadProductsData,
    isOrderCreating,
    handleCreateOrder,
    handleUpdateOrder,
    isOrderEditing,
  } = useDash();

  usePageData([loadCustomersData, loadSalesAgentsData, loadProductsData]);

  const handleSaleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange =
    (
      name: string,
      options: {
        id: string;
        customer_name?: string;
        name?: string;
        value?: string;
      }[]
    ) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find(
        (option) =>
          option.customer_name === e.target.value ||
          option.name === e.target.value ||
          option.value === e.target.value
      );

      setSaleInputs((prevState) => ({
        ...prevState,
        [name]: selectedOption?.id || e.target.value,
      }));
    };

  const handleAddProduct = (newProduct: ProductProps) => {
    setSaleInputs((prevState) => ({
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
    setIsSalesItemDialogOpen(false);
  };

  const handleApplyDiscount = (discount: {
    discount_type: string;
    discount_value: number;
  }) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      ...discount,
    }));
  };

  const handleEditProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsSalesItemDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      products: prevState.products.filter(
        (product) => product.product_id !== id
      ),
    }));
  };

  const formattedProducts = saleInputs.products.map((item) => {
    const productDetails = products.find((p) => p.id === item.product_id);
    return {
      ...item,
      product_name: productDetails ? productDetails.product_name : "Unknown",
    };
  });

  useEffect(() => {
    if (isEdit && initialData) {
      const requiredFields = {
        id: initialData.id,
        customer_entity_id: initialData.customer_entity_id || "",
        customer_entity_type: initialData.customer_entity_type || "",
        sales_agent_id: initialData.sales_agent_id || "",
        sale_type: initialData.sale_type || "",
        payment_mode: initialData.payment_mode || "",
        due_date: initialData.due_date || "",
        delivery_location: initialData.delivery_location || "",
        discount_type: initialData.discount_type || "",
        discount_value: initialData.discount_value || 0,
        products: initialData.products || [],
      };

      setSaleInputs((prevState) => ({
        ...prevState,
        ...requiredFields,
      }));
    }
  }, [initialData, isEdit]);

  const columns = [
    { header: "Product", accessorKey: "product_name" },
    { header: "Quantity", accessorKey: "quantity" },
    { header: "Unit Price", accessorKey: "unit_price" },
    { header: "Total Price", accessorKey: "total_price" },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <div className="cursor-pointer">
            <Pen
              color="#6F6F6F"
              size={18}
              onClick={() => handleEditProduct(row.original)}
            />
          </div>
          <div
            onClick={() => handleDeleteProduct(row.original.product_id)}
            className="cursor-pointer"
          >
            <BinIcon color="#667085" />
          </div>
        </div>
      ),
    },
  ];

  const prepareOrderPayload = (): CreateOrderProps => {
    return {
      id: saleInputs.id,
      customer_entity_type: saleInputs.customer_entity_type,
      customer_entity_id: saleInputs.customer_entity_id,
      sales_agent_id: saleInputs.sales_agent_id,
      sale_type: saleInputs.sale_type,
      due_date: saleInputs.due_date,
      payment_mode: saleInputs.payment_mode,
      delivery_location: saleInputs.delivery_location,
      discount_type: saleInputs.discount_type,
      discount_value: saleInputs.discount_value,
      products: saleInputs.products.map((product) => ({
        product_id: product.product_id,
        quantity: product.quantity,
        unit_price: product.unit_price,
        total_price: product.total_price,
      })),
    };
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const payload = prepareOrderPayload();

        if (isEdit) {
          handleUpdateOrder(payload, () => {
            onClose();
          });
        } else {
          handleCreateOrder(payload, () => {
            onClose();
            setSaleInputs(initialOrderState);
          });
        }
      }}
      className="w-full"
    >
      <div className="grid mb-8 md:grid-cols-[auto_1fr] grid-cols-1 gap-y-7 gap-x-5 items-center">
        <label className="text-sm font-normal text-[#101828]">Order Type</label>
        <div>
          {saleTypes?.length < 1 ? (
            <FormInput
              placeholder={
                isSaleTypesLoading ? "Loading..." : "Enter Sale Type"
              }
              name="sale_type"
              value={saleInputs.sale_type}
              readOnly={isSaleTypesLoading}
              required
              className="rounded-none w-full"
              paddingY="2"
              onChange={handleSaleInputChange}
            />
          ) : (
            <FormSelect
              placeholder={
                isSaleTypesLoading ? "Loading..." : "Select Sale Type"
              }
              options={saleTypes?.map((saleType) => saleType?.value) || []}
              name="sale_type"
              value={saleInputs.sale_type}
              readOnly={isSaleTypesLoading}
              required
              className="rounded-none w-full"
              paddingY="2"
              onChange={handleSaleInputChange}
            />
          )}
        </div>
        <label className="text-sm font-normal text-[#101828]">Customer</label>
        <FormSelect
          placeholder="Select Customer"
          options={
            customers?.map((customer) => customer?.customer_name || "") || []
          }
          value={
            customers?.find(
              (customer) =>
                customer?.customer_entity_id ===
                  saleInputs?.customer_entity_id &&
                customer?.customer_entity_type ===
                  saleInputs?.customer_entity_type
            )?.customer_name || ""
          }
          name="customer"
          readOnly={!customers?.length}
          required
          className="rounded-none w-full"
          paddingY="2"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const selectedCustomer = customers?.find(
              (customer) => customer?.customer_name === e.target.value
            );

            setSaleInputs((prevState) => ({
              ...prevState,
              customer_entity_id: selectedCustomer?.customer_entity_id || "",
              customer_entity_type:
                selectedCustomer?.customer_entity_type || "",
            }));
          }}
        />
        <label className="text-sm font-normal text-[#101828]">
          Sales Agent
        </label>
        <FormSelect
          options={salesAgents?.map((agent) => agent.name) || []}
          placeholder="Select Sales Agent"
          className="rounded-none w-full ga"
          paddingY="2"
          value={
            salesAgents?.find(
              (agent) => agent?.id === saleInputs?.sales_agent_id
            )?.name || saleInputs.sales_agent_id
          }
          readOnly={!salesAgents?.length}
          onChange={handleSelectChange("sales_agent_id", salesAgents || [])}
        />
        <label className="text-sm font-normal text-[#101828]">
          Payment Mode
        </label>
        <div>
          {paymentModes?.length < 1 ? (
            <FormInput
              placeholder={
                isPaymentModesLoading ? "Loading..." : "Enter Payment Mode"
              }
              name="payment_mode"
              value={saleInputs.payment_mode}
              readOnly={isPaymentModesLoading}
              required
              className="rounded-none w-full"
              paddingY="2"
              onChange={handleSaleInputChange}
            />
          ) : (
            <FormSelect
              placeholder={
                isPaymentModesLoading ? "Loading..." : "Select Payment Mode"
              }
              options={
                paymentModes?.map((paymentMode) => paymentMode.value) || []
              }
              name="payment_mode"
              value={saleInputs.payment_mode}
              readOnly={isPaymentModesLoading}
              required
              className="rounded-none w-full"
              paddingY="2"
              onChange={handleSaleInputChange}
            />
          )}
        </div>
        <label className="text-sm font-normal text-[#101828]">Due Date</label>
        <FormInput
          type="date"
          className="rounded-none text-gray_4 bg-inherit"
          name="due_date"
          value={saleInputs.due_date}
          required
          onChange={handleSaleInputChange}
          paddingY="2"
        />
        <label className="text-sm font-normal text-[#101828]">
          Delivery Location
        </label>
        <FormInput
          type="text"
          placeholder="e.g Accra"
          name="delivery_location"
          value={saleInputs.delivery_location}
          required
          className="rounded-none bg-inherit"
          onChange={handleSaleInputChange}
          paddingY="2"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <Typography className="font-normal">Products</Typography>
        <div className="flex gap-5">
          <Button
            onClick={() => setIsDiscountDialogOpen(true)}
            className="px-5 flex items-center normal-case shadow-none border-[#D0D5DD66] border gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#F8FAFB] text-pry2 hover:opacity-90"
          >
            <Plus />
            Add Discount
          </Button>
          <Button
            onClick={() => setIsSalesItemDialogOpen(true)}
            className="px-5 flex items-center normal-case gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#003366] text-white hover:opacity-90"
          >
            <Plus />
            Add Product
          </Button>
        </div>
      </div>
      <div className="mt-7">
        <TanTable columnData={columns} data={formattedProducts} length={5} />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="mt-6 normal-case bg-pry2 text-sm font-normal"
          loading={isOrderCreating || isOrderEditing}
        >
          {isEdit ? "Save changes" : "Add Sale"}
        </Button>
      </div>
      <AddDiscountModal
        isOpen={isDiscountDialogOpen}
        onClose={() => setIsDiscountDialogOpen(false)}
        onApplyDiscount={handleApplyDiscount}
        discountType={saleInputs.discount_type}
        discountValue={saleInputs.discount_value}
      />
      <AddSalesItemModal
        isOpen={isSalesItemDialogOpen}
        onClose={() => setIsSalesItemDialogOpen(false)}
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
      />
    </form>
  );
};

export default AddOrdersForm;
