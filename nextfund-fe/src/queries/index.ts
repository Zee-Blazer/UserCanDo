import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAdminUserProfile } from "../Redux/features/adminSlice";
import { logUserOut } from "../Redux/features/authSlice";
import { clearBusinessUserProfile } from "../Redux/features/businessSlice";
import { clearInvestorUserProfile } from "../Redux/features/investorSlice";
import { clearAuthToken } from "../utils/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    // Don't set Content-Type for file uploads - let the browser set it with boundary
    if (
      endpoint !== "uploadFile" &&
      endpoint !== "reUploadDocument" &&
      endpoint !== "registerInvestor" &&
      endpoint !== "uploadInvestorIdDocuments"
    ) {
      headers.set("Content-Type", "application/json");
    }

    // Don't set Accept header for file uploads
    if (
      endpoint !== "uploadFile" &&
      endpoint !== "reUploadDocument" &&
      endpoint !== "registerInvestor" &&
      endpoint !== "uploadInvestorIdDocuments"
    ) {
      headers.set("Accept", "application/json");
    }
    return headers;
  },
  // Add fetch options to handle CORS better
  fetchFn: (input, init) => {
    return fetch(input, {
      ...init,
      mode: "cors",
      credentials: "omit", // Don't send cookies
    });
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    clearAuthToken();

    api.dispatch(logUserOut());
    api.dispatch(clearAdminUserProfile());
    api.dispatch(clearBusinessUserProfile());
    api.dispatch(clearInvestorUserProfile());

    // Clear RTK Query cache on unauthorized
    api.dispatch(apiSlice.util.resetApiState());

    window.location.href = "/sign-in";
  }

  return result;
};

export const tagTypes = {
  dashboard: "dashboard",
  adminTeam: "adminTeam",
  adminSettings: "adminSettings",
  adminFunds: "adminFunds",
  adminDueDiligence: "adminDueDiligence",
  notifications: "notifications",
  businessTeam: "businessTeam",
  investorSettings: "investorSettings",
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(tagTypes),
  endpoints: () => ({}),
});
