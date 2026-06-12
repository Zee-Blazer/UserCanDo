import { Avatar, Button, Typography } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import rectangle from "@/assets/images/Rectangle.png";
import Image from "next/image";
import {
  DragAndDropFileInput,
  FormInput,
  FormSelect,
  FormTextArea,
  PhoneInputComponent,
} from "@/components/General/form";
import { useRouter } from "next/navigation";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";
import { useDash } from "@/context/dashboardContext";
import { initialBusinessProfileState } from "@/utils/initialStates";
import {
  CloudArrowUp,
  FacebookLogo,
  GlobeHemisphereEast,
  InstagramLogo,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { colors } from "@/constants/colors";
import AvatarIcon from "@/components/General/avatarIcon";
import placeholderLogo from "@/assets/images/km.png";
import MultiSelect from "@/components/General/form/multiselect";

const EditProfile = () => {
  const [phoneValue, setPhoneValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { userProfile, activeBusiness, businessTypes } = useDashboardSelector();

  const router = useRouter();
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState<string[]>(
    []
  );

  const handleGoBack = () => {
    router.back();
  };

  const { cities, regions, countries } = useAuthSelector();

  const {
    isCountryFetching,
    isRegionFetching,
    isCitiesFetching,
    getCountryRegions,
    getRegionCities,
  } = useAppContext();

  const { handleUpdateBusiness, isBusinessEditing } = useDash();

  const [businessInputs, setBusinessInputs] = useState<CreateBusinessProps>(
    initialBusinessProfileState
  );
  const [originalBusinessInputs, setOriginalBusinessInputs] =
    useState<CreateBusinessProps>(initialBusinessProfileState);
  const [originalPhoneValue, setOriginalPhoneValue] = useState("");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalSelectedBusinessTypes, setOriginalSelectedBusinessTypes] =
    useState<string[]>([]);
  const [isOthersShown, setIsOthersShown] = useState(false);

  const mapBusinessTypeValuesToLabels = (values: string[]) => {
    if (!businessTypes || !Array.isArray(values)) return [];
    return values.map((value) => {
      const businessType = businessTypes.find((bt) => bt.value === value);
      return businessType ? businessType.label : value;
    });
  };

  const mapBusinessTypeLabelsToValues = (labels: string[]) => {
    if (!businessTypes || !Array.isArray(labels)) return [];
    return labels.map((label) => {
      const businessType = businessTypes.find((bt) => bt.label === label);
      return businessType ? businessType.value : label;
    });
  };

  useEffect(() => {
    if (activeBusiness && businessTypes && businessTypes.length > 0) {
      const mappedData = {
        id: activeBusiness?.id || "",
        user_id: activeBusiness?.user_id || "",
        business_name: activeBusiness?.business_name || "",
        business_address: activeBusiness?.business_address || "",
        business_email: activeBusiness?.business_email || "",
        business_phone: activeBusiness?.business_phone || "",
        business_phone_number: activeBusiness?.business_phone || "",
        business_logo: activeBusiness?.business_logo || "",
        business_type: activeBusiness?.business_type || "",
        country: activeBusiness?.country || "",
        city: activeBusiness?.city || "",
        region: activeBusiness?.region || "",
        region_two: activeBusiness?.region_two || "",
        city_two: activeBusiness?.city_two || "",
        number_of_store: activeBusiness?.number_of_store || 0,
        where_do_you_hear_about_us:
          activeBusiness?.where_do_you_hear_about_us || "",
        year_established: activeBusiness?.year_established || "",
        instagram: activeBusiness?.instagram || "",
        facebook: activeBusiness?.facebook || "",
        website: activeBusiness?.website || "",
        expectations: activeBusiness?.expectations || "",
        business_headquarters: activeBusiness?.business_headquarters || "",
        tin_number: activeBusiness?.tin_number || "",
      };

      setBusinessInputs(mappedData);
      setOriginalBusinessInputs(mappedData);

      if (activeBusiness?.business_type) {
        let businessTypesArray: string[] = [];

        if (Array.isArray(activeBusiness.business_type)) {
          businessTypesArray = mapBusinessTypeValuesToLabels(
            activeBusiness.business_type
          );
        } else if (
          typeof activeBusiness.business_type === "string" &&
          activeBusiness.business_type
        ) {
          if ((activeBusiness.business_type as string).includes(",")) {
            const typeValues = (activeBusiness.business_type as string)
              .split(",")
              .map((type: string) => type.trim());
            businessTypesArray = mapBusinessTypeValuesToLabels(typeValues);
          } else {
            businessTypesArray = mapBusinessTypeValuesToLabels([
              activeBusiness.business_type as string,
            ]);
          }
        }

        setSelectedBusinessTypes(businessTypesArray);
        setOriginalSelectedBusinessTypes(businessTypesArray);
      }

      if (activeBusiness?.business_phone) {
        setPhoneValue(activeBusiness.business_phone);
        setOriginalPhoneValue(activeBusiness.business_phone);
      }

      const hearAboutUsOptions = [
        "From a friend",
        "Instagram",
        "Facebook",
        "Twitter",
      ];
      if (
        activeBusiness?.where_do_you_hear_about_us &&
        !hearAboutUsOptions.includes(activeBusiness.where_do_you_hear_about_us)
      ) {
        setIsOthersShown(true);
      }
    }
  }, [activeBusiness, businessTypes]);

  useEffect(() => {
    if (businessTypes && businessTypes.length > 0) {
      if (activeBusiness?.business_type) {
        const testArray = Array.isArray(activeBusiness.business_type)
          ? activeBusiness.business_type
          : [activeBusiness.business_type];

        const mapped = mapBusinessTypeValuesToLabels(testArray);
      }
    }
  }, [businessTypes, activeBusiness?.business_type]);

  const handleBusinessInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (businessInputs?.country) {
      getCountryRegions(businessInputs.country);
    }
  }, [businessInputs?.country]);

  useEffect(() => {
    if (businessInputs?.country && businessInputs?.region) {
      getRegionCities(businessInputs.country, businessInputs.region);
    }
  }, [businessInputs?.region]);

  useEffect(() => {
    if (phoneValue) {
      setBusinessInputs({
        ...businessInputs,
        business_phone_number: phoneValue,
        business_phone: phoneValue,
      });
    }
  }, [phoneValue]);

  const hasChanges = () => {
    if (phoneValue !== originalPhoneValue) return true;

    if (file !== originalFile) return true;

    if (
      JSON.stringify(selectedBusinessTypes.sort()) !==
      JSON.stringify(originalSelectedBusinessTypes.sort())
    ) {
      return true;
    }

    const fieldsToCompare: (keyof CreateBusinessProps)[] = [
      "business_name",
      "business_address",
      "business_email",
      "business_type",
      "country",
      "city",
      "region",
      "region_two",
      "city_two",
      "number_of_store",
      "where_do_you_hear_about_us",
      "year_established",
      "instagram",
      "facebook",
      "website",
      "expectations",
      "business_headquarters",
      "tin_number",
    ];

    return fieldsToCompare.some(
      (field) => businessInputs?.[field] !== originalBusinessInputs?.[field]
    );
  };

  return (
    <main className="px-4 md:px-8 lg:px-16 pb-8 w-full lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white lg:shadow-lg rounded-lg">
      <div className="flex items-center justify-between relative">
        <div
          onClick={handleGoBack}
          className="absolute left-0 cursor-pointer flex items-center gap-2"
        >
          <ChevronLeft color="#0052A3" />
          <span className="text-[#0052A3] font-semibold">Back</span>
        </div>

        <Typography className="text-[#5A5555] font-semibold mx-auto">
          Edit Profile
        </Typography>
      </div>

      <div className="mt-4">
        <Image src={rectangle} alt="profile_picture" className="w-full" />
      </div>

      <div className="flex flex-col sm:flex-row lg:items-center text-[#0052A3] justify-between -mt-8">
        <div className="flex items-center gap-2">
          <Avatar
            src={
              activeBusiness?.business_logo ||
              "https://docs.material-tailwind.com/img/face-2.jpg"
            }
            alt="avatar"
            size="xl"
          />
        </div>
        <button>
          <Typography className="font-medium mt-4 sm:mt-10">
            Update Cover Photo
          </Typography>
        </button>
      </div>

      <form
        className="flex mt-10 flex-col gap-y-8 text-[#101828]"
        onSubmit={(e) => {
          e.preventDefault();
          const businessTypeValues = mapBusinessTypeLabelsToValues(
            selectedBusinessTypes
          );
          const updatedBusinessInputs = {
            ...businessInputs,
            business_type: businessTypeValues,
          };
          handleUpdateBusiness(updatedBusinessInputs, file, () => {});
        }}
      >
        <FormInput
          type="text"
          label="Name"
          placeholder="e.g J.M Ventures"
          value={businessInputs?.business_name}
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
                const values = mapBusinessTypeLabelsToValues(selected);
                setBusinessInputs({
                  ...businessInputs,
                  business_type: values,
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
            value={businessInputs?.tin_number}
            name="tin_number"
            onChange={handleBusinessInputChange}
          />
          <FormInput
            type="text"
            label="Address"
            placeholder="e.g P.O Box 1234"
            value={businessInputs?.business_address}
            name="business_address"
            onChange={handleBusinessInputChange}
          />
        </div>

        <FormInput
          type="text"
          label="Email"
          placeholder="email@example.com"
          value={businessInputs?.business_email}
          name="business_email"
          onChange={handleBusinessInputChange}
        />

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
                value={businessInputs?.country}
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
                options={countries?.map((country) => country?.name) || []}
                value={businessInputs?.country}
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
                options={regions?.map((rg) => rg?.name) || []}
                value={businessInputs?.region}
                name="region"
                onChange={handleBusinessInputChange}
                required
              />
            ) : (
              <FormInput
                label="Region"
                placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
                readOnly={isRegionFetching}
                value={businessInputs?.region}
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
                options={cities?.map((city) => city?.name)}
                readOnly={isCitiesFetching}
                value={businessInputs?.city}
                name="city"
                onChange={handleBusinessInputChange}
              />
            ) : (
              <FormInput
                label="City"
                required
                placeholder={isCitiesFetching ? "Loading..." : "Enter City"}
                readOnly={isCitiesFetching}
                value={businessInputs?.city}
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
            value={businessInputs?.number_of_store}
            name="number_of_store"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const numericValue = parseInt(e.target.value, 10) || 0;
              setBusinessInputs((prev) => ({
                ...prev,
                number_of_store: numericValue,
              }));
            }}
          />
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
            value={
              isOthersShown
                ? "Others"
                : businessInputs?.where_do_you_hear_about_us
            }
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
            label="Year Established"
            placeholder="Enter"
            value={businessInputs?.year_established}
            name="year_established"
            onChange={handleBusinessInputChange}
          />
        </div>

        {isOthersShown && (
          <FormInput
            label="Others"
            optional
            placeholder="Enter"
            value={businessInputs?.where_do_you_hear_about_us}
            name="where_do_you_hear_about_us"
            onChange={handleBusinessInputChange}
          />
        )}

        <div>
          <Typography className="text-sm font-semibold mb-4">Logo</Typography>
          <DragAndDropFileInput
            onFileSelect={(file) => {
              setFile(file?.[0] || null);
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
              value={businessInputs?.website}
              name="website"
              onChange={handleBusinessInputChange}
            />
            <FormInput
              type="text"
              label="Instagram"
              placeholder="Instagram"
              icon={<InstagramLogo />}
              iconPosition="left"
              value={businessInputs?.instagram}
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
              value={businessInputs?.facebook}
              name="facebook"
              onChange={handleBusinessInputChange}
            />
          </div>
        </div>

        <FormTextArea
          label="What are your goals and expectations for promoting your brand on Kola Market"
          placeholder="Type here...."
          value={businessInputs?.expectations}
          name="expectations"
          onChange={handleBusinessInputChange}
        />

        <FormInput
          type="text"
          label="Business Headquarters"
          placeholder="Enter Headquarters"
          min={0}
          value={businessInputs?.business_headquarters}
          name="business_headquarters"
          onChange={handleBusinessInputChange}
        />

        <div>
          <Button variant="text" className="flex gap-x-2 items-center p-0">
            <PaperPlaneTilt size="16px" color={colors?.blue_pry} />
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
                {userProfile?.mobile_number} | {userProfile?.email || ""}
              </Typography>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-6 normal-case bg-pry2 text-sm font-normal"
              loading={isBusinessEditing}
              disabled={!hasChanges() || isBusinessEditing}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
