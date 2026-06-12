import { Avatar, Box, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { BusinessListingDetailsResponse } from '../../types/queries-type';
import { isProd } from '../../utils/helpers';

const TEAM_MEMBERS = [
    {
        name: 'James Mwangi',
        role: 'CEO & Co-founder',
        avatar: '/dashboard/avatar-1.svg',
        description: 'Former executive at Safaricom M-Pesa with 12 years of fintech experience.'
    },
    {
        name: 'Amina Okafor',
        role: 'CTO & Co-founder',
        avatar: '/dashboard/avatar-2.svg',
        description: 'Software engineer with experience at Google and Interswitch.'
    },
    {
        name: 'Kimani David',
        role: 'COO',
        avatar: '/dashboard/avatar-3.svg',
        description: 'Operations expert with background in banking and payments.'
    },
    {
        name: 'Sarah Adebayo',
        role: 'CMO',
        avatar: '/dashboard/avatar-4.svg',
        description: 'Marketing strategist with expertise in digital growth and brand development.'
    },
    {
        name: 'Michael Okafor',
        role: 'CFO',
        avatar: '/dashboard/avatar-5.svg',
        description: 'Financial expert with extensive experience in venture capital and fundraising.'
    },
    {
        name: 'Chloe Williams',
        role: 'VP of Engineering',
        avatar: '/dashboard/avatar-6.svg',
        description: 'Technical leader with a proven track record in building scalable fintech products.'
    }
];

const COMPANY_VALUES = [
    {
        title: 'Innovation',
        description: `We constantly push the boundaries of what's possible in payment processing, seeking new solutions to old problems.`
    },
    {
        title: 'Customer Focus',
        description: `Every decision we make is guided by how it will impact our merchants and their customers.`
    },
    {
        title: 'Integrity',
        description: `We maintain the highest standards of honesty and transparency in all our dealings.`
    },
    {
        title: 'Inclusion',
        description: `We believe in creating financial solutions that work for everyone, regardless of their background.`
    }
];

interface TeamTabContentProps {
    investment?: any;
    listingDetailsData?: BusinessListingDetailsResponse;
    rawListingData?: any; // Raw listing data that might contain team_details
}

export const TeamTabContent: React.FC<TeamTabContentProps> = ({ investment, listingDetailsData, rawListingData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Helper function to transform team member data
    const transformTeamMember = (member: any) => {
        // Build name from available fields
        const name = member.name ||
            (member.first_name && member.last_name ? `${member.first_name} ${member.last_name}`.trim() : null) ||
            member.first_name ||
            member.last_name ||
            'Unknown';

        // Skip if name is still "Unknown"
        if (!name || name.trim().toLowerCase() === 'unknown') {
            return null;
        }

        return {
            name,
            role: member.role || member.title || 'Team Member',
            avatar: member.avatar || member.profile_picture || undefined,
            description: member.description || member.bio || '',
            title: member.title || member.role || 'Team Member'
        };
    };

    // Transform team members from various sources
    const teamMembers = React.useMemo(() => {
        // Priority 1: Check listingDetailsData.team_details (NEW API STRUCTURE)
        // The API returns team_details directly in the response
        const teamDetails = listingDetailsData?.team_details;

        if (Array.isArray(teamDetails) && teamDetails.length > 0) {
            const transformed = teamDetails
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);
            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 2: Use structured endpoint's team.members (API provides name, title, bio)
        // BUT: Filter out members with "Unknown" name - these are placeholders
        if (listingDetailsData?.team?.members && Array.isArray(listingDetailsData.team.members) && listingDetailsData.team.members.length > 0) {
            const validMembers = listingDetailsData.team.members
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);

            if (validMembers.length > 0) {
                return validMembers;
            }
            // If all members are "Unknown", fall through to check fallback data sources
        }

        // Priority 3: Check raw listing data (propInvestment or fullListing) - THIS IS THE PRIMARY FALLBACK
        // This is where the actual team_details with first_name/last_name should be
        const rawListingTeamDetails = rawListingData?.company_metrics_and_financial_information?.team_details;

        if (Array.isArray(rawListingTeamDetails) && rawListingTeamDetails.length > 0) {
            const transformed = rawListingTeamDetails
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);

            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 4: Check investment object's company_metrics_and_financial_information.team_details
        const investmentTeamDetails = investment?.company_metrics_and_financial_information?.team_details;
        if (Array.isArray(investmentTeamDetails) && investmentTeamDetails.length > 0) {
            const transformed = investmentTeamDetails
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);
            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 5: Check if rawListingData has team_details at different paths
        const rawListingTeamDetailsAlt1 = (rawListingData as any)?.team_details;
        if (Array.isArray(rawListingTeamDetailsAlt1) && rawListingTeamDetailsAlt1.length > 0) {
            const transformed = rawListingTeamDetailsAlt1
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);
            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 6: Check listingDetailsData payload.company_metrics_and_financial_information.team_details (old structure)
        const payloadDataAlt = (listingDetailsData as any)?.payload;
        const payloadTeamDetailsAlt = payloadDataAlt?.company_metrics_and_financial_information?.team_details;
        if (Array.isArray(payloadTeamDetailsAlt) && payloadTeamDetailsAlt.length > 0) {
            const transformed = payloadTeamDetailsAlt
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);
            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 7: Check if investment has team_details at root level
        const rootTeamDetails = (investment as any)?.team_details;
        if (Array.isArray(rootTeamDetails) && rootTeamDetails.length > 0) {
            const transformed = rootTeamDetails
                .map(transformTeamMember)
                .filter((member): member is NonNullable<typeof member> => member !== null);
            if (transformed.length > 0) {
                return transformed;
            }
        }

        // Priority 7: Check rawListingData at root level for company_metrics
        if (rawListingData && typeof rawListingData === 'object') {
            // Try to find team_details anywhere in the rawListingData object
            const findTeamDetails = (obj: any, depth = 0): any[] | null => {
                if (depth > 3) return null; // Prevent infinite recursion
                if (!obj || typeof obj !== 'object') return null;

                // Check current level
                if (Array.isArray(obj.team_details)) return obj.team_details;
                if (Array.isArray(obj.company_metrics_and_financial_information?.team_details)) {
                    return obj.company_metrics_and_financial_information.team_details;
                }

                // Recursively check nested objects
                for (const key in obj) {
                    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                        const found = findTeamDetails(obj[key], depth + 1);
                        if (found) return found;
                    }
                }
                return null;
            };

            const foundTeamDetails = findTeamDetails(rawListingData);
            if (Array.isArray(foundTeamDetails) && foundTeamDetails.length > 0) {
                const transformed = foundTeamDetails
                    .map(transformTeamMember)
                    .filter((member): member is NonNullable<typeof member> => member !== null);
                if (transformed.length > 0) {
                    return transformed;
                }
            }
        }

        // Last resort: Return empty array instead of mock data
        // This way the UI can show "No team members available" instead of fake data
        return [];
    }, [
        (listingDetailsData as any)?.payload?.team_details, // Priority 1: New API structure
        listingDetailsData?.team?.members, // Priority 2
        rawListingData, // Priority 3
        investment?.company_metrics_and_financial_information?.team_details, // Priority 4
        (listingDetailsData as any)?.payload?.company_metrics_and_financial_information?.team_details, // Priority 6 (old structure)
        (investment as any)?.team_details // Priority 7
    ]);

    const companyValues = listingDetailsData?.team?.values?.map((value, idx) => ({
        title: COMPANY_VALUES[idx]?.title || `Value ${idx + 1}`,
        description: value || COMPANY_VALUES[idx]?.description || ''
    })) || COMPANY_VALUES;

    // Get actual team size from team_details array length, not from business signup input
    const actualTeamSize = teamMembers.length;

    // Get company stage from API, not hardcoded
    const keyMetrics = listingDetailsData?.key_metrics;
    let companyStage = '';

    // Safely extract company_stage from key_metrics
    if (keyMetrics && typeof keyMetrics === 'object' && !Array.isArray(keyMetrics)) {
        const metricsObj = keyMetrics as Record<string, any>;
        if ('company_stage' in metricsObj && metricsObj.company_stage) {
            companyStage = String(metricsObj.company_stage);
        }
    }

    // Fallback to investment data
    if (!companyStage) {
        companyStage = investment?.company_metrics_and_financial_information?.company_stage || '';
    }

    // Build description text dynamically based on available data
    const buildTeamDescription = () => {
        const businessName = investment?.title || investment?.business_name || 'this company';
        const parts: string[] = [`Meet the team behind ${businessName}`];

        if (companyStage) {
            parts.push(companyStage);
        }

        if (actualTeamSize > 0) {
            parts.push(`with ${actualTeamSize} ${actualTeamSize === 1 ? 'team member' : 'team members'}`);
        }

        return parts.join(' - ');
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Leadership Team */}
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        mb: 1,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        color: '#043A66',
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    Leadership Team
                </Typography>
                {actualTeamSize > 0 && (
                    <Typography
                        variant="body1"
                        sx={{
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            color: '#043A66',
                            textAlign: { xs: 'center', md: 'left' }
                        }}
                    >
                        {buildTeamDescription()}
                    </Typography>
                )}

                {teamMembers.length === 0 ? (
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            color: '#6A6A6A',
                            py: 4,
                            fontSize: { xs: '0.95rem', md: '1rem' }
                        }}
                    >
                        Team information will be available once team members are added.
                    </Typography>
                ) : (
                    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
                        {teamMembers.map((member, idx) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 3, md: 4 },
                                        borderRadius: '24px',
                                        border: '2px solid #E0E0E0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        height: '100%',
                                        minHeight: { xs: 220, md: 240 },
                                        textAlign: 'left',
                                        background: '#FFFFFF',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#043A66',
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 32px rgba(25, 118, 210, 0.12)'
                                        }
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                        mb: 2.5,
                                        width: '100%'
                                    }}>
                                        <Avatar
                                            src={(member as any).avatar || `/dashboard/avatar-${(idx % 6) + 1}.svg`}
                                            alt={member.name}
                                            sx={{
                                                width: { xs: 48, md: 52 },
                                                height: { xs: 48, md: 52 },
                                                border: '2px solid #E3F2FD',
                                                flexShrink: 0
                                            }}
                                        />

                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                sx={{
                                                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                                                    color: '#043A66',
                                                    mb: 0.25,
                                                    lineHeight: 1.3,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {member.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                                                    color: '#043A66',
                                                    fontWeight: 600,
                                                    lineHeight: 1.2,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {(member as any).title || (member as any).role}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* NOT PROD READY */}
                                    {!isProd && (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: { xs: '0.95rem', md: '1rem' },
                                                color: '#043A66',
                                                lineHeight: 1.6,
                                                textAlign: 'left',
                                                flex: 1
                                            }}
                                        >
                                            {(member as any).bio || (member as any).description || ''}
                                        </Typography>
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Company Culture & Values */}
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        mb: 3,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                        color: '#043A66',
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    Company Culture & Values
                </Typography>

                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {companyValues.map((value, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, md: 3 },
                                    borderRadius: '12px',
                                    border: '1px solid #E0E0E0',
                                    background: '#F8F9FA',
                                    height: '100%',
                                    minHeight: { xs: 140, md: 160 },
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#043A66',
                                        background: '#F3F8FF',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 2px 12px rgba(25, 118, 210, 0.1)'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{
                                        mb: 1.5,
                                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                                        color: '#043A66'
                                    }}
                                >
                                    {value.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        color: '#043A66',
                                        lineHeight: 1.6
                                    }}
                                >
                                    {value.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default TeamTabContent;