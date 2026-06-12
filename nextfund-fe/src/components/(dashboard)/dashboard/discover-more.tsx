import {
    Paper,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CustomButton } from '../../General/ui';


export const DiscoverMore: React.FC = () => {
    const router = useRouter();

    const handleBrowseOpportunities = () => {
        router.push('/dashboard/opportunities');
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                textAlign: 'center',
                height: 'fit-content',
                transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                },
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}>
                Discover More
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3, maxWidth: '300px', mx: 'auto' }}>
                Explore new investment opportunities that match your preferences.
            </Typography>
            <CustomButton
                variant="outline"
                fullWidth
                onClick={handleBrowseOpportunities}
                sx={{
                    border: '2px solid #33CC33',
                    color: '#33CC33',
                    borderRadius: '12px',
                    background: '#fff',
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&:hover': {
                        background: '#f6fef9',
                        borderColor: '#33CC33',
                    },
                }}
            >
                Browse opportunities
            </CustomButton>
        </Paper>
    );
};
