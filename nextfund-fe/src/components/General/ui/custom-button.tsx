import {
    Box,
    CircularProgress,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export const CustomButton: React.FC<{
    variant: 'primary' | 'secondary' | 'outline';
    children: React.ReactNode;
    fullWidth?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    isLoading?: boolean;
    sx?: SxProps<Theme>;
}> = ({ variant, children, fullWidth = false, onClick, type = 'button', disabled = false, isLoading = false, sx }) => {
    const getButtonStyles = () => {
        const baseStyles = {
            py: 1.5,
            px: 3,
            borderRadius: '25px',
            fontWeight: 600,
            textTransform: 'none' as const,
            width: fullWidth ? '100%' : 'auto',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease-in-out',
            border: 'none',
            fontSize: '1rem',
            opacity: disabled ? 0.6 : 1,
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyles,
                    backgroundColor: '#33CC33',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#28a428',
                        transform: 'translateY(-1px)',
                    },
                };
            case 'secondary':
                return {
                    ...baseStyles,
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                };
            case 'outline':
                return {
                    ...baseStyles,
                    backgroundColor: 'transparent',
                    color: '#4CAF50',
                    border: '2px solid #4CAF50',
                    '&:hover': {
                        backgroundColor: '#f1f8e9',
                    },
                };
            default:
                return baseStyles;
        }
    };

    return (
        <Box
            component="button"
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            sx={{ ...getButtonStyles(), ...sx }}
        >
            {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={20} sx={{ color: variant === 'primary' ? '#fff' : '#33CC33' }} />
                </Box>
            ) : (
                children
            )}
        </Box>
    );
};