import {
    Box,
    Grid,
    LinearProgress,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import React from 'react';
import { Investment } from '../../types/landing-page';
import { BusinessListingDetailsResponse } from '../../types/queries-type';
import { formatExpectedROI } from '../../utils/opportunityTransformer';
import { CustomButton } from '../General/ui/custom-button';

interface InvestmentProgressCardProps {
    investment: Investment;
    listingDetailsData?: BusinessListingDetailsResponse;
    buttonLabel?: string;
    buttonSx?: any;
    onButtonClick?: () => void;
}

export const InvestmentProgressCard: React.FC<InvestmentProgressCardProps> = ({ investment, listingDetailsData, buttonLabel, buttonSx, onButtonClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const investmentDetailsSection = listingDetailsData?.investment_details as Record<string, any> | undefined;
    const overviewSection = listingDetailsData?.overview;
    const overviewRecord = overviewSection as Record<string, any> | undefined;


    const rawListingData = investment as any;
    const fallbackFundingStructure = rawListingData?.funding_structure || {};
    const fallbackInvestmentPreference = rawListingData?.investment_preference || {};
    const fallbackUseOfFunds = rawListingData?.use_of_funds || {};

    const hasField = (source: Record<string, any> | undefined, key: string) =>
        Boolean(source && Object.prototype.hasOwnProperty.call(source, key));

    const hasStructuredField = (key: string) =>
        hasField(investmentDetailsSection, key) || hasField(overviewRecord, key);

    const getStructuredFieldValue = (key: string) => {
        if (hasField(investmentDetailsSection, key)) {
            return investmentDetailsSection?.[key];
        }
        if (hasField(overviewRecord, key)) {
            return overviewRecord?.[key];
        }
        return undefined;
    };


    const parseNumber = (value: any): number | undefined => {
        if (typeof value === 'number') return value;
        if (!value) return undefined;
        const cleaned = String(value).replace(/,/g, '').replace(/[^0-9.-]/g, '');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? undefined : parsed;
    };


    const isValidValue = (value: any): boolean => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'number' && value === 0) return false;
        if (typeof value === 'string' && (value.trim() === '' || value === '0' || value === '0.0')) return false;
        return true;
    };

    // Get target amount
    const structuredTargetAmount = investmentDetailsSection?.target_amount ?? overviewSection?.target_amount;
    const targetAmount = isValidValue(structuredTargetAmount)
        ? structuredTargetAmount
        : parseNumber(fallbackFundingStructure.funding_amount_seeking) ??
        investment.targetAmount ??
        0;

    // Get funding progress 
    const fundingProgress =
        (investmentDetailsSection?.funding_progress !== undefined && investmentDetailsSection?.funding_progress !== null)
            ? investmentDetailsSection.funding_progress
            : (overviewSection?.funding_progress !== undefined && overviewSection?.funding_progress !== null)
                ? overviewSection.funding_progress
                : investment.fundingProgress ?? 0;

    // Get amount raised 
    const structuredAmountRaised = investmentDetailsSection?.amount_raised ?? overviewSection?.amount_raised;
    const amountRaised = isValidValue(structuredAmountRaised)
        ? structuredAmountRaised
        : parseNumber(fallbackFundingStructure.amount_raised) ??
        (targetAmount * fundingProgress) / 100;

    // Handle expected ROI 
    const expectedROI = (() => {
        // Priority 1: Use structured endpoint's lower_expected_roi and upper_expected_roi
        const hasLower = hasStructuredField('lower_expected_roi');
        const hasUpper = hasStructuredField('upper_expected_roi');

        if (hasLower || hasUpper) {
            const lower = hasLower ? getStructuredFieldValue('lower_expected_roi') : undefined;
            const upper = hasUpper ? getStructuredFieldValue('upper_expected_roi') : undefined;

            // Normalize to numbers 
            const lowerNum = lower !== null && lower !== undefined ? Number(lower) : undefined;
            const upperNum = upper !== null && upper !== undefined ? Number(upper) : undefined;

            // Only use if both are valid numbers
            if (lowerNum !== undefined && !Number.isNaN(lowerNum) && upperNum !== undefined && !Number.isNaN(upperNum)) {
                return lowerNum === upperNum ? `${Math.round(lowerNum)}%` : `${Math.round(lowerNum)}% - ${Math.round(upperNum)}%`;
            }
            if (lowerNum !== undefined && !Number.isNaN(lowerNum)) {
                return `${Math.round(lowerNum)}%`;
            }
            if (upperNum !== undefined && !Number.isNaN(upperNum)) {
                return `${Math.round(upperNum)}%`;
            }
        }

        // Priority 2: Use structured endpoint's expected_roi string (if available and not empty)
        const structuredExpectedRoi = investmentDetailsSection?.expected_roi || (overviewSection as any)?.expected_roi;
        if (structuredExpectedRoi && typeof structuredExpectedRoi === 'string' && structuredExpectedRoi.trim() && structuredExpectedRoi.trim() !== 'null') {
            // Format the ROI string (handles ranges like "14.0-23.0")
            const formatted = formatExpectedROI(structuredExpectedRoi.trim());
            if (formatted) return formatted;
        }

        // Priority 3: Fallback to investment.expectedROI
        if (investment?.expectedROI) {
            const formatted = formatExpectedROI(investment.expectedROI);
            if (formatted) return formatted;
        }

        // Return "0%" if endpoint doesn't have data
        return '0%';
    })();

    // Get min investment - use ONLY endpoint data (structured endpoint first, then raw listing)
    const structuredMinInvestment = hasStructuredField('min_investment')
        ? getStructuredFieldValue('min_investment')
        : undefined;

    // Use structured endpoint value if valid, otherwise use raw listing data
    let rawMinInvestment: number | undefined;
    if (isValidValue(structuredMinInvestment)) {
        rawMinInvestment = typeof structuredMinInvestment === 'number'
            ? structuredMinInvestment
            : parseNumber(structuredMinInvestment);
    } else {
        // Fallback to raw listing data (from full listing endpoint)
        rawMinInvestment = parseNumber(fallbackInvestmentPreference.minimum_investment)
            ?? parseNumber(fallbackFundingStructure.minimum_investment);
    }

    const normalizedMinInvestment = rawMinInvestment !== undefined && !Number.isNaN(rawMinInvestment)
        ? rawMinInvestment
        : undefined;

    // Get investors count 
    const structuredInvestorsCount = hasStructuredField('investors_count')
        ? getStructuredFieldValue('investors_count')
        : undefined;

    // Use structured endpoint value if valid (> 0), otherwise use raw listing data
    let rawInvestorsCount: number | undefined;
    if (isValidValue(structuredInvestorsCount)) {
        rawInvestorsCount = typeof structuredInvestorsCount === 'number'
            ? structuredInvestorsCount
            : parseNumber(structuredInvestorsCount);
    } else {

        rawInvestorsCount = parseNumber(fallbackInvestmentPreference.maximum_number_of_investors);
    }

    const normalizedInvestorsCount = rawInvestorsCount !== undefined && !Number.isNaN(rawInvestorsCount) && rawInvestorsCount > 0
        ? rawInvestorsCount
        : undefined;
    // Get closing days 
    // Priority 1: Use closing_in_days from structured endpoint (treat 0 as valid - means closing today)
    const structuredClosingDays = investmentDetailsSection?.closing_in_days ?? overviewSection?.closing_in_days;
    let closingDays: number | undefined = undefined;

    // Accept 0 as valid (closing today), but null/undefined means not provided
    if (structuredClosingDays !== null && structuredClosingDays !== undefined) {
        const numDays = Number(structuredClosingDays);
        if (!Number.isNaN(numDays) && numDays >= 0) {
            closingDays = numDays;
        }
    }

    // Priority 2: Calculate from expected_funding_completion in raw listing data
    if (closingDays === undefined || closingDays === null) {
        const expectedCloseDate =
            investmentDetailsSection?.expected_close_date ||
            overviewSection?.expected_close_date ||
            fallbackInvestmentPreference.expected_close_date ||
            fallbackUseOfFunds.expected_funding_completion;

        if (expectedCloseDate) {
            const closeDate = new Date(expectedCloseDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            closeDate.setHours(0, 0, 0, 0);

            if (!isNaN(closeDate.getTime())) {
                const diffTime = closeDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                // If date is in the past, show 0. Otherwise show the actual days
                closingDays = diffDays > 0 ? diffDays : 0;
            }
        }
    }

    const closingDisplay = (() => {
        if (typeof closingDays === 'number' && !Number.isNaN(closingDays)) {
            return `${closingDays} day${closingDays === 1 ? '' : 's'}`;
        }

        const expectedCloseDateValue =
            investmentDetailsSection?.expected_close_date ||
            overviewSection?.expected_close_date ||
            (listingDetailsData as any)?.overview?.expected_close_date ||
            investment.expectedCloseDate ||
            fallbackInvestmentPreference.expected_close_date;

        if (expectedCloseDateValue) {
            const parsedDate = new Date(expectedCloseDateValue);
            if (!Number.isNaN(parsedDate.getTime())) {
                return format(parsedDate, 'MMM d, yyyy');
            }
        }

        return 'Not provided';
    })();

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: { xs: '12px', md: '16px' },
                border: '1px solid #e0e0e0',
                height: 'fit-content',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: '#043A66',
                    boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
                    transform: 'translateY(-4px)'
                }
            }}
        >
            <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    color: '#043A66'
                }}
            >
                Investment Details
            </Typography>

            {/* Funding Progress */}
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Funding progress
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, color: '#043A66' }}
                    >
                        {fundingProgress}%
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={fundingProgress}
                    sx={{
                        height: { xs: 6, md: 8 },
                        borderRadius: { xs: 3, md: 4 },
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#043A66',
                            borderRadius: { xs: 3, md: 4 },
                        },
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Raised: ${amountRaised.toLocaleString()}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Target: ${targetAmount.toLocaleString()}
                    </Typography>
                </Box>
            </Box>

            {/* Investment Metrics Grid */}
            <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mb: { xs: 2, md: 3 } }}>
                <Grid size={{ xs: 6 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Expected ROI
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}
                    >
                        {expectedROI}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Investment Term
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}
                    >
                        {(() => {
                            // Priority 1: Use structured endpoint's investment_term
                            if (hasStructuredField('investment_term')) {
                                const term = getStructuredFieldValue('investment_term');
                                if (term && term !== 'null' && String(term).trim()) {
                                    return String(term).trim();
                                }
                            }

                            // Priority 2: Use raw listing's funding_round_duration
                            const fundingRoundDuration = fallbackInvestmentPreference.funding_round_duration;
                            if (fundingRoundDuration && String(fundingRoundDuration).trim() && String(fundingRoundDuration).trim() !== '0') {
                                return `${fundingRoundDuration} months`;
                            }

                            // No data available
                            return 'Not provided';
                        })()}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Min Investment
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}
                    >
                        {normalizedMinInvestment ? `$${normalizedMinInvestment.toLocaleString()}` : 'Not provided'}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        Investors
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}
                    >
                        {normalizedInvestorsCount !== undefined && !Number.isNaN(normalizedInvestorsCount) ? normalizedInvestorsCount : 'Not provided'}
                    </Typography>
                </Grid>
            </Grid>

            {/* Closing Info */}
            <Box
                sx={{
                    backgroundColor: '#f5f5f5',
                    p: { xs: 1.5, md: 2 },
                    borderRadius: { xs: '8px', md: '12px' },
                    textAlign: 'left',
                    mb: { xs: 2, md: 3 }
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                >
                    Closing in
                </Typography>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#043A66' }}
                >
                    {closingDisplay}
                </Typography>
            </Box>

            {/* Invest Button */}
            {onButtonClick && (
                <CustomButton
                    variant="primary"
                    fullWidth
                    onClick={onButtonClick}
                    sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        padding: { xs: '8px 16px', md: '12px 24px' },
                        ...buttonSx
                    }}
                >
                    {buttonLabel || 'Invest'}
                </CustomButton>
            )}
        </Paper>
    );
};
