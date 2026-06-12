import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import add from "@/assets/images/add-square.svg";
import { FormInput, FormSelect } from "@/components/General/form";
import React, { useState, useEffect, useCallback } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import TanTable from "@/components/General/TanTable";
import AddInvoiceModal from "../../modals/addInvoiceModal";
import AddSupplier from "../../modals/addSupplier";
import { useDash } from "@/context/dashboardContext";
import { CreditLimitAssessment } from "@/components/dashboard/credit/modals/creditLimitAssessment";
import { X } from "lucide-react";
import { usePageData } from "@/api/hooks/usePageData";

interface InvoiceFormProps {
  isEditing: boolean;
  handleBack: () => void;
  onClose: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const InvoiceForm = ({
  isEditing,
  handleBack,
  onClose,
  formData,
  setFormData,
}: InvoiceFormProps) => {
  const { customers, activeBusiness } = useDashboardSelector();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isCreditLimitModalOpen, setIsCreditLimitModalOpen] = useState(false);

  const [invoiceForm, setInvoiceForm] = useState({
    customer_entity_id: "",
    customer_entity_type: "",
    markup_type: "",
    markup_percentage: 0,
    markup_duration: 0,
    markup_penalty_rate: 0,
  });

  const [customMarkup, setCustomMarkup] = useState({
    percentage: "",
    duration: "",
    penaltyRate: "",
  });

  const [invoices, setInvoices] = useState<any>([]);
  const [totalInvoiceAmount, setTotalInvoiceAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    loadCustomersData,
    loadSupplierData,
    handleCreateCreditApplication,
    handleUpdateCreditApplication,
    handleCreateSuppliersTerm,
    handleUploadCreditInvoice,
  } = useDash();

  usePageData([loadCustomersData, loadSupplierData]);

  useEffect(() => {
    if (invoices.length > 0) {
      const total = invoices.reduce(
        (sum: number, invoice: any) =>
          sum + (parseFloat(invoice.totalAmount) || 0),
        0
      );
      setTotalInvoiceAmount(total);
    } else {
      setTotalInvoiceAmount(0);
    }
  }, [invoices]);

  useEffect(() => {
    if (invoiceForm.markup_type === "Custom") {
      setInvoiceForm((prev) => ({
        ...prev,
        markup_percentage: parseFloat(customMarkup.percentage) || 0,
        markup_duration: parseInt(customMarkup.duration) || 0,
        markup_penalty_rate: parseFloat(customMarkup.penaltyRate) || 0,
      }));
    } else {
      const markupConfig = getMarkupConfig(invoiceForm.markup_type);
      setInvoiceForm((prev) => ({
        ...prev,
        ...markupConfig,
      }));
    }
  }, [customMarkup, invoiceForm.markup_type]);

  useEffect(() => {
    console.log("invoiceForm.markup_type changed:", invoiceForm.markup_type);
  }, [invoiceForm.markup_type]);

  const getMarkupConfig = (markupType: string) => {
    switch (markupType) {
      case "Pay 50% installment each week":
        return {
          markup_percentage: 2.5,
          markup_duration: 1,
          markup_penalty_rate: 0.5,
        };
      case "Pay 30% installment monthly":
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

  const handleOpenDialogue = useCallback(() => setOpenDialogue(true), []);
  const handleCloseDialogue = useCallback(() => setOpenDialogue(false), []);

  const handleCloseSupplier = useCallback(
    () => setIsSupplierModalOpen(false),
    []
  );

  const handleCustomerChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCustomer = customers?.find(
        (customer) => customer?.customer_name === e.target.value
      );

      setInvoiceForm((prev) => ({
        ...prev,
        customer_entity_id: selectedCustomer?.customer_entity_id || "",
        customer_entity_type: selectedCustomer?.customer_entity_type || "",
      }));
    },
    [customers]
  );

  const handleMarkupTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement> | string) => {
      const selectedValue = typeof e === "string" ? e : e.target.value;

      setInvoiceForm((prevForm) => {
        const updatedForm = {
          ...prevForm,
          markup_type: selectedValue,
        };
        return updatedForm;
      });
    },
    []
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

  const handleAddInvoice = useCallback((invoice: any) => {
    setInvoices((prev: any[]) => [...prev, invoice]);
    setOpenDialogue(false);
  }, []);

  const handleOpenCreditLimit = useCallback(() => {
    if (totalInvoiceAmount >= 80000) {
      setIsCreditLimitModalOpen(true);
    } else {
      handlePlaceOrder();
    }
  }, [totalInvoiceAmount]);

  const handleCloseCreditLimit = useCallback(() => {
    setIsCreditLimitModalOpen(false);
  }, []);

  const handlePlaceOrder = async () => {
    const currentCustomerId = invoiceForm.customer_entity_id;
    const currentMarkupType = invoiceForm.markup_type?.trim();
    const currentInvoices = invoices;

    if (!currentCustomerId) {
      alert("Please select a customer");
      return;
    }

    // More robust markup type validation
    // if (!currentMarkupType) {
    //   console.log(
    //     "Validation failed: No markup type selected. Current value:",
    //     invoiceForm.markup_type
    //   );
    //   alert("Please select a markup type");
    //   return;
    // }

    if (currentInvoices.length === 0) {
      alert("Please add at least one invoice");
      return;
    }

    setLoading(true);

    try {
      if (shouldProcessCreditApplication()) {
        await processCreditApplication();
      } else {
        console.log(
          "Skipping credit application processing - no relevant files"
        );
      }

      await createSupplierTermForInvoices(
        currentCustomerId,
        currentMarkupType,
        currentInvoices
      );
    } catch (error: any) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shouldProcessCreditApplication = () => {
    const hasFiles =
      formData &&
      (formData.sales_record_file ||
        formData.supplier_distributor_statement_file ||
        formData.verified_bank_statement_file ||
        formData.identification_file);

    return hasFiles && formData?.requiresCreditProcessing;
  };

  const processCreditApplication = async () => {
    if (!formData) return;

    try {
      if (formData.id) {
        handleUpdateCreditApplication(
          formData,
          formData.sales_record_file,
          formData.supplier_distributor_statement_file,
          formData.verified_bank_statement_file,
          formData.identification_file,
          () => console.log("Credit application updated successfully")
        );
      } else {
        handleCreateCreditApplication(
          formData,
          formData.sales_record_file,
          formData.supplier_distributor_statement_file,
          formData.verified_bank_statement_file,
          formData.identification_file,
          () => console.log("Credit application created successfully")
        );
      }
    } catch (error) {
      throw new Error("Failed to process credit application");
    }
  };

  const createSupplierTermForInvoices = async (
    customerId?: string,
    markupType?: string,
    currentInvoices?: any[]
  ) => {
    const entityId = customerId || invoiceForm.customer_entity_id;
    const entityType = invoiceForm.customer_entity_type;
    const selectedMarkupType = markupType || invoiceForm.markup_type;
    const invoiceList = currentInvoices || invoices;

    const basePayload = {
      customer_entity_id: entityId,
      customer_entity_type: entityType,
      markup_type: selectedMarkupType,
      invoices: invoiceList.map((invoice: any) => ({
        supplier_entity_id: activeBusiness?.id,
        supplier_entity_type: "business",
        request_date: new Date().toISOString().split("T")[0],
        issue_date: new Date().toISOString().split("T")[0],
        invoice_date: invoice.invoiceDate,
        invoice_number: invoice.invoiceNumber,
        invoice_amount: parseFloat(invoice.totalAmount) || 0,
        invoice_file_url: invoice.file || "",
      })),
    };

    const payload =
      selectedMarkupType === "Custom"
        ? {
            ...basePayload,
            markup_percentage: invoiceForm.markup_percentage,
            markup_duration: invoiceForm.markup_duration,
            markup_penalty_rate: invoiceForm.markup_penalty_rate,
          }
        : basePayload;

    handleUploadCreditInvoice(payload, () => {
      console.log("Credit invoice uploaded successfully");
      onClose();
    });
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
      header: "Supplier",
      accessorKey: "supplier",
    },
    {
      header: "Invoice Date",
      accessorKey: "invoiceDate",
    },
    {
      header: "Invoice Number",
      accessorKey: "invoiceNumber",
    },
    {
      header: "Amount",
      accessorKey: "totalAmount",
      cell: ({ row }: any) =>
        formatCurrency(Number(row.original.totalAmount) || 0),
    },
    {
      header: "File",
      accessorKey: "file",
      cell: ({ row }: any) => (
        <span className="text-blue-600 cursor-pointer">
          {row.original.file ? "View File" : "No File"}
        </span>
      ),
    },
  ];

  const customerOptions =
    customers?.map((customer) => customer?.customer_name || "") || [];

  const selectedCustomerName =
    customers?.find(
      (customer) =>
        customer?.customer_entity_id === invoiceForm?.customer_entity_id &&
        customer?.customer_entity_type === invoiceForm?.customer_entity_type
    )?.customer_name || "";

  const markupAmount =
    totalInvoiceAmount * (invoiceForm.markup_percentage / 100);
  const totalOrderValue = totalInvoiceAmount + markupAmount;

  const isPlaceOrderDisabled =
    !invoiceForm.customer_entity_id ||
    invoices.length === 0 ||
    !invoiceForm.markup_type?.trim() ||
    loading;

  return (
    <div className="grid grid-cols-1 bg-[#F8FAFB] lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="bg-white py-10 px-6 rounded-lg">
          <div className="flex flex-col gap-2 w-full">
            <Typography variant="h4" className="text-center font-bold">
              Upload An Invoice
            </Typography>
            <Typography className="text-[#6F6F6F] text-center text-sm font-normal">
              Select a customer, Enter invoice information and markup details
            </Typography>
          </div>

          <div className="grid mt-6 grid-cols-1 w-full max-w-2xl gap-4 mx-auto">
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

            {invoiceForm.customer_entity_id && (
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
                      setInvoiceForm((prev) => ({
                        ...prev,
                        customer_entity_id: "",
                        customer_entity_type: "",
                      }))
                    }
                  />
                </Button>
              </div>
            )}

            <div className="flex justify-between">
              <label className="flex">
                Invoices
                <span className="text-red-600 ml-1">*</span>
              </label>
              <button
                onClick={handleOpenDialogue}
                className="flex items-center gap-1"
                type="button"
              >
                <Image src={add} alt="add-square" />
                <Typography className="text-pry2 font-medium text-sm">
                  Add Invoice
                </Typography>
              </button>
            </div>
            <div className="-mt-5">
              <TanTable
                columnData={columns}
                data={invoices.length > 0 ? invoices : []}
                length={5}
              />
            </div>

            <label className="flex">
              Markup <span className="text-red-600 ml-1">*</span>
            </label>
            <div>
              <FormSelect
                placeholder="Select Markup"
                options={[
                  "Pay 50% installment each week",
                  "Pay 30% installment monthly",
                  "Custom",
                ]}
                className="rounded-none -mt-2 mb-2"
                paddingY="3"
                value={invoiceForm.markup_type}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  console.log(
                    "FormSelect onChange triggered with value:",
                    e.target.value
                  );
                  handleMarkupTypeChange(e);
                }}
              />
              {invoiceForm.markup_type &&
                invoiceForm.markup_type !== "Custom" && (
                  <span className="text-gray_4 text-sm">
                    {invoiceForm.markup_percentage}% will be added to the total
                    price.
                  </span>
                )}
            </div>

            {invoiceForm.markup_type === "Custom" && (
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

            <div className="flex mt-4 justify-between gap-4">
              <Button
                onClick={handleBack}
                className="bg-white text-pry2 normal-case font-normal text-sm px-4 py-2 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
                disabled={loading}
              >
                Back
              </Button>

              <Button
                className="bg-pry2 normal-case text-white font-normal text-sm px-6 py-2 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleOpenCreditLimit}
                disabled={isPlaceOrderDisabled}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="bg-white py-8 px-6 rounded-lg h-fit">
          <header>
            <Typography variant="h5" className="font-bold text-center mb-6">
              Order Summary
            </Typography>
          </header>
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <Typography className="font-semibold text-sm">
                {formatCurrency(totalInvoiceAmount)}
              </Typography>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mark up</span>
              <Typography className="font-semibold text-sm text-green-600">
                +{formatCurrency(markupAmount)}
              </Typography>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Total(Amount + Markup)
                </span>
                <Typography className="font-bold text-lg">
                  {formatCurrency(totalOrderValue)}
                </Typography>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      <AddInvoiceModal
        open={openDialogue}
        onClose={handleCloseDialogue}
        onAddInvoice={handleAddInvoice}
      />
      <AddSupplier open={isSupplierModalOpen} onClose={handleCloseSupplier} />
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

export default InvoiceForm;
