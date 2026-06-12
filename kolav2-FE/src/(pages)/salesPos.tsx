"use client";
import OrderDetail from "@/components/dashboard/salesPos/orderDetail";
import ProductTable from "@/components/dashboard/salesPos/productTable";
import SalePosHeader from "@/components/dashboard/salesPos/salePosHeader";
import All from "@/components/dashboard/salesPos/products/all";
import Fashion from "@/components/dashboard/salesPos/products/fashion";
import AutoMobile from "@/components/dashboard/salesPos/products/autoMobile";
import Electronics from "@/components/dashboard/salesPos/products/electronics";
import Sport from "@/components/dashboard/salesPos/products/sport";
import Home from "@/components/dashboard/salesPos/products/home";
import { useState } from "react";
import Uncategorized from "@/components/dashboard/salesPos/products/uncategorized";

export const initialCartState: CartItem[] = [];

const SalesPos = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>(initialCartState);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CreateCustomerProps | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: CartItem) => {
    const existingItem = cart?.find((item) => item?.id === product?.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart?.filter((item) => item?.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(
      cart.map((item) =>
        item?.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const calculateTotal = (): number => {
    return cart?.reduce(
      (total, item) => total + item?.product_retail_price * item?.quantity,
      0
    );
  };

  const handleCustomerSelected = (customer: CreateCustomerProps) => {
    setSelectedCustomer(customer);
  };

  const handleAbandonCartSuccess = () => {
    setCart(initialCartState);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      setActiveTabIndex(0);
    }
  };

  const handleRestoreCart = (restoredItems: CartItem[]) => {
    setCart(restoredItems);
  };

  return (
    <main className="p-6">
      <SalePosHeader
        selectedCustomer={selectedCustomer}
        onCustomerSelected={handleCustomerSelected}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <div className="grid overflow-auto grid-cols-1 md:grid-cols-12 gap-2 md:gap-10">
        <div className="md:col-span-7 overflow-x-auto">
          <ProductTable
            activeIndex={activeTabIndex}
            setActiveIndex={setActiveTabIndex}
          />
          <div className="mt-4">
            {activeTabIndex === 0 && (
              <All addToCart={addToCart} searchQuery={searchQuery} />
            )}
            {activeTabIndex === 1 && <Fashion addToCart={addToCart} />}
            {activeTabIndex === 2 && <Electronics addToCart={addToCart} />}
            {activeTabIndex === 3 && <AutoMobile addToCart={addToCart} />}
            {activeTabIndex === 4 && <Sport addToCart={addToCart} />}
            {activeTabIndex === 5 && <Home addToCart={addToCart} />}
            {activeTabIndex === 6 && <Uncategorized addToCart={addToCart} />}
          </div>
        </div>
        <div className="md:col-span-5">
          <OrderDetail
            cart={cart}
            removeFromCart={removeFromCart}
            calculateTotal={calculateTotal}
            updateQuantity={updateQuantity}
            selectedCustomer={selectedCustomer}
            onAbandonCartSuccess={handleAbandonCartSuccess}
            onRestoreCart={handleRestoreCart}
            onCustomerSelected={handleCustomerSelected}
          />
        </div>
      </div>
    </main>
  );
};

export default SalesPos;
