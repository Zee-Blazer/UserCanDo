import { Box, Button, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Visibility, Download } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ExpressInterestModal from '../(dashboard)/opportunities/view-opportunity/express-intrest';
import { RootState } from '../../Redux/store';
import { BusinessListingDetailsResponse } from '../../types/queries-type';
import { CustomButton } from '../General/ui/custom-button';

interface DocumentListItem {
    name: string;
    type: string;
    url?: string | null;
}

interface DocumentTabContentProps {
    investment?: any;
    listingDetailsData?: BusinessListingDetailsResponse;
    onRequestAccess?: () => void;
    hasExpressedInterest?: boolean;
}

export const DocumentTabContent: React.FC<DocumentTabContentProps> = ({
    investment,
    listingDetailsData,
    onRequestAccess,
    hasExpressedInterest = false
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [interestModalOpen, setInterestModalOpen] = useState(false);

    // Get authentication state
    const authState = useSelector((state: RootState) => state.auth);
    const isAuthenticated = authState.isLoggedIn;

    const usesExternalRequestHandler = useMemo(
        () => typeof onRequestAccess === 'function',
        [onRequestAccess]
    );

    // Handle Express Interest button click
    const handleExpressInterest = () => {
        if (usesExternalRequestHandler) {
            onRequestAccess?.();
            return;
        }

        if (!isAuthenticated) {
            // Redirect to sign-up page for investors
            router.push('/sign-up?type=investor');
            return;
        }

        // If authenticated, open the modal
        setInterestModalOpen(true);
    };

    const handleCloseModal = () => {
        setInterestModalOpen(false);
    };

    // Check if documents are restricted
    const documentsRestricted = Boolean(
        investment?.documents_restricted ?? 
        listingDetailsData?.documents?.documents_restricted ?? 
        listingDetailsData?.documents?.gated
    );

    // Check if user can view all documents (has expressed interest or documents not restricted)
    const canViewAllDocuments = !documentsRestricted || hasExpressedInterest;

    // Get preview document
    const previewDocument = investment?.preview_document ?? listingDetailsData?.documents?.preview_document;

    // Extract documents from API data only - no hardcoded fallbacks
    const documents = useMemo<DocumentListItem[]>(() => {
        // If documents are restricted and user hasn't expressed interest, show only preview document
        if (documentsRestricted && !hasExpressedInterest) {
            if (previewDocument?.file && previewDocument.file.trim() !== '') {
                return [{
                    name: previewDocument.name || 'Preview Document',
                    type: previewDocument.file?.split('.').pop()?.toUpperCase() || 'PDF',
                    url: previewDocument.file
                }];
            }
            // If preview document has no file, return empty array
            return [];
        }

        // Priority 1: Use documents from documents_object (new API structure from /api/v1/investor/business-listings)
        if (investment?.documents_object && typeof investment.documents_object === 'object') {
            try {
                const entries = Object.entries(investment.documents_object);
                const filtered = entries
                    .filter(([key, value]) => {
                        // Check if value is a string URL or an object with a file property
                        if (typeof value === 'string' && value.trim() !== '') return true;
                        if (typeof value === 'object' && value !== null && (value as any).file && (value as any).file.trim() !== '') return true;
                        return false;
                    })
                    .map(([key, value]) => {
                        const url = typeof value === 'string' ? value : (value as any).file;
                        const name = typeof value === 'object' && (value as any).name 
                            ? (value as any).name 
                            : key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        return {
                            name,
                            type: url?.split('.').pop()?.toUpperCase() || 'PDF',
                            url
                        };
                    });
                if (filtered.length > 0) {
                    return filtered;
                }
            } catch (error) {
                console.error('Error processing documents_object:', error);
            }
        }

        // Priority 2: Use documents from listingDetailsData endpoint
        if (listingDetailsData?.documents?.docs && Array.isArray(listingDetailsData.documents.docs) && listingDetailsData.documents.docs.length > 0) {
            const filtered = listingDetailsData.documents.docs
                .filter((doc: any) => doc.file && doc.file.trim() !== '')
                .map((doc: any) => ({
                    name: doc.name || 'Document',
                    type: doc.file?.split('.').pop()?.toUpperCase() || 'PDF',
                    url: doc.file
                }));
            if (filtered.length > 0) {
                return filtered;
            }
        }

        // Priority 3: Use investment documents from essential_documents (old endpoint structure)
        if (investment?.documents && typeof investment.documents === 'object' && investment.documents !== null) {
            try {
                const entries = Object.entries(investment.documents);
                const filtered = entries
                    .filter(([key, url]) => url && typeof url === 'string' && (url as string).trim() !== '')
                    .map(([key, url]) => ({
                        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        type: (url as string)?.split('.').pop()?.toUpperCase() || 'PDF',
                        url: url as string
                    }));
                if (filtered.length > 0) {
                    return filtered;
                }
            } catch (error) {
                console.error('Error processing documents:', error);
            }
        }

        // Priority 4: Use essential_documents if available
        if (investment?.essential_documents && typeof investment.essential_documents === 'object' && investment.essential_documents !== null) {
            try {
                const entries = Object.entries(investment.essential_documents);
                const filtered = entries
                    .filter(([key, url]) => url && typeof url === 'string' && (url as string).trim() !== '')
                    .map(([key, url]) => ({
                        name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        type: (url as string)?.split('.').pop()?.toUpperCase() || 'PDF',
                        url: url as string
                    }));
                if (filtered.length > 0) {
                    return filtered;
                }
            } catch (error) {
                console.error('Error processing essential_documents:', error);
            }
        }

        // No documents available from API
        return [];
    }, [listingDetailsData, investment, documentsRestricted, hasExpressedInterest, previewDocument]);

    return (
        <Box>
            {/* Title and Subtitle */}
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.25rem', md: '2rem' }, color: '#043A66' }}>
                    Due Diligence Documents
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '0.95rem', md: '1.1rem' }, color: '#043A66' }}>
                    Access to business documentation and legal materials
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}>
                    {documentsRestricted && !hasExpressedInterest
                        ? 'Documents are restricted for this listing. Please express interest to unlock all documents.'
                        : 'The following documents are available for review.'}
                </Typography>
            </Box>

            {/* Document List */}
            {documents.length > 0 ? (
                <Paper elevation={0} sx={{ borderRadius: '24px', overflow: 'hidden', mb: { xs: 3, md: 4 }, border: '1px solid #e0e0e0' }}>
                    {documents.map((doc, idx) => (
                        <Box
                            key={`${doc.name}-${idx}`}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                px: { xs: 2, md: 3 },
                                py: { xs: 2, md: 2.5 },
                                borderBottom: idx !== documents.length - 1 ? '1px solid #e0e0e0' : 'none',
                                background: '#fff',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, flex: 1 }}>
                                <Image src="/document.png" alt="Document" width={32} height={32} />
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: '#043A66', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {doc.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}>
                                        {doc.type}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {/* View Button */}
                                <Button
                                    startIcon={<Visibility sx={{ fontSize: 20 }} />}
                                    sx={{
                                        color: '#043A66',
                                        fontWeight: 600,
                                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                                        textTransform: 'none',
                                        borderRadius: '20px',
                                        px: { xs: 1.5, md: 2 },
                                        py: 1,
                                        minWidth: 0,
                                        border: '1px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            borderColor: '#043A66',
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd',
                                            borderColor: '#e0e0e0',
                                        }
                                    }}
                                    disabled={(documentsRestricted && !hasExpressedInterest) || !doc.url}
                                    onClick={() => {
                                        if (doc.url) {
                                            // Use Google Docs viewer for PDFs and other document types
                                            const isPdf = doc.type === 'PDF' || doc.url.toLowerCase().endsWith('.pdf');
                                            if (isPdf) {
                                                window.open(`https://docs.google.com/gview?url=${encodeURIComponent(doc.url)}&embedded=true`, '_blank', 'noopener,noreferrer');
                                            } else {
                                                // For other file types, open directly
                                                window.open(doc.url, '_blank', 'noopener,noreferrer');
                                            }
                                        }
                                    }}
                                >
                                    View
                                </Button>
                                {/* Download Button */}
                                <Button
                                    startIcon={<Download sx={{ fontSize: 20 }} />}
                                    sx={{
                                        color: '#043A66',
                                        fontWeight: 600,
                                        fontSize: { xs: '0.85rem', md: '0.95rem' },
                                        textTransform: 'none',
                                        borderRadius: '20px',
                                        px: { xs: 1.5, md: 2 },
                                        py: 1,
                                        minWidth: 0,
                                        border: '1px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#f5f5f5',
                                            borderColor: '#043A66',
                                        },
                                        '&:disabled': {
                                            color: '#bdbdbd',
                                            borderColor: '#e0e0e0',
                                        }
                                    }}
                                    disabled={(documentsRestricted && !hasExpressedInterest) || !doc.url}
                                    onClick={async () => {
                                        if (doc.url) {
                                            try {
                                                // Try to fetch and download the file
                                                const response = await fetch(doc.url, {
                                                    method: 'GET',
                                                    headers: {
                                                        'Content-Type': 'application/octet-stream',
                                                    },
                                                });
                                                
                                                if (response.ok) {
                                                    const blob = await response.blob();
                                                    const url = window.URL.createObjectURL(blob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = `${doc.name}.${doc.type.toLowerCase()}`;
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    window.URL.revokeObjectURL(url);
                                                } else {
                                                    // If fetch fails (CORS), fall back to opening in new tab
                                                    window.open(doc.url, '_blank', 'noopener,noreferrer');
                                                }
                                            } catch (error) {
                                                // If fetch fails due to CORS or other issues, open in new tab
                                                // User can manually download from the browser
                                                window.open(doc.url, '_blank', 'noopener,noreferrer');
                                            }
                                        }
                                    }}
                                >
                                    Download
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Paper>
            ) : (
                <Paper 
                    elevation={0} 
                    sx={{ 
                        borderRadius: '24px', 
                        p: { xs: 3, md: 4 }, 
                        mb: { xs: 3, md: 4 }, 
                        border: '1px solid #e0e0e0',
                        textAlign: 'center'
                    }}
                >
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontSize: { xs: '0.95rem', md: '1rem' }, 
                            color: '#043A66',
                            fontStyle: 'italic'
                        }}
                    >
                        {documentsRestricted && !hasExpressedInterest
                            ? 'Documents are restricted for this listing. Please express interest to unlock all documents.'
                            : 'No documents are available yet.'}
                    </Typography>
                </Paper>
            )}

            {/* Express Interest Section - Only show if documents are restricted and user hasn't expressed interest */}
            {documentsRestricted && !hasExpressedInterest && (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: '20px',
                        p: { xs: 2, md: 3 },
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: '#043A66',
                            boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
                            transform: 'translateY(-4px)'
                        }
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1, fontSize: { xs: '1.1rem', md: '1.25rem' }, color: '#043A66' }}>
                        Express Interest to Access All Documents
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, fontSize: { xs: '0.95rem', md: '1rem' }, color: '#043A66' }}>
                        Express your interest in this investment opportunity to unlock access to all due diligence documents.
                    </Typography>
                    <CustomButton
                        variant="primary"
                        fullWidth={isMobile}
                        onClick={handleExpressInterest}
                        sx={{
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            py: 1.5,
                            px: 3,
                            backgroundColor: '#33CC33',
                            color: '#fff',
                            border: 'none',
                            '&:hover': {
                                backgroundColor: '#28a428',
                                color: '#fff',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Image src="/light-email.png" alt="Email" width={20} height={20} />
                            Express interest
                        </Box>
                    </CustomButton>
                </Paper>
            )}

            {/* Express Interest Modal */}
            {!usesExternalRequestHandler && (
                <ExpressInterestModal
                    open={interestModalOpen}
                    onClose={handleCloseModal}
                    listingId={investment?.id || investment?.listing_id}
                />
            )}
        </Box>
    );
};

export default DocumentTabContent; 