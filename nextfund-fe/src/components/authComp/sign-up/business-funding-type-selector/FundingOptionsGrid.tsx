import { Box } from '@mui/material';
import React from 'react';
import { FundingOptionCard } from './FundingOptionCard';
import type { FundingOptionsGridProps } from './types';

export const FundingOptionsGrid: React.FC<FundingOptionsGridProps> = ({
    fundingOptions,
    selectedFunding,
    onFundingToggle
}) => {
    return (
        <Box sx={{ mb: { xs: 4, sm: 5 } }}>
            {fundingOptions.map((option) => (
                <FundingOptionCard
                    key={option.id}
                    option={option}
                    isSelected={selectedFunding === option.id}
                    onToggle={onFundingToggle}
                />
            ))}
        </Box>
    );
};
