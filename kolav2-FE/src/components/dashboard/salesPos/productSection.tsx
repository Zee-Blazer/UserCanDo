import { useState, useEffect } from "react";
import { Button, Radio, Typography } from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import ConfirmCartModal from "./modals/ConfirmCartModal";
import ResumeAbandonCartModal from "./modals/resumeAbandonCartModal";
import { useDash } from "@/context/dashboardContext";

interface ProductDiscountSectionProps {
  handleOpenPaymentChannel: () => void;
  cartTotal: number;
  cartItems: CartItem[];
  selectedCustomer: CreateCustomerProps | null;
  onAbandonCartSuccess: () => void;
  onDiscountUpdate: (type: string | null, value: number) => void;
  onRestoreCart: (items: CartItem[]) => void;
  onCustomerSelected?: (customer: CreateCustomerProps) => void;
}

const ProductDiscountSection = ({
  handleOpenPaymentChannel,
  cartTotal,
  cartItems,
  selectedCustomer,
  onAbandonCartSuccess,
  onDiscountUpdate,
  onRestoreCart,
  onCustomerSelected,
}: ProductDiscountSectionProps) => {
  const [discountType, setDiscountType] = useState<string | null>(null);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [isAbandonCartOpen, setIsAbandonCartOpen] = useState(false);
  const [isResumeCartOpen, setIsResumeCartOpen] = useState(false);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);
  const [calculatedDiscount, setCalculatedDiscount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const { isAbandonCartCreating, isAbandonCartDeleting } = useDash();

  const { handleCreateAbandonCart, handleDeleteAllAbandonCart } = useDash();

  const handleConfirmDeleteAllAbandonCart = () => {
    handleDeleteAllAbandonCart(() => {
      setIsClearCartModalOpen(false);
    });
  };

  useEffect(() => {
    if (discountType === "percentage" && discountValue) {
      setCalculatedDiscount((cartTotal * discountValue) / 100);
    } else if (discountType === "cash" && discountValue) {
      setCalculatedDiscount(discountValue);
    } else {
      setCalculatedDiscount(0);
    }
  }, [discountType, discountValue, cartTotal]);

  useEffect(() => {
    setFinalTotal(cartTotal - calculatedDiscount);
  }, [cartTotal, calculatedDiscount]);

  useEffect(() => {
    onDiscountUpdate(discountType, calculatedDiscount);
  }, [discountType, calculatedDiscount, onDiscountUpdate]);

  const handleDiscountTypeChange = (type: string) => {
    setDiscountType(type);
    setDiscountValue(0);
  };

  const setDiscountData = (type: string | null, value: number) => {
    setDiscountType(type);

    if (type === "percentage") {
      const percentageValue = (value / cartTotal) * 100;
      setDiscountValue(percentageValue);
    } else if (type === "cash") {
      setDiscountValue(value);
    } else {
      setDiscountValue(0);
    }
  };

  const handleDiscountValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e?.target?.value;
    const numericValue = parseFloat(inputValue);

    if (!isNaN(numericValue) && numericValue >= 0) {
      if (discountValue === 0 && inputValue?.length === 1) {
        setDiscountValue(numericValue);
      } else {
        setDiscountValue(numericValue);
      }
    } else {
      setDiscountValue(0);
    }
  };

  const handleOpenAbandonCart = () => {
    if (cartItems?.length === 0) {
      alert("Your cart is empty. Please add items before abandoning the cart.");
      return;
    }
    if (!selectedCustomer) {
      alert("Please select a customer before abandoning the cart.");
      return;
    }
    setIsAbandonCartOpen(true);
  };

  const handleCloseAbandonCart = () => {
    setIsAbandonCartOpen(false);
  };

  const handleConfirmAbandonCart = () => {
    const payload: any = {
      customer_id: selectedCustomer?.id || "",
      abandoned_date: new Date().toISOString(),
      discount_type: discountType || "none",
      discount_value: calculatedDiscount,
      customer_entity_type: selectedCustomer?.customer_entity_type,
      customer_entity_id: selectedCustomer?.customer_entity_id,
      products: cartItems?.map((item) => ({
        product_id: item?.id,
        quantity: item?.quantity,
        unit_price: item?.product_retail_price,
        total_price: item?.product_retail_price * item?.quantity,
      })),
    };

    handleCreateAbandonCart(payload, () => {
      handleCloseAbandonCart();
      setDiscountValue(0);
      setDiscountType(null);
      onAbandonCartSuccess();
    });
  };

  const handlePlaceSale = () => {
    if (cartItems?.length === 0) {
      alert("Your cart is empty. Please add items before placing a sale.");
      return;
    }
    if (!selectedCustomer) {
      alert("Please select a customer before placing a sale.");
      return;
    }
    handleOpenPaymentChannel();
  };

  return (
    <div>
      <Typography className="font-medium">Product Discount</Typography>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Radio
            crossOrigin=""
            name="type"
            color="blue"
            label={
              <span className="text-sm font-normal whitespace-nowrap">
                Add percentage discount
              </span>
            }
            className="text-sm"
            onChange={() => handleDiscountTypeChange("percentage")}
            checked={discountType === "percentage"}
          />
          <Radio
            crossOrigin=""
            name="type"
            color="blue"
            label={
              <span className="text-sm font-normal whitespace-nowrap">
                Add cash discount
              </span>
            }
            className="text-sm"
            onChange={() => handleDiscountTypeChange("cash")}
            checked={discountType === "cash"}
          />
        </div>
        {discountType && (
          <FormInput
            type="number"
            value={discountValue === 0 ? "" : discountValue}
            placeholder="0"
            onChange={handleDiscountValueChange}
            icon={
              <span className="text-gray-500">
                {discountType === "cash" ? (
                  <span className="text-sm">GHS</span>
                ) : (
                  "%"
                )}
              </span>
            }
            iconPosition="right"
            className="text-gray_3 py-2 rounded-md"
          />
        )}
      </div>
      <div className="flex mt-5 flex-col gap-2">
        <div className="flex font-normal text-pry2 justify-between">
          <Typography variant="small" className="font-normal">
            Sub total
          </Typography>
          <Typography variant="small" className="font-normal">
            GHS {cartTotal?.toFixed(2)}
          </Typography>
        </div>
        <div className="flex font-medium text-pry2 justify-between">
          <Typography variant="small" className="font-normal">
            Discount
          </Typography>
          <Typography variant="small" className="font-normal">
            -GHS {calculatedDiscount?.toFixed(2)}
          </Typography>
        </div>
        <div className="flex font-normal text-pry2 justify-between">
          <Typography variant="small" className="font-normal">
            Total
          </Typography>
          <Typography variant="small" className="font-normal">
            GHS {finalTotal?.toFixed(2)}
          </Typography>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleOpenAbandonCart}
            disabled={cartItems?.length === 0}
            className={`flex border gap-2 py-2 rounded-sm border-pry2 normal-case text-white ${
              cartItems?.length === 0 ? "bg-[#597A9C]" : "bg-pry2"
            } w-full justify-center font-normal items-center`}
          >
            Abandon Cart
          </Button>
          <Button
            onClick={() => setIsResumeCartOpen(true)}
            className="flex gap-2 py-2 rounded-sm normal-case text-white bg-pry2 w-full justify-center font-normal items-center"
          >
            Resume Abandoned Cart
          </Button>
        </div>
        <Button
          onClick={handlePlaceSale}
          disabled={cartItems?.length === 0}
          className={`flex border gap-2 py-2 rounded-sm border-pry2 normal-case text-white ${
            cartItems?.length === 0 ? "bg-[#597A9C]" : "bg-pry2"
          } w-full justify-center font-normal items-center`}
        >
          Place Sale
        </Button>
      </div>

      <ConfirmCartModal
        open={isAbandonCartOpen}
        onClose={handleCloseAbandonCart}
        onConfirm={handleConfirmAbandonCart}
        title="Abandon Cart"
        description="Are you sure you want to abandon this cart?"
        confirmButtonText="I'm Sure"
        loading={isAbandonCartCreating}
      />

      <ResumeAbandonCartModal
        open={isResumeCartOpen}
        onClose={() => setIsResumeCartOpen(false)}
        handleOpenClearCart={() => setIsClearCartModalOpen(true)}
        currentCartItems={cartItems}
        onRestoreCart={onRestoreCart}
        onDiscountUpdate={(type, value) => setDiscountData(type, value)}
        onCustomerSelected={onCustomerSelected}
      />

      <ConfirmCartModal
        open={isClearCartModalOpen}
        onClose={() => setIsClearCartModalOpen(false)}
        title="Clear All Cart"
        description="This will clear all carts permanently."
        confirmButtonText="Okay"
        loading={isAbandonCartDeleting}
        onConfirm={handleConfirmDeleteAllAbandonCart}
      />
    </div>
  );
};

export default ProductDiscountSection;
