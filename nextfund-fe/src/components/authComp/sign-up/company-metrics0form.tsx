import { Box } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ActionButtons } from './company-metrics-form/ActionButtons';
import { CompanyStageSection } from './company-metrics-form/CompanyStageSection';
import { FinancialStatementsSection } from './company-metrics-form/FinancialStatementsSection';
import { FinancialsSection } from './company-metrics-form/FinancialsSection';
import { FormHeader } from './company-metrics-form/FormHeader';
import { KeyMetricsSection } from './company-metrics-form/KeyMetricsSection';
import { PreviousFundingSection } from './company-metrics-form/PreviousFundingSection';
// import { TeamDetailsSection } from './company-metrics-form/TeamDetailsSection';

import { updateCompanyMetricsData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';

import type {
    CompanyMetricsData,
    CompanyMetricsFormProps,
    TeamMember
} from './company-metrics-form/types';

export type {
    CompanyMetricsData,
    CompanyMetricsFormProps
} from './company-metrics-form/types';

export const CompanyMetricsForm: React.FC<CompanyMetricsFormProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { companyMetricsData: persistedData } = useBusinessSelector();

    const [formData, setFormData] = useState<CompanyMetricsData>({
        companyStage: '',
        grossMargin: '',
        burnRate: '',
        monthsOfRunway: '',
        monthlyRevenue: '',
        monthlyGrowthRate: '',
        numberOfCustomers: '',
        teamSize: '',
        previousFunding: '',
        totalPreviousFunding: '',
        financialStatementsText: '',
        teamMembers: [],
    });

    const [financialStatementsText, setFinancialStatementsText] = useState<string>('');
    const [isFinancialUrlValid, setIsFinancialUrlValid] = useState<boolean>(true);
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Validate financial URL whenever it changes
    useEffect(() => {
        // Empty is valid (optional field)
        // Non-empty must be valid URL
        if (financialStatementsText.trim() === '') {
            setIsFinancialUrlValid(true);
        }
        // If not empty, wait for validation callback from FinancialStatementsSection
    }, [financialStatementsText]);

    // Debounced Redux update function
    const updateReduxState = useCallback((data: CompanyMetricsData) => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
            const reduxData = {
                company_stage: data.companyStage,
                gross_margin: data.grossMargin,
                burn_rate: data.burnRate,
                months_of_runway: data.monthsOfRunway,
                monthly_revenue: data.monthlyRevenue,
                monthly_growth_rate: data.monthlyGrowthRate,
                number_of_customers: data.numberOfCustomers,
                team_size: data.teamSize,
                previous_funding: data.previousFunding,
                total_previous_funding: data.totalPreviousFunding,
                upload_option_for_financial_statements: data.financialStatementsText || '',
                team_members: data.teamMembers,
            };
            dispatch(updateCompanyMetricsData(reduxData));
        }, 300); // 300ms debounce
    }, [dispatch]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
        };
    }, []);

    // Load persisted data on component mount
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0) {
            const loadedData = {
                companyStage: persistedData.company_stage || '',
                grossMargin: persistedData.gross_margin || '',
                burnRate: persistedData.burn_rate || '',
                monthsOfRunway: persistedData.months_of_runway || '',
                monthlyRevenue: persistedData.monthly_revenue || '',
                monthlyGrowthRate: persistedData.monthly_growth_rate || '',
                numberOfCustomers: persistedData.number_of_customers || '',
                teamSize: persistedData.team_size || '',
                previousFunding: persistedData.previous_funding || '',
                totalPreviousFunding: persistedData.total_previous_funding || '',
                financialStatementsText: persistedData.upload_option_for_financial_statements || '',
                teamMembers: persistedData.team_members ? persistedData.team_members.map((member: any) => ({
                    id: member.id || Date.now().toString(),
                    first_name: member.first_name || member.firstName || '',
                    last_name: member.last_name || member.lastName || '',
                    role: member.role || '',
                    description: member.description || member.briefDescription || ''
                })) : [],
            };
            setFormData(loadedData);

            if (persistedData.upload_option_for_financial_statements) {
                setFinancialStatementsText(persistedData.upload_option_for_financial_statements);
            }
        }
    }, [persistedData]);

    const handleInputChange = (field: string, value: string) => {
        // Special handling for previousFunding field
        if (field === 'previousFunding' && value === 'None') {
            // Clear totalPreviousFunding when "None" is selected
            const updatedData = {
                ...formData,
                [field]: value,
                totalPreviousFunding: '' // Clear the total funding field
            };
            setFormData(updatedData);
            updateReduxState(updatedData);
            return;
        }

        // Update local state first
        const updatedData = {
            ...formData,
            [field]: value
        };
        setFormData(updatedData);

        // Update Redux with debounced approach
        updateReduxState(updatedData);
    };

    const handleFinancialStatementsTextChange = (value: string) => {
        setFinancialStatementsText(value);

        // Update local state first
        const updatedData = {
            ...formData,
            financialStatementsText: value
        };
        setFormData(updatedData);

        // Update Redux with debounced approach
        updateReduxState(updatedData);
    };

    const handleTeamMembersChange = (teamMembers: TeamMember[]) => {
        // Update local state first
        const updatedFormData = {
            ...formData,
            teamMembers
        };
        setFormData(updatedFormData);

        // Update Redux with debounced approach
        updateReduxState(updatedFormData);
    };

    const handleRemoveTeamMember = (memberId: string) => {
        const updatedTeamMembers = formData.teamMembers.filter(member => member.id !== memberId);
        handleTeamMembersChange(updatedTeamMembers);
    };

    const handleSubmit = () => {
        // Validate financial statements URL before submitting
        const trimmedUrl = financialStatementsText.trim();

        // If URL field has content, it must be valid
        if (trimmedUrl !== '' && !isFinancialUrlValid) {
            alert('⚠️ Invalid Financial Statements URL\n\nPlease enter a valid URL (e.g., https://drive.google.com/...) or leave the field empty to continue.');
            // Scroll to the field to show the error
            document.getElementById('financialStatements')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        onNext(formData);
    };

    const isFormValid = () => {
        const requiredFields = [
            'companyStage',
            'grossMargin',
            'monthlyRevenue',
            'monthlyGrowthRate',
            'numberOfCustomers',
            'teamSize',
            'previousFunding'
        ];

        // Check if all required fields are filled
        const hasRequiredFields = requiredFields.every(field =>
            formData[field as keyof CompanyMetricsData]?.toString().trim() !== ''
        );

        // If previous funding is not "None", then totalPreviousFunding is required
        const isPreviousFundingValid = formData.previousFunding === 'None' ||
            (formData.previousFunding !== 'None' && formData.totalPreviousFunding.trim() !== '');

        // Check if financial statements URL is valid (if provided)
        // If empty, it's valid (optional field)
        // If not empty, must be a valid URL
        const isFinancialUrlValidCheck = financialStatementsText.trim() === '' ||
            (financialStatementsText.trim() !== '' && isFinancialUrlValid);

        return hasRequiredFields && isPreviousFundingValid && isFinancialUrlValidCheck;
    };

    return (
        <Box>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Company Metrics and Financial Information"
                subtitle="Help investors understand your business stage and performance"
            />

            {/* Company Stage Section */}
            <CompanyStageSection
                companyStage={formData.companyStage}
                onStageChange={(value: string) => handleInputChange('companyStage', value)}
            />

            {/* Financials Section */}
            <FinancialsSection
                formData={{
                    grossMargin: formData.grossMargin,
                    burnRate: formData.burnRate,
                    monthsOfRunway: formData.monthsOfRunway
                }}
                onFieldChange={handleInputChange}
            />

            {/* Financial Statements Section */}
            <FinancialStatementsSection
                value={financialStatementsText}
                onChange={handleFinancialStatementsTextChange}
                onValidationChange={setIsFinancialUrlValid}
            />

            {/* Key Metrics Section */}
            <KeyMetricsSection
                formData={{
                    monthlyRevenue: formData.monthlyRevenue,
                    monthlyGrowthRate: formData.monthlyGrowthRate,
                    numberOfCustomers: formData.numberOfCustomers,
                    teamSize: formData.teamSize
                }}
                onFieldChange={handleInputChange}
            />

            {/* Previous Funding Section */}
            <PreviousFundingSection
                formData={{
                    previousFunding: formData.previousFunding,
                    totalPreviousFunding: formData.totalPreviousFunding
                }}
                onFieldChange={handleInputChange}
            />

            {/* Team Details Section */}
            {/* <TeamDetailsSection
                teamMembers={formData.teamMembers}
                onTeamMembersChange={handleTeamMembersChange}
                onRemoveTeamMember={handleRemoveTeamMember}
            /> */}

            {/* Action Buttons */}
            <ActionButtons
                isFormValid={isFormValid()}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};