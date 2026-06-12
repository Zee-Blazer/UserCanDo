import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useAuthSelector } from "@/Redux/selectors";

const SelectSaleTypeSlide = () => {
  const {
    prevSlide,
    nextShopperSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAuth();
  const { saleTypes } = useAuthSelector();

  const handleSelectType = (saleType: string) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      sale_type: saleType,
    }));
  };

  return (
    <div>
      <p className="text-xl font-medium mb-6">Add Sale</p>
      <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
            onClick={prevSlide}
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </div>
          <p className="text-lg font-medium text-[#5A5555]">Select Sale Type</p>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4">
          {saleTypes.map((saleType) => (
            <div
              key={saleType.value}
              onClick={() => handleSelectType(saleType.value)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer`}
            >
              <div className="flex-grow">
                <p className="font-medium text-[#787486] capitalize">
                  {saleType.value}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center ${
                  shopperProfileSaleInputs?.sale_type === saleType.value &&
                  "border-pry2"
                }`}
              >
                {shopperProfileSaleInputs?.sale_type === saleType.value && (
                  <div className="w-3 h-3 rounded-full bg-pry2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={nextShopperSaleSlide}
            disabled={!shopperProfileSaleInputs.sale_type}
          >
            <Typography className="text-white font-normal">Continue</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectSaleTypeSlide;
