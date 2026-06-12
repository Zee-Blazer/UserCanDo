"use client";

import { DragAndDropFileInput, FormSelect } from "@/components/General/form";
import { Button, Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { ChangeEvent } from "react";
import { FormInput } from "@/components/General/form";

import {
  getFileNameFromUrl,
  getFilePreview,
  identificationOptions,
} from "@/utils/helpers";

interface PersonalInfoFormProps {
  isEditing?: boolean;
  handleBack: () => void;
  handleContinue: () => void;
  formData: CreditLimitFormProps;
  setFormData: React.Dispatch<React.SetStateAction<CreditLimitFormProps>>;
}

const PersonalInfoForm = ({
  isEditing = true,
  handleBack,
  handleContinue,
  formData,
  setFormData,
}: PersonalInfoFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (name: string, files: File[]) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formIsValid =
    formData?.full_name?.trim() &&
    formData?.email?.trim() &&
    emailRegex.test(formData?.email || "") &&
    formData?.phone_number?.trim() &&
    formData?.next_of_kin_phone_number?.trim() &&
    formData?.means_of_identification?.trim() &&
    formData?.identification_file &&
    formData?.next_of_kin_name?.trim() &&
    formData?.address?.trim() &&
    formData?.registered_business_address?.trim() &&
    formData?.date_of_birth?.trim();

  return (
    <main className="rounded-md py-10 mx-auto h-auto gap-8 flex flex-col">
      <header className="px-8">
        <Typography variant="h4" className="text-center font-bold">
          Personal Information
        </Typography>
        <Typography className="text-[#6F6F6F] mt-2 text-center text-sm font-normal">
          Kindly note that we require you to input your information as it
          appears on your valid ID
        </Typography>
      </header>

      <div className="grid w-full px-8 grid-cols-1 gap-8">
        <FormInput
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={formData?.full_name}
          name="full_name"
          onChange={isEditing ? handleInputChange : undefined}
          bgColor="transparent"
          paddingY="3"
          readOnly={!isEditing}
        />

        <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-4 justify-between">
          <div className="w-full lg:w-[48%]">
            <FormInput
              label="Phone Number"
              placeholder="Enter your phone number"
              required
              name="phone_number"
              value={formData.phone_number || ""}
              onChange={isEditing ? handleInputChange : undefined}
              className="bg-white rounded-none flex-1"
              readOnly={!isEditing}
            />
          </div>
          <div className="w-full lg:w-[48%]">
            <FormInput
              label="Email"
              placeholder="Enter email address"
              required
              type="email"
              value={formData?.email}
              name="email"
              onChange={isEditing ? handleInputChange : undefined}
              bgColor="transparent"
              paddingY="3"
              readOnly={!isEditing}
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <FormSelect
            label="Identification"
            required={true}
            options={identificationOptions}
            placeholder="Select means of identification"
            className="rounded-none text-gray_4"
            paddingY="3"
            bgColor="transparent"
            value={formData?.means_of_identification}
            name="means_of_identification"
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
          />
          <DragAndDropFileInput
            id="identification-file"
            onFileSelect={(files) =>
              handleFileSelect("identification_file", files)
            }
            value={getFilePreview(formData?.identification_file) || null}
            bgColor="inherit"
            borderStyle="dashed"
            borderColor="#DEDFEO"
            borderWidth="2px"
            size="sm"
            icon={<CloudArrowUp />}
            titleComponent={
              <Typography className="text-black pt-4">
                Drag your file here, or{" "}
                <span className="text-pry2 font-medium">click to upload</span>
              </Typography>
            }
            subHeadingComponent={
              formData?.identification_file ? (
                <Typography className="text-sm text-black mt-2">
                  {getFileNameFromUrl(formData?.identification_file)}
                </Typography>
              ) : (
                <Typography className="text-xs">PNG, JPG</Typography>
              )
            }
            labelDirection="vertical"
            editable={isEditing}
            centerPreview={true}
          />
        </div>

        <div className="flex flex-col gap-y-4 lg:flex-row items-center gap-x-2 justify-between">
          <div className="w-full lg:w-[48%]">
            <FormInput
              label="Next of Kin's Full Name"
              placeholder="Enter next of kin's name"
              required
              value={formData?.next_of_kin_name}
              name="next_of_kin_name"
              onChange={isEditing ? handleInputChange : undefined}
              bgColor="transparent"
              paddingY="3"
              readOnly={!isEditing}
            />
          </div>
          <div className="flex flex-col gap-1 w-full lg:w-[48%]">
            <FormInput
              label="Next of Kin's Phone Number"
              placeholder="Enter next of kin's phone number"
              required
              name="next_of_kin_phone_number"
              value={formData?.next_of_kin_phone_number || ""}
              onChange={isEditing ? handleInputChange : undefined}
              className="bg-white rounded-none flex-1"
              readOnly={!isEditing}
            />
          </div>
        </div>

        <FormInput
          label="Residential Address"
          placeholder="Enter residential address"
          required
          value={formData?.address}
          name="address"
          onChange={isEditing ? handleInputChange : undefined}
          bgColor="transparent"
          paddingY="3"
          readOnly={!isEditing}
        />

        <FormInput
          label="Registered Business Address"
          placeholder="Enter registered business address"
          required
          value={formData?.registered_business_address}
          name="registered_business_address"
          onChange={isEditing ? handleInputChange : undefined}
          bgColor="transparent"
          paddingY="3"
          readOnly={!isEditing}
        />

        <FormInput
          label="Date of Birth"
          placeholder="Select date"
          type="date"
          required
          value={formData?.date_of_birth}
          name="date_of_birth"
          onChange={isEditing ? handleInputChange : undefined}
          bgColor="transparent"
          paddingY="3"
          readOnly={!isEditing}
        />

        <div className="flex justify-between gap-4 pt-2">
          <Button
            onClick={handleBack}
            className="bg-white text-pry2 normal-case font-normal text-sm px-8 py-3 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
          >
            Back
          </Button>
          <Button
            className="bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm"
            disabled={!formIsValid}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PersonalInfoForm;
