import { getCountryByCode } from '@/constants/countries';
import { isValidUrl } from '@/utils/helpers';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import CountrySelector from '../../../General/form/countrySelector';
import FormInput from '../../../General/form/formInput';
import FormSelect from '../../../General/form/select';
import FormTextArea from '../../../General/form/textArea';
import { InfoTooltip } from '../../../General/ui';
import { BusinessLogoUpload } from './BusinessLogoUpload';
import type { BusinessFormData } from './types';
import { COMPANY_SIZES, COMPANY_STAGES, INDUSTRIES } from './types';

interface CompanyInformationProps {
    formData: BusinessFormData;
    onInputChange: (field: string, value: string) => void;
    onAvatarChange?: (avatarUrl: string) => void;
}

export const CompanyInformation: React.FC<CompanyInformationProps> = ({
    formData,
    onInputChange,
    onAvatarChange
}) => {
    const fieldContainerStyles = { mb: 2.5, width: '100%' };
    const [urlError, setUrlError] = useState<string>('');
    const toTitleCase = (value: string) =>
        value
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    const currentHeadquarters =
        (formData as BusinessFormData & { headquarters?: string }).headquarters ?? '';


    return (
        <>
            {/* Company Logo Upload */}
            {onAvatarChange && (
                <BusinessLogoUpload
                    currentLogo={formData.avatar}
                    onUploadComplete={onAvatarChange}
                />
            )}

            {/* Company Name */}
            <Box sx={fieldContainerStyles}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                        Company Name <span style={{ color: 'red' }}>*</span>
                    </span>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.companyName.title}
                        description={FORM_TOOLTIPS.companyName.description}
                        placement="right"
                    />
                </Typography>
                <FormInput
                    label=""
                    value={formData.companyName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('companyName', e.target.value)}
                    required
                    borderColor='#ced4da'
                />
            </Box>

            {/* Industry/Sector */}
            <Box sx={fieldContainerStyles}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                        Industry/Sector <span style={{ color: 'red' }}>*</span>
                    </span>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.industry.title}
                        description={FORM_TOOLTIPS.industry.description}
                        placement="right"
                    />
                </Typography>
                <FormSelect
                    label=""
                    options={INDUSTRIES}
                    value={formData.industry}
                    onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => onInputChange('industry', (e.target as HTMLSelectElement).value)}
                    required
                    placeholder="Select industry"
                    borderColor='#ced4da'
                />
            </Box>

            {/* Year Founded */}
            <Box sx={fieldContainerStyles}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                        Year Founded <span style={{ color: 'red' }}>*</span>
                    </span>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.yearFounded.title}
                        description={FORM_TOOLTIPS.yearFounded.description}
                        placement="right"
                    />
                </Typography>
                <FormInput
                    label=""
                    type="text"
                    value={formData.yearFounded}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;

                        if (value === '' || /^\d+$/.test(value)) {
                            onInputChange('yearFounded', value);
                        }
                    }}
                    required
                    borderColor='#ced4da'
                    maxLength={4}
                />
            </Box>

            {/* Country/Location & Headquarters */}
            <Box sx={{ ...fieldContainerStyles, mb: 2 }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 2, md: 3 },
                        alignItems: { xs: 'stretch', md: 'flex-end' }
                    }}
                >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <CountrySelector
                            label="Country/Location"
                            value={formData.country ?? ''}
                            onChange={(countryCode: string) => {
                                const country = getCountryByCode(countryCode);
                                const countryName =
                                    country?.name
                                        ?.toLowerCase()
                                        ?.replace(/\b\w/g, (char) => char.toUpperCase()) || '';
                                onInputChange('country', countryCode.toUpperCase());
                                onInputChange('countryName', countryName);
                            }}
                            required
                            placeholder="Select country"
                            showFlags={true}
                            showFlagsInSelected={true}
                            showRegions={false}
                        />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                                Headquarters (City / Address) <span style={{ color: 'red' }}>*</span>
                            </span>
                            <InfoTooltip
                                title={FORM_TOOLTIPS.headquarters.title}
                                description={FORM_TOOLTIPS.headquarters.description}
                                placement="right"
                            />
                        </Typography>
                        <FormInput
                            label=""
                            value={currentHeadquarters}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const normalizedValue = toTitleCase(e.target.value);
                                onInputChange('headquarters', normalizedValue);
                            }}
                            required
                            placeholder="e.g., New York, United States"
                            borderColor='#ced4da'
                        />
                    </Box>
                </Box>
            </Box>

            {/* Company Size */}
            <Box sx={fieldContainerStyles}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                        Company Size (Number of Employees) <span style={{ color: 'red' }}>*</span>
                    </span>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.companySize.title}
                        description={FORM_TOOLTIPS.companySize.description}
                        placement="right"
                    />
                </Typography>
                <FormSelect
                    label=""
                    options={COMPANY_SIZES}
                    value={formData.companySize}
                    onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => onInputChange('companySize', (e.target as HTMLSelectElement).value)}
                    required
                    placeholder="Select company size"
                    borderColor='#ced4da'
                />
            </Box>

            {/* Current Stage */}
            <Box sx={fieldContainerStyles}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <span style={{ fontSize: '14px', color: '#333', marginRight: '4px' }}>
                        Current Stage <span style={{ color: 'red' }}>*</span>
                    </span>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.companyStage.title}
                        description={FORM_TOOLTIPS.companyStage.description}
                        placement="right"
                    />
                </Typography>
                <FormSelect
                    label=""
                    options={COMPANY_STAGES}
                    value={formData.currentStage}
                    onSelect={(e: React.ChangeEvent<HTMLSelectElement>) => onInputChange('currentStage', (e.target as HTMLSelectElement).value)}
                    required
                    placeholder="Select current stage (Ideation, Pre-revenue, Revenue-generating, Profitable)"
                    borderColor='#ced4da'
                />
            </Box>

            {/* Brief Description */}
            <Box sx={fieldContainerStyles}>
                <FormTextArea
                    label="Brief Description"
                    value={formData.briefDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('briefDescription', e.target.value)}
                    required
                    placeholder="Tell us about your company..."
                    borderColor='#ced4da'
                />
            </Box>

            {/* Market Opportunity Description */}
            <Box sx={fieldContainerStyles}>
                <FormTextArea
                    label="Market Opportunity Description"
                    value={formData.marketOpportunityDescription}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('marketOpportunityDescription', e.target.value)}
                    required
                    placeholder="What problem or opportunity in the market makes your business a smart investment?"
                    borderColor='#ced4da'
                />
            </Box>

            {/* Competitive Advantage Description */}
            <Box sx={fieldContainerStyles}>
                <FormTextArea
                    label="Competitive Advantage Description"
                    value={formData.competitive_advantage_description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange('competitive_advantage_description', e.target.value)}
                    required
                    placeholder="Highlight your unique strengths, technology, partnerships, or approach that give you an edge."
                    borderColor='#ced4da'
                />
            </Box>

            {/* Website URL */}
            <Box sx={fieldContainerStyles}>
                <FormInput
                    label="Website URL (Optional)"
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        onInputChange('websiteUrl', value);

                        // Validate URL format
                        if (value.trim() !== '' && !isValidUrl(value)) {
                            setUrlError('Please enter a valid URL (e.g., https://example.com)');
                        } else {
                            setUrlError('');
                        }
                    }}
                    placeholder="https://yourcompany.com"
                    borderColor={urlError ? '#f87171' : '#ced4da'}
                    error={urlError}
                />
                {urlError && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#f87171',
                            fontSize: '0.75rem',
                            mt: 0.5
                        }}
                    >
                        {urlError}
                    </Typography>
                )}
            </Box>
        </>
    );
};
