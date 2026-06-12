/**
 * Format a number with comma separators (e.g., 10000 -> "10,000")
 */
export const formatNumberWithCommas = (value: string | number): string => {
    if (!value) return '';
    const numStr = value.toString().replace(/,/g, '');
    if (isNaN(Number(numStr))) return value.toString();
    return Number(numStr).toLocaleString('en-US');
};

/**
 * Remove formatting from a number string (e.g., "10,000" -> "10000")
 */
export const removeNumberFormatting = (value: string): string => {
    if (!value) return '';
    return value.toString().replace(/,/g, '');
};

/**
 * Check if a field should have number formatting
 */
export const shouldFormatNumber = (fieldName: string): boolean => {
    const formattedFields = [
        'funding_amount_seeking',
        'current_valuation',
        'monthly_revenue',
        'minimum_investment',
        'maximum_investment',
    ];
    return formattedFields.includes(fieldName);
};
