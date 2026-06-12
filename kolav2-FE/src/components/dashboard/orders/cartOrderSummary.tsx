"use client";

import { Typography } from "@material-tailwind/react";

interface CartItem {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  discountAmount: number;
  total: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  smallText?: boolean;
}

const CartSummary = ({ cart, smallText }: CartSummaryProps) => {
  const subtotal = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cart?.reduce((sum, item) => sum + item?.discountAmount, 0);
  const vatRate = 0;
  const vat = (subtotal - discount) * vatRate;
  const totalWithVat = subtotal - discount + vat;

  const summaryData = [
    { label: "Sub total", value: `GHS ${subtotal?.toFixed(2)}` },
    { label: `VAT ${vatRate * 100}%`, value: `${vat.toFixed(2)}` },
    { label: "Discount", value: `${discount?.toFixed(2)}` },
    { label: "Total + VAT-Discount", value: `GHS ${totalWithVat?.toFixed(2)}` },
  ];

  return (
    <div className="bg-[#F8FAFB] py-4 px-6 mt-5">
      {summaryData.map((item, index) => (
        <div
          key={item.label}
          className={`flex justify-between items-center ${
            index !== 0 ? "py-2" : ""
          }`}
        >
          <Typography className="text-[#7B8086] text-sm font-normal">
            {item.label}
          </Typography>
          <Typography className="text-[#1B1E21] text-md font-bold">
            {item.value}
          </Typography>
        </div>
      ))}

      <div className="flex justify-between items-center py-2 mt-2 border-t border-[#D5D8DC]">
        <Typography className="text-[#6F6F6F] text-sm">Total Amount</Typography>
        <Typography
          className={`font-bold ${
            smallText ? "text-base" : "text-2xl"
          } font-inter`}
        >
          GHS {totalWithVat?.toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};

export default CartSummary;
