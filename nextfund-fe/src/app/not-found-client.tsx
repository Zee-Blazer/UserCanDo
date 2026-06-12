'use client';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export function NotFoundClient() {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Header hideNavigation={true} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    textAlign: 'center',
                    p: 3,
                    backgroundColor: '#fafafa',
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                        fontWeight: 700,
                        color: '#33CC33',
                        mb: 2,
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h4"
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem' },
                        fontWeight: 600,
                        color: '#1a1a1a',
                        mb: 2,
                    }}
                >
                    Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1.1rem',
                        color: '#666',
                        mb: 4,
                        maxWidth: '500px',
                    }}
                >
                    The page you're looking for doesn't exist or has been moved.
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => router.push('/')}
                    sx={{
                        backgroundColor: '#33CC33',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '8px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#2bb32b',
                        },
                    }}
                >
                    Go Home
                </Button>
            </Box>
            <Footer />
        </Box>
    );
}

