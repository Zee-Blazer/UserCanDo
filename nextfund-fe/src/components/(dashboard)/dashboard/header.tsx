import {
    Box,
    IconButton,
    Typography
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import Image from 'next/image';
import React, { useState } from 'react';

interface screenProps {
    title: string;
    subTitle: string;
}

interface DashboardHeaderProps {
    userName?: string;
    screen?: screenProps;
    refreshLoading?: boolean;
    refreshDataFunc?: () => void;
    onDateRangeChange?: (startDate: string | null, endDate: string | null) => void;
    onResetDates?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, screen, refreshDataFunc, refreshLoading, onDateRangeChange, onResetDates }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const today = new Date();

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return format(date, 'MM/dd/yyyy');
    };

    const formatDateForAPI = (date: Date | null) => {
        if (!date) return null;
        return format(date, 'yyyy-MM-dd');
    };

    const handleStartDateChange = (newValue: Date | null) => {
        let adjustedStart = newValue;
        let adjustedEnd = endDate;

        if (adjustedStart && adjustedEnd && adjustedStart > adjustedEnd) {
            adjustedEnd = adjustedStart;
            setEndDate(adjustedEnd);
        }

        setStartDate(adjustedStart);
        if (onDateRangeChange) {
            onDateRangeChange(formatDateForAPI(adjustedStart), formatDateForAPI(adjustedEnd));
        }
    };

    const handleRefreshClick = () => {
        // Reset local date state
        setStartDate(null);
        setEndDate(null);

        // Reset parent date range state first
        if (onResetDates) {
            onResetDates();
        }

        // Trigger data refresh
        if (refreshDataFunc) {
            // Use requestAnimationFrame to ensure state updates complete before refetch
            requestAnimationFrame(() => {
                refreshDataFunc();
            });
        }
    };

    const handleEndDateChange = (newValue: Date | null) => {
        let adjustedEnd = newValue;
        let adjustedStart = startDate;

        if (adjustedEnd && adjustedStart && adjustedEnd < adjustedStart) {
            adjustedStart = adjustedEnd;
            setStartDate(adjustedStart);
        }

        setEndDate(adjustedEnd);
        if (onDateRangeChange) {
            onDateRangeChange(formatDateForAPI(adjustedStart), formatDateForAPI(adjustedEnd));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    mb: 4,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 3, sm: 0 },
                    width: '100%',
                }}
            >
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    {screen ? (
                        <>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    fontSize: { xs: '1.3rem', sm: '2rem' },
                                    wordBreak: 'break-word',
                                }}
                            >
                                {screen.title},
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666',
                                    mt: 0.5,
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                }}
                            >
                                {screen.subTitle}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    fontSize: { xs: '1.3rem', sm: '2rem' },
                                    wordBreak: 'break-word',
                                }}
                            >
                                Hi {userName},
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666',
                                    mt: 0.5,
                                    fontSize: { xs: '0.95rem', sm: '1rem' },
                                }}
                            >
                                Welcome to your dashboard
                            </Typography>
                        </>
                    )}
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
                    <div
                        className='flex cursor-pointer'
                        onClick={handleRefreshClick}
                    >
                        <IconButton size="small" >
                            <Image src="/refresh.png" alt="Refresh" width={20} height={20} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                            {refreshLoading ? 'Refreshing...' : 'Refresh'}
                        </Typography>
                    </div>
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
                            onChange={handleStartDateChange}
                            format="MM/dd/yyyy"
                            maxDate={endDate ?? today}
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
                            onChange={handleEndDateChange}
                            format="MM/dd/yyyy"
                            minDate={startDate ?? undefined}
                            maxDate={today}
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