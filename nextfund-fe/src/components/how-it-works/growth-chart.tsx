import React from 'react';
import { Box } from '@mui/material';

export const GrowthChart: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 250, md: 350, lg: 400 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    px: 4
                }}
            >
                {[40, 60, 80, 100, 120].map((height, index) => (
                    <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box
                            sx={{
                                width: { xs: 30, md: 40 },
                                height: height,
                                bgcolor: '#33CC33',
                                borderRadius: 1,
                                mb: 1,
                                position: 'relative'
                            }}
                        />
                        {index === 4 && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -20,
                                    right: 20,
                                    width: 40,
                                    height: 40,
                                    fontSize: { xs: '1.5rem', md: '2rem' }
                                }}
                            >
                                🌱
                            </Box>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
