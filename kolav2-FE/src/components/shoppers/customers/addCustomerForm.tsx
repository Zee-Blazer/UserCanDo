import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { useRouter } from "next/navigation";
import {
  useAgentSelector,
  useAuthSelector,
  useDashboardSelector,
} from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";
import { initialCustomer } from "@/utils/initialStates";
import MultiSelect from "@/components/General/form/multiselect";
import { useAgent } from "@/context/agentContext";
import { useDash } from "@/context/dashboardContext";
import { USE_CASES, UseCase } from "@/types";

const AddCustomerForm = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { loginData, countries, regions, cities } = useAuthSelector();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const {
    isCitiesFetching,
    isRegionFetching,
    isCountryFetching,
    getCountryRegions,
    getRegionCities,
  } = useAppContext();

  const { handleCreateCustomer, isCustomerCreating } = isAgent
    ? useAgent()
    : useDash();
  const [customerDetails, setCustomerDetails] =
    useState<CreateCustomerProps>(initialCustomer);
  const { businessTypes } = isAgent
    ? useAgentSelector()
    : useDashboardSelector();

  const handleCustomerInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });

  const handleMultiSelectChange = (selected: string[]) => {
    setSelectedOptions(selected);
    setCustomerDetails({
      ...customerDetails,
      customer_business_type: selected,
    });
  };

  const handleBack = () => {
    router.back();
  };

  const resetForm = () => {
    setCustomerDetails(initialCustomer);
    setValue("");
    setSelectedOptions([]);
  };

  const handleSubmit = () => {
    handleCreateCustomer(customerDetails, () => {
      resetForm();
    });
  };

  const isFormValid = () => {
    const requiredFields = [
      customerDetails.customer_name,
      customerDetails.customer_phone,
      customerDetails.country,
      customerDetails.region,
      customerDetails.city,
      customerDetails.customer_address,
      customerDetails.location,
    ];

    return (
      requiredFields.every((field) => field && field.trim() !== "") &&
      selectedOptions.length > 0
    );
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
    <div>
      <p className="text-xl font-medium mb-6">Customers</p>
      <div className="bg-white w-full max-w-3xl mx-auto px-4 md:px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="text-pry2 flex items-center text-sm font-medium"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          <p className="text-lg font-medium">Add Customer</p>
          <div className="w-10"></div>
        </div>

        <div className="space-y-6">
          <FormInput
            label="Name"
            placeholder="Kola Market"
            className="rounded-none"
            paddingX="6"
            paddingY="2"
            value={customerDetails.customer_name}
            name="customer_name"
            onChange={handleCustomerInputChange}
            required
          />

          <div className="flex flex-col">
            <label className="text-sm mb-2 font-normal text-black">
              Business Type <span className="text-red-500">*</span>
            </label>
            <MultiSelect
              options={businessTypes?.map((type) => type.label) || []}
              placeholder="Select option"
              onChange={handleMultiSelectChange}
              selectedOptions={selectedOptions}
            />
          </div>
          <PhoneInputComponent value={value} setValue={setValue} required />

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
            required
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
            required
          />

          <Button
            className="bg-blue_pry flex justify-center w-full normal-case mt-4"
            loading={isCustomerCreating}
            disabled={isCustomerCreating || !isFormValid()}
            onClick={handleSubmit}
          >
            <Typography className="text-white font-normal">Save</Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerForm;
