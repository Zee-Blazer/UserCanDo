"use client";

import { Avatar, Box, IconButton, TextField, Typography } from '@mui/material';
import { Camera } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryByCode } from '../../../constants/countries';
import { apiSlice, tagTypes } from '../../../queries';
import { useGetInvestorSettingsQuery, useRemoveAvatarMutation, useUpdateInvestorSettingsMutation } from '../../../queries/dashboardApi';
import { updateLoginAvatar } from '../../../Redux/features/authSlice';
import { RootState } from '../../../Redux/store';
import EditInfo, { InfoItem } from '../../business/settings/edit-info';


const getAvatarUrl = (avatar: string | null | undefined): string | null => {
    if (!avatar) return null;


    if (avatar.startsWith('data:') || avatar.startsWith('blob:') || avatar.startsWith('http://') || avatar.startsWith('https://')) {
        return avatar;
    }

    // Fallback: if it's just base64 without data: prefix, try to construct data URL
    if (avatar.length > 100 && !avatar.includes(' ')) {
        let mimeType = 'image/jpeg';
        if (avatar.includes('iVBORw0KGgo')) {
            mimeType = 'image/png';
        } else if (avatar.includes('<svg') || avatar.includes('PHN2Zw')) {
            mimeType = 'image/svg+xml';
        }
        return `data:${mimeType};base64,${avatar}`;
    }

    return avatar;
};

const PersonalInformationSection: React.FC = () => {
    const dispatch = useDispatch();
    const { loginData } = useSelector((state: RootState) => state.auth);
    // Query with refetch on mount to get settings, but don't show loading state
    const { data: investorSettings, refetch } = useGetInvestorSettingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
        pollingInterval: 0,
    });
    const [updateInvestorSettings, { isLoading: isUpdating }] = useUpdateInvestorSettingsMutation();
    const [removeAvatar, { isLoading: isRemovingAvatar }] = useRemoveAvatarMutation();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarRemoved, setAvatarRemoved] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [avatarInputMode, setAvatarInputMode] = useState<'upload' | 'url'>('upload');
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const normalizeContactPreferenceValue = (value: string) => {
        const normalized = value?.toLowerCase() ?? '';
        switch (normalized) {
            case 'email':
            case 'contactpreferenceenums.email':
                return 'email';
            case 'phone_number':
            case 'phone':
            case 'contactpreferenceenums.phone_number':
                return 'phone_number';
            case 'both':
            case 'both_email_phone':
            case 'contactpreferenceenums.both':
                return 'both';
            default:
                return normalized;
        }
    };

    const getContactPreferenceDisplay = (value: string) => {
        const normalized = normalizeContactPreferenceValue(value);
        switch (normalized) {
            case 'email':
                return 'Email';
            case 'phone_number':
                return 'Phone Number';
            case 'both':
                return 'Both';
            default:
                return normalized.replace(/_|-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) || '';
        }
    };

    const formatCountryDisplay = (value: string | null | undefined) => {
        if (!value) {
            return '';
        }
        const country = getCountryByCode(value);
        return country?.name || value;
    };

    const settingsPayload = React.useMemo(() => {
        if (!investorSettings) {
            return undefined;
        }

        const rawSettings = investorSettings as any;
        if (rawSettings && typeof rawSettings === 'object') {
            if (rawSettings.payload && typeof rawSettings.payload === 'object') {
                return rawSettings.payload;
            }
            return rawSettings;
        }

        return undefined;
    }, [investorSettings]);


    const rawAvatarValue = React.useMemo(() => {
        // First, check settings (most up-to-date)
        if (settingsPayload?.personal_information?.avatar) {
            return settingsPayload.personal_information.avatar;
        }
        // Fallback to login data
        if (loginData?.avatar) {
            return loginData.avatar;
        }
        return null;
    }, [settingsPayload, loginData]);


    const hasMountedRef = React.useRef(false);
    React.useEffect(() => {
        if (hasMountedRef.current || !loginData?.user_id) {
            return undefined;
        }

        // Only refetch once on initial mount if settings aren't loaded yet
        if (!investorSettings) {
            hasMountedRef.current = true;
            const timer = setTimeout(() => {
                refetch();
            }, 300);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [loginData?.user_id, investorSettings, refetch]);


    React.useEffect(() => {
        // Don't override if user has selected a new file or removed avatar
        if (avatarFile || avatarRemoved) return;

        // If user has entered a URL, preserve the URL preview - don't override it
        if (avatarUrl && avatarUrl.trim() !== '') {
            if (!avatarPreview || (avatarPreview !== avatarUrl && !avatarPreview.startsWith('blob:'))) {

                return;
            }
            return;
        }

        // Clean up previous blob URL if it exists
        if (avatarPreview && avatarPreview.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }

        // Set preview from rawAvatarValue when no URL is being entered
        if (rawAvatarValue) {
            const processedAvatarUrl = getAvatarUrl(rawAvatarValue);
            setAvatarPreview(processedAvatarUrl);
        } else {
            setAvatarPreview(null);
        }

        // Cleanup function
        return () => {
            if (avatarPreview && avatarPreview.startsWith('blob:') && !avatarFile) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [rawAvatarValue, avatarFile, avatarRemoved]);

    // Cleanup avatar preview URL on unmount
    React.useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Avatar image must be less than 5MB');
                return;
            }
            setAvatarFile(file);
            setAvatarUrl('');
            setAvatarRemoved(false);
            // Create preview
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleAvatarUrlChange = (url: string) => {
        setAvatarUrl(url);
        if (url.trim()) {
            // Validate URL format
            try {
                const urlObj = new URL(url);
                // Check if it's a valid image URL
                if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {

                    setAvatarPreview(url);
                    setAvatarFile(null);
                    setAvatarRemoved(false);
                } else {
                    alert('Please enter a valid HTTP or HTTPS URL');
                    setAvatarPreview(null);
                }
            } catch (error) {
                // If URL parsing fails, it might be a data URL or a valid URL that just failed parsing
                if (url.startsWith('data:image/')) {
                    // Set preview immediately for data URLs
                    setAvatarPreview(url);
                    setAvatarFile(null);
                    setAvatarRemoved(false);
                } else {

                    setAvatarPreview(url);
                    setAvatarFile(null);
                    setAvatarRemoved(false);
                    // Don't show alert immediately - let user finish typing
                }
            }
        } else {

            if (!url || url.trim() === '') {
                setAvatarPreview(null);
            }
        }
    };

    const validateImageUrl = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            // Skip validation for data URLs - they're always valid
            if (url.startsWith('data:image/')) {
                resolve(true);
                return;
            }


            const img = new Image();
            let resolved = false;

            const resolveOnce = (value: boolean) => {
                if (!resolved) {
                    resolved = true;
                    resolve(value);
                }
            };

            img.onload = () => resolveOnce(true);
            img.onerror = () => {

                resolveOnce(true);
            };

            img.src = url;


            setTimeout(() => {
                resolveOnce(true);
            }, 3000);
        });
    };

    const handleRemoveAvatar = async () => {
        try {
            // Immediately call DELETE endpoint to remove avatar
            await removeAvatar().unwrap();

            // Clean up blob URL if it exists
            if (avatarPreview && avatarPreview.startsWith('blob:')) {
                URL.revokeObjectURL(avatarPreview);
            }

            // Reset all avatar-related states
            setAvatarFile(null);
            setAvatarPreview(null);
            setAvatarUrl('');
            setAvatarRemoved(true);

            if (avatarInputRef.current) {
                avatarInputRef.current.value = '';
            }

            // Update login data immediately
            dispatch(updateLoginAvatar(null));

            // Refetch settings to get updated data
            await refetch();

            // Dispatch event to notify top-bar
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('avatarUpdated'));
            }
        } catch (error) {
            console.error('Failed to remove avatar:', error);
            alert('Failed to remove avatar. Please try again.');
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleSaveSettings = async (data: Record<string, any>) => {
        try {
            const payload: any = {};

            const personalFields = ['phone_number', 'contact_preference', 'country'];
            const hasPersonalChanges = personalFields.some(field => data[field] !== undefined);

            // Handle avatar upload, URL, or removal
            if (avatarFile) {
                // User selected a new avatar file
                try {
                    const avatarBase64 = await convertFileToBase64(avatarFile);
                    if (!payload.personal_information) {
                        payload.personal_information = {};
                    }
                    // Only include avatar if it's not empty
                    if (avatarBase64 && avatarBase64.trim() !== '') {
                        payload.personal_information.avatar = avatarBase64;
                    }
                } catch (error) {
                    throw new Error('Failed to process avatar image. Please try again.');
                }
            } else if (avatarUrl && avatarUrl.trim() !== '') {

                const trimmedUrl = avatarUrl.trim();
                try {
                    // Basic URL format validation
                    if (trimmedUrl.startsWith('data:image/')) {
                        // Data URL - always valid format
                    } else {
                        // Try to parse as URL to validate format
                        new URL(trimmedUrl);
                        // If it's not http/https, reject
                        if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
                            throw new Error('URL must start with http:// or https://');
                        }
                    }
                } catch (error: any) {
                    if (error.message.includes('Invalid URL')) {
                        throw new Error('Please enter a valid URL format (e.g., https://example.com/image.jpg)');
                    }
                    throw error;
                }


                try {
                    await validateImageUrl(trimmedUrl);
                } catch (error) {
                    // Silently continue - backend will validate
                }

                if (!payload.personal_information) {
                    payload.personal_information = {};
                }
                // Send URL directly (backend accepts URLs and will validate)
                payload.personal_information.avatar = trimmedUrl;
            }


            // Include personal information changes
            if (hasPersonalChanges || avatarFile || avatarUrl) {
                if (!payload.personal_information) {
                    payload.personal_information = {};
                }

                personalFields.forEach(field => {
                    if (data[field] !== undefined) {
                        payload.personal_information[field] = data[field];
                    }
                });
            }

            // Handle password update
            if (data.password !== undefined && data.password !== '') {
                payload.password = data.password;
            }

            // Only send request if there are changes
            if (Object.keys(payload).length > 0 && (Object.keys(payload.personal_information || {}).length > 0 || payload.password)) {
                await updateInvestorSettings(payload).unwrap();


                dispatch(apiSlice.util.invalidateTags([tagTypes.investorSettings]));

                // Dispatch custom event to notify top-bar to refetch immediately
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('avatarUpdated'));
                }

                // Clean up blob URL if preview is using one (from file selection)
                if (avatarPreview && avatarPreview.startsWith('blob:')) {
                    URL.revokeObjectURL(avatarPreview);
                }

                // Determine what avatar was saved
                let savedAvatarValue: string | null = null;
                if (avatarFile) {
                    // File was uploaded - convert to base64 for preview
                    savedAvatarValue = await convertFileToBase64(avatarFile);
                } else if (avatarUrl && avatarUrl.trim() !== '') {
                    // URL was entered - use it directly
                    savedAvatarValue = avatarUrl.trim();
                }


                setAvatarFile(null);
                setAvatarUrl('');

                // Refetch settings to get updated avatar from server
                const updatedSettings = await refetch();


                const updatedPayload = (updatedSettings.data as any)?.payload || (updatedSettings.data as any);
                const serverAvatar = updatedPayload?.personal_information?.avatar;

                // Use server response if available, otherwise use what we saved
                const finalAvatar = serverAvatar && serverAvatar.trim() !== '' ? serverAvatar : savedAvatarValue;

                // Update login data avatar to keep it synchronized
                if (finalAvatar && finalAvatar.trim() !== '') {
                    dispatch(updateLoginAvatar(finalAvatar));
                    const processedAvatarUrl = getAvatarUrl(finalAvatar);
                    // Force update preview with saved avatar
                    setAvatarPreview(processedAvatarUrl);
                } else {
                    // If avatar was removed, clear it from login data too
                    dispatch(updateLoginAvatar(null));
                    setAvatarPreview(null);
                }
            }
        } catch (error) {
            throw error;
        }
    };


    const personalInfo = React.useMemo(() => {
        // Use settings data if available, otherwise fallback to login data or empty
        const firstName = settingsPayload?.personal_information?.first_name || loginData?.first_name || '';
        const lastName = settingsPayload?.personal_information?.last_name || loginData?.last_name || '';
        const email = settingsPayload?.personal_information?.email || loginData?.email || '';
        const phoneNumber = settingsPayload?.personal_information?.phone_number || '';
        const country = settingsPayload?.personal_information?.country || '';
        const investorType = (settingsPayload?.personal_information as any)?.investor_type || '';
        const contactPreference = settingsPayload?.personal_information?.contact_preference || '';

        // Determine avatar display value - prioritize preview (from save), then raw value
        const avatarDisplayValue = avatarPreview || rawAvatarValue || '';
        const hasAvatar = !!(avatarPreview || rawAvatarValue);

        return [
            {
                label: 'Profile Picture',
                value: avatarDisplayValue,
                displayValue: hasAvatar ? 'Image uploaded' : 'No image',
                editable: true,
                field: 'avatar',
                type: 'avatar',
                custom: true
            },
            {
                label: 'First Name',
                value: firstName
            },
            {
                label: 'Last Name',
                value: lastName
            },
            {
                label: 'Email',
                value: email
            },
            {
                label: 'Phone Number',
                value: phoneNumber,
                displayValue: phoneNumber,
                editable: true,
                field: 'phone_number',
                placeholder: '',
                type: 'tel'
            },
            {
                label: 'Country',
                value: country,
                displayValue: country ? formatCountryDisplay(country) : '',
                editable: true,
                field: 'country',
                placeholder: '',
                custom: true
            },
            {
                label: 'Investor Type',
                value: investorType,
                displayValue: (() => {
                    if (investorType) {
                        // Map the investor_type value to display format
                        if (investorType.toLowerCase().includes('firm') || investorType.toLowerCase().includes('investment')) {
                            return 'Investment Firm';
                        }
                        return 'Individual';
                    }
                    return 'Individual';
                })()
            },
            {
                label: 'Contact Preference',
                value: normalizeContactPreferenceValue(contactPreference),
                displayValue: getContactPreferenceDisplay(contactPreference),
                editable: true,
                field: 'contact_preference',
                select: true,
                placeholder: 'Select contact preference',
                options: [
                    { label: 'Email', value: 'email' },
                    { label: 'Phone Number', value: 'phone_number' },
                    { label: 'Both', value: 'both' }
                ]
            },
        ];
    }, [settingsPayload, loginData, avatarPreview, rawAvatarValue]);

    // Get user initials for fallback display
    const getUserInitials = () => {
        const firstName = settingsPayload?.personal_information?.first_name || loginData?.first_name || '';
        const lastName = settingsPayload?.personal_information?.last_name || loginData?.last_name || '';
        if (firstName && lastName) {
            return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        }
        return 'U';
    };

    // Custom render function for avatar field
    const renderAvatarField = (item: InfoItem, idx: number, formValues: { [idx: number]: string | File }, handleInputChange: (idx: number, value: string | File, item: InfoItem) => void) => {
        // Determine which avatar source to use for display - prioritize preview (from URL/file), then raw value
        const displayAvatar = avatarPreview || (rawAvatarValue ? getAvatarUrl(rawAvatarValue) : null);
        const hasAvatar = !!displayAvatar;
        const initials = getUserInitials();

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                        src={displayAvatar || undefined}
                        sx={{
                            width: 100,
                            height: 100,
                            border: '2px solid #e0e0e0',
                            cursor: avatarInputMode === 'upload' ? 'pointer' : 'default',
                            bgcolor: hasAvatar ? 'transparent' : '#043A66',
                            color: hasAvatar ? 'inherit' : 'white',
                            fontSize: '2rem',
                            fontWeight: 600,
                            '&:hover': avatarInputMode === 'upload' ? {
                                opacity: 0.9,
                            } : {},
                        }}
                        onClick={() => {
                            if (avatarInputMode === 'upload') {
                                avatarInputRef.current?.click();
                            }
                        }}
                    >
                        {hasAvatar ? null : (
                            initials
                        )}
                    </Avatar>
                    {hasAvatar && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveAvatar();
                            }}
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                bgcolor: 'error.main',
                                color: 'white',
                                width: 28,
                                height: 28,
                                '&:hover': {
                                    bgcolor: 'error.dark',
                                },
                            }}
                            size="small"
                        >
                            ×
                        </IconButton>
                    )}
                    <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                    {/* Camera button at bottom-right of avatar */}
                    {avatarInputMode === 'upload' && (
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                avatarInputRef.current?.click();
                            }}
                            sx={{
                                position: 'absolute',
                                bottom: -4,
                                right: -4,
                                bgcolor: '#22c55e',
                                color: 'white',
                                width: 36,
                                height: 36,
                                border: '3px solid white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                '&:hover': {
                                    bgcolor: '#16a34a',
                                },
                            }}
                            size="small"
                        >
                            <Camera size={18} />
                        </IconButton>
                    )}
                </Box>

                {/* Toggle between Upload and URL */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography
                        onClick={() => setAvatarInputMode('upload')}
                        sx={{
                            cursor: 'pointer',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: avatarInputMode === 'upload' ? 'primary.main' : 'transparent',
                            color: avatarInputMode === 'upload' ? 'white' : 'text.secondary',
                            fontSize: '0.875rem',
                            fontWeight: avatarInputMode === 'upload' ? 600 : 400,
                            '&:hover': {
                                bgcolor: avatarInputMode === 'upload' ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        Upload
                    </Typography>
                    <Typography
                        onClick={() => setAvatarInputMode('url')}
                        sx={{
                            cursor: 'pointer',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: avatarInputMode === 'url' ? 'primary.main' : 'transparent',
                            color: avatarInputMode === 'url' ? 'white' : 'text.secondary',
                            fontSize: '0.875rem',
                            fontWeight: avatarInputMode === 'url' ? 600 : 400,
                            '&:hover': {
                                bgcolor: avatarInputMode === 'url' ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        URL
                    </Typography>
                </Box>

                {avatarInputMode === 'upload' ? (
                    <Box sx={{ textAlign: 'center', width: '100%' }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontSize: '0.75rem',
                                display: 'block',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: 'primary.main',
                                }
                            }}
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            Click avatar or camera icon to upload (Max 5MB, JPG/PNG)
                        </Typography>
                        {avatarFile && (
                            <Typography variant="caption" color="primary" sx={{ fontSize: '0.75rem', display: 'block', mt: 0.5 }}>
                                {avatarFile.name}
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', maxWidth: '400px' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', mb: 0.5 }}>
                            Enter a valid image URL (HTTP/HTTPS or data URL)
                        </Typography>
                        <TextField
                            type="url"
                            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                            value={avatarUrl}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAvatarUrlChange(e.target.value)}
                            fullWidth
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                )}
            </Box>
        );
    };

    // Only show loading when actually saving, not during data fetching
    // This allows the UI to display even if data is still loading
    return (
        <EditInfo
            title='Personal Information'
            infoItems={personalInfo}
            onSave={handleSaveSettings}
            isLoading={isUpdating || isRemovingAvatar}
            renderCustomField={renderAvatarField}
        />
    );
};

export default PersonalInformationSection;