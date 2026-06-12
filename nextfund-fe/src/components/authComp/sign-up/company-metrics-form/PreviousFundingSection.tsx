import { Box, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { AuthFormInput, AuthFormSelect } from '../../../General/form/authFormInput';
import { InfoTooltip } from '../../../General/ui';
import type { PreviousFundingSectionProps } from './types';
import { PREVIOUS_FUNDING_OPTIONS } from './types';

export const PreviousFundingSection: React.FC<PreviousFundingSectionProps> = ({
    formData,
    onFieldChange
}) => {
    const handleFieldChange = (slug: string, value: string) => {
        onFieldChange(slug, value);
    };

    const isNoneSelected = formData.previousFunding === 'None';

    return (
        <>
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Previous Funding <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.previousFunding.title}
                        description={FORM_TOOLTIPS.previousFunding.description}
                        placement="right"
                    />
                </Box>
                <AuthFormSelect
                    label=""
                    value={formData.previousFunding}
                    slug="previousFunding"
                    handleChange={handleFieldChange}
                    options={PREVIOUS_FUNDING_OPTIONS}
                    required
                    placeholder="Select previous funding type"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                        Total Previous Funding ($) {!isNoneSelected && <span style={{ color: 'red' }}>*</span>}
                    </Typography>
                    <InfoTooltip
                        title={FORM_TOOLTIPS.totalPreviousFunding.title}
                        description={FORM_TOOLTIPS.totalPreviousFunding.description}
                        placement="right"
                    />
                </Box>
                <AuthFormInput
                    label=""
                    value={
                        formData.totalPreviousFunding
                            ? Number(formData.totalPreviousFunding.replace(/[^0-9.]/g, "")).toLocaleString()
                            : ""
                    }
                    slug="totalPreviousFunding"
                    handleChange={handleFieldChange}
                    required={!isNoneSelected}
                    disabled={isNoneSelected}
                    placeholder={isNoneSelected ? "Not applicable" : "e.g., $500,000"}
                />
            </Box>
        </>
    );
};
