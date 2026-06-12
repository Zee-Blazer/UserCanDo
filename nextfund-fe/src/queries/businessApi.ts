import { apiSlice } from ".";
import {
  AllBusinessesResponse,
  BusinessAnalyticsResponse,
  BusinessDashboardResponse,
  BusinessListingDetailsResponse,
  BusinessListingKeyMetricEntry,
  BusinessListingTimelineEntry,
  BusinessProfileResponse,
  BusinessSettingsResponse,
  CreateInvestmentRequest,
  CreateInvestmentResponse,
  DisbursementTimelineParams,
  DisbursementTimelineResponse,
  DueDiligenceSummaryQueryParams,
  DueDiligenceSummaryResponse,
  ExpressInterestRequest,
  ExpressInterestResponse,
  GetBusinessResponse,
  InvestmentBreakdownParams,
  InvestmentBreakdownResponse,
  InvestmentInterestsResponse,
  InvestmentTimelineQueryParams,
  InvestmentTimelineRequest,
  InvestmentTimelineResponse,
  InvestorBusinessListingsResponse,
  InvestorDetailResponse,
  InvestorInvestmentsResponse,
  InvestorListResponse,
  ListingInterestStatusResponse,
  ListingResponse,
} from "../types/queries-type";

const extendedBusinessApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBusinesses: builder.query<AllBusinessesResponse, void>({
      query: () => ({
        url: "/get_all_businesses",
        method: "GET",
      }),
    }),
    getBusinessProfile: builder.query<BusinessProfileResponse, void>({
      query: () => ({
        url: `/business/settings`,
        method: "GET",
      }),
    }),

    getBusinessSettings: builder.query<BusinessSettingsResponse, void>({
      query: () => ({
        url: `/business/settings`,
        method: "GET",
      }),
    }),

    getBusinessAnalytics: builder.query<BusinessAnalyticsResponse, void>({
      query: () => ({
        url: `/business/analytics`,
        method: "GET",
      }),
    }),

    getBusinessDashboard: builder.query<BusinessDashboardResponse, void>({
      query: () => ({
        url: `/business/dashboard`,
        method: "GET",
      }),
    }),

    getBusinessById: builder.query<GetBusinessResponse, string | void>({
      query: (businessId) => ({
        url: `/get_business${businessId ? `?business_id=${businessId}` : ''}`,
        method: "GET",
      }),
    }),

    getInvestorInvestments: builder.query<
      InvestorInvestmentsResponse,
      {
        search?: string | null;
        category?: string | null;
        status?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        page?: number;
        page_size?: number | null;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append("search", params.search);
        if (params.category) searchParams.append("category", params.category);
        if (params.status) searchParams.append("status", params.status);
        if (params.start_date)
          searchParams.append("start_date", params.start_date);
        if (params.end_date) searchParams.append("end_date", params.end_date);
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.page_size)
          searchParams.append("page_size", params.page_size.toString());

        return {
          url: `/investor/investments${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (response: any): InvestorInvestmentsResponse => {
        // Handle multiple response structures:
        // 1. { payload: { payload: [...], count: ..., ... } } - double wrapped
        // 2. { payload: [...] } - wrapped array
        // 3. { payload: [...], count: ..., ... } - standard wrapped
        // 4. [...] - direct array
        // 5. { ... } - direct object

        if (!response) {
          return {
            payload: [],
            count: 0,
            page: 1,
            items_per_page: 0,
            total_pages: 0,
            has_next: false,
            has_previous: false,
            is_success: false,
            message: "No data available",
          };
        }

        let data = response;
        let payload: any[] = [];

        // If response is directly an array, use it
        if (Array.isArray(response)) {
          payload = response;
          return {
            payload: payload,
            count: payload.length,
            page: 1,
            items_per_page: payload.length,
            total_pages: 1,
            has_next: false,
            has_previous: false,
            is_success: true,
            message: "Success",
          };
        }

        // Unwrap first level if needed
        if (response?.payload) {
          data = response.payload;
        }

        // If unwrapped data is an array, that's our payload
        if (Array.isArray(data)) {
          payload = data;
          return {
            payload: payload,
            count: payload.length,
            page: 1,
            items_per_page: payload.length,
            total_pages: 1,
            has_next: false,
            has_previous: false,
            is_success: true,
            message: "Success",
          };
        }

        // If data is an object, extract payload array
        if (data && typeof data === "object" && data !== null) {
          // Check if payload exists and is an array (handles double-wrapped case)
          if (data.payload !== undefined && data.payload !== null) {
            if (Array.isArray(data.payload)) {
              payload = data.payload;
            } else if (
              typeof data.payload === "object" &&
              data.payload.payload &&
              Array.isArray(data.payload.payload)
            ) {
              // Handle triple-wrapped case: { payload: { payload: { payload: [...] } } }
              payload = data.payload.payload;
            } else {
              payload = [];
            }
          } else {
            payload = [];
          }

          return {
            payload: payload,
            count:
              data.count !== undefined && data.count !== null
                ? data.count
                : payload.length,
            page: data.page !== undefined && data.page !== null ? data.page : 1,
            items_per_page:
              data.items_per_page !== undefined && data.items_per_page !== null
                ? data.items_per_page
                : data.page_size !== undefined && data.page_size !== null
                ? data.page_size
                : payload.length,
            total_pages:
              data.total_pages !== undefined && data.total_pages !== null
                ? data.total_pages
                : payload.length > 0
                ? 1
                : 0,
            has_next: data.has_next !== undefined ? data.has_next : false,
            has_previous:
              data.has_previous !== undefined ? data.has_previous : false,
            is_success: data.is_success !== undefined ? data.is_success : true,
            message: data.message || "Success",
          };
        }

        return {
          payload: [],
          count: 0,
          page: 1,
          items_per_page: 0,
          total_pages: 0,
          has_next: false,
          has_previous: false,
          is_success: false,
          message: "No data available",
        };
      },
    }),

    getInvestorBusinessListings: builder.query<
      InvestorBusinessListingsResponse,
      {
        search?: string | null;
        category?: string | null;
        location?: string | null;
        expected_roi?: string[] | null;
        page?: number;
        page_size?: number;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.search) searchParams.append("search", params.search);
        if (params.category) searchParams.append("category", params.category);
        if (params.location) searchParams.append("location", params.location);
        if (params.expected_roi && params.expected_roi.length > 0) {
          params.expected_roi.forEach((roi) => {
            searchParams.append("expected_roi", roi);
          });
        }

        if (params.page !== undefined && params.page !== null) {
          searchParams.append("page", params.page.toString());
        }
        if (params.page_size !== undefined && params.page_size !== null) {
          searchParams.append("page_size", params.page_size.toString());
        }

        return {
          url: `/investor/business-listings${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (response: any): InvestorBusinessListingsResponse => {
        // Handle multiple response structures:
        // 1. { payload: { payload: [...], count: ..., ... } } - double wrapped
        // 2. { payload: [...] } - wrapped array
        // 3. { payload: [...], count: ..., ... } - standard wrapped
        // 4. [...] - direct array
        // 5. { ... } - direct object

        if (!response) {
          return {
            payload: [],
            count: 0,
            page: 1,
            items_per_page: 0,
            total_pages: 0,
            has_next: false,
            has_previous: false,
            is_success: false,
            message: "No data available",
          };
        }

        let data = response;
        let payload: any[] = [];

        // If response is directly an array, use it
        if (Array.isArray(response)) {
          payload = response;
          return {
            payload: payload,
            count: payload.length,
            page: 1,
            items_per_page: payload.length,
            total_pages: 1,
            has_next: false,
            has_previous: false,
            is_success: true,
            message: "Success",
          };
        }

        // Unwrap first level if needed
        if (response?.payload) {
          data = response.payload;
        }

        // If unwrapped data is an array, that's our payload
        if (Array.isArray(data)) {
          payload = data;
          return {
            payload: payload,
            count: payload.length,
            page: 1,
            items_per_page: payload.length,
            total_pages: 1,
            has_next: false,
            has_previous: false,
            is_success: true,
            message: "Success",
          };
        }

        // If data is an object, extract payload array
        if (data && typeof data === "object" && data !== null) {
          // Check if payload exists and is an array (handles double-wrapped case)
          if (data.payload !== undefined && data.payload !== null) {
            if (Array.isArray(data.payload)) {
              payload = data.payload;
            } else if (
              typeof data.payload === "object" &&
              data.payload.payload &&
              Array.isArray(data.payload.payload)
            ) {
              // Handle triple-wrapped case: { payload: { payload: { payload: [...] } } }
              payload = data.payload.payload;
            } else {
              payload = [];
            }
          } else {
            payload = [];
          }

          return {
            payload: payload,
            count:
              data.count !== undefined && data.count !== null
                ? data.count
                : payload.length,
            page: data.page !== undefined && data.page !== null ? data.page : 1,
            items_per_page:
              data.items_per_page !== undefined && data.items_per_page !== null
                ? data.items_per_page
                : data.page_size !== undefined && data.page_size !== null
                ? data.page_size
                : payload.length,
            total_pages:
              data.total_pages !== undefined && data.total_pages !== null
                ? data.total_pages
                : payload.length > 0
                ? 1
                : 0,
            has_next: data.has_next !== undefined ? data.has_next : false,
            has_previous:
              data.has_previous !== undefined ? data.has_previous : false,
            is_success: data.is_success !== undefined ? data.is_success : true,
            message: data.message || "Success",
          };
        }

        // Fallback: return empty response
        return {
          payload: [],
          count: 0,
          page: 1,
          items_per_page: 0,
          total_pages: 0,
          has_next: false,
          has_previous: false,
          is_success: false,
          message: "No data available",
        };
      },
    }),

    getBusinessListingDocuments: builder.query<ListingResponse, string>({
      query: (business_id) => ({
        url: `/get_listing_by_business?business_id=${business_id}`,
        method: "GET",
      }),
    }),

    getListingById: builder.query<any, string>({
      query: (id) => ({
        url: `/listings/${id}`,
        method: "GET",
      }),
    }),

    reUploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/upload_file",
        method: "POST",
        body: formData,
        prepareHeaders: (headers: any) => {
          headers.delete("content-type");
          headers.delete("accept");
          return headers;
        },
      }),
    }),

    editListingDocuments: builder.mutation<any, any>({
      query: (body) => ({
        url: "/edit_listing",
        method: "POST",
        body,
      }),
    }),

    getListingByBusiness: builder.query<ListingResponse, string>({
      query: (business_id) => ({
        url: `/get_listing_by_business?business_id=${business_id}`,
        method: "GET",
      }),
    }),

    getInvestorListingById: builder.query<ListingResponse, string>({
      query: (listing_id) => ({
        url: `/get_listing_by_id?listing_id=${listing_id}`,
        method: "GET",
      }),
    }),

    getAllInvestmentInterests: builder.query<
      InvestmentInterestsResponse,
      string
    >({
      query: (business_id) => ({
        url: `/get_all_investment_interests?business_id=${business_id}`,
        method: "GET",
      }),
    }),

    // Create investment endpoint
    createInvestment: builder.mutation<
      CreateInvestmentResponse,
      CreateInvestmentRequest
    >({
      query: (data) => ({
        url: "/investor/investments",
        method: "POST",
        body: data,
      }),
    }),

    // Express interest endpoint
    expressInterest: builder.mutation<
      ExpressInterestResponse,
      ExpressInterestRequest
    >({
      query: (data) => ({
        url: "/express_interest",
        method: "POST",
        body: data,
      }),
    }),

    sendEssentialDocuments: builder.mutation<any, { listing_id: string; investor_id: string }>({
      query: ({ listing_id, investor_id }) => ({
        url: `/business/investors/${listing_id}/send-essential-documents/${investor_id}`,
        method: 'POST',
      }),
    }),

    sendMeetingInvite: builder.mutation<any, { listing_id: string; investor_id: string; body: { meeting_url: string; meeting_time: string; agenda: string } }>({
      query: ({ listing_id, investor_id, body }) => ({
        url: `/business/investors/${listing_id}/send-meeting-invite/${investor_id}`,
        method: 'POST',
        body,
      }),
    }),

    // Update business profile endpoint
    updateBusinessProfile: builder.mutation<
      BusinessProfileResponse,
      Partial<BusinessProfileResponse["payload"]>
    >({
      query: (data) => ({
        url: "/business/settings",
        method: "PATCH",
        body: data,
      }),
    }),

    // Get investor due diligence summary endpoint
    getInvestorDueDiligenceSummary: builder.query<
      DueDiligenceSummaryResponse,
      DueDiligenceSummaryQueryParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.start_date)
          searchParams.append("start_date", params.start_date);
        if (params.end_date) searchParams.append("end_date", params.end_date);

        return {
          url: `/investor/due-diligence/summary${
            searchParams.toString() ? `?${searchParams.toString()}` : ""
          }`,
          method: "GET",
        };
      },
      transformResponse: (response: any): DueDiligenceSummaryResponse => {
        // Handle both wrapped {payload: {...}} and direct {...} response structures
        const data = response?.payload || response;

        if (!data) {
          return {
            counts: {
              pending: 0,
              in_progress: 0,
              completed: 0,
              failed: 0,
            },
            latest_activity: null,
          };
        }

        return {
          counts: data.counts || {
            pending: 0,
            in_progress: 0,
            completed: 0,
            failed: 0,
          },
          latest_activity: data.latest_activity || null,
        };
      },
    }),
    // Get listing interest status endpoint
    getListingInterestStatus: builder.query<
      ListingInterestStatusResponse,
      string
    >({
      query: (listing_id) => ({
        url: `/investor/business-listings/${listing_id}/interest/status`,
        method: "GET",
      }),
    }),

    // Get investment timeline endpoint
    getInvestmentTimeline: builder.query<
      InvestmentTimelineResponse,
      InvestmentTimelineQueryParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        searchParams.append("investment_id", params.investment_id);

        return {
          url: `/investor/investments/investment-timeline?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),

    // Update investment timeline endpoint
    updateInvestmentTimeline: builder.mutation<
      InvestmentTimelineResponse,
      InvestmentTimelineRequest
    >({
      query: (data) => ({
        url: "/investor/investments/investment-timeline",
        method: "PATCH",
        body: data,
      }),
    }),

    // Get business listing details endpoint
    getBusinessListingDetails: builder.query<
      BusinessListingDetailsResponse,
      {
        listing_id: string;
        include?: string | string[] | null;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.include) {
          if (Array.isArray(params.include)) {
            if (params.include.length > 0) {
              const validIncludes = params.include.filter(
                (inc): inc is string =>
                  inc !== null && inc !== undefined && inc.trim() !== ""
              );
              if (validIncludes.length > 0) {
                searchParams.append("include", validIncludes.join(","));
              }
            }
          } else if (
            typeof params.include === "string" &&
            params.include.trim() !== ""
          ) {
            searchParams.append("include", params.include.trim());
          }
        }

        // Build URL - only add query string if we have valid search params
        const queryString = searchParams.toString();
        const finalUrl = `/investor/business-listings/${params.listing_id}${
          queryString ? `?${queryString}` : ""
        }`;

        return {
          url: finalUrl,
          method: "GET",
        };
      },
      transformResponse: (response: any): BusinessListingDetailsResponse => {
        if (!response) {
          return {};
        }

        let data = response?.payload || response;

        if (!data) {
          return {};
        }

        const formatMetricLabel = (rawLabel: string): string => {
          if (!rawLabel) return "";
          return rawLabel
            .toString()
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
        };

        const normalizeValue = (value: any): string | number => {
          if (typeof value === "number") {
            return value;
          }
          if (typeof value === "string") {
            return value.trim();
          }
          if (value === null || value === undefined) {
            return "";
          }
          if (typeof value === "boolean") {
            return value ? "Yes" : "No";
          }
          if (typeof value === "object") {
            try {
              return JSON.stringify(value);
            } catch {
              return String(value);
            }
          }
          return String(value);
        };

        const normalizeKeyMetrics = (
          keyMetrics: BusinessListingDetailsResponse["key_metrics"]
        ): BusinessListingDetailsResponse["key_metrics"] => {
          if (!keyMetrics) return undefined;
          if (Array.isArray(keyMetrics)) {
            return keyMetrics
              .map((entry, index) => {
                if (!entry) return null;
                if (typeof entry === "string") {
                  return {
                    label: formatMetricLabel(entry),
                    value: normalizeValue(entry),
                  };
                }
                if (typeof entry === "object") {
                  const label =
                    "label" in entry && entry.label
                      ? String(entry.label)
                      : formatMetricLabel(`Metric ${index + 1}`);
                  const rawValue =
                    "value" in entry
                      ? (entry as any).value ?? ""
                      : (entry as any).metric_value;
                  const value = normalizeValue(rawValue);
                  return {
                    label,
                    value,
                    description: (entry as any).description,
                  };
                }
                return null;
              })
              .filter((entry): entry is BusinessListingKeyMetricEntry =>
                Boolean(entry)
              );
          }

          if (typeof keyMetrics === "object") {
            return Object.entries(keyMetrics)
              .map(([label, value]) => {
                if (value && typeof value === "object" && "value" in value) {
                  return {
                    label: formatMetricLabel(
                      (value as any).label || label || ""
                    ),
                    value: (value as any).value ?? "",
                    description: (value as any).description,
                  };
                }
                return {
                  label: formatMetricLabel(label),
                  value: normalizeValue(value),
                };
              })
              .filter((entry): entry is BusinessListingKeyMetricEntry =>
                Boolean(entry && entry.label)
              );
          }

          return undefined;
        };

        const normalizeTimeline = (
          timeline: BusinessListingDetailsResponse["timeline"]
        ): BusinessListingDetailsResponse["timeline"] => {
          if (!timeline || !Array.isArray(timeline)) {
            return timeline;
          }

          const normalizedEntries =
            timeline.map<BusinessListingTimelineEntry | null>(
              (entry, index) => {
                if (!entry) return null;
                if (typeof entry === "string") {
                  return {
                    title: entry,
                  };
                }
                if (typeof entry === "object") {
                  const title =
                    (entry as any).title ||
                    (entry as any).name ||
                    formatMetricLabel(`Milestone ${index + 1}`);
                  const description =
                    (entry as any).description || (entry as any).details || "";
                  const date =
                    (entry as any).date ||
                    (entry as any).expected_date ||
                    (entry as any).occurred_at;
                  return {
                    title,
                    description,
                    date,
                    completed: (entry as any).completed,
                  };
                }
                return null;
              }
            );

          return normalizedEntries.filter(
            (entry): entry is BusinessListingTimelineEntry => Boolean(entry)
          );
        };

        const normalized: BusinessListingDetailsResponse = { ...data };

        // Handle team_details array from API (new structure)
        if (data.team_details && Array.isArray(data.team_details)) {
          normalized.team_details = data.team_details;
        }

        if (normalized.team) {
          if (
            normalized.team.members &&
            !Array.isArray(normalized.team.members)
          ) {
            normalized.team.members = [];
          }

          const teamValues = (normalized.team as any).values;
          if (teamValues !== undefined && teamValues !== null) {
            if (!Array.isArray(teamValues)) {
              if (typeof teamValues === "string") {
                normalized.team.values = teamValues
                  .split(",")
                  .map((v: string) => v.trim())
                  .filter((v: string) => v);
              } else {
                normalized.team.values = [];
              }
            }
          } else {
            normalized.team.values = [];
          }
        }

        if (normalized.financials) {
          if (
            normalized.financials.revenue_series &&
            !Array.isArray(normalized.financials.revenue_series)
          ) {
            normalized.financials.revenue_series = [];
          }
        }

        if (normalized.documents) {
          if (
            normalized.documents.docs &&
            !Array.isArray(normalized.documents.docs)
          ) {
            normalized.documents.docs = [];
          }
        }

        if (normalized.financials) {
          const useOfFunds = (normalized.financials as any).use_of_funds;
          if (useOfFunds !== undefined && useOfFunds !== null) {
            if (Array.isArray(useOfFunds)) {
              normalized.financials.use_of_funds =
                useOfFunds.length > 0 ? useOfFunds.join(", ") : "";
            } else if (typeof useOfFunds !== "string") {
              normalized.financials.use_of_funds = String(useOfFunds);
            }
          } else {
            normalized.financials.use_of_funds = "";
          }
        }

        if (normalized.key_metrics) {
          const parsedKeyMetrics = normalizeKeyMetrics(normalized.key_metrics);
          if (parsedKeyMetrics && Array.isArray(parsedKeyMetrics)) {
            normalized.key_metrics = parsedKeyMetrics;
          }
        }

        if (
          normalized.company_info &&
          typeof normalized.company_info !== "object"
        ) {
          normalized.company_info = {};
        }

        if (normalized.contact && typeof normalized.contact !== "object") {
          normalized.contact = {};
        }

        if (
          normalized.investment_details &&
          typeof normalized.investment_details !== "object"
        ) {
          normalized.investment_details = {};
        }

        if (normalized.timeline) {
          normalized.timeline = normalizeTimeline(normalized.timeline);
        }

        return normalized;
      },
      transformErrorResponse: (response: any, meta, arg) => {
        const errorStatus = meta?.response?.status;
        const metaResponse = meta?.response as any;
        const errorData =
          response?.data ||
          response?.error ||
          response?.message ||
          metaResponse?.body ||
          metaResponse?.data ||
          response;

        let errorMessage = "Unknown error";
        let fieldName = null;
        let expectedType = null;
        let errorDetails = null;

        if (typeof errorData === "string") {
          if (errorData.includes("Traceback")) {
            errorMessage = "Server error: Backend validation failed";
            const validationErrorMatch = errorData.match(
              /(\d+\s+validation\s+error[s]?\s+for\s+[^\n]+)/i
            );
            if (validationErrorMatch) {
              errorMessage = `Server validation error: ${validationErrorMatch[1]}`;
              errorDetails = validationErrorMatch[1];
            }

            const fieldPatterns = [
              /^([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*\n\s*Input should be/m,
              /([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s+Input should be/,
              /"([^"]+)"\s*\(type=list_type[^)]*\)/,
              /([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*->/,
              /Input should be a valid list.*?\[([^\]]+)\]/,
              /"([^"]+)"\s*->\s*Input should be/,
              /([a-zA-Z_][a-zA-Z0-9_]*)\s*\(type=([^,)]+)/,
            ];

            for (const pattern of fieldPatterns) {
              const match = errorData.match(pattern);
              if (match) {
                fieldName = match[1];
                if (match[2]) {
                  expectedType = match[2];
                }
                break;
              }
            }

            if (errorData.includes("list_type")) {
              const listTypePatterns = [
                /^([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*\n\s*Input should be a valid list.*?\[type=list_type[^\]]*input_value=([^,\]\n]+)/m,
                /([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s+Input should be a valid list.*?\[type=list_type[^\]]*input_value=([^,\]\n]+)/,
                /"([^"]+)"\s*\(type=list_type[^,]*input_value=([^,)]+)/,
                /([a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)*)\s*->\s*.*?list_type/,
                /Input should be a valid list.*?for\s+"([^"]+)"/,
              ];

              let inputValue = null;
              for (const pattern of listTypePatterns) {
                const match = errorData.match(pattern);
                if (match) {
                  fieldName = match[1];

                  if (match.length > 3 && match[3]) {
                    inputValue = match[3].trim();
                  } else if (
                    match.length > 2 &&
                    match[2] &&
                    !match[2].includes(".")
                  ) {
                    inputValue = match[2].trim();
                  }
                  const valueInfo = inputValue
                    ? ` (received: ${inputValue})`
                    : "";
                  errorMessage = `Server validation error: Field "${fieldName}" must be a list/array but received ${
                    inputValue || "a different type"
                  }${valueInfo}`;
                  break;
                }
              }

              if (!fieldName) {
                errorMessage =
                  "Server error: Data structure validation failed (list_type) - a field expected to be a list is not an array";
              }
            }

            if (fieldName && !errorMessage.includes(fieldName)) {
              if (expectedType) {
                errorMessage = `Server validation error: Field "${fieldName}" has type error (expected: ${expectedType})`;
              } else {
                errorMessage = `Server validation error: Field "${fieldName}" validation failed`;
              }
            }

            // Try to extract more context from ValidationError
            if (!errorDetails) {
              const validationMatch = errorData.match(
                /ValidationError[^:]*:\s*([^\n]+)/
              );
              if (validationMatch) {
                errorDetails = validationMatch[1];
                if (!fieldName) {
                  errorMessage = `Server validation error: ${validationMatch[1]}`;
                }
              }
            }
          } else {
            errorMessage = errorData;
          }
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.error) {
          errorMessage = errorData.error;
        }

        return response;
      },
    }),

    // Team management endpoints
    getBusinessTeamMembers: builder.query<
      any,
      { ref_kind: string; ref_id: string }
    >({
      query: ({ ref_kind, ref_id }) => ({
        url: `/${ref_kind}/${ref_id}/team`,
        method: "GET",
      }),
      providesTags: ["businessTeam" as const],
    }),

    addBusinessTeamMember: builder.mutation<
      any,
      { ref_kind: string; ref_id: string; data: any }
    >({
      query: ({ ref_kind, ref_id, data }) => ({
        url: `/${ref_kind}/${ref_id}/team`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["businessTeam" as const],
    }),

    updateBusinessTeamMember: builder.mutation<
      any,
      { ref_kind: string; ref_id: string; member_id: string; data: any }
    >({
      query: ({ ref_kind, ref_id, member_id, data }) => ({
        url: `/${ref_kind}/${ref_id}/team/${member_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["businessTeam" as const],
    }),

    deleteBusinessTeamMember: builder.mutation<
      any,
      { ref_kind: string; ref_id: string; member_id: string }
    >({
      query: ({ ref_kind, ref_id, member_id }) => ({
        url: `/${ref_kind}/${ref_id}/team/${member_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["businessTeam" as const],
    }),

    getInvestors: builder.query<
      InvestorListResponse,
      {
        search?: string;
        start_date?: string;
        end_date?: string;
        page?: number;
        page_size?: number;
      }
    >({
      query: (params) => ({
        url: "/business/investors",
        method: "GET",
        params,
      }),
    }),

    getInvestorDetail: builder.query<InvestorDetailResponse, string>({
      query: (interestId) => ({
        url: `/business/investors/${interestId}`,
        method: "GET",
      }),
    }),

    getInvestmentBreakdown: builder.query<
      InvestmentBreakdownResponse,
      InvestmentBreakdownParams | void
    >({
      query: (params) => ({
        url: "/business/funding/investment-breakdown",
        method: "GET",
        params,
      }),
    }),

    getDisbursementTimeline: builder.query<
      DisbursementTimelineResponse,
      DisbursementTimelineParams | void
    >({
      query: (params) => ({
        url: "/business/funding/disbursement-timeline",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetAllBusinessesQuery,
  useGetInvestorInvestmentsQuery,
  useGetBusinessProfileQuery,
  useGetBusinessSettingsQuery,
  useGetBusinessByIdQuery,
  useGetBusinessAnalyticsQuery,
  useGetBusinessDashboardQuery,
  useGetBusinessListingDocumentsQuery,
  useReUploadDocumentMutation,
  useEditListingDocumentsMutation,
  useGetListingByBusinessQuery,
  useGetInvestorListingByIdQuery,
  useGetAllInvestmentInterestsQuery,
  useCreateInvestmentMutation,
  useExpressInterestMutation,
  useSendEssentialDocumentsMutation,
  useSendMeetingInviteMutation,
  useUpdateBusinessProfileMutation,
  useGetInvestorDueDiligenceSummaryQuery,
  useGetListingInterestStatusQuery,
  useGetInvestorBusinessListingsQuery,
  useGetListingByIdQuery,
  useGetInvestmentTimelineQuery,
  useUpdateInvestmentTimelineMutation,
  useGetBusinessListingDetailsQuery,
  useGetBusinessTeamMembersQuery,
  useAddBusinessTeamMemberMutation,
  useUpdateBusinessTeamMemberMutation,
  useDeleteBusinessTeamMemberMutation,
  useGetInvestorsQuery,
  useGetInvestorDetailQuery,
  useGetInvestmentBreakdownQuery,
  useGetDisbursementTimelineQuery,
  // Lazy query hooks for conditional fetching
  useLazyGetInvestorInvestmentsQuery,
} = extendedBusinessApi;
