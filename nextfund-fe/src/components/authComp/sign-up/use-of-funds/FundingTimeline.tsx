import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { TimelineEvent } from '../../../../types/landing-page';
import { InfoTooltip } from '../../../General/ui';

interface TimelineData {
    expectedFundingCompletion: string;
    fundsDeploymentTimeline: string;
}

interface FundingTimelineProps {
    data: TimelineData;
    onTimelineChange: (field: keyof TimelineData, value: string) => void;
    // Optional: for when timeline data comes from API after login
    timelineEvents?: TimelineEvent[];
    // Optional: business approval date (when business is approved, this becomes the funding round start date)
    businessApprovalDate?: string;
}

interface Milestone {
    date: string;
    title: string;
    description: string;
    completed: boolean;
}

export const FundingTimeline: React.FC<FundingTimelineProps> = ({
    data,
    onTimelineChange,
    timelineEvents,
    businessApprovalDate
}) => {
    const [isDateValid, setIsDateValid] = useState(true);
    const [showDateError, setShowDateError] = useState(false);


    const getTomorrowString = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Validate date when it changes
    useEffect(() => {
        if (data.expectedFundingCompletion) {
            const selectedDate = new Date(data.expectedFundingCompletion);
            const today = new Date();
            today.setHours(0, 0, 0, 0);


            const isValid = selectedDate > today;
            setIsDateValid(isValid);
            setShowDateError(!isValid);
        } else {
            setIsDateValid(true);
            setShowDateError(false);
        }
    }, [data.expectedFundingCompletion]);

    // Calculate milestone dates based on form data
    const calculatedMilestones = useMemo((): Milestone[] => {
        if (!data.expectedFundingCompletion) {
            return [];
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // expectedFundingCompletion = Investment closing date (when funding round ends/closes)
        // NOT the start date - this is the date when the investment round completes
        const expectedCompletion = new Date(data.expectedFundingCompletion);
        expectedCompletion.setHours(0, 0, 0, 0);

        // Funding round START date:
        // - If business is approved: use businessApprovalDate (from API) as the actual start
        // - If not yet approved: estimate start as 3 months before closing date (preview only)
        let fundingRoundStart: Date;
        if (businessApprovalDate) {
            // Business is approved - use actual approval date as funding round start
            fundingRoundStart = new Date(businessApprovalDate);
            fundingRoundStart.setHours(0, 0, 0, 0);
        } else {
            // Not yet approved - estimate start date as 3 months before closing date
            // This is just a preview and will update once business is approved
            fundingRoundStart = new Date(expectedCompletion);
            fundingRoundStart.setMonth(fundingRoundStart.getMonth() - 3);
        }

        // Due diligence period: 2 months after funding round opens (start)
        const dueDiligenceDate = new Date(fundingRoundStart);
        dueDiligenceDate.setMonth(dueDiligenceDate.getMonth() + 2);

        // Investment closing: expectedFundingCompletion date (this is the CLOSING date)
        const closingDate = new Date(expectedCompletion);

        // Funds disbursement: 1 month after closing
        const disbursementDate = new Date(closingDate);
        disbursementDate.setMonth(disbursementDate.getMonth() + 1);

        // Expansion: Q4 of the year after closing (October of next year)
        const expansionYear = closingDate.getFullYear();
        const expansionDate = new Date(expansionYear + 1, 9, 1); // October 1st of next year

        // Production enhancement: Q1 of the year after disbursement (January of next year)
        const productionYear = disbursementDate.getFullYear();
        const productionDate = new Date(productionYear + 1, 0, 1); // January 1st of next year

        // Helper function to format date for display
        const formatDate = (date: Date): string => {
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            return `${month} ${year}`;
        };

        // Helper function to format quarter
        const formatQuarter = (date: Date): string => {
            const quarter = Math.floor(date.getMonth() / 3) + 1;
            const year = date.getFullYear();
            return `Q${quarter} ${year}`;
        };

        // Determine which milestones are completed based on current date
        // Only mark as completed if business is approved (has businessApprovalDate)
        const milestones: Milestone[] = [
            {
                date: formatDate(fundingRoundStart),
                title: 'Funding round opens',
                description: businessApprovalDate ? '' : '(Estimated - will update upon approval)',
                completed: businessApprovalDate ? today >= fundingRoundStart : false
            },
            {
                date: formatDate(dueDiligenceDate),
                title: 'Due diligence period',
                description: '',
                completed: businessApprovalDate ? today >= dueDiligenceDate : false
            },
            {
                date: formatDate(closingDate),
                title: 'Investment closing',
                description: '',
                completed: businessApprovalDate ? today >= closingDate : false
            },
            {
                date: formatDate(disbursementDate),
                title: 'Funds disbursement',
                description: '',
                completed: businessApprovalDate ? today >= disbursementDate : false
            },
            {
                date: formatQuarter(expansionDate),
                title: 'Expansion to Nigeria',
                description: '',
                completed: businessApprovalDate ? today >= expansionDate : false
            },
            {
                date: formatQuarter(productionDate),
                title: 'Production enhancement',
                description: '',
                completed: businessApprovalDate ? today >= productionDate : false
            }
        ];

        return milestones;
    }, [data.expectedFundingCompletion, businessApprovalDate]);

    // Use API data if provided, otherwise use calculated milestones
    const displayMilestones = useMemo((): TimelineEvent[] => {
        if (timelineEvents && timelineEvents.length > 0) {
            return timelineEvents;
        }
        return calculatedMilestones.map(m => ({
            date: m.date,
            title: m.title,
            description: m.description,
            completed: m.completed
        }));
    }, [timelineEvents, calculatedMilestones]);

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Timeline
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                            color: '#666',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Expected Funding Completion (Closing Date) <span style={{ color: '#f87171' }}>*</span>
                        <InfoTooltip
                            title={FORM_TOOLTIPS.expectedFundingCompletion.title}
                            description={FORM_TOOLTIPS.expectedFundingCompletion.description}
                            placement="right"
                        />
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={data.expectedFundingCompletion}
                        onChange={(e) => onTimelineChange('expectedFundingCompletion', e.target.value)}
                        inputProps={{
                            min: getTomorrowString()
                        }}
                        error={showDateError}
                        helperText={showDateError ? "Expected funding completion date must be greater than today" : ""}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& fieldset': {
                                    borderColor: showDateError ? '#f87171' : '#e0e0e0'
                                },
                                '&:hover fieldset': {
                                    borderColor: showDateError ? '#f87171' : '#ddd'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: showDateError ? '#f87171' : '#4CAF50'
                                }
                            }
                        }}
                    />
                </Box>

                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1,
                            fontWeight: 500,
                            color: '#666',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Funds Deployment Timeline (months) <span style={{ color: '#f87171' }}>*</span>
                        <InfoTooltip
                            title={FORM_TOOLTIPS.fundsDeploymentTimeline.title}
                            description={FORM_TOOLTIPS.fundsDeploymentTimeline.description}
                            placement="right"
                        />
                    </Typography>
                    <TextField
                        fullWidth
                        value={data.fundsDeploymentTimeline}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            onTimelineChange('fundsDeploymentTimeline', value);
                        }}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                                e.preventDefault();
                            }
                        }}
                        placeholder="e.g., 12"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& fieldset': {
                                    borderColor: '#e0e0e0'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#ddd'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#4CAF50'
                                }
                            }
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
