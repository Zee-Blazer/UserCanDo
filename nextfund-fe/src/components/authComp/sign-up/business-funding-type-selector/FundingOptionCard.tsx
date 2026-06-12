import { Check } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import type { FundingOptionCardProps } from './types';

export const FundingOptionCard: React.FC<FundingOptionCardProps> = ({
    option,
    isSelected,
    onToggle
}) => {
    return (
        <Box
            onClick={() => onToggle(option.id)}
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative',
                p: { xs: 2, sm: 2.5 },
                mb: { xs: 1.5, sm: 2 },
                border: '1px solid #e0e0e0',
                borderRadius: { xs: '12px', sm: '16px' },
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isSelected ? '#f8f9ff' : 'white',
                borderColor: isSelected ? '#4CAF50' : '#e0e0e0',
                '&:hover': {
                    borderColor: '#4CAF50',
                    backgroundColor: isSelected ? '#f8f9ff' : '#fafafa',
                },
            }}
        >
            {/* Content */}
            <Box sx={{ flex: 1, pr: { xs: 2, sm: 3 } }}>
                <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: '#333',
                            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                            lineHeight: 1.3,
                            mb: option.subtitle ? 0.25 : 0,
                        }}
                    >
                        {option.title}
                    </Typography>
                    {option.subtitle && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                fontStyle: 'italic',
                            }}
                        >
                            {option.subtitle}
                        </Typography>
                    )}
                </Box>

                <Box component="ul" sx={{
                    margin: 0,
                    paddingLeft: { xs: 1.5, sm: 2 },
                    listStyleType: 'disc',
                    listStylePosition: 'outside'
                }}>
                    {option.description.map((item, itemIndex) => (
                        <Typography
                            key={itemIndex}
                            component="li"
                            variant="body2"
                            sx={{
                                color: '#666',
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                lineHeight: 1.4,
                                mb: itemIndex < option.description.length - 1 ? 0.3 : 0,
                                display: 'list-item',
                                '&::marker': {
                                    color: '#666'
                                }
                            }}
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
            </Box>

            {/* Custom checkbox */}
            <Box
                sx={{
                    position: 'absolute',
                    top: { xs: 16, sm: 20 },
                    right: { xs: 16, sm: 20 },
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#4CAF50' : '#6A6A6A26',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    border: '1px solid rgba(106, 106, 106, 0.15)',
                }}
            >
                {isSelected && (
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
    );
};
