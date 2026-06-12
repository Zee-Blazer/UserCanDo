import { Box, Typography } from '@mui/material';
import React from 'react';
import { FORM_TOOLTIPS } from '../../../../constants/formTooltips';
import { AuthFormSelect } from '../../../General/form/authFormInput';
import { InfoTooltip } from '../../../General/ui';
import type { CompanyStageSectionProps } from './types';
import { COMPANY_STAGE_OPTIONS } from './types';

export const CompanyStageSection: React.FC<CompanyStageSectionProps> = ({
    companyStage,
    onStageChange
}) => {

    const handleStageChange = (slug: string, value: string) => {
        onStageChange(value);
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" component="span" sx={{ mr: 0.5, fontSize: '0.875rem', color: '#666' }}>
                    Company Stage <span style={{ color: 'red' }}>*</span>
                </Typography>
                <InfoTooltip
                    title={FORM_TOOLTIPS.companyStage.title}
                    description={FORM_TOOLTIPS.companyStage.description}
                    placement="right"
                />
            </Box>
            <AuthFormSelect
                label=""
                value={companyStage}
                slug="companyStage"
                handleChange={handleStageChange}
                options={COMPANY_STAGE_OPTIONS}
                required
                placeholder="Select your company stage"
            />
        </Box>
    );
};
