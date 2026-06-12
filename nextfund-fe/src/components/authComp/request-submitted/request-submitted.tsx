import { Header } from '@/components/layout/header';
import { Check } from '@mui/icons-material';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { CustomButton } from '../../../components/General/ui';

interface RequestSubmittedPageProps {
    email?: string;
    onContinue?: () => void;
}

const RequestSubmittedPage: React.FC<RequestSubmittedPageProps> = ({
    email = "user@example.com",
    onContinue
}) => {
    const handleContinue = () => {
        console.log('Continue clicked');
        if (onContinue) {
            onContinue();
        }
    };

    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#043A66',
                    backgroundImage: 'url(/pattern.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3 },
                }}
            >
                <Paper
                    elevation={24}
                    sx={{
                        maxWidth: { xs: '100%', sm: 480, md: 720, lg: 550 },
                        width: '100%',
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                    }}
                >
                    {/* Success Icon */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            mb: 4
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                backgroundColor: '#33CC3314',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    backgroundColor: '#33CC33',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Check
                                    sx={{
                                        color: 'white',
                                        fontSize: '2rem',
                                        fontWeight: 'bold'
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>

                    {/* Success Message */}
                    <Box sx={{ textAlign: 'left', mb: 1 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                mb: 1,
                                color: '#333',
                                fontSize: { xs: '1.75rem', sm: '2rem' }
                            }}
                        >
                            Request Submitted
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: 1.6,
                                color: '#666',
                                fontSize: '1rem'
                            }}
                        >
                            We have sent a confirmation email to{' '}
                            <Box
                                component="span"
                                sx={{
                                    color: '#4CAF50',
                                    fontWeight: 500,
                                    textDecoration: 'none'
                                }}
                            >
                                {email}
                            </Box>
                            . Please check your inbox for next steps.
                        </Typography>
                    </Box>

                    {/* Continue Button */}
                    <CustomButton
                        variant="primary"
                        fullWidth
                        onClick={handleContinue}
                        sx={{
                            borderRadius: '12px',
                            py: 2,
                            fontSize: '1rem',
                            fontWeight: 600,
                            mt: 3,
                        }}
                    >
                        Submit
                    </CustomButton>
                </Paper>
            </Box>
        </>
    );
};

export default RequestSubmittedPage;