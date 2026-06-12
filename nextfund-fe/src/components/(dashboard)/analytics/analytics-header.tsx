import { Box, IconButton, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Image from 'next/image';
import React, { useState } from 'react';

export const AnalyticsHeader: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState<Date | null>(new Date('2025-12-31'));

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    mb: 4,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 3, sm: 0 },
                    width: '100%',
                }}
            >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                            fontSize: { xs: '1.3rem', sm: '2rem' },
                            wordBreak: 'break-word',
                        }}
                    >
                        Analytics
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            mt: 0.5,
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                        }}
                    >
                        Track your investment performance
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, sm: 1.5 },
                        flexWrap: { xs: 'wrap', sm: 'nowrap' },
                        justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                        width: { xs: '100%', sm: 'auto' },
                        mt: { xs: 2, sm: 0 },
                    }}
                >
                    <IconButton size="small">
                        <Image src="/refresh.png" alt="Refresh" width={20} height={20} />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                        Refresh
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            border: '1px solid #e0e0e0',
                            borderRadius: '10px',
                            px: { xs: 1, sm: 2 },
                            py: { xs: 0.5, sm: 1 },
                            backgroundColor: '#fff',
                            minWidth: { xs: 0, sm: 310 },
                            maxWidth: { xs: '100%', sm: 300 },
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        <DatePicker
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            format="MM/dd/yyyy"
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    InputProps: {
                                        disableUnderline: true,
                                        sx: {
                                            fontSize: { xs: '0.95rem', sm: '14px' },
                                            color: '#666',
                                            '& input': {
                                                padding: 0,
                                                border: 'none',
                                                outline: 'none',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                        <Image src="/Swap.png" alt="Arrow" width={16} height={16} />
                        <DatePicker
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            format="MM/dd/yyyy"
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    InputProps: {
                                        disableUnderline: true,
                                        sx: {
                                            fontSize: { xs: '0.95rem', sm: '14px' },
                                            color: '#666',
                                            '& input': {
                                                padding: 0,
                                                border: 'none',
                                                outline: 'none',
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default AnalyticsHeader; 