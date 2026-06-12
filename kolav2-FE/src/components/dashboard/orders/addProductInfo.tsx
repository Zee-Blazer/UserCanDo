"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { ShoppingCart, ChevronUp, ChevronDown } from "lucide-react";
import TanTable from "@/components/General/TanTable";
import Image from "next/image";
import { FormSelect } from "@/components/General/form";
import CartImage from "@/assets/images/bag2.png";
import CartSummary from "./cartOrderSummary";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

interface CartItem {
  id: string;
  product: string;
  product_name?: string;
  quantity: number;
  unit: string;
  price: number;
  product_retail_price?: number;
  discount: number;
  discountAmount: number;
  amount?: number;
  total: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isOrderCartOpen: boolean;
  setIsOrderCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSupplierEntityId: string;
  selectedSupplierName: string;
}

const AddProductInfo = ({
  cart,
  setCart,
  setIsOrderCartOpen,
  selectedSupplierEntityId,
  selectedSupplierName,
}: CartSummaryProps) => {
  const { suppliersProduct } = useDashboardSelector();
  const { loadSuppliersProducts, isSuppliersProductLoading } = useDash();
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [productUnits, setProductUnits] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    if (selectedSupplierEntityId?.trim()) {
      loadSuppliersProducts(selectedSupplierEntityId, true);
    }
  }, [selectedSupplierEntityId, loadSuppliersProducts]);

  useEffect(() => {
    setProductQuantities({});
    setProductUnits({});
  }, [selectedSupplierEntityId]);

  const tableData =
    suppliersProduct?.map((product: any) => ({
      id: product?.id,
      product: product?.product_name,
      price: parseFloat(
        product?.product_retail_price || product?.product_wholesale_price || 0
      ),
      quantity: productQuantities[product?.id] || 0,
      item:
        productUnits[product?.id] || product?.product_package_type || "Pieces",
      discount:
        product?.product_sale_discount_price &&
        parseFloat(product?.product_sale_discount_price) > 0
          ? ((parseFloat(
              product?.product_retail_price ||
                product?.product_wholesale_price ||
                0
            ) -
              parseFloat(product?.product_sale_discount_price)) /
              parseFloat(
                product?.product_retail_price ||
                  product?.product_wholesale_price ||
                  1
              )) *
            100
          : 0,
      product_image: product?.product_image,
      stock: product?.product_stock_level || 0,
    })) || [];

  const columns = [
    {
      header: "Product",
      accessorKey: "product",
      cell: ({ row }: any) => (
        <div className="flex items-center">
          <Image
            src={row?.original?.product_image || CartImage}
            alt="No image available"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-1">
            <Typography className="font-sm font-inter">
              {row?.original?.product}
            </Typography>
            <Typography className="text-xs text-gray-500">
              Stock: {row?.original?.stock}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }: any) => (
        <div className="flex justify-between border border-[#D5D8DC] rounded-lg py-3 px-3.5 items-center">
          <Typography className="font-sm">
            {row?.original?.price?.toFixed(2)}
          </Typography>
          <Typography className="text-[#6F6F6F] font-sm">GHS</Typography>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: ({ row }: any) => {
        const { id, quantity, stock } = row?.original || {};
        const updateQuantity = (delta: number) => {
          const newQuantity = Math.max(
            0,
            Math.min(stock || 0, (quantity || 0) + delta)
          );
          setProductQuantities((prev) => ({
            ...prev,
            [id]: newQuantity,
          }));
        };

        return (
          <div className="flex justify-between border border-[#D5D8DC] rounded-lg px-3.5 items-center">
            <Typography className="font-sm py-3">{quantity}</Typography>
            <div>
              <ChevronUp
                onClick={() => updateQuantity(1)}
                className={`h-6 cursor-pointer ${
                  (quantity || 0) >= (stock || 0)
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#292D32]"
                }`}
              />
              <ChevronDown
                onClick={() => updateQuantity(-1)}
                className="h-6 cursor-pointer text-[#292D32]"
              />
            </div>
          </div>
        );
      },
    },
    {
      header: "Item type",
      accessorKey: "item",
      cell: ({ row }: any) => {
        const { id, item } = row?.original || {};
        const handleChange = (e: any) => {
          setProductUnits((prev) => ({
            ...prev,
            [id]: e?.target?.value,
          }));
        };

        return (
          <FormSelect
            name="item"
            options={["Cases", "Pieces", "Box"]}
            value={item}
            onSelect={handleChange}
            paddingY="4"
            bgColor="#FFFFFF"
          />
        );
      },
    },
    {
      header: "Discount %",
      accessorKey: "discount",
      cell: ({ row }: any) => (
        <div className="flex justify-between border border-[#D5D8DC] rounded-lg py-3 px-3.5 items-center">
          <Typography className="font-sm">
            {row?.original?.discount?.toFixed(2)}
          </Typography>
          <Typography className="text-[#6F6F6F] font-sm">%</Typography>
        </div>
      ),
    },
    {
      header: "Discount Amount",
      accessorKey: "discount_amount",
      cell: ({ row }: any) => {
        const { price, quantity, discount } = row?.original || {};
        const discountAmount =
          (price || 0) * (quantity || 0) * ((discount || 0) / 100);
        return (
          <div className="flex justify-between border border-[#D5D8DC] rounded-lg py-3 px-3.5 items-center">
            <Typography className="font-sm">
              {discountAmount.toFixed(2)}
            </Typography>
            <Typography className="text-[#6F6F6F] font-sm">GHS</Typography>
          </div>
        );
      },
    },
    {
      header: "Total(GHS)",
      accessorKey: "total",
      cell: ({ row }: any) => {
        const { price, quantity, discount } = row?.original || {};
        const total =
          (price || 0) * (quantity || 0) * (1 - (discount || 0) / 100);
        return (
          <div className="text-right">
            <Typography className="font-sm font-semibold">
              {total.toFixed(2)}
            </Typography>
          </div>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }: any) => {
        const rowData = row?.original || {};
        const isInCart = cart?.some((item) => item?.id === rowData?.id);
        const isOutOfStock = (rowData?.stock || 0) === 0;
        const isQuantityZero = (rowData?.quantity || 0) === 0;

        const handleAddToCart = () => {
          if ((rowData?.quantity || 0) === 0 || isOutOfStock) return;

          const total = (rowData?.price || 0) * (rowData?.quantity || 0);
          const discountAmount = (total * (rowData?.discount || 0)) / 100;
          const finalAmount = total - discountAmount;

          const cartItem: CartItem = {
            id: rowData?.id,
            product: rowData?.product,
            quantity: rowData?.quantity || 0,
            unit: rowData?.item,
            price: rowData?.price || 0,
            discount: rowData?.discount || 0,
            discountAmount,
            total: finalAmount,
          };

          if (!isInCart) {
            setCart((prev) => [...(prev || []), cartItem]);
          } else {
            setCart((prev) =>
              (prev || []).map((item) =>
                item?.id === rowData?.id ? cartItem : item
              )
            );
          }
        };

        if (isOutOfStock) {
          return (
            <Button
              className="border border-gray-300 text-gray-500 normal-case font-normal"
              disabled
            >
              Out of Stock
            </Button>
          );
        }

        return (
          <Button
            className={`border ${
              isInCart
                ? "bg-[#003366] text-white"
                : "border-[#003366] text-[#003366]"
            } normal-case font-normal ${
              isQuantityZero ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={isQuantityZero}
          >
            {isInCart ? "Item Added" : "Add To Cart"}
          </Button>
        );
      },
    },
  ];

  if (!selectedSupplierEntityId) {
    return (
      <div className="mt-10 mb-2">
        <div className="flex items-center justify-center bg-[#F8FAFB] px-6 py-12 rounded-lg mb-2.5">
          <div className="text-center">
            <Typography className="text-lg font-medium text-gray-600 mb-2">
              Please select a supplier first
            </Typography>
            <Typography className="text-sm text-gray-500">
              Go to Order Details and select a supplier to view their products
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 mb-2">
        <div className="flex items-center justify-between bg-[#F8FAFB] px-6 py-4 rounded-lg mb-2.5">
          <div>
            <Typography className="font-xs text-[#A3A7AB] font-inter">
              Supplier
            </Typography>
            <Typography className="text-xl font-bold font-inter mt-1">
              {selectedSupplierName || "Supplier's"} Storefront
            </Typography>
          </div>
          <div
            className="flex items-center bg-white py-2.5 px-4 rounded-[40px] border cursor-pointer"
            onClick={() => {
              if ((cart?.length || 0) > 0) {
                setIsRightDrawerOpen(true);
                setIsOrderCartOpen(true);
              }
            }}
          >
            <ShoppingCart />
            <Typography className="font-base ml-1">My Cart</Typography>
            {(cart?.length || 0) > 0 && (
              <div className="bg-[#7F1B14] w-6 h-6 rounded-full text-center text-[#FDFDFD] ml-2">
                <Typography>{cart?.length}</Typography>
              </div>
            )}
          </div>
        </div>

        <div>
          {isSuppliersProductLoading ? (
            <div className="text-center py-8">
              <Typography className="text-gray-500">
                Loading products...
              </Typography>
            </div>
          ) : (tableData?.length || 0) > 0 ? (
            <TanTable
              data={tableData}
              columnData={columns}
              showSearch
              searchMaxWidth={"100%"}
              searchPlaceholder="Type to add a product"
              length={5}
              loadingState={false}
            />
          ) : (
            <div className="text-center py-8">
              <Typography className="text-gray-500">
                No products available for this supplier
              </Typography>
            </div>
          )}
        </div>

        <CartSummary cart={cart} />
      </div>
    </>
  );
};

export default AddProductInfo;
