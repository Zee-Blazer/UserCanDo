import { apiSlice, tagTypes } from ".";
import {
    NotificationsQueryParams,
    NotificationsResponse,
    UpdateNotificationStatusRequest,
    UpdateNotificationStatusResponse,
} from "../types/queries-type";

const extendedGeneralApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationsResponse, NotificationsQueryParams | void>({
      query: (params = {}) => ({
        url: "/notifications",
        method: "GET",
        params: {
          page: 1,
          page_size: 50,
          ...params,
        },
      }),
      providesTags: [tagTypes.notifications],
    }),

    updateNotificationStatus: builder.mutation<
      UpdateNotificationStatusResponse,
      UpdateNotificationStatusRequest
    >({
      query: (body) => ({
        url: "/notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: [tagTypes.notifications],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
  useLazyGetNotificationsQuery,
} = extendedGeneralApi;

export default extendedGeneralApi;