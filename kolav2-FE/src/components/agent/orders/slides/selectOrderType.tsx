import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useAgent } from "@/context/agentContext";
import { useDispatch } from "react-redux";
import { setSuppliersProducts } from "@/Redux/features/agentSlice";

const SelectOrderType = () => {
  const {
    prevOrderSaleSlide,
    nextOrderSaleSlide,
    goToOrderSaleSlide,
    setShopperProfileSaleInputs,
    shopperProfileSaleInputs,
    setSelectedProducts,
  } = useAgent();

  const dispatch = useDispatch();
  const [selectedStock, setSelectedStock] = useState<any>(null);

  useEffect(() => {
    if (!shopperProfileSaleInputs.supplier_type) {
      setSelectedStock(null);
    }
  }, [shopperProfileSaleInputs.supplier_type]);

  const stockTypes = [
    { name: "My Stock", value: "my_stock" },
    { name: "Suppliers Stock", value: "suppliers_stock" },
  ];

  const handleSelectStock = (stock: any) => {
    setSelectedStock(stock);
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      supplier_type: stock.value,
      ...(stock.value === "my_stock" && {
        customer_entity_id: undefined,
        customer_entity_type: undefined,
        supplier_id: undefined,
        products: [],
      }),
    }));

    if (stock.value === "my_stock") {
      dispatch(setSuppliersProducts([]));
      setSelectedProducts([]);
    }
  };

  const handleContinue = () => {
    if (selectedStock.value === "my_stock") {
      goToOrderSaleSlide(5);
    } else {
      nextOrderSaleSlide();
    }
  };

  return (
    <div>
      <p className="text-xl font-medium mb-6">Place New Order</p>
      <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
            onClick={prevOrderSaleSlide}
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </div>
          <p className="text-lg font-medium text-[#5A5555]">Select Order</p>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4">
          {stockTypes.map((stock) => (
            <div
              key={stock.value}
              onClick={() => handleSelectStock(stock)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                selectedStock?.value === stock.value
                  ? "border-pry2 bg-[#EAF3FF]"
                  : "border-gray-200"
              }`}
            >
              <div className="flex-grow text-[#787486]">
                <p className="font-medium text-gray-900">{stock.name}</p>
              </div>

              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  selectedStock?.value === stock.value
                    ? "border-pry2"
                    : "border-gray-300"
                }`}
              >
                {selectedStock?.value === stock.value && (
                  <div className="w-3 h-3 rounded-full bg-pry2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={handleContinue}
            disabled={!selectedStock}
          >
            <Typography className="text-white font-normal">Continue</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectOrderType;
