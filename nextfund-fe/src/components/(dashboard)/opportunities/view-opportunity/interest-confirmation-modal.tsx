import { Box, CircularProgress, Modal, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CustomButton } from '../../../General/ui/custom-button';

interface InterestConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    message?: string;
    onContinue?: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', sm: 420, md: 540, lg: 800 },
    maxWidth: '99vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 4 },
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: 2, md: 3 },
};

export const InterestConfirmationModal: React.FC<InterestConfirmationModalProps> = ({ open, onClose, message, onContinue }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onContinue) {
                onContinue();
            } else {
                onClose();
            }
        }, 1500);
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="interest-confirmation-modal" aria-describedby="interest-confirmation-message">
            <Box sx={style}>
                <Paper elevation={0} sx={{ width: '100%', mb: { xs: 2, md: 3 }, p: { xs: 1.2, md: 2 }, background: '#fafbfc', borderRadius: '10px', border: '1px solid #e0e0e0', textAlign: 'left' }}>
                    <Typography variant="body1" sx={{ color: '#222', fontSize: { xs: '0.95rem', md: '1.05rem' }, whiteSpace: { md: 'nowrap' } }}>
                        {message || 'We acknowledge the receipt of your interest form. You will receive a confirmation mail soon'}
                    </Typography>
                </Paper>
                <CustomButton
                    variant="primary"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        py: { xs: 1.2, md: 1.5 },
                        borderRadius: '12px',
                        backgroundColor: '#33CC33',
                        color: '#fff',
                        border: 'none',
                        width: '100%',
                        mt: 1,
                        '&:hover': {
                            backgroundColor: '#28a428',
                            color: '#fff',
                        },
                        '&:disabled': {
                            backgroundColor: '#28a428',
                            opacity: 0.7,
                        },
                    }}
                    onClick={handleClick}
                >
                    {isLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={20} sx={{ color: '#fff' }} />
                        </Box>
                    ) : (
                        'Continue'
                    )}
                </CustomButton>
            </Box>
        </Modal>
    );
};

export default InterestConfirmationModal; 