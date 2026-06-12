"use client";

import { useReUploadDocumentMutation } from '@/queries/businessApi';
import { Box, Button, CircularProgress } from '@mui/material';
import { Camera, User } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import FormInput from '../../General/form/formInput';
import FormTextArea from '../../General/form/textArea';

interface TeamFormProps {
    formData: {
        first_name: string;
        last_name: string;
        role: string;
        description: string;
        avatar: string;
    };
    isEditing: boolean;
    isLoading: boolean;
    onFieldChange: (field: string, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export const TeamForm: React.FC<TeamFormProps> = ({
    formData,
    isEditing,
    isLoading,
    onFieldChange,
    onSave,
    onCancel
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(formData.avatar || null);
    const [uploadFile, { isLoading: uploading }] = useReUploadDocumentMutation();

    const isValid = formData.first_name.trim() &&
        formData.last_name.trim() &&
        formData.role.trim() &&
        formData.description.trim();

    const validators = [
        {
            check: (file: File) => file.type.startsWith('image/'),
            message: 'Please select a valid image file',
        },
        {
            check: (file: File) => file.size <= 5 * 1024 * 1024,
            message: 'Image size should not exceed 5MB',
        },
    ];

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const failed = validators.find((v) => !v.check(file));
        if (failed) {
            toast.error(failed.message);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('file', file);

            const response = await (uploadFile as any)(formDataUpload).unwrap();
            const avatarUrl: string | undefined =
                typeof response === 'string'
                    ? response
                    : response?.payload || response?.file_url || response?.url;

            if (!avatarUrl) throw new Error('No URL returned from upload');

            onFieldChange('avatar', avatarUrl);
            toast.success('Avatar uploaded successfully');
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Failed to upload avatar');
            setAvatarPreview(formData.avatar || null);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const getInitials = () => {
        const first = formData.first_name.trim()[0] || '';
        const last = formData.last_name.trim()[0] || '';
        return (first + last).toUpperCase() || 'TM';
    };

    return (
        <Box sx={{
            p: 3,
            border: '1px solid #EEF1F4',
            borderRadius: '12px',
            backgroundColor: 'white',
            mb: 3,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            {/* Avatar Upload Section */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ position: 'relative' }}>
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: '#F0F7FF',
                            border: '2px solid #EEF1F4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                                borderColor: '#043A66',
                            }
                        }}
                        onClick={handleAvatarClick}
                    >
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Team member avatar"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <User size={28} color="#043A66" />
                                <Box sx={{
                                    fontSize: '0.65rem',
                                    fontWeight: 600,
                                    color: '#043A66',
                                    mt: 0.5
                                }}>
                                    {getInitials()}
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: -4,
                            right: -4,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: '#33CC33',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '2px solid white',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s',
                            '&:hover': {
                                backgroundColor: '#2AB82A',
                                transform: 'scale(1.1)',
                            }
                        }}
                        onClick={handleAvatarClick}
                    >
                        {uploading ? (
                            <CircularProgress size={12} sx={{ color: 'white' }} />
                        ) : (
                            <Camera size={14} color="white" />
                        )}
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E1E1E', mb: 0.5 }}>
                        Team Member Photo
                    </Box>
                    <Box sx={{ fontSize: '0.75rem', color: '#6A6A6A', mb: 1 }}>
                        Upload a professional photo (Max 5MB)
                    </Box>
                    <Button
                        onClick={handleAvatarClick}
                        disabled={uploading || isLoading}
                        sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            px: 2,
                            py: 0.5,
                            color: '#043A66',
                            borderColor: '#043A66',
                            '&:hover': {
                                borderColor: '#043A66',
                                backgroundColor: '#F0F7FF',
                            }
                        }}
                        variant="outlined"
                        size="small"
                    >
                        {uploading ? 'Uploading...' : avatarPreview ? 'Change Photo' : 'Upload Photo'}
                    </Button>
                </Box>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Box sx={{ flex: 1 }}>
                    <FormInput
                        label="First Name"
                        value={formData.first_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onFieldChange('first_name', e.target.value)
                        }
                        required
                        placeholder="Enter first name"
                        bgColor="white"
                        borderColor="#EEF1F4"
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FormInput
                        label="Last Name"
                        value={formData.last_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onFieldChange('last_name', e.target.value)
                        }
                        required
                        placeholder="Enter last name"
                        bgColor="white"
                        borderColor="#EEF1F4"
                    />
                </Box>
            </Box>

            <Box sx={{ mb: 2.5 }}>
                <FormInput
                    label="Role"
                    value={formData.role}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onFieldChange('role', e.target.value)
                    }
                    required
                    placeholder="e.g. CEO, CTO, Developer"
                    bgColor="white"
                    borderColor="#EEF1F4"
                />
            </Box>

            <Box sx={{ mb: 2.5 }}>
                <FormTextArea
                    label="Brief Description"
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onFieldChange('description', e.target.value)
                    }
                    required
                    placeholder="Brief description of responsibilities"
                    bgColor="white"
                    borderColor="#EEF1F4"
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={!isValid || isLoading}
                    sx={{
                        backgroundColor: '#33CC33',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': { backgroundColor: '#2AB82A' },
                        '&:disabled': { backgroundColor: '#E0E0E0', color: '#9E9E9E' }
                    }}
                >
                    {isLoading ? (
                        <CircularProgress size={20} sx={{ color: 'white' }} />
                    ) : (
                        isEditing ? 'Update Member' : 'Add Member'
                    )}
                </Button>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isLoading}
                    sx={{
                        borderColor: '#E0E0E0',
                        color: '#6A6A6A',
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': { borderColor: '#6A6A6A', backgroundColor: '#F5F5F5' }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
