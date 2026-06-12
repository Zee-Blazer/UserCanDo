import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface CustomTextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    tooltipComponent?: React.ReactNode;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
    label,
    value,
    onChange,
    placeholder,
    tooltipComponent
}) => {
    return (
        <Box>
            <Typography
                variant="body2"
                sx={{
                    mb: 1,
                    color: '#666',
                    fontWeight: 500,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {label}
                {tooltipComponent}
            </Typography>
            <TextField
                fullWidth
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                        fontSize: { xs: '0.85rem', sm: '0.9rem' },
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
    );
};
