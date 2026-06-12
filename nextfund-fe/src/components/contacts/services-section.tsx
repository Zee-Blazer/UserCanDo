
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';


// Services Section Component
export const ServicesSection: React.FC = () => {
    const theme = useTheme();

    const services = [
        {
            id: 1,
            title: 'For Investors',
            items: [
                { label: 'Investment questions', email: 'investors@nexfund.com' },
                { label: 'Technical support', email: 'support@nexfund.com' },
                { label: 'Document requests', email: 'documents@nexfund.com' },
            ],
        },
        {
            id: 2,
            title: 'For Businesses',
            items: [
                { label: 'Application status', email: 'applications@nexfund.com' },
                { label: 'Due diligence queries', email: 'duediligence@nexfund.com' },
                { label: 'Funding support', email: 'funding@nexfund.com' },
            ],
        },
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={4}>
                {services.map((service) => (
                    <Grid size={{ xs: 12, md: 6 }} key={service.id}>
                        <Card
                            sx={{
                                height: '100%',
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: 7,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.shadows[4],
                                },
                            }}
                        >
                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.25rem',
                                        fontWeight: 700,
                                        color: '#043A66',
                                        mb: 3,
                                    }}
                                >
                                    {service.title}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {service.items.map((item, index) => (
                                        <Box key={index}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: '#043A66',
                                                    mb: 0.5,
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: '#043A66',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.email}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};