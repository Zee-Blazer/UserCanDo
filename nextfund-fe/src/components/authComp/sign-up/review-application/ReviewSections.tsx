import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import type { ReviewSection } from './types';

interface ReviewSectionsProps {
    sections: ReviewSection[];
    onEditSection: (section: string) => void;
}

export const ReviewSections: React.FC<ReviewSectionsProps> = ({ sections, onEditSection }) => {
    return (
        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: '1rem'
                }}
            >
                Review Sections
            </Typography>

            {sections.map((section, index) => (
                <Box key={section.id}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            py: 2
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                color: '#333',
                                fontSize: '0.875rem'
                            }}
                        >
                            {section.title}
                        </Typography>
                        <Box
                            component="button"
                            onClick={() => onEditSection(section.id)}
                            sx={{
                                background: 'none',
                                border: 'none',
                                color: '#1976d2',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                textDecoration: 'underline',
                                '&:hover': {
                                    color: '#1565c0'
                                }
                            }}
                        >
                            Edit
                        </Box>
                    </Box>
                    {index < sections.length - 1 && (
                        <Divider sx={{ borderColor: '#f0f0f0' }} />
                    )}
                </Box>
            ))}
        </Box>
    );
};
