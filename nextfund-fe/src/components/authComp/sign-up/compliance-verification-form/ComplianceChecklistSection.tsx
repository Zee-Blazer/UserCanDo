import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';
import type { ComplianceChecklistSectionProps } from './types';
import { COMPLIANCE_CHECKLIST_ITEMS } from './types';

export const ComplianceChecklistSection: React.FC<ComplianceChecklistSectionProps> = ({
    complianceChecklist,
    onChecklistChange
}) => {
    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#333',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
            >
                Compliance Checklist
            </Typography>

            {COMPLIANCE_CHECKLIST_ITEMS.map((item, index) => (
                <Box
                    key={item.key}
                    sx={{
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid #D4D4D4',
                        pb: 1
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={complianceChecklist[item.key]}
                                onChange={(e) => onChecklistChange(item.key, e.target.checked)}
                                sx={{
                                    color: '#D4D4D4',
                                    '&.Mui-checked': {
                                        color: '#4CAF50',
                                        '& .MuiSvgIcon-root': {
                                            color: '#4CAF50'
                                        }
                                    }
                                }}
                            />
                        }
                        label={item.label}
                    />
                </Box>
            ))}
        </Box>
    );
};
