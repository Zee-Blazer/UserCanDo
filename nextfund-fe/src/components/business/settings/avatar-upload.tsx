"use client";

import { useReUploadDocumentMutation } from '@/queries/businessApi';
import { useRemoveAvatarMutation } from '@/queries/dashboardApi';
import { Camera, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface AvatarUploadProps {
    currentAvatar?: string;
    onUploadComplete: (avatarUrl: string) => Promise<void>;
    onRemoveComplete?: () => Promise<void>;
    onAvatarChange?: (avatarUrl: string | null) => void;
    isLoading?: boolean;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
    currentAvatar,
    onUploadComplete,
    onRemoveComplete,
    onAvatarChange,
    isLoading = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadFile, { isLoading: uploading }] = useReUploadDocumentMutation();
    const [removeAvatar, { isLoading: removing }] = useRemoveAvatarMutation();

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

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const failed = validators.find((v) => !v.check(file));
        if (failed) {
            toast.error(failed.message);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        handleUpload(file);
    };

    const handleUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await (uploadFile as any)(formData).unwrap();

            const avatarUrl: string | undefined =
                typeof response === 'string'
                    ? response
                    : response?.payload || response?.file_url || response?.url;

            if (!avatarUrl) throw new Error('No URL returned from upload');

            await onUploadComplete(avatarUrl);
            toast.success('Avatar uploaded successfully');
            onAvatarChange?.(avatarUrl);
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Failed to upload avatar');
            setPreview(null);
        }
    };

    const handleRemove = async () => {
        try {
            await removeAvatar().unwrap();
            setPreview(null);
            if (onRemoveComplete) {
                await onRemoveComplete();
            }
            toast.success('Avatar removed successfully');
            onAvatarChange?.(null);
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Failed to remove avatar');
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const displayAvatar = preview || currentAvatar;
    const disabled = uploading || isLoading || removing;

    return (
        <div className="flex items-center gap-6 p-6 bg-white border border-[#EEF1F4] rounded-lg">
            <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    {displayAvatar ? (
                        <img
                            src={displayAvatar}
                            alt="Profile avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg
                                className="w-12 h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    )}
                </div>
                {displayAvatar && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={disabled}
                        className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        title="Remove avatar"
                    >
                        {removing ? (
                            <div className="w-3 h-3 border-2 cursor-pointer border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <X className="w-3.5 h-3.5" />
                        )}
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-[#1A7F64] rounded-full flex items-center justify-center text-white hover:bg-[#155D4B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    {uploading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Camera className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="flex-1">
                <h3 className="text-base font-semibold text-[#1E1E1E] mb-1">
                    Profile Photo
                </h3>
                <p className="text-sm text-[#6A6A6A] mb-3">
                    Upload a professional photo. Max file size: 1MB
                </p>
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled}
                    className="px-4 py-2 text-sm font-medium text-[#1A7F64] border border-[#1A7F64] rounded-lg hover:bg-[#1A7F64] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : 'Change Photo'}
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
};
