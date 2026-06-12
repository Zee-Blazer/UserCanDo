"use client";

import CloseIcon from '@mui/icons-material/Close';
import {
    Alert,
    Box,
    Button,
    Collapse,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';

interface NotificationAlertProps {
    in: boolean;
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string;
    buttonText: string;
    onButtonClick: () => void;
    onClose: () => void;
}

export default function NotificationAlert({
    in: isOpen,
    severity,
    message,
    buttonText,
    onButtonClick,
    onClose
}: NotificationAlertProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const buttonSx = {
        borderColor: theme.palette[severity]?.main || theme.palette.grey[500],
        color: theme.palette[severity]?.main || theme.palette.text.primary,
        '&:hover': {
            borderColor: theme.palette[severity]?.dark || theme.palette.grey[700],
            backgroundColor: theme.palette[severity]?.light || theme.palette.grey[50],
        }
    };

    if (isMobile) {
        return (
            <Collapse in={isOpen}>
                <Box sx={{ mb: 3 }}>
                    <Alert
                        severity={severity}
                        sx={{ position: 'relative', pr: 6 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={onClose}
                                sx={{ position: 'absolute', top: 8, right: 8, p: 0.5 }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        {message}
                    </Alert>
                    <Button
                        color="inherit"
                        variant="outlined"
                        fullWidth
                        onClick={onButtonClick}
                        sx={{ mt: 1, ...buttonSx }}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Collapse>
        );
    }

    return (
        <Collapse in={isOpen}>
            <Alert
                severity={severity}
                sx={{ mb: 3 }}
                action={
                    <>
                        <Button
                            color="inherit"
                            size="small"
                            onClick={onButtonClick}
                            sx={{ mr: 1 }}
                        >
                            {buttonText}
                        </Button>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </>
                }
            >
                {message}
            </Alert>
        </Collapse>
    );
}