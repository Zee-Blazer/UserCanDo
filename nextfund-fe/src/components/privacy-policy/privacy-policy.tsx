import { PRIVACY_POLICY_DATA } from '@/constants/privacy-poicy-data';
import { TermsSection } from '@/types/terms-data';
import {
    Box,
    Typography,
    useTheme,
} from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";
import React from 'react';

const renderListItems = (items: string[]) => {
    return items.map((item, index) => (
        <Box
            key={index}
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 1,
                pl: 2,
            }}
        >
            <Box
                sx={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#043A66',
                    borderRadius: '50%',
                    mt: '0.6rem',
                    mr: 2,
                    flexShrink: 0,
                }}
            />
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#043A66',
                }}
            >
                {item}
            </Typography>
        </Box>
    ));
};

const renderSubsection = (subsection: any) => (
    <Box key={subsection.id} sx={{ mb: 3 }}>
        <Typography
            variant="h6"
            component="h4"
            sx={{
                fontSize: '1rem',
                fontWeight: 600,
                mb: 1.5,
                color: '#043A66',
            }}
        >
            {subsection.id} {subsection.title}
        </Typography>
        {subsection.content && (
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#043A66',
                    mb: subsection.items ? 1.5 : 0,
                    whiteSpace: 'pre-line',
                }}
            >
                {subsection.content}
            </Typography>
        )}
        {subsection.items && (
            <Box sx={{ mt: 1 }}>
                {renderListItems(subsection.items)}
            </Box>
        )}
        {subsection.additionalSections && subsection.additionalSections.map((section: any, index: number) => (
            <Box key={index} sx={{ mt: 2 }}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '0.875rem',
                        lineHeight: 1.6,
                        color: '#043A66',
                        mb: 1.5,
                        fontWeight: 400,
                    }}
                >
                    {section.header}
                </Typography>
                <Box sx={{ mt: 1 }}>
                    {renderListItems(section.items)}
                </Box>
            </Box>
        ))}
    </Box>
);

const renderSection = (section: TermsSection) => (
    <Box key={section.id} sx={{ mb: 4 }}>
        <Typography
            variant="h5"
            component="h3"
            sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                mb: 2,
                color: '#043A66',
            }}
        >
            {section.id}. {section.title}
        </Typography>

        {section.content && (
            <Typography
                variant="body2"
                sx={{
                    fontSize: '0.875rem',
                    lineHeight: 1.6,
                    color: '#043A66',
                    mb: section.items || section.subsections ? 2 : 0,
                    whiteSpace: 'pre-line',
                }}
            >
                {section.content}
            </Typography>
        )}

        {section.items && (
            <Box sx={{ mb: section.subsections ? 3 : 0 }}>
                {renderListItems(section.items)}
            </Box>
        )}

        {section.subsections && (
            <Box sx={{ pl: { xs: 0, sm: 2 } }}>
                {section.subsections.map(renderSubsection)}
            </Box>
        )}
    </Box>
);

export const PrivacyPolicy: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            component="section"
            sx={{
                backgroundColor: 'white',
            }}
        >
            {/* Section Header - Full Width */}
            <Box
                sx={{
                    backgroundColor: '#043A6614',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    py: { xs: 12, lg: 8 },
                    textAlign: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1200px',
                        mx: 'auto',
                        px: { xs: 2, sm: 3, lg: 4 },
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontSize: { xs: '2rem', lg: '2.5rem' },
                            fontWeight: 700,
                            mb: 2,
                            color: '#043A66',
                        }}
                    >
                        Privacy Policy
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            color: '#043A66',
                            mb: 0,
                        }}
                    >
                        Effective Date: [Date to be inserted]
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: '1200px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, lg: 4 },
                    py: { xs: 8, lg: 12 },
                }}
            >
                {/* Privacy Policy Content Card */}
                <Box
                    sx={{
                        backgroundColor: '#FAFAFA',
                        borderRadius: 3,
                        p: { xs: 3, sm: 4, lg: 6 },
                        border: '1px solid #E5E7EB',
                    }}
                >
                    {PRIVACY_POLICY_DATA.map(renderSection)}

                    {/* Footer Section */}
                    <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid #043A66' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                color: '#043A66',
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            COMMITMENT TO PRIVACY:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                color: '#043A66',
                                mb: 3,
                            }}
                        >
                            At Nexfund, we are committed to maintaining the highest standards of data protection and privacy. We regularly review and update our practices to ensure compliance with evolving regulations and industry best practices.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                color: '#043A66',
                                mb: 2,
                            }}
                        >
                            If you have any questions or concerns about this Privacy Policy or our privacy practices, please don't hesitate to contact us.
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.6,
                                color: '#043A66',
                                fontWeight: 600,
                            }}
                        >
                            Last Updated: [Date to be inserted]
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};