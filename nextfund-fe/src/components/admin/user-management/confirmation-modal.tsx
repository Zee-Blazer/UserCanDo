import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    confirmButtonColor?: 'success' | 'error' | 'primary';
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', sm: 480, md: 540 },
    maxWidth: '99vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    outline: 'none',
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Yes, Confirm",
    cancelText = "Cancel",
    loading = false,
    confirmButtonColor = 'success'
}) => {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-modal-title"
            aria-describedby="confirmation-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="confirmation-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        color: '#1E1E1E',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    id="confirmation-modal-description"
                    sx={{
                        color: '#666',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        mb: 3
                    }}
                >
                    {message}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={loading}
                        sx={{
                            borderColor: '#ddd',
                            color: '#666',
                            '&:hover': {
                                borderColor: '#ccc',
                                backgroundColor: '#f9f9f9'
                            }
                        }}
                    >
                        {cancelText}
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        disabled={loading}
                        sx={{
                            backgroundColor: confirmButtonColor === 'error' ? '#f44336' : confirmButtonColor === 'primary' ? '#2196f3' : '#4CAF50',
                            '&:hover': {
                                backgroundColor: confirmButtonColor === 'error' ? '#d32f2f' : confirmButtonColor === 'primary' ? '#1976d2' : '#45a049'
                            },
                            '&:disabled': {
                                backgroundColor: '#ccc'
                            }
                        }}
                    >
                        {loading ? 'Processing...' : confirmText}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
