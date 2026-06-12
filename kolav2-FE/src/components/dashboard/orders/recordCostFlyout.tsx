"use client";

import { useState } from "react";
import FlyoutLayout from "@/components/General/flyoutLayout";
import CostRecordingForm from "./CostRecordingForm";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";

interface CostItem {
  cost_type: string;
  amount: string;
}

interface Props {
  setActiveFlyer: React.Dispatch<React.SetStateAction<string>>;
}

const RecordCostFlyout = ({ setActiveFlyer }: Props) => {
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(true);
  const [delivery_cost, setDeliveryCost] = useState("");
  const [costs, setCosts] = useState<CostItem[]>([
    { cost_type: "", amount: "" },
  ]);

  const { activeOrderStatus, activeBusiness } = useDashboardSelector();
  const { handleRecordCost, isCostRecording } = useDash();

  const closeFlyout = () => {
    setIsRightDrawerOpen(false);
    setActiveFlyer("");
  };

  const handleCostChange = (
    index: number,
    field: keyof CostItem,
    value: string
  ) => {
    setCosts((prev) =>
      prev.map((cost, i) => (i === index ? { ...cost, [field]: value } : cost))
    );
  };

  const addMoreCosts = () => {
    setCosts((prev) => [...prev, { cost_type: "", amount: "" }]);
  };

  const removeCost = (index: number) => {
    if (costs.length > 1) {
      setCosts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {
    if (!activeOrderStatus?.id) {
      alert("No order selected");
      return;
    }

    if (!activeBusiness?.id) {
      alert("No business selected");
      return;
    }

    const validCosts = costs.filter(
      (cost) => cost.cost_type.trim() && cost.amount.trim()
    );

    if (validCosts.length === 0) {
      alert("Please fill in at least one cost entry");
      return;
    }

    const costsToSubmit = validCosts.map((cost) => ({
      cost_type: cost.cost_type.trim(),
      amount: parseFloat(cost.amount) || 0,
      source_id:
        delivery_cost === "Supplier"
          ? activeOrderStatus.supplier_id || activeBusiness.id
          : activeBusiness.id,
    }));

    handleRecordCost(activeOrderStatus.id, costsToSubmit, () => {
      closeFlyout();
    });
  };

  return (
    <div>
      <FlyoutLayout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={closeFlyout}
        onSave={closeFlyout}
        heading="Record Cost"
        showButtons={false}
      >
        <CostRecordingForm
          delivery_cost={delivery_cost}
          setDeliveryCost={setDeliveryCost}
          costs={costs}
          handleCostChange={handleCostChange}
          addMoreCosts={addMoreCosts}
          removeCost={removeCost}
          handleSubmit={handleSubmit}
          isCostRecording={isCostRecording}
        />
      </FlyoutLayout>
    </div>
  );
};

export default RecordCostFlyout;
