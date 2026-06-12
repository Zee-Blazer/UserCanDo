'use client';

import {
    Box,
    Grid,
    Typography
} from '@mui/material';
import { InvestmentCard } from '../../(dashboard)/dashboard/investment-card';
import { INVESTMENTS } from '../../../constants';

const BusinessOpportunitiesPage = () => {
    const dealFlowOpportunities = INVESTMENTS.slice(0, 6);

    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    Deal Flow
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    Track potential investment opportunities and their progress
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {dealFlowOpportunities.map((investment) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={investment.id}>
                        <InvestmentCard investment={investment} isRecommended />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BusinessOpportunitiesPage; 