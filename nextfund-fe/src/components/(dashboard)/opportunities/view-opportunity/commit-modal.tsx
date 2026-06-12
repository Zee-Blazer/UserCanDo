import { Delete } from '@mui/icons-material';
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, Link, Modal, Paper, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useUploadFileMutation } from '../../../../queries/authApi';
import { useCreateInvestmentMutation } from '../../../../queries/businessApi';
import { CreateInvestmentRequest } from '../../../../types/queries-type';

interface CommitModalProps {
    open: boolean;
    onClose: () => void;
    onComplete?: () => void;
    listingId: string;
    hasExpressedInterest?: boolean; // Track if user has already expressed interest
    investmentMode?: 'individually' | 'syndicate' | null; // Investment mode from express interest
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '98vw',
        sm: '95vw',
        md: '90vw',
        lg: '85vw',
        xl: 900
    },
    maxWidth: {
        xs: '98vw',
        sm: '95vw',
        md: '90vw',
        lg: 800,
        xl: 900
    },
    maxHeight: {
        xs: '95vh',
        sm: '90vh',
        md: '90vh',
        lg: '90vh',
        xl: '85vh'
    },
    bgcolor: 'background.paper',
    borderRadius: {
        xs: '16px',
        sm: '18px',
        md: '20px',
        lg: '20px',
        xl: '20px'
    },
    boxShadow: 24,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
};

export const CommitModal: React.FC<CommitModalProps> = ({
    open = false,
    onClose = () => { },
    onComplete,
    listingId = '',
    hasExpressedInterest = false,
    investmentMode = null
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    // API mutation
    const [createInvestment, { isLoading: mutationLoading, error }] = useCreateInvestmentMutation();
    const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [isAmountFromExpressInterest, setIsAmountFromExpressInterest] = useState(false);
    const [mode, setMode] = useState({ individually: false, syndicate: false });

    // Auto-select investment mode and pre-fill amount from express interest when modal opens
    useEffect(() => {
        if (open) {
            // Set investment mode
            if (investmentMode) {
                if (investmentMode === 'individually') {
                    setMode({ individually: true, syndicate: false });
                } else if (investmentMode === 'syndicate') {
                    setMode({ individually: false, syndicate: true });
                }
            }

            // Pre-fill investment amount from sessionStorage
            const storedAmount = sessionStorage.getItem(`investment_amount_${listingId}`);
            if (storedAmount) {
                setAmount(storedAmount);
                setIsAmountFromExpressInterest(true);
            } else {
                setIsAmountFromExpressInterest(false);
            }
        }
    }, [open, investmentMode, listingId]);
    const [bank, setBank] = useState(false);
    const [crypto, setCrypto] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [cryptoHash, setCryptoHash] = useState('');
    const [agree1, setAgree1] = useState(false);
    const [agree2, setAgree2] = useState(false);
    const [isUploadingProof, setIsUploadingProof] = useState(false);
    const [uploadedFileDetails, setUploadedFileDetails] = useState<{
        name: string;
        size: number;
        url: string;
    } | null>(null);

    // Validation state
    const [errors, setErrors] = useState({
        amount: '',
        initialTrancheAmount: '',
        postProductLaunchAmount: '',
        q2ExpansionPlanAmount: '',
        afterRevenueTargetAmount: '',
    });

    // Notification state
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'warning' | 'info';
    }>({
        open: false,
        message: '',
        severity: 'info'
    });

    // Preferred Disbursement Timeline state
    const [disbursementTimeline, setDisbursementTimeline] = useState({
        initialTrancheAmount: '',
        initialTrancheDate: '',
        postProductLaunchAmount: '',
        postProductLaunchDate: '',
        q2ExpansionPlanAmount: '',
        q2ExpansionPlanDate: '',
        afterRevenueTargetAmount: '',
        afterRevenueTargetDate: '',
    });
    // Validation functions
    const validateField = (field: string, value: string): string => {
        switch (field) {
            case 'amount':
                const numericAmount = parseFormattedNumber(value);
                if (value.trim() === '') return 'Investment amount is required';
                if (numericAmount <= 0) return 'Please enter a valid investment amount';
                return '';
            case 'initialTrancheAmount':
            case 'postProductLaunchAmount':
            case 'q2ExpansionPlanAmount':
            case 'afterRevenueTargetAmount':
                const numericValue = parseFormattedNumber(value);
                if (value.trim() === '') return 'Amount is required';
                if (numericValue <= 0) return 'Please enter a valid amount';
                return '';
            default:
                return '';
        }
    };

    const handleFieldChange = (field: string, value: string) => {
        if (field === 'amount') {
            setAmount(value);
        } else {
            setDisbursementTimeline(prev => ({
                ...prev,
                [field]: value
            }));
        }

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

        setAmount(formattedValue);

        // Clear error when user starts typing
        if (errors.amount) {
            setErrors(prev => ({ ...prev, amount: '' }));
        }
    };

    const handleDisbursementAmountChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // Clean the value by removing commas and other formatting before storing
        const cleanValue = value.replace(/[^0-9.]/g, '');
        const formattedValue = cleanValue ? Number(cleanValue).toLocaleString() : '';

        setDisbursementTimeline(prev => ({
            ...prev,
            [field]: formattedValue
        }));

        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Parse formatted number back to numeric value
    const parseFormattedNumber = (value: string): number => {
        return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    };

    // Check if form is valid
    const isFormValid = () => {
        const amountValid = amount.trim() !== '' && parseFormattedNumber(amount) > 0;
        const disbursementValid = Object.values(disbursementTimeline).every(value => value.trim() !== '');
        const paymentMethodValid = bank || crypto;
        const agreementsValid = agree1 && agree2;
        const proofOfPaymentValid = uploadedFileDetails || cryptoHash.trim();

        return amountValid && disbursementValid && paymentMethodValid && agreementsValid && proofOfPaymentValid && listingId && !isUploadingProof;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setCryptoHash(''); // Clear crypto hash when file is selected
        }
    };

    const handleCryptoHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCryptoHash(e.target.value);
        if (e.target.value) {
            setFile(null); // Clear file when crypto hash is entered
            setUploadedFileDetails(null); // Clear uploaded file details
        }
    };

    // Helper function to format file size
    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Handle file upload with proper loading state
    const handleFileUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            setIsUploadingProof(true);
            setCryptoHash(''); // Clear crypto hash when file is selected

            try {
                const formData = new FormData();
                formData.append('file', file);
                const result = await uploadFile(formData).unwrap();

                setUploadedFileDetails({
                    name: file.name,
                    size: file.size,
                    url: result.payload
                });
                setFile(file);
                showNotification('File uploaded successfully!', 'success');
            } catch (error) {
                showNotification('Failed to upload file. Please try again.', 'error');
            } finally {
                setIsUploadingProof(false);
            }
        };
        input.click();
    };

    // Handle file deletion
    const handleFileDelete = () => {
        setFile(null);
        setUploadedFileDetails(null);
    };

    const handleDisbursementChange = (field: string, value: string) => {
        setDisbursementTimeline(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Show notification helper
    const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    // Close notification
    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Validate listingId
            if (!listingId) {
                showNotification('Invalid opportunity. Please refresh and try again.', 'error');
                return;
            }

            // Validate all fields
            const newErrors = {
                amount: validateField('amount', amount),
                initialTrancheAmount: validateField('initialTrancheAmount', disbursementTimeline.initialTrancheAmount),
                postProductLaunchAmount: validateField('postProductLaunchAmount', disbursementTimeline.postProductLaunchAmount),
                q2ExpansionPlanAmount: validateField('q2ExpansionPlanAmount', disbursementTimeline.q2ExpansionPlanAmount),
                afterRevenueTargetAmount: validateField('afterRevenueTargetAmount', disbursementTimeline.afterRevenueTargetAmount),
            };

            setErrors(newErrors);

            // Check if there are any validation errors
            const hasErrors = Object.values(newErrors).some(error => error !== '');
            if (hasErrors) {
                showNotification('Please fix all validation errors before submitting.', 'warning');
                return;
            }

            // Validate required fields
            if (!agree1 || !agree2) {
                showNotification('Please accept all terms and conditions.', 'warning');
                return;
            }

            // Validate payment method
            if (!bank && !crypto) {
                showNotification('Please select a payment method.', 'warning');
                return;
            }

            // Validate proof of payment
            if (!uploadedFileDetails && !cryptoHash.trim()) {
                showNotification('Please upload proof of payment or provide crypto transaction hash.', 'warning');
                return;
            }

            // Determine payment method
            let paymentMethod: 'bank_transfer' | 'cryptocurrency';
            if (bank && crypto) {
                paymentMethod = 'bank_transfer';
            } else if (bank) {
                paymentMethod = 'bank_transfer';
            } else {
                paymentMethod = 'cryptocurrency';
            }

            // Validate disbursement timeline dates
            const disbursementDates = [
                disbursementTimeline.initialTrancheDate,
                disbursementTimeline.postProductLaunchDate,
                disbursementTimeline.q2ExpansionPlanDate,
                disbursementTimeline.afterRevenueTargetDate
            ];

            const hasEmptyDates = disbursementDates.some(date => !date.trim());
            if (hasEmptyDates) {
                showNotification('Please fill in all disbursement timeline dates.', 'warning');
                return;
            }

            // Validate date format (YYYY-MM-DD)
            const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
            const invalidDates = disbursementDates.filter(date => date.trim() && !dateFormatRegex.test(date.trim()));
            if (invalidDates.length > 0) {
                showNotification('Please ensure all dates are in the correct format (YYYY-MM-DD).', 'warning');
                return;
            }

            // Use uploaded file or crypto hash for proof of funds
            let proofOfFunds = '';
            let signedTermSheet = '';

            if (uploadedFileDetails) {
                proofOfFunds = uploadedFileDetails.url;
            } else if (cryptoHash.trim()) {
                proofOfFunds = cryptoHash.trim();
            }


            signedTermSheet = proofOfFunds || '';

            // Ensure dates are in YYYY-MM-DD format
            const formatDateForAPI = (dateString: string): string => {
                if (!dateString.trim()) return '';
                // If date is already in YYYY-MM-DD format, return as is
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateString.trim())) {
                    return dateString.trim();
                }
                // Try to parse and format if it's in a different format
                const date = new Date(dateString);
                if (!isNaN(date.getTime())) {
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                return dateString.trim();
            };

            // Prepare the request data matching API documentation
            const investmentData: CreateInvestmentRequest = {
                listing_id: listingId,
                amount: parseFormattedNumber(amount),
                payment_method: paymentMethod,
                proof_of_funds: proofOfFunds || '', // Empty string if not provided
                signed_term_sheet: signedTermSheet || '', // Empty string if not provided
                preferred_disbursement_timeline: {
                    initial_tranche_amount: parseFormattedNumber(disbursementTimeline.initialTrancheAmount),
                    initial_tranche_date: formatDateForAPI(disbursementTimeline.initialTrancheDate),
                    post_product_launch_amount: parseFormattedNumber(disbursementTimeline.postProductLaunchAmount),
                    post_product_launch_date: formatDateForAPI(disbursementTimeline.postProductLaunchDate),
                    q2_expansion_plan_amount: parseFormattedNumber(disbursementTimeline.q2ExpansionPlanAmount),
                    q2_expansion_plan_date: formatDateForAPI(disbursementTimeline.q2ExpansionPlanDate),
                    after_revenue_target_amount: parseFormattedNumber(disbursementTimeline.afterRevenueTargetAmount),
                    after_revenue_target_date: formatDateForAPI(disbursementTimeline.afterRevenueTargetDate),
                }
            };

            // Set loading state
            setIsLoading(true);

            // Call the API using the documented endpoint
            const result = await createInvestment(investmentData).unwrap();

            // Success
            showNotification('Investment submitted successfully!', 'success');

            // Add delay before closing modal to show loading longer
            await new Promise(resolve => setTimeout(resolve, 2000));

            setIsLoading(false);

            // Close modal and call onComplete
            onClose();
            if (onComplete) {
                onComplete();
            }

            // Route to investments page after successful investment
            router.push('/dashboard/investments');

        } catch (err: any) {
            setIsLoading(false);

            // Extract more specific error information
            let errorMessage = 'Failed to submit investment. Please try again.';

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
                errorMessage = 'Investment endpoint not found. Please contact support.';
            } else if (err?.status === 400) {
                if (errorMessage.toLowerCase().includes('already exist') || errorMessage.toLowerCase().includes('duplicate')) {
                    errorMessage = 'You have already invested in this opportunity. Please check your investments dashboard.';
                } else if (!errorMessage.includes('validation') && !errorMessage.includes('required')) {
                    errorMessage = errorMessage || '';
                }
            } else if (err?.status === 409) {
                errorMessage = 'Investment already exists for this opportunity. Please check your investments dashboard.';
            } else if (err?.status === 422) {
                errorMessage = errorMessage || '';
            } else if (err?.status === 500) {
                errorMessage = 'Server error occurred. Please contact support if this persists.';
            }

            showNotification(errorMessage, 'error');
        }
    };

    // Don't render if critical props are missing
    if (!onClose) {
        return null;
    }

    return (
        <>
            <Modal open={open} onClose={onClose} aria-labelledby="commit-modal" aria-describedby="commit-investment-modal">
                <Box sx={style}>
                    {/* Fixed Header */}
                    <Box sx={{
                        width: '100%',
                        p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
                        pb: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5, xl: 3 },
                        flexShrink: 0,
                        borderBottom: '1px solid #E0E0E0',
                        textAlign: 'left'
                    }}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                                mb: { xs: 0.75, sm: 0.5, md: 0.5, lg: 0.5, xl: 0.5 },
                                fontSize: {
                                    xs: '1.35rem',
                                    sm: '1.5rem',
                                    md: '1.75rem',
                                    lg: '2rem',
                                    xl: '2rem'
                                },
                                color: '#181818'
                            }}
                        >
                            Commit your Investments
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#6A6A6A',
                                fontSize: {
                                    xs: '0.95rem',
                                    sm: '1rem',
                                    md: '1.05rem',
                                    lg: '1.1rem',
                                    xl: '1.1rem'
                                }
                            }}
                        >
                            Final step to invest in TechPay Solutions
                        </Typography>
                    </Box>

                    {/* Scrollable Content */}
                    <Box
                        sx={{
                            width: '100%',
                            flex: 1,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
                            pt: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5, xl: 3 },
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#ccc',
                                borderRadius: '4px',
                            },
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                width: '100%',
                                p: 0,
                                background: 'transparent',
                                boxShadow: 'none',
                                textAlign: 'left',
                            }}
                        >

                            {!hasExpressedInterest && (
                                <Box sx={{
                                    mb: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
                                    p: { xs: 1.5, sm: 1.75, md: 2, lg: 2, xl: 2 },
                                    backgroundColor: '#fff3cd',
                                    border: '1px solid #ffeaa7',
                                    borderRadius: { xs: '8px', sm: '10px', md: '8px', lg: '8px', xl: '8px' }
                                }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#856404',
                                            fontWeight: 500,
                                            fontSize: {
                                                xs: '0.85rem',
                                                sm: '0.9rem',
                                                md: '0.95rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            }
                                        }}
                                    >
                                        ⚠️ Please express interest first before committing to invest.
                                    </Typography>
                                </Box>
                            )}
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
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
                                    Investment Amount <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <TextField
                                    value={amount}
                                    onChange={handleAmountChange}
                                    fullWidth
                                    size="small"
                                    placeholder="e.g., 1,000,000"
                                    error={!!errors.amount}
                                    helperText={errors.amount}
                                    disabled={isAmountFromExpressInterest}
                                    InputProps={{
                                        sx: {
                                            borderRadius: { xs: '8px', sm: '10px', md: '10px', lg: '10px', xl: '10px' },
                                            fontSize: {
                                                xs: '0.9rem',
                                                sm: '0.95rem',
                                                md: '1rem',
                                                lg: '1rem',
                                                xl: '1rem'
                                            },
                                            py: { xs: 0.75, sm: 0.625, md: 0.5, lg: 0.5, xl: 0.5 },
                                            backgroundColor: amount ? '#f5f5f5' : '#fff',
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
                            </Box>
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
                                        color: '#222',
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.05rem',
                                            md: '1.1rem',
                                            lg: '1.15rem',
                                            xl: '1.15rem'
                                        }
                                    }}
                                >
                                    Investment Mode
                                    {investmentMode && (
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            sx={{
                                                ml: { xs: 0.5, sm: 0.75, md: 1, lg: 1, xl: 1 },
                                                color: '#666',
                                                fontWeight: 400,
                                                fontSize: {
                                                    xs: '0.75rem',
                                                    sm: '0.8rem',
                                                    md: '0.85rem',
                                                    lg: '0.9rem',
                                                    xl: '0.9rem'
                                                },
                                                display: { xs: 'block', sm: 'inline', md: 'inline' },
                                                mt: { xs: 0.5, sm: 0, md: 0 }
                                            }}
                                        >
                                            (Pre-selected from Express Interest)
                                        </Typography>
                                    )}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    gap: { xs: 1.5, sm: 2, md: 2, lg: 2, xl: 2.5 },
                                    flexWrap: { xs: 'wrap', sm: 'nowrap', md: 'nowrap' }
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={mode.individually}
                                                disabled={!!investmentMode}
                                                onChange={() => {
                                                    if (!investmentMode) {
                                                        setMode(m => ({ ...m, individually: !m.individually }));
                                                    }
                                                }}
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: {
                                                            xs: '1.4rem',
                                                            sm: '1.45rem',
                                                            md: '1.5rem',
                                                            lg: '1.5rem',
                                                            xl: '1.5rem'
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}>
                                                Individually
                                            </Typography>
                                        }
                                        sx={{
                                            opacity: investmentMode && !mode.individually ? 0.5 : 1,
                                            cursor: investmentMode ? 'not-allowed' : 'pointer'
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={mode.syndicate}
                                                disabled={!!investmentMode}
                                                onChange={() => {
                                                    if (!investmentMode) {
                                                        setMode(m => ({ ...m, syndicate: !m.syndicate }));
                                                    }
                                                }}
                                                sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: {
                                                            xs: '1.4rem',
                                                            sm: '1.45rem',
                                                            md: '1.5rem',
                                                            lg: '1.5rem',
                                                            xl: '1.5rem'
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                        label={
                                            <Typography sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}>
                                                Through a syndicate
                                            </Typography>
                                        }
                                        sx={{
                                            opacity: investmentMode && !mode.syndicate ? 0.5 : 1,
                                            cursor: investmentMode ? 'not-allowed' : 'pointer'
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
                                        color: '#222',
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.05rem',
                                            md: '1.1rem',
                                            lg: '1.15rem',
                                            xl: '1.15rem'
                                        }
                                    }}
                                >
                                    Review Term Sheet
                                </Typography>
                                <Link
                                    href="#"
                                    underline="none"
                                    sx={{
                                        color: '#33CC33',
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: '0.95rem',
                                            sm: '1rem',
                                            md: '1.05rem',
                                            lg: '1.05rem',
                                            xl: '1.05rem'
                                        }
                                    }}
                                >
                                    View standard investment term sheet [PDF]
                                </Link>
                            </Box>
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
                                        color: '#222',
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.05rem',
                                            md: '1.1rem',
                                            lg: '1.15rem',
                                            xl: '1.15rem'
                                        }
                                    }}
                                >
                                    Payment Method <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={bank}
                                            onChange={() => {
                                                setBank(true);
                                                setCrypto(false);
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}
                                        >
                                            Bank Transfer (Mauritius Account – Pink Frog Ltd)
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={crypto}
                                            onChange={() => {
                                                setCrypto(true);
                                                setBank(false);
                                            }}
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: {
                                                        xs: '1.4rem',
                                                        sm: '1.45rem',
                                                        md: '1.5rem',
                                                        lg: '1.5rem',
                                                        xl: '1.5rem'
                                                    }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}
                                        >
                                            Cryptocurrency (USDT / USDC / BTC / ETH)
                                        </Typography>
                                    }
                                />
                            </Box>
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
                                        color: '#222',
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.05rem',
                                            md: '1.1rem',
                                            lg: '1.15rem',
                                            xl: '1.15rem'
                                        }
                                    }}
                                >
                                    Upload Proof of Payment <span style={{ color: '#ff4444' }}>*</span>
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {uploadedFileDetails ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                p: 2,
                                                backgroundColor: '#f8f9fa',
                                                border: '1px solid #e9ecef',
                                                borderRadius: '8px',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500, color: '#333', fontSize: '14px' }}>
                                                    {uploadedFileDetails.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                                                    {formatFileSize(uploadedFileDetails.size)}
                                                </Typography>
                                            </Box>
                                            <IconButton
                                                onClick={handleFileDelete}
                                                size="small"
                                                sx={{ color: '#f44336' }}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : isUploadingProof ? (
                                        <Box
                                            sx={{
                                                border: '1px solid #33CC33',
                                                borderRadius: '8px',
                                                p: '12px 16px',
                                                backgroundColor: '#33CC3308',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 2,
                                                animation: 'pulse 2s infinite',
                                                '@keyframes pulse': {
                                                    '0%': {
                                                        backgroundColor: '#33CC3308',
                                                        borderColor: '#33CC33'
                                                    },
                                                    '50%': {
                                                        backgroundColor: '#33CC3314',
                                                        borderColor: '#33CC33'
                                                    },
                                                    '100%': {
                                                        backgroundColor: '#33CC3308',
                                                        borderColor: '#33CC33'
                                                    }
                                                }
                                            }}
                                        >
                                            <CircularProgress size={20} sx={{ color: '#33CC33' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#33CC33',
                                                    fontSize: '14px',
                                                    fontWeight: 500
                                                }}
                                            >
                                                Uploading...
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Button
                                            component="label"
                                            sx={{
                                                textTransform: 'none',
                                                color: '#043A66',
                                                fontWeight: 600,
                                                fontSize: { xs: '1rem', md: '1.05rem' },
                                                px: 2,
                                                border: '1px solid #043A66',
                                                borderRadius: '8px',
                                                py: 0.5
                                            }}
                                            onClick={handleFileUpload}
                                        >
                                            Choose File
                                        </Button>
                                    )}
                                    <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                                        OR
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Paste crypto transaction hash here"
                                        value={cryptoHash}
                                        onChange={handleCryptoHashChange}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '8px',
                                                fontSize: { xs: '0.9rem', md: '1rem' },
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={agree1}
                                            onChange={() => setAgree1(a => !a)}
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: {
                                                        xs: '1.4rem',
                                                        sm: '1.45rem',
                                                        md: '1.5rem',
                                                        lg: '1.5rem',
                                                        xl: '1.5rem'
                                                    }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}
                                        >
                                            I understand this is a non-reversible investment commitment.
                                        </Typography>
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={agree2}
                                            onChange={() => setAgree2(a => !a)}
                                            sx={{
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: {
                                                        xs: '1.4rem',
                                                        sm: '1.45rem',
                                                        md: '1.5rem',
                                                        lg: '1.5rem',
                                                        xl: '1.5rem'
                                                    }
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: {
                                                    xs: '0.9rem',
                                                    sm: '0.95rem',
                                                    md: '1rem',
                                                    lg: '1.05rem',
                                                    xl: '1.05rem'
                                                }
                                            }}
                                        >
                                            I agree to the terms & conditions of Nexfund.
                                        </Typography>
                                    }
                                />
                            </Box>

                            {/* Preferred Disbursement Timeline Section */}
                            <Box sx={{ mb: { xs: 2, sm: 2.5, md: 2.5, lg: 2, xl: 2 } }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    sx={{
                                        mb: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2.5 },
                                        color: '#222',
                                        fontSize: {
                                            xs: '1rem',
                                            sm: '1.05rem',
                                            md: '1.1rem',
                                            lg: '1.15rem',
                                            xl: '1.15rem'
                                        }
                                    }}
                                >
                                    Preferred Disbursement Timeline
                                </Typography>

                                {/* Initial Tranche Amount */}
                                <Box sx={{ mb: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: { xs: 1.25, sm: 1.25, md: 1.25, lg: 1, xl: 1 },
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
                                        Initial Tranche Amount <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        value={disbursementTimeline.initialTrancheAmount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementAmountChange('initialTrancheAmount', e)}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 500,000"
                                        error={!!errors.initialTrancheAmount}
                                        helperText={errors.initialTrancheAmount}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: errors.initialTrancheAmount ? '#ff4444' : '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.initialTrancheAmount ? '#ff4444' : '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.initialTrancheAmount ? '#ff4444' : '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Initial Tranche Date */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Initial Tranche Date <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={disbursementTimeline.initialTrancheDate}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementChange('initialTrancheDate', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: { fontSize: '1rem' }
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Post Product Launch Amount */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Post Product Launch Amount <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        value={disbursementTimeline.postProductLaunchAmount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementAmountChange('postProductLaunchAmount', e)}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 300,000"
                                        error={!!errors.postProductLaunchAmount}
                                        helperText={errors.postProductLaunchAmount}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: errors.postProductLaunchAmount ? '#ff4444' : '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.postProductLaunchAmount ? '#ff4444' : '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.postProductLaunchAmount ? '#ff4444' : '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Post Product Launch Date */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Post Product Launch Date <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={disbursementTimeline.postProductLaunchDate}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementChange('postProductLaunchDate', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: { fontSize: '1rem' }
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Q2 Expansion Plan Amount */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Q2 Expansion Plan Amount <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        value={disbursementTimeline.q2ExpansionPlanAmount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementAmountChange('q2ExpansionPlanAmount', e)}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 200,000"
                                        error={!!errors.q2ExpansionPlanAmount}
                                        helperText={errors.q2ExpansionPlanAmount}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: errors.q2ExpansionPlanAmount ? '#ff4444' : '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.q2ExpansionPlanAmount ? '#ff4444' : '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.q2ExpansionPlanAmount ? '#ff4444' : '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Q2 Expansion Plan Date */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        Q2 Expansion Plan Date <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={disbursementTimeline.q2ExpansionPlanDate}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementChange('q2ExpansionPlanDate', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: { fontSize: '1rem' }
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* After Revenue Target Amount */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        After Revenue Target Amount <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        value={disbursementTimeline.afterRevenueTargetAmount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementAmountChange('afterRevenueTargetAmount', e)}
                                        fullWidth
                                        size="small"
                                        placeholder="e.g., 100,000"
                                        error={!!errors.afterRevenueTargetAmount}
                                        helperText={errors.afterRevenueTargetAmount}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: errors.afterRevenueTargetAmount ? '#ff4444' : '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: errors.afterRevenueTargetAmount ? '#ff4444' : '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: errors.afterRevenueTargetAmount ? '#ff4444' : '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* After Revenue Target Date */}
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1,
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.85rem', sm: '0.9rem' }
                                        }}
                                    >
                                        After Revenue Target Date <span style={{ color: '#ff4444' }}>*</span>
                                    </Typography>
                                    <TextField
                                        type="date"
                                        value={disbursementTimeline.afterRevenueTargetDate}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDisbursementChange('afterRevenueTargetDate', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                            shrink: true,
                                            sx: { fontSize: '1rem' }
                                        }}
                                        InputProps={{
                                            sx: {
                                                borderRadius: '10px',
                                                fontSize: '1rem',
                                                py: 0.5,
                                                backgroundColor: '#fff',
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0'
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#ddd'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#4CAF50'
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>

                    {/* Fixed Footer with Button */}
                    <Box sx={{
                        width: '100%',
                        p: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 4 },
                        pt: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5, xl: 3 },
                        flexShrink: 0,
                        borderTop: '1px solid #E0E0E0',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 1.5, sm: 1.5, md: 2, lg: 2, xl: 2.5 }
                    }}>
                        <Button
                            variant="contained"
                            fullWidth
                            disabled={isLoading || mutationLoading || isUploadingFile || isUploadingProof || !isFormValid() || !hasExpressedInterest}
                            sx={{
                                backgroundColor: '#33CC33',
                                color: '#fff',
                                borderRadius: { xs: '12px', sm: '14px', md: '16px', lg: '16px', xl: '16px' },
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem', xl: '1.25rem' },
                                py: { xs: 1.5, sm: 1.625, md: 1.75, lg: 2, xl: 2 },
                                minHeight: { xs: '48px', sm: '46px', md: '48px', lg: '52px', xl: '52px' },
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#28a428',
                                    color: '#fff',
                                },
                                '&:disabled': {
                                    backgroundColor: isLoading || mutationLoading ? '#28a428' : '#E0E0E0',
                                    color: isLoading || mutationLoading ? '#fff' : '#9E9E9E',
                                    opacity: isLoading || mutationLoading ? 0.7 : 1,
                                },
                            }}
                            onClick={handleSubmit}
                        >
                            {isLoading || mutationLoading ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress size={20} sx={{ color: '#fff' }} />
                                </Box>
                            ) : (
                                'Complete Investment'
                            )}
                        </Button>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6A6A6A',
                                textAlign: 'center',
                                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem', lg: '1rem', xl: '1rem' }
                            }}
                        >
                            Need help? <Box component="span" sx={{ color: '#33CC33', fontWeight: 600, cursor: 'pointer' }}>Contact Support</Box>
                        </Typography>
                    </Box>
                </Box>
            </Modal>

            {/* Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CommitModal; 