"use client";

import SwitchTabs, { SwitchTabConfig } from '@/components/business/home/switch-tabs';
import { GeneralSettings } from '@/components/business/settings/general-settings';
import { useBusinessInformationData } from '@/components/business/settings/hooks/useBusinessInformationData';
import { useBusinessListingData } from '@/components/business/settings/hooks/useBusinessListingData';
import { useBusinessProfileData } from '@/components/business/settings/hooks/useBusinessProfileData';
import { ProfileSettings } from '@/components/business/settings/profile-settings';
import adminCallBack from '@/queries/callbacks/adminCallBack';
import { removeNumberFormatting, shouldFormatNumber } from '@/utils/formatters';
import { Box } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useEditListingDocumentsMutation, useGetBusinessByIdQuery, useGetBusinessListingDocumentsQuery, useGetBusinessSettingsQuery, useUpdateBusinessProfileMutation } from '../queries/businessApi';
import { useBusinessSelector } from '../Redux/selectors';

import { BUSINESS_INFO_FIELDS } from '@/utils/constants';

const BusinessSettingsPage = () => {

    const { businessUserProfile } = useBusinessSelector();
    const { data: businessSettings, refetch } = useGetBusinessSettingsQuery();
    const { data: listingData, refetch: refetchListing } = useGetBusinessListingDocumentsQuery(businessUserProfile?.business_id);
    const [updateBusinessProfile, { isLoading: isUpdating }] = useUpdateBusinessProfileMutation();
    const [editListing, { isLoading: isEditingListing }] = useEditListingDocumentsMutation();
    const [activeTab, setActiveTab] = useState('profile');

    const profileData = useBusinessProfileData(businessSettings);

    const listingDataHook = useBusinessListingData(listingData);

    const { data: businessInfoResponse, refetch: refetchBusinessInfo } = useGetBusinessByIdQuery(businessUserProfile?.business_id);
    const businessInformationData = useBusinessInformationData(businessInfoResponse);

    const handleSaveBusinessInfo = async (data: Record<string, any>) => {
        try {
            const businessUpdates = BUSINESS_INFO_FIELDS.reduce((acc, field) => {
                if (data[field] !== undefined && data[field] !== '') {
                    acc[field] = data[field];
                }
                return acc;
            }, {} as Record<string, any>);

            if (Object.keys(businessUpdates).length === 0) return;

            const payload: any = { business_information: businessUpdates };
            await updateBusinessProfile(payload).unwrap();
            adminCallBack.onUpdateBusinessProfileSuccess({ refetch, refetchBusinessInfo });
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update business information');
            throw error;
        }
    };

    const handleSaveSettings = async (data: Record<string, any>) => {
        try {
            const payload: any = {};

            const pickNonEmpty = (keys: string[]) =>
                keys.reduce((acc: Record<string, any>, k) => {
                    const v = data[k];
                    if (v !== undefined && v !== '') acc[k] = v;
                    return acc;
                }, {});

            const personal = pickNonEmpty(['contact_preference', 'country', 'phone_number', 'avatar']);
            if (Object.keys(personal).length > 0) payload.personal_information = personal;

            const business = pickNonEmpty(['company_name', 'industry_sector', 'year_founded', 'country_location', 'website_url']);
            if (Object.keys(business).length > 0) payload.business_information = business;

            const bankFields = ['bank_name', 'account_number', 'account_name', 'bank_code'];
            const bankUpdates = pickNonEmpty(bankFields);

            const cryptoAddress = data.cryptocurrency_address;
            const cryptoType = data.cryptocurrency_type;
            if ((cryptoAddress !== undefined && cryptoAddress !== '') || (cryptoType !== undefined && cryptoType !== '')) {
                bankUpdates.cryptocurrency = {} as Record<string, any>;
                if (cryptoAddress !== undefined && cryptoAddress !== '') bankUpdates.cryptocurrency.address = cryptoAddress;
                if (cryptoType !== undefined && cryptoType !== '') bankUpdates.cryptocurrency.symbol = cryptoType;
            }

            if (Object.keys(bankUpdates).length > 0) payload.bank_information = bankUpdates;

            if (Object.keys(payload).length === 0) return;

            await updateBusinessProfile(payload).unwrap();
            adminCallBack.onUpdateBusinessProfileSuccess({ refetch });
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update settings');
            throw error;
        }
    };

    const handleSaveListingSettings = async (data: Record<string, any>) => {
        try {
            const requestBody: any = {
                payload: {
                    user_id: businessUserProfile?.user_id,
                    listing_id: listingData?.payload?.listing_id,
                    is_complete: true,
                },
            };

            const processed = Object.fromEntries(
                Object.entries(data).map(([k, v]) => [k, shouldFormatNumber(k) ? removeNumberFormatting(v) : v])
            ) as Record<string, any>;

            const sections: Array<{ key: string; source?: Record<string, any> }> = [
                { key: 'funding_structure', source: listingData?.payload?.funding_structure },
                { key: 'company_metrics_and_financial_information', source: listingData?.payload?.company_metrics_and_financial_information },
                { key: 'use_of_funds', source: listingData?.payload?.use_of_funds },
                { key: 'compliance_and_verification', source: listingData?.payload?.compliance_and_verification },
                { key: 'investment_preference', source: listingData?.payload?.investment_preference },
            ];

            sections.forEach((section) => {
                if (!section.source || typeof section.source !== 'object') return;

                const picked = Object.keys(section.source).reduce((acc: Record<string, any>, key) => {
                    if (Object.prototype.hasOwnProperty.call(processed, key)) {
                        acc[key] = processed[key];
                    }
                    return acc;
                }, {});

                if (Object.keys(picked).length > 0) requestBody[section.key] = picked;
            });

            await editListing(requestBody).unwrap();
            adminCallBack.onEditListingSuccess({ refetchListing });
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update listing');
            throw error;
        }
    };

    const tabsConfig: SwitchTabConfig[] = [
        {
            value: 'profile',
            label: 'Profile Settings',
            component: (
                <ProfileSettings
                    personalInfo={profileData.personalInfo}
                    businessInfo={profileData.businessInfo}
                    kycCompliance={profileData.kycCompliance}
                    bankPaymentInfo={profileData.bankPaymentInfo}
                    security={profileData.security}
                    preferences={profileData.preferences}
                    currentAvatar={businessSettings?.payload?.personal_information?.avatar}
                    handleSaveSettings={handleSaveSettings}
                    isUpdating={isUpdating}
                />
            )
        },
        {
            value: 'general',
            label: 'General Settings',
            component: (
                <GeneralSettings
                    fundingStructureData={listingDataHook.fundingStructureData}
                    companyMetricsData={listingDataHook.companyMetricsData}
                    useOfFundsData={listingDataHook.useOfFundsData}
                    complianceData={listingDataHook.complianceData}
                    investmentPreferenceData={listingDataHook.investmentPreferenceData}
                    businessInfoData={businessInformationData}
                    handleSaveBusinessInfo={handleSaveBusinessInfo}
                    isUpdatingBusinessInfo={isUpdating}
                    handleSaveListingSettings={handleSaveListingSettings}
                    isEditingListing={isEditingListing}
                />
            )
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>

            <div className='px-5 py-6 border border-[#EEF1F4] rounded-lg'>
                <h2 className="text-[#1E1E1E] text-2xl font-bold mb-1">
                    Settings
                </h2>
                <p className="text-[#6A6A6A] font-sm">
                    Manage your profile, documents, preferences & security
                </p>
            </div>

            <div className='mt-6'>
                <Box sx={{
                    p: 0,
                    border: '1px solid #EEF1F4',
                    borderRadius: '12px',
                    mb: 3
                }}>
                    <SwitchTabs
                        tabs={tabsConfig}
                        value={activeTab}
                        onChange={setActiveTab}
                    />
                </Box>
            </div>
        </Box>
    )
}

export default BusinessSettingsPage;
