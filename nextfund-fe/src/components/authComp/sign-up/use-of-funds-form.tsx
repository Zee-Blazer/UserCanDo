import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '../../General/ui';

import {
    FormHeader,
    FundingBreakdown,
    FundingTimeline,
    MilestonesSection,
    TotalPercentageDisplay
} from './use-of-funds';


import { useDispatch } from 'react-redux';
import { updateUseOfFundsData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import type {
    FundingBreakdownData,
    TimelineData,
    UseOfFundsData,
    UseOfFundsFormProps
} from './use-of-funds/types';

export const UseOfFundsForm: React.FC<UseOfFundsFormProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { useOfFundsData: persistedData, fundingStructureData } = useBusinessSelector();

    // Get selected categories from intended use of funds
    const selectedCategories = fundingStructureData?.intended_use_of_funds
        ? fundingStructureData.intended_use_of_funds.split(',').filter(item => item.trim() !== '')
        : [];

    const [formData, setFormData] = useState<UseOfFundsData>({
        fundingBreakdown: {
            productDevelopment: 0,
            marketingSales: 0,
            teamExpansion: 0,
            technologyInfrastructure: 0,
            workingCapital: 0,
            marketExpansion: 0,
            other: 0,
        },
        timeline: {
            expectedFundingCompletion: '',
            fundsDeploymentTimeline: '',
        },
        milestones: '',
    });

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0) {
            setFormData({
                fundingBreakdown: {
                    productDevelopment: parseFloat(persistedData.product_development) || 0,
                    marketingSales: parseFloat(persistedData.marketing_and_sales) || 0,
                    teamExpansion: parseFloat(persistedData.team_expansion) || 0,
                    technologyInfrastructure: parseFloat(persistedData.technology_infrastructure) || 0,
                    workingCapital: parseFloat(persistedData.working_capital) || 0,
                    marketExpansion: parseFloat(persistedData.market_expansion) || 0,
                    other: parseFloat(persistedData.others) || 0,
                },
                timeline: {
                    expectedFundingCompletion: persistedData.expected_funding_completion || '',
                    fundsDeploymentTimeline: persistedData.funds_deployment_timeline || '',
                },
                milestones: persistedData.key_milestone_to_achieve_with_funding || '',
            });
        }
    }, [persistedData]);

    const handlePercentageChange = (field: keyof FundingBreakdownData, value: string) => {
        const numValue = parseFloat(value) || 0;
        const updatedBreakdown = {
            ...formData.fundingBreakdown,
            [field]: numValue
        };
        const updatedData = {
            ...formData,
            fundingBreakdown: updatedBreakdown
        };
        setFormData(updatedData);

        // Persist to Redux immediately with updated values
        const reduxData = {
            product_development: updatedBreakdown.productDevelopment.toString(),
            marketing_and_sales: updatedBreakdown.marketingSales.toString(),
            team_expansion: updatedBreakdown.teamExpansion.toString(),
            technology_infrastructure: updatedBreakdown.technologyInfrastructure.toString(),
            working_capital: updatedBreakdown.workingCapital.toString(),
            market_expansion: updatedBreakdown.marketExpansion.toString(),
            others: updatedBreakdown.other.toString(),
            expected_funding_completion: formData.timeline.expectedFundingCompletion,
            funds_deployment_timeline: formData.timeline.fundsDeploymentTimeline,
            key_milestone_to_achieve_with_funding: formData.milestones,
        };
        dispatch(updateUseOfFundsData(reduxData));
    };

    const handleTimelineChange = (field: keyof TimelineData, value: string) => {
        const updatedTimeline = {
            ...formData.timeline,
            [field]: value
        };
        const updatedData = {
            ...formData,
            timeline: updatedTimeline
        };
        setFormData(updatedData);

        // Persist to Redux immediately with updated values
        const reduxData = {
            product_development: formData.fundingBreakdown.productDevelopment.toString(),
            marketing_and_sales: formData.fundingBreakdown.marketingSales.toString(),
            team_expansion: formData.fundingBreakdown.teamExpansion.toString(),
            technology_infrastructure: formData.fundingBreakdown.technologyInfrastructure.toString(),
            working_capital: formData.fundingBreakdown.workingCapital.toString(),
            market_expansion: formData.fundingBreakdown.marketExpansion.toString(),
            others: formData.fundingBreakdown.other.toString(),
            expected_funding_completion: updatedTimeline.expectedFundingCompletion,
            funds_deployment_timeline: updatedTimeline.fundsDeploymentTimeline,
            key_milestone_to_achieve_with_funding: formData.milestones,
        };
        dispatch(updateUseOfFundsData(reduxData));
    };

    const handleMilestonesChange = (value: string) => {
        const updatedData = {
            ...formData,
            milestones: value
        };
        setFormData(updatedData);

        // Persist to Redux immediately with updated values
        const reduxData = {
            product_development: formData.fundingBreakdown.productDevelopment.toString(),
            marketing_and_sales: formData.fundingBreakdown.marketingSales.toString(),
            team_expansion: formData.fundingBreakdown.teamExpansion.toString(),
            technology_infrastructure: formData.fundingBreakdown.technologyInfrastructure.toString(),
            working_capital: formData.fundingBreakdown.workingCapital.toString(),
            market_expansion: formData.fundingBreakdown.marketExpansion.toString(),
            others: formData.fundingBreakdown.other.toString(),
            expected_funding_completion: formData.timeline.expectedFundingCompletion,
            funds_deployment_timeline: formData.timeline.fundsDeploymentTimeline,
            key_milestone_to_achieve_with_funding: value,
        };
        dispatch(updateUseOfFundsData(reduxData));
    };

    const getTotalPercentage = () => {
        // If no categories selected, sum all categories
        if (selectedCategories.length === 0) {
            return Object.values(formData.fundingBreakdown).reduce((sum, value) => sum + value, 0);
        }

        // Only sum the selected categories, always include "Other" for flexibility
        const categoryFieldMap: Record<string, keyof FundingBreakdownData> = {
            'Product Development': 'productDevelopment',
            'Marketing & Sales': 'marketingSales',
            'Team Expansion': 'teamExpansion',
            'Technology & Infrastructure': 'technologyInfrastructure',
            'Working Capital': 'workingCapital',
            'Market Expansion': 'marketExpansion',
            'Other': 'other'
        };

        let total = 0;

        // Sum selected categories (excluding "Other" to avoid double counting)
        selectedCategories.forEach(category => {
            if (category !== 'Other') {
                const field = categoryFieldMap[category];
                if (field && formData.fundingBreakdown[field] !== undefined) {
                    total += formData.fundingBreakdown[field];
                }
            }
        });

        // Always add "Other" to total (whether selected or not) for flexibility
        total += formData.fundingBreakdown.other || 0;

        return total;
    };

    const isPercentageValid = () => {
        const total = getTotalPercentage();
        return total === 100;
    };

    const isFormValid = () => {
        const { timeline, milestones } = formData;


        const isDateValid = () => {
            if (!timeline.expectedFundingCompletion.trim()) return false;
            const selectedDate = new Date(timeline.expectedFundingCompletion);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Date must be strictly greater than today (not equal to today)
            return selectedDate > today;
        };

        return (
            isPercentageValid() &&
            timeline.expectedFundingCompletion.trim() !== '' &&
            isDateValid() &&
            timeline.fundsDeploymentTimeline.trim() !== '' &&
            milestones.trim() !== ''
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            onNext(formData);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Use of Funds"
                subtitle="Show investors how you will use the capital"
                helperText={selectedCategories.length > 0
                    ? `Enter the percentage of your total funding allocated to each selected category. The total for your selected categories must equal 100%`
                    : `Enter the percentage of your total funding allocated to each category. Total must equal 100%`
                }
                helperTextColor={selectedCategories.length > 0 ? '#33CC33' : undefined}
            />

            {/* Funding Breakdown Section */}
            <FundingBreakdown
                data={formData.fundingBreakdown}
                onPercentageChange={handlePercentageChange}
                selectedCategories={selectedCategories}
            />

            {/* Total Percentage Display */}
            <TotalPercentageDisplay
                totalPercentage={getTotalPercentage()}
                isValid={isPercentageValid()}
            />

            {/* Timeline Section */}
            <FundingTimeline
                data={formData.timeline}
                onTimelineChange={handleTimelineChange}
            />

            {/* Milestones Section */}
            <MilestonesSection
                milestones={formData.milestones}
                onMilestonesChange={handleMilestonesChange}
            />

            {/* Submit Button */}
            <CustomButton
                variant="primary"
                fullWidth
                type="submit"
                disabled={!isFormValid()}
                sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: { xs: 1.5, sm: 2 },
                    borderRadius: '12px',
                    backgroundColor: isFormValid() ? '#33CC33' : '#E0E0E0',
                    color: isFormValid() ? '#FFFFFF' : '#9E9E9E',
                    cursor: isFormValid() ? 'pointer' : 'not-allowed',
                    '&:hover': {
                        backgroundColor: isFormValid() ? '#33CC33' : '#E0E0E0'
                    },
                    '&.Mui-disabled': {
                        backgroundColor: '#E0E0E0',
                        color: '#9E9E9E'
                    }
                }}
            >
                Continue
            </CustomButton>
        </Box>
    );
};
