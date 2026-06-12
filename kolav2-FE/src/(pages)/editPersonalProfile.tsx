"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormInput, PhoneInputComponent } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import {
  useAgentSelector,
  useAuthSelector,
  useDashboardSelector,
} from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { useAgent } from "@/context/agentContext";

const EditPersonalProfile = () => {
  const router = useRouter();
  const { loginData } = useAuthSelector();
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { userProfile } = isAgent ? useAgentSelector() : useDashboardSelector();
  const { handleProfileUpdate, isProfileUpdating } = isAgent
    ? useAgent()
    : useDash();

  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [originalValues, setOriginalValues] = useState({
    phone: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (userProfile) {
      const fullPhoneNumber =
        userProfile?.country_code && userProfile?.mobile_number
          ? `${userProfile.country_code}${userProfile.mobile_number}`
          : userProfile?.mobile_number || "";

      const values = {
        phone: fullPhoneNumber,
        firstName: userProfile?.first_name || "",
        lastName: userProfile?.last_name || "",
        email: userProfile?.email || "",
      };

      setPhone(values.phone);
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setEmail(values.email);
      setOriginalValues(values);
      setIsInitialized(true);
    }
  }, [userProfile]);

  const hasChanges = useMemo(() => {
    if (!isInitialized) return false;

    const currentValues = {
      phone: phone.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    const fieldsChanged =
      currentValues.phone !== originalValues.phone ||
      currentValues.firstName !== originalValues.firstName ||
      currentValues.lastName !== originalValues.lastName ||
      currentValues.email !== originalValues.email;

    const imageChanged = selectedFile !== null;

    return fieldsChanged || imageChanged;
  }, [
    phone,
    firstName,
    lastName,
    email,
    selectedFile,
    originalValues,
    isInitialized,
  ]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    let countryCode = "";
    let mobileNumber = "";

    if (phone) {
      const match = phone.match(/^(\+\d{1,4})(\d+)$/);
      if (match) {
        countryCode = match[1];
        mobileNumber = match[2];
      } else {
        if (phone.startsWith("+")) {
          countryCode = phone.substring(0, 4);
          mobileNumber = phone.substring(4);
        } else {
          mobileNumber = phone;
          countryCode = userProfile?.country_code || "+234";
        }
      }
    }

    const updatedData: any = {};

    if (firstName?.trim()) updatedData.first_name = firstName.trim();
    if (lastName?.trim()) updatedData.last_name = lastName.trim();
    if (email?.trim()) updatedData.email = email.trim();
    if (mobileNumber?.trim() && mobileNumber.length >= 10) {
      updatedData.mobile_number = mobileNumber.trim();
    }
    if (countryCode?.trim() && countryCode.length <= 4) {
      updatedData.country_code = countryCode.trim();
    }

    try {
      await handleProfileUpdate(updatedData, selectedFile || undefined);
      setSelectedFile(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const isButtonDisabled = !hasChanges || isProfileUpdating;

  return (
    <>
      <div>
        <Typography className="text-xl font-medium mb-6">My Profile</Typography>
        <div className="bg-white w-full max-w-2xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
          <div className="flex items-center mb-6 relative">
            <Button
              onClick={() => router.back()}
              className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium bg-transparent shadow-none hover:bg-gray-100 normal-case"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </Button>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Typography className="text-lg font-inter text-center font-medium text-[#5A5555]">
                Edit Profile
              </Typography>
            </div>
          </div>

          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="text-center mx-auto">
              <div className="cursor-pointer" onClick={handleProfilePhotoClick}>
                <Avatar
                  src={
                    selectedImage ||
                    userProfile?.profile_image ||
                    "https://docs.material-tailwind.com/img/face-2.jpg"
                  }
                  alt="avatar"
                  size="xl"
                  className="mb-2"
                />
                <Typography className="text-center text-base text-[#003366]">
                  Change Profile Photo
                </Typography>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="mt-11 px-10">
              <FormInput
                label="Your First Name"
                type="text"
                className="my-3"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />

              <FormInput
                label="Your Last Name"
                type="text"
                className="my-3"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />

              <FormInput
                label="Email Address"
                type="email"
                className="my-3"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <PhoneInputComponent
                value={phone}
                setValue={setPhone}
                label="Enter your phone number"
                className="my-custom-class my-3"
              />

              <Button
                type="submit"
                className="w-full flex justify-center font-semibold normal-case py-4 mt-10 transition-colors duration-200 bg-[#007AF5] hover:bg-[#0066CC] text-white"
                loading={isProfileUpdating}
                disabled={isButtonDisabled}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPersonalProfile;
