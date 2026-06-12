import { Close } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    IconButton,
    Modal,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useExpressInterestMutation } from '../../../../queries/businessApi';
import { useGetInvestorSettingsQuery } from '../../../../queries/dashboardApi';
import { RootState } from '../../../../Redux/store';

interface ExpressInterestModalProps {
    open: boolean;
    onClose: () => void;
    onSubmitSuccess?: () => void;
    listingId?: string;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '95vw',
        sm: '90vw',
        md: '85vw',
        lg: 600,
        xl: 650
    },
    maxWidth: {
        xs: '95vw',
        sm: '90vw',
        md: '85vw',
        lg: 600,
        xl: 650
    },
    maxHeight: {
        xs: '95vh',
        sm: '90vh',
        md: '85vh',
        lg: '90vh',
        xl: '85vh'
    },
    bgcolor: 'background.paper',
    borderRadius: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '16px',
        xl: '16px'
    },
    boxShadow: 24,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};

const ExpressInterestModal: React.FC<ExpressInterestModalProps> = ({ open, onClose, onSubmitSuccess, listingId }) => {

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        amount: '',
        individually: false,
        syndicate: false,
        reason: '',
        nda: false,
    });

    // Validation state
    const [errors, setErrors] = useState({
        amount: '',
        reason: '',
    });

    // Get user data 
    const { loginData } = useSelector((state: RootState) => state.auth);

    // Express interest mutation
    const [expressInterest, { isLoading: mutationLoading, error }] = useExpressInterestMutation();
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch investor settings to check for KYC documents and get investor type
    const { data: investorSettings } = useGetInvestorSettingsQuery();


    useEffect(() => {
        if (loginData?.first_name && loginData?.last_name && loginData?.email) {
            setForm(prev => ({
                ...prev,
                firstName: loginData.first_name || '',
                lastName: loginData.last_name || '',
                email: loginData.email || '',
            }));
        }
    }, [loginData]);

    // Get investor type from settings
    const investorType = React.useMemo(() => {
        if (!investorSettings) return null;

        const rawSettings = investorSettings as any;
        let settingsPayload = null;

        if (rawSettings && typeof rawSettings === 'object') {
            if (rawSettings.payload && typeof rawSettings.payload === 'object') {
                settingsPayload = rawSettings.payload;
            } else {
                settingsPayload = rawSettings;
            }
        }

        if (settingsPayload?.personal_information) {
            const type = (settingsPayload.personal_information as any)?.investor_type;
            if (type) {
                // Map the investor_type value to display format
                const lowerType = type.toLowerCase();
                if (lowerType.includes('firm') || lowerType.includes('investment')) {
                    return 'Investment Firm';
                }
                return 'Individual';
            }
        }
        return null;
    }, [investorSettings]);

    // Check if KYC documents are uploaded and verified
    const hasKYCDocuments = React.useMemo(() => {
        if (!investorSettings) return false;

        const rawSettings = investorSettings as any;
        let settingsPayload = null;

        if (rawSettings && typeof rawSettings === 'object') {
            if (rawSettings.payload && typeof rawSettings.payload === 'object') {
                settingsPayload = rawSettings.payload;
            } else {
                settingsPayload = rawSettings;
            }
        }

        if (settingsPayload?.personal_information) {
            const personalInfo = settingsPayload.personal_information;
            // Check if identification_document is present (proof_of_address was removed)
            const hasIdDoc = personalInfo.identification_document && personalInfo.identification_document.trim() !== '';

            // Check verification status - if verified, approved, or active, documents are complete
            const verificationStatus = settingsPayload?.others?.verification_status?.toLowerCase();
            const isVerified = verificationStatus === 'verified' || verificationStatus === 'approved' || verificationStatus === 'active';

            // Return true if document is uploaded AND verified
            return hasIdDoc && isVerified;
        }

        return false;
    }, [investorSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name === 'individually') {
            setForm(prev => ({ ...prev, individually: checked, syndicate: !checked }));
        } else if (name === 'syndicate') {
            setForm(prev => ({ ...prev, syndicate: checked, individually: !checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: checked }));
        }
    };

    // Validation functions
    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'amount':
                const numericAmount = parseFormattedNumber(value);
                if (value.trim() === '') return 'Investment amount is required';
                if (numericAmount <= 0) return 'Please enter a valid investment amount';
                return '';
            case 'reason':
                return value.trim() === '' ? 'Please explain why you are interested in this opportunity' : '';
            default:
                return '';
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Clean the value by removing commas and other formatting before storing
        const cleanValue = value.replace(/[^0-9.]/g, '');
        const formattedValue = cleanValue ? Number(cleanValue).toLocaleString() : '';

        setForm(prev => ({ ...prev, amount: formattedValue }));

        // Clear error when user starts typing
        if (errors.amount) {
            setErrors(prev => ({ ...prev, amount: '' }));
        }
    };

    // Check if form is valid
    const isFormValid = () => {
        const investorTypeValid = !!investorType;
        const amountValid = form.amount.trim() !== '' && parseFormattedNumber(form.amount) > 0;
        const reasonValid = form.reason.trim() !== '';
        const ndaValid = form.nda;
        const investmentModeValid = form.individually || form.syndicate;

        return investorTypeValid && amountValid && reasonValid && ndaValid && investmentModeValid && listingId;
    };

    // Parse formatted number back to numeric value
    const parseFormattedNumber = (value: string): number => {
        return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!listingId) {
            return;
        }

        // Check if KYC documents are uploaded
        if (!hasKYCDocuments) {
            setApiError('Please upload your KYC documents (Identification Document) in Settings before expressing interest.');
            return;
        }

        // Validate all fields
        const newErrors = {
            amount: validateField('amount', form.amount),
            reason: validateField('reason', form.reason),
        };

        setErrors(newErrors);

        // Check if there are any validation errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            return;
        }

        // Validate NDA agreement
        if (!form.nda) {
            setErrors(prev => ({ ...prev, reason: 'Please accept the NDA agreement to continue.' }));
            return;
        }

        // Validate investment mode selection
        if (!form.individually && !form.syndicate) {
            // Could add a visual indicator or error message for this
            return;
        }

        const requestData = {
            listing_id: listingId,
            investment_firm: investorType || '', // Use investor type from settings
            investment_amount: parseFormattedNumber(form.amount),
            investment_reason: form.reason.trim(),
            nda_signed: form.nda,
        };

        try {
            setApiError(null); // Clear any previous errors
            setIsLoading(true);

            await expressInterest(requestData).unwrap();

            // Store investment mode selection in sessionStorage for CommitModal
            if (form.individually) {
                sessionStorage.setItem(`investment_mode_${listingId}`, 'individually');
            } else if (form.syndicate) {
                sessionStorage.setItem(`investment_mode_${listingId}`, 'syndicate');
            }

            // Store investment amount in sessionStorage for CommitModal
            if (form.amount) {
                sessionStorage.setItem(`investment_amount_${listingId}`, form.amount);
            }

            // Add delay before closing modal to show loading longer
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsLoading(false);
            onClose();

            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (err: any) {
            setIsLoading(false);
            // Improved error handling
            let errorMessage = 'Failed to submit interest. Please try again.';

            if (err?.data) {
                if (typeof err.data === 'string') {
                    if (err.data.includes('Traceback')) {
                        errorMessage = 'Server error occurred. Please contact support if this persists.';
                    } else {
                        errorMessage = err.data;
                    }
                } else if (err.data?.message) {
                    errorMessage = err.data.message;
                } else if (err.data?.error) {
                    errorMessage = typeof err.data.error === 'string' ? err.data.error : 'An error occurred';
                } else if (err.data?.detail) {
                    errorMessage = Array.isArray(err.data.detail)
                        ? err.data.detail.map((d: any) => d?.msg || JSON.stringify(d)).join(', ')
                        : err.data.detail;
                } else if (err.data?.errors) {
                    errorMessage = Array.isArray(err.data.errors)
                        ? err.data.errors.join(', ')
                        : JSON.stringify(err.data.errors);
                }
            } else if (err?.message) {
                errorMessage = err.message;
            } else if (err?.error) {
                errorMessage = err.error;
            }

            // Handle specific error status codes
            if (err?.status === 404) {
                errorMessage = 'Express interest endpoint not found. Please contact support.';
            } else if (err?.status === 400) {
                if (errorMessage.toLowerCase().includes('already exist') || errorMessage.toLowerCase().includes('duplicate')) {
                    errorMessage = 'You have already expressed interest in this opportunity.';
                } else if (!errorMessage.includes('validation') && !errorMessage.includes('required')) {
                    errorMessage = errorMessage || 'Invalid request. Please check all fields and try again.';
                }
            } else if (err?.status === 409) {
                errorMessage = 'You have already expressed interest in this opportunity.';
            } else if (err?.status === 422) {
                errorMessage = errorMessage || 'Validation error. Please check all required fields.';
            } else if (err?.status === 500) {
                errorMessage = 'Server error occurred. Please contact support if this persists.';
            }

            // Set error message to display in UI
            setApiError(errorMessage);
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="express-interest-modal" aria-describedby="express-interest-form">
            <Box sx={style}>
                {/* Fixed Header */}
                <Box sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
                    pb: { xs: 1.5, sm: 1.75, md: 2, lg: 2, xl: 2.5 },
                    flexShrink: 0,
                    borderBottom: '1px solid #E0E0E0',
                    position: 'relative'
                }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: { xs: 8, sm: 12, md: 16, lg: 20, xl: 20 },
                            right: { xs: 8, sm: 12, md: 16, lg: 20, xl: 20 },
                            color: '#666',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                color: '#333'
                            }
                        }}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            mb: { xs: 1, sm: 0.8, md: 0.6, lg: 0.5, xl: 0.5 },
                            fontSize: {
                                xs: '1.15rem',
                                sm: '1.25rem',
                                md: '1.35rem',
                                lg: '1.5rem',
                                xl: '1.5rem'
                            },
                            pr: { xs: 4, sm: 5, md: 6, lg: 6, xl: 6 }
                        }}
                    >
                        Express Interest
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: { xs: 1.5, sm: 1.25, md: 1, lg: 0.75, xl: 0.75 },
                            color: '#666',
                            fontSize: {
                                xs: '0.85rem',
                                sm: '0.9rem',
                                md: '0.95rem',
                                lg: '1rem',
                                xl: '1rem'
                            },
                            lineHeight: 1.6
                        }}
                    >
                        Fill out the form below to express your interest in this investment opportunity
                    </Typography>

                    {(error || apiError) && (
                        <Box sx={{ mt: { xs: 1, sm: 1, md: 0.75, lg: 0.5, xl: 0.5 }, p: 1.5, backgroundColor: '#ffebee', borderRadius: '8px', border: '1px solid #f44336' }}>
                            <Typography variant="body2" sx={{ color: '#d32f2f', fontSize: '0.8rem' }}>
                                {apiError || 'Failed to submit interest. Please try again.'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Scrollable Content */}
                <Box sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
                    pt: { xs: 1.5, sm: 1.75, md: 2, lg: 2, xl: 2.5 },
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ccc',
                        borderRadius: '4px',
                    },
                }}>
                    {/* KYC Documents Warning */}
                    {!hasKYCDocuments && (
                        <Alert
                            severity="warning"
                            sx={{
                                mb: 3,
                                '& .MuiAlert-message': {
                                    width: '100%'
                                }
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                KYC Documents Required
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                Please upload your KYC documents (Identification Document) in your Settings before expressing interest in investment opportunities.
                            </Typography>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <Grid container spacing={{ xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={form.firstName}
                                    disabled
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'not-allowed',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0'
                                            },
                                            '&.Mui-disabled': {
                                                color: '#666',
                                                WebkitTextFillColor: '#666'
                                            }
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={form.lastName}
                                    disabled
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'not-allowed',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0'
                                            },
                                            '&.Mui-disabled': {
                                                color: '#666',
                                                WebkitTextFillColor: '#666'
                                            }
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    value={form.email}
                                    disabled
                                    fullWidth
                                    size="small"
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'not-allowed',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0'
                                            },
                                            '&.Mui-disabled': {
                                                color: '#666',
                                                WebkitTextFillColor: '#666'
                                            }
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1.5,
                                        color: '#666',
                                        fontWeight: 500,
                                        fontSize: {
                                            xs: '0.875rem',
                                            sm: '0.9rem',
                                            md: '0.95rem',
                                            lg: '1rem',
                                            xl: '1rem'
                                        }
                                    }}
                                >
                                    Investor Type
                                </Typography>
                                <TextField
                                    value={investorType || 'Not set'}
                                    fullWidth
                                    size="small"
                                    disabled
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'not-allowed',
                                            '& fieldset': {
                                                borderColor: '#e0e0e0'
                                            },
                                            '&.Mui-disabled': {
                                                color: '#666',
                                                WebkitTextFillColor: '#666'
                                            }
                                        }
                                    }}
                                    helperText={!investorType ? 'Please set your investor type in Settings' : ''}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1,
                                        color: '#666',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.85rem' }
                                    }}
                                >
                                    How much are you considering investing? <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <TextField
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleAmountChange}
                                    fullWidth
                                    size="small"
                                    type="text"
                                    placeholder="e.g., 1,000,000"
                                    error={!!errors.amount}
                                    helperText={errors.amount}
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: errors.amount ? '#ff4444' : '#e0e0e0'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.amount ? '#ff4444' : '#ddd'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.amount ? '#ff4444' : '#4CAF50'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Typography sx={{
                                    mb: { xs: 1.5, sm: 1, md: 1, lg: 0.75, xl: 0.75 },
                                    fontWeight: 500,
                                    fontSize: {
                                        xs: '0.875rem',
                                        sm: '0.9rem',
                                        md: '0.95rem',
                                        lg: '1rem',
                                        xl: '1rem'
                                    }
                                }}>
                                    Would you like to invest individually or through a syndicate? <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' },
                                    gap: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3 },
                                    flexWrap: 'wrap'
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={form.individually}
                                                onChange={handleCheckbox}
                                                name="individually"
                                                sx={{
                                                    borderRadius: '8px',
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: {
                                                            xs: '1.25rem',
                                                            sm: '1.3rem',
                                                            md: '1.35rem',
                                                            lg: '1.4rem',
                                                            xl: '1.4rem'
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography sx={{
                                                fontSize: {
                                                    xs: '0.875rem',
                                                    sm: '0.9rem',
                                                    md: '0.95rem',
                                                    lg: '1rem',
                                                    xl: '1rem'
                                                }
                                            }}>
                                                Individually
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={form.syndicate}
                                                onChange={handleCheckbox}
                                                name="syndicate"
                                                sx={{
                                                    borderRadius: '8px',
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: {
                                                            xs: '1.25rem',
                                                            sm: '1.3rem',
                                                            md: '1.35rem',
                                                            lg: '1.4rem',
                                                            xl: '1.4rem'
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography sx={{
                                                fontSize: {
                                                    xs: '0.875rem',
                                                    sm: '0.9rem',
                                                    md: '0.95rem',
                                                    lg: '1rem',
                                                    xl: '1rem'
                                                }
                                            }}>
                                                Through a syndicate
                                            </Typography>
                                        }
                                    />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: 1.5,
                                        color: '#666',
                                        fontWeight: 500,
                                        fontSize: {
                                            xs: '0.875rem',
                                            sm: '0.9rem',
                                            md: '0.95rem',
                                            lg: '1rem',
                                            xl: '1rem'
                                        }
                                    }}
                                >
                                    Why are you interested in this opportunity? <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <TextField
                                    name="reason"
                                    value={form.reason}
                                    onChange={(e) => handleFieldChange('reason', e.target.value)}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={6}
                                    size="small"
                                    placeholder="Explain your interest in this investment opportunity"
                                    error={!!errors.reason}
                                    helperText={errors.reason}
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.875rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 1, sm: 0.75, md: 0.6, lg: 0.5, xl: 0.5 },
                                            backgroundColor: '#fff',
                                            '& fieldset': {
                                                borderColor: errors.reason ? '#ff4444' : '#e0e0e0'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: errors.reason ? '#ff4444' : '#ddd'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: errors.reason ? '#ff4444' : '#4CAF50'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                                <Paper elevation={0} sx={{
                                    p: { xs: 1.5, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
                                    background: '#fafbfc',
                                    borderRadius: { xs: '8px', sm: '12px', md: '12px', lg: '12px', xl: '12px' },
                                    mb: { xs: 1.5, sm: 1.25, md: 1, lg: 1, xl: 1 },
                                    border: '1px solid #e0e0e0'
                                }}>
                                    <Typography variant="body2" sx={{
                                        color: '#222',
                                        fontSize: {
                                            xs: '0.8rem',
                                            sm: '0.85rem',
                                            md: '0.9rem',
                                            lg: '0.95rem',
                                            xl: '0.95rem'
                                        },
                                        lineHeight: 1.6
                                    }}>
                                        By expressing interest, you agree to our Non-Disclosure Agreement governing access to business plans, financials, and other sensitive documents.
                                    </Typography>
                                </Paper>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={form.nda}
                                            onChange={handleCheckbox}
                                            name="nda"
                                            sx={{
                                                borderRadius: '8px',
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: {
                                                        xs: '1.25rem',
                                                        sm: '1.3rem',
                                                        md: '1.35rem',
                                                        lg: '1.4rem',
                                                        xl: '1.4rem'
                                                    }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2" sx={{
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.85rem',
                                                md: '0.9rem',
                                                lg: '0.95rem',
                                                xl: '0.95rem'
                                            },
                                            lineHeight: 1.5
                                        }}>
                                            I agree to the NDA and understand that I may receive confidential documents.
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Box>

                {/* Fixed Footer with Submit Button */}
                <Box sx={{
                    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
                    pt: { xs: 1, sm: 1.25, md: 1.5, lg: 1.75, xl: 2 },
                    flexShrink: 0,
                    borderTop: '1px solid #E0E0E0',
                    backgroundColor: '#fff'
                }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading || !isFormValid() || !hasKYCDocuments}
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#33CC33',
                            color: '#fff',
                            borderRadius: { xs: '10px', sm: '12px', md: '12px', lg: '12px', xl: '12px' },
                            fontWeight: 600,
                            fontSize: {
                                xs: '0.95rem',
                                sm: '1rem',
                                md: '1.05rem',
                                lg: '1.1rem',
                                xl: '1.1rem'
                            },
                            py: { xs: 1.25, sm: 1, md: 0.875, lg: 0.75, xl: 0.75 },
                            minHeight: {
                                xs: '48px',
                                sm: '44px',
                                md: '42px',
                                lg: '40px',
                                xl: '40px'
                            },
                            '&:hover': {
                                backgroundColor: '#28a428',
                                color: '#fff',
                            },
                            '&:disabled': {
                                backgroundColor: isLoading ? '#28a428' : '#ccc',
                                color: isLoading ? '#fff' : '#666',
                                opacity: isLoading ? 0.7 : 1,
                            },
                        }}
                    >
                        {isLoading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CircularProgress size={20} sx={{ color: '#fff' }} />
                            </Box>
                        ) : (
                            'Submit interest'
                        )}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ExpressInterestModal; 