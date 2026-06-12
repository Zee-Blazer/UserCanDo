"use client";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FormInput } from "@/components/General/form";
import { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import ValidationErrorCheck from "@/components/General/validationErrorCheck";
import { useRouter } from "next/navigation";
import { useDash } from "@/context/dashboardContext";
import { USE_CASES, UseCase } from "@/types";
import { useAuthSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";

const ResetShopperPinPage = () => {
  const router = useRouter();
  const { loginData } = useAuthSelector();
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const { isPinUpdating, handleUpdatePin } = isAgent ? useAgent() : useDash();

  const [isOldPinShowing, setIsOldPinShowing] = useState(false);
  const [isNewPinShowing, setIsNewPinShowing] = useState(false);
  const [isConfirmPinShowing, setIsConfirmPinShowing] = useState(false);
  const [form, setForm] = useState({
    old_PIN: "",
    new_PIN: "",
    confirm_PIN: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const pinData = {
      current_pin: form.old_PIN,
      new_pin: form.new_PIN,
      new_confirm_pin: form.confirm_PIN,
    };

    handleUpdatePin(pinData);
  };

  const isAboveSixCharacters = form.new_PIN.length > 6;
  const hasUpperAndLowerCase = /(?=.*[a-z])(?=.*[A-Z])/.test(form.new_PIN);
  const hasNumberOrSpecialChar = /(?=.*\d)|(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
    form.new_PIN
  );
  const isPasswordValid =
    isAboveSixCharacters && hasUpperAndLowerCase && hasNumberOrSpecialChar;
  const doPasswordsMatch =
    form.new_PIN && form.confirm_PIN && form.new_PIN === form.confirm_PIN;

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <Typography className="text-xl font-medium mb-6">My Profile</Typography>
      <div className="bg-white w-full max-w-2xl mx-auto px-10 py-8 rounded-3xl shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A]">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 cursor-pointer text-pry2 text-sm font-medium"
          >
            <ChevronLeft size={18} />
            <span>Back</span>
          </button>
          <div className="flex flex-col items-center gap-y-2">
            <Typography className="text-lg font-inter font-medium text-[#5A5555]">
              Resetting Your PIN
            </Typography>
            <Typography className="text-[#6D7280] font-inter ">
              Please enter and confirm your new PIN to proceed.
            </Typography>
          </div>
          <div className="w-10"></div>
        </div>
        <form>
          <div className="flex flex-col gap-y-1 pt-4">
            <label className="flex justify-between items-end">
              <Typography className=" font-medium text-sm">
                Old PIN Code <span className="text-[#F63838]">*</span>
              </Typography>
            </label>
            <FormInput
              type={isOldPinShowing ? "tel" : "password"}
              onChange={handleInputChange}
              name="old_PIN"
              bgColor="transparent"
              value={form.old_PIN}
              icon={
                <IconButton
                  variant="text"
                  onClick={() => {
                    setIsOldPinShowing(!isOldPinShowing);
                  }}
                >
                  {isOldPinShowing ? (
                    <EyeOff color="#5b5b5b" size={15} />
                  ) : (
                    <Eye color="#5b5b5b" size={15} />
                  )}
                </IconButton>
              }
              iconPosition="right"
            />
          </div>

          <div className="flex flex-col gap-y-1 pt-4">
            <label className="flex justify-between items-end">
              <Typography className=" font-medium text-sm">
                New PIN Code <span className="text-[#F63838]">*</span>
              </Typography>
              {isPasswordValid ? (
                <Typography className="text-xs font-medium text-[#027A48]">
                  Strong
                </Typography>
              ) : (
                form.new_PIN &&
                !isPasswordValid && (
                  <Typography className="text-xs font-medium text-[#B42318]">
                    Weak
                  </Typography>
                )
              )}
            </label>
            <FormInput
              type={isNewPinShowing ? "tel" : "password"}
              bgColor="transparent"
              onChange={handleInputChange}
              value={form.new_PIN}
              name="new_PIN"
              icon={
                <IconButton
                  variant="text"
                  onClick={() => {
                    setIsNewPinShowing(!isNewPinShowing);
                  }}
                >
                  {isNewPinShowing ? (
                    <EyeOff color="#5b5b5b" size={15} />
                  ) : (
                    <Eye color="#5b5b5b" size={15} />
                  )}
                </IconButton>
              }
              iconPosition="right"
            />
          </div>

          <div className="pt-2 pb-8 flex flex-col gap-y-3">
            <ValidationErrorCheck
              label="Minimum of 6 characters"
              status={isAboveSixCharacters}
            />
            <ValidationErrorCheck
              label="Has an uppercase and lowercase"
              status={hasUpperAndLowerCase}
            />
            <ValidationErrorCheck
              label="Has a number or a special character e.g @,#,?"
              status={hasNumberOrSpecialChar}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label className="flex justify-between items-end">
              <Typography className=" font-medium text-sm">
                Confirm Password <span className="text-[#F63838]">*</span>
              </Typography>
              {form.confirm_PIN && doPasswordsMatch ? (
                <Typography className="text-xs font-medium text-[#027A48]">
                  Passwords Match.
                </Typography>
              ) : (
                form.confirm_PIN &&
                !doPasswordsMatch && (
                  <Typography className="text-xs font-medium text-[#B42318]">
                    Passwords don't match.
                  </Typography>
                )
              )}
            </label>
            <FormInput
              type={isConfirmPinShowing ? "tel" : "password"}
              onChange={handleInputChange}
              value={form.confirm_PIN}
              bgColor="transparent"
              name="confirm_PIN"
              icon={
                <IconButton
                  variant="text"
                  onClick={() => {
                    setIsConfirmPinShowing(!isConfirmPinShowing);
                  }}
                >
                  {isConfirmPinShowing ? (
                    <EyeOff color="#5b5b5b" size={15} />
                  ) : (
                    <Eye color="#5b5b5b" size={15} />
                  )}
                </IconButton>
              }
              iconPosition="right"
            />
          </div>
        </form>
        <div className="flex flex-col pt-8 gap-y-6">
          <Button
            className="bg-[#007AF5] flex justify-center w-full font-semibold normal-case py-4 "
            onClick={handleSubmit}
            loading={isPinUpdating}
            disabled={isPinUpdating}
          >
            Save
          </Button>
          <Link href={isAgent ? ROUTES.agentProfile : ROUTES.shopperProfile}>
            <Button className="bg-[#E0F0FF] text-[#007AF5] w-full font-semibold normal-case">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetShopperPinPage;
