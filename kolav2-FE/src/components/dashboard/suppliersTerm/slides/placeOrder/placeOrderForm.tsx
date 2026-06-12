"use client";
import { FormInput, FormSelect } from "@/components/General/form";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import add from "@/assets/images/add-square.svg";
import Image from "next/image";
import { useDashboardSelector } from "@/Redux/selectors";
import TanTable from "@/components/General/TanTable";
import { SelectSupplier } from "../../modals/selectSupplier";
import { CancelOrder } from "../../modals/cancelOrder";
import { CreditLimitAssessment } from "@/components/dashboard/credit/modals/creditLimitAssessment";
import { useDash } from "@/context/dashboardContext";
import { initialSuppliersTermPlaceOrderState } from "@/utils/initialStates";
import { X } from "lucide-react";
import { usePageData } from "@/api/hooks/usePageData";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

interface PlaceOrderFormProps {
  isEditing: boolean;
  handleBack: () => void;
  onClose: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  editData?: any;
  isEdit?: boolean;
}

const PlaceOrderForm = ({
  isEditing,
  handleBack,
  onClose,
  formData,
  setFormData,
  editData,
  isEdit,
}: PlaceOrderFormProps) => {
  const { customers, suppliers } = useDashboardSelector();
  const [selectSupplierDialogue, setSelectSuppliersDialogue] = useState(false);
  const [cancelDialogue, setCancelDialogue] = useState(false);
  const [isCreditLimitModalOpen, setIsCreditLimitModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();

  const [orderForm, setOrderForm] =
    useState<CreateSuppliersTermPlaceOrderProps>(
      initialSuppliersTermPlaceOrderState
    );

  const [customMarkup, setCustomMarkup] = useState({
    percentage: "",
    duration: "",
    penaltyRate: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalOrderValue, setTotalOrderValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    loadCustomersData,
    loadSupplierData,
    handleCreateCreditApplication,
    handleUpdateCreditApplication,
    handleCreateSuppliersTerm,
    handleUpdateSuppliersTerm,
  } = useDash();

  usePageData([loadCustomersData, loadSupplierData]);

  const markupOptions = [
    {
      label: "Pay 50% installment each week",
      value: "pay_50_percent_each_week",
    },
    {
      label: "Pay 25% installment monthly",
      value: "pay_25_percent_monthly",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ];

  const getSupplierNameById = useCallback(
    (supplierId: string) => {
      const supplier = suppliers?.find(
        (s) => s.id === supplierId || s.supplier_entity_id === supplierId
      );
      return supplier?.name || "Unknown Supplier";
    },
    [suppliers]
  );

  useEffect(() => {
    if (isEdit && editData && !isInitialized && suppliers?.length > 0) {
      const groupedEditProducts =
        editData.products?.reduce((acc: any, p: any) => {
          const supplierId = p.supplier_entity_id;
          const supplierType = p.supplier_entity_type || "business";

          if (!supplierId) {
            console.warn("Product missing supplier_entity_id:", p);
            return acc;
          }

          if (!acc[supplierId]) {
            acc[supplierId] = {
              supplier_entity_id: supplierId,
              supplier_entity_type: supplierType,
              products: [],
            };
          }

          acc[supplierId].products.push({
            product_id: p.product_id,
            quantity: p.quantity,
            price: parseFloat(p.total_price),
          });

          return acc;
        }, {}) || {};

      setOrderForm({
        customer_entity_id: editData.customer_entity_id,
        customer_entity_type: editData.customer_entity_type || "personal",
        markup_type: editData.markup_type,
        markup_percentage: parseFloat(editData.markup_percentage),
        markup_duration: editData.markup_duration_week,
        markup_penalty_rate: parseFloat(editData.markup_penalty_percentage),
        products: Object.values(groupedEditProducts),
      });

      const transformedProducts =
        editData.products?.map((p: any) => ({
          id: p.product_id,
          product_name: p.product_name || `Product ${p.product_id.slice(0, 8)}`,
          quantity: p.quantity,
          unitPrice: parseFloat(p.unit_price),
          totalOrderValue: parseFloat(p.total_price),
          supplier: getSupplierNameById(p.supplier_entity_id),
          supplier_entity_id: p.supplier_entity_id,
          supplier_entity_type: p.supplier_entity_type,
        })) || [];

      setSelectedProducts(transformedProducts);

      if (editData.markup_type === "custom") {
        setCustomMarkup({
          percentage: editData.markup_percentage,
          duration: editData.markup_duration_week.toString(),
          penaltyRate: editData.markup_penalty_percentage,
        });
      }
      setIsInitialized(true);
    }
  }, [isEdit, editData, isInitialized, suppliers, getSupplierNameById]);

  const resetForm = useCallback(() => {
    setOrderForm(initialSuppliersTermPlaceOrderState);
    setSelectedProducts([]);
    setCustomMarkup({ percentage: "", duration: "", penaltyRate: "" });
    setIsInitialized(false);
    setTotalOrderValue(0);
  }, []);

  const handleFormClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const total = selectedProducts?.reduce(
        (sum: number, product: any) =>
          sum + (Number(product?.totalOrderValue) || 0),
        0
      );
      setTotalOrderValue(total);
    } else {
      setTotalOrderValue(0);
    }
  }, [selectedProducts]);

  useEffect(() => {
    if (!isEdit || isInitialized) {
      if (orderForm.markup_type === "custom") {
        setOrderForm((prev) => ({
          ...prev,
          markup_percentage: parseFloat(customMarkup.percentage) || 0,
          markup_duration: parseInt(customMarkup.duration) || 0,
          markup_penalty_rate: parseFloat(customMarkup.penaltyRate) || 0,
        }));
      } else {
        const markupConfig = getMarkupConfig(orderForm.markup_type);
        setOrderForm((prev) => ({
          ...prev,
          ...markupConfig,
        }));
      }
    }
  }, [customMarkup, orderForm.markup_type, isEdit, isInitialized]);

  const getMarkupConfig = (markupType: string) => {
    switch (markupType) {
      case "pay_50_percent_each_week":
        return {
          markup_percentage: 2.5,
          markup_duration: 1,
          markup_penalty_rate: 0.5,
        };
      case "pay_25_percent_monthly":
        return {
          markup_percentage: 2.5,
          markup_duration: 4,
          markup_penalty_rate: 1.0,
        };
      default:
        return {
          markup_percentage: 0,
          markup_duration: 0,
          markup_penalty_rate: 0,
        };
    }
  };

  const handleOpenSelectSupplier = useCallback(() => {
    setSelectSuppliersDialogue(true);
  }, []);

  const handleCustomerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCustomer = customers?.find(
        (customer) => customer?.customer_name === e.target.value
      );

      if (selectedCustomer) {
        setOrderForm((prev) => ({
          ...prev,
          customer_entity_id: selectedCustomer?.customer_entity_id || "",
          customer_entity_type:
            selectedCustomer?.customer_entity_type || "personal",
        }));
      }
    },
    [customers]
  );

  const handleCustomMarkupChange = useCallback(
    (field: string, value: string) => {
      setCustomMarkup((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSelectProducts = useCallback((products: any[]) => {
    setSelectedProducts(products);

    const groupedProducts = products.reduce(
      (
        acc: Record<
          string,
          {
            supplier_entity_id: string;
            supplier_entity_type: string;
            products: {
              product_id: string;
              quantity: number;
              price: number;
            }[];
          }
        >,
        product
      ) => {
        const supplierId = product.supplier_entity_id;
        const supplierType = "business";

        if (!supplierId) {
          console.warn("Product missing supplier_id:", product);
          return acc;
        }

        if (!acc[supplierId]) {
          acc[supplierId] = {
            supplier_entity_id: supplierId,
            supplier_entity_type: supplierType,
            products: [],
          };
        }

        acc[supplierId].products.push({
          product_id: product.id,
          quantity: product.quantity || 1,
          price: Number(product.totalOrderValue) || 0,
        });

        return acc;
      },
      {}
    );

    const formattedProducts = Object.values(groupedProducts);

    setOrderForm((prev) => ({
      ...prev,
      products: formattedProducts,
    }));

    setSelectSuppliersDialogue(false);
  }, []);

  const handleOpenCreditLimit = useCallback(() => {
    if (totalOrderValue >= 80000) {
      setIsCreditLimitModalOpen(true);
    } else {
      handlePlaceOrder();
    }
  }, [totalOrderValue]);

  const handleCloseCreditLimit = useCallback(() => {
    setIsCreditLimitModalOpen(false);
  }, []);

  const processCreditApplication = async (): Promise<void> => {
    if (!formData || !isEditing) return;

    return new Promise((resolve, reject) => {
      try {
        const onSuccess = () => {
          resolve();
        };

        if (formData.id) {
          handleUpdateCreditApplication(
            formData,
            formData.sales_record_file,
            formData.supplier_distributor_statement_file,
            formData.verified_bank_statement_file,
            formData.identification_file,
            onSuccess
          );
        } else {
          handleCreateCreditApplication(
            formData,
            formData.sales_record_file,
            formData.supplier_distributor_statement_file,
            formData.verified_bank_statement_file,
            formData.identification_file,
            onSuccess
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const createSupplierTermOrder = async (): Promise<void> => {
    const payload = {
      customer_entity_id: orderForm.customer_entity_id,
      customer_entity_type: orderForm.customer_entity_type,
      markup_type: orderForm.markup_type,
      markup_percentage: orderForm.markup_percentage,
      markup_duration: orderForm.markup_duration,
      markup_penalty_rate: orderForm.markup_penalty_rate,
      products: orderForm.products,
    };

    return new Promise((resolve, reject) => {
      try {
        handleCreateSuppliersTerm(payload, () => {
          handleFormClose();
          router.push(ROUTES.creditRequests);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateSupplierTermOrder = async (): Promise<void> => {
    const payload = {
      id: editData.id,
      customer_entity_id: orderForm.customer_entity_id,
      customer_entity_type: orderForm.customer_entity_type,
      markup_type: orderForm.markup_type,
      markup_percentage: orderForm.markup_percentage,
      markup_duration: orderForm.markup_duration,
      markup_penalty_rate: orderForm.markup_penalty_rate,
      products: orderForm.products,
    };

    return new Promise((resolve, reject) => {
      try {
        handleUpdateSuppliersTerm(payload, () => {
          handleFormClose();
          router.push(ROUTES.creditRequests);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const handlePlaceOrder = async () => {
    if (!orderForm.customer_entity_id) {
      alert("Please select a customer");
      return;
    }

    if (
      orderForm.products.length === 0 ||
      orderForm.products.every((p) => p.products.length === 0)
    ) {
      alert("Please select products with suppliers");
      return;
    }
    if (!orderForm.markup_type) {
      alert("Please select a markup type");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }

    setLoading(true);

    try {
      if (shouldProcessCreditApplication()) {
        await processCreditApplication();
      }

      if (isEdit && editData) {
        await updateSupplierTermOrder();
      } else {
        await createSupplierTermOrder();
      }
    } catch (error: any) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shouldProcessCreditApplication = () => {
    return (
      formData &&
      (formData.sales_record_file ||
        formData.supplier_distributor_statement_file ||
        formData.verified_bank_statement_file ||
        formData.identification_file)
    );
  };

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount);
  }, []);

  const columns = [
    {
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }: any) => row.original.product_name || row.original.id,
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Price",
      accessorKey: "unitPrice",
      cell: ({ row }: any) =>
        formatCurrency(Number(row.original.unitPrice) || 0),
    },
    {
      header: "Total Order Value",
      accessorKey: "totalOrderValue",
      cell: ({ row }: any) =>
        formatCurrency(Number(row.original.totalOrderValue) || 0),
    },
  ];

  const customerOptions =
    customers?.map((customer) => customer?.customer_name || "") || [];

  const selectedCustomerName = useMemo(() => {
    if (!orderForm.customer_entity_id) return "";

    let customer = customers?.find(
      (customer) =>
        customer?.customer_entity_id === orderForm?.customer_entity_id &&
        customer?.customer_entity_type === orderForm?.customer_entity_type
    );

    if (!customer && isEdit) {
      customer = customers?.find(
        (customer) =>
          customer?.customer_entity_id === orderForm?.customer_entity_id
      );
    }

    if (!customer && isEdit && editData?.customer_name) {
      return editData.customer_name;
    }

    return customer?.customer_name || "";
  }, [
    customers,
    orderForm.customer_entity_id,
    orderForm.customer_entity_type,
    isEdit,
    editData,
  ]);

  const selectedMarkupLabel =
    markupOptions.find((option) => option.value === orderForm.markup_type)
      ?.label || "";

  return (
    <div className="bg-inherit max-w-3xl rounded-md py-10 mx-auto h-auto flex flex-col items-center">
      <div className="flex flex-col gap-2 w-full">
        <Typography variant="h4" className="text-center">
          Place an Order
        </Typography>
        <Typography className="text-[#6F6F6F] text-center text-sm font-normal">
          Select a supplier, choose products and confirm your order
        </Typography>
      </div>

      <div className="grid mt-6 grid-cols-1 w-full max-w-2xl gap-4">
        <label className="text-sm font-normal text-[#101828]">
          Customer <span className="text-red-600 ml-1">*</span>
        </label>
        <FormSelect
          placeholder="Select Customer"
          options={customerOptions}
          value={selectedCustomerName}
          name="customer"
          readOnly={!customers?.length}
          required
          className="rounded-none w-full"
          paddingY="2"
          onChange={handleCustomerChange}
        />

        {orderForm.customer_entity_id && (
          <div className="flex items-center gap-2">
            <Button
              variant="text"
              className="px-3 py-3 border-[1px] shadow-none hover:shadow-none rounded-lg text-sm flex items-center gap-2 bg-inherit border-gray-300 text-gray-700"
            >
              <Typography className="text-sm font-normal text-black">
                {selectedCustomerName}
              </Typography>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() =>
                  setOrderForm((prev) => ({
                    ...prev,
                    customer_entity_id: "",
                    customer_entity_type: "",
                  }))
                }
              />
            </Button>
          </div>
        )}

        <label className="flex">
          Markup <span className="text-red-600 ml-1">*</span>
        </label>
        <div>
          <FormSelect
            placeholder="Select Markup"
            options={markupOptions.map((option) => option.label)}
            className="rounded-none -mt-2 mb-2"
            paddingY="3"
            value={selectedMarkupLabel}
            required
            onChange={(e: { target: { value: string } }) => {
              const selectedOption = markupOptions.find(
                (option) => option.label === e.target.value
              );
              if (selectedOption) {
                setOrderForm((prev) => ({
                  ...prev,
                  markup_type: selectedOption.value,
                }));
              }
            }}
          />
          {orderForm.markup_type && orderForm.markup_type !== "custom" && (
            <span className="text-gray_4 text-sm">
              {orderForm.markup_percentage}% will be added to the total price.
            </span>
          )}
        </div>

        {orderForm.markup_type === "custom" && (
          <>
            <Typography className="font-medium text-black">
              Custom Markup{" "}
              <span className="font-normal text-sm text-[#6F6F6F]">
                (Optional)
              </span>
            </Typography>
            <div className="grid gap-3 grid-cols-3 items-center justify-between">
              <FormInput
                icon={<span className="text-gray_4">%</span>}
                iconPosition="right"
                placeholder="Specify percentage"
                paddingY="3"
                className="text-sm"
                value={customMarkup.percentage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCustomMarkupChange("percentage", e.target.value)
                }
              />
              <FormInput
                placeholder="Specify duration"
                icon={<span className="text-gray_4">Weeks</span>}
                iconPosition="right"
                paddingY="3"
                className="text-sm"
                value={customMarkup.duration}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCustomMarkupChange("duration", e.target.value)
                }
              />
              <FormInput
                placeholder="Specify penalty rate"
                paddingY="3"
                icon={<span className="text-gray_4">%</span>}
                iconPosition="right"
                className="text-sm"
                value={customMarkup.penaltyRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleCustomMarkupChange("penaltyRate", e.target.value)
                }
              />
            </div>
          </>
        )}

        <div>
          <button
            onClick={handleOpenSelectSupplier}
            className="flex items-center gap-1 mb-4"
            type="button"
            disabled={loading}
          >
            <Image src={add} alt="add-square" />
            <Typography className="text-pry2 font-medium text-sm">
              Choose Products
            </Typography>
          </button>

          <TanTable columnData={columns} data={selectedProducts} length={5} />
        </div>

        <section className="flex gap-8 justify-end">
          <span className="text-gray_4">Total</span>
          <Typography className="font-bold">
            {formatCurrency(totalOrderValue)}
          </Typography>
        </section>

        <div className="flex justify-between gap-4 pt-2">
          <Button
            onClick={handleBack}
            className="bg-white text-pry2 normal-case font-normal text-sm px-8 py-3 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
            disabled={loading}
          >
            Back
          </Button>
          <Button
            className="bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleOpenCreditLimit}
            disabled={loading || selectedProducts.length === 0}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : isEdit ? (
              "Update Order"
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>

      <SelectSupplier
        isOpen={selectSupplierDialogue}
        onClose={() => setSelectSuppliersDialogue(false)}
        onSelectProducts={handleSelectProducts}
        existingProducts={isEdit ? selectedProducts : []}
        isEdit={isEdit}
      />

      <CancelOrder
        isOpen={cancelDialogue}
        onClose={() => setCancelDialogue(false)}
      />

      <CreditLimitAssessment
        isEditing={isEditing}
        open={isCreditLimitModalOpen}
        onClose={handleCloseCreditLimit}
        onBack={handleCloseCreditLimit}
        onApply={handlePlaceOrder}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PlaceOrderForm;
