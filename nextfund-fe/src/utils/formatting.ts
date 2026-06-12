/**
 * Utility functions for formatting data in the business signup review application
 */

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Formats a number with proper thousands separators
 * @param value - The number or string to format
 * @returns The formatted number string
 */
export const formatNumberWithCommas = (value: string | number): string => {
  if (!value) return "0";

  // Convert to number if it's a string
  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) return "0";

  return numValue.toLocaleString("en-US");
};

/**
 * Formats currency with proper thousands separators and dollar sign
 * @param value - The number or string to format
 * @returns The formatted currency string
 */
export const formatCurrency = (value: string | number): string => {
  if (!value || value === "" || value === "0") return "$0";

  // Handle string values by removing any non-numeric characters except decimal point
  let cleanValue = value;
  if (typeof value === "string") {
    // Remove commas, spaces, dollar signs, and other non-numeric characters except decimal point
    cleanValue = value.replace(/[^0-9.]/g, "");
  }

  const numValue =
    typeof cleanValue === "string" ? parseFloat(cleanValue) : cleanValue;

  if (isNaN(numValue) || numValue <= 0) return "$0";

  return `$${numValue.toLocaleString("en-US")}`;
};

/**
 * Cleans a currency value for storage in Redux (removes formatting)
 * @param value - The formatted currency string
 * @returns Clean numeric string for storage
 */
export const cleanCurrencyForStorage = (value: string): string => {
  if (!value || value === "") return "";

  // Remove all non-numeric characters except decimal point
  const cleaned = value.replace(/[^0-9.]/g, "");

  // Return empty string if no valid number found
  if (!cleaned || cleaned === ".") return "";

  return cleaned;
};

/**
 * Capitalizes funding type strings (e.g., "equity" -> "Equity")
 * @param fundingTypes - Array of funding type strings
 * @returns Array of capitalized funding type strings
 */
export const capitalizeFundingTypes = (fundingTypes: string[]): string[] => {
  return fundingTypes.map((type) => {
    const lowerType = type.toLowerCase();
    switch (lowerType) {
      case "equity":
        return "Equity";
      case "debt":
        return "Debt";
      case "hybrid":
        return "Hybrid";
      default:
        return capitalizeWords(type);
    }
  });
};

/**
 * Formats funding types for display
 * @param fundingTypes - Array of funding type strings
 * @returns Formatted funding types string
 */
export const formatFundingTypes = (fundingTypes: string[]): string => {
  if (!fundingTypes || fundingTypes.length === 0) return "Series A";

  const capitalizedTypes = capitalizeFundingTypes(fundingTypes);
  return capitalizedTypes.join(", ");
};

/**
 * Formats an event name into a human-readable action description
 * @param eventName - The event name from the API
 * @returns Human-readable action description
 */
export const formatEventAction = (eventName: string): string => {
  const actionMap: Record<string, string> = {
    AllUsersRetrievedEvent: "Retrieved all registered users",
    BusinessListingActionEvent: "Acted on business listing",
    AdminFundingActionEvent: "Acted on funding request",
    EditTeamMemberEvent: "Edited team member details",
    DeleteTeamMemberEvent: "Deleted team member",
    InviteTeamMemberEvent: "Invited team member",
    RequestMissingDocsEvent: "Requested missing documents",
    UserActionEvent: "Acted on user",
    PlatformSettingsUpdated: "Updated platform settings",
  };

  return actionMap[eventName] || capitalizeWords(eventName.replace(/Event$/, "").replace(/([A-Z])/g, " $1").trim());
};

/**
 * Formats a date string into a localized date-time string
 * @param dateString - The ISO date string to format
 * @returns Formatted date-time string
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "N/A";
  }
};
