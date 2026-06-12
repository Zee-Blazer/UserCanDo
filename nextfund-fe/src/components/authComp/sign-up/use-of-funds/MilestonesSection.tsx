import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface MilestonesSectionProps {
    milestones: string;
    onMilestonesChange: (value: string) => void;
}

export const MilestonesSection: React.FC<MilestonesSectionProps> = ({
    milestones,
    onMilestonesChange
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Milestones
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: '#666',
                    fontSize: '0.875rem'
                }}
            >
                Key milestones to achieve with this funding <span style={{ color: '#f87171' }}>*</span>
            </Typography>
            <TextField
                fullWidth
                multiline
                rows={4}
                value={milestones}
                onChange={(e) => onMilestonesChange(e.target.value)}
                placeholder="Describe the major milestones you plan to achieve with this funding..."
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
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
