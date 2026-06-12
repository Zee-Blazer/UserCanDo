import { setBusinessUserProfile } from '@/Redux/features/businessSlice';
import { useBusinessSelector } from '@/Redux/selectors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AvatarUpload } from './avatar-upload';
import EditInfo from './edit-info';

interface ProfileSettingsProps {
    personalInfo: any[];
    businessInfo: any[];
    kycCompliance: any[];
    bankPaymentInfo: any[];
    security: any[];
    preferences: any[];
    currentAvatar?: string;
    handleSaveSettings: (data: Record<string, any>) => Promise<void>;
    isUpdating: boolean;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
    personalInfo,
    businessInfo,
    kycCompliance,
    bankPaymentInfo,
    security,
    preferences,
    currentAvatar,
    handleSaveSettings,
    isUpdating,
}) => {
    const dispatch = useDispatch();
    const { businessUserProfile } = useBusinessSelector();
    const [localAvatar, setLocalAvatar] = useState<string | null>(currentAvatar || null);

    // Sync local avatar with prop changes
    useEffect(() => {
        setLocalAvatar(currentAvatar || null);
    }, [currentAvatar]);

    const handleAvatarUpload = async (avatarUrl: string) => {
        await handleSaveSettings({ avatar: avatarUrl });
        // Update Redux state immediately to reflect in TopBar
        if (businessUserProfile) {
            dispatch(setBusinessUserProfile({ ...businessUserProfile, avatar: avatarUrl }));
        }
    };

    const handleAvatarRemove = async () => {
        await handleSaveSettings({ avatar: '' });
        // Update Redux state immediately to reflect in TopBar
        if (businessUserProfile) {
            dispatch(setBusinessUserProfile({ ...businessUserProfile, avatar: undefined }));
        }
    };

    return (
        <>
            <AvatarUpload
                currentAvatar={localAvatar || undefined}
                onUploadComplete={handleAvatarUpload}
                onRemoveComplete={handleAvatarRemove}
                onAvatarChange={setLocalAvatar}
                isLoading={isUpdating}
            />
            <EditInfo
                title='Personal Information'
                infoItems={personalInfo}
                onSave={handleSaveSettings}
                isLoading={isUpdating}
            />
            <EditInfo
                title='Business Information'
                infoItems={businessInfo}
                onSave={handleSaveSettings}
                isLoading={isUpdating}
            />
            <EditInfo
                title='KYC & Compliance'
                btnTitle="Update"
                infoItems={kycCompliance}
            />
            <EditInfo
                title='Bank & Payment Info'
                btnTitle="Update"
                infoItems={bankPaymentInfo}
                onSave={handleSaveSettings}
                isLoading={isUpdating}
            />
            <EditInfo
                title='Security Settings'
                btnTitle="Update"
                infoItems={security}
            />
            <EditInfo
                title='Preferences'
                btnTitle="Update"
                check={true}
                infoItems={preferences}
            />
        </>
    );
};
