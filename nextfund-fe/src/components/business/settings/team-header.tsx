"use client";

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface TeamHeaderProps {
    count: number;
    onAddClick: () => void;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ count, onAddClick }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1E1E1E', fontSize: '1.125rem' }}>
                    Team Management
                </Typography>
                <Typography variant="body2" sx={{ color: '#6A6A6A', fontSize: '0.875rem', mt: 0.5 }}>
                    {count > 0 ? `Manage ${count} team member${count !== 1 ? 's' : ''}` : 'Add your team members'}
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={onAddClick}
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: '#043A66',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#032A4D' }
                }}
            >
                Add Member
            </Button>
        </Box>
    );
};
