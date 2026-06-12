import {
    Box,
    Paper,
    Typography,
} from '@mui/material';
import Image from 'next/image';

interface StatsCardProps {
    icon: string;
    title: string;
    value: string;
    subtitle: string;
    bgColor: string;
    subtitleBgColor?: string;
    subtitleTextColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    icon,
    title,
    value,
    subtitle,
    bgColor,
    subtitleBgColor,
    subtitleTextColor
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '16px',
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                },
            }}
        >
            <Box sx={{
                position: 'relative',
                p: 3,
            }}>
                <Box>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                        {value}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image src={`/${icon}.png`} alt={title} width={20} height={20} />
                </Box>
            </Box>

            <Box
                sx={{
                    backgroundColor: subtitleBgColor || '#EEF1F4',
                    px: 2,
                    py: 1,
                    width: '100%',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: subtitleTextColor || '#043A66',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1.4
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Paper>
    );
};