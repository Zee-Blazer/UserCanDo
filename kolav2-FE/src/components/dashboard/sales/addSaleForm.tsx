// import { BinIcon } from "@/assets/svg";
// import { FormInput, FormSelect } from "@/components/General/form";
// import TanTable from "@/components/General/TanTable";
// import { Button, Typography } from "@material-tailwind/react";
// import { Pen, Plus } from "lucide-react";
// import React, { ChangeEvent, useEffect, useState } from "react";
// import AddDiscountModal from "./modals/addDiscountModal";
// import AddSalesItemModal from "./modals/addSalesItemModal";
// import { useAppContext } from "@/app/appContext";
// import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
// import { initialSaleState } from "@/utils/initialStates";
// import { useDash } from "@/context/dashboardContext";
// import { usePageData } from "@/api/hooks/usePageData";

// const AddSaleForm = ({
//   isEdit,
//   initialData,
//   onClose,
// }: {
//   isEdit?: boolean;
//   initialData?: CreateSaleProps;
//   onClose: () => void;
// }) => {
//   const [isSalesItemDialogOpen, setIsSalesItemDialogOpen] = useState(false);
//   const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
//     null
//   );

//   const handleOpenSalesItemDialog = () => setIsSalesItemDialogOpen(true);
//   const handleCloseSalesItemDialog = () => {
//     setSelectedProduct(null);
//     setIsSalesItemDialogOpen(false);
//   };

//   const handleOpenDiscountDialog = () => setIsDiscountDialogOpen(true);
//   const handleCloseDiscountDialog = () => setIsDiscountDialogOpen(false);

//   const { customers, salesAgents, products } = useDashboardSelector();
//   const { saleTypes, paymentModes } = useAuthSelector();
//   const { isSaleTypesLoading, isPaymentModesLoading } = useAppContext();

//   const {
//     loadCustomersData,
//     loadSalesAgentsData,
//     loadProductsData,
//     isSaleCreating,
//     handleCreateSale,
//     handleUpdateSale,
//     isSaleEditing,
//   } = useDash();

//   usePageData([loadSalesAgentsData, loadCustomersData, loadProductsData]);

//   const [saleInputs, setSaleInputs] =
//     useState<CreateSaleProps>(initialSaleState);

//   const handleSaleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSaleInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleApplyDiscount: any = (discount: {
//     discount_type: string;
//     discount_value: number;
//   }) => {
//     setSaleInputs((prevState) => ({
//       ...prevState,
//       ...discount,
//     }));
//   };

//   const handleAddProduct = (newProduct: ProductProps) => {
//     setSaleInputs((prevState) => ({
//       ...prevState,
//       products: prevState.products.some(
//         (p) => p.product_id === newProduct.product_id
//       )
//         ? prevState.products.map((p) =>
//             p.product_id === newProduct.product_id ? newProduct : p
//           )
//         : [...prevState.products, newProduct],
//     }));

//     setSelectedProduct(null);
//     setIsSalesItemDialogOpen(false);
//   };

//   const handleEditProduct = (product: ProductProps) => {
//     setSelectedProduct(product);
//     setIsSalesItemDialogOpen(true);
//   };

//   const handleDeleteProduct = (id: string) => {
//     setSaleInputs((prevState) => ({
//       ...prevState,
//       products: prevState?.products?.filter(
//         (product) => product.product_id !== id
//       ),
//     }));
//   };

//   const formattedProducts = saleInputs.products.map((item) => {
//     const productDetails = products.find((p) => p.id === item.product_id);
//     return {
//       ...item,
//       product_name: productDetails ? productDetails.product_name : "Unknown",
//     };
//   });

//   const columns = [
//     {
//       header: "Product",
//       accessorKey: "product_name",
//     },
//     {
//       header: "Quantity",
//       accessorKey: "quantity",
//     },
//     {
//       header: "Unit Price",
//       accessorKey: "unit_price",
//     },
//     {
//       header: "Total Price",
//       accessorKey: "total_price",
//     },
//     {
//       header: "Action",
//       accessorKey: "action",
//       cell: ({ row }: any) => (
//         <div className="flex items-center gap-2">
//           <div
//             onClick={() => handleDeleteProduct(row.original.product_id)}
//             className="cursor-pointer"
//           >
//             <BinIcon color="#667085" />
//           </div>
//           <div className="cursor-pointer">
//             <Pen
//               color="#6F6F6F"
//               size={18}
//               onClick={() => handleEditProduct(row.original)}
//             />
//           </div>
//         </div>
//       ),
//     },
//   ];

//   useEffect(() => {
//     if (isEdit && initialData) {
//       setSaleInputs(initialData);
//     }
//   }, [initialData]);

//   return (
//     <div className="w-full">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           if (isEdit) {
//             handleUpdateSale(saleInputs, () => {
//               onClose();
//             });
//           } else {
//             handleCreateSale(saleInputs, () => {
//               onClose();
//             });
//           }
//         }}
//       >
//         <div className="grid mb-8 md:grid-cols-[auto_1fr] grid-cols-1 gap-y-7 gap-x-5 items-center">
//           <label className="text-sm font-normal text-[#101828]">Customer</label>
//           <FormSelect
//             placeholder="Select Customer"
//             options={
//               customers?.map((customer) => customer?.customer_name || "") || []
//             }
//             value={
//               customers?.find(
//                 (customer) =>
//                   customer?.customer_entity_id ===
//                     saleInputs?.customer_entity_id &&
//                   customer?.customer_entity_type ===
//                     saleInputs?.customer_entity_type
//               )?.customer_name || ""
//             }
//             name="customer"
//             readOnly={!customers?.length}
//             required
//             className="rounded-none w-full"
//             paddingY="2"
//             onChange={(e: ChangeEvent<HTMLSelectElement>) => {
//               const selectedCustomer = customers?.find(
//                 (customer) => customer?.customer_name === e.target.value
//               );

//               setSaleInputs((prevState) => ({
//                 ...prevState,
//                 customer_entity_id: selectedCustomer?.customer_entity_id || "",
//                 customer_entity_type:
//                   selectedCustomer?.customer_entity_type || "",
//               }));
//             }}
//           />
//           <label className="text-sm font-normal text-[#101828]">
//             Sales Date
//           </label>
//           <FormInput
//             type="date"
//             className="rounded-none text-gray_4 bg-inherit"
//             name="sale_date"
//             value={saleInputs.sale_date}
//             required
//             onChange={handleSaleInputChange}
//             paddingY="2"
//           />
//           <label className="text-sm font-normal text-[#101828]">
//             Sales Agent
//           </label>
//           <FormSelect
//             placeholder="Select Sales Agent"
//             options={salesAgents?.map((agent) => agent.name) || []}
//             value={
//               salesAgents?.find(
//                 (agent) => agent?.id === saleInputs?.sales_agent_id
//               )?.name || ""
//             }
//             name="sales_agent_id"
//             readOnly={!salesAgents?.length}
//             required
//             className="rounded-none w-full"
//             paddingY="2"
//             onChange={(e: ChangeEvent<HTMLSelectElement>) => {
//               const selectedAgent = salesAgents?.find(
//                 (agent) => agent.name === e.target.value
//               );

//               setSaleInputs((prevState) => ({
//                 ...prevState,
//                 sales_agent_id: selectedAgent?.id || "",
//               }));
//             }}
//           />
//           <label className="text-sm font-normal text-[#101828]">
//             Sales Type
//           </label>
//           <div>
//             {saleTypes?.length < 1 ? (
//               <FormInput
//                 placeholder={
//                   isSaleTypesLoading ? "Loading..." : "Enter Sale Type"
//                 }
//                 value={saleInputs.sale_type}
//                 name="sale_type"
//                 readOnly={isSaleTypesLoading}
//                 required
//                 className="rounded-none w-full"
//                 paddingY="2"
//                 onChange={handleSaleInputChange}
//               />
//             ) : (
//               <FormSelect
//                 placeholder={
//                   isSaleTypesLoading ? "Loading..." : "Select Sale Type"
//                 }
//                 options={saleTypes?.map((saleType) => saleType?.value) || []}
//                 value={saleInputs.sale_type}
//                 name="sale_type"
//                 readOnly={isSaleTypesLoading}
//                 required
//                 className="rounded-none w-full"
//                 paddingY="2"
//                 onChange={handleSaleInputChange}
//               />
//             )}
//           </div>
//           <label className="text-sm font-normal text-[#101828]">Due Date</label>
//           <FormInput
//             type="date"
//             className="rounded-none text-gray_4 bg-inherit"
//             name="due_date"
//             value={saleInputs.due_date}
//             required
//             onChange={handleSaleInputChange}
//             paddingY="2"
//           />
//           <label className="text-sm font-normal text-[#101828]">
//             Payment Mode
//           </label>
//           <div>
//             {paymentModes?.length < 1 ? (
//               <FormInput
//                 placeholder={
//                   isPaymentModesLoading ? "Loading..." : "Enter Payment Mode"
//                 }
//                 value={saleInputs?.payment_mode}
//                 name="payment_mode"
//                 readOnly={isPaymentModesLoading}
//                 required
//                 className="rounded-none w-full"
//                 paddingY="2"
//                 onChange={handleSaleInputChange}
//               />
//             ) : (
//               <FormSelect
//                 placeholder={
//                   isPaymentModesLoading ? "Loading..." : "Select Payment Mode"
//                 }
//                 options={
//                   paymentModes?.map((paymentMode) => paymentMode.value) || []
//                 }
//                 value={saleInputs.payment_mode}
//                 name="payment_mode"
//                 readOnly={isPaymentModesLoading}
//                 required
//                 className="rounded-none w-full"
//                 paddingY="2"
//                 onChange={handleSaleInputChange}
//               />
//             )}
//           </div>
//           <label className="text-sm font-normal text-[#101828]">
//             Delivery Location
//           </label>
//           <FormInput
//             type="text"
//             placeholder="e.g Accra"
//             name="delivery_location"
//             value={saleInputs.delivery_location}
//             required
//             className="rounded-none bg-inherit"
//             onChange={handleSaleInputChange}
//             paddingY="2"
//           />
//         </div>
//         <div className="flex justify-between items-center w-full">
//           <Typography className="font-normal">Products</Typography>
//           <div className="flex gap-5">
//             <Button
//               onClick={handleOpenSalesItemDialog}
//               className="px-5 flex items-center normal-case gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#003366] text-white hover:opacity-90"
//             >
//               <Plus />
//               Add Product
//             </Button>
//             <Button
//               onClick={handleOpenDiscountDialog}
//               className="px-5 flex items-center normal-case shadow-none border-[#D0D5DD66] border gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#F8FAFB] text-pry2 hover:opacity-90"
//             >
//               <Plus />
//               Add Discount
//             </Button>
//           </div>
//         </div>
//         <div className="mt-7">
//           <TanTable columnData={columns} data={formattedProducts} length={5} />
//         </div>
//         <div className="flex justify-end">
//           <Button
//             type="submit"
//             className="mt-6 normal-case bg-pry2 text-sm font-normal"
//             loading={isSaleCreating || isSaleEditing}
//           >
//             {isEdit ? "Save changes" : "Create Sale"}
//           </Button>
//         </div>
//       </form>
//       <AddSalesItemModal
//         isOpen={isSalesItemDialogOpen}
//         onClose={handleCloseSalesItemDialog}
//         onAddProduct={handleAddProduct}
//         selectedProduct={selectedProduct}
//       />
//       <AddDiscountModal
//         isOpen={isDiscountDialogOpen}
//         onClose={handleCloseDiscountDialog}
//         onApplyDiscount={handleApplyDiscount}
//         discountType={saleInputs.discount_type}
//         discountValue={saleInputs.discount_value}
//       />
//     </div>
//   );
// };

// export default AddSaleForm;

import { BinIcon } from "@/assets/svg";
import { FormInput, FormSelect } from "@/components/General/form";
import TanTable from "@/components/General/TanTable";
import { Button, Typography } from "@material-tailwind/react";
import { Pen, Plus } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import AddDiscountModal from "./modals/addDiscountModal";
import AddSalesItemModal from "./modals/addSalesItemModal";
import { useAppContext } from "@/app/appContext";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { initialSaleState } from "@/utils/initialStates";
import { useDash } from "@/context/dashboardContext";
import { usePageData } from "@/api/hooks/usePageData";
import {
  calculateDueDate,
  dueDateOptions,
  getDueDateOption,
} from "@/utils/helpers";

const AddSaleForm = ({
  isEdit,
  initialData,
  onClose,
}: {
  isEdit?: boolean;
  initialData?: CreateSaleProps;
  onClose: () => void;
}) => {
  const [isSalesItemDialogOpen, setIsSalesItemDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(
    null
  );

  const handleOpenSalesItemDialog = () => setIsSalesItemDialogOpen(true);
  const handleCloseSalesItemDialog = () => {
    setSelectedProduct(null);
    setIsSalesItemDialogOpen(false);
  };

  const handleOpenDiscountDialog = () => setIsDiscountDialogOpen(true);
  const handleCloseDiscountDialog = () => setIsDiscountDialogOpen(false);

  const { customers, salesAgents, products } = useDashboardSelector();
  const { saleTypes, paymentModes } = useAuthSelector();
  const { isSaleTypesLoading, isPaymentModesLoading } = useAppContext();

  const {
    loadCustomersData,
    loadSalesAgentsData,
    loadProductsData,
    isSaleCreating,
    handleCreateSale,
    handleUpdateSale,
    isSaleEditing,
  } = useDash();

  usePageData([loadSalesAgentsData, loadCustomersData, loadProductsData]);

  const [saleInputs, setSaleInputs] =
    useState<CreateSaleProps>(initialSaleState);

  const handleSaleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleApplyDiscount: any = (discount: {
    discount_type: string;
    discount_value: number;
  }) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      ...discount,
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

  const handleEditProduct = (product: ProductProps) => {
    setSelectedProduct(product);
    setIsSalesItemDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setSaleInputs((prevState) => ({
      ...prevState,
      products: prevState?.products?.filter(
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
      setSaleInputs(initialData);
    }
  }, [initialData]);

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEdit) {
            handleUpdateSale(saleInputs, () => {
              onClose();
            });
          } else {
            handleCreateSale(saleInputs, () => {
              onClose();
            });
          }
        }}
      >
        <div className="grid mb-8 md:grid-cols-[auto_1fr] grid-cols-1 gap-y-7 gap-x-5 items-center">
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
            Sales Date
          </label>
          <FormInput
            type="date"
            className="rounded-none text-gray_4 bg-inherit"
            name="sale_date"
            value={saleInputs.sale_date}
            required
            onChange={handleSaleInputChange}
            paddingY="2"
          />
          <label className="text-sm font-normal text-[#101828]">
            Sales Agent
          </label>
          <FormSelect
            placeholder="Select Sales Agent"
            options={salesAgents?.map((agent) => agent.name) || []}
            value={
              salesAgents?.find(
                (agent) => agent?.id === saleInputs?.sales_agent_id
              )?.name || ""
            }
            name="sales_agent_id"
            readOnly={!salesAgents?.length}
            required
            className="rounded-none w-full"
            paddingY="2"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const selectedAgent = salesAgents?.find(
                (agent) => agent.name === e.target.value
              );

              setSaleInputs((prevState) => ({
                ...prevState,
                sales_agent_id: selectedAgent?.id || "",
              }));
            }}
          />
          <label className="text-sm font-normal text-[#101828]">
            Sales Type
          </label>
          <div>
            {saleTypes?.length < 1 ? (
              <FormInput
                placeholder={
                  isSaleTypesLoading ? "Loading..." : "Enter Sale Type"
                }
                value={saleInputs.sale_type}
                name="sale_type"
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
                value={saleInputs.sale_type}
                name="sale_type"
                readOnly={isSaleTypesLoading}
                required
                className="rounded-none w-full"
                paddingY="2"
                onChange={handleSaleInputChange}
              />
            )}
          </div>
          <label className="text-sm font-normal text-[#101828]">Due Date</label>
          <FormSelect
            placeholder="Select Due Date"
            options={dueDateOptions}
            value={getDueDateOption(saleInputs.sale_date, saleInputs.due_date)}
            name="due_date_option"
            required
            className="rounded-none w-full"
            paddingY="2"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const selectedOption = e.target.value;
              const calculatedDueDate = calculateDueDate(
                saleInputs.sale_date,
                selectedOption
              );

              setSaleInputs((prevState) => ({
                ...prevState,
                due_date: calculatedDueDate,
              }));
            }}
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
                value={saleInputs?.payment_mode}
                name="payment_mode"
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
                value={saleInputs.payment_mode}
                name="payment_mode"
                readOnly={isPaymentModesLoading}
                required
                className="rounded-none w-full"
                paddingY="2"
                onChange={handleSaleInputChange}
              />
            )}
          </div>
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
              onClick={handleOpenSalesItemDialog}
              className="px-5 flex items-center normal-case gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#003366] text-white hover:opacity-90"
            >
              <Plus />
              Add Product
            </Button>
            <Button
              onClick={handleOpenDiscountDialog}
              className="px-5 flex items-center normal-case shadow-none border-[#D0D5DD66] border gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#F8FAFB] text-pry2 hover:opacity-90"
            >
              <Plus />
              Add Discount
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
            loading={isSaleCreating || isSaleEditing}
          >
            {isEdit ? "Save changes" : "Create Sale"}
          </Button>
        </div>
      </form>
      <AddSalesItemModal
        isOpen={isSalesItemDialogOpen}
        onClose={handleCloseSalesItemDialog}
        onAddProduct={handleAddProduct}
        selectedProduct={selectedProduct}
      />
      <AddDiscountModal
        isOpen={isDiscountDialogOpen}
        onClose={handleCloseDiscountDialog}
        onApplyDiscount={handleApplyDiscount}
        discountType={saleInputs.discount_type}
        discountValue={saleInputs.discount_value}
      />
    </div>
  );
};

export default AddSaleForm;
