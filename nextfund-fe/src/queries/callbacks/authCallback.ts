import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";
import { toast } from "react-hot-toast";
import { setAdminUserProfile } from "../../Redux/features/adminSlice";
import { logUserIn, updateLoginAvatar } from "../../Redux/features/authSlice";
import {
  setBusinessUserProfile,
  setCurrentStep,
  setIsAccountCreated,
} from "../../Redux/features/businessSlice";
import { setInvestorUserProfile } from "../../Redux/features/investorSlice";
import { LoginApiResponse } from "../../types/auth";
import { setAuthToken } from "../../utils/auth";

export const loginCallback = (
  res: LoginApiResponse,
  dispatch: React.ActionDispatch<any>,
  router: AppRouterInstance
) => {
  let changePassword = false;

  if (!res || !res.payload) {
    toast.error("Invalid response from server", {
      position: "top-right",
    });
    return;
  }

  const payload = res.payload;
  setAuthToken(payload?.access_token as string);

  // Store userId in localStorage for user-specific modal dismissal tracking
  if (typeof window !== "undefined" && payload?.user_id) {
    localStorage.setItem("current_user_id", payload.user_id);
  }

  const isDefaultAvatar =
    payload?.avatar &&
    typeof payload.avatar === "string" &&
    !payload.avatar.startsWith("http://") &&
    !payload.avatar.startsWith("https://") &&
    (payload.avatar.includes("data:image/svg+xml") ||
      payload.avatar.includes("PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iOTAi") ||
      payload.avatar.includes("PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMi"));

  const avatarToStore = isDefaultAvatar ? null : payload?.avatar || null;

  // Store avatar in localStorage for comparison later
  if (avatarToStore && typeof window !== "undefined") {
    localStorage.setItem("current_avatar", avatarToStore);
  }

  dispatch(
    logUserIn({
      access_token: payload?.access_token,
      refresh_token: payload?.refresh_token,
      user_id: payload?.user_id,
      email: payload?.email,
      first_name: payload?.first_name,
      last_name: payload?.last_name,

      avatar: avatarToStore,
      user_type: payload?.user_type,
      role: payload?.role,
      is_business: payload?.is_business,
      business_id: payload?.business_id,
      is_first_login: payload?.is_first_login,
    })
  );

  const isAdmin = typeof Number(payload) === "number";

  const toastMsg =
    payload?.user_type === "business" || payload?.user_type === "investor"
      ? "Login successful!"
      : isAdmin
      ? "Verification email sent!"
      : "Login successful!";

  toast.success(toastMsg, {
    position: "top-right",
  });

  if (payload?.user_type === "business") {
    if (!payload?.is_listing_created) {
      dispatch(setBusinessUserProfile(payload));
      dispatch(setCurrentStep("funding")); // Set to funding step (second step)
      router.push("/sign-up?type=business");
    } else {
      dispatch(setBusinessUserProfile(payload));
      router.push("/business");
    }
  } else if (payload?.user_type === "investor") {
    dispatch(setInvestorUserProfile(payload));

    // Always fetch from /api/v1/user to get the latest avatar
    // This ensures we have the most up-to-date avatar from the backend
    // The /api/v1/user endpoint is the source of truth for user data
    if (typeof window !== "undefined") {
      const fetchUserData = async (retries = 3, delay = 300) => {
        for (let i = 0; i < retries; i++) {
          try {
            const baseURL =
              process.env.NEXT_PUBLIC_BASE_URL ||
              "https://api.dev.nexfundafrica.com/api/v1";
            const token = localStorage.getItem("access_token");

            if (!token) {
              // Wait a bit and retry if token isn't ready
              if (i < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
              }
              return;
            }

            // Fetch from /api/v1/user endpoint to get actual user data including avatar
            // This is the source of truth for user data
            const userResponse = await fetch(`${baseURL}/user`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            if (userResponse.ok) {
              const userResult = await userResponse.json();
              // The /api/v1/user endpoint returns the user object directly (not wrapped in payload)
              // But handle both cases for safety
              const userData = userResult?.payload || userResult;
              const userAvatar = userData?.avatar;

              // Update login data with avatar from /api/v1/user
              // This ensures we always have the latest avatar from the backend
              if (
                userAvatar &&
                userAvatar.trim() !== "" &&
                userAvatar !== null
              ) {
                dispatch(updateLoginAvatar(userAvatar));
                localStorage.setItem("current_avatar", userAvatar);
                // Dispatch event to notify components to refetch
                window.dispatchEvent(new CustomEvent("avatarUpdated"));
                return; // Success, exit retry loop
              } else {
                // If avatar is null/empty, clear it from login data
                dispatch(updateLoginAvatar(null));
                localStorage.removeItem("current_avatar");
                window.dispatchEvent(new CustomEvent("avatarUpdated"));
                return; // Exit retry loop even if no avatar
              }
            }
          } catch (error) {
            // If this is the last retry, log the error
            if (i === retries - 1) {
              console.error("Failed to fetch user data after retries:", error);
            }
            // Wait before retrying
            if (i < retries - 1) {
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        }
      };

      // Always fetch user data to get the latest avatar
      // This ensures avatar from signup is displayed correctly
      fetchUserData();
      // Also retry after a delay to ensure we get the avatar
      setTimeout(() => fetchUserData(2, 500), 1000);

      // Also dispatch event immediately to notify components
      window.dispatchEvent(new CustomEvent("avatarUpdated"));
    }

    router.push("/dashboard");
  } else if (isAdmin) {
    payload.change_password
      ? // router.push("/change-password")
        (changePassword = true)
      : router.push("/verification");
  }

  return changePassword;
};

export const loginErrorCallback = (
  error: any,
  onError?: (error: any) => void
) => {
  toast.error(
    error.data?.message ||
      error.message ||
      "Login failed. Please check your credentials.",
    {
      position: "top-right",
    }
  );

  if (onError) onError(error);
};

export const verificationCallback = (
  res: any,
  dispatch: React.ActionDispatch<any>,
  router: AppRouterInstance
) => {
  if (!res || !res.payload) {
    toast.error("Invalid response from server", {
      position: "top-right",
    });
    return;
  }

  const payload = res.payload;
  setAuthToken(payload?.access_token as string);
  dispatch(
    logUserIn({
      access_token: payload?.access_token,
      refresh_token: payload?.refresh_token,
      user_id: payload?.user_id,
      email: payload?.email,
      first_name: payload?.first_name,
      last_name: payload?.last_name,
      avatar: payload?.avatar || null,
      user_type: payload?.user_type,
      role: payload?.role,
      is_business: payload?.is_business,
      business_id: payload?.business_id,
    })
  );

  if (payload?.user_type === "admin") {
    dispatch(setAdminUserProfile(payload));
    toast.success("Verification successful!", {
      position: "top-right",
    });
    router.push("/admin");
  } else {
    toast.error("User type is not admin.", {
      position: "top-right",
    });
  }
};

export const businessRegistrationCallback = (
  res: any,
  formData: any,
  dispatch: React.ActionDispatch<any>,
  onSuccess?: (result: any) => void
) => {
  if (res.is_success) {
    const businessProfile = {
      business_id: res.payload.business_id || "",
      user_id: res.payload.user_id || "",
      company_name: formData.companyName,
      industry_sector: formData.industry,
      year_founded: formData.yearFounded,
      country_location: formData.country,
      company_size: formData.companySize,
      current_stage: formData.currentStage,
      description: formData.briefDescription,
      website_url: formData.websiteUrl,
      first_name: formData.firstName,
      last_name: formData.lastName,
      linked_in_profile: formData.linkedinProfile,
      email: formData.emailAddress,
      phone_number: formData.phoneNumber,
    };

    // Set business profile
    dispatch(setBusinessUserProfile(businessProfile));

    // Mark account as created
    dispatch(setIsAccountCreated(true));

    const loginData = {
      access_token: res.payload.access_token || "",
      refresh_token: res.payload.refresh_token || "",
      user_id: res.payload.user_id || "",
      email: formData.emailAddress,
      first_name: formData.firstName,
      last_name: formData.lastName,
      user_type: "business",
      role: res.payload.role || "business",
      is_business: true,
      business_id: res.payload.business_id || "",
    };

    // Also set auth state for business user (simulate login)
    dispatch(logUserIn(loginData));

    toast.success(res.message || "Business registration successful!", {
      position: "top-right",
    });

    if (onSuccess) onSuccess(res);
  } else {
    toast.error(res.message || "Business registration failed!");
  }
};

export const businessRegistrationErrorCallback = (
  error: any,
  onError?: (error: any) => void
) => {
  toast.error(
    error.data?.message || error.message || "Business registration failed",
    {
      position: "top-right",
    }
  );

  if (onError) onError(error);
};

export const investorRegistrationCallback = (
  res: any,
  dispatch: React.ActionDispatch<any>,
  onSuccess?: (result: any) => void
) => {
  if (res.is_success) {
    toast.success(res.message || "Investor registration successful!", {
      position: "top-right",
    });

    if (onSuccess) onSuccess(res);
  }
};

export const investorRegistrationErrorCallback = (
  error: any,
  onError?: (error: any) => void
) => {
  toast.error(
    error.data?.message || error.message || "Investor registration failed",
    {
      position: "top-right",
    }
  );

  if (onError) onError(error);
};

// Business Listing Callbacks
export const businessListingCallback = (
  res: any,
  dispatch: React.ActionDispatch<any>,
  onSuccess?: (result: any) => void
) => {
  if (!res) {
    toast.error("Invalid response from server", {
      position: "top-right",
    });
    return;
  }

  toast.success("Business listing created successfully!", {
    position: "top-right",
  });

  // Update business state with listing ID
  if (res.listing_id) {
    dispatch({ type: "business/setListingId", payload: res.listing_id });
  }

  if (onSuccess) onSuccess(res);
};

export const businessListingErrorCallback = (
  error: any,
  onError?: (error: any) => void
) => {
  const errorMessage =
    error?.data?.message ||
    error?.message ||
    "Failed to create business listing. Please try again.";
  toast.error(errorMessage, {
    position: "top-right",
  });

  if (onError) onError(error);
};

export const businessListingUpdateCallback = (
  res: any,
  dispatch: React.ActionDispatch<any>,
  onSuccess?: (result: any) => void
) => {
  if (!res) {
    toast.error("Invalid response from server", {
      position: "top-right",
    });
    return;
  }

  toast.success("Business listing updated successfully!", {
    position: "top-right",
  });

  if (onSuccess) onSuccess(res);
};

export const fileUploadCallback = (
  res: any,
  onSuccess?: (result: any) => void
) => {
  if (!res) {
    toast.error("Invalid response from server", {
      position: "top-right",
    });
    return;
  }

  toast.success("File uploaded successfully!", {
    position: "top-right",
  });

  if (onSuccess) onSuccess(res);
};

export const fileUploadErrorCallback = (
  error: any,
  onError?: (error: any) => void
) => {
  const errorMessage =
    error?.data?.message ||
    error?.message ||
    "Failed to upload file. Please try again.";
  toast.error(errorMessage, {
    position: "top-right",
  });

  if (onError) onError(error);
};

export const forgotPasswordCallback = (res: any, router: AppRouterInstance) => {
  if (res.is_success) {
    toast.success(res.message || "Reset password sent!", {
      position: "top-right",
    });

    // router.push(res.payload);
  }
};

export const resetPasswordCallback = (res: any, router: AppRouterInstance) => {
  if (res.is_success) {
    toast.success(res.message || "Password reset successful!", {
      position: "top-right",
    });

    router.push("/sign-in");
  }
};
