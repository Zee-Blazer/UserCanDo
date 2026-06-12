import { Business, Person } from '@mui/icons-material';
import {
    Box,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';


export const UserTypeSelector: React.FC<{
    selectedType: 'investor' | 'business';
    onTypeChange: (type: 'investor' | 'business') => void;
}> = ({ selectedType, onTypeChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ mb: 3 }}>
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '25px',
                    p: 0.5,
                    display: 'flex',
                }}
            >
                <Box
                    onClick={() => onTypeChange('investor')}
                    sx={{
                        flex: 1,
                        py: 1.5,
                        px: { xs: 2, sm: 3 },
                        borderRadius: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedType === 'investor' ? 'white' : 'transparent',
                        boxShadow: selectedType === 'investor' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <Person sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: '#666' }} />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: selectedType === 'investor' ? 600 : 400,
                            color: selectedType === 'investor' ? '#333' : '#666',
                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                        }}
                    >
                        Investor
                    </Typography>
                </Box>
                <Box
                    onClick={() => onTypeChange('business')}
                    sx={{
                        flex: 1,
                        py: 1.5,
                        px: { xs: 2, sm: 3 },
                        borderRadius: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        backgroundColor: selectedType === 'business' ? 'white' : 'transparent',
                        boxShadow: selectedType === 'business' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <Business sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, color: '#666' }} />
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: selectedType === 'business' ? 600 : 400,
                            color: selectedType === 'business' ? '#333' : '#666',
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                        }}
                    >
                        Business
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};