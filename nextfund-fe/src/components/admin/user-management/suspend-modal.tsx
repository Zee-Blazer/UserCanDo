import FormInput from '@/components/General/form/formInput';
import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface SuspendModalProps {
    text?: string;
    open: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '99vw', sm: 480, md: 540 },
    maxWidth: '99vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    outline: 'none',
};

const SuspendModal: React.FC<SuspendModalProps> = ({ text, open, onClose, onSubmitSuccess }) => {
    const [password, setPassword] = React.useState("");
    const [touched, setTouched] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        if (!password) return;
        onClose();
        if (onSubmitSuccess) {
            setTimeout(() => {
                onSubmitSuccess();
            }, 300);
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="suspend-modal-title" aria-describedby="suspend-modal-description">
            <Box sx={style}>
                <h2
                    className='text-[#1E1E1E] text-2xl font-bold'
                >
                    {text || 'Suspend User'}
                </h2>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Box mb={2} mt={4}>

                        <FormInput
                            type="password"
                            name="password"
                            label="Password"
                            required
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="Password"
                            className='border-gray_2'
                        />
                        {touched && !password && (
                            <Typography color="error" fontSize={13} mt={0.5}>
                                Password is required
                            </Typography>
                        )}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#FF3F21',
                            color: '#fff',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            py: 0.7,
                            mt: 4,
                            '&:hover': {
                                backgroundColor: '#d32f13',
                                color: '#fff',
                            },
                        }}
                        disabled={!password}
                    >
                        {text || 'Suspend account'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default SuspendModal;
