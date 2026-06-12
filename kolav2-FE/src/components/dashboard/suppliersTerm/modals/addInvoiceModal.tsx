import {
  DragAndDropFileInput,
  FormInput,
  FormSelect,
} from "@/components/General/form";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import add from "@/assets/images/add-square.svg";
import Image from "next/image";
import { CloudArrowUp } from "@phosphor-icons/react";
import { useDashboardSelector } from "@/Redux/selectors";
import AddSupplier from "./addSupplier";
import { useDash } from "@/context/dashboardContext";

interface AddInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onAddInvoice: (invoice: any) => void;
  selectedSupplier?: string;
}

const AddInvoiceModal = ({
  open,
  onClose,
  onAddInvoice,
  selectedSupplier = "",
}: AddInvoiceModalProps) => {
  const { loadSupplierData } = useDash();
  const { suppliers } = useDashboardSelector();
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    supplier: selectedSupplier,
    requestDate: "",
    issuedDate: "",
    invoiceDate: "",
    invoiceNumber: "",
    totalAmount: "",
    file: null as File | null,
    fileName: "",
  });
  const [formErrors, setFormErrors] = useState({
    supplier: false,
    invoiceDate: false,
    invoiceNumber: false,
    totalAmount: false,
    file: false,
  });

  useEffect(() => {
    loadSupplierData();
  }, [loadSupplierData]);

  // Update supplier when prop changes
  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      supplier: selectedSupplier,
    }));
  }, [selectedSupplier]);

  const handleOpenSupplier = () => setIsSupplierModalOpen(true);
  const handleCloseSupplier = () => setIsSupplierModalOpen(false);

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData({
      ...invoiceData,
      [field]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [field]: false,
      });
    }
  };

  const handleSupplierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const supplierName = e.target.value;
    handleInputChange("supplier", supplierName);
  };

  const handleFileSelect = (files: File[]) => {
    if (files && files.length > 0) {
      setInvoiceData({
        ...invoiceData,
        file: files[0],
        fileName: files[0].name,
      });

      // Clear file error if it exists
      if (formErrors.file) {
        setFormErrors({
          ...formErrors,
          file: false,
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {
      supplier: !invoiceData.supplier,
      invoiceDate: !invoiceData.invoiceDate,
      invoiceNumber: !invoiceData.invoiceNumber,
      totalAmount:
        !invoiceData.totalAmount || parseFloat(invoiceData.totalAmount) <= 0,
      file: !invoiceData.file,
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleAddInvoice = () => {
    if (!validateForm()) {
      return;
    }

    // Find the selected supplier to get its details
    const selectedSupplierData = suppliers?.find(
      (supplier) => supplier.name === invoiceData.supplier
    );

    // Format the invoice object to match expected structure in InvoiceForm
    const invoice = {
      supplier: invoiceData.supplier,
      invoiceDate: invoiceData.invoiceDate,
      invoiceNumber: invoiceData.invoiceNumber,
      totalAmount: invoiceData.totalAmount,
      file: invoiceData.fileName,

      supplier_entity_id:
        selectedSupplierData?.id ||
        selectedSupplierData?.supplier_entity_id ||
        "",
      supplier_entity_type:
        selectedSupplierData?.supplier_entity_type || "external",
      requestDate: invoiceData.requestDate,
      issuedDate: invoiceData.issuedDate,

      // Raw file for potential upload
      fileObject: invoiceData.file,
    };

    onAddInvoice(invoice);
    resetForm();
  };

  const resetForm = () => {
    setInvoiceData({
      supplier: selectedSupplier,
      requestDate: "",
      issuedDate: "",
      invoiceDate: "",
      invoiceNumber: "",
      totalAmount: "",
      file: null,
      fileName: "",
    });
    setFormErrors({
      supplier: false,
      invoiceDate: false,
      invoiceNumber: false,
      totalAmount: false,
      file: false,
    });
  };

  const supplierOptions = suppliers
    ? suppliers.map((supplier) => supplier.name || "")
    : [];

  return (
    <>
      <Dialog open={open} handler={onClose} size="lg" className="p-4">
        <DialogHeader className="items-center flex m-0">
          <IconButton variant="text" onClick={onClose}>
            <X className="stroke-2" size={25} />
          </IconButton>
          <div className="flex flex-col gap-1">
            <Typography className="text-xl text-black font-semibold">
              Add Invoice
            </Typography>
            <Typography className="text-gray_4">
              Enter invoice details to add it to your order
            </Typography>
          </div>
        </DialogHeader>

        <DialogBody className="space-y-4 md:overflow-visible overflow-y-auto">
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-normal text-black">
                  Supplier
                  <span className="text-red-600 ml-1">*</span>
                </label>
                <button
                  onClick={handleOpenSupplier}
                  className="flex items-center gap-1"
                  type="button"
                >
                  <Image src={add} alt="add-square" />
                  <Typography className="text-pry2 font-medium text-sm">
                    Add New Supplier
                  </Typography>
                </button>
              </div>
              <FormSelect
                options={supplierOptions}
                placeholder="Select supplier"
                className={`rounded-none text-gray_4 ${
                  formErrors.supplier ? "border-red-500" : ""
                }`}
                paddingY="3"
                value={invoiceData.supplier}
                onChange={handleSupplierChange}
              />
              {formErrors.supplier && (
                <p className="text-red-500 text-xs mt-1">
                  Supplier is required
                </p>
              )}
            </div>

            <div className="flex w-full items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex">
                  <label className="text-sm text-black font-normal">
                    Request Date
                  </label>
                </div>
                <FormInput
                  type="date"
                  className="rounded-none w-full bg-inherit"
                  paddingY="3"
                  value={invoiceData.requestDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("requestDate", e.target.value)
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex">
                  <label className="text-sm text-black font-normal">
                    Issued Date
                  </label>
                </div>
                <FormInput
                  type="date"
                  className="rounded-none w-full bg-inherit"
                  paddingY="3"
                  value={invoiceData.issuedDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("issuedDate", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex w-full items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex">
                  <label className="text-sm text-black font-normal">
                    Invoice Date
                  </label>
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <FormInput
                  type="date"
                  className={`rounded-none w-full bg-inherit ${
                    formErrors.invoiceDate ? "border-red-500" : ""
                  }`}
                  paddingY="3"
                  value={invoiceData.invoiceDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("invoiceDate", e.target.value)
                  }
                />
                {formErrors.invoiceDate && (
                  <p className="text-red-500 text-xs mt-1">
                    Invoice date is required
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex">
                  <label className="text-sm text-black font-normal">
                    Invoice Number
                  </label>
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <FormInput
                  type="text"
                  className={`rounded-none w-full bg-inherit ${
                    formErrors.invoiceNumber ? "border-red-500" : ""
                  }`}
                  paddingY="3"
                  placeholder="Enter Invoice Number"
                  value={invoiceData.invoiceNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("invoiceNumber", e.target.value)
                  }
                />
                {formErrors.invoiceNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    Invoice number is required
                  </p>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex">
                  <label className="text-sm text-black font-normal">
                    Amount
                  </label>
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <FormInput
                  type="text"
                  className={`rounded-none w-full bg-inherit ${
                    formErrors.totalAmount ? "border-red-500" : ""
                  }`}
                  paddingY="3"
                  placeholder="Enter Amount"
                  value={invoiceData.totalAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("totalAmount", e.target.value)
                  }
                />
                {formErrors.totalAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {!invoiceData.totalAmount
                      ? "Amount is required"
                      : "Amount must be greater than 0"}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex">
                <label className="text-sm text-black font-normal">
                  Upload Invoice
                </label>
                <span className="text-red-600 ml-1">*</span>
              </div>
              <DragAndDropFileInput
                id="invoice"
                onFileSelect={handleFileSelect}
                bgColor="inherit"
                borderStyle={formErrors.file ? "solid" : "dashed"}
                borderColor={formErrors.file ? "#EF4444" : "#CBD5E1"}
                size="sm"
                icon={<CloudArrowUp />}
                titleComponent={
                  <Typography className="text-sm text-black pt-4">
                    {invoiceData.fileName || (
                      <>
                        Drag your file here, or{" "}
                        <span className="text-pry2 font-medium">
                          click to upload
                        </span>
                      </>
                    )}
                  </Typography>
                }
                subHeadingComponent={
                  <Typography className="text-xs">
                    {invoiceData.fileName
                      ? `Selected: ${invoiceData.fileName}`
                      : "Accepted formats: PNG, JPG, PDF"}
                  </Typography>
                }
                labelDirection="vertical"
              />
              {formErrors.file && (
                <p className="text-red-500 text-xs mt-1">
                  Invoice file is required
                </p>
              )}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <div className="flex gap-3 w-full justify-end">
            <Button
              variant="outlined"
              className="normal-case text-gray-600 border-gray-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="normal-case text-white bg-pry2"
              onClick={handleAddInvoice}
            >
              <Typography className="text-sm font-medium">
                Add Invoice
              </Typography>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      <AddSupplier open={isSupplierModalOpen} onClose={handleCloseSupplier} />
    </>
  );
};

export default AddInvoiceModal;
