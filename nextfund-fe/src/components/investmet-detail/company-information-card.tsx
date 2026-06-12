import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { getCountryByCode } from '../../constants/countries';
import { Investment } from '../../types/landing-page';
import { BusinessListingDetailsResponse } from '../../types/queries-type';

export const CompanyInformationCard: React.FC<{
    investment: Investment;
    listingDetailsData?: BusinessListingDetailsResponse;
}> = ({ investment, listingDetailsData }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));


    const pickValidValue = (...values: Array<string | number | undefined | null>) => {
        for (const value of values) {
            if (value === null || value === undefined) continue;
            const stringValue = typeof value === 'number' ? value.toString() : value;
            if (!stringValue) continue;
            const trimmed = stringValue.trim();
            if (
                !trimmed ||
                trimmed.toUpperCase() === 'N/A' ||
                /^0(\.0+)?$/.test(trimmed) ||
                trimmed === '-'
            ) {
                continue;
            }
            return trimmed;
        }
        return undefined;
    };

    const contactAllowed = investment.contactVisible ?? true;
    const companyInfoSection = listingDetailsData?.company_info as Record<string, any> | undefined;
    const contactSection = listingDetailsData?.contact as Record<string, any> | undefined;

    // Helper to check if a string looks like an address (not a long description)
    const isValidAddress = (value: string | undefined | null): boolean => {
        if (!value) return false;
        const trimmed = value.trim();
        // If it's too long (more than 100 chars) or contains "Goals and Expectations", it's likely not an address
        if (trimmed.length > 100 || trimmed.includes('Goals and Expectations')) {
            return false;
        }
        return true;
    };

    const registeredAddress = (investment.compliance as any)?.registered_address;

    const validRegisteredAddress = registeredAddress && isValidAddress(registeredAddress)
        ? registeredAddress
        : undefined;

    const headquartersDisplay = pickValidValue(
        listingDetailsData?.overview?.headquarters,
        companyInfoSection?.headquarters,
        investment.headquarters,
        validRegisteredAddress,
        companyInfoSection?.country,
        listingDetailsData?.overview?.country
    ) || 'Not provided';

    const countryDisplayRaw = pickValidValue(
        listingDetailsData?.overview?.country,
        companyInfoSection?.country,
        companyInfoSection?.location,
        investment.location,
        (investment.compliance as any)?.country_location
    ) || 'Not provided';

    const countryDisplay = (() => {
        if (!countryDisplayRaw || countryDisplayRaw === 'Not provided') return countryDisplayRaw;
        if (/^[A-Z]{2,3}$/.test(countryDisplayRaw)) {
            const country = getCountryByCode(countryDisplayRaw);
            return country?.name || countryDisplayRaw;
        }
        return countryDisplayRaw;
    })();
    const foundedYearDisplay = pickValidValue(
        companyInfoSection?.founded_year,
        listingDetailsData?.overview?.founded_year,
        investment.founded
    ) || 'Not provided';
    const teamSizeDisplay = pickValidValue(
        companyInfoSection?.team_size,
        investment.teamSize,
        investment.company_metrics_and_financial_information?.team_size
    );
    // Check for website_url at root level of payload (from /get_listing_by_business or /get_listing_by_id)
    const payloadWebsiteUrl = (listingDetailsData as any)?.payload?.website_url ||
        (listingDetailsData as any)?.website_url;

    const websiteDisplay = contactAllowed
        ? pickValidValue(
            payloadWebsiteUrl, // Check root level payload first
            companyInfoSection?.website,
            contactSection?.website,
            contactSection?.web,
            investment.website,
            contactSection?.url,
            // Check raw listing data for new field names
            (investment as any)?.website_url,
            (investment as any)?.contact_website
        )
        : 'Restricted access';

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: { xs: '12px', md: '16px' },
                border: '1px solid #e0e0e0',
                height: 'fit-content',
                transition: 'all 0.3s ease',
                '&:hover': {
                    borderColor: '#043A66',
                    boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
                    transform: 'translateY(-4px)'
                }
            }}
        >
            <Typography
                variant="h6"
                fontWeight={600}
                sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    color: '#043A66'
                }}
            >
                Company Information
            </Typography>

            <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                        <Image src="/building.png" alt="Founded" width={20} height={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                            >
                                Founded
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                            >
                                {foundedYearDisplay}
                            </Typography>
                        }
                    />
                </ListItem>

                <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                        <Image src="/Group.png" alt="Headquarters" width={15} height={15} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                            >
                                Headquarters
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                            >
                                {headquartersDisplay}
                            </Typography>
                        }
                    />
                </ListItem>

                <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                        <Image src="/location.png" alt="Location" width={20} height={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                            >
                                Location
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                            >
                                {countryDisplay}
                            </Typography>
                        }
                    />
                </ListItem>

                {investment.ownerName && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/user.png" alt="Owner" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    Owner
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                                >
                                    {investment.ownerName}
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                        <Image src="/people-blue.png" alt="Team Size" width={20} height={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                            >
                                Team Size
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                            >
                                {teamSizeDisplay ? `${teamSizeDisplay} employees` : 'Not provided'}
                            </Typography>
                        }
                    />
                </ListItem>

                <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                        <Image src="/internet.png" alt="Website" width={20} height={20} />
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                            >
                                Website
                            </Typography>
                        }
                        secondary={
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66', wordBreak: 'break-word' }}
                            >
                                {websiteDisplay || 'Not provided'}
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </Paper>
    );
};