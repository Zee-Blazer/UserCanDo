import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';
import { TERMS_DATA } from '@/constants/terms-data';
import { TermsSection } from '../../types/terms-data';


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

export const TermsOfService: React.FC = () => {
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
                        Terms of Service
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

                {/* Terms Content Card */}
                <Box
                    sx={{
                        backgroundColor: '#FAFAFA',
                        borderRadius: 3,
                        p: { xs: 3, sm: 4, lg: 6 },
                        border: '1px solid #E5E7EB',
                    }}
                >
                    {TERMS_DATA.map(renderSection)}
                </Box>
            </Box>
        </Box>
    );
};