import { Box, Typography } from '@mui/material';
import React from 'react';

interface CustomRadioButtonProps {
    options: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    label: string;
    error?: string;
}

export const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
    options,
    selectedValue,
    onValueChange,
    label,
    error
}) => {
    return (
        <Box>
            <Typography
                variant="body2"
                sx={{
                    mb: 1,
                    color: '#666',
                    fontWeight: 500,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                }}
            >
                {label}
            </Typography>
            <Box sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                p: { xs: 2, sm: 2.5 },
                backgroundColor: '#fff'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 2, sm: options.length > 2 ? 4 : 3 }, 
                    flexWrap: 'wrap' 
                }}>
                    {options.map((option) => (
                        <Box
                            key={option}
                            onClick={() => onValueChange(option)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {/* Radio button */}
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: selectedValue === option ? '#4CAF50' : '#ddd',
                                    backgroundColor: selectedValue === option ? '#4CAF50' : '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 1.5,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {selectedValue === option && (
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
                            <Typography
                                variant="body2"
                                sx={{
                                    color: selectedValue === option ? '#333' : '#666',
                                    fontWeight: selectedValue === option ? 600 : 500,
                                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                }}
                            >
                                {option}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            {error && (
                <Typography
                    variant="caption"
                    sx={{ color: '#d32f2f', mt: 1, display: 'block', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                >
                    {error}
                </Typography>
            )}
        </Box>
    );
};
