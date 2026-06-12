import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { CARD_SUBTITLES, CARD_TITLES } from '../../../constants/chart-data';
import { AnalyticsChartCard } from './analytics-chart-card';
import { ChartRenderer } from './chart-renderer';
import { ExpandedChartModal } from './expanded-chart-modal';

export const AnalyticsChartsGrid: React.FC = () => {
    const [period, setPeriod] = useState('Month');
    const [expandedChart, setExpandedChart] = useState<number | null>(null);

    const handleExpandChart = (index: number) => {
        setExpandedChart(index);
    };

    const handleCloseExpanded = () => {
        setExpandedChart(null);
    };

    const handlePeriodChange = (newPeriod: string) => {
        setPeriod(newPeriod);
    };

    return (
        <>
            <Grid container spacing={{ xs: 2, sm: 2, md: 3, lg: 3 }}>
                {CARD_TITLES.map((title, idx) => (
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} key={idx}>
                        <AnalyticsChartCard
                            title={title}
                            subtitle={CARD_SUBTITLES[idx]}
                            period={period}
                            onPeriodChange={handlePeriodChange}
                            onExpand={() => handleExpandChart(idx)}
                            index={idx}
                        >
                            <ChartRenderer chartIndex={idx} />
                        </AnalyticsChartCard>
                    </Grid>
                ))}
            </Grid>

            <ExpandedChartModal
                open={expandedChart !== null}
                onClose={handleCloseExpanded}
                chartIndex={expandedChart}
            >
                {expandedChart !== null && <ChartRenderer chartIndex={expandedChart} />}
            </ExpandedChartModal>
        </>
    );
};

export default AnalyticsChartsGrid;
