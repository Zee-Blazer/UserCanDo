export interface BusinessRegistrationRequest {
  company_name: string;
  industry_sector: string;
  year_founded: string;
  country_location: string;
  headquarters: string;
  company_size: string;
  current_stage: string;
  description: string;
  market_opportunity_description: string;
  competitive_advantage_description: string;
  website_url: string;
  first_name: string;
  last_name: string;
  linked_in_profile: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface BusinessRegistrationResponse {
  is_success: boolean;
  message: string;
  payload: {
    business_id: string;
    user_id: string;
    [key: string]: any;
  };
}

export interface InvestorRegistrationRequest {
  payload: any;
  id_document?: File;
  proof_of_address?: File;
}

export interface InvestorRegistrationResponse {
  is_success: boolean;
  message: string;
  payload: any;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  is_success: boolean;
  message: string;
  payload: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  is_success: boolean;
  message: string;
  payload: [any];
}

export interface FundingStructure {
  funding_type: string;
  interest_rate: string;
  security_type: string;
  valuation_cap: string;
  instrument_type: string;
  maturity_period: string;
  hybrid_debt_type: string;
  current_valuation: string;
  hybrid_equity_type: string;
  interest_structure: string;
  repayment_schedule: string;
  conversion_discount: string;
  collateral_available: string;
  ideal_interest_range: string;
  intended_use_of_funds: string;
  funding_amount_seeking: string;
  hybrid_debt_percentage: string;
  hybrid_equity_percentage: string;
  percentage_equity_offering: string;
}

export interface CompanyMetricsAndFinancialInformation {
  burn_rate: string;
  team_size: string;
  gross_margin: string;
  company_stage: string;
  monthly_revenue: string;
  months_of_runway: string;
  previous_funding: string;
  monthly_growth_rate: string;
  number_of_customers: string;
  total_previous_funding: string;
  upload_option_for_financial_statements: string;
}

export interface UseOfFunds {
  others: string;
  team_expansion: string;
  working_capital: string;
}

// Notification Types
export interface NotificationContext {
  message: string;
  action: string;
}

export interface Notification {
  id: string;
  context: NotificationContext;
  status: "delivered" | "seen";
  created_at: string;
  updated_at: string;
}

export interface NotificationsResponse {
  payload: Notification[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface NotificationsQueryParams {
  status?: "delivered" | "seen";
  page?: number;
  page_size?: number;
}

export interface UpdateNotificationStatusRequest {
  notification_ids: string[];
  status: "delivered" | "seen";
}

export interface UpdateNotificationStatusResponse {
  is_success: boolean;
  message: string;
  payload?: any;
}

export interface FundsDeployment {
  market_expansion: string;
  marketing_and_sales: string;
  product_development: string;
  funds_deployment_timeline: string;
  technology_infrastructure: string;
  expected_funding_completion: string;
  key_milestone_to_achieve_with_funding: string;
}

export interface EssentialDocuments {
  cap_table: string;
  pitch_deck: string;
  product_demo: string;
  business_plan: string;
  market_analysis: string;
  legal_agreements: string;
  customer_references: string;
  financial_statements: string;
  financial_projections: string;
  certificate_of_incorporation: string;
  director_id: string;
}

export interface ComplianceAndVerification {
  declaration: boolean;
  tax_id_number: string;
  founder_agreements: string;
  interest_structure: string;
  registered_address: string;
  registration_number: string;
  legally_incorporated: boolean;
  pending_legal_disputes: boolean;
  founders_equity_agreement: boolean;
  authorized_to_raise_capital: boolean;
  certificate_of_incorporation: string;
  legal_compliance_certificate: string;
  local_securities_regulations: boolean;
}

export interface InvestmentPerference {
  maximum_investment: number;
  minimum_investment: number;
  board_seat_offering: string;
  expected_close_date: string;
  anti_dilution_rights: string;
  geographic_preference: string;
  due_diligence_timeline: string;
  funding_round_duration: string;
  investor_type_preference: string;
  investor_updates_frequency: string;
  maximum_number_of_investors: number;
}

export interface ListingDetails {
  listing_id: string;
  business_id: string;
  funding_structure: FundingStructure;
  company_metrics_and_financial_information: CompanyMetricsAndFinancialInformation;
  use_of_funds: UseOfFunds;
  essential_documents: EssentialDocuments;
  compliance_and_verification: ComplianceAndVerification;
  investment_preference: InvestmentPerference;
  is_complete: boolean;
  review_status: string;
  approval_status: string;
  funding_status: string;
  created_at: string;
  last_modified: string;
  category: string;
  ownwer_name?: string | null;
  owner_name?: string | null;
  business_name: string;
  location?: string;
  headquarters?: string | null;
  website_url?: string | null;
  market_opportunity?: string | null;
  competitive_advantage?: string | null;
  documents_restricted?: boolean;
  documents?: Record<string, any>;
  preview_document?: {
    key: string;
    name: string;
    file: string | null;
  };
  // Contact fields from API (can be either format)
  email?: string | null;
  business_phone_number?: string | null;
  linked_in_profile?: string | null;
  // Legacy contact fields (for backward compatibility)
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_website?: string | null;
  contact_linkedin?: string | null;
  contact_visible?: boolean;
}

// Single listing response (used by admin and business APIs)
export interface ListingResponse {
  is_success: boolean;
  message: string;
  payload: ListingDetails;
}

// Multiple listings response (used by admin and public APIs)
export interface AllListingsResponse {
  is_success: boolean;
  message: string;
  payload: ListingDetails[];
}

// Investor Business Listing interface
export interface InvestorBusinessListing {
  business_id: string;
  category: string;
  owner_name: string;
  business_name: string;
  location: string;
  headquarters?: string | null;
  market_opportunity?: string | null;
  competitive_advantage?: string | null;
  // Contact fields from API (can be either format)
  email?: string | null;
  business_phone_number?: string | null;
  website_url?: string | null;
  linked_in_profile?: string | null;
  // Legacy contact fields (for backward compatibility)
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_website?: string | null;
  contact_linkedin?: string | null;
  contact_visible?: boolean;
  expected_roi?: string | null;
  documents_restricted?: boolean;
  documents?: Record<string, any>;
  preview_document?: {
    key: string;
    name: string;
    file: string | null;
  };
  id: string;
  funding_structure: Record<string, any>;
  company_metrics_and_financial_information: Record<string, any>;
  use_of_funds: Record<string, any>;
  essential_documents: Record<string, any>;
  compliance_and_verification: Record<string, any>;
  investment_preference: Record<string, any>;
  is_complete: boolean;
  review_status: string;
  approval_status: string;
  funding_status: string;
  created_at: string;
  updated_at: string;
}

// Investor Business Listings Response interface
export interface InvestorBusinessListingsResponse {
  payload: InvestorBusinessListing[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface TableRow {
  businessName: string;
  category: string;
  owner: string;
  lastUpdated: string;
  status: string;
  listing_id?: string;
  business_id?: string;
}

// Business Response Types
export interface BusinessDetails {
  business_id: string;
  user_id: string;
  company_name: string;
  industry_sector: string;
  year_founded: string;
  country_location: string;
  company_size: string;
  current_stage: string;
  description: string;
  website_url: string;
  first_name: string;
  last_name: string;
  linked_in_profile: string;
  email: string;
  phone_number: string;
  created_at: string;
  last_modified: string;
}

export interface BusinessResponse {
  is_success: boolean;
  message: string;
  payload: BusinessDetails;
}

export interface AllBusinessesResponse {
  is_success: boolean;
  message: string;
  payload: BusinessDetails[];
}

// Investment Interest Types
export interface InvestmentInterest {
  interest_id: string;
  business_id: string;
  investor_id: string;
  listing_id: string;
  investment_amount: number;
  interest_type: string;
  message: string;
  status: string;
  created_at: string;
  investor_name: string;
  investor_email: string;
}

export interface InvestmentInterestsResponse {
  is_success: boolean;
  message: string;
  payload: InvestmentInterest[];
}

// Investor Investment Types
export interface InvestorInvestment {
  business_name: string;
  business_listing_id: string;
  expected_roi: string;
  business_country: string;
  id: string;
  created_at: string;
  updated_at: string;
  user: string;
  investment_interest: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  due_diligence_status: "pending" | "in_progress" | "completed" | "failed";
  payment_method: "bank_transfer" | "card" | "cryptocurrency" | "other";
  currency: string;
  proof_of_funds: Record<string, any>;
  signed_term_sheet: Record<string, any>;
  funding_status: "pending" | "approved" | "rejected" | "completed";
}

export interface InvestorInvestmentsResponse {
  payload: InvestorInvestment[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface BusinessDashboardResponse {
  is_success: boolean;
  payload: {
    total_raised: number;
    funding_goal: number;
    interested_investors: number;
    monthly_growth: number;
    target_amount: number;
    current_investors: any[];
    funding_progress: {
      target_amount: number;
      amount_raised: number;
      remaining_amount: number;
      percentage_raised: number;
      time_left: string | null;
    };
    investors_count: number;
    due_diligence_investors: number;
  };
  message: string;
}

// Investment Creation Types
export interface PreferredDisbursementTimeline {
  initial_tranche_amount: number;
  initial_tranche_date: string;
  post_product_launch_amount: number;
  post_product_launch_date: string;
  q2_expansion_plan_amount: number;
  q2_expansion_plan_date: string;
  after_revenue_target_amount: number;
  after_revenue_target_date: string;
}

export interface CreateInvestmentRequest {
  listing_id: string;
  amount: number;
  payment_method: "bank_transfer" | "card" | "cryptocurrency" | "other";
  proof_of_funds: string;
  signed_term_sheet: string;
  preferred_disbursement_timeline: PreferredDisbursementTimeline;
}

export interface CreateInvestmentResponse {
  is_success: boolean;
  message: string;
  payload?: any;
}

interface BusinessListing {
  business_name: string;
  sector: string;
  website: string;
  linked_in_profile: string;
  approval_status: string;
  pitch_deck: string | null;
  certificate_of_incorporation: string | null;
  financial_statements: string | null;
}

export interface AllUsersDetails {
  user_id: string;
  name: string;
  email: string;
  category: "business" | "investor";
  status: string;
  date_joined: string;
  phone_number: string | null;
  investment_firm: string | null;
  identification_document: string | null;
  proof_of_address: string | null;
  business_listing: BusinessListing | null;
}

export interface TeamMemberDetails {
  full_name: string;
  id: string;
  email: string;
  role: string;
  created_at: string;
  phone_number: string | null;
  activity_log: string;
}

export interface AllUsersResponse {
  is_success: boolean;
  message: string;
  payload: AllUsersDetails[];
  count?: number;
  page?: number;
  items_per_page?: number;
  total_pages?: number;
  has_next?: boolean;
  has_previous?: boolean;
}

export interface DueDiligenceQueryParams {
  is_complete?: boolean;
  search?: string;
  category?: string;
  approval_status?: string;
  page?: number;
  page_size?: number;
}

export interface FundingQueryParams {
  search?: string;
  payment_method?: string;
  status?: string;
  date?: string;
  page?: number;
  page_size?: number;
}

export interface UsersQueryParams {
  search?: string;
  role?: string;
  page?: number;
  page_size?: number;
}

export interface InvestmentsQueryParams {
  search?: string;
  page?: number;
  page_size?: number;
}

export interface DueDiligenceEssentialDocuments {
  pitch_deck: string;
  financial_statements: string;
  certificate_of_incorporation: string;
}

export interface DueDiligencePayloadItem {
  id: string;
  business_name: string;
  category: string;
  owner: string;
  essential_documents: DueDiligenceEssentialDocuments;
  review_status: string;
  approval_status: string;
  is_complete: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface DueDiligenceResponse {
  payload: DueDiligencePayloadItem[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface InvestmentPayload {
  amount: number;
  business_name: string | null;
  created_at: string;
  documents_verified: boolean;
  due_diligence_status: string;
  id: string;
  investment_type: string;
  investor: string;
  investor_verified: boolean;
  payment_method: string;
  proof_of_funds: {
    file: string;
    verified: boolean;
  };
  signed_term_sheet: {
    file: string;
    verified: boolean;
  };
  status: string;
}

export interface AdminDashboardQueryParams {
  start_date?: string;
  end_date?: string;
}

export interface AdminDashboardResponse {
  is_success: boolean;
  payload: {
    investors: number;
    businesses: number;
    funding_raised: number;
    active_listings: number;
    due_diligence_listings: number;
    last_three_investors: {
      user: {
        full_name: string;
        id: string;
        email: string;
        is_verified: boolean;
      };
      company: string;
      id: string;
      amount: number;
      status: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  message: string;
}

export interface AdminFundingRecord {
  investor: string;
  business: string;
  kyc_verified: boolean;
  id: string;
  amount: number;
  status?: string;
  payment_method: "cryptocurrency" | "bank_transfer" | string;
  currency: "USD" | "NGN" | string;
  funding_status: "disbursed" | "flagged" | string;
  created_at: string;
  updated_at: string;
}

export interface AdminFundingResponse {
  payload: AdminFundingRecord[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface ExpressInterestRequest {
  listing_id: string;
  investment_firm: string;
  investment_amount: number;
  investment_reason: string;
  nda_signed: boolean;
}

export interface ExpressInterestResponse {
  is_success: boolean;
  message: string;
  payload: any;
}

export interface BusinessProfileResponse {
  is_success: boolean;
  payload: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    country: string | null;
    business_name: string;
    industry: string;
    location: string;
    registration_number: string;
    website: string;
    year_founded: number;
    kyc_verified: boolean;
    submission_date: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    swift_code: string;
    crypto_wallet_address: string;
  };
  message: string;
}

export interface BusinessSettingsResponse {
  is_success: boolean;
  payload: {
    personal_information: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      country: string | null;
      status: string;
      investment_firm: string | null;
      contact_preference: string;
      avatar?: string;
    };
    business_information: {
      name: string;
      industry: string;
      founded: string;
      location: string;
      website: string | null;
      registration_number: string;
      id: string;
    };
    bank_information: {
      cryptocurrency: {
        symbol: "string";
        address: "string";
      };
      bank_name: string | null;
      account_number: string | null;
      account_name: string | null;
      bank_code: string | null;
    };
  };
  message: string;
}

export interface GetBusinessResponse {
  is_success: boolean;
  payload: {
    business_id: string;
    company_name: string;
    industry_sector: string;
    year_founded: string | number;
    headquarters?: string | null;
    country_location?: string | null;
    company_size?: string | null;
    current_stage?: string | null;
    description?: string | null;
    website_url?: string | null;
    linked_in_profile?: string | null;
    phone_number?: string | null;
    market_opportunity?: string | null;
    competitive_advantage?: string | null;
  };
  message: string;
}

export interface BusinessAnalyticsResponse {
  is_success: boolean;
  payload: {
    funding_raised: number;
    total_investors: number;
    funding_goal: number;
    target_amount: number;
    campaign_deadline: string;
  };
  message: string;
}

export interface InviteTeamMemberParams {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface InviteTeamMemberResponse {
  is_success: boolean;
  message: string;
  payload: [any];
}

export interface TeamMemberDetail {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export interface ActiveInvestment {
  performance: number;
  investment_firm: string;
  investment_sector: string;
  expected_roi: string;
  id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  status: "pending" | "approved" | "rejected" | "completed";
}

export interface PortfolioAllocationBreakdown {
  category: string;
  percentage: number;
}

export interface PortfolioAllocation {
  total: number;
  breakdown: PortfolioAllocationBreakdown[];
}

export interface InvestorDashboardResponse {
  total_amount_invested: number;
  expected_roi: number;
  opportunities_in_review: number;
  portfolio_growth_percentage: number;
  active_investments: ActiveInvestment[];
  portfolio_allocation: PortfolioAllocation;
}

export interface AdminSettingsResponse {
  is_success: boolean;
  message: string;
  payload: {
    created_by: string | null;
    updated_by: string | null;
    admin_id: string;
    admin_full_name: string;
    id: string;
    primary_contact_email: string;
    primary_contact_phone: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    bank_code: string;
    btc_address: string | null;
    eth_address: string | null;
    usdt_address: string | null;
    usdc_address: string | null;
    nda_template: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface InvestorSettingsResponse {
  is_success?: boolean;
  message?: string;
  payload?: {
    personal_information: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string | null;
      country: string | null;
      avatar: string | null;
      investment_firm: string | null;
      contact_preference: string;
      identification_document: string | null;
      proof_of_address: string | null;
    };
    others: {
      verification_status: string;
      verification_date: string | null;
    };
  };
  // Direct response structure (according to API docs)
  personal_information?: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    country: string | null;
    avatar: string | null;
    investment_firm: string | null;
    contact_preference: string;
    identification_document: string | null;
    proof_of_address: string | null;
  };
  others?: {
    verification_status: string;
    verification_date: string | null;
  };
}

export interface UpdateInvestorSettingsRequest {
  personal_information?: {
    phone_number?: string;
    contact_preference?: string;
    country?: string;
    avatar?: string;
    identification_document?: string;
    proof_of_address?: string;
  };
  password?: string;
}

export interface UpdateInvestorSettingsResponse {
  is_success: boolean;
  message: string;
}

export interface ActivityLog {
  id: string;
  event_name: string;
  action_name: string;
  created_at: string;
}

export interface TeamMemberDetailsResponse {
  team_member: {
    full_name: string;
    id: string;
    email: string;
    role: string;
    created_at: string;
    phone_number: string | null;
  };
  activity_logs: ActivityLog[];
}

// Due Diligence Summary Types
// Investment Timeline Types
export interface InvestmentTimelineRequest {
  investment_id: string;
  funding_round_opens?: string;
  due_dilligence_period?: string;
  investment_closing?: string;
  funds_disbursement?: string;
  production_enhancement?: string;
}

export interface InvestmentTimelineResponse {
  investment_id: string;
  funding_round_opens?: string;
  due_dilligence_period?: string;
  investment_closing?: string;
  funds_disbursement?: string;
  production_enhancement?: string;
}

export interface InvestmentTimelineQueryParams {
  investment_id: string;
}

// Business Listing Details Types (new structured endpoint)
export interface BusinessListingOverview {
  id: string;
  business_name: string;
  country: string;
  sector: string;
  location?: string | null;
  headquarters?: string | null;
  founded_year: string;
  description: string;
  market_opportunity: string;
  competitive_advantage: string;
  funding_progress: number;
  amount_raised: number;
  target_amount: number;
  lower_expected_roi?: number;
  upper_expected_roi?: number;
  expected_roi?: string | null;
  min_investment: number;
  investors_count: number;
  closing_in_days: number;
  expected_close_date?: string | null;
  contact_visible?: boolean;
  contact_email?: string | null;
  contact_phone?: string | null;
  contact_website?: string | null;
  contact_linkedin?: string | null;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
}

export interface BusinessListingTeam {
  members: TeamMember[];
  values: string[];
}

export interface RevenueSeriesItem {
  label: string;
  value: number;
}

export interface BusinessListingFinancials {
  revenue_series: RevenueSeriesItem[];
  current_financials: Record<string, any>;
  projections: Record<string, any>;
  use_of_funds: string;
}

export interface BusinessListingDocument {
  name: string;
  file: string;
  size: string;
}

export interface BusinessListingDocuments {
  gated: boolean;
  docs: BusinessListingDocument[];
  documents_restricted?: boolean;
  preview_document?: {
    key: string;
    name: string;
    file: string | null;
  };
}

export interface BusinessListingKeyMetricEntry {
  label: string;
  value: string | number;
  description?: string;
}

export type BusinessListingKeyMetrics =
  | BusinessListingKeyMetricEntry[]
  | Record<string, BusinessListingKeyMetricEntry | string | number>;

export interface BusinessListingCompanyInfo {
  headquarters?: string;
  country?: string;
  location?: string;
  founded_year?: string | number;
  team_size?: number;
  [key: string]: any;
}

export interface BusinessListingContactInfo {
  email?: string;
  phone?: string;
  phone_number?: string;
  website?: string;
  linkedin?: string;
  contact_visible?: boolean;
  [key: string]: any;
}

export interface BusinessListingInvestmentDetails {
  min_investment?: number;
  max_investment?: number;
  target_amount?: number;
  amount_raised?: number;
  funding_progress?: number;
  investors_count?: number;
  closing_in_days?: number;
  expected_close_date?: string;
  lower_expected_roi?: number | string;
  upper_expected_roi?: number | string;
  expected_roi?: string | null;
  [key: string]: any;
}

export type BusinessListingTimelineEntry =
  | string
  | {
      date?: string;
      title?: string;
      description?: string;
      completed?: boolean;
      [key: string]: any;
    };

export interface BusinessListingDetailsResponse {
  overview?: BusinessListingOverview;
  team_details?: Array<{
    id: string;
    role: string;
    first_name: string;
    last_name: string;
    description: string;
  }>;
  team?: BusinessListingTeam;
  financials?: BusinessListingFinancials;
  documents?: BusinessListingDocuments;
  key_metrics?:
    | BusinessListingKeyMetrics
    | {
        burn_rate?: string | null;
        team_size?: string | number | null;
        gross_margin?: string | number | null;
        company_stage?: string | null;
        monthly_revenue?: string | null;
        months_of_runway?: string | number | null;
        previous_funding?: string | null;
        transaction_value?: string | null;
        monthly_growth_rate?: string | number | null;
        monthly_growth?: string | number | null;
        number_of_customers?: string | number | null;
        total_previous_funding?: string | null;
        market_share_percentage?: string | number | null;
        number_of_active_merchants?: string | number | null;
        customer_retention_percentage?: string | number | null;
        active_merchants?: string | number | null;
        transaction_volume?: string | null;
        customer_retention?: string | number | null;
        market_share?: string | number | null;
        upload_option_for_financial_statements?: string | null;
        team_details?: Array<{
          id: string;
          role: string;
          first_name: string;
          last_name: string;
          description: string;
        }> | null;
        [key: string]: any;
      };
  company_info?: BusinessListingCompanyInfo;
  contact?: BusinessListingContactInfo;
  investment_details?: BusinessListingInvestmentDetails;
  timeline?: BusinessListingTimelineEntry[];
}

export interface DueDiligenceSummaryCounts {
  pending: number;
  in_progress: number;
  completed: number;
  failed: number;
}

export interface LatestActivity {
  title: string;
  business_name: string;
  status: string;
  occurred_at: string;
  relative_time: string;
}

export interface DueDiligenceSummaryResponse {
  counts: DueDiligenceSummaryCounts;
  latest_activity: LatestActivity | null;
}

export interface DueDiligenceSummaryQueryParams {
  start_date?: string | null;
  end_date?: string | null;
}

// Listing Interest Status Types
export interface ListingInterestStatusResponse {
  has_interest: boolean;
  nda_signed: boolean;
}

export interface InvestorListItem {
  interest_id: string;
  user_id: string;
  investor_name: string;
  email: string;
  expressed_interest_at: string;
  nda_signed: boolean;
}

export interface InvestorListResponse {
  payload: InvestorListItem[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface InvestorRequestedDocs {
  cap_table: string;
  pitch_deck: string;
  director_id: string;
  product_demo: string;
  business_plan: string;
  market_analysis: string;
  legal_agreements: string;
  customer_references: string;
  financial_statements: string;
  financial_projections: string;
  certificate_of_incorporation: string;
}

export interface InvestorDetail {
  interest_id: string;
  user_id: string;
  investor_name: string;
  email: string;
  expressed_interest_at: string;
  nda_signed: boolean;
  listing_id: string;
  notes: string;
  status: string | null;
  requested_docs: InvestorRequestedDocs;
}

export interface InvestorDetailResponse {
  is_success: boolean;
  payload: InvestorDetail;
  message: string;
}

// Investment Breakdown Types
export interface InvestmentBreakdownItem {
  investor_name: string;
  amount: number;
  date_invested: string;
  status: string;
}

export interface InvestmentBreakdownResponse {
  payload: InvestmentBreakdownItem[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface InvestmentBreakdownParams {
  investor_name?: string;
  amount?: number;
  date_invested?: string;
  status?: string;
  export?: boolean;
  page?: number;
  page_size?: number;
}

// Disbursement Timeline Types
export interface DisbursementTimelineItem {
  investment_id: string;
  initial_tranche_amount: number;
  initial_tranche_date: string;
  post_product_launch_amount: number;
  post_product_launch_date: string;
  q2_expansion_plan_amount: number;
  q2_expansion_plan_date: string;
  after_revenue_target_amount: number;
  after_revenue_target_date: string;
}

export interface DisbursementTimelineResponse {
  payload: DisbursementTimelineItem[];
  count: number;
  page: number;
  items_per_page: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  is_success: boolean;
  message: string;
}

export interface DisbursementTimelineParams {
  page?: number;
  page_size?: number;
}
