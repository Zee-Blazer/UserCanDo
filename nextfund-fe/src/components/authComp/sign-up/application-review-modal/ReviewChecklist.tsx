import CheckIcon from '@mui/icons-material/Check';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface ReviewChecklistProps {
    checklistItems: string[];
}

export const ReviewChecklist: React.FC<ReviewChecklistProps> = ({ checklistItems }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: '#333',
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                }}
            >
                What We're Checking
            </Typography>

            <Box sx={{ mb: 2 }}>
                {checklistItems.map((item, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 2,
                                px: 0
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ccc',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2,
                                    flexShrink: 0
                                }}
                            >
                                <CheckIcon sx={{ fontSize: 16, color: '#000' }} />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#333',
                                    fontSize: '0.8rem',
                                    fontWeight: 400
                                }}
                            >
                                {item}
                            </Typography>
                        </Box>
                        {index < checklistItems.length - 1 && (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '1px',
                                    backgroundColor: '#D4D4D4',
                                    my: 0
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
