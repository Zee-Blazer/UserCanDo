"use client";
import useFetch from "@/api/hooks/useFetch";
import usePostRequest from "@/api/hooks/usePost";
import { EmailIcon } from "@/assets/icons";
import AuthBtns from "@/components/Auth/authBtns";
import { FormCheckbox, FormInput } from "@/components/General/form";
import { ROUTES } from "@/constants/routes";
import { login } from "@/Redux/features/authSlice";
import { LoginProps } from "@/types";
import { validateLoginForm } from "@/types/validate";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loginData, setLoginData] = useState<LoginProps | null>(null);
  const [formErrors, setFormErrors] = useState<LoginProps | null>(null);

  const dispatch = useDispatch();
  const { data, isSuccess, loading, postRequest } = usePostRequest();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const errors = validateLoginForm(loginData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = () => {
    const isValid = validateLogin();
    if (isValid) {
      postRequest("/login", loginData);
    } else {
      console.error("Form is invalid", formErrors);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data?.payload));
      const token = data?.payload?.access_token;

      if (token) {
        localStorage.setItem("token", token);
        window.location.reload();
      }
    }
  }, [isSuccess]);

  return (
    <div>
      <Typography className="dark:text-white text-black text-center text-2xl font-medium">
        Sign in to your account
      </Typography>
      <Typography className="text-center mt-4">
        Stay organized and in control with Keepingly
      </Typography>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-6 my-8"
      >
        <FormInput
          placeholder="Email address"
          required
          type="email"
          icon={<EmailIcon />}
          value={loginData?.email || ""}
          name="email"
          onChange={handleInputChange}
          error={formErrors?.password}
        />

        <FormInput
          placeholder="Password"
          required
          type={isPasswordShown ? "text" : "password"}
          icon={
            <i
              className="text-pry_1 text-gray_3 dark:text-gray_4"
              onClick={() => setIsPasswordShown(!isPasswordShown)}
            >
              {isPasswordShown ? <EyeOff size={20} /> : <Eye size={20} />}
            </i>
          }
          value={loginData?.password || ""}
          name="password"
          onChange={handleInputChange}
          error={formErrors?.password}
        />
        <div className="flex items-center justify-between">
          <FormCheckbox
            checked={isChecked}
            setChecked={setIsChecked}
            label="Remember me"
          />
          <Link href={ROUTES.forgot_password} className="text-pry font-medium">
            Forgot password?
          </Link>
        </div>

        <div className="">
          <Button
            className="text-white bg-pry w-full p-4 text-base my-4 first-letter:uppercase lowercase font-normal flex items-center justify-center"
            type="submit"
            loading={loading}
          >
            <Typography className="first-letter:uppercase">Sign in</Typography>
          </Button>
          <AuthBtns />

          <div className="flex gap-2 justify-center">
            <Typography className="text-pry_1">
              Don&apos;t have an account yet?
            </Typography>
            <Link href={ROUTES.signup} className="text-pry font-bold">
              Create an account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
