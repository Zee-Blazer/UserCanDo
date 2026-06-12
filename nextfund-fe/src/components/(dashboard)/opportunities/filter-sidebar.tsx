'use client';

import { FilterList as FilterIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Paper,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { FilterState } from '../../../types/landing-page';
import { FilterSidebarContent } from './filter-sidebar-content';
import { MobileFilterDrawer } from './mobile-filter-drawer';

interface FilterSidebarProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onFiltersChange,
    onApplyFilters,
    onResetFilters
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const handleOpenMobileFilter = () => {
        setMobileFilterOpen(true);
    };

    const handleCloseMobileFilter = () => {
        setMobileFilterOpen(false);
    };

    if (isMobile) {
        return (
            <>
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterIcon />}
                        onClick={handleOpenMobileFilter}
                        fullWidth
                        sx={{
                            py: 1.5,
                            borderRadius: '12px',
                            borderColor: '#E5E7EB',
                            color: '#043A66',
                            '&:hover': {
                                borderColor: '#4CAF50',
                                backgroundColor: 'rgba(76, 175, 80, 0.04)',
                            },
                        }}
                    >
                        Filters
                    </Button>
                </Box>

                <MobileFilterDrawer
                    isOpen={mobileFilterOpen}
                    onClose={handleCloseMobileFilter}
                    filters={filters}
                    onFiltersChange={onFiltersChange}
                    onApplyFilters={onApplyFilters}
                    onResetFilters={onResetFilters}
                />
            </>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: '20px',
                backgroundColor: '#fafafa',
                height: 'fit-content',
                position: 'sticky',
                top: '20px',
            }}
        >
            <FilterSidebarContent
                filters={filters}
                onFiltersChange={onFiltersChange}
                onApplyFilters={onApplyFilters}
                onResetFilters={onResetFilters}
            />
        </Paper>
    );
};