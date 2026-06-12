import { Box, IconButton, Link, MenuItem, Paper, Select, Typography } from '@mui/material';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { isProd } from '../../../utils/helpers';

interface AnalyticsChartCardProps {
    title: string;
    subtitle: string;
    period: string;
    onPeriodChange: (period: string) => void;
    onExpand: () => void;
    children: ReactNode;
    index: number;
}

export const AnalyticsChartCard: React.FC<AnalyticsChartCardProps> = ({
    title,
    subtitle,
    period,
    onPeriodChange,
    onExpand,
    children,
    index,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '18px',
                p: 0,
                background: '#fafbfc',
                border: '1px solid #e0e0e0',
                minHeight: { xs: 420, sm: 480, md: 520, lg: 550 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 0,
                    px: { xs: 2, sm: 2.5, md: 3 },
                    pt: { xs: 2, sm: 2.5, md: 2.5 },
                    pb: { xs: 1.5, sm: 1.7, md: 1.7 },
                    borderBottom: '1.5px solid #F2F2F2',
                    background: '#FAFAFA',
                    borderTopLeftRadius: '18px',
                    borderTopRightRadius: '18px',
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            color: '#181818',
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                            mb: 0.5,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Select
                        value={period}
                        onChange={(e) => onPeriodChange(e.target.value as string)}
                        size="small"
                        sx={{
                            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                            borderRadius: '8px',
                            background: '#fff',
                            minWidth: { xs: 70, sm: 80, md: 80 },
                            height: { xs: 32, sm: 36, md: 36 },
                            '.MuiSelect-select': { py: 0.5 },
                        }}
                    >
                        <MenuItem value="Month">Month</MenuItem>
                    </Select>
                    <IconButton
                        size="small"
                        onClick={onExpand}
                        sx={{
                            width: { xs: 28, sm: 32, md: 36 },
                            height: { xs: 28, sm: 32, md: 36 },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        <Image
                            src="/expand.png"
                            alt="Expand"
                            width={20}
                            height={20}
                        />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    flex: 1,
                    minHeight: { xs: 280, sm: 320, md: 360 },
                    mb: 1,
                    px: { xs: 1.5, sm: 2, md: 3 },
                    pt: { xs: 1, sm: 1.5, md: 2 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: index === 1 ? 'visible' : 'hidden', // Only Investment Allocation needs visible overflow for labels
                }}
            >
                {children}
            </Box>
            {!isProd && (
                <Box
                    sx={{
                        textAlign: 'center',
                        mt: 1,
                        pb: { xs: 2, sm: 2.5, md: 2.5 },
                    }}
                >
                    <Link
                        href="#"
                        underline="always"
                        sx={{
                            color: '#33CC33',
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.05rem' },
                            textDecorationColor: '#33CC33',
                            textUnderlineOffset: '3px',
                            '&:hover': { textDecorationColor: '#28a428' },
                        }}
                    >
                        View details
                    </Link>
                </Box>
            )}
        </Paper>
    );
};

