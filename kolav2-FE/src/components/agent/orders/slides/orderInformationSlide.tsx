import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { FormInput } from "@/components/General/form";
import { useAgent } from "@/context/agentContext";

const OrderInformationSlide = () => {
  const {
    prevOrderSaleSlide,
    shopperProfileSaleInputs,
    handleAgentOrderInputChange,
    agentOrderInputs,
    resetOrderSaleSlides,
    setActiveOrderSaleSlideIndex,
  } = useAgent();

  const { handleSubmitOrder, isAddOrderLoading } = useAgent();
  const handleSubmit = async () => {
    const mappedProducts = shopperProfileSaleInputs.products.map(
      (product: any) => ({
        product_id: product.product_id || product.id || "",
        item_type: product.item_type || "",
        quantity: product.quantity || 1,
        unit_price: Number(product.unit_price) || 0,
        total_price:
          product.total_price || product.unit_price * product.quantity,
      })
    );

    const finalPayload = {
      customer_entity_type: shopperProfileSaleInputs.main_type,
      customer_entity_id: shopperProfileSaleInputs.customer_id,
      sale_date: agentOrderInputs.orderDateAndTime,
      order_type: shopperProfileSaleInputs.sale_type,
      supplier_id: shopperProfileSaleInputs.supplier_id,
      due_date: agentOrderInputs.delivery_date,
      delivery_date: agentOrderInputs.delivery_date,
      delivery_address: agentOrderInputs.delivery_address,
      nearest_landmark: agentOrderInputs.nearest_landmark,
      products: mappedProducts,
    };

    await handleSubmitOrder(finalPayload, () => {
      resetOrderSaleSlides(false);
      setActiveOrderSaleSlideIndex(8);
    });
  };

  return (
    <div>
      <p className="text-xl font-medium mb-6">Add Sale</p>
      <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <div
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
            onClick={prevOrderSaleSlide}
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </div>
          <p className="text-lg font-medium text-[#5A5555]">Place New Order</p>
          <div className="w-10"></div>
        </div>

        <div className="flex flex-col gap-y-4 lg:gap-y-8">
          <FormInput
            label="Order Date"
            type="date"
            required
            name="orderDateAndTime"
            value={agentOrderInputs.orderDateAndTime}
            onChange={handleAgentOrderInputChange}
            defaultValue="today"
            setDefaultOnMount={true}
          />
          <FormInput
            label="Add Delivery Address"
            type="text"
            required
            name="delivery_address"
            value={agentOrderInputs.delivery_address}
            onChange={handleAgentOrderInputChange}
          />
          <FormInput
            label="Nearest Landmark"
            type="text"
            required
            name="nearest_landmark"
            value={agentOrderInputs.nearest_landmark}
            onChange={handleAgentOrderInputChange}
          />
          <FormInput
            label="Delivery Date"
            type="date"
            required
            name="delivery_date"
            value={agentOrderInputs.delivery_date}
            onChange={handleAgentOrderInputChange}
          />
        </div>

        <div className="mt-8">
          <Button
            className="bg-blue_pry flex justify-center w-full normal-case mt-4"
            onClick={handleSubmit}
            disabled={
              !agentOrderInputs.orderDateAndTime ||
              !agentOrderInputs.delivery_address ||
              !agentOrderInputs.nearest_landmark ||
              !agentOrderInputs.delivery_date
            }
            loading={isAddOrderLoading}
          >
            <Typography className="text-white font-normal">
              {!isAddOrderLoading ? "Continue" : "Loading..."}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderInformationSlide;
