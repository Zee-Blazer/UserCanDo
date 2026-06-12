import { Box, Typography } from '@mui/material';
import React from 'react';
import type { DebtOptionCardProps } from './types';

export const DebtOptionCard: React.FC<DebtOptionCardProps> = ({ option, onToggle }) => {
    return (
        <Box
            onClick={() => onToggle(option.id)}
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: 3,
                border: option.selected ? '2px solid #4CAF50' : '1px solid #e0e0e0',
                borderRadius: '12px',
                backgroundColor: option.selected ? '#f8fff8' : '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: option.selected ? '#4CAF50' : '#ddd',
                    backgroundColor: '#f8f9fa'
                }
            }}
        >
            {/* Custom Checkbox */}
            <Box
                sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: option.selected ? '#4CAF50' : '#e0e0e0',
                    backgroundColor: option.selected ? '#4CAF50' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    mt: 0.5,
                    flexShrink: 0,
                    transition: 'all 0.2s ease-in-out',
                    position: 'relative'
                }}
            >
                {option.selected && (
                    <Box
                        sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#fff'
                        }}
                    />
                )}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: '#333',
                        fontSize: { xs: '1rem', sm: '1.1rem' }
                    }}
                >
                    {option.title}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {option.description.map((desc, index) => (
                        <Typography
                            key={index}
                            component="li"
                            variant="body2"
                            sx={{
                                color: '#666',
                                mb: 0.5,
                                fontSize: { xs: '0.85rem', sm: '0.9rem' }
                            }}
                        >
                            {desc}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
