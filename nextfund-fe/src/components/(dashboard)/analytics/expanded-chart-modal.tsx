import { Box, IconButton, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { CARD_SUBTITLES, CARD_TITLES } from '../../../constants/chart-data';

interface ExpandedChartModalProps {
    open: boolean;
    onClose: () => void;
    chartIndex: number | null;
    children: ReactNode;
}

export const ExpandedChartModal: React.FC<ExpandedChartModalProps> = ({
    open,
    onClose,
    chartIndex,
    children,
}) => {
    if (chartIndex === null) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="expanded-chart-modal"
            aria-describedby="expanded-chart-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '95vw', sm: '90vw', md: '85vw', lg: '80vw' },
                    maxWidth: { xs: '95vw', sm: 1200, md: 1400 },
                    maxHeight: '90vh',
                    bgcolor: 'background.paper',
                    borderRadius: '18px',
                    boxShadow: 24,
                    p: { xs: 2, sm: 3, md: 4 },
                    outline: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 3,
                        pb: 2,
                        borderBottom: '1px solid #F2F2F2',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{
                                color: '#181818',
                                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                                mb: 0.5,
                            }}
                        >
                            {CARD_TITLES[chartIndex]}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                            }}
                        >
                            {CARD_SUBTITLES[chartIndex]}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: '#666',
                            borderRadius: '50%',
                            width: { xs: 36, sm: 40, md: 44 },
                            height: { xs: 36, sm: 40, md: 44 },
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                borderRadius: '50%',
                            },
                        }}
                    >
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: 300 }}>×</Typography>
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        minHeight: { xs: 400, sm: 500, md: 600 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

