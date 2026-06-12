import { AccountBalanceWallet } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { COLORS } from '../../../constants/colors';
import { Investment } from '../../../types/landing-page';
import { InvestmentPortfolioCard } from './investment-portfolio-card';

type InvestmentStatus = 'ACTIVE' | 'IN PROGRESS' | 'EXITED';

interface ExtendedInvestment extends Investment {
    status: InvestmentStatus;
    amountInvested: number;
    investedDate: string;
    dueDiligenceStatus?: string;
}

interface InvestmentsGridProps {
    investments: ExtendedInvestment[];
}

export const InvestmentsGrid: React.FC<InvestmentsGridProps> = ({ investments }) => {
    if (investments.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center',
                }}
            >
                {/* Wallet Icon with Sidebar Active Background */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: COLORS.primaryLight,
                        mb: 3,
                    }}
                >
                    <AccountBalanceWallet
                        sx={{
                            fontSize: '2rem',
                            color: COLORS.primary
                        }}
                    />
                </Box>

                {/* Main Heading */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1F2937',
                        mb: 2,
                        fontWeight: 600,
                        fontSize: '1.25rem',
                    }}
                >
                    You haven't made any investments yet.
                </Typography>

                {/* Descriptive Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6B7280',
                        maxWidth: '400px',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                    }}
                >
                    Once you invest in a business, your portfolio performance and returns will appear here.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={{ xs: 2, sm: 2, md: 3, lg: 4 }}>
            {investments.map((investment, index) => {
                const uniqueKey = investment.id || `investment-${index}`;

                return (
                    <Grid
                        key={uniqueKey}
                        size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                    >
                        <InvestmentPortfolioCard
                            investment={investment}
                            status={investment.status}
                            amountInvested={investment.amountInvested}
                            investedDate={investment.investedDate}
                            dueDiligenceStatus={investment.dueDiligenceStatus}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};