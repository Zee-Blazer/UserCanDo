'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { InvestmentsGrid } from '../../../components/(dashboard)/investments/investments-grid';
import { SearchHeader } from '../../../components/General/ui/custom-search';
import PaginationControls from '../../../components/admin/home/PaginationControls';
// Removed mock INVESTMENTS import
import { useInvestorDashboard } from '../../../hooks/useInvestorDashboard';
import { useInvestorInvestments } from '../../../hooks/useInvestorInvestments';
import { useGetInvestorBusinessListingsQuery } from '../../../queries/businessApi';
import { Investment } from '../../../types/landing-page';
import { InvestorInvestment } from '../../../types/queries-type';
import { transformListingToInvestment } from '../../../utils/opportunityTransformer';
import LoadingAnimation from '../../loading-lottie';

type InvestmentStatus = 'ACTIVE' | 'IN PROGRESS' | 'EXITED';

interface ExtendedInvestment extends Investment {
    status: InvestmentStatus;
    amountInvested: number;
    investedDate: string;
    dueDiligenceStatus?: string;
    _originalId?: string;
}

const DEFAULT_LISTINGS_PAGE_SIZE = 10;

const InvestmentsPage: React.FC = () => {
    const {
        investorInvestmentsData,
        isLoadingInvestments,
        investmentsError,
        searchQuery,
        currentPage,
        pageSize,
        handleSearchChange,
        handlePageChange,
        handlePageSizeChange,
        refreshData
    } = useInvestorInvestments(undefined, { initialPageSize: DEFAULT_LISTINGS_PAGE_SIZE });

    // Sync pagination with API response (matching admin/business pattern)
    // Only sync if API returns a different page than what we requested
    useEffect(() => {
        if (investorInvestmentsData?.page !== undefined && investorInvestmentsData.page !== null) {
            const apiPage = investorInvestmentsData.page;
            const expectedPage = currentPage;
            // Only sync if there's a mismatch (API corrected our page number)
            if (apiPage !== expectedPage) {
                handlePageChange(apiPage);
            }
        }
    }, [investorInvestmentsData?.page, currentPage, handlePageChange]);

    const investmentsTotalPages = useMemo(() => {
        if (!investorInvestmentsData) return 0;
        if (investorInvestmentsData.total_pages && investorInvestmentsData.total_pages > 0) {
            return investorInvestmentsData.total_pages;
        }
        if (investorInvestmentsData.count && pageSize > 0) {
            return Math.max(1, Math.ceil(investorInvestmentsData.count / pageSize));
        }
        return 0;
    }, [investorInvestmentsData, pageSize]);

    // Show pagination when we have data and pagination handlers (matching opportunities pattern)
    const showInvestmentsPagination =
        !!investorInvestmentsData &&
        !!investorInvestmentsData?.payload?.length &&
        (investmentsTotalPages > 0 ||
            investorInvestmentsData.has_next ||
            investorInvestmentsData.has_previous ||
            (investorInvestmentsData.count && investorInvestmentsData.count > 0));

    // Fetch dashboard data to check for expressed interests
    const {
        dashboardData,
        isLoadingDashboard
    } = useInvestorDashboard({ start_date: null, end_date: null });

    // Check if investor has expressed interest or has investments
    const hasInvestmentsOrInterest = React.useMemo(() => {
        // Check if investor has actual investments
        const hasInvestments = investorInvestmentsData?.payload && investorInvestmentsData.payload.length > 0;

        // Check if investor has opportunities in review (indicates expressed interest)
        const hasOpportunitiesInReview = dashboardData?.opportunities_in_review && dashboardData.opportunities_in_review > 0;

        // Check if investor has active investments from dashboard
        const hasActiveInvestments = dashboardData?.active_investments && dashboardData.active_investments.length > 0;

        return hasInvestments || hasOpportunitiesInReview || hasActiveInvestments;
    }, [investorInvestmentsData, dashboardData]);

    // Always fetch business listings to get full listing details (funding structure, investment preferences, etc.)
    // Note: This is only used for merging data, not for pagination
    const {
        data: listingsData,
        isLoading: isLoadingListings,
        error: listingsError
    } = useGetInvestorBusinessListingsQuery({
        page: 1, // Always fetch first page for listings (used for merging data only)
        page_size: 50 // Fetch more listings to match with investments
    }, {
        refetchOnMountOrArgChange: true,
        skip: false // Always fetch to get full listing details
    });


    const mapInvestmentStatus = (apiStatus: string): InvestmentStatus => {
        switch (apiStatus) {
            case 'approved':
            case 'completed':
                return 'ACTIVE';
            case 'pending':
            case 'in_progress':
                return 'IN PROGRESS';
            case 'rejected':
            case 'failed':
                return 'EXITED';
            default:
                return 'IN PROGRESS';
        }
    };


    const portfolioInvestments: ExtendedInvestment[] = useMemo(() => {
        // Priority 1: Use investor investments if available, merge with business listing data
        if (investorInvestmentsData?.payload && Array.isArray(investorInvestmentsData.payload) && investorInvestmentsData.payload.length > 0) {
            // Use a Map to track unique investments by a composite key (investment.id + listingId)
            const uniqueInvestmentsMap = new Map<string, ExtendedInvestment>();

            investorInvestmentsData.payload.forEach((investment: InvestorInvestment, index) => {
                const roiRaw = (investment as any).expected_roi as any;
                let roiFormatted: string;
                if (typeof roiRaw === 'number') {
                    roiFormatted = `${Math.round(roiRaw)}%`;
                } else if (typeof roiRaw === 'string' && roiRaw.trim()) {

                    roiFormatted = roiRaw.trim().endsWith('%') ? roiRaw.trim() : `${roiRaw.trim()}%`;
                } else {
                    roiFormatted = '0%';
                }


                const listingId = investment.business_listing_id || investment.id;

                // Create a unique key for this investment (use investment.id as primary, listingId as secondary)
                const uniqueKey = investment.id || `inv-${index}-${listingId}`;

                // Skip if we've already processed this investment
                if (uniqueInvestmentsMap.has(uniqueKey)) {
                    return;
                }

                // Find corresponding business listing to get full details
                const correspondingListing = listingsData?.payload?.find((listing: any) =>
                    listing.id === listingId || listing.business_id === listingId
                );

                // Try to get category from investment data or listing, fallback to FINTECH
                const category = (investment as any).category ||
                    correspondingListing?.category ||
                    (investment as any).investment_sector ||
                    (investment as any).sector ||
                    'FINTECH';

                // Extract data from business listing if available
                const fundingStructure = correspondingListing?.funding_structure || {};
                const companyMetrics = correspondingListing?.company_metrics_and_financial_information || {};
                const investmentPreference = correspondingListing?.investment_preference || {};

                // Helper function to parse numbers with commas
                const parseNumber = (value: string | number | undefined | null): number => {
                    if (typeof value === 'number') return value;
                    if (!value) return 0;
                    const cleaned = String(value).replace(/,/g, '').replace(/[^0-9.-]/g, '');
                    const parsed = parseFloat(cleaned);
                    return isNaN(parsed) ? 0 : parsed;
                };

                // Calculate minInvestment from funding_structure
                const minInvestmentValue = fundingStructure.minimum_investment || investmentPreference.minimum_investment;
                const minInvestment = minInvestmentValue ? parseNumber(minInvestmentValue) : 10000;

                // Calculate fundingProgress from funding_structure
                const targetAmount = parseNumber(fundingStructure.funding_amount_seeking || fundingStructure.target_amount) || investment.amount || 0;
                // Only use amount_raised, not current_valuation (valuation is not the same as amount raised)
                const amountRaised = parseNumber(fundingStructure.amount_raised) || 0;
                let fundingProgress = 0;
                if (targetAmount > 0) {
                    const progress = Math.round((amountRaised / targetAmount) * 100);
                    // Cap at 100% maximum
                    fundingProgress = Math.min(progress, 100);
                }

                // Get teamSize from company_metrics_and_financial_information
                const teamSize = parseNumber(companyMetrics.team_size);

                // Get investmentTerm from investment_preference (funding_round_duration in months)
                const fundingRoundDuration = investmentPreference.funding_round_duration || '';
                const investmentTerm = fundingRoundDuration ? `${fundingRoundDuration} months` : '24 months';

                // Calculate closingDays from investment_preference.expected_close_date

                let closingDays: number = 0;
                if (investmentPreference.expected_close_date) {
                    const expectedCloseDate = new Date(investmentPreference.expected_close_date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    expectedCloseDate.setHours(0, 0, 0, 0);

                    if (!isNaN(expectedCloseDate.getTime())) {
                        const diffTime = expectedCloseDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        // If date is in the past, set to 0. Otherwise use the actual days (can be any positive number)
                        closingDays = diffDays > 0 ? diffDays : 0;
                    }
                }

                // Get founded year from company_metrics_and_financial_information or created_at
                const founded = (companyMetrics as any).year_founded
                    ? parseNumber((companyMetrics as any).year_founded)
                    : (investment.created_at ? new Date(investment.created_at).getFullYear() : 2020);

                const extendedInvestment: ExtendedInvestment = {
                    id: uniqueKey, // Use unique key as id to prevent duplicates
                    listing_id: listingId,
                    title: investment.business_name || correspondingListing?.business_name || 'Business Investment',
                    category: (category.toUpperCase() as Investment['category']) || 'FINTECH',
                    location: investment.business_country || correspondingListing?.location || correspondingListing?.headquarters || 'Nigeria',
                    description: `Investment in ${investment.business_name || correspondingListing?.business_name || 'Business'} - Expected ROI: ${roiFormatted}`,
                    targetAmount: targetAmount,
                    expectedROI: roiFormatted,
                    fundingProgress: fundingProgress,
                    minInvestment: minInvestment,
                    investors: 0, // Get from count if available
                    isSharesCompliant: true,
                    founded: founded,
                    teamSize: teamSize,
                    headquarters: correspondingListing?.headquarters || investment.business_country || correspondingListing?.location || 'Nigeria',
                    investmentTerm: investmentTerm,
                    closingDays: closingDays,
                    businessOverview: `Investment in ${investment.business_name || correspondingListing?.business_name || 'Business'} with ${roiFormatted} expected ROI. Status: ${investment.status}, Due Diligence: ${investment.due_diligence_status}`,
                    businessOverviewTitle: `About Investment in ${investment.business_name || correspondingListing?.business_name || 'Business'}`,
                    status: mapInvestmentStatus(investment.status),
                    amountInvested: investment.amount || 0,
                    investedDate: investment.created_at ? new Date(investment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) : '',
                    dueDiligenceStatus: investment.due_diligence_status,
                    // Include full listing data for reference
                    funding_structure: fundingStructure,
                    company_metrics_and_financial_information: companyMetrics,
                    investment_preference: investmentPreference,
                    // Store original investment ID for reference
                    _originalId: investment.id,
                };

                uniqueInvestmentsMap.set(uniqueKey, extendedInvestment);
            });

            return Array.from(uniqueInvestmentsMap.values());
        }

        // Priority 2: Fallback to business listings if investor investments are empty
        if (listingsData?.payload && Array.isArray(listingsData.payload) && listingsData.payload.length > 0) {
            // Use a Map to track unique listings by ID to prevent duplicates
            const uniqueListingsMap = new Map<string, ExtendedInvestment>();

            listingsData.payload.forEach((listing: any, index: number) => {
                // Skip if we've already processed this listing
                const listingKey = listing.id || `listing-${index}`;
                if (uniqueListingsMap.has(listingKey)) {
                    return;
                }

                try {
                    const transformed = transformListingToInvestment(listing);
                    const extendedInvestment: ExtendedInvestment = {
                        ...transformed,
                        id: listingKey, // Ensure unique ID
                        status: 'IN PROGRESS' as InvestmentStatus,
                        amountInvested: 0,
                        investedDate: '',
                        dueDiligenceStatus: undefined,
                        _originalId: listing.id,
                    };
                    uniqueListingsMap.set(listingKey, extendedInvestment);
                } catch (error) {
                    // Silently skip invalid listings
                }
            });

            // Return transformed listings if we have any
            if (uniqueListingsMap.size > 0) {
                return Array.from(uniqueListingsMap.values());
            }
        }

        // Return empty array if no data
        return [];
    }, [investorInvestmentsData, listingsData]);

    const filteredInvestments = useMemo(() => {
        if (!searchQuery.trim()) {
            return portfolioInvestments;
        }

        return portfolioInvestments.filter((investment) =>
            investment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            investment.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            investment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            investment.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, portfolioInvestments]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#fafafa',
                py: { xs: 1, sm: 2, md: 3, lg: 4 },
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
                    <Box
                        sx={{
                            borderRadius: '5px',
                            border: '1px solid #EEF1F4',
                            backgroundColor: '',
                            p: { xs: 1, sm: 1.5, md: 2 },
                            mb: 4,
                        }}
                    >
                        <SearchHeader
                            title="Investments"
                            subtitle="Manage your investment portfolio"
                            searchPlaceholder="Search for investment..."
                            searchValue={searchQuery}
                            onSearchChange={handleSearchChange}
                        />
                    </Box>

                    {/* Show loading only if we're loading and have no data to display */}
                    {(isLoadingInvestments || isLoadingListings || isLoadingDashboard) && filteredInvestments.length === 0 && hasInvestmentsOrInterest === undefined ? (
                        <LoadingAnimation isVisible={true} />
                    ) : !hasInvestmentsOrInterest && !isLoadingInvestments && !isLoadingDashboard ? (
                        <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                                No Investments
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>
                                You haven't expressed interest in any investment opportunities yet. Explore opportunities to get started.
                            </Typography>
                            <Button
                                variant="contained"
                                href="/dashboard/opportunities"
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#45a049',
                                    },
                                }}
                            >
                                Explore Opportunities
                            </Button>
                        </Box>
                    ) : filteredInvestments.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                                No investments found
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#999' }}>
                                {investorInvestmentsData?.payload && investorInvestmentsData.payload.length === 0
                                    ? 'You haven\'t made any investments yet. Explore opportunities to get started.'
                                    : 'No investment opportunities are available at this time.'}
                            </Typography>
                        </Box>
                    ) : (
                        <InvestmentsGrid investments={filteredInvestments} />
                    )}

                    {/* Pagination Controls - Use investor investments pagination (matching admin/business pattern) */}
                    {investorInvestmentsData && showInvestmentsPagination && (
                        <Box sx={{ mt: 4 }}>
                            <PaginationControls
                                page={investorInvestmentsData.page || currentPage}
                                pageSize={pageSize}
                                listingData={{
                                    count: investorInvestmentsData.count,
                                    has_previous: investorInvestmentsData.has_previous,
                                    has_next: investorInvestmentsData.has_next,
                                    page: investorInvestmentsData.page,
                                    total_pages: investmentsTotalPages,
                                    items_per_page: investorInvestmentsData.items_per_page
                                }}
                                onPageChange={(newPageIndex) => {
                                    // newPageIndex is 0-based from PaginationControls, convert to 1-based for hook
                                    handlePageChange(newPageIndex + 1);
                                }}
                                onPageSizeChange={handlePageSizeChange}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default InvestmentsPage;