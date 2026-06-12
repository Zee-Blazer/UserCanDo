import { TrashIcon } from "@/assets/svg";
import { colors } from "@/constants/colors";
import { Typography } from "@material-tailwind/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PaymentChannelModal from "./modals/paymentChannelModal";
import { PaymentSuccessModal } from "./modals/paymentSuccessfullModal";
import ProductDiscountSection from "./productSection";

interface OrderDetailProps {
  cart: CartItem[];
  removeFromCart: (productId: string) => void;
  calculateTotal: () => number;
  updateQuantity: (productId: string, quantity: number) => void;
  selectedCustomer: CreateCustomerProps | null;
  onAbandonCartSuccess: () => void;
  onRestoreCart: (items: CartItem[]) => void;
  onCustomerSelected?: (customer: CreateCustomerProps) => void;
}

const OrderDetail = ({
  cart,
  removeFromCart,
  calculateTotal,
  updateQuantity,
  selectedCustomer,
  onAbandonCartSuccess,
  onRestoreCart,
  onCustomerSelected,
}: OrderDetailProps) => {
  const [isPaymentChannelOpen, setIsPaymentChannelOpen] = useState(false);
  const [isPaymentSuccessOpen, setIsPaymentSuccessOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [discountType, setDiscountType] = useState<string | null>(null);
  const [discountValue, setDiscountValue] = useState<number>(0);

  const handleOpenPaymentChannel = () => {
    setIsPaymentChannelOpen(true);
  };

  const handleClosePaymentChannel = () => {
    setIsPaymentChannelOpen(false);
  };

  const handleOpenPaymentSuccess = () => {
    handleClosePaymentChannel();
    setIsPaymentSuccessOpen(true);
  };

  const handleClosePaymentSuccess = () => {
    setIsPaymentSuccessOpen(false);
    setDiscountValue(0);
    setDiscountType(null);
    onAbandonCartSuccess();
  };

  const toggleItemExpand = (productId: string) => {
    setExpandedItems({
      ...expandedItems,
      [productId]: !expandedItems[productId],
    });
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const numericValue = parseInt(value);

    if (!isNaN(numericValue) && numericValue > 0) {
      const currentItem = cart?.find((item) => item?.id === productId);
      if (currentItem?.quantity === 0 && value?.length === 1) {
        updateQuantity(productId, numericValue);
      } else {
        updateQuantity(productId, numericValue);
      }
    } else {
      updateQuantity(productId, 1);
    }
  };

  const handleDiscountUpdate = (type: string | null, value: number) => {
    setDiscountType(type);
    setDiscountValue(value);
  };

  return (
    <main className="mt-3 relative min-h-screen">
      <div className="py-4 border-b-[1px] border-b-gray-200">
        <Typography className="text-md font-medium">Order Details</Typography>
      </div>
      <section className="max-h-[calc(90vh-300px)] overflow-y-auto">
        {cart?.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No items in cart</div>
        ) : (
          cart?.map((item) => (
            <div
              key={item?.id}
              className="border mt-2 rounded-md border-gray_2 px-3 py-2"
            >
              <div className="flex w-full justify-between items-center">
                <Typography className="text-gray_5 font-normal">
                  {item?.product_name}
                </Typography>
                <div className="flex gap-2">
                  <button onClick={() => removeFromCart(item?.id)}>
                    <TrashIcon />
                  </button>
                  <button onClick={() => toggleItemExpand(item?.id)}>
                    {expandedItems[item?.id] ? (
                      <ChevronUp color={colors?.gray_4} />
                    ) : (
                      <ChevronDown color={colors?.gray_4} />
                    )}
                  </button>
                </div>
              </div>

              {expandedItems[item?.id] && (
                <div className="h-auto p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">Quantity</span>
                      <input
                        type="number"
                        min="1"
                        value={item?.quantity === 0 ? "" : item?.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item?.id, e?.target?.value)
                        }
                        className="border border-gray-300 rounded-md p-1 w-16 text-center"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Unit Price</span>
                      GHS {Number(item?.product_retail_price)?.toFixed(2)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Total</span>
                      <span className="text-sm">
                        GHS{" "}
                        {(item?.product_retail_price * item?.quantity)?.toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <section className="absolute bottom-4 w-full">
        <ProductDiscountSection
          handleOpenPaymentChannel={handleOpenPaymentChannel}
          cartTotal={calculateTotal()}
          cartItems={cart}
          selectedCustomer={selectedCustomer}
          onAbandonCartSuccess={onAbandonCartSuccess}
          onDiscountUpdate={handleDiscountUpdate}
          onRestoreCart={onRestoreCart}
          onCustomerSelected={onCustomerSelected}
        />
      </section>

      <PaymentChannelModal
        open={isPaymentChannelOpen}
        onClose={handleClosePaymentChannel}
        onSuccess={handleOpenPaymentSuccess}
        cartItems={cart}
        selectedCustomer={selectedCustomer}
        discountType={discountType}
        discountValue={discountValue}
      />

      <PaymentSuccessModal
        isSuccess={isPaymentSuccessOpen}
        onClose={handleClosePaymentSuccess}
      />
    </main>
  );
};

export default OrderDetail;
