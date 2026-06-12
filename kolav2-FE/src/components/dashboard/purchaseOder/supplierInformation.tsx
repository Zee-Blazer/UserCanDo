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

interface SupplierInformationProps {
  supplierDetails: CustomerOrSupplier;
  updateSupplierInfo: (field: keyof CustomerOrSupplier, value: string) => void;
}

const SupplierInformation = ({
  supplierDetails,
  updateSupplierInfo,
}: SupplierInformationProps) => {
  const { loadCustomersData, loadProductsData } = useDash();
  usePageData([loadCustomersData, loadProductsData]);

  const handleInputChange = (
    field: keyof CustomerOrSupplier,
    value: string
  ) => {
    updateSupplierInfo(field, value);
  };

  const { regions, countries } = useAuthSelector();
  const {
    isCountryFetching,
    isRegionFetching,
    getRegionCities,
    getCountryRegions,
  } = useAppContext();
  usePageData([loadCustomersData, loadProductsData]);

  useEffect(() => {
    if (supplierDetails.country) {
      getCountryRegions(supplierDetails.country);
    }
  }, [supplierDetails.country]);

  useEffect(() => {
    if (supplierDetails.country && supplierDetails.region) {
      getRegionCities(supplierDetails.country, supplierDetails.region);
    }
  }, [supplierDetails.region]);

  const selectedCountryValue =
    countries?.find((c: any) => c.id === supplierDetails.country)?.name ||
    countries?.find((c) => c.name === supplierDetails.country)?.name ||
    supplierDetails.country;

  const selectedRegionValue =
    regions?.find((r: any) => r.id === supplierDetails.region)?.name ||
    regions?.find((r) => r.name === supplierDetails.region)?.name ||
    supplierDetails.region;

  return (
    <main>
      <div className="grid grid-cols-8 w-full gap-4 mt-5 mb-2">
        <div className="col-span-8 md:col-span-2">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter Supplier Name"
            className="w-full"
            value={supplierDetails.name}
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
            value={supplierDetails.email}
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
            value={supplierDetails.company_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("company_name", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-8 md:col-span-2">
          <PhoneInputComponent
            value={supplierDetails.phone_number}
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
              value={supplierDetails.country}
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
              value={supplierDetails.region}
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
            value={supplierDetails.town}
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
            value={supplierDetails.street_address}
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
            value={supplierDetails.nearest_landmark}
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

export default SupplierInformation;
