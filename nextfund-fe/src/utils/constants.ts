/**
 * Shared constants used across the app
 */
export const BUSINESS_INFO_FIELDS = [
  'company_name', 'industry_sector', 'year_founded', 'headquarters',
  'country_location', 'company_size', 'current_stage', 'description',
  'market_opportunity_description', 'competitive_advantage_description',
  'website_url', 'linked_in_profile', 'phone_number',
] as const;

export type BusinessInfoField = (typeof BUSINESS_INFO_FIELDS)[number];
