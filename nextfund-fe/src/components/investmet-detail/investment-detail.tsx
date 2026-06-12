import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { getCountryByCode } from '../../constants/countries';
import { getTabs } from '../../constants/landing-page-data';
import { useInvestorInvestments } from '../../hooks/useInvestorInvestments';
import { useGetBusinessListingDetailsQuery, useGetInvestmentTimelineQuery, useGetInvestorBusinessListingsQuery, useGetListingInterestStatusQuery } from '../../queries/businessApi';
import { calculateTimelineFromListingData, transformFinancialsToKeyMetrics, transformInvestmentTimelineToEvents, transformStructuredListingDetailsToInvestment } from '../../utils/opportunityTransformer';
import { CustomButton } from '../General/ui/custom-button';
import { CompanyInformationCard } from './company-information-card';
import { ContactInformationCard } from './contact-information-card';
import DocumentTabContent from './document-tab-content';
import { FinanceTabContent } from './finance-tab-content';
import { InvestmentProgressCard } from './investment-progress-card';
import { KeyMetricsSection } from './key-metrics';
import { NavigationTabs } from './nav-tab';
import TeamTabContent from './team-tab-content';
import { InvestmentTimeline } from './timeline';

// FIX: API doesn't support query parameters - endpoint returns all sections by default
// Setting to undefined to avoid 400 Bad Request error
const BUSINESS_LISTING_SECTIONS = undefined;

interface InvestmentDetailsComponentProps {
    investmentId: string;
    investment?: any;
}

export const InvestmentDetailsComponent: React.FC<InvestmentDetailsComponentProps> = ({ investmentId, investment: propInvestment }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const [activeTab, setActiveTab] = useState('overview');
    const router = useRouter();

    // Get authentication state
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = authState.isLoggedIn;
    const userType = authState.loginData?.user_type;

    // Get investment data to check if user has invested in this listing (for timeline)
    const {
        investorInvestmentsData,
    } = useInvestorInvestments(undefined, {
        initialPageSize: 100,
        enabled: isAuthenticated && userType === 'investor',
    });

    const shouldFetchInterestStatus =
        isAuthenticated && userType === 'investor' && Boolean(investmentId);

    const { data: listingInterestStatus } = useGetListingInterestStatusQuery(
        shouldFetchInterestStatus ? investmentId : skipToken,
        {
            refetchOnMountOrArgChange: true,
        }
    );

    // Find if user has an investment for this listing
    const userInvestment = useMemo(() => {
        if (!isAuthenticated || !investorInvestmentsData?.payload) {
            return null;
        }
        // Find investment that matches this listing_id
        const investment = investorInvestmentsData.payload.find((inv: any) =>
            inv.business_listing_id === investmentId || inv.listing_id === investmentId
        ) || null;
        return investment;
    }, [isAuthenticated, investorInvestmentsData, investmentId]);

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

    const shouldFetchTimeline = useMemo(() => {
        if (!investmentTimelineId || !investmentStatus) {
            return false;
        }
        return ['approved', 'completed'].includes(investmentStatus);
    }, [investmentTimelineId, investmentStatus]);

    const isApprovedInvestment = useMemo(() => {
        if (!investmentStatus) return false;
        return ['approved', 'completed'].includes(investmentStatus);
    }, [investmentStatus]);

    const hasActiveInvestment = useMemo(
        () => Boolean(userInvestment) && !isInvestmentDeclined,
        [userInvestment, isInvestmentDeclined]
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

    // Fetch listing details using the new structured endpoint
    // FIX: API returns all sections by default - don't send include parameter
    // The endpoint returns: overview, team_details, financials, documents, key_metrics, company_info, contact, investment_details, timeline
    const {
        data: listingDetailsData,
        isLoading: isLoadingListingDetails,
        error: listingDetailsError
    } = useGetBusinessListingDetailsQuery(
        {
            listing_id: investmentId
            // No include parameter - API returns all sections by default
        },
        { skip: !investmentId }
    );


    // Always fetch full listing data to get team_details (which is not in structured endpoint)
    // This is needed because team_details is in company_metrics_and_financial_information
    // The structured endpoint only returns "Unknown" team members, so we need the full listing
    // FIX: Always fetch, don't skip - we need this data for team_details
    const {
        data: fullListingData,
        isLoading: isLoadingFullListing,
        error: fullListingError,
    } = useGetInvestorBusinessListingsQuery(
        {
            page: 1,
            page_size: 100,
        },
        {
            skip: false, // FIX: Always fetch, don't skip based on investmentId
            refetchOnMountOrArgChange: true, // Enable refetch to ensure we get fresh data
        }
    );


    // Find the specific listing from fullListingData that matches investmentId
    // FIX: Improved search with better matching and normalization
    const fullListing = useMemo(() => {
        if (!fullListingData?.payload) {
            return null;
        }

        if (!investmentId) {
            return null;
        }

        // FIX: Normalize investmentId FIRST for consistent comparison
        // This ensures all comparisons use the same normalized format
        const normalizedInvestmentId = String(investmentId || '').trim().toLowerCase();

        // FIX: Enhanced search with consistent normalization throughout
        // All comparisons now use normalized strings to avoid mismatches
        let found = fullListingData.payload.find((listing: any) => {
            // Normalize all listing IDs for consistent comparison
            const listingId = String(listing.id || '').trim().toLowerCase();
            const listingIdAlt = String((listing as any).listing_id || '').trim().toLowerCase();
            const businessId = String(listing.business_id || '').trim().toLowerCase();

            // Strategy 1: Normalized string comparison (handles type, case, and whitespace mismatches)
            if (listingId === normalizedInvestmentId) return true;
            if (listingIdAlt === normalizedInvestmentId) return true;
            if (businessId === normalizedInvestmentId) return true;

            // Strategy 2: Exact match fallback (for edge cases where normalization might fail)
            if (String(listing.id).trim() === String(investmentId).trim()) return true;
            if (String((listing as any).listing_id).trim() === String(investmentId).trim()) return true;
            if (String(listing.business_id).trim() === String(investmentId).trim()) return true;

            return false;
        });


        return found || null;
    }, [fullListingData, investmentId]);

    // Determine the best raw listing data source for team_details
    // FIX: Improved logic with better dependency tracking and fallback handling
    const rawListingForTeam = useMemo(() => {
        // Helper to check if team_details is valid (array with length > 0)
        const hasValidTeamDetails = (listing: any) => {
            if (!listing) return false;
            const teamDetails = listing?.company_metrics_and_financial_information?.team_details;
            return Array.isArray(teamDetails) && teamDetails.length > 0;
        };

        // Priority 1: fullListing from business-listings endpoint (if it has valid team_details)
        // FIX: Prioritize fullListing first since it's the most reliable source
        if (fullListing && hasValidTeamDetails(fullListing)) {
            return fullListing;
        }

        // Priority 2: propInvestment (if it has valid team_details)
        if (propInvestment && hasValidTeamDetails(propInvestment)) {
            return propInvestment;
        }

        // Priority 3: Use fullListing if available (even without team_details, it might have other data)
        // This ensures we always try to use the most complete data source
        if (fullListing) {
            return fullListing;
        }

        // Priority 4: Use propInvestment as last resort
        if (propInvestment) {
            return propInvestment;
        }
        return undefined;
    }, [propInvestment, fullListing, fullListingData]); // FIX: Added fullListingData to dependencies

    // FIX: Handle timing issues - when fullListingData loads, ensure we re-compute rawListingForTeam
    // This useEffect ensures that when data loads asynchronously, we update the team data
    useEffect(() => {
        if (fullListingData?.payload && investmentId && !rawListingForTeam) {
            // Data loaded but listing wasn't found initially - try to find it again
            // FIX: Use same normalization as main search for consistency
            const normalizedInvestmentId = String(investmentId || '').trim().toLowerCase();
            const found = fullListingData.payload.find((listing: any) => {
                // Normalize all IDs for consistent comparison (same as main search)
                const listingId = String(listing.id || '').trim().toLowerCase();
                const listingIdAlt = String((listing as any).listing_id || '').trim().toLowerCase();
                const businessId = String(listing.business_id || '').trim().toLowerCase();

                // Use normalized comparison (same logic as main search)
                return listingId === normalizedInvestmentId ||
                    listingIdAlt === normalizedInvestmentId ||
                    businessId === normalizedInvestmentId;
            });

        }
    }, [fullListingData, investmentId, rawListingForTeam]);

    // Handle both wrapped {payload: {...}} and direct {...} response structures
    // The API returns { is_success: true, payload: {...}, message: "..." }
    // But the transformResponse already extracts payload, so listingDetailsData should be the payload directly
    const actualListingDetails = listingDetailsData || (listingDetailsData as any)?.payload;
    const hasValidListingDetails = actualListingDetails?.overview !== undefined;

    // Get investment timeline if user has invested in this listing
    const {
        data: timelineData,
        isLoading: isLoadingTimeline,
        error: timelineError
    } = useGetInvestmentTimelineQuery(
        { investment_id: investmentTimelineId! },
        { skip: !shouldFetchTimeline || !isAuthenticated }
    );

    // Transform API data to Investment format (moved before timelineEvents to avoid initialization error)
    // FIX: Pass rawListingForTeam as fallback to ensure raw listing data is available for fields not in structured endpoint
    const apiInvestment = useMemo(() => {
        const actualDetailsForTransform = (listingDetailsData as any)?.payload || listingDetailsData;

        if (actualDetailsForTransform?.overview) {
            const transformed = transformStructuredListingDetailsToInvestment(actualDetailsForTransform, {
                listingId: investmentId,
                fallbackListing: rawListingForTeam, // Pass raw listing data for fallback fields
                canViewContactDetails,
            });
            if (transformed) {
                // Merge raw listing data into transformed investment so InvestmentProgressCard can access it
                return {
                    ...transformed,
                    // Include raw listing fields for InvestmentProgressCard to use
                    funding_structure: rawListingForTeam?.funding_structure || transformed.funding_structure,
                    investment_preference: rawListingForTeam?.investment_preference || transformed.investmentPreferences,
                    use_of_funds: rawListingForTeam?.use_of_funds || transformed.use_of_funds,
                };
            }
        }
        return null;
    }, [listingDetailsData, investmentId, canViewContactDetails, rawListingForTeam]);

    // Use unwrapped listing details for key metrics transformation
    const actualListingDetailsForMetrics = (listingDetailsData as any)?.payload || listingDetailsData;

    const investment = apiInvestment || propInvestment || null;

    // Transform timeline data to events format (moved after investment definition)
    const timelineEvents = useMemo(() => {
        // Priority 1: Use API timeline endpoint if user has invested
        if (timelineData && userInvestment) {
            const transformed = transformInvestmentTimelineToEvents(timelineData);
            return transformed;
        }

        // Priority 2: Calculate timeline from listing data (closing_in_days, use_of_funds)
        const calculatedTimeline = calculateTimelineFromListingData(actualListingDetails, investment);
        if (calculatedTimeline.length > 0) {
            return calculatedTimeline;
        }

        return [];
    }, [timelineData, userInvestment, actualListingDetails, investment]);

    // Transform financial data to key metrics format
    // Priority: 1. Endpoint data (actualListingDetailsForMetrics.financials.current_financials)
    //          2. Investment data (investment.company_metrics_and_financial_information)
    //          3. Static fallback (KEY_METRICS)
    const keyMetrics = useMemo(() => {
        return transformFinancialsToKeyMetrics(actualListingDetailsForMetrics, investment);
    }, [listingDetailsData, investment, actualListingDetailsForMetrics]);

    // Handle express interest button click
    const handleExpressInterest = () => {
        if (!isAuthenticated) {
            const next = encodeURIComponent(`/investments/${investmentId}`);
            router.push(`/sign-in?next=${next}`);
            return;
        }

        if (userType === 'investor') {
            router.push(`/dashboard/opportunities/${investmentId}`);
            return;
        }

        if (userType === 'business') {
            router.push('/business');
            return;
        }
    };


    const handleDownloadDocuments = () => {


    };

    // Show loading state while data is being fetched
    if (isLoadingListingDetails && !investment) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="text.secondary">
                    Loading investment details...
                </Typography>
            </Box>
        );
    }

    if (!investment) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Typography variant="h6" color="text.secondary">
                    Investment not found
                </Typography>
            </Box>
        );
    }

    // Add getCategoryIcon 
    const getCategoryIcon = (category: string): string => {
        const iconMap: Record<string, string> = {
            FINTECH: '/coins-s.png',
            AGRICULTURE: '/plant-s.png',
            HEALTHCARE: '/health.png',
            'REAL ESTATE': '/house.png',
            LOGISTICS: '/coins-s.png',
            ENERGY: '/plant-s.png',
            'Technology': '/coins-s.png',
            'Fintech': '/coins-s.png',
            'Agriculture': '/plant-s.png',
            'Healthcare': '/health.png',
            'Real Estate': '/house.png',
            'Logistics': '/coins-s.png',
            'Energy': '/plant-s.png',
            'Manufacturing': '/coins-s.png',
            'Hospitality': '/house.png',
        };
        return iconMap[category as keyof typeof iconMap] || '/coins-s.png';
    };

    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            p: { xs: 2, sm: 2.5, md: 3 }
        }}>
            {/* Header */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    <Link
                        href="/investments"
                        style={{
                            color: '#043A66',
                            textDecoration: 'none',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        Investments
                    </Link>
                    <span style={{ margin: '0 6px', color: '#6A6A6A' }}>/</span>
                    <span style={{ color: '#6A6A6A' }}>{investment.title}</span>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 2, sm: 2, md: 2 },
                    mb: { xs: 2, md: 2 }
                }}>
                    <Typography
                        variant="h3"
                        fontWeight={600}
                        sx={{
                            fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
                            flex: 1,
                            color: '#043A66'
                        }}
                    >
                        {investment.title}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: 1, sm: 1 },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        {hasInterestOrInvestment ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    width: { xs: '100%', sm: 'auto' },
                                    px: { xs: 2, md: 3 },
                                    py: { xs: 1.25, md: 1.25 },
                                    borderRadius: '8px',
                                    background: '#E8F5E8',
                                    border: '1px solid #33CC33',
                                    color: '#33CC33',
                                    fontWeight: 500,
                                }}
                            >
                                <Image src="/circle-tick-green.png" alt="Invested" width={16} height={16} />
                                <span>Invested</span>
                            </Box>
                        ) : (
                            <CustomButton
                                variant="primary"
                                onClick={handleExpressInterest}
                                sx={{
                                    width: { xs: '100%', sm: 'auto' },
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                    padding: { xs: '8px 16px', md: '12px 24px' },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Image src="/circle-tick.png" alt="Express Interest" width={16} height={16} />
                                    <span>Express Interest</span>
                                </Box>
                            </CustomButton>
                        )}
                        <CustomButton
                            variant="outline"
                            onClick={handleDownloadDocuments}
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                padding: { xs: '8px 16px', md: '12px 24px' },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Image src="/download-light.png" alt="Download" width={16} height={16} />
                                <span>Download Documents</span>
                            </Box>
                        </CustomButton>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 1, sm: 2 },
                    mb: { xs: 2, md: 3 },
                    alignItems: { xs: 'flex-start', sm: 'center' }
                }}>
                    {/* Category */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        border: '1px solid #F5F5F5',
                        borderRadius: '999px',
                        background: 'transparent',
                    }}>
                        <Image
                            src={getCategoryIcon(investment.category)}
                            alt={investment.category}
                            width={16}
                            height={16}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: '#043A66', fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                            {investment.category}
                        </Typography>
                    </Box>
                    {/* Location */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        border: '1px solid #F5F5F5',
                        borderRadius: '999px',
                        background: 'transparent',
                    }}>
                        <Image
                            src="/location.png"
                            alt="Location"
                            width={16}
                            height={16}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: '#043A66', fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                            {(() => {
                                const location = investment.location;
                                if (!location) return 'Unknown Location';
                                if (/^[A-Z]{2,3}$/.test(location)) {
                                    const country = getCountryByCode(location);
                                    return country?.name || location;
                                }
                                return location;
                            })()}
                        </Typography>
                    </Box>
                    {/* Founded */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 1.5,
                        py: 0.5,
                        border: '1px solid #F5F5F5',
                        borderRadius: '999px',
                        background: 'transparent',
                    }}>
                        <Image
                            src="/calendar.png"
                            alt="Founded"
                            width={16}
                            height={16}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: '#043A66', fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                        >
                            Founded {investment.founded}
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation Tabs */}
                <NavigationTabs tabs={getTabs()} activeTab={activeTab} setActiveTab={setActiveTab} />
            </Box>

            {/* Main Content Grid */}
            <Grid container spacing={{ xs: 3, md: 4 }}>
                {/* Left Column - Main Content */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {activeTab === 'team' ? (
                        (() => {
                            // FIX: Enhanced fallback search with better matching and normalization
                            // This handles timing issues where data loads after initial render
                            let finalRawListingData = rawListingForTeam;

                            if (!finalRawListingData && fullListingData?.payload && investmentId) {
                                // FIX: Use same normalization as main search for consistency
                                const normalizedInvestmentId = String(investmentId || '').trim().toLowerCase();

                                const fallbackFound = fullListingData.payload.find((listing: any) => {
                                    // Normalize all IDs for consistent comparison (same as main search)
                                    const listingId = String(listing.id || '').trim().toLowerCase();
                                    const listingIdAlt = String((listing as any).listing_id || '').trim().toLowerCase();
                                    const businessId = String(listing.business_id || '').trim().toLowerCase();

                                    // Use normalized comparison (same logic as main search)
                                    return listingId === normalizedInvestmentId ||
                                        listingIdAlt === normalizedInvestmentId ||
                                        businessId === normalizedInvestmentId;
                                });

                                if (fallbackFound) {
                                    finalRawListingData = fallbackFound;
                                }
                            }

                            return (
                                <TeamTabContent
                                    investment={investment}
                                    listingDetailsData={actualListingDetails}
                                    rawListingData={finalRawListingData}
                                />
                            );
                        })()
                    ) : activeTab === 'financials' ? (
                        <FinanceTabContent investment={investment} listingDetailsData={actualListingDetails} />
                    ) : activeTab === 'documents' ? (
                        <DocumentTabContent 
                            investment={investment} 
                            listingDetailsData={actualListingDetails}
                            hasExpressedInterest={hasInterestOrInvestment}
                        />
                    ) : (
                        // Default: show the existing overview content for 'overview'
                        <>
                            {/* Business Overview */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 1.5, md: 2 },
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    Business Overview
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: { xs: 2, md: 3 },
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    {`Detailed information about ${investment.title}`}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        lineHeight: 1.7,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    {actualListingDetails?.overview?.description || investment.businessOverview || investment.description}
                                </Typography>
                            </Box>

                            {/* Key Metrics */}
                            <KeyMetricsSection metrics={keyMetrics} />

                            {/* Market Opportunity */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 2, md: 3 },
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    Market Opportunity
                                </Typography>
                                {(() => {
                                    // Check all possible sources for market opportunity
                                    // Priority: root level payload > overview > investment > raw listing
                                    const payloadMarketOpportunity = (actualListingDetails as any)?.payload?.market_opportunity ||
                                        (listingDetailsData as any)?.payload?.market_opportunity ||
                                        (listingDetailsData as any)?.market_opportunity;
                                    const marketOpportunity =
                                        payloadMarketOpportunity ||
                                        actualListingDetails?.overview?.market_opportunity ||
                                        investment?.marketOpportunity ||
                                        (rawListingForTeam as any)?.market_opportunity ||
                                        (rawListingForTeam as any)?.market_opportunity_description ||
                                        (investment as any)?.market_opportunity ||
                                        (investment as any)?.market_opportunity_description;

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
                                            Market opportunity details have not been provided yet.
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
                                    // Priority: root level payload > overview > investment > raw listing
                                    const payloadCompetitiveAdvantage = (actualListingDetails as any)?.payload?.competitive_advantage ||
                                        (listingDetailsData as any)?.payload?.competitive_advantage ||
                                        (listingDetailsData as any)?.competitive_advantage;
                                    const competitiveAdvantage =
                                        payloadCompetitiveAdvantage ||
                                        actualListingDetails?.overview?.competitive_advantage ||
                                        investment?.competitiveAdvantage ||
                                        (rawListingForTeam as any)?.competitive_advantage ||
                                        (rawListingForTeam as any)?.competitive_advantage_description ||
                                        (investment as any)?.competitive_advantage ||
                                        (investment as any)?.competitive_advantage_description;

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
                                            Competitive advantage information is not yet available.
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, mt: { xs: -10, md: -13 } }}>
                        <InvestmentProgressCard investment={investment} listingDetailsData={actualListingDetails} />
                        <CompanyInformationCard investment={investment} listingDetailsData={actualListingDetails} />
                        <ContactInformationCard
                            investment={investment}
                            listingDetailsData={actualListingDetails}
                            hasUserInvestment={canViewContactDetails}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InvestmentDetailsComponent;