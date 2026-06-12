"use client";

import EditInfo from '@/components/business/settings/edit-info';
import { useGetSettingsDataQuery, useUpdateSettingsMutation } from '@/queries/adminApi';
import { useUploadFileMutation } from '@/queries/authApi';
import { Box } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AdminSettings = () => {

    const { data: settingsData, error, isLoading, refetch } = useGetSettingsDataQuery();
    const [updateSettings, { isLoading: updating }] = useUpdateSettingsMutation();
    const [uploadFile] = useUploadFileMutation();
    const [uploading, setUploading] = useState(false);

    const platformInfo = [
        { label: 'Platform Name', value: isLoading ? 'Loading...' : 'NexFund' },
        { label: 'Primary Contact Email', value: isLoading ? 'Loading...' : (settingsData?.payload?.primary_contact_email || 'N/A'), editable: true, field: 'primary_contact_email' },
        { label: 'Primary Contact Phone', value: isLoading ? 'Loading...' : (settingsData?.payload?.primary_contact_phone || 'N/A'), editable: true, field: 'primary_contact_phone' },
        { label: 'Default Currency', value: isLoading ? 'Loading...' : 'USD' },
        // { label: 'Time Zone', value: isLoading ? 'Loading...' : 'GMT +1' },
        // { label: 'Region', value: isLoading ? 'Loading...' : 'Africa' },
    ];

    const financialSettings = [
        { label: 'Bank Name', value: isLoading ? 'Loading...' : (settingsData?.payload?.bank_name || 'N/A'), editable: true, field: 'bank_name' },
        { label: 'Account Name', value: isLoading ? 'Loading...' : (settingsData?.payload?.account_name || 'N/A'), editable: true, field: 'account_name' },
        { label: 'IBAN/Account No', value: isLoading ? 'Loading...' : (settingsData?.payload?.account_number || 'N/A'), editable: true, field: 'account_number' },
        { label: 'Bank Code', value: isLoading ? 'Loading...' : (settingsData?.payload?.bank_code || 'N/A'), editable: true, field: 'bank_code' },
    ];

    // const securityAccess = [
    //     { label: '', value: 'Enforce 2FA for all admins', switch: true },
    //     { label: '', value: 'Restrict login by IP address', switch: true },
    //     { label: '', value: 'Enable activity logging', switch: true },
    // ];

    // const communicationNotification = [
    //     {
    //         label: 'Investor Notifications',
    //         value: ["New Listing Posted", "Investment Confirmed", "Monthly Portfolio Update"],
    //         checkList: true
    //     },
    //     {
    //         label: 'Business Notifications',
    //         value: ["Investor Expressed Interest", "Funds Disbursted", "Document Feedback"],
    //         checkList: true
    //     },
    // ];

    const legalCompliance = [
        {
            label: 'Terms & Conditions URL',
            value: isLoading ? 'Loading...' : 'nexfundafrica.com/terms-of-service',
            editable: false
        },
        {
            label: 'Privacy Policy URL',
            value: isLoading ? 'Loading...' : 'nexfundafrica.com/privacy-policy',
            editable: false
        },
        {
            label: 'Investor NDA Template',
            value: isLoading ? 'Loading...' : (settingsData?.payload?.nda_template || 'No file uploaded'),
            type: 'file',
            field: 'nda_template',
            editable: true
        },
    ];

    const handleFileUpload = async (file: File): Promise<string> => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await uploadFile(formData).unwrap();

            if (response.is_success && response.payload) {
                toast.success('File uploaded successfully');
                return response.payload;
            }
            throw new Error(response.message || 'Upload failed');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to upload file');
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const handleSaveSettings = async (data: Record<string, any>) => {
        try {
            // Handle file upload if present
            if (data.nda_template && data.nda_template instanceof File) {
                const fileUrl = await handleFileUpload(data.nda_template);
                data.nda_template = fileUrl;
            }

            await updateSettings(data).unwrap();
            toast.success('Settings updated successfully');
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update settings');
        }
    };

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

            {isLoading ? (
                <div className='mt-6'>
                    <EditInfo
                        title='Platform Information'
                        infoItems={platformInfo}
                        isLoading={true}
                    />
                    {/* <EditInfo
                        title='Security & Access'
                        infoItems={securityAccess}
                        isLoading={true}
                    /> */}
                    <EditInfo
                        title='Financial Settings'
                        infoItems={financialSettings}
                        isLoading={true}
                    />
                    {/* <EditInfo
                        title='Communication & Notifications'
                        infoItems={communicationNotification}
                        isLoading={true}
                    /> */}
                    <EditInfo
                        title='Legal Compliance'
                        infoItems={legalCompliance}
                        isLoading={true}
                    />
                </div>
            ) : (
                <div className='mt-6'>
                    {error && (
                        <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                            <p className="text-red-600 text-sm font-medium">
                                An error occurred - unable to load data
                            </p>
                        </div>
                    )}
                    <EditInfo
                        title='Platform Information'
                        infoItems={platformInfo}
                        onSave={handleSaveSettings}
                        isLoading={updating}
                    />
                    {/* <EditInfo
                        title='Security & Access'
                        infoItems={securityAccess}
                        isLoading={updating}
                    /> */}
                    <EditInfo
                        title='Financial Settings'
                        infoItems={financialSettings}
                        onSave={handleSaveSettings}
                        isLoading={updating}
                    />
                    {/* <EditInfo
                        title='Communication & Notifications'
                        infoItems={communicationNotification}
                        isLoading={updating}
                    /> */}
                    <EditInfo
                        title='Legal Compliance'
                        infoItems={legalCompliance}
                        onSave={handleSaveSettings}
                        isLoading={updating || uploading}
                    />
                </div>
            )}

        </Box>
    )
}

export default AdminSettings;
