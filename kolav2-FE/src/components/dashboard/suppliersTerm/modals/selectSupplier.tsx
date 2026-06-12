import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FormSelect } from "@/components/General/form";
import { X } from "lucide-react";
import TanTable from "@/components/General/TanTable";
import SupplierStoreFront from "./supplierStoreFront";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import AddSupplier from "./addSupplier";
import Image from "next/image";
import add from "@/assets/images/add-square.svg";

interface SelectSupplierProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProducts: (products: any[]) => void;
  onSupplierChange?: (supplierName: string) => void;
  existingProducts?: any[];
  isEdit?: boolean;
}

export function SelectSupplier({
  isOpen,
  onClose,
  onSelectProducts,
  onSupplierChange,
  existingProducts = [],
  isEdit = false,
}: SelectSupplierProps) {
  const [isStorefrontOpen, setIsStorefrontOpen] = useState(false);
  const [currentStorefrontSupplier, setCurrentStorefrontSupplier] =
    useState<any>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [currentSelectedSupplier, setCurrentSelectedSupplier] = useState("");
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  const { suppliers } = useDashboardSelector();
  const { loadSupplierData } = useDash();

  useEffect(() => {
    loadSupplierData();
  }, [loadSupplierData]);

  useEffect(() => {
    if (isEdit && existingProducts.length > 0) {
      setSelectedProducts(existingProducts);

      const firstProductSupplier = existingProducts[0]?.supplier;
      if (firstProductSupplier) {
        setCurrentSelectedSupplier(firstProductSupplier);
      }
    }
  }, [isEdit, existingProducts]);

  const totalOrderValue = useMemo(() => {
    return selectedProducts.reduce(
      (sum, product) => sum + (Number(product.totalOrderValue) || 0),
      0
    );
  }, [selectedProducts]);

  const handleOpenSupplier = useCallback(() => {
    onClose();
    setIsSupplierModalOpen(true);
  }, [onClose]);

  const handleCloseSupplier = useCallback(() => {
    setIsSupplierModalOpen(false);
  }, []);

  const handleSupplierChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const supplierName = e.target.value;
      setCurrentSelectedSupplier(supplierName);

      if (isEdit) {
        const supplierProducts = selectedProducts.filter(
          (product) => product.supplier === supplierName
        );
        if (supplierProducts.length === 0) {
          setSelectedProducts([]);
        }
      } else {
        setSelectedProducts([]);
      }

      onSupplierChange?.(supplierName);
    },
    [onSupplierChange, isEdit, selectedProducts]
  );

  const openStorefront = useCallback(
    (supplierName: string) => {
      const supplier = suppliers?.find((s) => s.name === supplierName);
      if (supplier) {
        setCurrentStorefrontSupplier(supplier);
        setIsStorefrontOpen(true);
      }
    },
    [suppliers]
  );

  const closeStorefront = useCallback(() => {
    setIsStorefrontOpen(false);
    setCurrentStorefrontSupplier(null);
  }, []);

  const handleProductSelection = useCallback(
    (products: any[]) => {
      if (isEdit) {
        const otherSupplierProducts = selectedProducts.filter(
          (product) => product.supplier !== currentSelectedSupplier
        );
        setSelectedProducts([...otherSupplierProducts, ...products]);
      } else {
        setSelectedProducts(products);
      }
      closeStorefront();
    },
    [closeStorefront, isEdit, selectedProducts, currentSelectedSupplier]
  );

  const handleSaveAndProceed = useCallback(() => {
    onSelectProducts(selectedProducts);
    onClose();
  }, [selectedProducts, onSelectProducts, onClose]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(amount);
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Supplier",
        accessorKey: "supplier",
      },
      {
        header: "Products Count",
        accessorKey: "productCount",
      },
      {
        header: "Total Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Total Order Value (GHS)",
        accessorKey: "totalOrderValue",
        cell: ({ row }: any) =>
          formatCurrency(Number(row.original.totalOrderValue) || 0),
      },
      {
        accessorKey: "view",
        cell: ({ row }: any) => (
          <Button
            className="border bg-inherit normal-case py-2 text-pry2 border-pry2"
            onClick={() => openStorefront(row.original.supplier)}
          >
            <Typography className="text-sm font-normal">
              {isEdit ? "Modify Products" : "View Storefront"}
            </Typography>
          </Button>
        ),
      },
    ],
    [formatCurrency, openStorefront, isEdit]
  );

  const tableData = useMemo(() => {
    if (!currentSelectedSupplier) return [];

    const supplierProducts = selectedProducts.filter(
      (product) => product.supplier === currentSelectedSupplier
    );

    const totalQuantity = supplierProducts.reduce(
      (sum, product) => sum + (product.quantity || 0),
      0
    );

    const totalValue = supplierProducts.reduce(
      (sum, product) => sum + (Number(product.totalOrderValue) || 0),
      0
    );

    return [
      {
        supplier: currentSelectedSupplier,
        quantity: totalQuantity,
        totalOrderValue: totalValue,
        productCount: supplierProducts.length,
      },
    ];
  }, [currentSelectedSupplier, selectedProducts]);

  const supplierOptions = useMemo(() => {
    return suppliers?.map((supplier) => supplier.name) || [];
  }, [suppliers]);

  const existingProductsForCurrentSupplier = useMemo(() => {
    if (!isEdit || !currentSelectedSupplier) return [];
    return selectedProducts.filter(
      (product) => product.supplier === currentSelectedSupplier
    );
  }, [isEdit, currentSelectedSupplier, selectedProducts]);

  return (
    <>
      <Dialog
        open={isOpen && !isStorefrontOpen}
        size="xl"
        handler={onClose}
        className="p-6"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <IconButton variant="text" onClick={onClose}>
              <X className="h-6 w-6 stroke-2" />
            </IconButton>
            <div>
              <Typography className="text-xl text-black font-semibold">
                Supplier Selection
              </Typography>
              <Typography className="text-gray_4">
                Choose a supplier and select products from their storefront
              </Typography>
            </div>
          </div>
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

        <div className="flex-1 mt-4">
          <DialogBody className="space-y-3 p-0">
            <FormSelect
              options={supplierOptions}
              placeholder="Select supplier"
              className="rounded-none -mt-2"
              paddingY="3"
              value={currentSelectedSupplier}
              required
              onChange={handleSupplierChange}
            />

            {tableData.length > 0 && (
              <>
                <Typography className="text-sm font-medium mt-4 mb-2">
                  {isEdit ? "Current Order Details:" : "Supplier Details:"}
                </Typography>
                <TanTable columnData={columns} data={tableData} length={5} />
              </>
            )}

            {selectedProducts.length > 0 && (
              <section className="flex gap-10 justify-end mt-4">
                <span className="text-gray_4">Total</span>
                <Typography className="font-bold text-black">
                  {formatCurrency(totalOrderValue)}
                </Typography>
              </section>
            )}
          </DialogBody>

          <DialogFooter className="gap-5 mt-8 p-0">
            <Button
              className="normal-case bg-pry2 text-white"
              onClick={handleSaveAndProceed}
              disabled={selectedProducts.length === 0}
            >
              <Typography className="text-sm">Save & Proceed</Typography>
            </Button>
          </DialogFooter>
        </div>
      </Dialog>

      <AddSupplier open={isSupplierModalOpen} onClose={handleCloseSupplier} />

      <SupplierStoreFront
        isOpen={isStorefrontOpen}
        onClose={closeStorefront}
        onSaveAndProceed={handleProductSelection}
        supplier={currentStorefrontSupplier}
        existingProducts={existingProductsForCurrentSupplier}
        isEdit={isEdit}
      />
    </>
  );
}
