import { ChevronLeft } from "lucide-react";
import { Button, Typography } from "@material-tailwind/react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { FormInput } from "@/components/General/form";
import { useState, useEffect, ChangeEvent } from "react";

interface AddProfileAddressPageProps {
  onBackClick: () => void;
  onSave: () => void;
  edit?: boolean;
  initialData?: {
    business_name: string;
    region: string;
    city: string;
  };
}

const ProfileAddAddress = ({
  onBackClick,
  onSave,
  edit = false,
  initialData,
}: AddProfileAddressPageProps) => {
  const [form, setForm] = useState({
    business_name: "",
    region: "",
    city: "",
  });

  useEffect(() => {
    if (edit && initialData) {
      setForm(initialData);
    }
  }, [edit, initialData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBackClick}
          className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium bg-transparent shadow-none hover:bg-gray-100 normal-case"
        >
          <ChevronLeft size={18} />
          <span>Back</span>
        </Button>
        <Typography className="text-lg font-inter font-medium text-[#5A5555]">
          {edit ? "Edit Address" : "Add Address"}
        </Typography>
        <div className="w-10"></div>
      </div>

      <form className="flex flex-col gap-y-6">
        <div>
          <FormInput
            type="text"
            label="Business Name"
            placeholder="e.g J.M Ventures"
            value={form.business_name}
            name="business_name"
            required={true}
            onChange={handleInputChange}
          />
          <Button
            className="flex items-center text-blue-500 text-xs font-semibold gap-1 mt-2 normal-case px-0 "
            variant="text"
          >
            <PaperPlaneTilt size={16} />
            <span>Use current location</span>
          </Button>
        </div>
        <FormInput
          type="text"
          label="Region"
          placeholder="Enter Region"
          value={form.region}
          name="region"
          required={true}
          onChange={handleInputChange}
        />
        <FormInput
          type="text"
          label="City"
          placeholder="Enter City"
          value={form.city}
          name="city"
          required={true}
          onChange={handleInputChange}
        />
      </form>
      <div className="flex flex-col pt-8 gap-y-6">
        <Button
          className="bg-[#007AF5] w-full font-semibold normal-case py-4 "
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          className="bg-[#E0F0FF] text-[#007AF5] w-full font-semibold normal-case"
          onClick={onBackClick}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default ProfileAddAddress;
