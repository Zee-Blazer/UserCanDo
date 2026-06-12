import { Header } from '@/components/layout/header';
import {
    Box,
    FormControl,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { CustomButton } from '../../../components/General/ui';

interface PasswordResetPageProps {
    onSubmit?: (data: { email: string; department: string; reason: string }) => void;
}

const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        department: '',
        reason: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password Reset Request:', formData);
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const reasonOptions = [
        'Forgot Password',
        'Account Compromised',
        'Password Expired',
        'Lost Access to Email',
        'Security Update Required',
        'Other'
    ];

    return (
        <>
            <Header />
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#043A66',
                backgroundImage: 'url(/pattern.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3 },
                }}
            >
                <Paper
                    elevation={24}
                    sx={{
                        maxWidth: { xs: '100%', sm: 480, md: 720, lg: 550 },
                        width: '100%',
                        p: { xs: 3, sm: 4, md: 5 },
                        borderRadius: { xs: '16px', sm: '24px' },
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 600,
                                mb: 2,
                                color: '#333',
                                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                                lineHeight: 1.3
                            }}
                        >
                            Password Reset Request Form
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                mb: 4,
                                lineHeight: 1.6,
                                color: '#666',
                                fontSize: { xs: '0.85rem', sm: '0.9rem' }
                            }}
                        >
                            Fill out the form below to request a password reset on Nexfund.
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1.5,
                                    color: '#666',
                                    fontWeight: 500,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Email address <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: '#f8f9fa',
                                        border: 'none',
                                        height: '56px',
                                        fontSize: '1rem',
                                        '& fieldset': {
                                            border: '2px solid #e9ecef',
                                            borderRadius: '12px'
                                        },
                                        '&:hover fieldset': {
                                            border: '2px solid #dee2e6'
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: '2px solid #4CAF50'
                                        },
                                        '& input': {
                                            padding: '16px 14px'
                                        }
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1.5,
                                    color: '#666',
                                    fontWeight: 500,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Department <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                value={formData.department}
                                onChange={(e) => handleInputChange('department', e.target.value)}
                                required
                                placeholder="Enter your department"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: '#f8f9fa',
                                        border: 'none',
                                        height: '56px',
                                        fontSize: '1rem',
                                        '& fieldset': {
                                            border: '2px solid #e9ecef',
                                            borderRadius: '12px'
                                        },
                                        '&:hover fieldset': {
                                            border: '2px solid #dee2e6'
                                        },
                                        '&.Mui-focused fieldset': {
                                            border: '2px solid #4CAF50'
                                        },
                                        '& input': {
                                            padding: '16px 14px'
                                        }
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    mb: 1.5,
                                    color: '#666',
                                    fontWeight: 500,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Reason for password reset <span style={{ color: '#ff4444' }}>*</span>
                            </Typography>
                            <FormControl fullWidth required>
                                <Select
                                    value={formData.reason}
                                    onChange={(e) => handleInputChange('reason', e.target.value)}
                                    displayEmpty
                                    sx={{
                                        borderRadius: '12px',
                                        backgroundColor: '#f8f9fa',
                                        height: '56px',
                                        fontSize: '1rem',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: '2px solid #e9ecef',
                                            borderRadius: '12px'
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            border: '2px solid #dee2e6'
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            border: '2px solid #4CAF50'
                                        },
                                        '& .MuiSelect-select': {
                                            padding: '16px 14px',
                                            color: formData.reason ? '#333' : '#999'
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled sx={{ color: '#999' }}>
                                        --Select reason--
                                    </MenuItem>
                                    {reasonOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <CustomButton
                            variant="primary"
                            fullWidth
                            type="submit"
                            sx={{
                                borderRadius: '12px',
                                py: 2,
                                fontSize: '1rem',
                                fontWeight: 600
                            }}
                        >
                            Submit
                        </CustomButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default PasswordResetPage;