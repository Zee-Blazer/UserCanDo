import { DocumentUpload } from '@/components/authComp/document-upload/document-upload';
import { Header } from '@/components/layout/header';
import {
    ApplicationSummaryData,
    CompanyMetricsData,
    ComplianceVerificationData,
    FinalizeApplicationData,
    HybridFundingData,
    InvestmentTermsData,
    ReviewApplicationData,
    UploadedFile,
    UseOfFundsData,
} from '@/types/sign-up';
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import ApplicationSummaryStep from '../../../app/(Auth)/sign-up/steps/ApplicationSummaryStep';
import BusinessFormStep from '../../../app/(Auth)/sign-up/steps/BusinessFormStep';
import CompanyMetricsStep from '../../../app/(Auth)/sign-up/steps/CompanyMetricsStep';
import ComplianceVerificationStep from '../../../app/(Auth)/sign-up/steps/ComplianceVerificationStep';
import DebtDetailsStep from '../../../app/(Auth)/sign-up/steps/DebtDetailsStep';
import EquityOptionsStep from '../../../app/(Auth)/sign-up/steps/EquityOptionsStep';
import FinalizeApplicationStep from '../../../app/(Auth)/sign-up/steps/FinalizeApplicationStep';
import FundingTypeStep from '../../../app/(Auth)/sign-up/steps/FundingTypeStep';
import HybridFundingStep from '../../../app/(Auth)/sign-up/steps/HybridFundingStep';
import InvestmentTermsStep from '../../../app/(Auth)/sign-up/steps/InvestmentTermsStep';
import InvestorFormStep from '../../../app/(Auth)/sign-up/steps/InvestorFormStep';
import ReviewApplicationStep from '../../../app/(Auth)/sign-up/steps/ReviewApplicationStep';
import SignUpLayout from '../../../app/(Auth)/sign-up/steps/SignUpLayout';
import SubmittedSuccessStep from '../../../app/(Auth)/sign-up/steps/SubmittedSuccessStep';
import UseOfFundsStep from '../../../app/(Auth)/sign-up/steps/UseOfFundsStep';
import { useCreateBusinessListingMutation, useEditBusinessListingMutation, useRegisterBusinessMutation } from '../../../queries/authApi';
import { businessListingCallback, businessListingErrorCallback, businessListingUpdateCallback, businessRegistrationCallback, businessRegistrationErrorCallback } from '../../../queries/callbacks/authCallback';
import { clearAllBusinessData, clearComplianceVerificationData, setBusinessFormData, setCurrentStep, setIsAccountCreated, updateCompanyMetricsData, updateComplianceVerificationData, updateEssentialDocumentsData, updateFundingStructureData, updateInvestmentPreferencesData, updateUseOfFundsData } from '../../../Redux/features/businessSlice';
import { clearInvestorSignUpDetails, setInvestorSignUpDetails } from '../../../Redux/features/investorSlice';
import { useAuthSelector, useBusinessSelector, useInvestorSelector } from '../../../Redux/selectors';
import { capitalizeWords, formatCurrency, formatFundingTypes } from '../../../utils/formatting';
import { UserTypeSelector } from '../user-selector/user-selector';
import { ApplicationReviewModal } from './ApplicationReviewModal';
import ProgressBar from './ProgressBar';

type StepType =
    | 'form'
    | 'document-upload'
    | 'funding'
    | 'options'
    | 'debt-details'
    | 'hybrid-funding'
    | 'company-metrics'
    | 'use-of-funds'
    | 'review-application'
    | 'finalize-application'
    | 'compliance-verification'
    | 'investment-terms-preferences'
    | 'application-summary'
    | 'application-submitted-success';

const SignUpPage: React.FC = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [registerBusiness, { isLoading: isCreatingBusinessAccount }] = useRegisterBusinessMutation();
    const [createBusinessListing] = useCreateBusinessListingMutation();
    const [editBusinessListing] = useEditBusinessListingMutation();
    const businessState = useBusinessSelector();
    const investorState = useInvestorSelector();
    const { isLoggedIn, loginData } = useAuthSelector();

    const urlUserType = searchParams.get('type') as 'investor' | 'business' | null;
    const [userType, setUserType] = useState<'investor' | 'business'>(
        urlUserType === 'business' ? 'business' : 'investor'
    );
    const [currentStep, setCurrentStepLocal] = useState<StepType>('form');
    const stepManuallySet = useRef(false);
    const [investorFormData, setInvestorFormData] = useState<any>(null);
    const [selectedFunding, setSelectedFunding] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [hybridFundingData, setHybridFundingData] = useState<HybridFundingData | null>(null);
    const [companyMetricsData, setCompanyMetricsData] = useState<CompanyMetricsData | null>(null);
    const [useOfFundsData, setUseOfFundsData] = useState<UseOfFundsData | null>(null);
    const [reviewApplicationData, setReviewApplicationData] = useState<ReviewApplicationData | null>(null);
    const [finalizeApplicationData, setFinalizeApplicationData] = useState<FinalizeApplicationData | null>(null);
    const [complianceVerificationData, setComplianceVerificationData] = useState<ComplianceVerificationData | null>(null);
    const [investmentTermsData, setInvestmentTermsData] = useState<InvestmentTermsData | null>(null);
    const [applicationSummaryData, setApplicationSummaryData] = useState<ApplicationSummaryData | null>(null);
    const [showApplicationReviewModal, setShowApplicationReviewModal] = useState(false);
    const [fundingError, setFundingError] = useState<string>('');

    const sanitizeString = (value: unknown): string => {
        if (value === null || value === undefined) return '';
        return String(value).trim();
    };

    const sanitizeNumericString = (value: unknown): string => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'number') {
            return Number.isFinite(value) ? String(value) : '';
        }
        return String(value).replace(/[^0-9.]/g, '').trim();
    };

    const sanitizeBoolean = (value: unknown): boolean => Boolean(value);

    const toIntegerOrZero = (value: unknown): number => {
        if (value === null || value === undefined || value === '') return 0;
        if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value);
        const parsed = parseInt(String(value).replace(/[^0-9-]/g, '').trim(), 10);
        return Number.isNaN(parsed) ? 0 : parsed;
    };

    const buildFundingStructurePayload = () => {
        const fs = businessState.fundingStructureData || {};
        const fundingTypeFromSelection = selectedFunding.length > 0 ? selectedFunding.join(',') : '';
        const fundingTypeValue = sanitizeString(fundingTypeFromSelection || fs.funding_type);
        const instrumentTypeValue = sanitizeString(selectedOption || fs.instrument_type);

        return {
            funding_type: fundingTypeValue,
            instrument_type: instrumentTypeValue,
            funding_amount_seeking: sanitizeNumericString(fs.funding_amount_seeking),
            current_valuation: sanitizeNumericString(fs.current_valuation),
            percentage_equity_offering: sanitizeNumericString(fs.percentage_equity_offering),
            intended_use_of_funds: sanitizeString(fs.intended_use_of_funds),
            interest_rate: sanitizeNumericString(fs.interest_rate),
            maturity_period: sanitizeNumericString(fs.maturity_period),
            conversion_discount: sanitizeNumericString(fs.conversion_discount),
            valuation_cap: sanitizeNumericString(fs.valuation_cap),
            ideal_interest_range: sanitizeString(fs.ideal_interest_range),
            security_type: sanitizeString(fs.security_type),
            interest_structure: sanitizeString(fs.interest_structure),
            repayment_schedule: sanitizeString(fs.repayment_schedule || fs.repayment_term),
            collateral_available: sanitizeString(fs.collateral_available),
            hybrid_equity_type: sanitizeString(fs.hybrid_equity_type),
            hybrid_debt_type: sanitizeString(fs.hybrid_debt_type),
            hybrid_equity_percentage: sanitizeNumericString(fs.hybrid_equity_percentage),
            hybrid_debt_percentage: sanitizeNumericString(fs.hybrid_debt_percentage),
        };
    };

    const buildCompanyMetricsPayload = () => {
        const metrics: any = businessState.companyMetricsData || {};
        const teamMembers = Array.isArray(metrics.team_members) ? metrics.team_members : [];

        return {
            company_stage: sanitizeString(metrics.company_stage),
            gross_margin: sanitizeNumericString(metrics.gross_margin),
            burn_rate: sanitizeNumericString(metrics.burn_rate),
            months_of_runway: sanitizeNumericString(metrics.months_of_runway),
            upload_option_for_financial_statements: sanitizeString(metrics.upload_option_for_financial_statements),
            monthly_revenue: sanitizeNumericString(metrics.monthly_revenue),
            monthly_growth_rate: sanitizeNumericString(metrics.monthly_growth_rate),
            number_of_customers: sanitizeNumericString(metrics.number_of_customers),
            team_size: sanitizeNumericString(metrics.team_size),
            previous_funding: sanitizeString(metrics.previous_funding),
            total_previous_funding: sanitizeNumericString(metrics.total_previous_funding),
            number_of_active_merchants: sanitizeNumericString(metrics.number_of_active_merchants),
            transaction_value: sanitizeNumericString(metrics.transaction_value),
            customer_retention_percentage: sanitizeNumericString(metrics.customer_retention_percentage),
            market_share_percentage: sanitizeNumericString(metrics.market_share_percentage),
            team_details: teamMembers
                .map((member: any) => ({
                    first_name: sanitizeString(member?.first_name ?? member?.firstName),
                    last_name: sanitizeString(member?.last_name ?? member?.lastName),
                    role: sanitizeString(member?.role),
                    description: sanitizeString(member?.description ?? member?.briefDescription),
                }))
                .filter((member: { first_name: string; last_name: string; role: string; description: string }) =>
                    member.first_name || member.last_name || member.role || member.description
                ),
        };
    };

    const buildUseOfFundsPayload = () => {
        const uof = businessState.useOfFundsData || {};
        return {
            product_development: sanitizeString(uof.product_development),
            marketing_and_sales: sanitizeString(uof.marketing_and_sales),
            team_expansion: sanitizeString(uof.team_expansion),
            technology_infrastructure: sanitizeString(uof.technology_infrastructure),
            working_capital: sanitizeString(uof.working_capital),
            market_expansion: sanitizeString(uof.market_expansion),
            others: sanitizeString(uof.others),
            expected_funding_completion: sanitizeString(uof.expected_funding_completion),
            funds_deployment_timeline: sanitizeString(uof.funds_deployment_timeline),
            key_milestone_to_achieve_with_funding: sanitizeString(uof.key_milestone_to_achieve_with_funding),
        };
    };

    const buildEssentialDocumentsPayload = () => {
        const docs = businessState.essentialDocumentsData || {};
        return {
            business_plan: sanitizeString(docs.business_plan),
            financial_statements: sanitizeString(docs.financial_statements),
            financial_projections: sanitizeString(docs.financial_projections),
            pitch_deck: sanitizeString(docs.pitch_deck),
            certificate_of_incorporation: sanitizeString(docs.certificate_of_incorporation),
            cap_table: sanitizeString(docs.cap_table),
            market_analysis: sanitizeString(docs.market_analysis),
            product_demo: sanitizeString(docs.product_demo),
            customer_references: sanitizeString(docs.customer_references),
            legal_agreements: sanitizeString(docs.legal_agreements),
            director_id: sanitizeString(docs.director_id),
        };
    };

    const buildCompliancePayload = () => {
        const compliance: any = businessState.complianceVerificationData || {};
        return {
            interest_structure: sanitizeString(compliance.interest_structure),
            registration_number: sanitizeString(compliance.registration_number),
            tax_id_number: sanitizeString(compliance.tax_id_number),
            registered_address: sanitizeString(compliance.registered_address),
            legally_incorporated: sanitizeBoolean(compliance.legally_incorporated),
            founders_equity_agreement: sanitizeBoolean(compliance.founders_equity_agreement),
            pending_legal_disputes: sanitizeBoolean(compliance.pending_legal_disputes),
            authorized_to_raise_capital: sanitizeBoolean(compliance.authorized_to_raise_capital),
            local_securities_regulations: sanitizeBoolean(compliance.local_securities_regulations),
            certificate_of_incorporation: sanitizeString(compliance.certificate_of_incorporation),
            founder_agreements: sanitizeString(compliance.founder_agreements),
            legal_compliance_certificate: sanitizeString(compliance.legal_compliance_certificate),
            declaration: sanitizeBoolean(compliance.declaration),
        };
    };

    const buildInvestmentPreferencePayload = () => {
        const prefs: any = businessState.investmentPreferencesData || {};
        return {
            minimum_investment: toIntegerOrZero(prefs.minimum_investment),
            maximum_investment: toIntegerOrZero(prefs.maximum_investment),
            maximum_number_of_investors: toIntegerOrZero(prefs.maximum_number_of_investors),
            geographic_preference: sanitizeString(prefs.geographic_preference),
            funding_round_duration: sanitizeNumericString(prefs.funding_round_duration),
            expected_close_date: sanitizeString(prefs.expected_close_date),
            due_diligence_timeline: sanitizeNumericString(prefs.due_diligence_timeline),
            board_seat_offering: sanitizeString(prefs.board_seat_offering),
            investor_updates_frequency: sanitizeString(prefs.investor_updates_frequency),
            anti_dilution_rights: sanitizeString(prefs.anti_dilution_rights),
            investor_type_preference: sanitizeString(prefs.investor_type_preference),
        };
    };

    const buildBusinessListingPayload = ({
        userId,
        businessId,
        isComplete,
        listingId,
    }: {
        userId: string;
        businessId: string;
        isComplete: boolean;
        listingId?: string | null;
    }) => {
        // Get market opportunity, competitive advantage, and website URL from business form data
        const marketOpportunity = sanitizeString(
            businessState.businessFormData?.marketOpportunityDescription
        ) || null;
        const competitiveAdvantage = sanitizeString(
            businessState.businessFormData?.competitive_advantage_description
        ) || null;
        const websiteUrl = sanitizeString(
            businessState.businessFormData?.websiteUrl
        ) || null;

        const payload = {
            user_id: sanitizeString(userId),
            business_id: sanitizeString(businessId),
            is_complete: isComplete,
            // Include market_opportunity, competitive_advantage, and website_url at root level
            market_opportunity: marketOpportunity || null,
            competitive_advantage: competitiveAdvantage || null,
            website_url: websiteUrl || null,
        } as {
            user_id: string;
            business_id: string;
            is_complete: boolean;
            listing_id?: string;
            market_opportunity?: string | null;
            competitive_advantage?: string | null;
            website_url?: string | null;
        };

        const sanitizedListingId = sanitizeString(listingId);
        if (sanitizedListingId) {
            payload.listing_id = sanitizedListingId;
        }

        return {
            payload,
            funding_structure: buildFundingStructurePayload(),
            company_metrics_and_financial_information: buildCompanyMetricsPayload(),
            use_of_funds: buildUseOfFundsPayload(),
            essential_documents: buildEssentialDocumentsPayload(),
            compliance_and_verification: buildCompliancePayload(),
            investment_preference: buildInvestmentPreferencePayload(),
        };
    };



    //  update both local and Redux state
    const setCurrentStepAndPersist = (step: StepType) => {
        if (!validateStepNavigation(step)) {
            return; // Block navigation if validation fails
        }
        setCurrentStepLocal(step);
        dispatch(setCurrentStep(step));
        stepManuallySet.current = true;
    };

    // Helper function to validate step navigation
    const validateStepNavigation = (targetStep: StepType) => {
        if (userType === 'business' && targetStep === 'application-summary') {
            const { userId, businessId } = ensureBusinessProfile();
            if (!userId || !businessId) {
                toast.error('Please complete the business registration first.');
                return false;
            }
        }
        return true;
    };

    // Helper function to ensure business profile is properly set
    const ensureBusinessProfile = () => {
        const businessProfile = businessState.businessUserProfile;
        const hasValidProfile = businessProfile?.user_id && businessProfile?.business_id;


        if (!hasValidProfile) {
            // Try to restore from localStorage
            const persistedState = localStorage.getItem('persist:root');
            if (persistedState) {
                try {
                    const parsed = JSON.parse(persistedState);
                    const authData = parsed.auth ? JSON.parse(parsed.auth) : null;
                    const businessData = parsed.business ? JSON.parse(parsed.business) : null;


                    const fallbackUserId = authData?.loginData?.user_id || businessData?.businessUserProfile?.user_id;
                    const fallbackBusinessId = authData?.loginData?.business_id || businessData?.businessUserProfile?.business_id;

                    if (fallbackUserId && fallbackBusinessId) {

                        const restoredProfile = {
                            ...businessData?.businessUserProfile,
                            user_id: fallbackUserId,
                            business_id: fallbackBusinessId
                        };
                        dispatch({ type: 'business/setBusinessUserProfile', payload: restoredProfile });
                        return { userId: fallbackUserId, businessId: fallbackBusinessId };
                    }
                } catch (error) {
                    // Handle parsing error
                }
            }
        }

        const result = {
            userId: businessProfile?.user_id || loginData?.user_id,
            businessId: businessProfile?.business_id || loginData?.business_id
        };

        return result;
    };

    // Initialize step based on user type and clean state
    useEffect(() => {
        if (userType === 'investor') {
            // Always start investor flow from form step
            setCurrentStepLocal('form');
            // Preserve avatar when clearing state for new investor signup
            const existingAvatar = investorState.investorSignUpDetails?.avatar;
            if (existingAvatar && existingAvatar.trim() !== '') {
                // Clear all fields except avatar
                dispatch(setInvestorSignUpDetails({
                    first_name: '',
                    last_name: '',
                    email: '',
                    investor_type: '',
                    investment_experience: '',
                    password: '',
                    avatar: existingAvatar // Preserve avatar
                }));
            } else {
                // No avatar to preserve, safe to clear everything
                dispatch(clearInvestorSignUpDetails());
            }
        } else {
            // For business, check if account is already created
            const hasBusinessProfile = businessState.businessUserProfile?.user_id && businessState.businessUserProfile?.business_id;
            if (businessState.isAccountCreated || hasBusinessProfile) {
                // If account is created and step hasn't been manually set, start from funding step
                if (!stepManuallySet.current) {
                    setCurrentStepLocal('funding');
                }
            } else {
                // For business, use persisted step but don't override if already manually set
                if (!stepManuallySet.current) {
                    const businessStep = (businessState.currentStep as StepType) || 'form';
                    setCurrentStepLocal(businessStep);
                }
            }
        }
    }, [userType, dispatch, businessState.isAccountCreated, businessState.businessUserProfile?.user_id, businessState.businessUserProfile?.business_id]);

    // Clean slate on component mount - but preserve avatar if it exists
    useEffect(() => {
        // Get existing avatar before clearing
        const existingAvatar = investorState.investorSignUpDetails?.avatar;

        // Only clear if there's no avatar to preserve, or if we're starting fresh
        // If avatar exists, preserve it by merging instead of clearing
        if (existingAvatar && existingAvatar.trim() !== '') {
            // Preserve avatar by only clearing non-avatar fields
            dispatch(setInvestorSignUpDetails({
                first_name: '',
                last_name: '',
                email: '',
                investment_firm: '',
                investor_type: '',
                investment_experience: '',
                password: '',
                avatar: existingAvatar // Preserve avatar
            }));
        } else {
            // No avatar to preserve, safe to clear everything
            dispatch(clearInvestorSignUpDetails());
        }
        dispatch(clearComplianceVerificationData()); // Clear any old non-serializable data
    }, [dispatch, investorState.investorSignUpDetails?.avatar]);


    // Sync selectedFunding with Redux state (only on mount)
    useEffect(() => {
        if (businessState.fundingStructureData?.funding_type && selectedFunding.length === 0) {
            const fundingTypes = businessState.fundingStructureData.funding_type.split(',');
            setSelectedFunding(fundingTypes);
        }
    }, []); // Only run on mount

    // Sync selectedOption with Redux state (only on mount)
    useEffect(() => {
        if (businessState.fundingStructureData?.instrument_type && selectedOption === '') {
            setSelectedOption(businessState.fundingStructureData.instrument_type);
        }
    }, []); // Only run on mount


    // Business flow: form -> funding -> options -> debt-details -> hybrid-funding -> company-metrics -> use-of-funds -> review-application -> finalize-application -> compliance-verification -> investment-terms-preferences -> application-summary -> application-submitted-success
    // Investor flow: form -> document-upload -> registration complete

    const handleNext = async (formData?: any) => {
        if (userType === 'business') {
            // Check if account is already created or if we have business profile data
            const hasBusinessProfile = businessState.businessUserProfile?.user_id && businessState.businessUserProfile?.business_id;
            if (businessState.isAccountCreated || hasBusinessProfile) {
                if (!businessState.isAccountCreated) {
                    dispatch(setIsAccountCreated(true));
                }
                setCurrentStepAndPersist('funding');
                return;
            }

            try {
                const businessRegistrationData = {
                    company_name: formData.companyName,
                    industry_sector: formData.industry,
                    year_founded: formData.yearFounded,
                    country_location: formData.country,
                    headquarters: formData.headquarters,
                    company_size: formData.companySize,
                    current_stage: formData.currentStage,
                    description: formData.briefDescription,
                    market_opportunity_description: formData.marketOpportunityDescription,
                    competitive_advantage_description: formData.competitive_advantage_description,
                    website_url: formData.websiteUrl,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    linked_in_profile: formData.linkedinProfile,
                    email: formData.emailAddress,
                    phone_number: formData.phoneNumber,
                    password: formData.password,
                    avatar: formData.avatar || '',
                };

                // Store form data in Redux to ensure it's available when building listing payload
                dispatch(setBusinessFormData(formData));

                const result = await registerBusiness(businessRegistrationData);

                if ('data' in result) {
                    // Call the callback directly and check the result
                    businessRegistrationCallback(result.data, formData, dispatch, (res: any) => {
                        // Move to next step after successful business registration
                        setCurrentStepAndPersist('funding');
                    });

                    // Also manually set the data if callback doesn't work
                    if (result.data?.payload) {
                        const businessProfile = {
                            business_id: result.data.payload.business_id || "",
                            user_id: result.data.payload.user_id || "",
                            company_name: formData.companyName,
                            industry_sector: formData.industry,
                            year_founded: formData.yearFounded,
                            country_location: formData.country,
                            company_size: formData.companySize,
                            current_stage: formData.currentStage,
                            description: formData.briefDescription,
                            website_url: formData.websiteUrl,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            linked_in_profile: formData.linkedinProfile,
                            email: formData.emailAddress,
                            phone_number: formData.phoneNumber,
                        };

                        dispatch({ type: 'business/setBusinessUserProfile', payload: businessProfile });
                        dispatch(setIsAccountCreated(true));

                        // Also set login data
                        const loginData = {
                            access_token: result.data.payload.access_token || "",
                            refresh_token: result.data.payload.refresh_token || "",
                            user_id: result.data.payload.user_id || "",
                            email: formData.emailAddress,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            user_type: "business",
                            role: result.data.payload.role || "business",
                            is_business: true,
                            business_id: result.data.payload.business_id || "",
                        };

                        dispatch({ type: 'auth/logUserIn', payload: loginData });

                    }
                } else if ('error' in result) {
                    const error = result.error as any;
                    const errorMessage = error?.data?.message || error?.message || '';

                    const isUserExists = error?.status === 409 ||
                        error?.status === 400 && (
                            errorMessage.toLowerCase().includes('already exists') ||
                            errorMessage.toLowerCase().includes('user already exists') ||
                            errorMessage.toLowerCase().includes('email already exists') ||
                            errorMessage.toLowerCase().includes('already registered')
                        );

                    if (isUserExists) {
                        // User already exists, populate business profile with form data so they can continue
                        const businessProfile = {
                            business_id: "", // Will be populated when they complete the process
                            user_id: "", // Will be populated when they complete the process
                            company_name: formData.companyName,
                            industry_sector: formData.industry,
                            year_founded: formData.yearFounded,
                            country_location: formData.country,
                            company_size: formData.companySize,
                            current_stage: formData.currentStage,
                            description: formData.briefDescription,
                            website_url: formData.websiteUrl,
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            linked_in_profile: formData.linkedinProfile,
                            email: formData.emailAddress,
                            phone_number: formData.phoneNumber,
                        };

                        dispatch({ type: 'business/setBusinessUserProfile', payload: businessProfile });
                        dispatch(setIsAccountCreated(true));

                        toast.success("Account already exists. Continuing with your registration...", {
                            position: "top-right",
                        });

                        setCurrentStepAndPersist('funding');
                        return;
                    }
                    businessRegistrationErrorCallback(result.error, (error: any) => {
                        // Handle registration error
                    });
                }
            } catch (error: any) {
                // Handle registration error
            }
        } else if (userType === 'investor') {
            setInvestorFormData(formData);

            // Get existing avatar from Redux state to preserve it
            const existingAvatar = investorState.investorSignUpDetails?.avatar;

            // Build the payload, preserving the existing avatar if present
            const signUpDetailsPayload: any = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                investor_type: formData.investorType,
                investment_experience: formData.investmentExperience,
                password: formData.password,
                investment_firm: formData.investmentFirm || ''
            };

            // Preserve existing avatar if it exists and is not empty
            if (existingAvatar && existingAvatar.trim() !== '') {
                signUpDetailsPayload.avatar = existingAvatar;
            }

            dispatch(setInvestorSignUpDetails(signUpDetailsPayload));
            setCurrentStepAndPersist('document-upload');
        }
    };

    const handleFundingNext = (funding: string[]) => {
        setFundingError('');

        // Validate that we have a valid funding type
        if (!funding || funding.length === 0) {
            setFundingError('Please select a funding type to continue');
            return;
        }

        const fundingType = funding[0];

        // Validate that the funding type is one of the expected values
        if (!['equity', 'debt', 'hybrid'].includes(fundingType)) {
            setFundingError('Invalid funding type selected. Please try again.');
            return;
        }

        setSelectedFunding(funding);

        // Update Redux state with funding structure data
        dispatch(updateFundingStructureData({
            funding_type: funding.join(',')
        }));

        // Route to different components based on funding type
        switch (fundingType) {
            case 'equity':
                setCurrentStepAndPersist('options');
                break;
            case 'debt':
                setCurrentStepAndPersist('debt-details');
                break;
            case 'hybrid':
                setCurrentStepAndPersist('hybrid-funding');
                break;
            default:
                setCurrentStepAndPersist('options');
        }
    };

    const handleOptionsNext = (option: string, additionalFields?: any) => {
        setSelectedOption(option);
        // For equity funding, go to company metrics
        setCurrentStepAndPersist('company-metrics');
    };

    const handleDebtDetailsNext = () => {
        // For debt funding, go to company metrics
        setCurrentStepAndPersist('company-metrics');
    };

    const handleHybridFundingNext = (data: HybridFundingData) => {
        setHybridFundingData(data);
        // For hybrid funding, go to company metrics
        setCurrentStepAndPersist('company-metrics');
    };

    const handleCompanyMetricsNext = (data: CompanyMetricsData) => {
        setCompanyMetricsData(data);
        dispatch(updateCompanyMetricsData(data));
        setCurrentStepAndPersist('use-of-funds');
    };

    const handleUseOfFundsNext = (data: UseOfFundsData) => {
        setUseOfFundsData(data);
        dispatch(updateUseOfFundsData(data));
        setCurrentStepAndPersist('review-application');
    };

    const handleReviewApplicationNext = () => {
        setCurrentStepAndPersist('finalize-application');
    };

    const handleSaveDraft = async () => {
        const businessProfile = businessState.businessUserProfile;
        const userId = businessProfile.user_id || loginData?.user_id;
        const businessId = businessProfile.business_id || loginData?.business_id;
        const listingId = businessState.listingId;

        if (!businessId || !userId) {
            return;
        }

        // Only save draft if there's an existing listing
        if (!listingId || listingId.trim() === '') {
            return;
        }
        try {
            // Determine if this is a create or edit operation
            const isEdit = listingId && listingId.trim() !== '';

            // Comprehensive business listing with all collected data as DRAFT (is_complete: false)
            const businessListingData = buildBusinessListingPayload({
                userId,
                businessId,
                isComplete: false,
                listingId,
            });

            // Use appropriate mutation based on whether this is a create or edit operation
            const result = isEdit
                ? await editBusinessListing(businessListingData)
                : await createBusinessListing(businessListingData);

            if ('data' in result) {
                businessListingUpdateCallback(result.data, dispatch, (res: any) => {
                    // Draft saved successfully
                });
            } else if ('error' in result) {
                businessListingErrorCallback(result.error, (error: any) => {
                });
            }
        } catch (error: any) {
            toast.error('Failed to save draft. Please try again.', {
                position: 'top-right',
            });
        }
    };

    const handleEditSection = (section: string) => {
        // Navigate to the appropriate section for editing
        switch (section) {
            case 'company-info':
                setCurrentStepAndPersist('form');
                break;
            case 'funding-structure':
                setCurrentStepAndPersist('funding');
                break;
            case 'metrics-financials':
                setCurrentStepAndPersist('company-metrics');
                break;
            case 'use-of-funds':
                setCurrentStepAndPersist('use-of-funds');
                break;
            default:
                break;
        }
    };

    const handleFinalizeApplicationNext = (documents: Record<string, UploadedFile>) => {
        setFinalizeApplicationData({ documents });
        // Convert documents to essential documents format
        const essentialDocs = Object.keys(documents).reduce((acc, key) => {
            acc[key] = documents[key].name || "";
            return acc;
        }, {} as any);
        dispatch(updateEssentialDocumentsData(essentialDocs));
        setCurrentStepAndPersist('compliance-verification');
    };

    const handleComplianceVerificationNext = (data: ComplianceVerificationData) => {
        setComplianceVerificationData(data);

        // Create a serializable version for Redux (exclude File objects)
        const serializableData = {
            regulatoryInfo: data.regulatoryInfo,
            complianceChecklist: data.complianceChecklist,
            declarations: data.declarations,
            // Convert File objects to strings (URLs) for Redux storage
            certificate_of_incorporation: data.documents.certificateOfIncorporation ?
                (typeof data.documents.certificateOfIncorporation === 'string' ?
                    data.documents.certificateOfIncorporation : '') : '',
            founder_agreements: data.documents.founderAgreements ?
                (typeof data.documents.founderAgreements === 'string' ?
                    data.documents.founderAgreements : '') : '',
            legal_compliance_certificate: data.documents.legalComplianceCertificate ?
                (typeof data.documents.legalComplianceCertificate === 'string' ?
                    data.documents.legalComplianceCertificate : '') : '',
            declaration: data.declarations.accurateInfo && data.declarations.authorityToRaise && data.declarations.termsAgreement,
        };

        dispatch(updateComplianceVerificationData(serializableData));
        setCurrentStepAndPersist('investment-terms-preferences');
    };

    const handleTrackReviewStatus = () => {
        setShowApplicationReviewModal(true);
    };

    const handleApplicationReviewModalClose = () => {
        setShowApplicationReviewModal(false);
    };

    const handleEditApplication = () => {
        setShowApplicationReviewModal(false);
        // Navigate back to allow editing 
        setCurrentStepAndPersist('compliance-verification');
    };

    const handleTrackStatusFromModal = () => {
        setShowApplicationReviewModal(false);
        setCurrentStepAndPersist('investment-terms-preferences');
    };

    const handleInvestmentTermsNext = (data: InvestmentTermsData) => {
        setInvestmentTermsData(data);
        dispatch(updateInvestmentPreferencesData({
            minimum_investment: parseInt(data.minimumInvestment) || 0,
            maximum_investment: parseInt(data.maximumInvestment) || 0,
            maximum_number_of_investors: parseInt(data.maximumInvestors) || 0,
            geographic_preference: data.geographicPreference,
            funding_round_duration: data.fundingRoundDuration,
            expected_close_date: data.expectedCloseDate,
            due_diligence_timeline: data.dueDiligenceTimeline,
            investor_type_preference: data.investorTypePreference,
            investor_updates_frequency: data.investorUpdatesFrequency,
        }));
        setCurrentStepAndPersist('application-summary');
    };

    const handleInvestmentTermsDataChange = (data: InvestmentTermsData) => {
        setInvestmentTermsData(data);
    };

    const handleApplicationSummaryNext = async () => {
        // Ensure business profile is properly set
        const { userId, businessId } = ensureBusinessProfile();
        const listingId = businessState.listingId;


        if (!businessId || !userId) {

            // Check if we're in the middle of registration process
            if (!businessState.isAccountCreated) {
                toast.error('Please complete the business registration first. Redirecting to registration form...');
                setCurrentStepAndPersist('form');
                return;
            }

            // If account is marked as created but data is missing, try to recover

            // Try to get data from localStorage one more time
            const persistedState = localStorage.getItem('persist:root');
            if (persistedState) {
                try {
                    const parsed = JSON.parse(persistedState);
                    const authData = parsed.auth ? JSON.parse(parsed.auth) : null;
                    const businessData = parsed.business ? JSON.parse(parsed.business) : null;


                    const fallbackUserId = authData?.loginData?.user_id || businessData?.businessUserProfile?.user_id;
                    const fallbackBusinessId = authData?.loginData?.business_id || businessData?.businessUserProfile?.business_id;

                    if (fallbackUserId && fallbackBusinessId) {
                        // Continue with the submission using fallback data
                        const businessListingData = buildBusinessListingPayload({
                            userId: fallbackUserId,
                            businessId: fallbackBusinessId,
                            isComplete: true,
                            listingId,
                        });

                        // Use appropriate mutation based on whether this is a create or edit operation
                        const isEdit = listingId && listingId.trim() !== '';
                        const result = isEdit
                            ? await editBusinessListing(businessListingData)
                            : await createBusinessListing(businessListingData);

                        if ('data' in result) {

                            await new Promise(resolve => setTimeout(resolve, 2000));

                            const callback = isEdit ? businessListingUpdateCallback : businessListingCallback;
                            callback(result.data, dispatch, (res: any) => {
                                setCurrentStepAndPersist('application-submitted-success');
                            });
                        } else if ('error' in result) {
                            businessListingErrorCallback(result.error, (error: any) => {
                                // Handle listing error
                            });
                        }
                        return;
                    }
                } catch (error) {
                    // Handle recovery error
                }
            }

            toast.error('Business registration data is missing. Please refresh the page and try again.');
            return;
        }

        // Determine if this is a create or edit operation
        const isEdit = listingId && listingId.trim() !== '';

        try {
            // Comprehensive business listing with all collected data
            const businessListingData = buildBusinessListingPayload({
                userId,
                businessId,
                isComplete: true,
                listingId,
            });

            // Use appropriate mutation based on whether this is a create or edit operation
            const result = isEdit
                ? await editBusinessListing(businessListingData)
                : await createBusinessListing(businessListingData);

            if ('data' in result) {

                await new Promise(resolve => setTimeout(resolve, 2000));

                const callback = isEdit ? businessListingUpdateCallback : businessListingCallback;
                callback(result.data, dispatch, (res: any) => {
                    setCurrentStepAndPersist('application-submitted-success');
                });
            } else if ('error' in result) {
                businessListingErrorCallback(result.error, (error: any) => {
                    // Handle listing error
                });
            }
        } catch (error: any) {
            // Handle listing error
        }
    };

    const handleBusinessApplicationSubmit = () => {
        // Delegate to handleApplicationSummaryNext
        handleApplicationSummaryNext();
    };

    const handleApplicationSummaryEditApplication = () => {
        // Navigate back to allow editing from the last significant step
        // This allows users to edit their application before final submission
        setCurrentStepAndPersist('investment-terms-preferences');
    };

    const handleApplicationSubmittedNext = () => {
        // Navigation after application submission
    };



    // Auto-save utility function for updating existing listings
    const autoSaveApplicationChanges = async () => {
        const businessProfile = businessState.businessUserProfile;
        const userId = businessProfile.user_id || loginData?.user_id;
        const businessId = businessProfile.business_id || loginData?.business_id;
        const listingId = businessState.listingId;

        // Only auto-save if there's an existing listing
        if (!businessId || !userId || !listingId || listingId.trim() === '') {
            return;
        }

        try {
            const autoSaveData = buildBusinessListingPayload({
                userId,
                businessId,
                isComplete: false,
                listingId,
            });

            // Silent auto-save without showing success messages
            await editBusinessListing(autoSaveData);
        } catch (error) {
            // Silent fail for auto-save to not interrupt user flow
        }
    };

    const handleBack = () => {
        switch (currentStep) {
            case 'document-upload':
                setCurrentStepAndPersist('form');
                break;
            case 'funding':
                setCurrentStepAndPersist('form');
                setFundingError('');
                break;
            case 'options':
                setCurrentStepAndPersist('funding');
                break;
            case 'debt-details':
                setCurrentStepAndPersist('funding');
                break;
            case 'hybrid-funding':
                setCurrentStepAndPersist('funding');
                break;
            case 'company-metrics':
                // Go back to the appropriate funding step based on selected funding type
                if (selectedFunding.includes('equity')) {
                    setCurrentStepAndPersist('options');
                } else if (selectedFunding.includes('debt')) {
                    setCurrentStepAndPersist('debt-details');
                } else if (selectedFunding.includes('hybrid')) {
                    setCurrentStepAndPersist('hybrid-funding');
                } else {
                    setCurrentStepAndPersist('funding');
                }
                break;
            case 'use-of-funds':
                setCurrentStepAndPersist('company-metrics');
                break;
            case 'review-application':
                setCurrentStepAndPersist('use-of-funds');
                break;
            case 'finalize-application':
                setCurrentStepAndPersist('review-application');
                break;
            case 'compliance-verification':
                setCurrentStepAndPersist('finalize-application');
                break;
            case 'investment-terms-preferences':
                setCurrentStepAndPersist('compliance-verification');
                break;
            case 'application-summary':
                setCurrentStepAndPersist('investment-terms-preferences');
                break;
            case 'application-submitted-success':
                setCurrentStepAndPersist('application-summary');
                break;
            default:
                setCurrentStepAndPersist('form');
        }
    };

    const handleSkip = () => {
        // Handle completion or move to final step
    };

    const handleUserTypeChange = (type: 'investor' | 'business') => {
        setUserType(type);


        if (type === 'investor') {
            dispatch(clearInvestorSignUpDetails());
        } else {
            dispatch(clearAllBusinessData());
        }


        setInvestorFormData(null);
        setSelectedFunding([]);
        setSelectedOption('');
        setHybridFundingData(null);
        setCompanyMetricsData(null);
        setUseOfFundsData(null);
        setReviewApplicationData(null);
        setFinalizeApplicationData(null);
        setComplianceVerificationData(null);
        setInvestmentTermsData(null);
        setApplicationSummaryData(null);
        setCurrentStepAndPersist('form');
        setFundingError('');
    };

    const getMaxWidth = () => {
        if (currentStep === 'document-upload' ||
            currentStep === 'funding' ||
            currentStep === 'options' ||
            currentStep === 'debt-details' ||
            currentStep === 'hybrid-funding' ||
            currentStep === 'company-metrics' ||
            currentStep === 'use-of-funds' ||
            currentStep === 'review-application' ||
            currentStep === 'finalize-application' ||
            currentStep === 'compliance-verification' ||
            currentStep === 'investment-terms-preferences' ||
            currentStep === 'application-summary' ||
            currentStep === 'application-submitted-success') {
            return { xs: '100%', sm: 650, md: 750 };
        }
        return { xs: '100%', sm: 600, md: 700 };
    };

    const handleGoToDashboard = () => {
        // Clear Redux state based on user type
        if (userType === 'business') {
            dispatch(clearAllBusinessData());
        } else {
            dispatch(clearInvestorSignUpDetails());
        }

        // Navigate to appropriate dashboard
        if (typeof window !== 'undefined') {
            if (userType === 'business') {
                window.location.href = '/business';
            } else {
                // For investors, redirect to dashboard (modal will show based on is_first_login)
                window.location.href = '/dashboard';
            }
        }
    };

    const handleAccessDashboard = () => {
        // Clear Redux state based on user type
        if (userType === 'business') {
            dispatch(clearAllBusinessData());
        } else {
            dispatch(clearInvestorSignUpDetails());
        }

        // Navigate to appropriate dashboard
        if (typeof window !== 'undefined') {
            window.location.href = userType === 'business' ? '/business' : '/dashboard';
        }
    };

    return (
        <>
            <Header />
            <SignUpLayout userType={userType} currentStep={currentStep}>
                {/* Progress Bar */}
                <ProgressBar currentStep={currentStep} userType={userType} />
                {/* Step 1: Form */}
                {currentStep === 'form' && (
                    <>
                        {userType === 'investor' && (
                            <Box sx={{ mb: 3, textAlign: 'left' }}>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5, color: '#333', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                                    Sign up
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                    Join Nexfund to access investment opportunities
                                </Typography>
                            </Box>
                        )}

                        {userType === 'business' && (
                            <Box sx={{ mb: 3, textAlign: 'left' }}>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 1,
                                        color: '#333',
                                        fontSize: { xs: '1.1rem', sm: '1.3rem', lg: '1.4rem' }
                                    }}
                                >
                                    Join Nexfund to Connect with investors and raise funding for your business
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                >
                                    Tell us about your company
                                </Typography>
                            </Box>
                        )}

                        <UserTypeSelector
                            selectedType={userType}
                            onTypeChange={handleUserTypeChange}
                        />

                        {userType === 'investor' ? (
                            <InvestorFormStep onNext={handleNext} userType={userType} />
                        ) : (
                            <BusinessFormStep onNext={handleNext} />
                        )}
                    </>
                )}

                {/* Step 2: Document Upload (Investor only) */}
                {currentStep === 'document-upload' && userType === 'investor' && (
                    <DocumentUpload
                        onBack={handleBack}
                        onSkip={handleSkip}
                        investorFormData={investorFormData}
                    />
                )}

                {/* Step 3: Business Funding Type (Business only) */}
                {currentStep === 'funding' && (
                    <>
                        <FundingTypeStep onBack={handleBack} onNext={handleFundingNext} error={fundingError} />
                    </>
                )}

                {/* Step 3: Business Funding Options (Business only) */}
                {currentStep === 'options' && selectedFunding.includes('equity') && (
                    <EquityOptionsStep onBack={handleBack} onNext={handleOptionsNext} />
                )}

                {/* Step 4: Business Debt Details (Business only) */}
                {currentStep === 'debt-details' && selectedFunding.includes('debt') && (
                    <DebtDetailsStep onBack={handleBack} onNext={handleDebtDetailsNext} selectedFundingType={selectedFunding[0]} />
                )}

                {/* Step 5: Hybrid Funding Selector (Business only) */}
                {currentStep === 'hybrid-funding' && selectedFunding.includes('hybrid') && (
                    <HybridFundingStep onBack={handleBack} onNext={handleHybridFundingNext} selectedFundingType={selectedFunding[0]} />
                )}

                {/* Fallback for invalid funding type */}
                {currentStep === 'options' && !selectedFunding.includes('equity') && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="error">
                            Invalid funding type selected. Please go back and select a valid option.
                        </Typography>
                    </Box>
                )}

                {currentStep === 'debt-details' && !selectedFunding.includes('debt') && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="error">
                            Invalid funding type selected. Please go back and select a valid option.
                        </Typography>
                    </Box>
                )}

                {currentStep === 'hybrid-funding' && !selectedFunding.includes('hybrid') && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6" color="error">
                            Invalid funding type selected. Please go back and select a valid option.
                        </Typography>
                    </Box>
                )}

                {/* Step 6: Company Metrics (Business only) */}
                {currentStep === 'company-metrics' && (
                    <CompanyMetricsStep onBack={handleBack} onNext={handleCompanyMetricsNext} />
                )}

                {/* Step 7: Use of Funds (Business only) */}
                {currentStep === 'use-of-funds' && (
                    <UseOfFundsStep onBack={handleBack} onNext={handleUseOfFundsNext} />
                )}

                {/* Step 8: Review Application (Business only) */}
                {currentStep === 'review-application' && (
                    <ReviewApplicationStep
                        onBack={handleBack}
                        onSaveDraft={handleSaveDraft}
                        onContinue={handleReviewApplicationNext}
                        data={{
                            company: {
                                name: capitalizeWords(businessState.businessFormData?.companyName || 'Your Company Name'),
                                amount: formatCurrency(businessState.fundingStructureData?.funding_amount_seeking || '0'),
                                type: formatFundingTypes(selectedFunding) || 'Series A',
                                stage: capitalizeWords(businessState.businessFormData?.currentStage || 'Growth'),
                                industry: capitalizeWords(businessState.businessFormData?.industry || 'Technology')
                            },
                            useOfFunds: businessState.fundingStructureData?.intended_use_of_funds
                                ? businessState.fundingStructureData.intended_use_of_funds.split(',').filter(item => item.trim() !== '')
                                : ['Product Development', 'Marketing & Sales']
                        }}
                        onEditSection={handleEditSection}
                    />
                )}

                {/* Step 9: Finalize Application (Business only) */}
                {currentStep === 'finalize-application' && (
                    <FinalizeApplicationStep onBack={handleBack} onNext={handleFinalizeApplicationNext} />
                )}

                {/* Step 10: Compliance Verification (Business only) */}
                {currentStep === 'compliance-verification' && (
                    <ComplianceVerificationStep onBack={handleBack} onNext={handleComplianceVerificationNext} />
                )}

                {/* Step 11: Investment Terms Preferences (Business only) */}
                {currentStep === 'investment-terms-preferences' && (
                    <InvestmentTermsStep
                        onBack={handleBack}
                        onBackToEdit={() => setCurrentStepAndPersist('compliance-verification')}
                        onContinue={() => setCurrentStepAndPersist('application-summary')}
                        data={investmentTermsData || undefined}
                        onDataChange={handleInvestmentTermsDataChange}
                    />
                )}

                {/* Step 12: Application Summary (Business only) */}
                {currentStep === 'application-summary' && (
                    <ApplicationSummaryStep
                        onBack={handleBack}
                        onEditApplication={handleApplicationSummaryEditApplication}
                        onSubmitApplication={handleBusinessApplicationSubmit}
                        onSaveDraft={handleSaveDraft}
                        isSubmitting={isCreatingBusinessAccount}
                        data={{
                            company: {
                                name: businessState.businessFormData?.companyName || 'Your Company Name',
                                industry: businessState.businessFormData?.industry || 'Technology',
                                foundedYear: businessState.businessFormData?.yearFounded || '2020',
                                stage: businessState.businessFormData?.currentStage || 'Growth',
                                employeeCount: businessState.businessFormData?.companySize || '50-100'
                            },
                            funding: {
                                type: selectedFunding.join(', ') || 'Series A',
                                amount: businessState.fundingStructureData?.funding_amount_seeking || '1,000,000',
                                equityOffering: businessState.fundingStructureData?.percentage_equity_offering || hybridFundingData?.equityComponent?.equityPercentage || '20',
                                duration: businessState.useOfFundsData?.funds_deployment_timeline ? `${businessState.useOfFundsData.funds_deployment_timeline} months` : (investmentTermsData?.fundingRoundDuration || '6 months'),
                                closeDate: businessState.useOfFundsData?.expected_funding_completion || investmentTermsData?.expectedCloseDate || '2024-12-31'
                            },
                            useOfFunds: businessState.fundingStructureData?.intended_use_of_funds
                                ? businessState.fundingStructureData.intended_use_of_funds.split(',').filter(item => item.trim() !== '')
                                : ['Product Development', 'Marketing & Sales', 'Team Expansion'],
                            investorPreferences: {
                                minInvestment: investmentTermsData?.minimumInvestment || '10,000',
                                maxInvestment: investmentTermsData?.maximumInvestment || '500,000',
                                investorTypes: investmentTermsData?.investorTypePreference ? [investmentTermsData.investorTypePreference] : ['Angel Investors', 'VC Firms']
                            }
                        }}
                    />
                )}

                {/* Final Step: Application Submitted Success (Business only) */}
                {currentStep === 'application-submitted-success' && (
                    <SubmittedSuccessStep
                        onGoToDashboard={handleGoToDashboard}
                        onViewStatus={() => { }}
                        onAccessDashboard={handleAccessDashboard}
                        onInviteMembers={() => { }}
                        onPreviewListing={() => { }}
                    />
                )}

                {/* Application Review Modal */}
                {showApplicationReviewModal && (
                    <ApplicationReviewModal
                        open={showApplicationReviewModal}
                        onClose={handleApplicationReviewModalClose}
                        onEditApplication={handleEditApplication}
                        onTrackStatus={handleTrackStatusFromModal}
                    />
                )}
            </SignUpLayout>
        </>
    );
};

export default SignUpPage;