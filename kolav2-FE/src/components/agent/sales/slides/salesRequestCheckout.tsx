"use client";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import productImage from "@/assets/images/crunch.png";
import { Trash } from "@phosphor-icons/react";
import { useAuth } from "@/context/authContext";
import { useAgent } from "@/context/agentContext";

interface ProductWithQuantity extends Product {
  quantity: number;
  selectedUnit: "case" | "pieces";
}

const SalesRequestCheckout = () => {
  const {
    nextAgentRequestSlide,
    selectedProducts,
    removeProduct,
    shopperProfileSaleInputs,
  } = useAuth();

  const { handleCreateSale, isSaleCreating } = useAgent();

  const [productsWithQuantity, setProductsWithQuantity] = useState<
    ProductWithQuantity[]
  >(
    selectedProducts.map((product) => ({
      ...product,
      quantity: 1,
      selectedUnit: "case" as "case" | "pieces",
    }))
  );

  const updateProductQuantity = (productId: string, change: number) => {
    setProductsWithQuantity((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
    );
  };

  const updateProductUnit = (productId: string, unit: "case" | "pieces") => {
    setProductsWithQuantity((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, selectedUnit: unit } : product
      )
    );
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
    setProductsWithQuantity((prev) => prev.filter((p) => p.id !== productId));
  };

  const calculateTotal = () => {
    return productsWithQuantity.reduce((total, product: any) => {
      return (
        total + parseFloat(product?.product_retail_price) * product.quantity
      );
    }, 0);
  };

  const handlePlaceRequest = async () => {
    if (productsWithQuantity.length === 0) {
      return;
    }

    try {
      const salePayload = {
        customer_id: shopperProfileSaleInputs.customer_id,
        sales_type: shopperProfileSaleInputs.sale_type,
        payment_mode: shopperProfileSaleInputs.payment_mode || "cash",
        products: productsWithQuantity.map((product) => ({
          product_id: product.id,
          quantity: product.quantity,
          product_type: product.selectedUnit,
        })),
      };

      await handleCreateSale(salePayload, () => {
        nextAgentRequestSlide();
      });
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  React.useEffect(() => {
    setProductsWithQuantity((prev) => {
      const existingIds = prev.map((p) => p.id);
      const newProducts = selectedProducts
        .filter((product) => !existingIds.includes(product.id))
        .map((product) => ({
          ...product,
          quantity: 1,
          selectedUnit: "case" as "case" | "pieces",
        }));

      return [
        ...prev.filter((p) => selectedProducts.some((sp) => sp.id === p.id)),
        ...newProducts,
      ];
    });
  }, [selectedProducts]);

  // Reset local state when global state is cleared
  useEffect(() => {
    if (selectedProducts.length === 0 && productsWithQuantity.length > 0) {
      setProductsWithQuantity([]);
    }
  }, [selectedProducts.length, productsWithQuantity.length]);

  return (
    <main>
      <header className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-medium">Request</Typography>
        <div className="w-96 shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] px-4 rounded-sm flex justify-between py-3">
          <Typography className="font-normal text-gray_4">
            Total Cost
          </Typography>
          <Typography className="font-semibold text-gray_5 text-lg">
            GHS {calculateTotal().toFixed(2)}
          </Typography>
        </div>
      </header>

      <section className="mt-10 max-w-3xl m-auto rounded-lg">
        <div className="p-6 w-full m-auto mt-11 bg-white shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-lg">
          {productsWithQuantity.length === 0 ? (
            <div className="text-center py-8">
              <Typography className="text-gray-500">
                No products selected
              </Typography>
            </div>
          ) : (
            productsWithQuantity.map((product) => (
              <div
                className="flex gap-4 mb-6 pb-3 border-b border-gray-200"
                key={product.id}
              >
                <div className="relative w-20 h-20 overflow-hidden bg-gray_1 p-4">
                  <Image
                    src={product.product_image || productImage}
                    alt="product"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Typography className="font-semibold text-gray-900">
                        {product.product_name}
                      </Typography>
                      <Typography className="text-sm text-gray-600">
                        {product.product_category_name}
                      </Typography>
                      <Typography className="text-md font-semibold text-[#B87C16] mt-1">
                        GHS {product.product_retail_price}
                      </Typography>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#F2F4F7] flex gap-2 items-center rounded-lg p-2 w-full md:w-auto">
                          <Button
                            className={`w-fit normal-case shadow-md py-1 rounded-lg text-center ${
                              product.selectedUnit === "case"
                                ? "bg-white"
                                : "shadow-none bg-inherit"
                            }`}
                            onClick={() =>
                              updateProductUnit(product.id, "case")
                            }
                          >
                            <Typography
                              className={`font-medium ${
                                product.selectedUnit === "case"
                                  ? "text-[#344054]"
                                  : "text-[#667085]"
                              }`}
                            >
                              Case
                            </Typography>
                          </Button>

                          <Button
                            className={`w-fit normal-case py-1 rounded-md text-center ${
                              product.selectedUnit === "pieces"
                                ? "bg-white shadow-md"
                                : "shadow-none bg-inherit"
                            }`}
                            onClick={() =>
                              updateProductUnit(product.id, "pieces")
                            }
                          >
                            <Typography
                              className={`font-medium ${
                                product.selectedUnit === "pieces"
                                  ? "text-[#344054]"
                                  : "text-[#667085]"
                              }`}
                            >
                              Pieces
                            </Typography>
                          </Button>
                        </div>
                        <IconButton
                          variant="text"
                          className="hover:bg-red-50"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          <Trash size={24} color="#6D7280" />
                        </IconButton>
                      </div>

                      <div className="flex gap-x-1 mt-5 items-center">
                        <Typography className="text-[#6D7280]">Qty</Typography>
                        <div className="flex items-center border border-[#F1F1F1] rounded">
                          <IconButton
                            className="border-r border-[#F1F1F1] p-0.5 rounded-none min-w-0 w-8 h-6"
                            variant="text"
                            onClick={() =>
                              updateProductQuantity(product.id, -1)
                            }
                          >
                            <Minus size={12} stroke="#374151" strokeWidth={2} />
                          </IconButton>
                          <Typography className="px-2 py-0.5 font-semibold text-[#474A4E] w-6 text-center text-xs">
                            {product.quantity}
                          </Typography>
                          <IconButton
                            className="border-l border-[#F1F1F1] p-0.5 rounded-none min-w-0 w-6 h-6"
                            variant="text"
                            onClick={() => updateProductQuantity(product.id, 1)}
                          >
                            <Plus size={12} stroke="#374151" strokeWidth={2} />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={handlePlaceRequest}
          loading={isSaleCreating}
          className="w-full bg-blue_pry normal-case flx justify-center text-sm hover:bg-blue_pry text-white font-medium py-3 rounded-lg mt-10"
          disabled={productsWithQuantity.length === 0 || isSaleCreating}
        >
          Place Request
        </Button>
      </section>
    </main>
  );
};

export default SalesRequestCheckout;
