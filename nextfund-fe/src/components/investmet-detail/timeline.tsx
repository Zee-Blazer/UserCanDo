import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { TimelineEvent } from '../../types/landing-page';


export const InvestmentTimeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const hasEvents = Array.isArray(events) && events.length > 0;

    // Calculate progress: find the last completed event index
    const lastCompletedIndex = events.findLastIndex((event) => event.completed);
    const hasCompletedEvents = lastCompletedIndex !== -1;

    // Check if the first event (Funding round opens) has started
    // If the first event is not completed, no progress should be shown (all gray)
    const firstEventCompleted = events.length > 0 && events[0]?.completed;

    const totalEvents = events.length;
    const completedEvents = lastCompletedIndex + 1;

    // Calculate progress height more accurately
    //  need to calculate where to stop the green line based on completed events
    // IMPORTANT: Progress only starts once the first event (Funding round opens) is completed
    const calculateProgressHeight = (): string => {
        // If no events or first event hasn't started, show no progress (0%)
        if (totalEvents === 0 || !firstEventCompleted) return '0%';

        // If first event is completed, calculate progress based on completed events
        if (!hasCompletedEvents) return '0%';
        if (completedEvents === totalEvents) return '100%';

        // Calculate the percentage of the timeline that should be green
        //  want the green line to extend to the center of the last completed event's dot
        // Each event takes roughly equal space, so we calculate based on event index
        const progressRatio = completedEvents / totalEvents;

        // Convert to percentage
        return `${progressRatio * 100}%`;
    };

    const progressHeight = calculateProgressHeight();
    const shouldShowProgress = firstEventCompleted && hasCompletedEvents;

    return (
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    color: '#043A66'
                }}
            >
                Investment Timeline
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    color: '#043A66'
                }}
            >
                Expected milestones and timeline for this investment
            </Typography>

            {!hasEvents ? (
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6A6A6A',
                        fontSize: { xs: '0.85rem', md: '0.95rem' }
                    }}
                >
                    Investment milestones will appear here once they are available.
                </Typography>
            ) : (
                <Box sx={{ position: 'relative' }}>
                    {/* Background vertical line (gray - for incomplete portion) */}
                    <Box
                        sx={{
                            position: 'absolute',
                            left: '12px', // Center of the 24px dot
                            top: '24px', // Start from the center of first dot
                            bottom: '24px', // End at center of last dot
                            width: '3px',
                            bgcolor: '#E0E0E0',
                            zIndex: 0,
                        }}
                    />

                    {/* Progress vertical line (green - for completed portion) */}
                    {/* Only show green progress if the first event (Funding round opens) has started */}
                    {shouldShowProgress && (
                        <Box
                            sx={{
                                position: 'absolute',
                                left: '12px', // Center of the 24px dot
                                top: '24px', // Start from the center of first dot
                                width: '3px',
                                bgcolor: '#33CC33',
                                zIndex: 1,
                                // Calculate height based on completed events
                                // The height is a percentage of the available timeline space
                                // Available space = 100% - 48px (24px top + 24px bottom offset)
                                height: progressHeight === '100%'
                                    ? 'calc(100% - 48px)' // Full height minus top (24px) and bottom (24px) offsets
                                    : `calc((100% - 48px) * ${parseFloat(progressHeight) / 100})`, // Percentage of available height
                                transition: 'height 0.3s ease',
                            }}
                        />
                    )}

                    {events.map((event, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                position: 'relative',
                                mb: index === events.length - 1 ? 0 : { xs: 3, md: 4 }
                            }}
                        >
                            {/* Timeline dot */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    mr: 3,
                                    mt: 0.5,
                                    zIndex: 1
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        bgcolor: event.completed ? '#33CC33' : '#E0E0E0',
                                        border: `2px solid ${event.completed ? '#33CC33' : '#B0B0B0'}`,
                                        boxShadow: '0 0 0 4px #fff',
                                    }}
                                />
                            </Box>

                            {/* Content */}
                            <Box sx={{ flex: 1, pt: 0.25 }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{
                                        color: '#043A66',
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        mb: 0.5,
                                    }}
                                >
                                    {event.date}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{
                                        color: '#043A66',
                                        mb: 0.25,
                                        fontSize: { xs: '1rem', md: '1.1rem' }
                                    }}
                                >
                                    {event.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}
                                >
                                    {event.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};