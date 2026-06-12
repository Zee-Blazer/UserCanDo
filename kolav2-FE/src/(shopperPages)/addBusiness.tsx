"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { initialBusinessProfileState } from "@/utils/initialStates";
import { useDash } from "@/context/dashboardContext";
import { useAppContext } from "@/app/appContext";
import {
  InstagramLogo,
  GlobeHemisphereEast,
  FacebookLogo,
  PaperPlaneTilt,
  CloudArrowUp,
} from "@phosphor-icons/react";
import FormTextArea from "@/components/General/form/textArea";
import { colors } from "@/constants/colors";
import placeholderLogo from "@/assets/images/km.png";
import AvatarIcon from "@/components/General/avatarIcon";
import { DragAndDropFileInput } from "@/components/General/form";
import MultiSelect from "@/components/General/form/multiselect";

const AddBusiness = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const { cities, regions, countries } = useAuthSelector();
  const { businessTypes } = useDashboardSelector();
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(
    []
  );

  const {
    isCountryFetching,
    isRegionFetching,
    isCitiesFetching,
    isCategoriesLoading,
    getCountryRegions,
    getRegionCities,
  } = useAppContext();

  const {
    isBusinessCreating,
    handleCreateBusiness,
    handleUpdateBusiness,
    isBusinessEditing,
  } = useDash();
  const [phoneValue, setPhoneValue] = useState("");
  const [businessInputs, setBusinessInputs] = useState<CreateBusinessProps>(
    initialBusinessProfileState
  );
  const [file, setFile] = useState<File | null>(null);
  const [isOthersShown, setIsOthersShown] = useState(false);

  const handleBusinessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (businessInputs.country) {
      getCountryRegions(businessInputs.country);
    }
  }, [businessInputs.country]);

  useEffect(() => {
    if (businessInputs.country && businessInputs.region) {
      getRegionCities(businessInputs.country, businessInputs.region);
    }
  }, [businessInputs.region]);

  useEffect(() => {
    if (phoneValue) {
      setBusinessInputs({
        ...businessInputs,
        business_phone_number: phoneValue,
        business_phone: phoneValue,
      });
    }
  }, [phoneValue]);

  return (
    <main className="px-4 md:px-8 lg:px-16 pb-8 w-full lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white lg:shadow-lg rounded-lg">
      <div className="flex mb-8 items-center justify-between relative">
        <div
          onClick={handleGoBack}
          className="absolute left-0 cursor-pointer flex items-center gap-2"
        >
          <ChevronLeft color="#0052A3" />
          <span className="text-[#0052A3] font-semibold">Back</span>
        </div>

        <Typography className="text-[#5A5555] font-semibold mx-auto">
          Add Business
        </Typography>
      </div>

      <form
        className="flex flex-col gap-y-8 text-[#101828]"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateBusiness(businessInputs, file, () => {
            setBusinessInputs(initialBusinessProfileState);
            setFile(null);
            setPhoneValue("");
            setSelectedBusinessTypes([]);
            setIsOthersShown(false);
          });
        }}
      >
        <FormInput
          type="text"
          label="Name"
          placeholder="e.g J.M Ventures"
          value={businessInputs.business_name}
          name="business_name"
          onChange={handleBusinessInputChange}
        />
        <div className="flex justify-between gap-x-2">
          <div className="w-[50%]">
            <label className="text-sm font-normal text-black mb-2 block">
              Business Type
            </label>
            <MultiSelect
              options={businessTypes?.map((type) => type.label) || []}
              placeholder="Select business types"
              onChange={(selected: string[]) => {
                setSelectedBusinessTypes(selected);
                setBusinessInputs({
                  ...businessInputs,
                  business_type: selected,
                });
              }}
              selectedOptions={selectedBusinessTypes}
            />
          </div>
          <div className="w-[50%]">
            <PhoneInputComponent
              value={phoneValue}
              setValue={setPhoneValue}
              color="black"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label="TIN"
            placeholder="e.g P0000222"
            value={businessInputs.tin_number}
            name="tin_number"
            onChange={handleBusinessInputChange}
          />
          <FormInput
            type="text"
            label="Address"
            placeholder="e.g P.O Box 1234"
            value={businessInputs.business_address}
            name="business_address"
            onChange={handleBusinessInputChange}
          />
        </div>
        <FormInput
          type="text"
          label="Email"
          placeholder="email@example.com"
          value={businessInputs.business_email}
          name="business_email"
          onChange={handleBusinessInputChange}
        />
        {/* <FormInput
              type="text"
              label="Location"
              placeholder="Osu"
              // value={businessInputs.lo}
              name="business_location"
              onChange={handleBusinessInputChange}
            /> */}
        {/* </div> */}
        <div className="flex justify-between gap-x-2">
          <div className="w-[50%]">
            <FormSelect
              label="Primary Category"
              options={["Distributor", "Supplier", "Manufacturer"]}
            />
          </div>
          <div className="w-[50%]">
            {countries?.length < 1 ? (
              <FormInput
                label="Country"
                placeholder={isCountryFetching ? "Loading..." : "Enter Country"}
                value={businessInputs.country}
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
                value={businessInputs.country}
                name="country"
                readOnly={isCountryFetching}
                required
                onChange={handleBusinessInputChange}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between gap-x-2">
          <div className="w-[50%]">
            {regions?.length > 0 ? (
              <FormSelect
                label="Region"
                placeholder={isRegionFetching ? "Loading..." : "Select Region"}
                readOnly={isRegionFetching}
                options={regions?.map((rg) => rg.name) || []}
                value={businessInputs.region}
                name="region"
                onChange={handleBusinessInputChange}
                required
              />
            ) : (
              <FormInput
                label="Region"
                placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
                readOnly={isRegionFetching}
                value={businessInputs.region}
                name="region"
                onChange={handleBusinessInputChange}
                required
              />
            )}
          </div>
          <div className="w-[50%]">
            {cities && cities?.length > 0 ? (
              <FormSelect
                label="City"
                required
                placeholder={isCitiesFetching ? "Loading..." : "Select City"}
                options={cities?.map((city) => city.name)}
                readOnly={isCitiesFetching}
                value={businessInputs.city}
                name="city"
                onChange={handleBusinessInputChange}
              />
            ) : (
              <FormInput
                label="City"
                required
                placeholder={isCitiesFetching ? "Loading..." : "Enter City"}
                readOnly={isCitiesFetching}
                value={businessInputs.city}
                name="city"
                onChange={handleBusinessInputChange}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            type="text"
            label="Number of Stores you work with."
            value={businessInputs.number_of_store}
            name="number_of_store"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const numericValue = parseInt(e.target.value, 10) || 0;
              setBusinessInputs((prev) => ({
                ...prev,
                number_of_store: numericValue,
              }));
            }}
          />
          {/* <FormInput
            type="text"
            label="Number of products you sell."
            value={businessInputs.number_of_product}
            name="number_of_product"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const numericValue = parseInt(e.target.value, 10) || 0;
              setBusinessInputs((prev) => ({
                ...prev,
                number_of_product: numericValue,
              }));
            }}
          /> */}
        </div>
        <div className="grid grid-cols-2 gap-2">
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
            value={businessInputs.where_do_you_hear_about_us}
            name="where_do_you_hear_about_us"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              if (val === "Others") {
                setIsOthersShown(true);
                setBusinessInputs({
                  ...businessInputs,
                  where_do_you_hear_about_us: "",
                });
              } else {
                setIsOthersShown(false);
                setBusinessInputs({
                  ...businessInputs,
                  where_do_you_hear_about_us: val,
                });
              }
            }}
          />
          <FormInput
            // type='date'
            label="Year Established"
            placeholder="Enter"
            value={businessInputs.year_established}
            name="year_established"
            onChange={handleBusinessInputChange}
          />
          {isOthersShown && (
            <FormInput
              label="Others"
              optional
              placeholder="Enter"
              value={businessInputs.where_do_you_hear_about_us}
              name="where_do_you_hear_about_us"
              onChange={handleBusinessInputChange}
            />
          )}
        </div>

        <div>
          <Typography className="text-sm font-semibold mb-4">Logo</Typography>
          <DragAndDropFileInput
            onFileSelect={(file) => {
              setFile(file[0]);
            }}
            id={"logo"}
            bgColor="#EFF3F6"
            size="sm"
            icon={<CloudArrowUp />}
            titleComponent={
              <Typography className="text-sm pt-4">
                <span className="font-semibold">Click to Upload</span> or drag
                and drop{" "}
              </Typography>
            }
            subHeadingComponent={
              <Typography className="text-xs">PNG, JPG</Typography>
            }
            labelDirection="vertical"
          />
        </div>

        <div>
          <Typography className="font-semibold pb-2">
            Social Media Presence
          </Typography>
          <Typography className="text-sm text-[#6F6F6F] pb-2">
            Please provide the handles for your brand's social media accounts.
            This will help us connect and collaborate with you effectively.
          </Typography>

          <div className="grid grid-cols-2 gap-2 pt-2 pb-6">
            <FormInput
              type="text"
              label="Website"
              placeholder="Website"
              icon={<GlobeHemisphereEast />}
              iconPosition="left"
              value={businessInputs.website}
              name="website"
              onChange={handleBusinessInputChange}
            />
            <FormInput
              type="text"
              label="Instagram"
              placeholder="Instagram"
              icon={<InstagramLogo />}
              iconPosition="left"
              value={businessInputs.instagram}
              name="instagram"
              onChange={handleBusinessInputChange}
            />
          </div>
          <div className="w-1/2">
            <FormInput
              type="text"
              label="Facebook"
              placeholder="https://www.facebook.com/examplebusiness"
              icon={<FacebookLogo />}
              iconPosition="left"
              value={businessInputs.facebook}
              name="facebook"
              onChange={handleBusinessInputChange}
            />
          </div>
        </div>

        <FormTextArea
          label="What are your goals and expectations for promoting your brand on Kola Market"
          placeholder="Type here...."
          value={businessInputs.expectations}
          name="expectations"
          onChange={handleBusinessInputChange}
        />
        <FormInput
          type="text"
          label="Business Headquarters"
          placeholder="Enter Headquarters"
          min={0}
          value={businessInputs.business_headquarters}
          name="business_headquarters"
          onChange={handleBusinessInputChange}
        />
        <div>
          <Button variant="text" className="flex gap-x-2 items-center p-0">
            <PaperPlaneTilt size="16px" color={colors.blue_pry} />
            <Typography className="text-sm text-[#4E88F4] lowercase">
              <span className="capitalize">Use</span> Current Location
            </Typography>
          </Button>
        </div>

        <div className="pt-8">
          <hr className=" border-[#D5D8DC80]" />
          <div className="pt-4 flex items-center gap-x-4 ">
            <AvatarIcon logo={placeholderLogo} />
            <div className="flex flex-col gap-y-1">
              <Typography className="text-sm font-semibold text-[#003366]">
                Kola MarketPlace
              </Typography>
              <Typography className="text-sm">
                +2348167238795 | user@gmail.com
              </Typography>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-6 normal-case bg-pry2 text-sm font-normal"
              loading={isBusinessCreating || isBusinessEditing}
            >
              Create Business
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default AddBusiness;
