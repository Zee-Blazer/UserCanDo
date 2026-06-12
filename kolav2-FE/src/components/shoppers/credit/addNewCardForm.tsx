import {
  FormInput,
  CardNumberInput,
  ExpiryDateInput,
} from "@/components/General/form";
import { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { colors } from "@/constants/colors";
import { Button } from "@material-tailwind/react";

interface AddNewCardFormProps {
  onSave: () => void;
}

const AddNewCardForm = ({ onSave }: AddNewCardFormProps) => {
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiryDate: "",
    cvv: "",
  });

  const [isCvvShown, setIsCvvShown] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExpiryDateChange = (formattedValue: string) => {
    setForm((prevState) => ({
      ...prevState,
      cardExpiryDate: formattedValue,
    }));
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setForm((prevState) => ({
      ...prevState,
      cvv: value,
    }));
  };

  const isFormComplete =
    form.cardName.trim() !== "" &&
    form.cardNumber.trim() !== "" &&
    form.cardExpiryDate.trim() !== "" &&
    form.cvv.trim() !== "";

  return (
    <form className="mx-5 flex flex-col gap-y-4">
      <FormInput
        type="text"
        label="Name on card"
        placeholder="Enter name on card"
        value={form.cardName}
        name="cardName"
        required={true}
        onChange={handleInputChange}
      />
      <CardNumberInput
        label="Card Number"
        placeholder="0000 0000 0000 0000"
        value={form.cardNumber}
        name="cardNumber"
        required={true}
        onChange={handleInputChange}
      />
      <div className="flex gap-x-2 items-center justify-between">
        <ExpiryDateInput
          label="Expiry Date"
          placeholder="MM / YY"
          value={form.cardExpiryDate}
          name="cardExpiryDate"
          required={true}
          onChange={handleExpiryDateChange}
        />
        <FormInput
          type={isCvvShown ? "text" : "password"}
          label="CVV"
          placeholder="•••"
          value={form.cvv}
          name="cvv"
          required={true}
          maxLength={3}
          onChange={handleCvvChange}
          icon={
            isCvvShown ? (
              <EyeOff color={colors.gray_5} size={15} />
            ) : (
              <Eye color={colors.gray_5} size={15} />
            )
          }
          iconPosition="right"
          iconClick={() => setIsCvvShown((prev) => !prev)}
        />
      </div>
      <Button
        onClick={onSave}
        disabled={!isFormComplete}
        className={`mt-4 w-full ${
          isFormComplete
            ? "bg-blue_pry text-white hover:bg-blue-600"
            : "bg-[#D2D5DA] text-[#474A4E] cursor-not-allowed"
        }`}
      >
        Save Card
      </Button>
    </form>
  );
};

export default AddNewCardForm;
