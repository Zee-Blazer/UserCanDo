"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useShopper } from "@/context/shopperContext";
import EmptyCart from "@/components/shoppers/cart/emptyCart";
import GeneralCartView from "@/components/shoppers/cart/generalCartView";
import VendorCartView from "@/components/shoppers/cart/vendorCartView";
import CartCheckoutView from "@/components/shoppers/cart/cartCheckoutView";
import OrderSuccessful from "@/components/shoppers/cart/orderSuccessful";

const CartPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const { cartItems } = useSelector((state: RootState) => state.shopper);
  const { isCartLoading } = useShopper();

  useEffect(() => {
    if (cartItems?.length > 0) {
      setActiveTabIndex(1);
    } else {
      setActiveTabIndex(0);
    }
  }, [cartItems]);

  function updateActiveTabIndex(value: number) {
    setActiveTabIndex(value);
  }

  const handleSelectVendor = (vendorName: string) => {
    setSelectedVendor(vendorName);
  };

  if (isCartLoading) {
    return <div>Loading...</div>;
  }

  const selectedVendorItems = selectedVendor
    ? cartItems?.filter((vendor) => vendor.vendor_name === selectedVendor)
    : cartItems;

  return (
    <main className="pb-10">
      {activeTabIndex === 0 && (!cartItems || cartItems.length === 0) && (
        <EmptyCart updateActiveTabIndex={updateActiveTabIndex} />
      )}
      {activeTabIndex === 1 && cartItems && cartItems.length > 0 && (
        <GeneralCartView
          updateActiveTabIndex={updateActiveTabIndex}
          cartItems={cartItems}
          onSelectVendor={handleSelectVendor}
        />
      )}
      {activeTabIndex === 2 && (
        <VendorCartView
          updateActiveTabIndex={updateActiveTabIndex}
          cartItems={selectedVendorItems}
        />
      )}
      {activeTabIndex === 3 && (
        <CartCheckoutView updateActiveTabIndex={updateActiveTabIndex} />
      )}
      {activeTabIndex === 4 && <OrderSuccessful />}
    </main>
  );
};

export default CartPage;
