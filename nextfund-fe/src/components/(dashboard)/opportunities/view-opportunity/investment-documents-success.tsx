import { Search } from '@mui/icons-material';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { getCountryByCode } from '../../../../constants/countries';
import { COMPETITIVE_ADVANTAGES, getTabs, KEY_METRICS, TIMELINE_EVENTS } from '../../../../constants/landing-page-data';
import { useGetInvestorListingByIdQuery } from '../../../../queries/businessApi';
import { Investment } from '../../../../types/landing-page';
import { getCategoryIcon, transformListingDetailsToInvestment } from '../../../../utils/opportunityTransformer';
import { CustomButton } from '../../../General/ui/custom-button';
import { CompanyInformationCard } from '../../../investmet-detail/company-information-card';
import { ContactInformationCard } from '../../../investmet-detail/contact-information-card';
import DocumentTabContent from '../../../investmet-detail/document-tab-content';
import FinanceTabContent from '../../../investmet-detail/finance-tab-content';
import { InvestmentProgressCard } from '../../../investmet-detail/investment-progress-card';
import { KeyMetricsSection } from '../../../investmet-detail/key-metrics';
import { NavigationTabs } from '../../../investmet-detail/nav-tab';
import TeamTabContent from '../../../investmet-detail/team-tab-content';
import { InvestmentTimeline } from '../../../investmet-detail/timeline';
import { ChecklistModal } from './checklist-modal';
import { CommitModal } from './commit-modal';

interface InvestmentDocumentsSuccessProps {
    opportunityId: string;
}

export const InvestmentDocumentsSuccess: React.FC<InvestmentDocumentsSuccessProps> = ({ opportunityId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [checklistModalOpen, setChecklistModalOpen] = useState(false);
    const [commitModalOpen, setCommitModalOpen] = useState(false);
    const [hasInvested, setHasInvested] = useState(false);

    // Fetch opportunity data 
    const {
        data: listingData,
        error: listingError
    } = useGetInvestorListingByIdQuery(opportunityId);


    const opportunity: Investment | undefined = useMemo(() => {
        if (!listingData?.payload) {
            return undefined;
        }

        return transformListingDetailsToInvestment(listingData.payload);
    }, [listingData?.payload, opportunityId]);



    if (listingError || !opportunity) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    px: 4,
                    textAlign: 'center',
                    minHeight: '50vh',
                }}
            >
                {/* Icon */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#E8F5E8',
                        mb: 3,
                    }}
                >
                    <Search
                        sx={{
                            fontSize: '2rem',
                            color: '#33CC33'
                        }}
                    />
                </Box>

                {/* Main Heading */}
                <Typography
                    variant="h6"
                    sx={{
                        color: '#1F2937',
                        mb: 2,
                        fontWeight: 600,
                        fontSize: '1.25rem',
                    }}
                >
                    No investment opportunities available right now.
                </Typography>

                {/* Descriptive Text */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#6B7280',
                        maxWidth: '400px',
                        lineHeight: 1.5,
                        fontSize: '0.875rem',
                        mb: 3,
                    }}
                >
                    We're currently reviewing new businesses. Check back soon to explore verified opportunities.
                </Typography>

                {/* Back Button */}
                <CustomButton
                    variant="primary"
                    onClick={() => router.back()}
                    sx={{
                        minWidth: '120px',
                    }}
                >
                    Go Back
                </CustomButton>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: { xs: 0.5, sm: 1, md: 2 } }}>
            {/* Back Icon at the top */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, md: 2 } }}>
                <Box sx={{ cursor: 'pointer' }} onClick={() => router.back()}>
                    <Image src="/back.png" alt="Back" width={22} height={22} />
                </Box>
            </Box>
            {/* Header Section - single flex row */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: { xs: 1, md: 2 },
                    mb: { xs: 1, md: 2 },
                    px: { xs: 0, md: 0 },
                }}
            >
                {/* Left: Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{
                            color: '#181818',
                            fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.5rem' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {opportunity.title}
                    </Typography>
                </Box>
                {/* Middle: Badges */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        flex: '0 1 auto',
                        mt: { xs: 0.5, md: 0 },
                        mb: { xs: 0.5, md: 0 },
                        mr: { lg: 7 },
                    }}
                >
                    {/* Category */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src={getCategoryIcon(opportunity.category)} alt={opportunity.category} width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>{opportunity.category}</Typography>
                    </Box>
                    {/* Location */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src="/location.png" alt="Location" width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>
                            {(() => {
                                // Helper to check if a value is a valid location (not invalid placeholder text)
                                const isValidLocation = (value: string | undefined | null): boolean => {
                                    if (!value) return false;
                                    const trimmed = value.trim().toLowerCase();
                                    const invalidValues = ['none', 'null', 'n/a', 'na', 'growth', 'funding', 'lorem ipsum', 'unknown', 'not provided', 'not specified'];
                                    return !invalidValues.includes(trimmed) && trimmed.length > 0;
                                };

                                // Helper to convert country code to country name
                                const formatCountryName = (loc: string | undefined): string => {
                                    if (!loc) return 'Unknown Location';
                                    const trimmed = String(loc).trim();
                                    if (!trimmed) return 'Unknown Location';
                                    // Check if it's a country code (2-3 letters, case-insensitive)
                                    const upperTrimmed = trimmed.toUpperCase();
                                    if (/^[A-Z]{2,3}$/.test(upperTrimmed)) {
                                        const country = getCountryByCode(upperTrimmed);
                                        return country?.name || trimmed;
                                    }
                                    return trimmed;
                                };

                                const location = opportunity.location || opportunity.headquarters;
                                if (!location) return 'Unknown Location';
                                const formatted = formatCountryName(location);
                                return isValidLocation(formatted) ? formatted : 'Unknown Location';
                            })()}
                        </Typography>
                    </Box>
                    {/* Founded */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.1, borderRadius: '999px', border: '1.5px solid #F5F5F5', fontWeight: 500 }}>
                        <Image src="/calendar.png" alt="Founded" width={14} height={14} style={{ filter: 'invert(41%) sepia(97%) saturate(749%) hue-rotate(88deg) brightness(97%) contrast(101%)' }} />
                        <Typography variant="body1" sx={{ color: '#181818', fontWeight: 600, fontSize: '0.85rem' }}>Founded {opportunity.founded}</Typography>
                    </Box>
                </Box>
                {/* Right: Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 1.5,
                        width: { xs: '100%', md: 'auto' },
                        alignItems: { xs: 'stretch', md: 'center' },
                    }}
                >
                    <CustomButton
                        variant={hasInvested ? "outline" : "primary"}
                        sx={{
                            width: { xs: '100%', md: 'auto' },
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            px: { xs: 2, md: 4 },
                            py: { xs: 1.5, md: 1.5 },
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            ...(hasInvested && {
                                background: '#E8F5E8',
                                borderColor: '#33CC33',
                                color: '#33CC33',
                                cursor: 'not-allowed',
                            }),
                        }}
                        onClick={() => !hasInvested && setChecklistModalOpen(true)}
                        disabled={hasInvested}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Image src={hasInvested ? "/circle-tick-green.png" : "/circle-tick.png"} alt={hasInvested ? "Invested" : "Invest"} width={16} height={16} />
                            <span>{hasInvested ? 'Invested' : 'Invest'}</span>
                        </Box>
                    </CustomButton>
                    <CustomButton
                        variant="outline"
                        sx={{
                            width: { xs: '100%', md: 'auto' },
                            fontSize: { xs: '0.95rem', md: '1rem' },
                            px: { xs: 2, md: 4 },
                            py: { xs: 1.5, md: 1.5 },
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            background: '#F5F5F5',
                            color: '#181818',
                            border: 'none',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Image src="/download-light.png" alt="Download" width={16} height={16} />
                            <span>Download Documents</span>
                        </Box>
                    </CustomButton>
                </Box>
            </Box>
            {/* Navigation Tabs */}
            <NavigationTabs tabs={getTabs()} activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* Main Content Grid */}
            <Grid container spacing={{ xs: 3, md: 4 }}>
                {/* Left Column - Main Content */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {activeTab === 'team' ? (
                        <TeamTabContent investment={opportunity} />
                    ) : activeTab === 'financials' ? (
                        <FinanceTabContent investment={opportunity} />
                    ) : activeTab === 'documents' ? (
                        <DocumentTabContent 
                            investment={opportunity} 
                            hasExpressedInterest={true}
                        />
                    ) : (
                        // Default: show the existing overview content for 'overview'
                        <>
                            {/* Business Overview */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography variant="h5" fontWeight={600} sx={{ mb: { xs: 1.5, md: 2 }, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#043A66' }}>Business Overview</Typography>
                                <Typography variant="body2" sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}>{`Detailed information about ${opportunity.title}`}</Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.7, fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}>{opportunity.businessOverview || opportunity.description}</Typography>
                            </Box>
                            {/* Key Metrics */}
                            <KeyMetricsSection metrics={KEY_METRICS} />
                            {/* Market Opportunity */}
                            <Box sx={{ mb: { xs: 3, md: 4 } }}>
                                <Typography variant="h5" fontWeight={600} sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '1.25rem', md: '1.5rem' }, color: '#043A66' }}>Market Opportunity</Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.7, mb: { xs: 2, md: 3 }, fontSize: { xs: '0.875rem', md: '1rem' }, color: '#043A66' }}>
                                    The African fintech market is projected to grow at a CAGR of 25% over the next five years, with payment processing representing the largest segment. Small businesses, which make up over 90% of all businesses in Africa, are rapidly digitizing their operations, creating a massive opportunity for payment solutions that are tailored to their needs.
                                </Typography>
                                <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#043A66' }}>Competitive Advantage</Typography>
                                <ul style={{ paddingLeft: 20, color: '#043A66', marginBottom: 0 }}>
                                    {COMPETITIVE_ADVANTAGES.map((adv, idx) => (
                                        <li key={idx} style={{ marginBottom: 8, fontSize: '1rem' }}>{adv.title}</li>
                                    ))}
                                </ul>
                            </Box>
                            {/* Investment Timeline */}
                            <InvestmentTimeline events={TIMELINE_EVENTS} />
                        </>
                    )}
                </Grid>
                {/* Right Column - Sidebar */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, mt: { xs: 1, md: 1 } }}>
                        <InvestmentProgressCard
                            investment={opportunity}
                            buttonLabel={hasInvested ? "Invested" : "Invest"}
                            buttonSx={{
                                borderRadius: '8px',
                                ...(hasInvested && {
                                    background: '#E8F5E8',
                                    borderColor: '#33CC33',
                                    color: '#33CC33',
                                    cursor: 'not-allowed',
                                }),
                            }}
                            onButtonClick={hasInvested ? undefined : () => setChecklistModalOpen(true)}
                        />
                        <CompanyInformationCard investment={opportunity} />
                        <ContactInformationCard investment={opportunity} />
                    </Box>
                </Grid>
            </Grid>

            {/* Modals */}
            <ChecklistModal
                open={checklistModalOpen}
                onClose={() => setChecklistModalOpen(false)}
                onContinue={() => {
                    setChecklistModalOpen(false);
                    setCommitModalOpen(true);
                }}
            />
            <CommitModal
                open={commitModalOpen}
                onClose={() => setCommitModalOpen(false)}
                onComplete={() => {
                    setCommitModalOpen(false);
                    setHasInvested(true);
                    // Clear investment mode from sessionStorage after completion
                    sessionStorage.removeItem(`investment_mode_${opportunityId}`);
                    // You can add additional logic here after investment completion
                }}
                listingId={opportunityId}
                hasExpressedInterest={true}
                investmentMode={typeof window !== 'undefined'
                    ? (sessionStorage.getItem(`investment_mode_${opportunityId}`) as 'individually' | 'syndicate' | null)
                    : null}
            />
        </Box>
    );
};

export default InvestmentDocumentsSuccess;
