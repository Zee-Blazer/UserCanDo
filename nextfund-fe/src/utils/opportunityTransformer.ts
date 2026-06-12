import { getCountryByCode } from "../constants/countries";
import { Investment, KeyMetric, TimelineEvent } from "../types/landing-page";
import {
  BusinessListingDetailsResponse,
  InvestmentTimelineResponse,
  ListingDetails,
} from "../types/queries-type";

const hasValue = (value: unknown): boolean =>
  value !== null &&
  value !== undefined &&
  String(value).trim().length > 0 &&
  String(value).trim().toLowerCase() !== "null";

const sanitizeString = (value: unknown): string | undefined => {
  if (!hasValue(value)) return undefined;
  return String(value).trim();
};

const toNumber = (value: unknown): number | undefined => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : undefined;
  }
  if (!hasValue(value)) {
    return undefined;
  }
  const cleaned = String(value).replace(/[^0-9.+-]/g, "");
  if (!cleaned) {
    return undefined;
  }
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const toInteger = (value: unknown): number | undefined => {
  const num = toNumber(value);
  if (num === undefined) return undefined;
  return Math.round(num);
};

const coerceBoolean = (value: unknown): boolean | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  const str = String(value).toLowerCase().trim();
  if (!str) return undefined;
  if (["true", "yes", "1"].includes(str)) return true;
  if (["false", "no", "0"].includes(str)) return false;
  return undefined;
};

const pickStringValue = (
  ...values: Array<string | number | undefined | null>
): string | undefined => {
  for (const value of values) {
    const normalized = sanitizeString(value);
    if (normalized) {
      return normalized;
    }
  }
  return undefined;
};

// Helper function to convert country code to country name
const formatCountryName = (
  location: string | undefined | null
): string | undefined => {
  if (!location) return undefined;
  const trimmed = String(location).trim();
  if (!trimmed || trimmed === "Not provided") return trimmed || undefined;
  // Check if it's a country code (2-3 letters, case-insensitive)
  const upperTrimmed = trimmed.toUpperCase();
  if (/^[A-Z]{2,3}$/.test(upperTrimmed)) {
    const country = getCountryByCode(upperTrimmed);
    return country?.name || trimmed;
  }
  return trimmed;
};

// Helper function to format expected ROI string
// Handles formats like: "14.0-23.0", "14-23", "14.5%", "14% - 23%", etc.
export const formatExpectedROI = (
  roi: string | number | undefined | null
): string | undefined => {
  if (!roi) return undefined;

  // If it's already a number, format it
  if (typeof roi === "number") {
    return `${roi}%`;
  }

  const roiStr = String(roi).trim();
  if (!roiStr || roiStr === "" || roiStr === "null" || roiStr === "undefined") {
    return undefined;
  }

  // Check if it's already formatted with % (e.g., "14% - 23%")
  if (roiStr.includes("%")) {
    return roiStr;
  }

  // Handle range format (e.g., "14.0-23.0", "14-23")
  const rangeMatch = roiStr.match(/^([\d.]+)\s*-\s*([\d.]+)$/);
  if (rangeMatch) {
    const lower = parseFloat(rangeMatch[1]);
    const upper = parseFloat(rangeMatch[2]);
    if (!isNaN(lower) && !isNaN(upper)) {
      // Round to nearest integer for display
      const lowerRounded = Math.round(lower);
      const upperRounded = Math.round(upper);
      if (lowerRounded === upperRounded) {
        return `${lowerRounded}%`;
      }
      return `${lowerRounded}% - ${upperRounded}%`;
    }
  }

  // Handle single value (e.g., "14.0", "14")
  const singleValue = parseFloat(roiStr);
  if (!isNaN(singleValue)) {
    return `${Math.round(singleValue)}%`;
  }

  // Return as-is if we can't parse it
  return roiStr;
};

export interface ApiListingData {
  id: string;
  listing_id: string;
  business_id: string;
  category: string;
  ownwer_name: string;
  owner_name?: string | null;
  business_name: string;
  location: string;
  headquarters?: string | null;
  website_url?: string | null;
  market_opportunity?: string | null;
  competitive_advantage?: string | null;
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
  expected_roi?: string | null;
  documents_restricted?: boolean;
  documents?: Record<string, any>;
  preview_document?: {
    key: string;
    name: string;
    file: string | null;
  };
  funding_structure: {
    funding_type: string;
    current_valuation: string;
    funding_amount_seeking: string;
    percentage_equity_offering: string;
    maturity_period: string;
    instrument_type: string;
  };
  company_metrics_and_financial_information: {
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
  };
  use_of_funds: {
    team_expansion: string;
    working_capital: string;
    market_expansion: string;
    marketing_and_sales: string;
    product_development: string;
    technology_infrastructure: string;
    funds_deployment_timeline: string;
    expected_funding_completion: string;
    key_milestone_to_achieve_with_funding: string;
  };
  essential_documents: {
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
  };
  compliance_and_verification: {
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
  };
  investment_preference: {
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
  };
  is_complete: boolean;
  review_status: string;
  approval_status: string;
  funding_status: string;
  created_at: string;
  updated_at: string;
  last_modified: string;
}

export const transformListingToInvestment = (
  listing: ApiListingData
): Investment => {
  const rawFunding = (listing.funding_structure || {}) as Record<
    string,
    unknown
  >;
  const fundingAmount = toNumber(rawFunding.funding_amount_seeking);
  const amountRaised = toNumber((rawFunding as any).amount_raised);
  const minimumInvestmentFunding = toNumber(rawFunding.minimum_investment);
  const equityOfferedValue = toNumber(rawFunding.equity_offered);

  const sanitizedFundingStructure: Record<string, unknown> = {
    ...rawFunding,
    funding_amount_seeking: fundingAmount,
    current_valuation: toNumber(rawFunding.current_valuation),
    valuation: toNumber((rawFunding as any).valuation),
    pre_money_valuation: toNumber((rawFunding as any).pre_money_valuation),
    minimum_investment: minimumInvestmentFunding,
    equity_offered: equityOfferedValue,
  };

  const rawCompanyMetrics =
    (listing.company_metrics_and_financial_information || {}) as Record<
      string,
      unknown
    >;
  const sanitizedCompanyMetrics: Record<string, unknown> = {
    ...rawCompanyMetrics,
  };

  [
    "team_size",
    "gross_margin",
    "burn_rate",
    "months_of_runway",
    "monthly_revenue",
    "monthly_growth_rate",
    "number_of_customers",
    "monthly_recurring_revenue",
    "annual_revenue",
    "lifetime_value",
    "customer_acquisition_cost",
    "transaction_value",
    "market_share_percentage",
    "customer_retention_percentage",
    "churn_rate",
  ].forEach((key) => {
    if (hasValue(rawCompanyMetrics[key])) {
      const numeric = toNumber(rawCompanyMetrics[key]);
      if (numeric !== undefined) {
        sanitizedCompanyMetrics[key] = numeric;
      }
    }
  });

  if (hasValue(rawCompanyMetrics.year_founded)) {
    sanitizedCompanyMetrics.year_founded = toInteger(
      rawCompanyMetrics.year_founded
    );
  }

  const rawUseOfFunds = (listing.use_of_funds || {}) as Record<string, unknown>;
  const sanitizedUseOfFunds: Record<string, string> = {};
  [
    "team",
    "marketing",
    "operations",
    "product_development",
    "team_expansion",
    "working_capital",
    "market_expansion",
    "marketing_and_sales",
    "technology_infrastructure",
    "others",
  ].forEach((key) => {
    if (hasValue(rawUseOfFunds[key])) {
      const numeric = toNumber(rawUseOfFunds[key]);
      if (numeric !== undefined) {
        sanitizedUseOfFunds[key] = numeric.toString();
      }
    }
  });
  if (hasValue(rawUseOfFunds.description)) {
    const description = sanitizeString(rawUseOfFunds.description);
    if (description) {
      sanitizedUseOfFunds.description = description;
    }
  }
  [
    "expected_funding_completion",
    "funds_deployment_timeline",
    "key_milestone_to_achieve_with_funding",
  ].forEach((key) => {
    const value = sanitizeString(rawUseOfFunds[key]);
    if (value) {
      sanitizedUseOfFunds[key] = value;
    }
  });

  const rawInvestmentPreference = (listing.investment_preference ||
    {}) as Record<string, unknown>;
  const sanitizedInvestmentPreference: Record<string, unknown> = {
    ...rawInvestmentPreference,
  };
  [
    "minimum_investment",
    "maximum_investment",
    "maximum_number_of_investors",
    "due_diligence_timeline",
    "funding_round_duration",
  ].forEach((key) => {
    if (hasValue(rawInvestmentPreference[key])) {
      const numeric = toNumber(rawInvestmentPreference[key]);
      if (numeric !== undefined) {
        sanitizedInvestmentPreference[key] = numeric;
      }
    }
  });
  if (hasValue(rawInvestmentPreference.expected_close_date)) {
    sanitizedInvestmentPreference.expected_close_date = sanitizeString(
      rawInvestmentPreference.expected_close_date
    );
  }
  if (hasValue(rawInvestmentPreference.board_seat_offering)) {
    sanitizedInvestmentPreference.board_seat_offering = sanitizeString(
      rawInvestmentPreference.board_seat_offering
    );
  }
  if (hasValue(rawInvestmentPreference.anti_dilution_rights)) {
    sanitizedInvestmentPreference.anti_dilution_rights = sanitizeString(
      rawInvestmentPreference.anti_dilution_rights
    );
  }
  if (hasValue(rawInvestmentPreference.geographic_preference)) {
    sanitizedInvestmentPreference.geographic_preference = sanitizeString(
      rawInvestmentPreference.geographic_preference
    );
  }
  if (hasValue(rawInvestmentPreference.investor_updates_frequency)) {
    sanitizedInvestmentPreference.investor_updates_frequency = sanitizeString(
      rawInvestmentPreference.investor_updates_frequency
    );
  }
  if (hasValue(rawInvestmentPreference.investment_stage)) {
    sanitizedInvestmentPreference.investment_stage = sanitizeString(
      rawInvestmentPreference.investment_stage
    );
  }

  const rawCompliance = (listing.compliance_and_verification || {}) as Record<
    string,
    unknown
  >;
  const sanitizedCompliance: Record<string, unknown> = { ...rawCompliance };
  [
    "legally_incorporated",
    "founders_equity_agreement",
    "pending_legal_disputes",
    "authorized_to_raise_capital",
    "local_securities_regulations",
    "declaration",
    "verified",
  ].forEach((key) => {
    const booleanValue = coerceBoolean(rawCompliance[key]);
    if (booleanValue !== undefined) {
      sanitizedCompliance[key] = booleanValue;
    }
  });
  [
    "registration_number",
    "tax_id_number",
    "registered_address",
    "certificate_of_incorporation",
    "founder_agreements",
    "legal_compliance_certificate",
    "interest_structure",
  ].forEach((key) => {
    if (hasValue(rawCompliance[key])) {
      sanitizedCompliance[key] = sanitizeString(rawCompliance[key]);
    }
  });

  const rawDocuments = (listing.essential_documents || {}) as Record<
    string,
    unknown
  >;
  const sanitizedDocuments: Record<string, string> = {};
  Object.entries(rawDocuments).forEach(([key, value]) => {
    const sanitized = sanitizeString(value);
    if (sanitized) {
      sanitizedDocuments[key] = sanitized;
    }
  });

  let expectedCloseDate: string | undefined;
  let closingDays: number = 0; // Default to 0 if no date provided

  // Priority 1: Check use_of_funds.expected_funding_completion (this is the actual closing date)
  const useOfFunds = listing.use_of_funds as any;
  const expectedFundingCompletion = useOfFunds?.expected_funding_completion;

  // Priority 2: Check investment_preference.expected_close_date
  const investmentPreferenceExpectedClose =
    sanitizedInvestmentPreference.expected_close_date;

  // Use expected_funding_completion first, then fallback to expected_close_date
  const dateToUse =
    expectedFundingCompletion || investmentPreferenceExpectedClose;

  if (hasValue(dateToUse)) {
    const expectedCloseDateValue = String(dateToUse);
    const expectedDate = new Date(expectedCloseDateValue);
    if (!Number.isNaN(expectedDate.getTime())) {
      expectedCloseDate = expectedCloseDateValue;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      const diffTime = expectedDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      closingDays = diffDays >= 0 ? diffDays : 0;
    } else {
      expectedCloseDate = expectedCloseDateValue;
    }
  }

  const foundedYear =
    toInteger(sanitizedCompanyMetrics.year_founded as any) ??
    (listing.created_at
      ? new Date(listing.created_at).getFullYear()
      : undefined);

  // Get Expected ROI from multiple sources
  // Priority 1: Direct expected_roi field on listing (from API)
  // Priority 2: expected_roi from investment_preference
  // equity_offered is different from expected_roi - do NOT use equity_offered as fallback
  const expectedROIRaw = pickStringValue(
    (listing as any).expected_roi,
    (rawInvestmentPreference as any).expected_roi
  );

  const expectedROI = expectedROIRaw
    ? formatExpectedROI(expectedROIRaw)
    : undefined;

  const ownerName =
    sanitizeString(listing.owner_name) ?? sanitizeString(listing.ownwer_name);

  const isContactVisible =
    listing.contact_visible === undefined
      ? true
      : Boolean(listing.contact_visible);

  // Check both new API field names and legacy field names
  const contactEmail = isContactVisible
    ? pickStringValue(
        listing.email,
        listing.contact_email,
        (listing as any).contact?.email
      )
    : undefined;

  const contactPhone = isContactVisible
    ? pickStringValue(
        listing.business_phone_number,
        listing.contact_phone,
        (listing as any).contact?.phone,
        (listing as any).contact?.phone_number
      )
    : undefined;

  const contactWebsite = isContactVisible
    ? pickStringValue(
        listing.website_url,
        listing.contact_website,
        (listing as any).contact?.website,
        (listing as any).contact?.web
      )
    : undefined;

  const contactLinkedin = isContactVisible
    ? pickStringValue(
        listing.linked_in_profile,
        listing.contact_linkedin,
        (listing as any).contact?.linkedin,
        (listing as any).contact?.linked_in_profile
      )
    : undefined;

  const registeredAddressForHeadquarters = sanitizeString(
    rawCompliance.registered_address
  );

  // Helper to check if a string looks like an address (not a long description)
  const isValidAddress = (value: string | undefined | null): boolean => {
    if (!value) return false;
    const trimmed = value.trim().toLowerCase();
    // If it's too long (more than 100 chars) or contains "Goals and Expectations", it's likely not an address
    if (trimmed.length > 100 || trimmed.includes("Goals and Expectations")) {
      return false;
    }
    // Filter out common invalid values that are not real addresses
    const invalidValues = [
      "none",
      "null",
      "n/a",
      "na",
      "growth",
      "funding",
      "lorem ipsum",
    ];
    if (invalidValues.includes(trimmed)) {
      return false;
    }
    // If it's a single word that's not a country name, it's likely not an address
    // But we'll be lenient here - just filter obvious invalid values
    return true;
  };

  // Filter out invalid registered_address
  const validRegisteredAddressForHeadquarters =
    registeredAddressForHeadquarters &&
    isValidAddress(registeredAddressForHeadquarters)
      ? registeredAddressForHeadquarters
      : undefined;

  // Console log to track registered_address usage in headquarters
  if (
    registeredAddressForHeadquarters &&
    registeredAddressForHeadquarters.includes("Goals and Expectations")
  ) {
    // Invalid registered_address filtered out
  }

  const headquarters =
    sanitizeString(listing.headquarters) ??
    validRegisteredAddressForHeadquarters ??
    sanitizeString((sanitizedCompanyMetrics as any).headquarters);

  const countryLocation =
    sanitizeString(listing.location) ??
    sanitizeString(
      (sanitizedCompliance as any).country_location ||
        (sanitizedCompanyMetrics as any).country_location
    );

  const overviewDescription = sanitizeString(
    (listing as any).overview?.description
  );
  const registeredAddressForDescription = sanitizeString(
    (sanitizedCompliance as any).registered_address
  );

  // Filter out invalid registered_address for description too
  const validRegisteredAddressForDescription =
    registeredAddressForDescription &&
    isValidAddress(registeredAddressForDescription)
      ? registeredAddressForDescription
      : undefined;

  // Console log to track registered_address usage in businessOverview/description
  if (
    registeredAddressForDescription &&
    registeredAddressForDescription.includes("Goals and Expectations")
  ) {
    // Invalid registered_address filtered out
  }

  // Generate fallback description
  const fallbackDescription = `Investment opportunity in ${
    listing.business_name
  } - ${listing.category} sector. ${
    sanitizedCompanyMetrics.company_stage || "Established"
  } company seeking $${
    fundingAmount !== undefined ? fundingAmount.toLocaleString() : "0"
  } in funding.`;

  // Log when fallback description is used
  const willUseFallbackDescription =
    !overviewDescription &&
    !sanitizeString(
      sanitizedUseOfFunds.description || validRegisteredAddressForDescription
    );

  // Using fallback description if needed

  const businessOverview =
    overviewDescription ||
    sanitizeString(
      sanitizedUseOfFunds.description || validRegisteredAddressForDescription
    ) ||
    fallbackDescription;

  const marketOpportunity =
    sanitizeString((listing as any).market_opportunity_description) ??
    sanitizeString((listing as any).market_opportunity) ??
    sanitizeString(
      (sanitizedCompanyMetrics as any).market_opportunity ||
        (sanitizedCompanyMetrics as any).market_opportunity_description
    );

  const competitiveAdvantage =
    sanitizeString((listing as any).competitive_advantage_description) ??
    sanitizeString((listing as any).competitive_advantage) ??
    sanitizeString(
      (sanitizedCompanyMetrics as any).competitive_advantage ||
        (sanitizedCompanyMetrics as any).competitive_advantage_description
    );

  const minInvestment =
    toNumber(rawInvestmentPreference.minimum_investment) ??
    minimumInvestmentFunding;

  const maxInvestment = toNumber(rawInvestmentPreference.maximum_investment);

  const investors = toInteger(
    rawInvestmentPreference.maximum_number_of_investors
  );

  const targetAmount = fundingAmount ?? 0;
  const currentFunding = amountRaised ?? 0;
  const fundingProgress =
    targetAmount > 0
      ? Math.min(Math.round((currentFunding / targetAmount) * 100), 100)
      : 0;

  const burnRateString = hasValue(sanitizedCompanyMetrics.burn_rate)
    ? String(sanitizedCompanyMetrics.burn_rate)
    : undefined;
  const grossMarginString = hasValue(sanitizedCompanyMetrics.gross_margin)
    ? String(sanitizedCompanyMetrics.gross_margin)
    : undefined;
  const monthlyGrowthRateString = hasValue(
    sanitizedCompanyMetrics.monthly_growth_rate
  )
    ? String(sanitizedCompanyMetrics.monthly_growth_rate)
    : undefined;

  const finalRegisteredAddressFallback = sanitizeString(
    (sanitizedCompliance as any).registered_address
  );

  // Filter out invalid registered_address for final fallback too
  const validFinalRegisteredAddressFallback =
    finalRegisteredAddressFallback &&
    isValidAddress(finalRegisteredAddressFallback)
      ? finalRegisteredAddressFallback
      : undefined;

  // Console log if registered_address is used as final headquarters fallback
  if (
    finalRegisteredAddressFallback &&
    finalRegisteredAddressFallback.includes("Goals and Expectations")
  ) {
    // Invalid registered_address filtered out
  }

  const sanitizedHeadquarters =
    headquarters ?? validFinalRegisteredAddressFallback;
  const sanitizedLocation =
    formatCountryName(countryLocation) ?? "Not provided";

  return {
    id: listing.id || `listing-${Date.now()}-${Math.random()}`,
    listing_id: listing.id || `listing-${Date.now()}-${Math.random()}`,
    title: listing.business_name || "Unnamed Business",
    category: (listing.category as Investment["category"]) || "FINTECH",
    location: sanitizedLocation,
    headquarters: sanitizedHeadquarters,
    description: businessOverview,
    businessOverview,
    marketOpportunity: marketOpportunity || undefined,
    competitiveAdvantage: competitiveAdvantage || undefined,
    targetAmount,
    fundingGoal: targetAmount,
    currentFunding,
    equityOffering:
      equityOfferedValue !== undefined
        ? `${equityOfferedValue}%`
        : sanitizeString(rawFunding.percentage_equity_offering) || undefined,
    expectedROI: expectedROI || "0%",
    closingDays,
    expectedCloseDate,
    founded: foundedYear,
    teamSize: toInteger(rawCompanyMetrics.team_size),
    minInvestment: minInvestment,
    maxInvestment: maxInvestment,
    investmentTerm: sanitizedInvestmentPreference.funding_round_duration
      ? `${sanitizedInvestmentPreference.funding_round_duration} months`
      : undefined,
    investors,
    fundingProgress,
    burnRate: burnRateString,
    grossMargin: grossMarginString,
    monthlyGrowthRate: monthlyGrowthRateString,
    ownerName,
    website: contactWebsite,
    email: contactEmail,
    phone: contactPhone,
    linkedin: contactLinkedin,
    contactVisible: isContactVisible,
    taxIdNumber: sanitizedCompliance.tax_id_number as string | undefined,
    registrationNumber: sanitizedCompliance.registration_number as
      | string
      | undefined,
    currentValuation: toNumber(rawFunding.current_valuation),
    useOfFunds: sanitizedUseOfFunds,
    documents: sanitizedDocuments,
    compliance: sanitizedCompliance,
    investmentPreferences: sanitizedInvestmentPreference,
    company_metrics_and_financial_information: sanitizedCompanyMetrics,
    funding_structure: sanitizedFundingStructure,
    use_of_funds: sanitizedUseOfFunds,
    essential_documents: sanitizedDocuments,
    compliance_and_verification: sanitizedCompliance,
    investment_preference: sanitizedInvestmentPreference,
    documents_restricted: listing.documents_restricted ?? false,
    documents_object: listing.documents,
    preview_document: listing.preview_document,
    is_complete: listing.is_complete,
    review_status: listing.review_status,
    approval_status: listing.approval_status,
    funding_status: listing.funding_status,
    created_at: listing.created_at,
    last_modified: listing.updated_at,
  };
};

// Helper function to get category icon
export const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    Technology: "/coins-s.png",
    Agriculture: "/plant-s.png",
    Healthcare: "/health.png",
    "Real Estate": "/house.png",
    Logistics: "/coins-s.png",
    Energy: "/plant-s.png",
    Manufacturing: "/coins-s.png",
    Hospitality: "/house.png",
  };
  return iconMap[category] || "/coins-s.png";
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format category display
export const formatCategory = (category: string): string => {
  return category
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Transformer function for ListingDetails (used by getListingById)
export const transformListingDetailsToInvestment = (
  listing: ListingDetails
): Investment => {
  const bridgeListing: ApiListingData = {
    business_id: listing.business_id,
    id:
      listing.listing_id ||
      listing.business_id ||
      `listing-${Date.now()}-${Math.random()}`,
    listing_id:
      listing.listing_id ||
      listing.business_id ||
      `bridge-${Date.now()}-${Math.random()}`,
    category: listing.category,
    owner_name: listing.owner_name,
    ownwer_name: (listing as any).ownwer_name,
    business_name: listing.business_name,
    location: listing.location ?? "",
    headquarters: listing.headquarters,
    website_url: listing.website_url,
    market_opportunity: listing.market_opportunity,
    competitive_advantage: listing.competitive_advantage,
    // Map both new and legacy contact fields
    email: listing.email,
    business_phone_number: listing.business_phone_number,
    linked_in_profile: listing.linked_in_profile,
    contact_email: listing.contact_email,
    contact_phone: listing.contact_phone,
    contact_website: listing.contact_website,
    contact_linkedin: listing.contact_linkedin,
    contact_visible: listing.contact_visible,
    funding_structure: listing.funding_structure as any,
    company_metrics_and_financial_information:
      listing.company_metrics_and_financial_information as any,
    use_of_funds: listing.use_of_funds as any,
    essential_documents: listing.essential_documents as any,
    compliance_and_verification: listing.compliance_and_verification as any,
    investment_preference: listing.investment_preference as any,
    is_complete: listing.is_complete,
    review_status: listing.review_status,
    approval_status: listing.approval_status,
    funding_status: listing.funding_status,
    created_at: listing.created_at,
    updated_at: listing.last_modified,
    last_modified: listing.last_modified,
  };

  const investment = transformListingToInvestment(bridgeListing);

  if (listing.listing_id) {
    investment.listing_id = listing.listing_id;
    investment.id = listing.listing_id;
  }

  if (listing.headquarters && listing.headquarters.trim()) {
    investment.headquarters = listing.headquarters.trim();
  }

  if (listing.location && listing.location.trim()) {
    investment.location =
      formatCountryName(listing.location.trim()) || listing.location.trim();
  }

  if (
    investment.headquarters &&
    investment.headquarters.toLowerCase() ===
      investment.location.toLowerCase() &&
    listing.location &&
    listing.location.trim() &&
    listing.location.toLowerCase() !== listing.headquarters?.toLowerCase()
  ) {
    investment.location =
      formatCountryName(listing.location.trim()) || listing.location.trim();
  }

  if (listing.business_name) {
    investment.title = listing.business_name;
  }

  if (listing.category) {
    investment.category = listing.category as Investment["category"];
  }

  return investment;
};

export interface StructuredListingTransformOptions {
  listingId: string;
  fallbackListing?: ListingDetails | ApiListingData | null;
  canViewContactDetails?: boolean;
}

export const transformStructuredListingDetailsToInvestment = (
  details?: BusinessListingDetailsResponse | null,
  options?: StructuredListingTransformOptions
): Investment | null => {
  if (!details?.overview) {
    return null;
  }

  const overview = details.overview;
  const companyInfo = (details.company_info || {}) as Record<string, any>;
  const investmentDetails = (details.investment_details || {}) as Record<
    string,
    any
  >;
  const contactSection = (details.contact || {}) as Record<string, any>;
  const fallback = options?.fallbackListing
    ? { ...(options.fallbackListing as any) }
    : undefined;
  const listingId = options?.listingId || overview.id;

  const contactVisibilityCandidates = [
    contactSection.contact_visible,
    overview.contact_visible,
    fallback?.contact_visible,
  ];
  const contactVisible =
    contactVisibilityCandidates.find((value) => typeof value === "boolean") ??
    true;

  const canViewContactDetails = options?.canViewContactDetails ?? false;
  const contactAccessGranted = Boolean(contactVisible) || canViewContactDetails;

  // Check if fallback has registered_address with "Goals and Expectations"
  const fallbackRegisteredAddress =
    fallback?.compliance_and_verification?.registered_address;
  if (
    fallbackRegisteredAddress &&
    fallbackRegisteredAddress.includes("Goals and Expectations")
  ) {
    // Invalid registered_address filtered out
  }

  const resolvedHeadquarters =
    pickStringValue(
      companyInfo.headquarters,
      overview.headquarters,
      fallback?.headquarters,
      companyInfo.country,
      overview.country,
      fallback?.location,
      fallback?.country_location
    ) || undefined;

  const resolvedLocationRaw =
    pickStringValue(
      companyInfo.location,
      companyInfo.country,
      overview.country,
      fallback?.location,
      fallback?.country_location,
      resolvedHeadquarters
    ) ||
    overview.country ||
    fallback?.location ||
    "Not specified";

  const resolvedLocation =
    formatCountryName(resolvedLocationRaw) || resolvedLocationRaw;

  const hasField = (
    source: Record<string, any> | undefined,
    key: string
  ): boolean =>
    Boolean(source && Object.prototype.hasOwnProperty.call(source, key));

  const getStructuredNumber = (
    key: string,
    parser: (value: unknown) => number | undefined = toNumber
  ): number | undefined => {
    if (hasField(investmentDetails, key)) {
      return parser(investmentDetails[key]);
    }
    if (hasField(overview as Record<string, any>, key)) {
      return parser((overview as Record<string, any>)[key]);
    }
    return undefined;
  };

  const hasStructuredNumber = (key: string) =>
    hasField(investmentDetails, key) ||
    hasField(overview as Record<string, any>, key);

  const getStructuredString = (key: string): string | undefined => {
    if (hasField(investmentDetails, key)) {
      return sanitizeString(investmentDetails[key]);
    }
    if (hasField(overview as Record<string, any>, key)) {
      return sanitizeString((overview as Record<string, any>)[key]);
    }
    return undefined;
  };

  // Helper to check if a value is valid (not 0, null, or undefined)
  const isValidValue = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === "number" && value === 0) return false;
    if (
      typeof value === "string" &&
      (value.trim() === "" || value === "0" || value === "0.0")
    )
      return false;
    return true;
  };

  const structuredMinInvestment = hasStructuredNumber("min_investment")
    ? getStructuredNumber("min_investment")
    : undefined;
  const resolvedMinInvestment = isValidValue(structuredMinInvestment)
    ? structuredMinInvestment
    : toNumber(fallback?.investment_preference?.minimum_investment);

  const structuredInvestors = hasStructuredNumber("investors_count")
    ? getStructuredNumber("investors_count", toInteger)
    : undefined;
  const resolvedInvestors = isValidValue(structuredInvestors)
    ? structuredInvestors
    : toInteger(fallback?.investment_preference?.maximum_number_of_investors);

  const resolvedFundingProgress =
    (hasStructuredNumber("funding_progress")
      ? getStructuredNumber("funding_progress")
      : undefined) ?? 0;

  const structuredTargetAmount = hasStructuredNumber("target_amount")
    ? getStructuredNumber("target_amount")
    : undefined;
  const resolvedTargetAmount = isValidValue(structuredTargetAmount)
    ? structuredTargetAmount
    : toNumber(fallback?.funding_structure?.funding_amount_seeking) ?? 0;

  const structuredAmountRaised = hasStructuredNumber("amount_raised")
    ? getStructuredNumber("amount_raised")
    : undefined;
  const resolvedAmountRaised = isValidValue(structuredAmountRaised)
    ? structuredAmountRaised
    : toNumber(fallback?.funding_structure?.amount_raised) ??
      (resolvedTargetAmount && resolvedTargetAmount > 0
        ? (resolvedTargetAmount * resolvedFundingProgress) / 100
        : 0);

  const structuredClosingDays = hasStructuredNumber("closing_in_days")
    ? getStructuredNumber("closing_in_days", toInteger)
    : undefined;
  let resolvedClosingDays: number | undefined = isValidValue(
    structuredClosingDays
  )
    ? structuredClosingDays
    : undefined;

  // If no closing days, try to calculate from expected_close_date or expected_funding_completion
  if (resolvedClosingDays === undefined || resolvedClosingDays === null) {
    // Priority 1: expected_funding_completion from use_of_funds (this is the actual closing date)
    // Priority 2: expected_close_date from investment_preference
    // Priority 3: expected_close_date from structured endpoint
    const expectedCloseDate =
      sanitizeString(fallback?.use_of_funds?.expected_funding_completion) ??
      sanitizeString(fallback?.investment_preference?.expected_close_date) ??
      getStructuredString("expected_close_date");

    if (expectedCloseDate) {
      const closeDate = new Date(expectedCloseDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      closeDate.setHours(0, 0, 0, 0);

      if (!isNaN(closeDate.getTime())) {
        const diffTime = closeDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        resolvedClosingDays = diffDays > 0 ? diffDays : 0;
      } else {
        // Invalid date, default to 0
        resolvedClosingDays = 0;
      }
    } else {
      // No date provided, default to 0
      resolvedClosingDays = 0;
    }
  }

  // Priority 1: expected_funding_completion from use_of_funds (this is the actual closing date)
  // Priority 2: expected_close_date from investment_preference
  // Priority 3: expected_close_date from structured endpoint
  const resolvedExpectedCloseDate =
    sanitizeString(fallback?.use_of_funds?.expected_funding_completion) ??
    sanitizeString(fallback?.investment_preference?.expected_close_date) ??
    getStructuredString("expected_close_date");

  const resolvedFoundedYear =
    toInteger(companyInfo.founded_year) ??
    toInteger(overview.founded_year) ??
    toInteger(
      fallback?.company_metrics_and_financial_information?.year_founded
    );

  const expectedROI = (() => {
    // Priority 1: Use structured endpoint's lower_expected_roi and upper_expected_roi
    const lowerHasStructured = hasStructuredNumber("lower_expected_roi");
    const upperHasStructured = hasStructuredNumber("upper_expected_roi");
    const lower = lowerHasStructured
      ? getStructuredNumber("lower_expected_roi")
      : undefined;
    const upper = upperHasStructured
      ? getStructuredNumber("upper_expected_roi")
      : undefined;

    if (lowerHasStructured || upperHasStructured) {
      if (lower === undefined && upper === undefined) {
        // Both are undefined, continue to next priority
      } else if (lower === undefined) {
        return `${Math.round(upper!)}%`;
      } else if (upper === undefined) {
        return `${Math.round(lower)}%`;
      } else if (lower === upper) {
        return `${Math.round(lower)}%`;
      } else {
        return `${Math.round(lower)}% - ${Math.round(upper)}%`;
      }
    }

    // Priority 2: Use structured endpoint's expected_roi string field
    const structuredExpectedRoi = pickStringValue(
      investmentDetails.expected_roi,
      (overview as any).expected_roi
    );
    if (structuredExpectedRoi) {
      const formatted = formatExpectedROI(structuredExpectedRoi);
      if (formatted) return formatted;
    }

    // Priority 3: Fallback to investment_preference.expected_roi from raw listing
    const fallbackRoi = pickStringValue(
      (fallback?.investment_preference as any)?.expected_roi,
      (fallback as any)?.expected_roi
    );
    if (fallbackRoi) {
      const formatted = formatExpectedROI(fallbackRoi);
      if (formatted) return formatted;
    }

    return undefined;
  })();

  const fallbackCompliance = fallback?.compliance_and_verification as any;

  const contactEmail = contactAccessGranted
    ? pickStringValue(
        contactSection.email,
        contactSection.primary_email,
        overview.contact_email,
        fallback?.contact_email,
        fallbackCompliance?.email
      )
    : undefined;

  const contactPhone = contactAccessGranted
    ? pickStringValue(
        contactSection.phone,
        contactSection.phone_number,
        overview.contact_phone,
        fallback?.contact_phone,
        fallbackCompliance?.phone_number
      )
    : undefined;

  // Check root level website_url first (for /get_listing_by_business and /get_listing_by_id endpoints)
  const rootWebsiteUrl = (details as any)?.website_url;

  const contactWebsite = contactAccessGranted
    ? pickStringValue(
        rootWebsiteUrl, // Check root level first
        contactSection.website,
        contactSection.web,
        overview.contact_website,
        fallback?.contact_website,
        fallbackCompliance?.website_url,
        (fallback as any)?.website_url
      )
    : undefined;

  const contactLinkedin = contactAccessGranted
    ? pickStringValue(
        contactSection.linkedin,
        contactSection.linked_in,
        overview.contact_linkedin,
        fallback?.contact_linkedin,
        fallbackCompliance?.linked_in_profile
      )
    : undefined;

  const resolvedCategory = (overview.sector ||
    fallback?.category ||
    "Technology") as Investment["category"];

  // Resolve market opportunity and competitive advantage with fallbacks
  // Check root level of details object first (for /get_listing_by_business and /get_listing_by_id endpoints)
  const rootMarketOpportunity = (details as any)?.market_opportunity;
  const rootCompetitiveAdvantage = (details as any)?.competitive_advantage;

  const resolvedMarketOpportunity = pickStringValue(
    rootMarketOpportunity, // Check root level first
    overview.market_opportunity,
    (fallback as any)?.market_opportunity_description,
    (fallback as any)?.market_opportunity,
    (fallback?.company_metrics_and_financial_information as any)
      ?.market_opportunity,
    (fallback?.company_metrics_and_financial_information as any)
      ?.market_opportunity_description
  );

  const resolvedCompetitiveAdvantage = pickStringValue(
    rootCompetitiveAdvantage, // Check root level first
    overview.competitive_advantage,
    (fallback as any)?.competitive_advantage_description,
    (fallback as any)?.competitive_advantage,
    (fallback?.company_metrics_and_financial_information as any)
      ?.competitive_advantage,
    (fallback?.company_metrics_and_financial_information as any)
      ?.competitive_advantage_description
  );

  const transformed: Investment = {
    id: listingId,
    listing_id: listingId,
    title: overview.business_name,
    category: resolvedCategory,
    location: resolvedLocation,
    headquarters: resolvedHeadquarters,
    description: overview.description,
    businessOverview: overview.description,
    marketOpportunity: resolvedMarketOpportunity,
    competitiveAdvantage: resolvedCompetitiveAdvantage,
    fundingProgress: resolvedFundingProgress,
    targetAmount: resolvedTargetAmount ?? 0,
    expectedROI: expectedROI || "0%",
    minInvestment: resolvedMinInvestment,
    investors: resolvedInvestors,
    closingDays: resolvedClosingDays ?? 0,
    expectedCloseDate: resolvedExpectedCloseDate,
    founded: resolvedFoundedYear,
    company_metrics_and_financial_information:
      fallback?.company_metrics_and_financial_information,
    use_of_funds: fallback?.use_of_funds,
    compliance_and_verification: fallback?.compliance_and_verification,
    investment_preference: fallback?.investment_preference,
    funding_structure: fallback?.funding_structure,
    essential_documents: fallback?.essential_documents,
    documents_restricted: (fallback as any)?.documents_restricted ?? details?.documents?.gated ?? false,
    documents_object: (fallback as any)?.documents,
    preview_document: (fallback as any)?.preview_document ?? details?.documents?.preview_document,
    contactVisible: contactVisible,
    taxIdNumber: fallbackCompliance?.tax_id_number,
    registrationNumber: fallbackCompliance?.registration_number,
  };

  if (contactAccessGranted) {
    transformed.email = contactEmail ?? transformed.email;
    transformed.phone = contactPhone ?? transformed.phone;
    transformed.website = contactWebsite ?? transformed.website;
    transformed.linkedin = contactLinkedin ?? transformed.linkedin;
  }

  if (resolvedAmountRaised && Number.isFinite(resolvedAmountRaised)) {
    transformed.currentFunding = resolvedAmountRaised;
  }

  return transformed;
};

/**
 * @param timelineData
 * @returns
 */
export const transformInvestmentTimelineToEvents = (
  timelineData: InvestmentTimelineResponse
): TimelineEvent[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Build array of events with original dates for sorting
  const eventsWithDates: Array<{
    dateStr: string;
    title: string;
    description: string;
  }> = [];

  if (timelineData.funding_round_opens) {
    eventsWithDates.push({
      dateStr: timelineData.funding_round_opens,
      title: "Funding round opens",
      description: "The investment round officially opens for commitments",
    });
  }

  if (timelineData.due_dilligence_period) {
    eventsWithDates.push({
      dateStr: timelineData.due_dilligence_period,
      title: "Due diligence period",
      description: "Comprehensive review and verification of business details",
    });
  }

  if (timelineData.investment_closing) {
    eventsWithDates.push({
      dateStr: timelineData.investment_closing,
      title: "Investment closing",
      description: "Finalization of investment terms and agreements",
    });
  }

  if (timelineData.funds_disbursement) {
    eventsWithDates.push({
      dateStr: timelineData.funds_disbursement,
      title: "Funds disbursement",
      description: "Release of investment funds to the business",
    });
  }

  if (timelineData.production_enhancement) {
    eventsWithDates.push({
      dateStr: timelineData.production_enhancement,
      title: "Production enhancement",
      description: "Key milestones for production and operational improvements",
    });
  }

  // Sort by date string (ISO format dates sort correctly as strings)
  eventsWithDates.sort((a, b) => a.dateStr.localeCompare(b.dateStr));

  // Transform to TimelineEvent format
  const events = eventsWithDates.map(({ dateStr, title, description }) => {
    const eventDate = new Date(dateStr);
    eventDate.setHours(0, 0, 0, 0);

    const formattedDate = eventDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const event = {
      date: formattedDate,
      title,
      description,
      completed: today >= eventDate,
    };
    return event;
  });

  return events;
};

/**
 * Calculate timeline events from listing data when user hasn't invested yet
 * Uses closing_in_days and use_of_funds data to estimate timeline
 * @param listingDetailsData
 * @param investment
 * @returns
 */
export const calculateTimelineFromListingData = (
  listingDetailsData?: BusinessListingDetailsResponse,
  investment?: Investment | null
): TimelineEvent[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events: TimelineEvent[] = [];

  const structuredTimeline = listingDetailsData?.timeline;

  if (structuredTimeline && Array.isArray(structuredTimeline)) {
    const mappedTimeline = structuredTimeline
      .map((entry) => {
        if (!entry) return null;
        if (typeof entry === "string") {
          return {
            date: entry,
            title: entry,
            description: "",
            completed: false,
          } as TimelineEvent;
        }
        const title =
          (entry as any).title ||
          (entry as any).name ||
          (entry as any).milestone;
        if (!title) return null;
        const description =
          (entry as any).description || (entry as any).details || "";
        const dateValue =
          (entry as any).date ||
          (entry as any).expected_date ||
          (entry as any).occurred_at;
        let formattedDate = "TBD";
        if (dateValue) {
          const parsedDate = new Date(dateValue);
          if (!Number.isNaN(parsedDate.getTime())) {
            formattedDate = parsedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }
        }
        const completed =
          typeof (entry as any).completed === "boolean"
            ? Boolean((entry as any).completed)
            : false;
        return {
          date: formattedDate,
          title,
          description,
          completed,
        } as TimelineEvent;
      })
      .filter(Boolean) as TimelineEvent[];

    if (mappedTimeline.length > 0) {
      return mappedTimeline;
    }
  }

  // Priority 1: Get expected_funding_completion from use_of_funds (this is the closing date)
  const useOfFunds = investment?.use_of_funds as any;
  let closingDate: Date | null = null;

  if (useOfFunds?.expected_funding_completion) {
    const parsedDate = new Date(useOfFunds.expected_funding_completion);
    if (!Number.isNaN(parsedDate.getTime())) {
      parsedDate.setHours(0, 0, 0, 0);
      closingDate = parsedDate;
    }
  }

  // Priority 2: Use closing_in_days from overview if available
  const closingInDaysFromOverview =
    listingDetailsData?.overview?.closing_in_days || undefined;
  if (
    !closingDate &&
    closingInDaysFromOverview &&
    closingInDaysFromOverview > 0
  ) {
    closingDate = new Date(today);
    closingDate.setDate(closingDate.getDate() + closingInDaysFromOverview);
    closingDate.setHours(0, 0, 0, 0);
  }

  // Priority 3: Use investment.expectedCloseDate
  if (!closingDate && investment?.expectedCloseDate) {
    const parsedExpectedClose = new Date(investment.expectedCloseDate);
    if (!Number.isNaN(parsedExpectedClose.getTime())) {
      parsedExpectedClose.setHours(0, 0, 0, 0);
      closingDate = parsedExpectedClose;
    }
  }

  // Priority 4: Use investment.closingDays
  if (!closingDate && investment?.closingDays && investment.closingDays > 0) {
    closingDate = new Date(today);
    closingDate.setDate(closingDate.getDate() + investment.closingDays);
    closingDate.setHours(0, 0, 0, 0);
  }

  // Get funds_deployment_timeline (in months) - this is how long funds will be used, not closing date
  const fundsDeploymentMonths = useOfFunds?.funds_deployment_timeline
    ? parseInt(String(useOfFunds.funds_deployment_timeline)) || 0
    : 0;

  // If we have a closing date, calculate other milestones
  if (closingDate) {
    // Funding round opens: Today or when listing was created (whichever is earlier)
    // If closing is more than 3 months away, start 3 months before closing
    const fundingRoundStart = new Date(closingDate);
    fundingRoundStart.setMonth(fundingRoundStart.getMonth() - 3);
    if (fundingRoundStart < today) {
      fundingRoundStart.setTime(today.getTime());
    }

    // Due diligence period: 1 month after funding round opens (or before closing if needed)
    const dueDiligenceDate = new Date(fundingRoundStart);
    dueDiligenceDate.setMonth(dueDiligenceDate.getMonth() + 1);
    // Ensure due diligence ends before closing
    if (dueDiligenceDate >= closingDate) {
      dueDiligenceDate.setTime(closingDate.getTime());
      dueDiligenceDate.setDate(dueDiligenceDate.getDate() - 7); // 1 week before closing
    }

    // Funds disbursement: 1 month after closing
    const disbursementDate = new Date(closingDate);
    disbursementDate.setMonth(disbursementDate.getMonth() + 1);

    // Production enhancement: Use funds_deployment_timeline if available, otherwise 3 months after disbursement
    const productionDate = new Date(disbursementDate);
    if (fundsDeploymentMonths > 0) {
      productionDate.setMonth(
        productionDate.getMonth() + fundsDeploymentMonths
      );
    } else {
      productionDate.setMonth(productionDate.getMonth() + 3);
    }

    // Helper to format date
    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    // Build events array with dates for sorting
    const eventsWithDates: Array<{
      date: Date;
      dateStr: string;
      title: string;
      description: string;
    }> = [];

    if (fundingRoundStart) {
      eventsWithDates.push({
        date: fundingRoundStart,
        dateStr: formatDate(fundingRoundStart),
        title: "Funding round opens",
        description: "The investment round officially opens for commitments",
      });
    }

    if (dueDiligenceDate) {
      eventsWithDates.push({
        date: dueDiligenceDate,
        dateStr: formatDate(dueDiligenceDate),
        title: "Due diligence period",
        description:
          "Comprehensive review and verification of business details",
      });
    }

    if (closingDate) {
      eventsWithDates.push({
        date: closingDate,
        dateStr: formatDate(closingDate),
        title: "Investment closing",
        description: "Finalization of investment terms and agreements",
      });
    }

    if (disbursementDate) {
      eventsWithDates.push({
        date: disbursementDate,
        dateStr: formatDate(disbursementDate),
        title: "Funds disbursement",
        description: "Release of investment funds to the business",
      });
    }

    if (productionDate) {
      eventsWithDates.push({
        date: productionDate,
        dateStr: formatDate(productionDate),
        title: "Production enhancement",
        description:
          "Key milestones for production and operational improvements",
      });
    }

    // Sort events by date chronologically
    eventsWithDates.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Convert to TimelineEvent format
    eventsWithDates.forEach((event) => {
      events.push({
        date: event.dateStr,
        title: event.title,
        description: event.description,
        completed: today >= event.date,
      });
    });
  }

  return events.length > 0 ? events : [];
};

/**
 * Transform financial data from API to KeyMetric[] format for display
 * @param listingDetailsData
 * @param investment
 * @returns
 */
export const transformFinancialsToKeyMetrics = (
  listingDetailsData?: BusinessListingDetailsResponse,
  investment?: Investment | null
): KeyMetric[] => {
  const metrics: KeyMetric[] = [];

  const structuredKeyMetrics = listingDetailsData?.key_metrics;
  if (structuredKeyMetrics) {
    // Handle new API structure where key_metrics is an object with specific fields
    if (
      typeof structuredKeyMetrics === "object" &&
      !Array.isArray(structuredKeyMetrics)
    ) {
      const keyMetricsObj = structuredKeyMetrics as Record<string, any>;
      const fieldMappings: Record<
        string,
        { label: string; formatter: (val: any) => string; priority?: number }
      > = {
        monthly_revenue: {
          label: "Monthly Revenue",
          priority: 1,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseFloat(String(val).replace(/,/g, "")) || 0;
            return `$${num.toLocaleString()}`;
          },
        },
        monthly_growth_rate: {
          label: "Monthly Growth Rate",
          priority: 2,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        monthly_growth: {
          label: "Monthly Growth",
          priority: 2,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        burn_rate: {
          label: "Burn Rate",
          priority: 3,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseFloat(String(val).replace(/,/g, "")) || 0;
            return `$${num.toLocaleString()}/month`;
          },
        },
        number_of_customers: {
          label: "Number of Customers",
          priority: 4,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseInt(String(val).replace(/,/g, "")) || 0;
            return num.toLocaleString();
          },
        },
        number_of_active_merchants: {
          label: "Active Merchants",
          priority: 5,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseInt(String(val).replace(/,/g, "")) || 0;
            return `${num.toLocaleString()}+`;
          },
        },
        active_merchants: {
          label: "Active Merchants",
          priority: 5,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseInt(String(val).replace(/,/g, "")) || 0;
            return `${num.toLocaleString()}+`;
          },
        },
        months_of_runway: {
          label: "Months of Runway",
          priority: 6,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num} months`;
          },
        },
        total_previous_funding: {
          label: "Total Previous Funding",
          priority: 7,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseFloat(String(val).replace(/,/g, "")) || 0;
            return `$${num.toLocaleString()}`;
          },
        },
        previous_funding: {
          label: "Previous Funding",
          priority: 8,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            return String(val);
          },
        },
        company_stage: {
          label: "Company Stage",
          priority: 9,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            return String(val);
          },
        },
        gross_margin: {
          label: "Gross Margin",
          priority: 10,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        team_size: {
          label: "Team Size",
          priority: 11,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseInt(String(val)) || 0;
            return num.toLocaleString();
          },
        },
        transaction_value: {
          label: "Transaction Value",
          priority: 12,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseFloat(String(val).replace(/,/g, "")) || 0;
            return `$${num.toLocaleString()}`;
          },
        },
        market_share_percentage: {
          label: "Market Share",
          priority: 13,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        customer_retention_percentage: {
          label: "Customer Retention",
          priority: 14,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        transaction_volume: {
          label: "Transaction Volume",
          priority: 15,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number"
                ? val
                : parseFloat(String(val).replace(/,/g, "")) || 0;
            return `$${(num / 1000000).toFixed(1)}M/month`;
          },
        },
        customer_retention: {
          label: "Customer Retention",
          priority: 14,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
        market_share: {
          label: "Market Share",
          priority: 13,
          formatter: (val) => {
            if (!val || val === "null" || val === null || val === "") return "";
            const num =
              typeof val === "number" ? val : parseFloat(String(val)) || 0;
            return `${num}%`;
          },
        },
      };

      const normalizedMetrics: Array<{
        label: string;
        value: string;
        priority: number;
      }> = [];
      Object.entries(fieldMappings).forEach(([key, config]) => {
        if (
          keyMetricsObj[key] !== undefined &&
          keyMetricsObj[key] !== null &&
          keyMetricsObj[key] !== ""
        ) {
          const formattedValue = config.formatter(keyMetricsObj[key]);
          if (formattedValue) {
            normalizedMetrics.push({
              label: config.label,
              value: formattedValue,
              priority: config.priority || 99,
            });
          }
        }
      });

      // Sort by priority and return
      if (normalizedMetrics.length > 0) {
        return normalizedMetrics
          .sort((a, b) => a.priority - b.priority)
          .map(({ label, value }) => ({ label, value }));
      }
    }

    // Fallback to original array/object handling
    const normalizedMetrics: KeyMetric[] = Array.isArray(structuredKeyMetrics)
      ? (structuredKeyMetrics
          .map((entry) => {
            if (!entry) return null;
            if (typeof entry === "string") {
              return {
                label: entry,
                value: entry,
              };
            }
            if (typeof entry === "object") {
              const label =
                sanitizeString((entry as any).label) || "Key Metric";
              const valueRaw =
                (entry as any).value !== undefined
                  ? (entry as any).value
                  : (entry as any).metric_value;
              const value =
                typeof valueRaw === "number"
                  ? valueRaw.toLocaleString()
                  : sanitizeString(valueRaw) || "";
              if (!label || !value) {
                return null;
              }
              return {
                label,
                value,
                description: sanitizeString((entry as any).description),
              };
            }
            return null;
          })
          .filter(Boolean) as KeyMetric[])
      : Object.entries(structuredKeyMetrics as Record<string, any>)
          .map(([label, value]) => {
            const normalizedLabel = label
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase());
            if (
              value &&
              typeof value === "object" &&
              "value" in (value as Record<string, any>)
            ) {
              const metricValue = (value as any).value;
              return {
                label: (value as any).label || normalizedLabel,
                value:
                  typeof metricValue === "number"
                    ? metricValue.toLocaleString()
                    : sanitizeString(metricValue) || "",
                description: (value as any).description,
              };
            }
            return {
              label: normalizedLabel,
              value:
                typeof value === "number"
                  ? value.toLocaleString()
                  : sanitizeString(value) || "",
            };
          })
          .filter((metric) => Boolean(metric.label) && Boolean(metric.value));

    if (normalizedMetrics.length > 0) {
      return normalizedMetrics;
    }
  }

  // Check if current_financials exists AND has at least one key
  const currentFinancials = listingDetailsData?.financials?.current_financials;
  const hasCurrentFinancialsData =
    currentFinancials && Object.keys(currentFinancials).length > 0;

  if (hasCurrentFinancialsData) {
    const fieldMappings: Record<
      string,
      {
        label: string;
        formatter: (value: any) => string;
        priority?: number;
      }
    > = {
      monthly_revenue: {
        label: "Monthly Revenue",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseFloat(String(val)) || 0;
          return `$${num.toLocaleString()}`;
        },
        priority: 1,
      },
      monthly_growth_rate: {
        label: "Monthly Growth",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseFloat(String(val)) || 0;
          return `${num}%`;
        },
        priority: 2,
      },
      number_of_customers: {
        label: "Active Merchants",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseInt(String(val)) || 0;
          return `${num.toLocaleString()}+`;
        },
        priority: 3,
      },
      transaction_volume: {
        label: "Transaction Volume",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseFloat(String(val)) || 0;
          return `$${(num / 1000000).toFixed(1)}M/month`;
        },
        priority: 4,
      },
      customer_retention: {
        label: "Customer Retention",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseFloat(String(val)) || 0;
          return `${num}%`;
        },
        priority: 5,
      },
      market_share: {
        label: "Market Share",
        formatter: (val) => {
          const num =
            typeof val === "number" ? val : parseFloat(String(val)) || 0;
          return `${num}%`;
        },
        priority: 6,
      },
    };

    // First, try to use known field mappings
    const knownFields: Array<{
      key: string;
      label: string;
      value: string;
      priority: number;
    }> = [];
    Object.entries(fieldMappings).forEach(([fieldName, config]) => {
      if (
        currentFinancials[fieldName] !== undefined &&
        currentFinancials[fieldName] !== null
      ) {
        knownFields.push({
          key: fieldName,
          label: config.label,
          value: config.formatter(currentFinancials[fieldName]),
          priority: config.priority || 99,
        });
      }
    });

    // Sort by priority and add to metrics
    knownFields
      .sort((a, b) => a.priority - b.priority)
      .forEach((field) => {
        metrics.push({
          label: field.label,
          value: field.value,
        });
      });

    // If no known fields found, dynamically map any numeric fields
    if (metrics.length === 0) {
      Object.entries(currentFinancials).forEach(([key, value]) => {
        // Only include numeric values or values that can be parsed as numbers
        if (
          value !== null &&
          value !== undefined &&
          (typeof value === "number" ||
            (!isNaN(parseFloat(String(value))) &&
              isFinite(parseFloat(String(value)))))
        ) {
          const numValue =
            typeof value === "number" ? value : parseFloat(String(value));
          // Format key as label (e.g., "monthly_revenue" -> "Monthly Revenue")
          const label = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          // Determine if it should be formatted as currency, percentage, or number
          let formattedValue: string;
          if (
            key.toLowerCase().includes("revenue") ||
            key.toLowerCase().includes("volume") ||
            key.toLowerCase().includes("amount")
          ) {
            formattedValue = `$${numValue.toLocaleString()}`;
          } else if (
            key.toLowerCase().includes("growth") ||
            key.toLowerCase().includes("retention") ||
            key.toLowerCase().includes("share") ||
            key.toLowerCase().includes("margin")
          ) {
            formattedValue = `${numValue}%`;
          } else {
            formattedValue = numValue.toLocaleString();
          }

          metrics.push({
            label,
            value: formattedValue,
          });
        }
      });
    }
  }

  // Fallback to investment data if no structured financials
  if (
    metrics.length === 0 &&
    investment?.company_metrics_and_financial_information
  ) {
    const companyMetrics = investment.company_metrics_and_financial_information;

    // Annual Revenue (priority 1)
    if (companyMetrics.annual_revenue) {
      const revenue =
        typeof companyMetrics.annual_revenue === "number"
          ? companyMetrics.annual_revenue
          : parseFloat(
              String(companyMetrics.annual_revenue).replace(/,/g, "")
            ) || 0;
      metrics.push({
        label: "Annual Revenue",
        value: `$${(revenue / 1000000).toFixed(1)}M`,
      });
    }

    // Monthly Recurring Revenue (priority 2)
    if (companyMetrics.monthly_recurring_revenue) {
      const mrr =
        typeof companyMetrics.monthly_recurring_revenue === "number"
          ? companyMetrics.monthly_recurring_revenue
          : parseFloat(
              String(companyMetrics.monthly_recurring_revenue).replace(/,/g, "")
            ) || 0;
      metrics.push({
        label: "Monthly Recurring Revenue",
        value: `$${mrr.toLocaleString()}`,
      });
    }

    // Monthly Revenue (fallback if annual_revenue not available)
    if (!companyMetrics.annual_revenue && companyMetrics.monthly_revenue) {
      const revenue =
        typeof companyMetrics.monthly_revenue === "number"
          ? companyMetrics.monthly_revenue
          : parseFloat(
              String(companyMetrics.monthly_revenue).replace(/,/g, "")
            ) || 0;
      metrics.push({
        label: "Monthly Revenue",
        value: `$${revenue.toLocaleString()}`,
      });
    }

    // Monthly Growth Rate
    if (companyMetrics.monthly_growth_rate) {
      const growth =
        typeof companyMetrics.monthly_growth_rate === "number"
          ? companyMetrics.monthly_growth_rate
          : parseFloat(String(companyMetrics.monthly_growth_rate)) || 0;
      metrics.push({
        label: "Monthly Growth",
        value: `${growth}%`,
      });
    }

    // Gross Margin
    if (
      companyMetrics.gross_margin !== undefined &&
      companyMetrics.gross_margin !== null
    ) {
      const margin =
        typeof companyMetrics.gross_margin === "number"
          ? companyMetrics.gross_margin
          : parseFloat(String(companyMetrics.gross_margin)) || 0;
      metrics.push({
        label: "Gross Margin",
        value: `${margin.toFixed(1)}%`,
      });
    }

    // Number of Customers
    if (companyMetrics.number_of_customers) {
      const customers =
        typeof companyMetrics.number_of_customers === "number"
          ? companyMetrics.number_of_customers
          : parseInt(
              String(companyMetrics.number_of_customers).replace(/,/g, "")
            ) || 0;
      metrics.push({
        label: "Active Merchants",
        value: `${customers.toLocaleString()}+`,
      });
    }

    // Lifetime Value
    if (companyMetrics.lifetime_value) {
      const ltv =
        typeof companyMetrics.lifetime_value === "number"
          ? companyMetrics.lifetime_value
          : parseFloat(String(companyMetrics.lifetime_value)) || 0;
      metrics.push({
        label: "Customer Lifetime Value",
        value: `$${ltv.toLocaleString()}`,
      });
    }

    // Customer Acquisition Cost
    if (companyMetrics.customer_acquisition_cost) {
      const cac =
        typeof companyMetrics.customer_acquisition_cost === "number"
          ? companyMetrics.customer_acquisition_cost
          : parseFloat(String(companyMetrics.customer_acquisition_cost)) || 0;
      metrics.push({
        label: "Customer Acquisition Cost",
        value: `$${cac.toLocaleString()}`,
      });
    }

    // Transaction Volume (if available)
    if (companyMetrics.transaction_volume) {
      const volume =
        typeof companyMetrics.transaction_volume === "number"
          ? companyMetrics.transaction_volume
          : parseFloat(
              String(companyMetrics.transaction_volume).replace(/,/g, "")
            ) || 0;
      metrics.push({
        label: "Transaction Volume",
        value: `$${(volume / 1000000).toFixed(1)}M/month`,
      });
    }

    // Customer Retention (if available)
    if (
      companyMetrics.customer_retention ||
      companyMetrics.customer_retention_percentage
    ) {
      const retention =
        typeof (
          companyMetrics.customer_retention ||
          companyMetrics.customer_retention_percentage
        ) === "number"
          ? companyMetrics.customer_retention ||
            companyMetrics.customer_retention_percentage
          : parseFloat(
              String(
                companyMetrics.customer_retention ||
                  companyMetrics.customer_retention_percentage
              )
            ) || 0;
      metrics.push({
        label: "Customer Retention",
        value: `${retention}%`,
      });
    }

    // Market Share (if available)
    if (companyMetrics.market_share || companyMetrics.market_share_percentage) {
      const share =
        typeof (
          companyMetrics.market_share || companyMetrics.market_share_percentage
        ) === "number"
          ? companyMetrics.market_share ||
            companyMetrics.market_share_percentage
          : parseFloat(
              String(
                companyMetrics.market_share ||
                  companyMetrics.market_share_percentage
              )
            ) || 0;
      metrics.push({
        label: "Market Share",
        value: `${share}%`,
      });
    }
  }

  return metrics;
};
