import { Box, Typography } from '@mui/material';
import React from 'react';

interface StyledRadioButtonProps {
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
    label: string;
    disabled?: boolean;
}

export const StyledRadioButton: React.FC<StyledRadioButtonProps> = ({ 
    value, 
    selectedValue, 
    onChange, 
    label, 
    disabled = false 
}) => (
    <Box
        onClick={() => !disabled && onChange(value)}
        sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            backgroundColor: selectedValue === value ? '#f0f7ff' : 'white',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            '&:hover': {
                backgroundColor: !disabled ? (selectedValue === value ? '#f0f7ff' : '#f5f5f5') : undefined,
            },
        }}
    >
        <Box
            sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid #4CAF50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedValue === value ? '#4CAF50' : 'transparent',
            }}
        >
            {selectedValue === value && (
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                    }}
                />
            )}
        </Box>
        <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
            {label}
        </Typography>
    </Box>
);
