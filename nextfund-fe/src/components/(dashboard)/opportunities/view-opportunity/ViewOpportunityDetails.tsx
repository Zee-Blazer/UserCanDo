import { Search } from '@mui/icons-material';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingAnimation from '../../../../app/loading-lottie';
import { getCountryByCode } from '../../../../constants/countries';
import { getTabs } from '../../../../constants/landing-page-data';
import { useInvestorInvestments } from '../../../../hooks/useInvestorInvestments';
import { useGetBusinessListingDetailsQuery, useGetInvestmentTimelineQuery, useGetListingInterestStatusQuery } from '../../../../queries/businessApi';
import { RootState } from '../../../../Redux/store';
import { Investment } from '../../../../types/landing-page';
import { calculateTimelineFromListingData, getCategoryIcon, transformFinancialsToKeyMetrics, transformInvestmentTimelineToEvents, transformStructuredListingDetailsToInvestment } from '../../../../utils/opportunityTransformer';
import { CustomButton } from '../../../General/ui/custom-button';
import { CompanyInformationCard } from '../../../investmet-detail/company-information-card';
import { ContactInformationCard } from '../../../investmet-detail/contact-information-card';
import DocumentTabContent from '../../../investmet-detail/document-tab-content';
import FinanceTabContent from '../../../investmet-detail/finance-tab-content';
import { InvestmentProgressCard } from '../../../investmet-detail/investment-progress-card';
import { KeyMetricsSection } from '../../../investmet-detail/key-metrics';
import { NavigationTabs } from '../../../investmet-detail/nav-tab';
import TeamTabContent from '../../../investmet-detail/team-tab-content';
import { InvestmentTimeline } from '../../../investmet-detail/timeline';
import ExpressInterestModal from './express-intrest';
import InterestConfirmationModal from './interest-confirmation-modal';

// FIX: API doesn't support query parameters - endpoint returns all sections by default
const BUSINESS_LISTING_SECTIONS = undefined;


interface ViewOpportunityDetailsProps {
    opportunityId: string;
}

export const ViewOpportunityDetails: React.FC<ViewOpportunityDetailsProps> = ({ opportunityId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeTab, setActiveTab] = useState('overview');
    const router = useRouter();
    const [interestModalOpen, setInterestModalOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const searchParams = useSearchParams();
    const source = searchParams?.get('source');
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = authState.isLoggedIn;
    const userType = authState.loginData?.user_type;


    if (!opportunityId || opportunityId === 'undefined' || opportunityId === undefined) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center',
                    minHeight: '50vh',
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#E8F5E8',
                        mb: 3,
                    }}
                >
                    <Search
                        sx={{
                            fontSize: '2rem',
                            color: '#33CC33'
                        }}
                    />
                </Box>

                {/* Main Heading */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1F2937',
                        mb: 2,
                        fontWeight: 600,
                        fontSize: '1.25rem',
                    }}
                >
                    No investment opportunities available right now.
                </Typography>

                {/* Descriptive Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6B7280',
                        maxWidth: '400px',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        mb: 3,
                    }}
                >
                    We're currently reviewing new businesses. Check back soon to explore verified opportunities.
                </Typography>

                {/* Back Button */}
                <CustomButton
                    variant="primary"
                    onClick={() => router.back()}
                    sx={{
                        minWidth: '120px',
                    }}
                >
                    Go Back
                </CustomButton>
            </Box>
        );
    }



    const {
        investorInvestmentsData,
        refreshData: refreshInvestorInvestments,
    } = useInvestorInvestments(undefined, { initialPageSize: 100 });


    const actualListingId = useMemo(() => {

        if (investorInvestmentsData?.payload) {
            const investment = investorInvestmentsData.payload.find((inv: any) => inv.id === opportunityId);
            if (investment?.business_listing_id) {
                return investment.business_listing_id;
            }
        }

        return opportunityId;
    }, [opportunityId, investorInvestmentsData]);

    const shouldFetchInterestStatus =
        Boolean(actualListingId) && isAuthenticated && userType === 'investor';

    const {
        data: listingInterestStatus,
        refetch: refetchListingInterestStatus,
    } = useGetListingInterestStatusQuery(
        shouldFetchInterestStatus ? actualListingId : skipToken,
        {
            refetchOnMountOrArgChange: true,
        }
    );


    const {
        data: listingDetailsData,
        isLoading: isLoadingListingDetails
    } = useGetBusinessListingDetailsQuery(
        { listing_id: actualListingId },
        { skip: !actualListingId }
    );


    const actualListingDetails = (listingDetailsData as any)?.payload || listingDetailsData;
    const hasValidListingDetails = actualListingDetails?.overview !== undefined;

    // Get interest status for this listing
    // Find if user has an investment for this listing (for timeline)
    const userInvestment = useMemo(() => {
        if (!investorInvestmentsData?.payload) {
            return null;
        }
        const found = investorInvestmentsData.payload.find((inv: any) =>
            inv.business_listing_id === actualListingId || (inv as any).listing_id === actualListingId
        ) || null;
        return found;
    }, [investorInvestmentsData, actualListingId]);

    const investmentStatus = useMemo(() => {
        if (!userInvestment?.status) return null;
        return String(userInvestment.status).toLowerCase();
    }, [userInvestment?.status]);

    const isInvestmentDeclined = useMemo(() => {
        if (!investmentStatus) return false;
        return ['rejected', 'declined', 'disapproved', 'cancelled', 'failed'].includes(investmentStatus);
    }, [investmentStatus]);

    const hasSignedNda = Boolean(listingInterestStatus?.nda_signed);
    const hasExpressedInterest = Boolean(listingInterestStatus?.has_interest);

    const investmentTimelineId = useMemo(() => {
        if (!userInvestment) return null;
        return userInvestment.investment_interest || userInvestment.id || null;
    }, [userInvestment]);

    const isApprovedInvestment = useMemo(() => {
        if (!investmentStatus) return false;
        return ['approved', 'completed'].includes(investmentStatus);
    }, [investmentStatus]);

    const hasActiveInvestment = useMemo(
        () => Boolean(userInvestment) && !isInvestmentDeclined,
        [userInvestment, isInvestmentDeclined]
    );

    const shouldFetchTimeline = useMemo(
        () => !!investmentTimelineId && isApprovedInvestment,
        [investmentTimelineId, isApprovedInvestment]
    );

    const hasActiveInterest = useMemo(
        () => !isInvestmentDeclined && (hasExpressedInterest || hasSignedNda),
        [isInvestmentDeclined, hasExpressedInterest, hasSignedNda]
    );

    const hasInterestOrInvestment = useMemo(
        () => hasActiveInvestment || hasActiveInterest,
        [hasActiveInvestment, hasActiveInterest]
    );

    const canViewContactDetails = useMemo(
        () => hasActiveInvestment || hasActiveInterest,
        [hasActiveInvestment, hasActiveInterest]
    );

    const opportunity: Investment | undefined = useMemo(() => {
        const actualDetailsForTransform = (listingDetailsData as any)?.payload || listingDetailsData;

        if (actualDetailsForTransform?.overview) {
            const transformed = transformStructuredListingDetailsToInvestment(actualDetailsForTransform, {
                listingId: actualListingId,
                fallbackListing: undefined,
                canViewContactDetails,
            });
            if (transformed) {
                return transformed;
            }
        }

        // No fallback - return undefined if no data from API
        return undefined;
    }, [listingDetailsData, opportunityId, actualListingId, canViewContactDetails]);

    // Get investment timeline if user has invested in this listing (moved after opportunity definition)
    const {
        data: timelineData,
        isLoading: isLoadingTimeline,
        error: timelineError
    } = useGetInvestmentTimelineQuery(
        { investment_id: investmentTimelineId! },
        { skip: !shouldFetchTimeline }
    );

    // Transform timeline data to events format (moved after opportunity definition)
    const timelineEvents = useMemo(() => {
        try {
            // Priority 1: Use API timeline endpoint if user has invested
            if (timelineData && userInvestment) {
                const transformed = transformInvestmentTimelineToEvents(timelineData);
                return transformed;
            }

            // Priority 2: Calculate timeline from listing data (closing_in_days, use_of_funds)
            if (actualListingDetails || opportunity) {
                const calculatedTimeline = calculateTimelineFromListingData(actualListingDetails, opportunity);
                if (calculatedTimeline && calculatedTimeline.length > 0) {
                    return calculatedTimeline;
                }
            }

            return [];
        } catch (error) {
            console.error('Error calculating timeline:', error);
            return [];
        }
    }, [timelineData, userInvestment, actualListingDetails, opportunity]);

    // Use unwrapped listing details for key metrics transformation
    const actualListingDetailsForMetrics = (listingDetailsData as any)?.payload || listingDetailsData;

    // Transform financial data to key metrics format
    const keyMetrics = useMemo(() => {
        try {
            return transformFinancialsToKeyMetrics(actualListingDetailsForMetrics, opportunity) || [];
        } catch (error) {
            console.error('Error transforming key metrics:', error);
            return [];
        }
    }, [listingDetailsData, opportunity, actualListingDetailsForMetrics]);

    // Determine if this page was opened from an invested context (View details)
    const isFromInvestments = useMemo(() => source === 'investments', [source]);
    const showInvestedBadge = useMemo(
        () => isFromInvestments || hasInterestOrInvestment,
        [isFromInvestments, hasInterestOrInvestment]
    );


    // Show loading state while data is being fetched
    if (isLoadingListingDetails && !opportunity) {
        return <LoadingAnimation isVisible={true} />;
    }

    // Show empty state if we couldn't find the listing
    const is404ErrorCheck = false;
    if ((is404ErrorCheck || !actualListingDetails?.overview) && !opportunity && !isLoadingListingDetails) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center',
                    minHeight: '50vh',
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#E8F5E8',
                        mb: 3,
                    }}
                >
                    <Search
                        sx={{
                            fontSize: '2rem',
                            color: '#33CC33'
                        }}
                    />
                </Box>

                {/* Main Heading */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1F2937',
                        mb: 2,
                        fontWeight: 600,
                        fontSize: '1.25rem',
                    }}
                >
                    No investment opportunities available right now.
                </Typography>

                {/* Descriptive Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6B7280',
                        maxWidth: '400px',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        mb: 3,
                    }}
                >
                    We're currently reviewing new businesses. Check back soon to explore verified opportunities.
                </Typography>

                {/* Back Button */}
                <CustomButton
                    variant="primary"
                    onClick={() => router.back()}
                    sx={{
                        minWidth: '120px',
                    }}
                >
                    Go Back
                </CustomButton>
            </Box>
        );
    }

    if (!opportunity) {
        return null;
    }



    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: { xs: 0.5, sm: 1, md: 2 } }}>
            {/* Back Icon at the top */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => router.back()}>
                    <Image src="/back.png" alt="Back" width={22} height={22} />
                </Box>
            </Box>
            {/* Header Section - single flex row */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: { xs: 1, md: 2 },
                    mb: { xs: 1, md: 2 },
                    px: { xs: 0, md: 0 },
                }}
            >
                {/* Left: Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{
                            color: '#181818',
                            fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {opportunity.title}
                    </Typography>
                </Box>
                {/* Middle: Badges */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        flex: '0 1 auto',
                        mt: { xs: 0.5, md: 0 },
                        mb: { xs: 0.5, md: 0 },
                        mr: { lg: 7 },
                    }}
                >
                    {/* Category */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src={getCategoryIcon(opportunity.category)} alt={opportunity.category} width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>{opportunity.category}</Typography>
                    </Box>
                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src="/location.png" alt="Location" width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>
                            {(() => {
                                // Helper to check if a value is a valid location (not invalid placeholder text)
                                const isValidLocation = (value: string | undefined | null): boolean => {
                                    if (!value) return false;
                                    const trimmed = value.trim().toLowerCase();
                                    const invalidValues = ['none', 'null', 'n/a', 'na', 'growth', 'funding', 'lorem ipsum', 'unknown', 'not provided', 'not specified'];
                                    return !invalidValues.includes(trimmed) && trimmed.length > 0;
                                };

                                // Helper to convert country code to country name
                                const formatCountryName = (loc: string | undefined): string => {
                                    if (!loc) return 'Unknown Location';
                                    const trimmed = String(loc).trim();
                                    if (!trimmed) return 'Unknown Location';
                                    // Check if it's a country code (2-3 letters, case-insensitive)
                                    const upperTrimmed = trimmed.toUpperCase();
                                    if (/^[A-Z]{2,3}$/.test(upperTrimmed)) {
                                        const country = getCountryByCode(upperTrimmed);
                                        return country?.name || trimmed;
                                    }
                                    return trimmed;
                                };

                                const location = opportunity.location || opportunity.headquarters;
                                if (!location) return 'Unknown Location';
                                const formatted = formatCountryName(location);
                                return isValidLocation(formatted) ? formatted : 'Unknown Location';
                            })()}
                        </Typography>
                    </Box>
                    {/* Founded */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src="/calendar.png" alt="Founded" width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>Founded {opportunity.founded}</Typography>
                    </Box>
                </Box>
                {/* Right: Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 1.5,
                        width: { xs: '100%', md: 'auto' },
                        alignItems: { xs: 'stretch', md: 'center' },
                    }}
                >
                    {showInvestedBadge ? (
                        // Show static "Invested" badge when user has invested
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: { xs: 2, md: 4 },
                                py: { xs: 1.5, md: 1.5 },
                                borderRadius: '8px',
                                background: '#E8F5E8',
                                border: '1px solid #33CC33',
                                color: '#33CC33',
                            }}
                        >
                            <Image src="/circle-tick-green.png" alt="Invested" width={16} height={16} />
                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>Invested</span>
                        </Box>
                    ) : (
                        // Show Express Interest button when user hasn't invested
                        <CustomButton
                            variant="primary"
                            sx={{
                                width: { xs: '100%', md: 'auto' },
                                fontSize: { xs: '0.95rem', md: '1rem' },
                                px: { xs: 2, md: 4 },
                                py: { xs: 1.5, md: 1.5 },
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                            onClick={() => setInterestModalOpen(true)}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Image src="/circle-tick.png" alt="Express Interest" width={16} height={16} />
                                <span>Express Interest</span>
                            </Box>
                        </CustomButton>
                    )}
                    <CustomButton
                        variant="outline"
                        sx={{
                            width: { xs: '100%', md: 'auto' },
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            px: { xs: 2, md: 4 },
                            py: { xs: 1.5, md: 1.5 },
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: '#F5F5F5',
                            color: '#181818',
                            border: 'none',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Image src="/download-light.png" alt="Download" width={16} height={16} />
                            <span>Download Documents</span>
                        </Box>
                    </CustomButton>
                </Box>
            </Box>

            {/* Navigation Tabs */}
            <NavigationTabs tabs={getTabs()} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Grid */}
            <Grid container spacing={{ xs: 3, md: 4 }}>
                {/* Left Column - Main Content */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {activeTab === 'team' ? (
                        <TeamTabContent investment={opportunity} listingDetailsData={actualListingDetails} />
                    ) : activeTab === 'financials' ? (
                        <FinanceTabContent investment={opportunity} listingDetailsData={actualListingDetails} />
                    ) : activeTab === 'documents' ? (
                        <DocumentTabContent
                            investment={opportunity}
                            listingDetailsData={actualListingDetails}
                            onRequestAccess={() => setInterestModalOpen(true)}
                            hasExpressedInterest={hasInterestOrInvestment}
                        />
                    ) : (
                        // Default: show the existing overview content for 'overview'
                        <>
                            {/* Business Overview */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography variant="h5" fontWeight={600} sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#043A66' }}>Business Overview</Typography>
                                <Typography variant="body2" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}>{`Detailed information about ${opportunity?.title || 'this opportunity'}`}</Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}>{actualListingDetails?.overview?.description || opportunity?.businessOverview || opportunity?.description || 'No description available.'}</Typography>
                            </Box>
                            {/* Key Metrics */}
                            <KeyMetricsSection metrics={keyMetrics} />
                            {/* Market Opportunity */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#043A66' }}
                                >
                                    Market Opportunity
                                </Typography>
                                {(() => {
                                    // Check all possible sources for market opportunity
                                    if (!actualListingDetails && !opportunity) {
                                        return (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    lineHeight: 1.7,
                                                    mb: { xs: 2, md: 3 },
                                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                                    color: '#6A6A6A'
                                                }}
                                            >
                                                Market opportunity details will be shared soon.
                                            </Typography>
                                        );
                                    }

                                    const marketOpportunity =
                                        actualListingDetails?.overview?.market_opportunity ||
                                        opportunity?.marketOpportunity ||
                                        (opportunity as any)?.market_opportunity ||
                                        (opportunity as any)?.market_opportunity_description;

                                    return marketOpportunity ? (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                lineHeight: 1.7,
                                                mb: { xs: 2, md: 3 },
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                                color: '#043A66'
                                            }}
                                        >
                                            {marketOpportunity}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                lineHeight: 1.7,
                                                mb: { xs: 2, md: 3 },
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                                color: '#6A6A6A'
                                            }}
                                        >
                                            Market opportunity details will be shared soon.
                                        </Typography>
                                    );
                                })()}

                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    Competitive Advantage
                                </Typography>
                                {(() => {
                                    // Check all possible sources for competitive advantage
                                    if (!actualListingDetails && !opportunity) {
                                        return (
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    lineHeight: 1.7,
                                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                                    color: '#6A6A6A'
                                                }}
                                            >
                                                Competitive advantage details are not available yet.
                                            </Typography>
                                        );
                                    }

                                    const competitiveAdvantage =
                                        actualListingDetails?.overview?.competitive_advantage ||
                                        opportunity?.competitiveAdvantage ||
                                        (opportunity as any)?.competitive_advantage ||
                                        (opportunity as any)?.competitive_advantage_description;

                                    return competitiveAdvantage ? (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                lineHeight: 1.7,
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                                color: '#043A66'
                                            }}
                                        >
                                            {competitiveAdvantage}
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                lineHeight: 1.7,
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                                color: '#6A6A6A'
                                            }}
                                        >
                                            Competitive advantage details are not available yet.
                                        </Typography>
                                    );
                                })()}
                            </Box>
                            {/* Investment Timeline */}
                            <InvestmentTimeline events={timelineEvents} />
                        </>
                    )}
                </Grid>
                {/* Right Column - Sidebar */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, mt: { xs: 1, md: 1 } }}>
                        <InvestmentProgressCard investment={opportunity} listingDetailsData={actualListingDetails} />
                        <CompanyInformationCard investment={opportunity} listingDetailsData={actualListingDetails} />
                        <ContactInformationCard
                            investment={opportunity}
                            listingDetailsData={actualListingDetails}
                            hasUserInvestment={canViewContactDetails}
                            onContactAction={
                                hasInterestOrInvestment
                                    ? undefined
                                    : () => setInterestModalOpen(true)
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
            <ExpressInterestModal
                open={interestModalOpen}
                onClose={() => setInterestModalOpen(false)}
                onSubmitSuccess={() => {
                    if (shouldFetchInterestStatus) {
                        refetchListingInterestStatus();
                    }
                    if (typeof refreshInvestorInvestments === 'function') {
                        refreshInvestorInvestments();
                    }
                    setConfirmationOpen(true);
                }}
                listingId={actualListingId}
            />
            <InterestConfirmationModal
                open={confirmationOpen}
                onClose={() => {
                    setConfirmationOpen(false);
                }}
                onContinue={() => {
                    if (actualListingId) {
                        router.push(`/dashboard/opportunities/${actualListingId}/invest`);
                    }
                }}
            />
        </Box>
    );
};

export default ViewOpportunityDetails; 