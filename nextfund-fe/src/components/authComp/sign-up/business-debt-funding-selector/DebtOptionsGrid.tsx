import { Box, Typography } from '@mui/material';
import React from 'react';
import { DebtOptionCard } from './DebtOptionCard';
import type { DebtOptionsGridProps } from './types';

export const DebtOptionsGrid: React.FC<DebtOptionsGridProps> = ({
    debtOptions,
    onOptionToggle
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
            >
                Preferred Instrument Type: *
            </Typography>

            {/* Debt Funding Options */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6 }}>
                {debtOptions.map((option) => (
                    <DebtOptionCard
                        key={option.id}
                        option={option}
                        onToggle={onOptionToggle}
                    />
                ))}
            </Box>
        </Box>
    );
};
