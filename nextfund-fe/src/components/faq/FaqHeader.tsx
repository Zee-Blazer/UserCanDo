import { Search } from '@mui/icons-material';
import { Box, InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { Input } from '../General/ui/input';

interface FaqHeaderProps {
    searchValue: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FaqHeader: React.FC<FaqHeaderProps> = ({ searchValue, onSearchChange }) => {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#043A6614',
                px: { xs: 2, sm: 4 },
                py: { xs: 8, md: 10 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                variant="h3"
                className="font-neue-bold"
                sx={{
                    fontWeight: 700,
                    color: '#043A66',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    mb: 2,
                    textAlign: 'center',
                }}
            >
                Frequently Asked Questions
            </Typography>
            <Typography
                variant="subtitle1"
                className="font-neue-regular"
                sx={{
                    color: '#043A66',
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    mb: 4,
                    textAlign: 'center',
                    maxWidth: 600,
                }}
            >
                Find answers to common questions about investing with Nexfund, our process, and African markets.
            </Typography>
            <Box sx={{ width: { xs: '100%', sm: 260, md: 300 }, maxWidth: '100%' }}>
                <Input
                    placeholder="Search FAQs"
                    value={searchValue}
                    onChange={onSearchChange}
                    fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <Search sx={{ color: '#C0C3C7', fontSize: '1.25rem' }} />
                        </InputAdornment>
                    }
                    sx={{
                        borderRadius: '999px',
                        backgroundColor: '#fff',
                        boxShadow: 'none',
                        border: 'none',
                        height: 44,
                        minHeight: 44,
                        maxHeight: 44,
                        fontSize: '1rem',
                        px: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '999px',
                            backgroundColor: '#fff',
                            boxShadow: 'none',
                            border: 'none',
                            height: 44,
                            minHeight: 44,
                            maxHeight: 44,
                            fontSize: '1rem',
                            px: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none !important',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none !important',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none !important',
                            },
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none !important',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none !important',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none !important',
                        },
                        '& .MuiInputBase-input': {
                            color: '#A0A3A7',
                            fontSize: '1rem',
                            fontWeight: 400,
                            padding: '0 0',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: '#C0C3C7',
                            opacity: 1,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default FaqHeader; 