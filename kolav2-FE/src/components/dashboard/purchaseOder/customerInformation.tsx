import { usePageData } from "@/api/hooks/usePageData";
import { useAppContext } from "@/app/appContext";
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useAuthSelector } from "@/Redux/selectors";
import React, { useEffect } from "react";

interface CustomerInformationProps {
  customerDetails: CustomerOrSupplier;
  updateCustomerInfo: (field: keyof CustomerOrSupplier, value: string) => void;
}

const CustomerInformation = ({
  customerDetails,
  updateCustomerInfo,
}: CustomerInformationProps) => {
  const { loadCustomersData, loadProductsData } = useDash();
  const { regions, countries } = useAuthSelector();
  const {
    isCountryFetching,
    isRegionFetching,
    getRegionCities,
    getCountryRegions,
  } = useAppContext();
  usePageData([loadCustomersData, loadProductsData]);

  const handleInputChange = (
    field: keyof CustomerOrSupplier,
    value: string
  ) => {
    updateCustomerInfo(field, value);
  };

  useEffect(() => {
    if (customerDetails.country) {
      getCountryRegions(customerDetails.country);
    }
  }, [customerDetails.country]);

  useEffect(() => {
    if (customerDetails.country && customerDetails.region) {
      getRegionCities(customerDetails.country, customerDetails.region);
    }
  }, [customerDetails.region]);

  const selectedCountryValue =
    countries?.find((c: any) => c.id === customerDetails.country)?.name ||
    countries?.find((c) => c.name === customerDetails.country)?.name ||
    customerDetails.country;

  const selectedRegionValue =
    regions?.find((r: any) => r.id === customerDetails.region)?.name ||
    regions?.find((r) => r.name === customerDetails.region)?.name ||
    customerDetails.region;

  return (
    <main>
      <div className="grid grid-cols-8 w-full gap-4 mt-5 mb-2">
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter Customer Name"
            className="w-full"
            value={customerDetails.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("name", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={customerDetails.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Company Name"
            type="text"
            name="companyName"
            placeholder="Enter Company Name"
            value={customerDetails.company_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("company_name", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <PhoneInputComponent
            value={customerDetails.phone_number}
            setValue={(value: string) =>
              handleInputChange("phone_number", value)
            }
            className="w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          {countries?.length < 1 ? (
            <FormInput
              label="Country"
              placeholder={isCountryFetching ? "Loading..." : "Enter Country"}
              value={customerDetails.country}
              name="country"
              readOnly={isCountryFetching}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("country", e.target.value)
              }
            />
          ) : (
            <FormSelect
              label="Country"
              placeholder={isCountryFetching ? "Loading..." : "Select Country"}
              options={countries?.map((country) => country.name) || []}
              value={selectedCountryValue}
              name="country"
              readOnly={isCountryFetching}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("country", e.target.value)
              }
            />
          )}
        </div>
        <div className="col-span-8 md:col-span-2">
          {regions?.length > 0 ? (
            <FormSelect
              label="Region"
              placeholder={isRegionFetching ? "Loading..." : "Select Region"}
              readOnly={isRegionFetching}
              options={regions?.map((rg) => rg.name) || []}
              value={selectedRegionValue}
              name="region"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("region", e.target.value)
              }
              required
            />
          ) : (
            <FormInput
              label="Region"
              placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
              readOnly={isRegionFetching}
              value={customerDetails.region}
              name="region"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("region", e.target.value)
              }
              required
            />
          )}
        </div>

        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Town"
            name="town"
            placeholder="e.g Kumasi"
            value={customerDetails.town}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("town", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Street Address"
            name="street_address"
            placeholder="Enter Street Address"
            value={customerDetails.street_address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("street_address", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Nearest Landmark"
            name="nearest_landmark"
            placeholder="Enter nearest landmark"
            value={customerDetails.nearest_landmark}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("nearest_landmark", e.target.value)
            }
            required
          />
        </div>
      </div>
    </main>
  );
};

export default CustomerInformation;
