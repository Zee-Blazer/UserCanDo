
import {
    Box,
    Card,
    CardContent,
    Typography,
    useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';

// Response Times Component
export const ResponseTimes: React.FC = () => {
    const theme = useTheme();

    const responseTimes = [
        { time: '24 hours', type: 'General inquiry' },
        { time: '4 hours', type: 'Investment support' },
        { time: '2 hours', type: 'Technical issues' },
        { time: '1 hour', type: 'Emergency matters' },
    ];

    return (
        <Box sx={{ mb: 8 }}>
            <Typography
                variant="h4"
                component="h3"
                sx={{
                    fontSize: { xs: '2rem', lg: '2.5rem' },
                    fontWeight: 700,
                    mb: 4,
                    color: '#043A66',
                    textAlign: 'center',
                }}
            >
                Response Times
            </Typography>
            <Grid container spacing={3}>
                {responseTimes.map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                backgroundColor: 'white',
                                border: '1px solid #E5E7EB',
                                borderRadius: 7,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    boxShadow: theme.shadows[4],
                                },
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: '#043A66',
                                        mb: 1,
                                    }}
                                >
                                    {item.time}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: '#6A6A6A',
                                    }}
                                >
                                    {item.type}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};