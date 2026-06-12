
import {
    Box,
    Typography,
} from '@mui/material';
import { ContactInfo } from './contact-info';
import { RegionalOffice } from './regional-office';
import { ServicesSection } from './services-section';
import { ResponseTimes } from './response-times';
import { ContactForm } from './contact-form';


// Main Get in Touch Component
export const GetInTouch: React.FC = () => {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, lg: 12 },
                backgroundColor: '#F0F4F8',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, lg: 4 },
                }}
            >
                {/* Section Header */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontSize: { xs: '2.5rem', lg: '3rem' },
                            fontWeight: 700,
                            mb: 2,
                            color: '#043A66',
                        }}
                    >
                        Get in Touch
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            maxWidth: '768px',
                            mx: 'auto',
                            color: '#043A66',
                        }}
                    >
                        Have questions about investing or need support? We're here to help you succeed.
                    </Typography>
                </Box>

                {/* Contact Info Cards */}
                <ContactInfo />

                {/* Regional Office */}
                <RegionalOffice />

                {/* Services Section */}
                <ServicesSection />

                {/* Response Times */}
                <ResponseTimes />

                {/* Contact Form */}
                <ContactForm />
            </Box>
        </Box>
    );
};