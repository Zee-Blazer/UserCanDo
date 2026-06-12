import { Box } from '@mui/material';
import EditInfo from './edit-info';
import { TeamManagement } from './team-management';

interface GeneralSettingsProps {
    fundingStructureData: any[];
    companyMetricsData: any[];
    useOfFundsData: any[];
    complianceData: any[];
    investmentPreferenceData: any[];
    businessInfoData?: any[];
    handleSaveListingSettings: (data: Record<string, any>) => Promise<void>;
    handleSaveBusinessInfo?: (data: Record<string, any>) => Promise<void>;
    isEditingListing: boolean;
    isUpdatingBusinessInfo?: boolean;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
    fundingStructureData,
    companyMetricsData,
    useOfFundsData,
    complianceData,
    investmentPreferenceData,
    businessInfoData = [],
    handleSaveListingSettings,
    handleSaveBusinessInfo,
    isEditingListing,
    isUpdatingBusinessInfo = false,
}) => {
    return (
        <>
            <Box sx={{
                p: 3,
                border: '1px solid #EEF1F4',
                borderRadius: '12px',
                backgroundColor: 'white',
                mb: 3
            }}>
                <TeamManagement ref_kind="business" />
            </Box>

            {businessInfoData.length > 0 && (
                <EditInfo
                    title="Business Information"
                    infoItems={businessInfoData}
                    onSave={handleSaveBusinessInfo}
                    isLoading={isUpdatingBusinessInfo}
                />
            )}

            {fundingStructureData.length > 0 && (
                <EditInfo
                    title='Funding Structure'
                    infoItems={fundingStructureData}
                    onSave={handleSaveListingSettings}
                    isLoading={isEditingListing}
                />
            )}

            {companyMetricsData.length > 0 && (
                <EditInfo
                    title='Company Metrics & Financial Information'
                    infoItems={companyMetricsData}
                    onSave={handleSaveListingSettings}
                    isLoading={isEditingListing}
                />
            )}

            {useOfFundsData.length > 0 && (
                <EditInfo
                    title='Use of Funds'
                    infoItems={useOfFundsData}
                    onSave={handleSaveListingSettings}
                    isLoading={isEditingListing}
                />
            )}

            {complianceData.length > 0 && (
                <EditInfo
                    title='Compliance & Verification'
                    infoItems={complianceData}
                    onSave={handleSaveListingSettings}
                    isLoading={isEditingListing}
                />
            )}

            {investmentPreferenceData.length > 0 && (
                <EditInfo
                    title='Investment Preferences'
                    infoItems={investmentPreferenceData}
                    onSave={handleSaveListingSettings}
                    isLoading={isEditingListing}
                />
            )}
        </>
    );
};
