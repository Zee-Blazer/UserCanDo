import React from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { Button, Typography } from "@material-tailwind/react";
import { initialShopperSaleState } from "@/utils/initialStates";
import Image from "next/image";

const ReviewCartSlide = () => {
  const {
    prevSlide,
    nextShopperSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAuth();

  const cartItems = shopperProfileSaleInputs.products || [];

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      products: prevState.products.map((item) =>
        item.product_id === productId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.unit_price * newQuantity,
            }
          : item
      ),
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      products: prevState.products.filter(
        (item) => item.product_id !== productId
      ),
    }));
  };

  const handleAddSale = () => {
    setShopperProfileSaleInputs(initialShopperSaleState);
    nextShopperSaleSlide();
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.total_price || 0), 0);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-medium">Add Sale</p>
        <div className="flex p-4 w-full max-w-sm justify-between shadow-[0px_4px_8px_0px_#0000000F,0px_0px_4px_0px_#0000000A]">
          <span className="text-sm text-[#787486]">Total Cost</span>
          <span className="font-medium text-[#50555C]">
            GHS {calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="flex-1 overflow-auto">
          <div className="bg-white px-5 py-4 rounded-md shadow-[0px_4px_8px_0px_#0000000F,0px_0px_4px_0px_#0000000A] mb-4">
            <div
              className="flex items-center w-fit gap-2 cursor-pointer text-pry2 text-sm font-medium mb-4"
              onClick={prevSlide}
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.product_id}
                className="p-4 h-full flex justify-between border-b last:border-b-0"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover"
                    />
                  </div>
                  <div className="flex-grow space-y-1">
                    <p className="font-medium text-[#474A4E]">
                      {item.name || `Product ${item.product_id}`}
                    </p>
                    {item.description && (
                      <p className="text-sm text-[#474A4E]">
                        {item.description}
                      </p>
                    )}
                    {item.weight && (
                      <p className="text-xs text-[#6D7280]">{item.weight}</p>
                    )}
                    <p className="text-sm font-semibold text-[#B87C16]">
                      GHS {item.unit_price?.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <button
                    title="remove_item"
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    <Trash2 size={18} color="#6D7280" />
                  </button>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#6D7280] text-sm">Qty</span>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border text-sm text-[#6D7280] rounded-l-md"
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <div className="px-4 py-1 text-sm border-t border-b">
                        {item.quantity}
                      </div>
                      <button
                        className="px-2 py-1 text-sm text-[#6D7280] border rounded-r-md"
                        onClick={() =>
                          handleQuantityChange(
                            item.product_id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={handleAddSale}
            disabled={cartItems.length === 0}
          >
            <Typography className="text-white font-normal">Add Sale</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCartSlide;
