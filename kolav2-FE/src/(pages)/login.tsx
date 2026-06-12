"use client";
import { ArrowLeft } from "lucide-react";
import "react-phone-number-input/style.css";
import AuthHeader from "@/components/auth/authHeader";
import { Typography } from "@material-tailwind/react";
import AuthNavigation from "@/components/auth/authNavigation";
import ActionButton from "@/components/auth/continueAction";
import { useEffect, useState, useRef } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useAuth } from "@/context/authContext";
import PhonePasswordInput from "@/components/auth/PhonePasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { getHomeRoute } from "@/utils/auth";
import { Spinner } from "react-activity";

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [pincode, setPincode] = useState("");
  const hasRedirectedRef = useRef(false);
  const { setLoginInputDetails, loginInputDetails, handleLogin, isLoggingIn } = useAuth();
  const { isLoggedIn, loginData } = useAuthSelector();
  const { userProfile } = useDashboardSelector();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  useEffect(() => {
    if (isLoggedIn && userProfile && !hasRedirectedRef.current && !isLoggingIn) {
      hasRedirectedRef.current = true;

      const targetRoute = redirectPath || getHomeRoute({
        ...userProfile,
        use_case: loginData?.use_case,
      });
      router.replace(targetRoute);
    }
  }, [isLoggedIn, userProfile, isLoggingIn]);

  useEffect(() => {
    if (!value) return;
    const code = value.trim().slice(0, 4);
    const phone = value.trim().slice(4, value.length);
    setLoginInputDetails({
      ...loginInputDetails,
      country_code: code,
      phone_number: phone,
    });
  }, [value]);

  useEffect(() => {
    setLoginInputDetails({
      ...loginInputDetails,
      password: pincode,
    });
  }, [pincode]);

  if (isLoggedIn && userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white">
      <AuthHeader pageType="login" />
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out p-4">
          <div className="max-w-lg mx-auto min-h-[60vh] flex-1 flex flex-col">
            <AuthNavigation onBack={() => {}} activeIndex={0} />

            <div className="pt-6">
              <Typography className="text-[2rem] leading-[2.5rem] font-semibold">
                Welcome back to <br></br> Kola Market
              </Typography>
              <PhonePasswordInput
                value={value}
                setValue={setValue}
                pincode={pincode}
                setPincode={setPincode}
                showForgotPassword={true}
              />
            </div>
            <div className="flex-1 pt-12" />
            <ActionButton
              loading={isLoggingIn}
              action={() => handleLogin()}
              label="Login"
              disabled={
                !value || !isValidPhoneNumber(value) || pincode.length < 4
              }
              icon={<ArrowLeft />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
