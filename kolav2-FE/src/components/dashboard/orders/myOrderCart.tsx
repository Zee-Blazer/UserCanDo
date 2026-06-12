"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { CirclePlus, CircleMinus, Trash2 } from "lucide-react";
import CartSummary from "./cartOrderSummary";
import CartImage from "@/assets/images/bag2.png";

interface CartItem {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  discountAmount: number;
  total: number;
  amount?: number;
  product_name?: string;
  product_retail_price?: number;
}

interface MyOrderCartProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  closeFlyout: () => void;
}

const MyOrderCart = ({ cart, setCart, closeFlyout }: MyOrderCartProps) => {
  const handleQuantityChange = (id: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          const unitPrice = item.product_retail_price || item.price;
          const newTotal = unitPrice * newQuantity * (1 - item.discount / 100);
          const newDiscountAmount =
            unitPrice * newQuantity * (item.discount / 100);

          return {
            ...item,
            quantity: newQuantity,
            total: newTotal,
            amount: newTotal,
            discountAmount: newDiscountAmount,
          };
        }
        return item;
      });

      return updatedCart;
    });
  };

  const handleRemove = (id: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);

      if (updatedCart.length === 0) {
        closeFlyout();
      }
      return updatedCart;
    });
  };

  const getProductName = (item: CartItem) => {
    return item.product_name || item.product;
  };

  const getTotalAmount = (item: CartItem) => {
    return item.amount || item.total;
  };

  return (
    <div className="mt-6">
      <div className="border border-[#D5D8DC] rounded-lg">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border-t border-b border-t-[#D5D8DC] border-b-[#D5D8DC] mx-0.5"
          >
            <div className="flex items-center">
              <Image
                src={CartImage}
                alt="No image"
                width={56}
                height={56}
                className="rounded-full"
              />
              <div className="ml-3">
                <Typography className="font-base font-inter mb-1.5 text-[#101828]">
                  {getProductName(item)}
                </Typography>

                <div className="flex items-center text-[#1B1E21]">
                  <Typography className="text-[#6F6F6F]">Qty</Typography>
                  <CircleMinus
                    className="mx-2 cursor-pointer text-[#4B525A] hover:opacity-60"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  />
                  <Typography className="mx-0.5 text-sm font-bold">
                    {item.quantity}
                  </Typography>
                  <CirclePlus
                    className="mx-2 cursor-pointer text-[#4B525A] hover:opacity-60"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  />
                </div>
              </div>
            </div>

            <div>
              <Typography className="text-[#101828] font-base font-inter mb-1.5">
                GHS{" "}
                {getTotalAmount(item).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Typography>
              <div
                className="flex justify-end cursor-pointer hover:opacity-60"
                onClick={() => handleRemove(item.id)}
              >
                <Typography className="text-[#FF3729] mr-2">Remove</Typography>
                <Trash2 className="text-[#FF3729]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <CartSummary cart={cart} />
    </div>
  );
};

export default MyOrderCart;
