import { Chip } from '@mui/material';
import React from 'react';

type InvestmentStatus = 'ACTIVE' | 'IN PROGRESS' | 'EXITED';

interface InvestmentStatusChipProps {
    status: InvestmentStatus;
}

export const InvestmentStatusChip: React.FC<InvestmentStatusChipProps> = ({ status }) => {
    const getStatusStyles = (status: InvestmentStatus) => {
        switch (status) {
            case 'ACTIVE':
                return {
                    backgroundColor: '#33CC3314',
                    color: '#33CC33',
                    border: '1px solid #33CC33',
                };
            case 'IN PROGRESS':
                return {
                    backgroundColor: '#FFB1211A',
                    color: '#FFB121',
                    border: '1px solid #FFB121',
                };
            case 'EXITED':
                return {
                    backgroundColor: '#FF3F211A',
                    color: '#FF3F21',
                    border: '1px solid #FF3F21',
                };
            default:
                return {
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    border: '1px solid #dee2e6',
                };
        }
    };

    return (
        <Chip
            label={status}
            size="small"
            sx={{
                ...getStatusStyles(status),
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                fontWeight: 600,
                height: { xs: 20, sm: 24 },
                borderRadius: '2px',
                '& .MuiChip-label': {
                    px: { xs: 1, sm: 1.5 },
                },
            }}
        />
    );
};