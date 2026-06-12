import { Box, Typography } from '@mui/material';
import React from 'react';
import { BusinessFundingTypeSelector } from '../../../../components/authComp/sign-up/business-funding-type-selector';

export const FundingTypeStep: React.FC<{
    onBack: () => void;
    onNext: (selectedFunding: string[]) => void;
    error?: string;
}> = ({ onBack, onNext, error }) => {
    return (
        <>
            {error && (
                <Box sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: '#ffebee',
                    border: '1px solid #f8bbd9',
                    borderRadius: '8px'
                }}>
                    <Typography sx={{ color: '#d32f2f', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                        {error}
                    </Typography>
                </Box>
            )}
            <BusinessFundingTypeSelector onBack={onBack} onNext={onNext} />
        </>
    );
};

export default FundingTypeStep;


