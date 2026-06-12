import { Dialog, DialogBody, Typography } from "@material-tailwind/react";
import { useAuth } from "@/context/authContext";
import { useEffect, useRef, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhonePasswordInput from "./PhonePasswordInput";
import ActionButton from "./continueAction";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { getHomeRoute } from "@/utils/auth";
import { Spinner } from "react-activity";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  callback?: () => void;
}

const LoginDialog = ({ open, onClose, callback }: LoginDialogProps) => {
  const [value, setValue] = useState("");
  const [pincode, setPincode] = useState("");
  const hasRedirectedRef = useRef(false);
  const { setLoginInputDetails, loginInputDetails, handleLogin, isLoggingIn } =
    useAuth();
  const { isLoggedIn, loginData } = useAuthSelector();
  const { userProfile } = useDashboardSelector();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  useEffect(() => {
    if (!open) {
      setValue("");
      setPincode("");
      setLoginInputDetails({
        ...loginInputDetails,
        country_code: "",
        phone_number: "",
        password: "",
      });
    }
  }, [open, setLoginInputDetails]);

  useEffect(() => {
    if (
      open &&
      isLoggedIn &&
      userProfile &&
      !hasRedirectedRef.current &&
      !isLoggingIn
    ) {
      hasRedirectedRef.current = true;

      const targetRoute =
        redirectPath ||
        getHomeRoute({
          ...userProfile,
          use_case: loginData?.use_case,
        });
      router.replace(targetRoute);
    }
  }, [open, isLoggedIn, userProfile, isLoggingIn]);

  const handlePhoneChange = (newValue: string) => {
    if (!newValue) return;
    const code = newValue.trim().slice(0, 4);
    const phone = newValue.trim().slice(4, newValue.length);
    setLoginInputDetails({
      ...loginInputDetails,
      country_code: code,
      phone_number: phone,
    });
    setValue(newValue);
  };

  const handlePincodeChange = (newPincode: string) => {
    setLoginInputDetails({
      ...loginInputDetails,
      password: newPincode,
    });
    setPincode(newPincode);
  };

  const handleSubmit = () => {
    handleLogin(() => {
      callback?.();
      onClose();
    });
  };
  
  if (open && isLoggedIn && userProfile && !hasRedirectedRef.current) {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  );
}

  return (
    <Dialog open={open} handler={onClose} className="bg-white p-4" size="sm">
      <DialogBody className="p-6">
        <div className="flex flex-col">
          <Typography className="text-[2rem] leading-[2.5rem] font-semibold mb-6">
            Welcome back to <br /> Kola Market
          </Typography>

          <PhonePasswordInput
            value={value}
            setValue={handlePhoneChange}
            pincode={pincode}
            setPincode={handlePincodeChange}
            showForgotPassword={true}
          />

          <div className="mt-8">
            <ActionButton
              loading={isLoggingIn}
              action={handleSubmit}
              label="Login"
              disabled={
                !value || !isValidPhoneNumber(value) || pincode.length < 4
              }
              icon={<ArrowLeft />}
            />
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default LoginDialog;
