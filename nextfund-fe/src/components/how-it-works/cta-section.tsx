import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const CTASection: React.FC = () => {
    return (
        <Box sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 2.5, md: 3 },
            bgcolor: '#043A66',
            py: { xs: 6, md: 8 },
            borderRadius: { xs: 3, md: 6 },
            boxShadow: 2,
            mt: { xs: 6, md: 8 },
            mb: { xs: 6, md: 8 },
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'url(/pattern.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}>
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                        fontWeight: 700,
                        color: 'white',
                        mb: { xs: 2, md: 3 }
                    }}
                >
                    Ready to Start Your Investment Journey?
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        color: 'rgba(255,255,255,0.8)',
                        mb: { xs: 3, md: 4 },
                        maxWidth: 600,
                        mx: 'auto'
                    }}
                >
                    Create your account today and explore our curated investment opportunities.
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 2, sm: 3 },
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Link href="/sign-up">
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: '#33CC33',
                                color: 'white',
                                px: { xs: 4, md: 6 },
                                py: { xs: 1.5, md: 2 },
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                fontWeight: 600,
                                borderRadius: '999px',
                                minWidth: { xs: 200, sm: 'auto' },
                                '&:hover': {
                                    bgcolor: '#2eb82e'
                                }
                            }}
                        >
                            Create an account
                        </Button>
                    </Link>
                    <Link href="/investments">
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                color: 'white',
                                borderColor: '#33CC33',
                                px: { xs: 4, md: 6 },
                                py: { xs: 1.5, md: 2 },
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                fontWeight: 600,
                                borderRadius: '999px',
                                minWidth: { xs: 200, sm: 'auto' },
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Browse opportunities
                        </Button>
                    </Link>
                </Box>
            </Box>
            {/* Optional: overlay for better text contrast */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: 'rgba(4,58,102,0.7)',
                    zIndex: 0,
                    borderRadius: { xs: 3, md: 6 },
                    pointerEvents: 'none',
                }}
            />
        </Box>
    );
};
