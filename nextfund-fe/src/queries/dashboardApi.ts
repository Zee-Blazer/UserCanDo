import { apiSlice, tagTypes } from ".";
import {
  AllListingsResponse,
  InvestmentInterestsResponse,
  InvestorBusinessListingsResponse,
  InvestorDashboardResponse,
  InvestorSettingsResponse,
  ListingResponse,
  UpdateInvestorSettingsRequest,
  UpdateInvestorSettingsResponse,
} from "../types/queries-type";

export const extendedDashboardApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get all listings for dashboard
    getDashboardListings: builder.query<AllListingsResponse, void>({
      query: () => ({
        url: "/get_all_listings",
        method: "GET",
      }),
    }),

    // Get investor business listings for dashboard with pagination and filters
    getDashboardInvestorListings: builder.query<
      InvestorBusinessListingsResponse,
      {
        category?: string | null;
        location?: string | null;
        expected_roi?: string[] | null;
        page?: number;
        page_size?: number | null;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.category) searchParams.append("category", params.category);
        if (params.location) searchParams.append("location", params.location);
        // Handle expected_roi as array with repeated params
        if (params.expected_roi && params.expected_roi.length > 0) {
          params.expected_roi.forEach((roi) => {
            searchParams.append("expected_roi", roi);
          });
        }
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.page_size)
          searchParams.append("page_size", params.page_size.toString());

        return {
          url: `/investor/business-listings${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
    }),

    // Get business listing for dashboard (business owner view)
    getMyBusinessListing: builder.query<ListingResponse, string>({
      query: (business_id) => ({
        url: `/get_listing_by_business?business_id=${business_id}`,
        method: "GET",
      }),
    }),

    // Get investment interests for business dashboard
    getMyInvestmentInterests: builder.query<
      InvestmentInterestsResponse,
      string
    >({
      query: (business_id) => ({
        url: `/get_all_investment_interests?business_id=${business_id}`,
        method: "GET",
      }),
    }),

    // Get investor dashboard data with optional date range filter
    getInvestorDashboard: builder.query<
      InvestorDashboardResponse,
      {
        start_date?: string | null;
        end_date?: string | null;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.start_date)
          searchParams.append("start_date", params.start_date);
        if (params.end_date) searchParams.append("end_date", params.end_date);

        return {
          url: `/investor/dashboard${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (response: any): InvestorDashboardResponse => {
        // Handle both wrapped {payload: {...}} and direct {...} response structures
        const data = response?.payload || response;

        if (!data) {
          return {
            total_amount_invested: 0,
            expected_roi: 0,
            opportunities_in_review: 0,
            portfolio_growth_percentage: 0,
            active_investments: [],
            portfolio_allocation: {
              total: 0,
              breakdown: [],
            },
          };
        }

        // Ensure portfolio_allocation has the correct structure
        const portfolioAllocation = data.portfolio_allocation || {};
        const breakdown = Array.isArray(portfolioAllocation.breakdown)
          ? portfolioAllocation.breakdown
          : [];

        return {
          total_amount_invested:
            data.total_amount_invested !== undefined &&
            data.total_amount_invested !== null
              ? data.total_amount_invested
              : 0,
          expected_roi:
            data.expected_roi !== undefined && data.expected_roi !== null
              ? data.expected_roi
              : 0,
          opportunities_in_review:
            data.opportunities_in_review !== undefined &&
            data.opportunities_in_review !== null
              ? data.opportunities_in_review
              : 0,
          portfolio_growth_percentage:
            data.portfolio_growth_percentage !== undefined &&
            data.portfolio_growth_percentage !== null
              ? data.portfolio_growth_percentage
              : 0,
          active_investments: Array.isArray(data.active_investments)
            ? data.active_investments
            : [],
          portfolio_allocation: {
            total:
              portfolioAllocation.total !== undefined &&
              portfolioAllocation.total !== null
                ? portfolioAllocation.total
                : breakdown.length,
            breakdown: breakdown,
          },
        };
      },
    }),

    getInvestorSettings: builder.query<InvestorSettingsResponse, void>({
      query: () => ({
        url: "/investor/settings",
        method: "GET",
      }),
      transformResponse: (response: any): InvestorSettingsResponse => {
        // According to API docs, the response is direct: {personal_information: {...}, others: {...}}
        // Handle both wrapped {payload: {...}} and direct {...} response structures
        if (response?.payload) {
          // If wrapped in payload, use it
          return {
            is_success: response.is_success,
            message: response.message,
            payload: response.payload,
          };
        } else if (response?.personal_information || response?.others) {
          // If direct response structure (as per API docs), wrap it in payload for consistency with existing code
          const defaultPersonalInfo = {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: null,
            country: null,
            avatar: null,
            investment_firm: null,
            contact_preference: "email",
            identification_document: null,
            proof_of_address: null,
          };
          const defaultOthers = {
            verification_status: "",
            verification_date: null,
          };
          return {
            is_success: response.is_success,
            message: response.message,
            payload: {
              personal_information:
                response.personal_information || defaultPersonalInfo,
              others: response.others || defaultOthers,
            },
            // Also keep direct structure for backward compatibility
            personal_information: response.personal_information,
            others: response.others,
          };
        }
        // Fallback: return empty structure with required fields
        return {
          payload: {
            personal_information: {
              first_name: "",
              last_name: "",
              email: "",
              phone_number: null,
              country: null,
              avatar: null,
              investment_firm: null,
              contact_preference: "email",
              identification_document: null,
              proof_of_address: null,
            },
            others: {
              verification_status: "",
              verification_date: null,
            },
          },
        };
      },
      providesTags: [tagTypes.investorSettings],
    }),

    updateInvestorSettings: builder.mutation<
      UpdateInvestorSettingsResponse,
      UpdateInvestorSettingsRequest
    >({
      query: (data) => ({
        url: "/investor/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.investorSettings],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          
          dispatch(apiSlice.util.invalidateTags([tagTypes.investorSettings]));
        } catch (error) {
          // Error handling is done by the mutation
        }
      },
    }),

    uploadInvestorIdDocuments: builder.mutation<
      { is_success: boolean; message: string; payload?: any },
      FormData
    >({
      query: (formData) => ({
        url: "/investor_upload_id",
        method: "POST",
        body: formData,
        prepareHeaders: (headers: any) => {
          
          headers.delete("content-type");
          headers.delete("accept");
          return headers;
        },
      }),
      invalidatesTags: [tagTypes.investorSettings],
    }),

    // Get logged in user data
    getLoggedInUser: builder.query<
      {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        avatar: string | null;
        user_type: string;
        role: string;
        phone_number: string | null;
        status: string;
        country: string | null;
        is_verified: boolean;
        verified_at: string | null;
        created_at: string;
        updated_at: string;
      },
      void
    >({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.investorSettings],
    }),

    // Remove avatar
    removeAvatar: builder.mutation<
      {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        avatar: string | null;
        user_type: string;
        role: string;
        phone_number: string | null;
        status: string;
        country: string | null;
        is_verified: boolean;
        verified_at: string | null;
        created_at: string;
        updated_at: string;
      },
      void
    >({
      query: () => ({
        url: "/user/avatar",
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.investorSettings],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Manually invalidate tags to ensure all queries refetch
          dispatch(apiSlice.util.invalidateTags([tagTypes.investorSettings]));
          // Dispatch event to notify components
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("avatarUpdated"));
          }
        } catch (error) {
          // Error handling is done by the mutation
        }
      },
    }),
  }),
});

export const {
  useGetDashboardListingsQuery,
  useGetDashboardInvestorListingsQuery,
  useGetMyBusinessListingQuery,
  useGetMyInvestmentInterestsQuery,
  useGetInvestorDashboardQuery,
  useGetInvestorSettingsQuery,
  useUpdateInvestorSettingsMutation,
  useUploadInvestorIdDocumentsMutation,
  useGetLoggedInUserQuery,
  useRemoveAvatarMutation,
  useLazyGetMyBusinessListingQuery,
  useLazyGetMyInvestmentInterestsQuery,
  useLazyGetDashboardInvestorListingsQuery,
} = extendedDashboardApi;
