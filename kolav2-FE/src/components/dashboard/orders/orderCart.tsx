import React from "react";
import FlyoutLayout from "@/components/General/flyoutLayout";
import MyOrderCart from "./myOrderCart";

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

interface OrderCartProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

function OrderCart({
  isRightDrawerOpen,
  closeFlyout,
  cart,
  setCart,
}: OrderCartProps) {
  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={closeFlyout}
      heading="My Cart"
      showButtons={false}
    >
      <MyOrderCart 
        cart={cart}
        setCart={setCart}
        closeFlyout={closeFlyout} 
      />
    </FlyoutLayout>
  );
}

export default OrderCart;
