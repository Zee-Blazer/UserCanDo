import {
    Box,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

// Contact Form Component
export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <Box sx={{ mb: 4, width: '100%' }}>
            <Typography
                variant="h4"
                component="h3"
                sx={{
                    fontSize: { xs: '2rem', lg: '2.5rem' },
                    fontWeight: 700,
                    mb: 4,
                    color: '#043A66',
                    textAlign: 'center',
                }}
            >
                Send us a message
            </Typography>

            <Box sx={{ width: '100%', mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#6A6A6A',
                                    mb: 1,
                                }}
                            >
                                First Name <span style={{ color: '#B3261E' }}>*</span>
                            </Typography>
                            <TextField
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        backgroundColor: '#F9FAFB',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#043A66',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#043A66',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#6A6A6A',
                                    mb: 1,
                                }}
                            >
                                Last Name <span style={{ color: '#B3261E' }}>*</span>
                            </Typography>
                            <TextField
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        backgroundColor: '#F9FAFB',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#043A66',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#043A66',
                                        },
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#6A6A6A',
                                mb: 1,
                            }}
                        >
                            Email Address <span style={{ color: '#B3261E' }}>*</span>
                        </Typography>
                        <TextField
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    backgroundColor: '#F9FAFB',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#043A66',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#043A66',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#6A6A6A',
                                mb: 1,
                            }}
                        >
                            Subject
                        </Typography>
                        <TextField
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    backgroundColor: '#F9FAFB',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#043A66',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#043A66',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#6A6A6A',
                                mb: 1,
                            }}
                        >
                            Message <span style={{ color: '#B3261E' }}>*</span>
                        </Typography>
                        <TextField
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            required
                            multiline
                            rows={4}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1,
                                    backgroundColor: '#F9FAFB',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#043A66',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#043A66',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#33CC33',
                            color: 'white',
                            fontWeight: 600,
                            py: 1.5,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': {
                                backgroundColor: '#28a428',
                            },
                        }}
                    >
                        Send message
                    </Button>
                </form>
            </Box>
        </Box>
    );
};