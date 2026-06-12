'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { OpportunitiesLayout } from '../../../components/(dashboard)/opportunities/opportunities-layout';
import { useGetInvestorBusinessListingsQuery } from '../../../queries/businessApi';
import { FilterState, Investment } from '../../../types/landing-page';
import { transformListingToInvestment } from '../../../utils/opportunityTransformer';

const DEFAULT_PAGE_SIZE = 10;

const OpportunitiesPage: React.FC = () => {
    // Default page size to 10, matching API pagination parameter
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });
    const page = pagination.pageIndex + 1;
    const pageSize = pagination.pageSize;
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        location: '',
        expectedROI: [],
        search: ''
    });

    // Convert ROI display format to API format (e.g., "10 - 15%" -> "10-15")
    const convertROIToAPIFormat = (roi: string): string => {
        return roi
            .replace(/\s+/g, '')
            .replace(/%/g, '')
            .replace(/\+\s*/g, '+');
    };

    // Build query params directly (matching admin/business pattern for better RTK Query change detection)
    const {
        data: listingsData,
        error: listingsError,
        isLoading,
        isFetching,
        refetch
    } = useGetInvestorBusinessListingsQuery({
        page,
        page_size: pageSize,
        ...(filters.search && filters.search.trim() && { search: filters.search.trim() }),
        ...(filters.categories.length > 0 && { category: filters.categories.join(',') }),
        ...(filters.location && { location: filters.location }),
        ...(filters.expectedROI.length > 0 && { expected_roi: filters.expectedROI.map(convertROIToAPIFormat) })
    }, {
        refetchOnMountOrArgChange: true
    });

    // Sync pagination with API response (matching admin/business pattern)
    // Only sync if API returns a different page than what we requested
    useEffect(() => {
        if (listingsData?.page !== undefined && listingsData.page !== null) {
            const apiPage = listingsData.page;
            const expectedPage = page;
            // Only sync if there's a mismatch (API corrected our page number)
            if (apiPage !== expectedPage) {
                setPagination(prev => ({ ...prev, pageIndex: apiPage - 1 }));
            }
        }
    }, [listingsData?.page, page]);

    // Reset to page 1 when filters change (matching admin/business pattern)
    useEffect(() => {
        if (filters.search) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [filters.search]);

    useEffect(() => {
        if (filters.categories.length > 0) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [filters.categories]);

    useEffect(() => {
        if (filters.location) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [filters.location]);

    useEffect(() => {
        if (filters.expectedROI.length > 0) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [filters.expectedROI]);

    const handleApplyFilters = () => {
        // Manually trigger refetch when apply is clicked
        refetch();
    };

    const handleResetFilters = () => {
        const resetFilters: FilterState = {
            categories: [],
            location: '',
            expectedROI: [],
            search: ''
        };

        setFilters(resetFilters);
        setPagination({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });

        requestAnimationFrame(() => {
            refetch();
        });
    };

    const handleSearch = (searchTerm: string) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handlePageChange = (newPageIndex: number) => {
        // newPageIndex is 0-based (0, 1, 2...) from PaginationControls
        setPagination(prev => ({ ...prev, pageIndex: newPageIndex }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination(prev => ({ ...prev, pageIndex: 0, pageSize: newPageSize }));
    };

    const transformedInvestments: Investment[] = useMemo(() => {
        if (!listingsData?.payload || !Array.isArray(listingsData.payload)) {
            return [];
        }

        // Use a Map to track unique listings by ID to prevent duplicates
        const uniqueListingsMap = new Map<string, Investment>();

        listingsData.payload.forEach((listing: any, index: number) => {
            const listingKey = listing.id || `listing-${index}`;
            // Skip if we've already processed this listing
            if (uniqueListingsMap.has(listingKey)) {
                return;
            }

            try {
                const transformed = transformListingToInvestment(listing);
                // Ensure the ID is unique
                const investmentWithUniqueId = {
                    ...transformed,
                    id: listingKey,
                };
                uniqueListingsMap.set(listingKey, investmentWithUniqueId);
            } catch (error) {
                // Silently skip invalid listings
            }
        });

        return Array.from(uniqueListingsMap.values());
    }, [listingsData]);

    const allInvestments = transformedInvestments;

    // Use API's page number if available, otherwise use computed page (matching admin/business pattern)
    const currentPageForDisplay = listingsData?.page || page;

    return (
        <OpportunitiesLayout
            investments={allInvestments}
            filters={filters}
            onFiltersChange={setFilters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            paginationData={listingsData}
            currentPage={currentPageForDisplay}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
        />
    );
};

export default OpportunitiesPage;

