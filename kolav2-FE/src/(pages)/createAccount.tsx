"use client";
import AuthHeader from "@/components/auth/authHeader";
import React from "react";
import "react-phone-number-input/style.css";
import { useAuth } from "@/context/authContext";
import usePreventRefresh from "@/api/hooks/usePreventRefresh";

const CreateAccountPage = () => {
  const { activeSlideIndex, currentSlides, createAccountData } = useAuth();
  usePreventRefresh(true);

  const isLastSlideHeaderless =
    activeSlideIndex === currentSlides.length - 1 &&
    createAccountData.use_case === "buyer";

  return (
    <div className="h-screen w-screen bg-white">
      {!isLastSlideHeaderless && <AuthHeader />}
      <div className="relative h-full w-full overflow-hidden">
        {currentSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out mb-4 ${
              index === activeSlideIndex
                ? "translate-x-0 opacity-100"
                : index < activeSlideIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateAccountPage;
