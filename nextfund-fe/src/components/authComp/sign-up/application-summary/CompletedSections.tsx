import CheckIcon from '@mui/icons-material/Check';
import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';
import type { CompletedSectionsProps } from './types';

export const CompletedSections: React.FC<CompletedSectionsProps> = ({ completedSections }) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1.125rem',
                }}
            >
                What's Completed
            </Typography>

            {completedSections.map((section, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Checkbox
                        checked
                        disabled
                        icon={<Box
                            sx={{
                                width: 20,
                                height: 20,
                                backgroundColor: '#e0e0e0',
                                borderRadius: '4px',
                            }}
                        />}
                        checkedIcon={
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: '#ccc',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CheckIcon sx={{ fontSize: 16, color: '#000' }} />
                            </Box>
                        }
                        sx={{ p: 0, mr: 2 }}
                    />

                    <Typography
                        variant="body1"
                        sx={{ color: '#333', fontWeight: 500 }}
                    >
                        {section}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};
