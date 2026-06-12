import { FormInput, FormSelect } from "@/components/General/form";
import { Navigation, Pencil } from "lucide-react";
import { SalesIcon, ShopIcon } from "@/assets/svg";

interface BusinessFormData {
  companyName: string;
  bio: string;
  storeCount: string;
  address: string;
  country: string;
  email: string;
}

interface BusinessDetailsFormProps {
  formData: BusinessFormData;
  onChange: (field: keyof BusinessFormData, value: string) => void;
  onSave: () => void;
  onEditBusinessLogo: () => void;
  formInputColors: {
    color: string;
    activeBorderColor: string;
    borderColor: string;
    bgColor: string;
  };
}

const BusinessDetailsForm = ({
  formData,
  onChange,
  onSave,
  onEditBusinessLogo,
  formInputColors,
}: BusinessDetailsFormProps) => (
  <div>
    <div className="flex items-center gap-4 border border-y-[#D5D8DC] px-12 py-8 my-10">
      <div className="w-16 h-16 bg-pry2 rounded-full flex items-center justify-center text-white">
        <ShopIcon color="white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[#101828] font-bold">Kola Marketplace</p>
        <p className="text-sm text-[#6F6F6F]">Business owner</p>
      </div>
      <div className="flex gap-3">
        <button className="bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D]">
          Save
        </button>
        <button
          className="flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem]"
          onClick={onEditBusinessLogo}
        >
          Edit profile picture <Pencil size={18} />
        </button>
      </div>
    </div>

    <div className="border border-y-[#D5D8DC] px-12 py-8 my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <FormInput
          label="Company Name"
          placeholder="Enter company name"
          color={formInputColors.color}
          borderColor={formInputColors.borderColor}
          bgColor={formInputColors.bgColor}
          value={formData.companyName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("companyName", e.target.value)
          }
        />
        <FormInput
          label="Bio"
          placeholder="Enter bio"
          color={formInputColors.color}
          borderColor={formInputColors.borderColor}
          bgColor={formInputColors.bgColor}
          value={formData.bio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("bio", e.target.value)
          }
        />
        <FormInput
          label="Number of stores"
          placeholder="Enter number of stores"
          color={formInputColors.color}
          borderColor={formInputColors.borderColor}
          bgColor={formInputColors.bgColor}
          value={formData.storeCount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("storeCount", e.target.value)
          }
        />
      </div>
      <div className="flex gap-3 justify-end mt-8">
        <button className="bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D]">
          Save
        </button>
        <button className="flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem]">
          Edit personal profile <Pencil size={18} />
        </button>
      </div>
    </div>

    <div className="border border-y-[#D5D8DC] px-12 py-8 my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <FormInput
            label="Company address"
            placeholder="Enter company address"
            color={formInputColors.color}
            borderColor={formInputColors.borderColor}
            bgColor={formInputColors.bgColor}
            value={formData.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("address", e.target.value)
            }
          />
          <button className="flex items-center text-pry2 gap-2">
            <Navigation size={20} />{" "}
            <p className="text-xs font-semibold">Use current location</p>
          </button>
        </div>
        <FormSelect
          label="Country"
          placeholder="Select"
          color={formInputColors.color}
          borderColor={formInputColors.borderColor}
          bgColor={formInputColors.bgColor}
          options={["Ghana", "Nigeria"]}
          value={formData.country}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange("country", e.target.value)
          }
        />
        <FormInput
          label="Email"
          placeholder="email@example.com"
          color={formInputColors.color}
          borderColor={formInputColors.borderColor}
          bgColor={formInputColors.bgColor}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange("email", e.target.value)
          }
        />
      </div>

      <div className="flex gap-3 justify-end mt-8">
        <button className="bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D]">
          Save
        </button>
        <button className="flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem]">
          Edit Location <Pencil size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default BusinessDetailsForm;
