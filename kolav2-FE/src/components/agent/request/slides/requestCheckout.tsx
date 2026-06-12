"use client";
import { FormInput } from "@/components/General/form";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Navigation, Minus, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Trash } from "@phosphor-icons/react";
import { useAuth } from "@/context/authContext";
import { useAgent } from "@/context/agentContext";

const RequestCheckout = () => {
  const {
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
    nextAgentRequestSlide,
  } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Reset local state when global state is cleared
  useEffect(() => {
    if (shopperProfileSaleInputs.products.length === 0 && deliveryAddress) {
      setDeliveryAddress("");
    }
  }, [shopperProfileSaleInputs.products.length, deliveryAddress]);

  const { handleAgentRequest, isAgentRequestCreating } = useAgent();

  const products = shopperProfileSaleInputs.products.map((item) => ({
    id: item.product_id,
    title: item.name,
    subtitle: item.description,
    weight: item.weight,
    price: item.unit_price,
    quantity: item.quantity,
    image: item.image,
  }));

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedProducts = shopperProfileSaleInputs.products.map((item) =>
      item.product_id === productId
        ? {
            ...item,
            quantity: newQuantity,
            total_price: item.unit_price * newQuantity,
          }
        : item
    );

    setShopperProfileSaleInputs((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const handleRemoveProduct = (productId: string) => {
    const updatedProducts = shopperProfileSaleInputs.products.filter(
      (item) => item.product_id !== productId
    );
    setShopperProfileSaleInputs((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const calculateTotal = () => {
    return shopperProfileSaleInputs.products.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );
  };

  const prepareRequestPayload = () => {
    const transformedProducts = shopperProfileSaleInputs.products.map(
      (item) => ({
        product_id: item.product_id,
        item_type: item.item_type || "",
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.unit_price * item.quantity,
      })
    );

    return {
      location: deliveryAddress,
      request_date: new Date().toISOString().split("T")[0],
      products: transformedProducts,
    };
  };

  const handleSubmit = () => {
    const formPayload = prepareRequestPayload();
    handleAgentRequest(formPayload, () => {
      setShopperProfileSaleInputs((prev) => ({
        ...prev,
        products: [],
      }));
      setDeliveryAddress("");
      nextAgentRequestSlide();
    });
  };

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
        <div>
          <FormInput
            required
            label="Add Delivery Address"
            className="w-full"
            value={deliveryAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDeliveryAddress(e.target.value)
            }
          />
          <button className="flex mt-3 items-center text-[#4AA2AB] gap-2">
            <Navigation size={20} />
            <p className="text-xs font-semibold">Use current location</p>
          </button>
        </div>

        <div className="p-6 w-full m-auto mt-11 bg-white shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-lg">
          {products.map((product) => (
            <div
              className="flex gap-4 mb-6 pb-3 border-b border-gray-200"
              key={product.id}
            >
              <div className="relative w-20 h-20 overflow-hidden bg-gray_1 p-4">
                <Image
                  src={product.image}
                  alt="product"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Typography className="font-semibold text-gray-900">
                      {product.title}{" "}
                      <span className="font-normal text-sm text-gray_4">
                        {product.subtitle}
                      </span>
                    </Typography>
                    <Typography className="text-sm text-gray-600">
                      {product.weight}
                    </Typography>
                    <Typography className="text-md font-semibold text-[#B87C16] mt-1">
                      GHS {product.price}
                    </Typography>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <IconButton
                      variant="text"
                      className="hover:bg-red-50"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      <Trash size={24} color="#6D7280" />
                    </IconButton>

                    <div className="flex gap-x-1 mt-5 items-center">
                      <Typography className="text-[#6D7280]">Qty</Typography>
                      <div className="flex items-center border border-[#F1F1F1] rounded">
                        <IconButton
                          className="border-r border-[#F1F1F1] p-0.5 rounded-none min-w-0 w-8 h-6"
                          variant="text"
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity - 1
                            )
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
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.quantity + 1
                            )
                          }
                        >
                          <Plus size={12} stroke="#374151" strokeWidth={2} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue_pry normal-case text-sm flex justify-center hover:bg-blue_pry text-white font-medium py-3 rounded-lg mt-10"
          disabled={!deliveryAddress.trim()}
          loading={isAgentRequestCreating}
        >
          Place Request
        </Button>
      </section>
    </main>
  );
};

export default RequestCheckout;
