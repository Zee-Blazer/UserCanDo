import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form";
import CurrencyInput from "@/components/General/currencyInput";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

interface AddAgentRequestItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: ProductProps) => void;
  selectedProduct: ProductProps | null;
}

export function AddAgentRequestItemModal({
  isOpen,
  onClose,
  onAddProduct,
  selectedProduct,
}: AddAgentRequestItemModalProps) {
  const { loadProductsData } = useDash();
  const { products } = useDashboardSelector();

  const [product, setProduct] = useState<ProductProps>({
    product_id: "",
    item_type: "case",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
  });

  const [selectedProductName, setSelectedProductName] = useState<string>("");

  useEffect(() => {
    loadProductsData();
  }, [loadProductsData]);

  useEffect(() => {
    if (isOpen && selectedProduct) {
      const productName =
        products.find((p) => p.id === selectedProduct.product_id)
          ?.product_name || "";

      setProduct(selectedProduct);
      setSelectedProductName(productName);
    } else if (isOpen && !selectedProduct) {
      setProduct({
        product_id: "",
        item_type: "case",
        quantity: 1,
        unit_price: 0,
        total_price: 0,
      });
      setSelectedProductName("");
    }
  }, [selectedProduct, products, isOpen]);

  const handleSave = () => {
    if (!product.product_id) {
      alert("Please select a product.");
      return;
    }
    onAddProduct(product);
    onClose();
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedProductObj = products.find(
      (p) => p.product_name === e.target.value
    );

    if (selectedProductObj) {
      setProduct((prev) => ({
        ...prev,
        product_id: selectedProductObj.id,
      }));
      setSelectedProductName(e.target.value);
    }
  };

  return (
    <Dialog
      animate={{ mount: { scale: 1, y: 0 }, unmount: { scale: 0.9, y: -100 } }}
      size="md"
      open={isOpen}
      handler={onClose}
      className="relative p-5"
    >
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-medium">
          Add/Edit Sale Item
        </Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-6">
        <div className="space-y-5">
          <FormSelect
            label="Product"
            options={products?.map((p) => p.product_name)}
            placeholder="Select Product"
            className="rounded-none text-gray_4"
            labelPosition="flex"
            labelGap="gap-[5em]"
            color="#000000"
            paddingY="2"
            fontSize="sm font-normal"
            value={selectedProductName}
            onChange={handleSelectChange}
          />

          <div className="flex items-center gap-[2.5em]">
            <label className="text-sm text-black font-normal w-24">Item</label>
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              {["case", "pieces"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      item_type: type as "case" | "pieces",
                    }))
                  }
                  className={`px-6 py-1.5 ${
                    product.item_type === type
                      ? "bg-[#0A0F1E] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex mb-3 items-center gap-[2.8em]">
            <label className="text-sm text-black font-normal w-24">
              Quantity
            </label>
            <div className="flex gap-3 items-center">
              <button
                onClick={() =>
                  setProduct((prev) => ({
                    ...prev,
                    quantity: Math.max(1, prev.quantity - 1),
                    total_price:
                      prev.unit_price * Math.max(1, prev.quantity - 1),
                  }))
                }
                className="px-3 py-1 border rounded-md border-gray-300"
              >
                -
              </button>
              <input
                title="quantity"
                type="text"
                value={product.quantity}
                onChange={(e) => {
                  const numericValue = parseInt(e.target.value, 10) || 0;
                  setProduct((prev) => ({
                    ...prev,
                    quantity: numericValue,
                    total_price: prev.unit_price * numericValue,
                  }));
                }}
                className="w-16 px-3 py-1 border rounded-md border-gray-300 text-center"
              />
              <button
                onClick={() =>
                  setProduct((prev) => ({
                    ...prev,
                    quantity: prev.quantity + 1,
                    total_price: prev.unit_price * (prev.quantity + 1),
                  }))
                }
                className="px-3 py-1 border rounded-r rounded-md border-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <CurrencyInput
            label="Unit Price"
            labelGap="gap-[2.3em]"
            value={product.unit_price}
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProduct((prev) => ({
                ...prev,
                unit_price: numericValue,
                total_price: numericValue * prev.quantity,
              }));
            }}
          />
          <CurrencyInput
            label="Total Price"
            labelGap="gap-[2.3em]"
            value={product.total_price}
            disabled
          />
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-[#002147] text-white rounded-md py-3 w-3/4"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
}

export default AddAgentRequestItemModal;
