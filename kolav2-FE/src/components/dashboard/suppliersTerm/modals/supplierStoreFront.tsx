import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  Button,
  DialogHeader,
  DialogFooter,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { ArrowLeft, Search, ShoppingCart } from "lucide-react";
import { FormInput } from "@/components/General/form";
import { colors } from "@/constants/colors";
import TanTable from "@/components/General/TanTable";
import productImage from "@/assets/images/km.png";
import Image from "next/image";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { formatNumber } from "@/utils/helpers";

interface SupplierStoreFrontProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAndProceed: (products: any[]) => void;
  supplier: any;
  existingProducts?: any[];
  isEdit?: boolean;
}

const SupplierStoreFront = ({
  isOpen,
  onClose,
  onSaveAndProceed,
  supplier,
  existingProducts = [],
  isEdit = false,
}: SupplierStoreFrontProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [productQuantities, setProductQuantities] = useState<
    Record<string, number>
  >({});

  const { suppliersProduct } = useDashboardSelector();
  console.log("suppliersProduct", suppliersProduct);
  const { loadSuppliersProducts, isSuppliersProductLoading } = useDash();

  useEffect(() => {
    if (isOpen && supplier?.supplier_entity_id?.trim()) {
      loadSuppliersProducts(supplier.supplier_entity_id, true);
    }
  }, [isOpen, supplier?.supplier_entity_id]);

  useEffect(() => {
    if (isEdit && existingProducts.length > 0 && isOpen) {
      setSelectedProducts(existingProducts);

      const initialQuantities: Record<string, number> = {};
      existingProducts.forEach((product) => {
        initialQuantities[product.id] = product.quantity || 1;
      });
      setProductQuantities(initialQuantities);
    } else if (!isEdit) {
      setSelectedProducts([]);
      setProductQuantities({});
    }
  }, [isEdit, existingProducts, isOpen, supplier?.supplier_entity_id]);

  const handleBack = useCallback(() => {
    onClose();
  }, [onClose]);

  const filteredProducts = useMemo(() => {
    return (
      suppliersProduct?.filter((product) =>
        product?.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    );
  }, [suppliersProduct, searchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const isProductOutOfStock = useCallback((product: any) => {
    const stockLevel = Number(product.product_stock_level) || 0;
    return stockLevel <= 0;
  }, []);

  const handleAddToCart = useCallback(
    (product: any) => {
      if (isProductOutOfStock(product)) {
        alert("This product is out of stock");
        return;
      }

      const quantity = productQuantities[product.id] || 1;
      const unitPrice = parseFloat(product.product_retail_price) || 0;
      const totalAmount = quantity * unitPrice;

      const cartProduct = {
        ...product,
        quantity: quantity,
        supplier_entity_id: supplier?.supplier_entity_id,
        supplier_entity_type: supplier?.supplier_entity_type || "business",
        supplier: supplier?.name || "Unknown Supplier",
        unitPrice: unitPrice,
        totalAmount: totalAmount,
        totalOrderValue: totalAmount,
      };

      setSelectedProducts((prev) => {
        const existingIndex = prev.findIndex((p) => p.id === product.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = cartProduct;
          return updated;
        }
        return [...prev, cartProduct];
      });
    },
    [productQuantities, supplier, isProductOutOfStock]
  );

  const handleQuantityChange = useCallback(
    (productId: string, value: string) => {
      if (value === "") {
        setProductQuantities((prev) => ({
          ...prev,
          [productId]: 0,
        }));
        return;
      }

      const quantity = parseInt(value, 10);
      if (isNaN(quantity) || quantity < 1) {
        return;
      }

      setProductQuantities((prev) => ({
        ...prev,
        [productId]: quantity,
      }));

      setSelectedProducts((prev) =>
        prev.map((product) => {
          if (product.id === productId) {
            const unitPrice =
              parseFloat(product.product_retail_price) ||
              parseFloat(product.unitPrice) ||
              0;
            const totalAmount = quantity * unitPrice;
            return {
              ...product,
              quantity: quantity,
              totalAmount: totalAmount,
              totalOrderValue: totalAmount,
            };
          }
          return product;
        })
      );
    },
    []
  );

  const handleQuantityBlur = useCallback(
    (productId: string) => {
      const currentQuantity = productQuantities[productId];
      if (!currentQuantity || currentQuantity < 1) {
        setProductQuantities((prev) => ({
          ...prev,
          [productId]: 1,
        }));
      }
    },
    [productQuantities]
  );

  const handleRemoveFromCart = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    setProductQuantities((prev) => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
  }, []);

  const handleSaveAndProceed = useCallback(() => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product");
      return;
    }
    onSaveAndProceed(selectedProducts);
  }, [selectedProducts, onSaveAndProceed]);

  const isProductInCart = useCallback(
    (productId: string) =>
      selectedProducts.some((product) => product.id === productId),
    [selectedProducts]
  );

  const totalCartValue = useMemo(() => {
    return selectedProducts.reduce(
      (sum, product) => sum + (Number(product.totalOrderValue) || 0),
      0
    );
  }, [selectedProducts]);

  const columns = useMemo(
    () => [
      {
        header: "Product Name",
        accessorKey: "product_name",
        cell: ({ row }: any) => (
          <div className="flex gap-2 items-center">
            <Image
              src={row.original.product_image || productImage}
              alt="product_image"
              width={40}
              height={40}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <Typography className="text-black text-sm font-medium">
                {row.original.product_name}
              </Typography>
              <Typography
                className={`text-xs ${
                  isProductOutOfStock(row.original)
                    ? "text-red-500 font-medium"
                    : "text-gray_3"
                }`}
              >
                {isProductOutOfStock(row.original)
                  ? "Out of Stock"
                  : `Stock: ${row.original.product_stock_level || 0}`}
              </Typography>
            </div>
          </div>
        ),
      },
      {
        header: "Unit Price(GHS)",
        accessorKey: "product_retail_price",
        cell: ({ row }: any) => (
          <Typography className="text-black text-sm">
            GHS{" "}
            {formatNumber(parseFloat(row.original.product_retail_price) || 0)}
          </Typography>
        ),
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        cell: ({ row }: any) => (
          <Input
            crossOrigin=""
            type="number"
            className="w-20"
            min="1"
            value={productQuantities[row.original.id] || 1}
            onChange={(e) =>
              handleQuantityChange(row.original.id, e.target.value)
            }
            onBlur={() => handleQuantityBlur(row.original.id)}
            disabled={isProductOutOfStock(row.original)}
          />
        ),
      },
      {
        header: "Total",
        accessorKey: "totalAmount",
        cell: ({ row }: any) => {
          const quantity = productQuantities[row.original.id] || 1;
          const unitPrice = parseFloat(row.original.product_retail_price) || 0;
          const total = quantity * unitPrice;

          return (
            <Typography className="font-medium text-sm text-black">
              GHS {formatNumber(total)}
            </Typography>
          );
        },
      },
      {
        accessorKey: "view",
        cell: ({ row }: any) => (
          <div className="flex items-center gap-2">
            {isProductInCart(row.original.id) ? (
              <Button
                className="border bg-red-50 normal-case py-2 text-red-600 border-red-200"
                onClick={() => handleRemoveFromCart(row.original.id)}
              >
                <Typography className="text-sm font-normal">Remove</Typography>
              </Button>
            ) : (
              <Button
                className={`border normal-case py-2 ${
                  isProductOutOfStock(row.original)
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-inherit text-pry2 border-pry2"
                }`}
                onClick={() => handleAddToCart(row.original)}
                disabled={isProductOutOfStock(row.original)}
              >
                <Typography className="text-sm font-normal">
                  {isProductOutOfStock(row.original)
                    ? "Out of Stock"
                    : "Add To Cart"}
                </Typography>
              </Button>
            )}
          </div>
        ),
      },
    ],
    [
      productQuantities,
      handleQuantityChange,
      handleQuantityBlur,
      isProductInCart,
      handleAddToCart,
      handleRemoveFromCart,
      isProductOutOfStock,
    ]
  );

  return (
    <Dialog open={isOpen} size="xl" handler={() => {}} className="p-2">
      <DialogHeader className="flex flex-col">
        <div className="flex gap-2 items-center justify-start w-full">
          <IconButton variant="text" onClick={handleBack}>
            <ArrowLeft />
          </IconButton>
          <Typography className="text-xl text-black font-bold">Back</Typography>
        </div>

        <div className="w-full mt-4 rounded-md bg-[#F8FAFB] h-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <Typography variant="small" className="text-gray-600">
                Supplier
              </Typography>
              <Typography variant="h5" className="font-bold">
                {`${supplier?.name || "Supplier's"} Storefront`}
                {isEdit && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    (Editing)
                  </span>
                )}
              </Typography>
            </div>

            <div className="flex items-center bg-white rounded-full px-3 py-2 border border-gray-300">
              <ShoppingCart size={18} className="mr-2" />
              <Typography className="mr-2 font-normal">Order</Typography>
              <div className="bg-[#7F1B14] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {selectedProducts?.length}
              </div>
            </div>
          </div>

          {selectedProducts?.length > 0 && (
            <div className="mt-3 p-3 bg-white rounded-lg border">
              <Typography className="text-sm font-medium mb-2">
                Cart Summary ({selectedProducts?.length} items)
              </Typography>
              <div className="flex justify-between items-center">
                <Typography className="text-sm text-gray-600">
                  Total Value:
                </Typography>
                <Typography className="font-bold text-lg">
                  GHS {formatNumber(totalCartValue)}
                </Typography>
              </div>
            </div>
          )}
        </div>
      </DialogHeader>

      <DialogBody className="max-h-96 overflow-y-auto">
        <div className="mb-4">
          <FormInput
            placeholder="Search products..."
            bgColor="white"
            paddingX="6"
            paddingY="2"
            icon={<Search color={colors.gray_3} />}
            iconPosition="left"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isSuppliersProductLoading ? (
          <div className="text-center py-8">
            <Typography className="text-gray-500">
              Loading products...
            </Typography>
          </div>
        ) : filteredProducts?.length > 0 ? (
          <TanTable
            columnData={columns}
            data={filteredProducts}
            length={filteredProducts?.length}
          />
        ) : (
          <div className="text-center py-8">
            <Typography className="text-gray-500">
              {searchTerm
                ? `No products found matching "${searchTerm}"`
                : "No products available"}
            </Typography>
          </div>
        )}
      </DialogBody>

      <DialogFooter>
        <div className="flex justify-between items-center w-full">
          <Typography className="text-sm text-gray-600">
            {selectedProducts?.length} product(s) selected • Total: GHS{" "}
            {formatNumber(totalCartValue)}
          </Typography>
          <div className="flex gap-4">
            <Button
              onClick={onClose}
              className="bg-gray-100 text-gray-700 normal-case"
            >
              <Typography className="text-sm">Cancel</Typography>
            </Button>
            <Button
              onClick={handleSaveAndProceed}
              className="bg-pry2 text-white normal-case"
              disabled={selectedProducts?.length === 0}
            >
              <Typography className="text-sm">
                {isEdit ? "Update" : "Save"} & Proceed (
                {selectedProducts?.length})
              </Typography>
            </Button>
          </div>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default SupplierStoreFront;
