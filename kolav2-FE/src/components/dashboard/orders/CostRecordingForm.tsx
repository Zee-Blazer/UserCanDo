"use client";

import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import { CirclePlus, Trash2 } from "lucide-react";

interface CostItem {
  cost_type: string;
  amount: string;
}

interface CostRecordingFormProps {
  delivery_cost: string;
  setDeliveryCost: (value: string) => void;
  costs: CostItem[];
  handleCostChange: (
    index: number,
    field: keyof CostItem,
    value: string
  ) => void;
  addMoreCosts: () => void;
  removeCost: (index: number) => void;
  handleSubmit: () => Promise<void>;
  isCostRecording: boolean;
}

const CostRecordingForm: React.FC<CostRecordingFormProps> = ({
  delivery_cost,
  setDeliveryCost,
  costs,
  handleCostChange,
  addMoreCosts,
  removeCost,
  handleSubmit,
  isCostRecording,
}) => {
  return (
    <div className="space-y-6 mt-6">
      {/* Delivery Cost Radio Button Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Delivery Cost
        </label>
        <div className="flex gap-6">
          <div className="flex items-center">
            <input
              id="kola-wholesale"
              name="delivery_cost"
              type="radio"
              value="Kola wholsale market"
              checked={delivery_cost === "Kola wholsale market"}
              onChange={(e) => setDeliveryCost(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="kola-wholesale"
              className="ml-2 text-sm text-gray-700"
            >
              Kola wholsale market
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="supplier"
              name="delivery_cost"
              type="radio"
              value="Supplier"
              checked={delivery_cost === "Supplier"}
              onChange={(e) => setDeliveryCost(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="supplier" className="ml-2 text-sm text-gray-700">
              Supplier
            </label>
          </div>
        </div>
      </div>

      {/* Dynamic Cost Inputs */}
      {costs.map((cost, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-end">
          <div className="col-span-2">
            <FormInput
              label="Cost Type"
              name={`cost_type_${index}`}
              type="text"
              value={cost.cost_type}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCostChange(index, "cost_type", e.target.value)
              }
              placeholder="Enter cost type (e.g., Transportation, Packaging)"
              required
            />
          </div>

          <div className="col-span-1">
            <FormInput
              label="Amount"
              name={`amount_${index}`}
              type="number"
              value={cost.amount}
              placeholder="0.00"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCostChange(index, "amount", e.target.value)
              }
              required
            />
          </div>

          <div className="col-span-1 flex justify-end">
            {costs.length > 1 && (
              <button
                type="button"
                onClick={() => removeCost(index)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                title="Remove cost"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-65 transition"
        onClick={addMoreCosts}
      >
        <CirclePlus className="text-[#003366] text-sm font-medium" />
        <Typography className="text-[#003366] text-sm font-medium">
          Add more costs
        </Typography>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          loading={isCostRecording}
          disabled={
            isCostRecording ||
            costs.every((cost) => !cost.cost_type.trim() || !cost.amount.trim())
          }
          className="flex-1 bg-[#003366] text-white normal-case px-10 py-3 text-sm"
          onClick={handleSubmit}
        >
          <span className="font-normal text-center">Record Cost</span>
        </Button>
      </div>
    </div>
  );
};

export default CostRecordingForm;
