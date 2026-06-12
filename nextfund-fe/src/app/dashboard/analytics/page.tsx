'use client';

import { Box, Container } from '@mui/material';
import React from 'react';
import AnalyticsChartsGrid from '../../../components/(dashboard)/analytics/analytics-charts-grid';
import AnalyticsHeader from '../../../components/(dashboard)/analytics/analytics-header';
import { isProd } from '../../../utils/helpers';

const AnalysisPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa', py: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
            <Container maxWidth="xl">
                <Box sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
                    {/* NOT PROD READY */}
                    {!isProd && (
                        <>
                            <AnalyticsHeader />
                            <AnalyticsChartsGrid />
                        </>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default AnalysisPage;
