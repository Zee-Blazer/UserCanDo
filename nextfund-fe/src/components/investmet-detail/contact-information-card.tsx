import {
    Box,
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
import { Investment } from '../../types/landing-page';
import { BusinessListingDetailsResponse } from '../../types/queries-type';
import { CustomButton } from '../General/ui/custom-button';

export const ContactInformationCard: React.FC<{
    investment: Investment;
    listingDetailsData?: BusinessListingDetailsResponse;
    onContactAction?: () => void;
    hasUserInvestment?: boolean;
}> = ({ investment, listingDetailsData, onContactAction, hasUserInvestment = false }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const complianceData = investment?.compliance_and_verification as any;
    const contactSection = listingDetailsData?.contact as Record<string, any> | undefined;
    const resolveContactValue = (...values: Array<string | undefined | null>) => {
        for (const value of values) {
            if (!value) continue;
            const trimmed = value.trim();
            if (trimmed) {
                return trimmed;
            }
        }
        return null;
    };
    const contactVisibilityFlag =
        investment.contactVisible ??
        (typeof contactSection?.contact_visible === 'boolean' ? contactSection.contact_visible : undefined) ??
        true;
    const contactAllowed = contactVisibilityFlag || hasUserInvestment;
    // Check all possible field locations from API
    const email = contactAllowed
        ? resolveContactValue(
            investment?.email,
            contactSection?.email,
            contactSection?.primary_email,
            complianceData?.email,
            // Check raw listing data for new field names
            (investment as any)?.email,
            (investment as any)?.contact_email
        )
        : null;
    const phone = contactAllowed
        ? resolveContactValue(
            investment?.phone,
            contactSection?.phone,
            contactSection?.phone_number,
            complianceData?.phone_number,
            // Check raw listing data for new field names
            (investment as any)?.business_phone_number,
            (investment as any)?.contact_phone
        )
        : null;
    const website = contactAllowed
        ? resolveContactValue(
            investment?.website,
            contactSection?.website,
            contactSection?.web,
            complianceData?.website_url,
            // Check raw listing data for new field names
            (investment as any)?.website_url,
            (investment as any)?.contact_website
        )
        : null;
    const linkedin = contactAllowed
        ? resolveContactValue(
            investment?.linkedin,
            contactSection?.linkedin,
            complianceData?.linked_in_profile,
            // Check raw listing data for new field names
            (investment as any)?.linked_in_profile,
            (investment as any)?.contact_linkedin
        )
        : null;
    const hasPrimaryContact = !!(email || phone || website || linkedin);

    const handleContactClick = () => {
        if (!contactAllowed) {
            if (onContactAction) {
                onContactAction();
            }
            return;
        }

        if (contactAllowed && website && typeof window !== 'undefined') {
            const url = website.startsWith('http') ? website : `https://${website}`;
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

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
                Contact Information
            </Typography>

            <List sx={{ p: 0 }}>
                {!contactAllowed && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/light_info.png" alt="Info" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    Contact Details
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                                >
                                    Available after expressing interest
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                {contactAllowed && email && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/email.png" alt="Email" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    Email
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, wordBreak: 'break-word', color: '#043A66' }}
                                >
                                    {email}
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                {contactAllowed && phone && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/phone.png" alt="Phone" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    Phone
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                                >
                                    {phone}
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                {contactAllowed && website && (
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
                                    {website}
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                {contactAllowed && linkedin && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    LinkedIn
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66', wordBreak: 'break-word' }}
                                >
                                    {linkedin}
                                </Typography>
                            }
                        />
                    </ListItem>
                )}

                {contactAllowed && !hasPrimaryContact && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, md: 1 } }}>
                        <ListItemIcon sx={{ minWidth: { xs: 32, md: 40 } }}>
                            <Image src="/light_info.png" alt="Info" width={20} height={20} />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' }, color: '#6A6A6A' }}
                                >
                                    Contact Information
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, color: '#043A66' }}
                                >
                                    Available upon request
                                </Typography>
                            }
                        />
                    </ListItem>
                )}
            </List>

            <Box sx={{ mt: { xs: 2, md: 3 }, textAlign: 'center' }}>
                <CustomButton
                    variant="outline"
                    fullWidth
                    onClick={handleContactClick}
                    sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                        padding: { xs: '8px 16px', md: '12px 24px' },
                        border: '1px solid #33CC3314',
                        color: '#043A66'
                    }}
                >
                    {contactAllowed ? 'Contact business' : 'Request contact'}
                </CustomButton>
            </Box>
        </Paper>
    );
};
