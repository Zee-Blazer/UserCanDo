import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useAgentSelector } from "@/Redux/selectors";
import { getInitials } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useAgent } from "@/context/agentContext";
import { useEffect } from "react";

const SelectCustomerSlide = () => {
  const {
    loadAgentCustomersData,
    prevOrderSaleSlide,
    nextOrderSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAgent();

  const { customers } = useAgentSelector();

  useEffect(() => {
    loadAgentCustomersData();
  }, [loadAgentCustomersData]);

  const handleSelectCustomers = (customer: any) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      customer_id: customer.customer_id,
      customer_entity_id: customer.customer_entity_id,
      main_type: customer.customer_entity_type,
      customer_entity_type: customer.customer_entity_type,
    }));
  };

  const isCustomerSelected = (customer: any) => {
    return (
      shopperProfileSaleInputs?.customer_entity_id ===
        customer.customer_entity_id &&
      shopperProfileSaleInputs?.customer_entity_type ===
        customer.customer_entity_type
    );
  };

  const handleContinue = () => {
    if (
      !shopperProfileSaleInputs?.customer_entity_id ||
      !shopperProfileSaleInputs?.customer_entity_type
    ) {
      return;
    }
    nextOrderSaleSlide();
  };

  const router = useRouter();

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
          <p className="text-lg font-medium text-[#5A5555]">Select Customer</p>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4">
          {customers?.map((customer) => (
            <div
              key={customer.id || customer.customer_entity_id}
              onClick={() =>
                customer.customer_entity_id && handleSelectCustomers(customer)
              }
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                isCustomerSelected(customer)
                  ? "border-pry2 bg-[#EAF3FF]"
                  : "border-gray-200"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                {getInitials(customer?.customer_name || "")}
              </div>
              <div className="flex-grow text-[#787486]">
                <p className="font-medium">{customer.customer_name}</p>
                <p className="text-sm">{customer.location}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  isCustomerSelected(customer)
                    ? "border-pry2"
                    : "border-gray-300"
                }`}
              >
                {isCustomerSelected(customer) && (
                  <div className="w-3 h-3 rounded-full bg-pry2"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={handleContinue}
            disabled={
              !shopperProfileSaleInputs?.customer_entity_id ||
              !shopperProfileSaleInputs?.customer_entity_type
            }
          >
            <Typography className="text-white font-normal">Continue</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectCustomerSlide;
