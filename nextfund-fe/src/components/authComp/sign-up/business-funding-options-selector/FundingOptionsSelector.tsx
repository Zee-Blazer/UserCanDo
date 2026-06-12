import { Check } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { FundingOption } from './types';

interface FundingOptionsSelectorProps {
    fundingOptions: FundingOption[];
    onOptionToggle: (optionId: string) => void;
}

export const FundingOptionsSelector: React.FC<FundingOptionsSelectorProps> = ({
    fundingOptions,
    onOptionToggle
}) => {
    return (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: { xs: 2, sm: 3 },
                    color: '#333',
                    fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
            >
                Preferred Instrument Type:
            </Typography>

            {/* Funding Options */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
                {fundingOptions.map((option) => (
                    <Box
                        key={option.id}
                        onClick={() => onOptionToggle(option.id)}
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            position: 'relative',
                            p: { xs: 2, sm: 2.5 },
                            border: '1px solid #e0e0e0',
                            borderRadius: { xs: '12px', sm: '16px' },
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: option.selected ? '#f8f9ff' : 'white',
                            borderColor: option.selected ? '#4CAF50' : '#e0e0e0',
                            '&:hover': {
                                borderColor: '#4CAF50',
                                backgroundColor: option.selected ? '#f8f9ff' : '#fafafa',
                            },
                        }}
                    >
                        {/* Content */}
                        <Box sx={{ flex: 1, pr: { xs: 2, sm: 3 } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    mb: { xs: 0.5, sm: 1 },
                                    color: '#333',
                                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                                    lineHeight: 1.3,
                                }}
                            >
                                {option.title}
                            </Typography>
                            <Box component="ul" sx={{
                                margin: 0,
                                paddingLeft: { xs: 1.5, sm: 2 },
                                listStyleType: 'disc',
                                listStylePosition: 'outside'
                            }}>
                                {option.description.map((desc, index) => (
                                    <Typography
                                        key={index}
                                        component="li"
                                        variant="body2"
                                        sx={{
                                            color: '#666',
                                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                            lineHeight: 1.4,
                                            mb: index < option.description.length - 1 ? 0.3 : 0,
                                            display: 'list-item',
                                            '&::marker': {
                                                color: '#666'
                                            }
                                        }}
                                    >
                                        {desc}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        {/* Custom checkbox - positioned at top right */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: { xs: 16, sm: 20 },
                                right: { xs: 16, sm: 20 },
                                width: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                borderRadius: '50%',
                                backgroundColor: option.selected ? '#4CAF50' : '#6A6A6A26',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.2s ease',
                                border: '1px solid rgba(106, 106, 106, 0.15)',
                            }}
                        >
                            {option.selected && (
                                <Check
                                    sx={{
                                        fontSize: { xs: '1rem', sm: '1.2rem' },
                                        color: 'white',
                                        fontWeight: 600,
                                        strokeWidth: 2,
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
