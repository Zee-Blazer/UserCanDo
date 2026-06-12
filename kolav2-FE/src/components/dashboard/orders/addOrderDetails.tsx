import React from "react";
import { FormSelect, FormInput } from "@/components/General/form";
import { useDashboardSelector } from "@/Redux/selectors";
import { usePageData } from "@/api/hooks/usePageData";
import { useDash } from "@/context/dashboardContext";

interface OrderDetailsProps {
  orderDetailsData: {
    orderDate: string;
    supplier: string;
    customer: string;
    salesAgent: string;
    customer_entity_type: string;
    customer_entity_id: string;
  };
  updateOrderDetails: (field: string, value: string) => void;
}

const AddOrderDetails = ({
  orderDetailsData,
  updateOrderDetails,
}: OrderDetailsProps) => {
  const { customers, salesAgents, suppliers } = useDashboardSelector();
  const { loadCustomersData, loadSalesAgentsData, loadSupplierData } =
    useDash();

  usePageData([loadSalesAgentsData, loadCustomersData, loadSupplierData]);

  const getSupplierIdByName = (name: string) => {
    const supplier = suppliers?.find((s) => s.name === name);
    return supplier?.id || name;
  };

  const getCustomerByName = (name: string) => {
    const customer = customers?.find((c) => c.customer_name === name);
    return customer;
  };

  const getSalesAgentIdByName = (name: string) => {
    const agent = salesAgents?.find((a) => a.name === name);
    return agent?.id || name;
  };

  const handleCustomerSelect = (selectedName: string) => {
    const customer = getCustomerByName(selectedName);
    if (customer) {
      updateOrderDetails("customer", customer.id || "");

      updateOrderDetails(
        "customer_entity_type",
        customer.customer_entity_type || ""
      );
      updateOrderDetails(
        "customer_entity_id",
        customer.customer_entity_id || ""
      );
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4 mt-10 mb-2">
      <div className="col-span-8 md:col-span-2">
        <FormInput
          label="Order Date"
          type="date"
          required
          name="orderDate"
          value={orderDetailsData.orderDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateOrderDetails("orderDate", e.target.value)
          }
        />
      </div>

      <div className="col-span-8 md:col-span-2">
        <FormSelect
          label="Supplier"
          name="supplier"
          options={suppliers?.map((supplier) => supplier.name) || []}
          placeholder="Select Supplier"
          value={
            suppliers?.find((s) => s.id === orderDetailsData.supplier)?.name ||
            ""
          }
          onSelect={(e: any) => {
            const selectedName = e.target.value;
            const supplierId = getSupplierIdByName(selectedName);
            updateOrderDetails("supplier", supplierId);
          }}
          required
        />
      </div>

      <div className="col-span-8 md:col-span-2">
        <FormSelect
          label="Customer"
          name="customer"
          options={
            customers?.map((customer) => customer?.customer_name || "") || []
          }
          placeholder="Select Customer"
          value={
            customers?.find((c) => c.id === orderDetailsData.customer)
              ?.customer_name || ""
          }
          onSelect={(e: any) => {
            const selectedName = e.target.value;
            handleCustomerSelect(selectedName);
          }}
          required
        />
      </div>

      <div className="col-span-8 md:col-span-2">
        <FormSelect
          label="Sales Agent"
          name="sales_agent"
          placeholder="Select Sales Agent"
          options={salesAgents?.map((agent) => agent.name) || []}
          value={
            salesAgents?.find((a) => a.id === orderDetailsData.salesAgent)
              ?.name || ""
          }
          onSelect={(e: any) => {
            const selectedName = e.target.value;
            const agentId = getSalesAgentIdByName(selectedName);
            updateOrderDetails("salesAgent", agentId);
          }}
          required
        />
      </div>
    </div>
  );
};

export default AddOrderDetails;
