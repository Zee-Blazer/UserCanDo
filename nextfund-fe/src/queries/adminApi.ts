import { apiSlice, tagTypes } from ".";

import {
  AdminDashboardQueryParams,
  AdminDashboardResponse,
  AdminFundingResponse,
  AdminSettingsResponse,
  AllUsersResponse,
  DueDiligenceQueryParams,
  DueDiligenceResponse,
  FundingQueryParams,
  InvestmentsQueryParams,
  InviteTeamMemberParams,
  InviteTeamMemberResponse,
  TeamMemberDetail,
  TeamMemberDetailsResponse,
  UsersQueryParams,
} from "../types/queries-type";

const extendedAdminApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    adminDashboardDetails: builder.query<AdminDashboardResponse, AdminDashboardQueryParams | void>({
      query: (params) => ({
        url: "/admin/dashboard",
        method: "GET",
        params: { ...params },
      }),
    }),

    getAllUsers: builder.query<AllUsersResponse, UsersQueryParams | void>({
      query: (params) => ({
        url: `/admin_get_all_users`,
        method: "GET",
        params: { ...params },
      }),
    }),

    getDueDiligenceRecord: builder.query<
      DueDiligenceResponse,
      DueDiligenceQueryParams | void
    >({
      query: (params) => ({
        url: `/admin/business-listings`,
        method: "GET",
        params: { ...params },
      }),
      providesTags: [tagTypes.adminDueDiligence],
    }),

    getInvestmentsRecord: builder.query<any, InvestmentsQueryParams | void>({
      query: (params) => ({
        url: `/admin/investments`,
        method: "GET",
        params: { ...params },
      }),
    }),

    getSettingsData: builder.query<AdminSettingsResponse, void>({
      query: () => ({
        url: `/admin/settings`,
        method: "GET",
      }),
    }),

    getTeamsRecord: builder.query<any, UsersQueryParams | void>({
      query: (params) => ({
        url: `/admin/teams`,
        method: "GET",
        params: { ...params },
      }),
      providesTags: [tagTypes.adminTeam],
    }),

    getTeamMemberDetails: builder.query<TeamMemberDetailsResponse, string>({
      query: (userId) => ({
        url: `/admin/teams/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminTeam],
    }),

    getFundingRecord: builder.query<AdminFundingResponse, FundingQueryParams>({
      query: (body) => ({
        url: `/admin/funding?${new URLSearchParams(
          body as Record<string, string>
        ).toString()}`,
        method: "GET",
      }),
      providesTags: [tagTypes.adminFunds],
    }),

    dueDiligenceMissingDoc: builder.mutation<any, { id: string }>({
      query: (body) => ({
        url: `/admin/business-listings/${body.id}/missing-docs`,
        method: "POST",
        body,
      }),
    }),

    approveDueDiligence: builder.mutation<any, { id: string; action: string }>({
      query: (body) => ({
        url: `/admin/business-listings/${body.id}/action`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.adminDueDiligence],
    }),

    approveUser: builder.mutation<any, { id: string; action: string }>({
      query: (body) => ({
        url: `/admin/users/${body.id}/action`,
        method: "POST",
        body,
      }),
    }),

    verifyInvestment: builder.mutation<any, { id: string; action: string }>({
      query: (body) => ({
        url: `/admin/investments/${body.id}/action`,
        method: "POST",
        body,
      }),
    }),

    inviteTeamMember: builder.mutation<
      InviteTeamMemberResponse,
      InviteTeamMemberParams
    >({
      query: (body) => ({
        url: `/admin/teams`,
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),

    changeFundingStatus: builder.mutation<any, { id: string; action: string }>({
      query: ({ id, action }) => ({
        url: `/admin/funding/${id}/action`,
        method: "POST",
        body: { action },
      }),
    }),

    updateFundingStatus: builder.mutation<any, { id: string; action: string }>({
      query: ({ id, action }) => ({
        url: `/admin/funding/${id}/action`,
        method: "POST",
        body: { action },
      }),
      invalidatesTags: [tagTypes.adminFunds],
    }),

    updateTeamMemberDetails: builder.mutation<TeamMemberDetail, TeamMemberDetail>({
      query: (body) => ({
        url: `/admin/teams/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),

    deleteTeamMember: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/admin/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.adminTeam],
    }),

    updateSettings: builder.mutation<any, any>({
      query: (body) => ({
        url: `/admin/settings`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [tagTypes.adminSettings],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useAdminDashboardDetailsQuery,
  useGetDueDiligenceRecordQuery,
  useGetInvestmentsRecordQuery,
  useGetSettingsDataQuery,
  useGetTeamsRecordQuery,
  useGetTeamMemberDetailsQuery,
  useGetFundingRecordQuery,
  useDueDiligenceMissingDocMutation,
  useApproveDueDiligenceMutation,
  useApproveUserMutation,
  useVerifyInvestmentMutation,
  useInviteTeamMemberMutation,
  useChangeFundingStatusMutation,
  useUpdateFundingStatusMutation,
  useUpdateTeamMemberDetailsMutation,
  useDeleteTeamMemberMutation,
  useUpdateSettingsMutation,
} = extendedAdminApi;
