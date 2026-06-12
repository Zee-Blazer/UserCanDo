"use client";

import { useReUploadDocumentMutation } from '@/queries/businessApi';
import { Building2, Camera, X } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface BusinessLogoUploadProps {
    currentLogo?: string;
    onUploadComplete: (logoUrl: string) => void;
    isLoading?: boolean;
}

export const BusinessLogoUpload: React.FC<BusinessLogoUploadProps> = ({
    currentLogo,
    onUploadComplete,
    isLoading = false
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadFile, { isLoading: uploading }] = useReUploadDocumentMutation();

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

            const logoUrl: string | undefined =
                typeof response === 'string'
                    ? response
                    : response?.payload || response?.file_url || response?.url;

            if (!logoUrl) throw new Error('No URL returned from upload');

            onUploadComplete(logoUrl);
            toast.success('Company logo uploaded successfully');
        } catch (error: any) {
            toast.error(error?.data?.message || error?.message || 'Failed to upload logo');
            setPreview(null);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onUploadComplete('');
        toast.success('Company logo removed');
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const displayLogo = preview || currentLogo;
    const disabled = uploading || isLoading;

    return (
        <div className="flex items-center gap-6 p-4 bg-white border border-[#EEF1F4] rounded-lg mb-4">
            <div className="relative">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 border-2 border-gray-200 flex items-center justify-center">
                    {displayLogo ? (
                        <img
                            src={displayLogo}
                            alt="Company logo"
                            className="w-full h-full object-contain p-2"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Building2 className="w-10 h-10" />
                        </div>
                    )}
                </div>
                {displayLogo && (
                    <button
                        type="button"
                        onClick={handleRemove}
                        disabled={disabled}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        title="Remove logo"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#1A7F64] rounded-full flex items-center justify-center text-white hover:bg-[#155D4B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                    {uploading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Camera className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#1E1E1E] mb-1">
                    Company Logo
                </h3>
                <p className="text-xs text-[#6A6A6A] mb-2">
                    Upload your company logo. Max file size: 1MB
                </p>
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled}
                    className="px-3 py-1.5 text-xs font-medium text-[#1A7F64] border border-[#1A7F64] rounded-md hover:bg-[#1A7F64] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Uploading...' : displayLogo ? 'Change Logo' : 'Upload Logo'}
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
