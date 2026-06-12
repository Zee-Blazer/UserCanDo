import { useState, ChangeEvent } from "react";

interface CheckoutRadioProps {
  selected: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, value?: string,) => void;
}

export default function CheckoutRadioInput({
  selected,
  value,
  onChange,
}: CheckoutRadioProps) {
  return (
    <div>
        <input
          type="radio"
          name="custom-radio"
          value={value}
          checked={selected === value}
          onChange={onChange}
          className="hidden"
        />
        <div
          className={`w-4 h-4 rounded-full border-4 ${
            selected === value ? "border-orange-500" : "border-gray-400"
          } flex items-center justify-center`}
        >
        </div>
    </div>
  );
}
