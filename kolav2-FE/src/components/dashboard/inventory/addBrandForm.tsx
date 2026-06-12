import { FormInput } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

const AddBrandForm = ({ closeFlyout }: { closeFlyout: () => void }) => {
  const { handleCreateBrand, isProductBrandCreating } = useDash();
  const [brandName, setBrandName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim()) {
      return;
    }

    handleCreateBrand(brandName.trim(), () => {
      setBrandName("");
      closeFlyout();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Brand Name"
        type="text"
        placeholder="e.g Gucci"
        className="rounded-none bg-inherit"
        name="brand_name"
        value={brandName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBrandName(e.target.value)
        }
        required
      />

      <div className={"py-14 flex justify-end items-center gap-x-11"}>
        <Button
          type="button"
          className="text-pry2 bg-gray_1 normal-case"
          onClick={closeFlyout}
          disabled={isProductBrandCreating}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-pry2 text-white normal-case"
          disabled={isProductBrandCreating || !brandName.trim()}
          loading={isProductBrandCreating}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default AddBrandForm;
