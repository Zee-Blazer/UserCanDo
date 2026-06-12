import React, { ChangeEvent, useEffect, useState } from "react";
import SlideWrapper from "../slideWrapper";
import { FormInput, FormSelect } from "@/components/General/form";
import { Typography } from "@material-tailwind/react";
import useEmailValidation from "@/api/hooks/useEmailValidation";
import { PhoneInputComponent } from "@/components/General/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useAuth } from "@/context/authContext";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";
import MultiSelect from "@/components/General/form/multiselect";

const BusinessInformation = () => {
  const { email, isValid, error, validateEmail } = useEmailValidation();
  const { countries, regions, cities, businessCategories } = useAuthSelector();
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [isOthersShown, setIsOthersShown] = useState(false);
  const { businessTypes } = useDashboardSelector();
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(
    []
  );

  const {
    nextBusinessSlide,
    prevSlide,
    businessProfileInputs,
    handleBusinessInputChange,
    setBusinessProfileInputs,
  } = useAuth();

  const {
    isCountryFetching,
    isRegionFetching,
    isCitiesFetching,
    isCategoriesLoading,
  } = useAppContext();

  const formInputColors = {
    borderColor: "#F1F1F1",
    bgColor: "#F9FAFB",
    activeBorderColor: "#FFD68F",
  };

  useEffect(() => {
    if (isValid) {
      setBusinessProfileInputs({
        ...businessProfileInputs,
        business_email: email,
      });
    }
  }, [isValid]);

  useEffect(() => {
    if (phoneNumberValue) {
      setBusinessProfileInputs({
        ...businessProfileInputs,
        business_phone_number: phoneNumberValue,
      });
    }
  }, [phoneNumberValue]);

  const requiredFields = {
    business_name: businessProfileInputs.business_name,
    business_email: businessProfileInputs.business_email,
    country: businessProfileInputs.country,
    city: businessProfileInputs.city,
    region: businessProfileInputs.region,
  };

  const isFormComplete = Object.entries(requiredFields).every(
    ([key, value]) => key === "emailAddress" || value.trim() !== ""
  );

  return (
    <SlideWrapper
      isDisabled={!isFormComplete || !isValid || !isValidPhoneNumber}
      onContinue={nextBusinessSlide}
      onBack={prevSlide}
      activeIndex={1}
    >
      <div className="pt-6">
        <div className="flex justify-between items-start">
          <Typography className="text-2xl font-semibold text-[#0D121D] tracking-[-0.6px]">
            Enter your business information
          </Typography>
          <Typography className="font-semibold text-xs text-[#6F6F6F]">
            Step 1/4
          </Typography>
        </div>
        <div className="flex flex-col gap-6 mt-5 text-sm text-[#474A4E]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Business Name"
              placeholder="Enter your business name"
              required
              value={businessProfileInputs.business_name}
              name="business_name"
              onChange={handleBusinessInputChange}
            />
            <FormInput
              label="Email Address"
              placeholder="Enter email address"
              type="email"
              required
              borderColor={
                email
                  ? formInputColors.activeBorderColor
                  : formInputColors.borderColor
              }
              bgColor={formInputColors.bgColor}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                validateEmail(e.target.value)
              }
              error={error}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <label className="text-sm font-normal text-black mb-2 block">
                Business Type
              </label>
              <MultiSelect
                options={businessTypes?.map((type) => type.label) || []}
                placeholder="Select business types"
                onChange={(selected: string[]) => {
                  setSelectedBusinessTypes(selected);
                  setBusinessProfileInputs({
                    ...businessProfileInputs,
                    business_type: selected,
                  });
                }}
                selectedOptions={selectedBusinessTypes}
              />
            </div>
            {countries?.length < 1 ? (
              <FormInput
                label="Country"
                placeholder={isCountryFetching ? "Loading..." : "Enter Country"}
                value={businessProfileInputs.country}
                name="country"
                readOnly={isCountryFetching}
                required
                onChange={handleBusinessInputChange}
              />
            ) : (
              <FormSelect
                label="Country"
                placeholder={
                  isCountryFetching ? "Loading..." : "Select Country"
                }
                options={countries?.map((country) => country.name) || []}
                value={businessProfileInputs.country}
                name="country"
                readOnly={isCountryFetching}
                required
                onChange={handleBusinessInputChange}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions?.length > 0 ? (
              <FormSelect
                label="Region"
                placeholder={isRegionFetching ? "Loading..." : "Select Region"}
                readOnly={isRegionFetching}
                options={regions?.map((rg) => rg.name) || []}
                value={businessProfileInputs.region}
                name="region"
                onChange={handleBusinessInputChange}
                required
              />
            ) : (
              <FormInput
                label="Region"
                placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
                readOnly={isRegionFetching}
                value={businessProfileInputs.region}
                name="region"
                onChange={handleBusinessInputChange}
                required
              />
            )}

            {cities && cities?.length > 0 ? (
              <FormSelect
                label="City"
                required
                placeholder={isCitiesFetching ? "Loading..." : "Select City"}
                options={cities?.map((city) => city.name)}
                readOnly={isCitiesFetching}
                value={businessProfileInputs.city}
                name="city"
                onChange={handleBusinessInputChange}
              />
            ) : (
              <FormInput
                label="City"
                required
                placeholder={isCitiesFetching ? "Loading..." : "Enter City"}
                readOnly={isCitiesFetching}
                value={businessProfileInputs.city}
                name="city"
                onChange={handleBusinessInputChange}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Number of Stores"
              placeholder="Enter"
              type="number"
              value={businessProfileInputs.number_of_store}
              name="number_of_store"
              onChange={handleBusinessInputChange}
            />
          </div>
          <div style={{ width: "100%" }} className="flex flex-col gap-1">
            <label
              htmlFor="mobile_number"
              className={`text-sm text-[#474A4E] pb-1`}
            >
              Business number
            </label>
            <PhoneInputComponent
              value={phoneNumberValue}
              setValue={setPhoneNumberValue}
              showLabel={false}
            />
          </div>
          <FormSelect
            label="How did you hear about us?"
            placeholder="Pick an option"
            options={[
              "From a friend",
              "Instagram",
              "Facebook",
              "Twitter",
              "Others",
            ]}
            value={businessProfileInputs.where_do_you_hear_about_us}
            name="where_do_you_hear_about_us"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              if (val === "Others") {
                setIsOthersShown(true);
                setBusinessProfileInputs({
                  ...businessProfileInputs,
                  where_do_you_hear_about_us: "",
                });
              } else {
                setIsOthersShown(false);
                setBusinessProfileInputs({
                  ...businessProfileInputs,
                  where_do_you_hear_about_us: val,
                });
              }
            }}
          />
          {isOthersShown && (
            <FormInput
              label="Others"
              optional
              placeholder="How did you hear about us?"
              value={businessProfileInputs.where_do_you_hear_about_us}
              name="where_do_you_hear_about_us"
              onChange={handleBusinessInputChange}
            />
          )}
        </div>
      </div>
    </SlideWrapper>
  );
};

export default BusinessInformation;
