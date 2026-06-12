'use client';

import {
    Box,
    Grid,
    Typography
} from '@mui/material';
import { InvestmentCard } from '../../(dashboard)/dashboard/investment-card';
import { INVESTMENTS } from '../../../constants';

const BusinessInvestmentsPage = () => {
    const portfolioInvestments = INVESTMENTS.slice(0, 6);

    return (
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    Portfolio Management
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    Manage and track your investment portfolio performance
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {portfolioInvestments.map((investment) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={investment.id}>
                        <InvestmentCard investment={investment} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BusinessInvestmentsPage; 