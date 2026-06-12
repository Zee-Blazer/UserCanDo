import React from 'react';
import { Box, Typography, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Input } from './input';


interface SearchHeaderProps {
    title: string;
    subtitle: string;
    searchPlaceholder ?: string;
    searchValue ?: string;
    onSearchChange ?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchWidth ?: any; // Accepts system props for width
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
    title,
    subtitle,
    searchPlaceholder = "Search for investment...",
    searchValue = "",
    onSearchChange,
    searchWidth
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mb: 4,
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 3, md: 2 },
                width: '100%',
            }}
        >
            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        mb: 0.5,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: '#666',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>

            <Box
                sx={{
                    width: searchWidth || { xs: '100%', md: '350px' },
                    maxWidth: '100%',
                }}
            >
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={onSearchChange}
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <Search sx={{ color: '#6c757d', fontSize: '1.25rem' }} />
                        </InputAdornment>
                    }
                />
            </Box>
        </Box>
    );
};