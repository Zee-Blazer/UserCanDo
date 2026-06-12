'use client';

import { Search } from '@mui/icons-material';
import { Box, CircularProgress, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { FilterState, Investment } from '../../../types/landing-page';
import PaginationControls from '../../admin/home/PaginationControls';
import { FilterSidebar } from './filter-sidebar';
import { OpportunitiesGrid } from './opportunities-grid';

interface OpportunitiesLayoutProps {
    investments: Investment[];
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
    onSearch?: (searchTerm: string) => void;
    loading?: boolean;
    paginationData?: {
        count?: number;
        has_previous?: boolean;
        has_next?: boolean;
        page?: number;
        total_pages?: number;
    };
    currentPage?: number;
    pageSize?: number;
    onPageChange?: (newPageIndex: number) => void;
    onPageSizeChange?: (newPageSize: number) => void;
}

export const OpportunitiesLayout: React.FC<OpportunitiesLayoutProps> = ({
    investments,
    filters,
    onFiltersChange,
    onApplyFilters,
    onResetFilters,
    onSearch,
    loading = false,
    paginationData,
    currentPage = 1,
    pageSize = 10,
    onPageChange,
    onPageSizeChange
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onSearch?.(value);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#fafafa',
            }}
        >
            {/* Top Bar */}
            <Box
                sx={{
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e5e7eb',
                    p: { xs: 2, sm: 3, md: 4 },
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1600px',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'flex-start', md: 'center' },
                        justifyContent: 'space-between',
                        gap: { xs: 2, md: 4 },
                        px: { xs: 1, sm: 2, md: 3 },
                    }}
                >
                    {/* Title Section */}
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#1f2937',
                                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
                                mb: 0.5,
                            }}
                        >
                            Explore Opportunities
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#6b7280',
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                        >
                            Explore investment opportunities
                        </Typography>
                    </Box>

                    {/* Search Input */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: '400px' },
                            minWidth: { xs: '100%', md: '300px' },
                            position: 'relative',
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Search for investment..."
                            value={filters.search || ''}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <Search
                                        sx={{
                                            color: '#9ca3af',
                                            mr: 1,
                                            fontSize: '1.25rem',
                                        }}
                                    />
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '8px',
                                    '& fieldset': {
                                        borderColor: '#d1d5db',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#9ca3af',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#33CC33',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    maxWidth: '1600px',
                    mx: 'auto',
                    width: '100%',
                    p: { xs: 1, sm: 2, md: 3 },
                    gap: { xs: 0, lg: 2 },
                }}
            >
                {/* Sidebar - Filters */}
                {!isMobile && (
                    <Box
                        sx={{
                            width: '280px',
                            flexShrink: 0,
                            position: 'sticky',
                            top: '120px',
                            height: 'fit-content',
                            ml: 1,
                        }}
                    >
                        <FilterSidebar
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                            onApplyFilters={onApplyFilters}
                            onResetFilters={onResetFilters}
                        />
                    </Box>
                )}

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                    }}
                >
                    {/* Mobile Filter Button */}
                    {isMobile && (
                        <Box sx={{ mb: 3 }}>
                            <FilterSidebar
                                filters={filters}
                                onFiltersChange={onFiltersChange}
                                onApplyFilters={onApplyFilters}
                                onResetFilters={onResetFilters}
                            />
                        </Box>
                    )}

                    {/* Opportunities Grid */}
                    {loading ? (
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
                    ) : (
                        <OpportunitiesGrid investments={investments} />
                    )}

                    {/* Pagination Controls - Always show when we have data and handlers (matching admin/business pattern) */}
                    {paginationData && onPageChange && investments.length > 0 && (
                        <Box sx={{ mt: 4 }}>
                            <PaginationControls
                                page={paginationData.page || currentPage}
                                pageSize={pageSize}
                                listingData={paginationData}
                                onPageChange={onPageChange}
                                onPageSizeChange={onPageSizeChange}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
