'use client'
import { Search } from '@mui/icons-material';
import {
    Alert,
    Box,
    CircularProgress,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInvestorInvestments } from '../../hooks/useInvestorInvestments';
import { useGetInvestorBusinessListingsQuery } from '../../queries/businessApi';
import { RootState } from '../../Redux/store';
import { FilterState, Investment } from '../../types/landing-page';
import { transformListingToInvestment } from '../../utils/opportunityTransformer';
import PaginationControls from '../admin/home/PaginationControls';
import { FilterSidebar } from './filter-sidebar';
import { InvestmentCard } from './investment-card';

const DEFAULT_INVESTMENT_PAGE_SIZE = 4;

interface InvestmentDashboardProps {
    initialPageSize?: number;
}

export const InvestmentDashboard: React.FC<InvestmentDashboardProps> = ({
    initialPageSize = DEFAULT_INVESTMENT_PAGE_SIZE
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = authState.isLoggedIn;
    const userType = authState.loginData?.user_type;
    const shouldIncludeUserStatus = isAuthenticated && userType === 'investor';

    const { investorInvestmentsData } = useInvestorInvestments(undefined, {
        initialPageSize: 100,
        enabled: shouldIncludeUserStatus,
    });

    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        location: '',
        expectedROI: [],
        search: ''
    });

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: Math.max(1, initialPageSize || DEFAULT_INVESTMENT_PAGE_SIZE)
    });
    const page = pagination.pageIndex + 1;
    const pageSize = pagination.pageSize;

    // Convert ROI display format to API format
    const convertROIToAPIFormat = (roi: string): string => {
        return roi
            .replace(/\s+/g, '')
            .replace(/%/g, '')
            .replace(/\+\s*/g, '+');
    };

    // Memoize queryParams to ensure proper updates
    const queryParams = useMemo(() => ({
        search: filters.search && filters.search.trim() ? filters.search.trim() : null,
        category: filters.categories.length > 0 ? filters.categories.join(',') : null,
        location: filters.location || null,
        expected_roi: filters.expectedROI.length > 0
            ? filters.expectedROI.map(convertROIToAPIFormat)
            : null,
        page,
        page_size: pageSize
    }), [filters, page, pageSize]);

    // Fetch investment opportunities
    const {
        data: opportunitiesData,
        error,
        refetch,
        isLoading,
        isFetching
    } = useGetInvestorBusinessListingsQuery(queryParams, {
        refetchOnMountOrArgChange: true
    });

    // Determine loading state
    const isLoadingData = isLoading || isFetching;

    // Sync pagination with API response
    useEffect(() => {
        if (opportunitiesData?.page !== undefined && opportunitiesData.page !== null) {
            const apiPage = opportunitiesData.page;
            const normalizedPageIndex =
                apiPage >= 1 &&
                    opportunitiesData?.total_pages &&
                    opportunitiesData.total_pages > 0 &&
                    apiPage <= opportunitiesData.total_pages
                    ? apiPage - 1
                    : Math.max(0, apiPage);

            if (normalizedPageIndex !== pagination.pageIndex) {
                setPagination(prev => ({ ...prev, pageIndex: normalizedPageIndex }));
            }
        }

    }, [opportunitiesData?.page, opportunitiesData?.total_pages, pagination.pageIndex, pagination.pageSize]);

    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageSize: Math.max(1, initialPageSize || DEFAULT_INVESTMENT_PAGE_SIZE)
        }));
    }, [initialPageSize]);

    // Reset to page 1 when filters change
    useEffect(() => {
        if (filters.search || filters.categories.length > 0 || filters.location || filters.expectedROI.length > 0) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [filters.search, filters.categories, filters.location, filters.expectedROI]);


    const userInvestmentsByListing = useMemo(() => {
        if (!shouldIncludeUserStatus || !investorInvestmentsData?.payload) {
            return new Map<string, { status?: string; record: any; dueDiligenceStatus?: string }>();
        }
        const map = new Map<string, { status?: string; record: any; dueDiligenceStatus?: string }>();
        investorInvestmentsData.payload.forEach((inv: any) => {
            const listingId =
                inv.business_listing_id ||
                inv.listing_id ||
                (inv as any).listingId ||
                null;

            if (!listingId) {
                return;
            }

            const status =
                typeof inv.status === 'string'
                    ? inv.status.toLowerCase()
                    : undefined;

            const dueDiligenceStatus =
                typeof inv.due_diligence_status === 'string'
                    ? inv.due_diligence_status.toLowerCase()
                    : undefined;

            map.set(String(listingId), {
                status,
                record: inv,
                dueDiligenceStatus,
            });
        });
        return map;
    }, [investorInvestmentsData, shouldIncludeUserStatus]);

    const declinedStatuses = useMemo(
        () => ['rejected', 'declined', 'disapproved', 'cancelled', 'failed'],
        []
    );

    const investments: Investment[] = useMemo(() => {
        if (!opportunitiesData?.payload || !Array.isArray(opportunitiesData.payload)) {
            return [];
        }

        // Use a Map to track unique listings by ID to prevent duplicates
        const uniqueListingsMap = new Map<string, Investment>();

        opportunitiesData.payload.forEach((listing: any, index: number) => {
            const listingKey = listing.id || `listing-${index}`;
            // Skip if we've already processed this listing
            if (uniqueListingsMap.has(listingKey)) {
                return;
            }

            try {
                const transformed = transformListingToInvestment(listing);
                // Ensure the ID is unique
                const investmentWithUniqueId: Investment = {
                    ...transformed,
                    id: listingKey,
                };

                const listingIdentifiers = [
                    listing.id,
                    listing.listing_id,
                    listing.listingId,
                    listing.business_listing_id,
                    transformed.listing_id,
                    transformed.id,
                ]
                    .map((value) => (value ? String(value) : null))
                    .filter((value): value is string => Boolean(value));

                let matchedInvestmentMeta:
                    | { status?: string; record: any; dueDiligenceStatus?: string }
                    | undefined;

                for (const identifier of listingIdentifiers) {
                    const candidate = userInvestmentsByListing.get(identifier);
                    if (candidate) {
                        matchedInvestmentMeta = candidate;
                        break;
                    }
                }

                if (matchedInvestmentMeta) {
                    const normalizedStatus =
                        matchedInvestmentMeta.status ||
                        (typeof matchedInvestmentMeta.record?.status === 'string'
                            ? matchedInvestmentMeta.record.status.toLowerCase()
                            : undefined);

                    const hasActiveInterest =
                        normalizedStatus && !declinedStatuses.includes(normalizedStatus);

                    investmentWithUniqueId.userInvestmentStatus = normalizedStatus;
                    investmentWithUniqueId.userHasActiveInterest = Boolean(hasActiveInterest);
                    investmentWithUniqueId.userInvestmentId =
                        matchedInvestmentMeta.record?.id ||
                        matchedInvestmentMeta.record?.investment_interest ||
                        undefined;
                    investmentWithUniqueId.userDueDiligenceStatus =
                        matchedInvestmentMeta.dueDiligenceStatus;
                }

                uniqueListingsMap.set(listingKey, investmentWithUniqueId);
            } catch (error) {
                // Silently skip invalid listings
            }
        });

        let transformedInvestments = Array.from(uniqueListingsMap.values());

        // Apply client-side search filter
        if (filters.search.trim()) {
            const searchTerm = filters.search.toLowerCase();
            transformedInvestments = transformedInvestments.filter(investment =>
                investment.title.toLowerCase().includes(searchTerm) ||
                investment.description.toLowerCase().includes(searchTerm) ||
                investment.category.toLowerCase().includes(searchTerm) ||
                investment.location.toLowerCase().includes(searchTerm)
            );
        }

        return transformedInvestments;
    }, [opportunitiesData, filters.search, userInvestmentsByListing, declinedStatuses]);

    const paginatedInvestments = useMemo(() => {
        if (!investments || investments.length === 0) {
            return [];
        }
        const safePageSize = Math.max(1, pagination.pageSize || DEFAULT_INVESTMENT_PAGE_SIZE);
        const safePageIndex = Math.max(0, pagination.pageIndex || 0);
        const startIndex = safePageIndex * safePageSize;
        return investments.slice(startIndex, startIndex + safePageSize);
    }, [investments, pagination.pageIndex, pagination.pageSize]);

    const handleFiltersChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleApplyFilters = () => {
        refetch();
    };

    const handleResetFilters = () => {
        const resetFilters: FilterState = {
            categories: [],
            location: '',
            expectedROI: [],
            search: '',
            compliance: [],
            investmentAmount: [1000, 2000000000]
        };

        setFilters(resetFilters);
        setPagination({
            pageIndex: 0,
            pageSize: Math.max(1, initialPageSize || DEFAULT_INVESTMENT_PAGE_SIZE)
        });
        requestAnimationFrame(() => {
            refetch();
        });
    };

    const opportunitiesTotalPages = useMemo(() => {
        if (!opportunitiesData) return 0;
        const effectivePageSize = Math.max(1, pagination.pageSize || DEFAULT_INVESTMENT_PAGE_SIZE);
        if (typeof opportunitiesData?.count === 'number' && opportunitiesData.count > 0) {
            return Math.max(1, Math.ceil(opportunitiesData.count / effectivePageSize));
        }
        if (typeof opportunitiesData?.total_pages === 'number' && opportunitiesData.total_pages > 0) {
            return opportunitiesData.total_pages;
        }
        return 0;
    }, [opportunitiesData, pagination.pageSize]);

    const hasMultiplePages = opportunitiesTotalPages > 1;

    const handlePageChange = (newPageIndex: number) => {
        const maxPageIndex = Math.max(0, (opportunitiesTotalPages || 1) - 1);
        const validPageIndex = Math.max(0, Math.min(newPageIndex, maxPageIndex));
        setPagination(prev => ({ ...prev, pageIndex: validPageIndex }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        const normalizedSize = Math.max(1, newPageSize);
        setPagination(prev => ({ ...prev, pageIndex: 0, pageSize: normalizedSize }));
    };

    const hasServerPaginationHints =
        hasMultiplePages ||
        opportunitiesData?.has_next ||
        opportunitiesData?.has_previous ||
        (typeof opportunitiesData?.count === 'number' && opportunitiesData.count > pagination.pageSize);

    const hasClientPaginationHints =
        (opportunitiesData?.payload?.length ?? 0) >= pagination.pageSize &&
        opportunitiesData?.payload?.length !== 0;

    const showPagination =
        paginatedInvestments.length > 0 &&
        (hasServerPaginationHints || hasClientPaginationHints);


    // Show error state
    if (error) {
        return (
            <Box sx={{
                minHeight: '100vh',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Alert severity="error" sx={{ maxWidth: 600 }}>
                    <Typography variant="h6" gutterBottom>
                        Unable to load investment opportunities
                    </Typography>
                    <Typography variant="body2">
                        Please try again later or contact support if the problem persists.
                    </Typography>
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            pb: 4
        }}>
            {/* Header */}
            <Box sx={{
                backgroundColor: '',
                pt: 4,
                pb: 6,
                borderBottomLeftRadius: { xs: '24px', md: '40px' },
                borderBottomRightRadius: { xs: '24px', md: '40px' }
            }}>
                <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 } }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight={700}
                        sx={{
                            mb: 2,
                            fontSize: { xs: '2rem', md: '3rem' },
                            color: '#043A66'
                        }}
                    >
                        Investment Opportunities
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            color: '#043A66'
                        }}
                    >
                        Browse and filter through our curated selection of vetted businesses seeking investment.
                    </Typography>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 4 }, mt: 4 }}>
                <Grid container spacing={4} alignItems="flex-start">
                    {/* Filter Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <FilterSidebar
                            filters={filters}
                            onFiltersChange={handleFiltersChange}
                            onApplyFilters={handleApplyFilters}
                            onResetFilters={handleResetFilters}
                        />
                    </Grid>

                    {/* Investment Cards */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        {isLoadingData ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '400px',
                                    width: '100%',
                                }}
                            >
                                <CircularProgress size={40} sx={{ color: '#33CC33' }} />
                            </Box>
                        ) : investments.length === 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 8,
                                    px: 4,
                                    textAlign: 'center',
                                    minHeight: '400px',
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
                                    }}
                                >
                                    We're currently reviewing new businesses. Check back soon to explore verified opportunities.
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <Grid container spacing={3}>
                                    {paginatedInvestments.map((investment) => (
                                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={investment.id}>
                                            <InvestmentCard investment={investment} />
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Pagination Controls */}
                                {opportunitiesData && showPagination && (
                                    <Box sx={{ mt: 4 }}>
                                        <PaginationControls
                                            page={page}
                                            pageSize={pageSize}
                                            listingData={{
                                                count: opportunitiesData.count,
                                                has_previous: opportunitiesData.has_previous,
                                                has_next: opportunitiesData.has_next,
                                                page: opportunitiesData.page,
                                                total_pages: opportunitiesTotalPages,
                                                items_per_page: opportunitiesData.items_per_page
                                            }}
                                            onPageChange={handlePageChange}
                                            onPageSizeChange={handlePageSizeChange}
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default InvestmentDashboard;