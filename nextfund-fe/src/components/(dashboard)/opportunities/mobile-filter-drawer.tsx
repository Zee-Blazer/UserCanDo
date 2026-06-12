'use client';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import React from 'react';
import { FilterState } from '../../../types/landing-page';
import { FilterSidebarContent } from './filter-sidebar-content';

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onApplyFilters?: () => void;
    onResetFilters?: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    onApplyFilters,
    onResetFilters
}) => {
    return (
        <Drawer
            anchor="bottom"
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    maxHeight: '90vh',
                }
            }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB' }}>
                <Typography variant="h6" fontWeight={600}>Filters</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ p: 2, overflowY: 'auto' }}>
                <FilterSidebarContent
                    filters={filters}
                    onFiltersChange={onFiltersChange}
                    onClose={onClose}
                    onApplyFilters={onApplyFilters}
                    onResetFilters={onResetFilters}
                />
            </Box>
        </Drawer>
    );
};