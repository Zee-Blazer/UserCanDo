"use client";

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';

interface LogoutModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
    open,
    onClose,
    onConfirm,
}) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleConfirm = async () => {
        setIsLoggingOut(true);

        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoggingOut(false);
        onConfirm();
    };

    const handleClose = () => {
        if (!isLoggingOut) {
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
        >
            <DialogTitle id="logout-dialog-title">
                Confirm Logout
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="logout-dialog-description">
                    Are you sure you want to logout? You will be redirected to the sign-in page.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="primary"
                    variant="outlined"
                    disabled={isLoggingOut}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    color="error"
                    variant="contained"
                    autoFocus
                    disabled={isLoggingOut}
                >
                    {isLoggingOut ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={20} sx={{ color: '#fff' }} />
                        </Box>
                    ) : (
                        'Logout'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutModal;