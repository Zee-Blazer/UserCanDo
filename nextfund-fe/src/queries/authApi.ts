import { apiSlice } from ".";
import { LoginApiResponse } from "../types/auth";
import {
  BusinessRegistrationRequest,
  BusinessRegistrationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  InvestorRegistrationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/queries-type";

const extendedAuthApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginApiResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    verify: builder.mutation<LoginApiResponse, { token: string }>({
      query: (data) => ({
        url: "/admin_login_verification",
        method: "POST",
        body: data,
      }),
    }),

    registerBusiness: builder.mutation<
      BusinessRegistrationResponse,
      BusinessRegistrationRequest
    >({
      query: (data) => ({
        url: "/register_business",
        method: "POST",
        body: data,
      }),
    }),

    registerInvestor: builder.mutation<InvestorRegistrationResponse, FormData>({
      query: (data) => {
        return {
          url: "/register_investor",
          method: "POST",
          body: data,
        };
      },
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: "/forgot_password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: "/reset_password",
        method: "POST",
        body: data,
      }),
    }),

    verifyAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin_login_verification",
        method: "POST",
        body: data,
      }),
    }),

    createBusinessListing: builder.mutation({
      query: (data) => ({
        url: "/create_listing",
        method: "POST",
        body: data,
      }),
    }),

    editBusinessListing: builder.mutation({
      query: (data) => ({
        url: "/edit_listing",
        method: "POST",
        body: data,
      }),
    }),

    uploadFile: builder.mutation<
      { payload: string; is_success: boolean; message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/upload_file",
        method: "POST",
        body: formData,
      }),
    }),

    // Team management mutations
    addTeamMember: builder.mutation<
      any,
      {
        listingId: string;
        memberData: {
          first_name: string;
          last_name: string;
          role: string;
          description: string;
        };
      }
    >({
      query: ({ listingId, memberData }) => ({
        url: `/business_listing/${listingId}/team`,
        method: "POST",
        body: memberData,
      }),
    }),

    updateTeamMember: builder.mutation<
      any,
      {
        listingId: string;
        memberId: string;
        memberData: {
          first_name: string;
          last_name: string;
          role: string;
          description: string;
        };
      }
    >({
      query: ({ listingId, memberId, memberData }) => ({
        url: `/business_listing/${listingId}/team/${memberId}`,
        method: "PUT",
        body: memberData,
      }),
    }),

    deleteTeamMember: builder.mutation<
      any,
      { listingId: string; memberId: string }
    >({
      query: ({ listingId, memberId }) => ({
        url: `/business_listing/${listingId}/team/${memberId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyMutation,
  useRegisterBusinessMutation,
  useRegisterInvestorMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCreateBusinessListingMutation,
  useEditBusinessListingMutation,
  useUploadFileMutation,
  useAddTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = extendedAuthApi;
