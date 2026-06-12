import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

interface SplitConfigurationProps {
    equityPortion: number;
    onEquityPortionChange: (_event: Event, newValue: number | number[]) => void;
}

export const SplitConfiguration: React.FC<SplitConfigurationProps> = ({ 
    equityPortion, 
    onEquityPortionChange 
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#333',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
            >
                Preferred Instrument Type:
            </Typography>

            {/* Split Configuration */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                    Split Configuration
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                        Equity Portion <span style={{ color: '#B3261E' }}>*</span>
                    </Typography>
                    <Box sx={{ px: 2 }}>
                        <Slider
                            value={equityPortion}
                            onChange={onEquityPortionChange}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            sx={{
                                color: '#2E5984',
                                height: 6,
                                '& .MuiSlider-thumb': {
                                    width: 16,
                                    height: 16,
                                    backgroundColor: '#2E5984',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, mt: 1 }}>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>0%</Typography>
                        <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>100%</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
