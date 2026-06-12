import { CheckCircle, Delete, Description } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useGetInvestorSettingsQuery, useUploadInvestorIdDocumentsMutation } from '../../../queries/dashboardApi';
import { CustomButton } from '../../General/ui';

const KYCSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Get investor settings data
    const { data: investorSettings, isLoading, refetch, error: settingsError } = useGetInvestorSettingsQuery();
    const [uploadInvestorIdDocuments, { isLoading: isUpdating }] = useUploadInvestorIdDocumentsMutation();

    // File state for documents
    const [idDocumentFile, setIdDocumentFile] = useState<File | null>(null);
    const [idDocumentPreview, setIdDocumentPreview] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const idDocumentInputRef = useRef<HTMLInputElement>(null);

    const settingsPayload = React.useMemo(() => {
        if (!investorSettings) {
            return undefined;
        }

        const rawSettings = investorSettings as any;
        if (rawSettings && typeof rawSettings === 'object') {
            if (rawSettings.payload && typeof rawSettings.payload === 'object') {
                return rawSettings.payload;
            }
            return rawSettings;
        }

        return undefined;
    }, [investorSettings]);

    const getStatusColor = (status: string) => {
        if (!status) return { bg: '#f5f5f5', color: '#999' };
        const lowerStatus = status.toLowerCase();
        switch (lowerStatus) {
            case 'verified':
            case 'approved':
            case 'active':
                return { bg: '#e8f5e9', color: '#2e7d32' };
            case 'pending':
                return { bg: '#fff3e0', color: '#f57c00' };
            case 'rejected':
                return { bg: '#ffebee', color: '#c62828' };
            default:
                return { bg: '#f5f5f5', color: '#999' };
        }
    };

    // Get current documents from settings
    const currentIdDocument = settingsPayload?.personal_information?.identification_document || null;

    // Check if KYC documents are uploaded (regardless of verification status)
    const hasUploadedDocuments = React.useMemo(() => {
        return !!(currentIdDocument && currentIdDocument.trim() !== '');
    }, [currentIdDocument]);

    // Get verification status and date - handle both object and string cases
    const verificationData = React.useMemo(() => {
        const others = settingsPayload?.others;

        // If others is an object, read directly
        if (others && typeof others === 'object' && others !== null && !Array.isArray(others)) {
            return {
                status: others.verification_status || others.status || '',
                date: others.verification_date || others.verified_at || null
            };
        }

        // If others is a string, try to parse it
        if (typeof others === 'string' && others.trim() !== '') {
            try {
                const parsed = JSON.parse(others);
                if (typeof parsed === 'object' && parsed !== null) {
                    return {
                        status: parsed.verification_status || parsed.status || '',
                        date: parsed.verification_date || parsed.verified_at || null
                    };
                }
            } catch (e) {
                // If parsing fails, return empty
            }
        }

        // Also check if verification status is at the root level of settingsPayload
        if (settingsPayload) {
            const rootStatus = (settingsPayload as any).verification_status;
            const rootDate = (settingsPayload as any).verification_date || (settingsPayload as any).verified_at;
            if (rootStatus) {
                return {
                    status: rootStatus,
                    date: rootDate || null
                };
            }
        }

        return { status: '', date: null };
    }, [settingsPayload]);

    // Check if KYC documents are uploaded AND verified
    const hasKYCDocuments = React.useMemo(() => {
        if (!hasUploadedDocuments) {
            return false;
        }
        // Check verification status - if verified, approved, or active, documents are complete
        const verificationStatus = verificationData.status?.toLowerCase();
        return verificationStatus === 'verified' || verificationStatus === 'approved' || verificationStatus === 'active';
    }, [hasUploadedDocuments, verificationData.status]);


    const rawStatus = verificationData.status || '';
    const verificationDate = verificationData.date || null;


    const status = React.useMemo(() => {
        if (!hasUploadedDocuments) {
            // No documents uploaded, don't show "pending"
            return '';
        }
        // Documents are uploaded
        const lowerStatus = rawStatus?.toLowerCase();
        if (lowerStatus === 'verified' || lowerStatus === 'approved' || lowerStatus === 'active') {
            return 'verified';
        }
        // Documents are uploaded but not verified yet - show the actual status
        if (lowerStatus) {
            return lowerStatus;
        }
        return 'pending';
    }, [hasUploadedDocuments, rawStatus]);

    const statusColors = getStatusColor(status);

    // Initialize previews when settings load
    React.useEffect(() => {
        if (currentIdDocument && !idDocumentFile) {

            if (typeof currentIdDocument === 'string' && (currentIdDocument.startsWith('http://') || currentIdDocument.startsWith('https://'))) {
                setIdDocumentPreview(currentIdDocument);
            } else if (typeof currentIdDocument === 'string') {
                setIdDocumentPreview(currentIdDocument);
            }
        } else if (!currentIdDocument && !idDocumentFile) {
            // Clear preview if no document is available
            setIdDocumentPreview(null);
        }
    }, [currentIdDocument, idDocumentFile]);

    // Cleanup preview URLs on unmount
    React.useEffect(() => {
        return () => {
            if (idDocumentPreview && idDocumentPreview.startsWith('blob:')) {
                URL.revokeObjectURL(idDocumentPreview);
            }
        };
    }, [idDocumentPreview]);


    const handleIdDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                setError('Please select a PDF, JPG, or PNG file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setIdDocumentFile(file);
            const previewUrl = URL.createObjectURL(file);
            setIdDocumentPreview(previewUrl);
            if (error) setError(null);
        }
    };

    const handleRemoveIdDocument = () => {
        if (idDocumentPreview && idDocumentPreview.startsWith('blob:')) {
            URL.revokeObjectURL(idDocumentPreview);
        }
        setIdDocumentFile(null);
        setIdDocumentPreview(currentIdDocument || null);
        if (idDocumentInputRef.current) {
            idDocumentInputRef.current.value = '';
        }
    };

    const handleSave = async () => {
        setError(null);
        try {
            // Only upload if there are files to upload
            if (!idDocumentFile) {
                setIsEditing(false);
                return;
            }

            // Create FormData for multipart/form-data upload
            const formData = new FormData();

            // Add ID document if provided
            if (idDocumentFile) {
                formData.append('id_document', idDocumentFile, idDocumentFile.name);
            }

            // Upload documents using the new endpoint
            await uploadInvestorIdDocuments(formData).unwrap();

            toast.success('KYC documents uploaded successfully');

            // Reset file states after successful save
            setIdDocumentFile(null);
            setIsEditing(false);

            // Refetch settings to get updated document status
            await refetch();
        } catch (error: any) {
            const errorMessage = error?.data?.message || error?.message || 'Failed to upload KYC documents. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    const handleCancel = () => {
        // Reset to original state
        if (idDocumentPreview && idDocumentPreview.startsWith('blob:')) {
            URL.revokeObjectURL(idDocumentPreview);
        }
        setIdDocumentFile(null);
        setIdDocumentPreview(currentIdDocument || null);
        if (idDocumentInputRef.current) {
            idDocumentInputRef.current.value = '';
        }
        setError(null);
        setIsEditing(false);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            {/* Section Header */}
            <Box
                sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderBottom: '1px solid #f0f0f0',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 500,
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        color: '#333'
                    }}
                >
                    KYC & Identity Verification
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                disabled={isUpdating}
                                className="text-sm text-gray-600 py-2 px-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isUpdating || !idDocumentFile}
                                className="text-sm text-white py-2 px-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-200 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isUpdating && (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                )}
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-sm text-[#1E1E1E] py-2 px-5 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
                        >
                            Edit
                        </button>
                    )}
                </Box>
            </Box>

            {/* Section Content */}
            <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                {settingsError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Failed to load settings. Please refresh the page or try again later.
                        {(settingsError as any)?.data?.message && (
                            <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                                {(settingsError as any).data.message}
                            </Typography>
                        )}
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#999',
                                    mb: 0.5,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                            >
                                Status
                            </Typography>
                            {status ? (
                                <Chip
                                    label={status}
                                    size="small"
                                    sx={{
                                        backgroundColor: statusColors.bg,
                                        color: statusColors.color,
                                        fontWeight: 500,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        height: { xs: 24, sm: 28 }
                                    }}
                                />
                            ) : (
                                <Typography variant="body2" sx={{ color: '#999', fontSize: '0.875rem' }}>
                                    Not verified
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
                        <Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#999',
                                    mb: 0.5,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                            >
                                Verification Date
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    color: '#333'
                                }}
                            >
                                {verificationDate ? new Date(verificationDate).toLocaleDateString() : 'N/A'}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Document Upload Sections */}
                <Box sx={{ mt: 4 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            fontSize: { xs: '1rem', sm: '1.125rem' },
                            color: '#333'
                        }}
                    >
                        Required Documents
                    </Typography>

                    <Grid container spacing={3}>
                        {/* Identification Document */}
                        <Grid size={{ xs: 12 }}>
                            <Box
                                sx={{
                                    border: '2px dashed #e0e0e0',
                                    borderRadius: '12px',
                                    p: 3,
                                    backgroundColor: '#fafafa',
                                    position: 'relative',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        borderColor: isEditing ? '#4CAF50' : '#e0e0e0',
                                        backgroundColor: isEditing ? '#f1f8e9' : '#fafafa',
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '8px',
                                            backgroundColor: (idDocumentPreview || currentIdDocument) ? '#4CAF50' : '#e0e0e0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {(idDocumentPreview || currentIdDocument) ? (
                                            <CheckCircle sx={{ color: 'white', fontSize: '1.5rem' }} />
                                        ) : (
                                            <Description sx={{ color: '#999', fontSize: '1.5rem' }} />
                                        )}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', mb: 0.25, fontSize: '1rem' }}>
                                            Identification Document
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                            National ID, Passport, or Driver's License
                                        </Typography>
                                        {(idDocumentFile || currentIdDocument) && (
                                            <Typography variant="caption" color="primary" sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}>
                                                {idDocumentFile ? idDocumentFile.name : 'Document uploaded'}
                                            </Typography>
                                        )}
                                    </Box>
                                    {isEditing && (
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {(idDocumentPreview || currentIdDocument) && (
                                                <IconButton
                                                    onClick={handleRemoveIdDocument}
                                                    size="small"
                                                    sx={{
                                                        color: 'error.main',
                                                        '&:hover': {
                                                            backgroundColor: 'error.light',
                                                            color: 'error.dark'
                                                        }
                                                    }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            )}
                                            <input
                                                ref={idDocumentInputRef}
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                                                style={{ display: 'none' }}
                                                onChange={handleIdDocumentChange}
                                            />
                                            <CustomButton
                                                variant={idDocumentPreview || currentIdDocument ? 'outline' : 'primary'}
                                                onClick={() => idDocumentInputRef.current?.click()}
                                                sx={{ fontSize: '0.875rem', py: 0.5, px: 2 }}
                                            >
                                                {idDocumentPreview || currentIdDocument ? 'Change' : 'Upload'}
                                            </CustomButton>
                                        </Box>
                                    )}
                                </Box>
                                {!isEditing && currentIdDocument && (
                                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                        <Button
                                            variant="text"
                                            size="small"
                                            href={currentIdDocument}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                textTransform: 'none',
                                                color: '#4CAF50',
                                                fontSize: '0.875rem',
                                                '&:hover': {
                                                    backgroundColor: 'transparent',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            View Document
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, p: 1.5, backgroundColor: '#f0f4ff', borderRadius: '8px', border: '1px solid #e3f2fd' }}>
                        <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500, fontSize: '0.85rem' }}>
                            Note: All documents must be less than 5MB in size and in PDF, JPG, or PNG format.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default KYCSection;