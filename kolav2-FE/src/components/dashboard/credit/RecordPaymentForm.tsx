import { FormInput, FormSelect } from "@/components/General/form";
import { useState, ChangeEvent } from "react";
import FileInputComponent from "@/components/General/form/fileInputComponent";
import { Button } from "@material-tailwind/react";

const RecordPaymentForm = ({
  onRecordPayment,
}: {
  onRecordPayment: () => void;
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    paymentDate: "",
    paymentMethod: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  return (
    <form className="flex flex-col gap-y-6">
      <FormInput
        label="Amount"
        placeholder="Enter Amount"
        type="text"
        required
        value={formData.amount}
        name="amount"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const numericValue = parseFloat(e.target.value) || 0;
          setFormData({
            ...formData,
            amount: numericValue.toString(),
          });
        }}
      />
      <FormInput
        label="Payment Date"
        placeholder="MM/DD/YYYY"
        type="date "
        required
        value={formData.paymentDate}
        name="paymentDate"
        onChange={handleInputChange}
      />
      <FormSelect
        label="Payment Method"
        required={true}
        options={["Credit Card", "Debit Card", "Bank Transfer"]}
        value={formData.paymentMethod}
        name="paymentMethod"
        onChange={handleInputChange}
        placeholder="Select Payment Method"
        className="rounded-none text-gray_4"
        paddingY="3"
      />
      <FileInputComponent onFileChange={handleFileChange} />
      <Button
        className="bg-pry2 normal-case font-poppins font-medium text-sm mt-8"
        onClick={onRecordPayment}
      >
        Record Payment
      </Button>
    </form>
  );
};

export default RecordPaymentForm;
