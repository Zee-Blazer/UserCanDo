import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useAgentSelector } from "@/Redux/selectors";
import { getInitials } from "@/utils/helpers";
import { useAgent } from "@/context/agentContext";
import { useEffect } from "react";

const SelecteSupplierType = () => {
  const {
    loadAgentSuppliersData,
    prevOrderSaleSlide,
    nextOrderSaleSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
    getAllSuppliersProducts,
    setSelectedProducts,
  } = useAgent();
  const { supplier } = useAgentSelector();
  useEffect(() => {
    loadAgentSuppliersData();
  }, [loadAgentSuppliersData]);

  const handleSelectCustomers = (customer: any) => {
    setShopperProfileSaleInputs((prevState) => ({
      ...prevState,
      customer_entity_id: customer?.customer_entity_id,
      customer_entity_type: customer?.customer_entity_type,
      supplier_id: customer?.supplier_id,
      // Clear any existing products when switching suppliers
      products: [],
    }));

    // Clear global selected products when switching suppliers
    setSelectedProducts([]);
    getAllSuppliersProducts(customer.supplier_id);
  };

  const isCustomerSelected = (customer: any) => {
    return (
      shopperProfileSaleInputs?.customer_entity_id ===
        customer?.customer_entity_id &&
      shopperProfileSaleInputs?.customer_entity_type ===
        customer?.customer_entity_type
    );
  };

  const mappedSuppliers = supplier?.map((supplier) => ({
    customer_entity_id: supplier?.supplier_entity_id,
    customer_entity_type: supplier?.supplier_entity_type,
    customer_name: supplier?.name,
    location: supplier?.location ?? "",
    supplier_id: supplier?.supplier_entity_id,
  }));

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
          {mappedSuppliers?.map((customer) => (
            <div
              key={customer.customer_entity_id}
              onClick={() => handleSelectCustomers(customer)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                isCustomerSelected(customer)
                  ? "border-pry2 bg-[#EAF3FF]"
                  : "border-gray-200"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#CCD6E0] text-pry2 font-bold flex items-center justify-center">
                {getInitials(customer?.customer_name)}
              </div>
              <div className="flex-grow text-[#787486]">
                <p className="font-medium text-gray-900">
                  {customer?.customer_name}
                </p>
                <p className="text-sm">{customer?.location}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                  isCustomerSelected(customer)
                    ? "border-pry2"
                    : "border-gray-300"
                }`}
              >
                {isCustomerSelected(customer) && (
                  <div className="w-3 h-3 rounded-full bg-pry2" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry w-full normal-case mt-4"
            onClick={nextOrderSaleSlide}
          >
            <Typography className="text-white font-normal">Continue</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelecteSupplierType;
