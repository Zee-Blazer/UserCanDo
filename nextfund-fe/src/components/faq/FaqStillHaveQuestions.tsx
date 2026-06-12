import { Box, Typography } from '@mui/material';
import React from 'react';
import { Button } from '../General/ui/button';
import Link from 'next/link';

const FaqStillHaveQuestions: React.FC = () => {
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
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: 'white',
                        mb: { xs: 2, md: 3 },
                        fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                >
                    Still have questions?
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'rgba(255,255,255,0.9)',
                        mb: { xs: 3, md: 4 },
                        maxWidth: 600,
                        mx: 'auto',
                        fontSize: { xs: '1rem', md: '1.125rem' },
                    }}
                >
                    Can’t find what you’re looking for? Our team is here to help
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, justifyContent: 'center', alignItems: 'center' }}>
                    <Link href="/contacts">
                    <Button
                        variant="primary"
                        size="lg"
                            className="text-white px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer"
                        style={{ backgroundColor: '#33CC33' }}
                    >
                        Contact Support
                        </Button>
                    </Link>
                    <Link href="/investment-webinars">
                    <Button
                        variant="outline"
                        size="lg"
                            className="border-2 px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer"
                        style={{ borderColor: '#33CC33', color: 'white' }}
                    >
                        Join Our Webinars
                    </Button>
                    </Link>
                </Box>
            </Box>
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

export default FaqStillHaveQuestions; 