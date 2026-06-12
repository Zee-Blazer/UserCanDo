import React, { ChangeEvent, useEffect, useState } from "react";
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { Navigation } from "lucide-react";
import { initialCustomer } from "@/utils/initialStates";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";
import { Button } from "@material-tailwind/react";
import { useDash } from "@/context/dashboardContext";
import MultiSelect from "@/components/General/form/multiselect";

interface CreateBusinessFormProps {
  closeFlyout: () => void;
  editData?: any;
  isEditMode?: boolean;
}

const CreateBusinessForm = ({
  closeFlyout,
  editData,
  isEditMode = false,
}: CreateBusinessFormProps) => {
  const [value, setValue] = useState("");
  const { countries, regions, cities } = useAuthSelector();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const {
    isCitiesFetching,
    isRegionFetching,
    isCountryFetching,
    getCountryRegions,
    getRegionCities,
  } = useAppContext();

  const {
    handleCreateCustomer,
    handleUpdateCustomer,
    isCustomerCreating,
    isCustomerUpdating,
  } = useDash();
  const [customerDetails, setCustomerDetails] =
    useState<CreateCustomerProps>(initialCustomer);
  const { businessTypes } = useDashboardSelector();

  useEffect(() => {
    if (isEditMode && editData) {
      setCustomerDetails({
        id: editData.customer_entity_id,
        customer_name: editData.customer_name || "",
        customer_phone: editData.customer_phone || "",
        customer_address: editData.customer_address || "",
        location: editData.location || "",
        country: editData.country || "",
        region: editData.region || "",
        city: editData.city || "",
        customer_business_type: editData.customer_business_type || [],
      });
      setValue(editData.customer_phone || "");
      setSelectedOptions(editData.customer_business_type || []);
    }
  }, [isEditMode, editData]);

  const handleCustomerInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });

  const handleMultiSelectChange = (selected: string[]) => {
    setSelectedOptions(selected);
    setCustomerDetails({
      ...customerDetails,
      customer_business_type: selected,
    });
  };

  const resetForm = () => {
    setCustomerDetails(initialCustomer);
    setValue("");
    setSelectedOptions([]);
  };

  const handleSubmit = () => {
    if (isEditMode) {
      handleUpdateCustomer(customerDetails, () => {
        closeFlyout();
      });
    } else {
      handleCreateCustomer(customerDetails, () => {
        resetForm();
        closeFlyout();
      });
    }
  };

  useEffect(() => {
    if (customerDetails.country) {
      getCountryRegions(customerDetails.country);
    }
  }, [customerDetails.country]);

  useEffect(() => {
    if (customerDetails.region && customerDetails.country) {
      getRegionCities(customerDetails.country, customerDetails.region);
    }
  }, [customerDetails.region]);

  useEffect(() => {
    if (value) {
      setCustomerDetails({ ...customerDetails, customer_phone: value });
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-5">
      <FormInput
        label="Name"
        placeholder="Kola Market"
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        value={customerDetails.customer_name}
        name="customer_name"
        onChange={handleCustomerInputChange}
      />

      <label className="text-sm -mb-3 font-normal text-black">
        Business Type
      </label>
      <MultiSelect
        options={businessTypes?.map((type) => type.label) || []}
        placeholder="Select option"
        onChange={handleMultiSelectChange}
        selectedOptions={selectedOptions}
      />
      <PhoneInputComponent value={value} setValue={setValue} />

      {countries?.length < 1 ? (
        <FormInput
          label="Country"
          placeholder={isCountryFetching ? "Loading..." : "Enter Country"}
          value={customerDetails.country}
          name="country"
          readOnly={isCountryFetching}
          required
          onChange={handleCustomerInputChange}
        />
      ) : (
        <FormSelect
          label="Country"
          placeholder={isCountryFetching ? "Loading..." : "Select Country"}
          options={countries?.map((country) => country.name) || []}
          value={customerDetails.country}
          name="country"
          readOnly={isCountryFetching}
          required
          onChange={handleCustomerInputChange}
        />
      )}

      {regions?.length > 0 ? (
        <FormSelect
          label="Region"
          placeholder={isRegionFetching ? "Loading..." : "Select Region"}
          readOnly={isRegionFetching}
          options={regions?.map((rg) => rg.name) || []}
          value={customerDetails.region}
          name="region"
          onChange={handleCustomerInputChange}
          required
        />
      ) : (
        <FormInput
          label="Region"
          placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
          readOnly={isRegionFetching}
          value={customerDetails.region}
          name="region"
          onChange={handleCustomerInputChange}
          required
        />
      )}

      {cities?.length > 0 ? (
        <FormSelect
          label="City"
          required
          placeholder={isCitiesFetching ? "Loading..." : "Select City"}
          options={cities?.map((city) => city.name) || []}
          readOnly={isCitiesFetching}
          value={customerDetails.city}
          name="city"
          onChange={handleCustomerInputChange}
        />
      ) : (
        <FormInput
          label="City"
          required
          placeholder={isCitiesFetching ? "Loading..." : "Enter City"}
          readOnly={isCitiesFetching}
          value={customerDetails.city}
          name="city"
          onChange={handleCustomerInputChange}
        />
      )}

      <FormInput
        label="Address"
        placeholder="Kola Market"
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        value={customerDetails.customer_address}
        name="customer_address"
        onChange={handleCustomerInputChange}
      />
      <FormInput
        label="Location"
        placeholder="Enter location"
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        value={customerDetails.location}
        name="location"
        onChange={handleCustomerInputChange}
      />
      <button className="flex items-center text-[#4AA2AB] gap-2">
        <Navigation size={20} />
        <p className="text-xs font-semibold">Use current location</p>
      </button>
      <div className="flex justify-between gap-4 mt-10">
        <Button
          onClick={closeFlyout}
          className="px-8 normal-case font-medium bg-gray-50 text-pry2 text-sm"
        >
          Cancel
        </Button>
        <Button
          className="px-8 normal-case font-medium bg-pry2 text-sm"
          loading={isEditMode ? isCustomerUpdating : isCustomerCreating}
          disabled={isEditMode ? isCustomerUpdating : isCustomerCreating}
          onClick={handleSubmit}
        >
          {isEditMode ? "Update Customer" : "Add Customer"}
        </Button>
      </div>
    </div>
  );
};

export default CreateBusinessForm;
