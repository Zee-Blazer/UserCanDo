"use client";

import { useGetInvestorDetailQuery } from '@/queries/businessApi';
import { ArrowBack, CalendarToday, Cancel, CheckCircle, Description, Email } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

const InvestorDetailsPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const interestId = searchParams.get('id');

    const { data, isLoading, error } = useGetInvestorDetailQuery(interestId || '', {
        skip: !interestId,
    });

    const investor = data?.payload;

    if (isLoading) {
        return (
            <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress sx={{ color: '#33CC33' }} />
            </Box>
        );
    }

    if (error || !investor) {
        return (
            <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
                <div className='p-4 bg-red-50 border border-red-200 rounded-lg'>
                    <p className="text-red-600 text-sm font-medium">
                        Failed to load investor details. Please try again.
                    </p>
                </div>
            </Box>
        );
    }

    const documentFields = [
        { key: 'business_plan', label: 'Business Plan' },
        { key: 'financial_statements', label: 'Financial Statements' },
        { key: 'financial_projections', label: 'Financial Projections' },
        { key: 'pitch_deck', label: 'Pitch Deck' },
        { key: 'cap_table', label: 'Cap Table' },
        { key: 'director_id', label: 'Director ID' },
        { key: 'certificate_of_incorporation', label: 'Certificate of Incorporation' },
        { key: 'legal_agreements', label: 'Legal Agreements' },
        { key: 'market_analysis', label: 'Market Analysis' },
        { key: 'product_demo', label: 'Product Demo' },
        { key: 'customer_references', label: 'Customer References' },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
                <ArrowBack fontSize="small" />
                <span className="font-medium">Back to Investors</span>
            </button>

            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <Typography variant="h4" className="font-bold text-[#1E1E1E] mb-2">
                                {investor.investor_name}
                            </Typography>
                            <div className="flex flex-wrap items-center gap-3 text-[#6A6A6A]">
                                <div className="flex items-center gap-1">
                                    <Email fontSize="small" />
                                    <span>{investor.email}</span>
                                </div>
                            </div>
                        </div>
                        <Chip
                            icon={investor.nda_signed ? <CheckCircle /> : <Cancel />}
                            label={investor.nda_signed ? 'NDA Signed' : 'NDA Not Signed'}
                            color={investor.nda_signed ? 'success' : 'warning'}
                            sx={{ px: 2, py: 3, fontSize: '0.875rem', fontWeight: 600 }}
                        />
                    </div>

                    <Divider sx={{ my: 3 }} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-start gap-2">
                            <CalendarToday fontSize="small" className="text-[#6A6A6A] mt-1" />
                            <div>
                                <Typography variant="caption" className="text-[#ADACAC] block mb-1">
                                    Interest Expressed On
                                </Typography>
                                <Typography variant="body1" className="font-medium">
                                    {new Date(investor.expressed_interest_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Description fontSize="small" className="text-[#6A6A6A] mt-1" />
                            <div>
                                <Typography variant="caption" className="text-[#ADACAC] block mb-1">
                                    Status
                                </Typography>
                                <Typography variant="body1" className="font-medium">
                                    {investor.status || 'Pending Review'}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {investor.notes && (
                <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" className="font-bold text-[#1E1E1E] mb-3">
                            Investor Notes
                        </Typography>
                        <Typography variant="body1" className="text-[#6A6A6A] whitespace-pre-wrap">
                            {investor.notes}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            <Card sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" className="font-bold text-[#1E1E1E] mb-4">
                        Requested Documents
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {documentFields.map((field) => {
                            const docUrl = investor.requested_docs[field.key as keyof typeof investor.requested_docs];
                            const hasDocument = docUrl && docUrl.trim() !== '';

                            return (
                                <div key={field.key} className={`
                                    p-4 rounded-lg border-2 transition-all duration-200
                                    ${hasDocument
                                        ? 'border-green-300 bg-green-50 hover:border-green-400'
                                        : 'border-gray-200 bg-gray-50'
                                    }
                                `}>
                                    <div className="flex items-center justify-between mb-2">
                                        <Typography variant="body2" className="font-semibold text-[#1E1E1E]">
                                            {field.label}
                                        </Typography>
                                        {hasDocument ? (
                                            <CheckCircle fontSize="small" className="text-green-600" />
                                        ) : (
                                            <Cancel fontSize="small" className="text-gray-400" />
                                        )}
                                    </div>
                                    {hasDocument ? (
                                        <a
                                            href={docUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-green-600 hover:text-green-700 hover:underline font-medium"
                                        >
                                            View Document
                                        </a>
                                    ) : (
                                        <Typography variant="caption" className="text-gray-500">
                                            Not Provided
                                        </Typography>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
}

export default InvestorDetailsPage;
