"use client";

import React, { useState, useRef, useCallback } from "react";
import { Typography } from "@material-tailwind/react";
import { FormSelect } from "@/components/General/form";
import { Upload, FileText, X, Trash2, RotateCw, CheckCircle } from "lucide-react";
import CircularProgress from "./circularProgress";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from '@/Redux/selectors';

interface Props {
    currentStatus?: string;
}

const DocumentOrderStatus = ({ currentStatus }: Props) => {
    const [selectedDocumentType, setSelectedDocumentType] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const { handleOrderFileUpload, isOrderFileUploading } = useDash();
    const { activeOrderStatus } = useDashboardSelector();

    // Define allowed file types for each document type
    const getFileTypeConfig = (documentType: string) => {
        const configs = {
            PNG: {
                accept: '.png',
                mimeTypes: ['image/png'],
                displayName: 'PNG images'
            },
            JPG: {
                accept: '.jpg,.jpeg',
                mimeTypes: [
                    'image/jpg', 
                    'image/jpeg', 
                    'image/pjpeg',
                    'image/jp2',
                    'image/jpx'
                ],
                displayName: 'JPG/JPEG images'
            },
            JPEG: {
                accept: '.jpg,.jpeg',
                mimeTypes: [
                    'image/jpg', 
                    'image/jpeg', 
                    'image/pjpeg',
                    'image/jp2',
                    'image/jpx'
                ],
                displayName: 'JPG/JPEG images'
            },
            PDF: {
                accept: '.pdf',
                mimeTypes: ['application/pdf'],
                displayName: 'PDF documents'
            },
            DOC: {
                accept: '.doc,.docx',
                mimeTypes: [
                    'application/msword', 
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-word',
                    'application/doc',
                    'application/ms-doc',
                    'application/vnd.ms-office',
                    'application/x-doc'
                ],
                displayName: 'Word documents'
            }
        };
        return configs[documentType as keyof typeof configs];
    };

    const validateFileType = (file: File) => {
        // Quick check if document type is selected
        if (!selectedDocumentType?.trim()) {
            setErrorMessage("Please select a document type first");
            return false;
        }

        const config = getFileTypeConfig(selectedDocumentType);
        if (!config) {
            setErrorMessage("Invalid document type selected");
            return false;
        }

        // Get file extension for additional validation
        const fileExtension = file.name.toLowerCase().split('.').pop();
        if (!fileExtension) {
            setErrorMessage("Please select a file with a valid extension");
            return false;
        }

        // Check both MIME type and file extension for more robust validation
        const mimeTypeMatch = config.mimeTypes.includes(file.type);
        
        // For extension matching, create a more robust check
        const allowedExtensions = config.accept.toLowerCase().replace(/\./g, '').split(',');
        const extensionMatch = allowedExtensions.includes(fileExtension);

        // More lenient validation - if either MIME type OR extension matches, allow it
        // Some browsers may not provide correct MIME types
        if (!mimeTypeMatch && !extensionMatch) {
            setErrorMessage(`Please upload only ${config.displayName}. Selected file: ${file.name} (${file.type || 'unknown type'})`);
            return false;
        }

        // Clear error message if validation passes
        setErrorMessage("");
        return true;
    };

    const handleDocumentTypeChange = (e: any) => {
        const newType = e.target.value;
        
        // Clear any existing error messages when document type changes
        setErrorMessage("");
        
        // If there are uploaded files and the type is changing, ask for confirmation
        if (uploadedFiles.length > 0 && selectedDocumentType !== newType) {
            const confirmed = window.confirm(
                "Changing document type will clear all uploaded files. Do you want to continue?"
            );
            if (confirmed) {
                setUploadedFiles([]);
                setUploadingFiles(new Set());
                setSelectedDocumentType(newType);
            }
            // If user cancels, don't change the document type
            return;
        }
        
        // Set the document type immediately if there are no uploaded files
        setSelectedDocumentType(newType);
    };

    const handleFileUpload = useCallback(async (file: File) => {
        if (!activeOrderStatus?.id) {
            setErrorMessage("No order selected");
            return;
        }

        // Validate file type based on selected document type
        if (!validateFileType(file)) {
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            setErrorMessage("File size must be less than 10MB");
            return;
        }

        const fileId = `${file.name}-${Date.now()}`;
        const newFile = {
            id: fileId,
            name: file.name,
            status: "uploading",
            size: formatFileSize(file.size),
            progress: 0,
            icon: FileText,
            color: "#003366",
            actionIcon: X,
        };

        setUploadedFiles(prev => [...prev, newFile]);
        setUploadingFiles(prev => {
            const newSet = new Set(prev);
            newSet.add(fileId);
            return newSet;
        });

        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
                setUploadedFiles(prev => 
                    prev.map(f => f.id === fileId ? { ...f, progress } : f)
                );
            }
        }, 200);

        try {
            await handleOrderFileUpload(
                activeOrderStatus.id.toString(),
                file,
                (success) => {
                    clearInterval(progressInterval);
                    setUploadingFiles(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(fileId);
                        return newSet;
                    });

                    if (success) {
                        setUploadedFiles(prev => 
                            prev.map(f => f.id === fileId ? {
                                ...f,
                                status: "uploaded",
                                progress: 100,
                                color: "#027A48",
                                actionIcon: Trash2
                            } : f)
                        );
                    } else {
                        setUploadedFiles(prev => 
                            prev.map(f => f.id === fileId ? {
                                ...f,
                                status: "failed",
                                progress: 0,
                                color: "#FF3729",
                                actionIcon: RotateCw
                            } : f)
                        );
                    }
                }
            );
        } catch (error) {
            clearInterval(progressInterval);
            setUploadingFiles(prev => {
                const newSet = new Set(prev);
                newSet.delete(fileId);
                return newSet;
            });
            
            setUploadedFiles(prev => 
                prev.map(f => f.id === fileId ? {
                    ...f,
                    status: "failed",
                    progress: 0,
                    color: "#FF3729",
                    actionIcon: RotateCw
                } : f)
            );
            console.error("File upload error:", error);
        }
    }, [activeOrderStatus?.id, handleOrderFileUpload, selectedDocumentType]);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        
        const files = Array.from(e.dataTransfer.files);
        files.forEach(handleFileUpload);
    }, [handleFileUpload]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        files.forEach(handleFileUpload);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [handleFileUpload]);

    const handleFileAction = useCallback((file: any) => {
        if (file.status === "failed") {
            // Remove failed file from list - user can try uploading again manually
            setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
        } else if (file.status === "uploaded") {
            setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
        } else if (file.status === "uploading") {
            setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
            setUploadingFiles(prev => {
                const newSet = new Set(prev);
                newSet.delete(file.id);
                return newSet;
            });
        }
    }, []);

    return (
        <div>
            <Typography className="uppercase text-base font-inter font-bold mb-4">
                Status
            </Typography>

            <div>

                <FormSelect
                    label="Document type"
                    name="document_type"
                    options={["PNG", "JPG", "JPEG", "PDF", "DOC"]}
                    placeholder="Select document type"
                    value={selectedDocumentType}
                    onSelect={handleDocumentTypeChange}
                    required
                />

                {errorMessage && (
                    <div className="mt-2 mb-2">
                        <Typography className="text-red-500 text-sm font-inter">
                            {errorMessage}
                        </Typography>
                    </div>
                )}

                <div 
                    className={`border-2 ${
                        !selectedDocumentType?.trim()
                            ? 'border-gray-300 bg-gray-100 cursor-not-allowed' 
                            : isDragOver 
                                ? 'border-[#003366] bg-blue-50' 
                                : 'border-[#DEDFE0] cursor-pointer'
                    } rounded-lg h-[225px] border-dashed mt-4 mb-6 flex items-center justify-center transition-colors`}
                    onDragOver={selectedDocumentType?.trim() ? handleDragOver : undefined}
                    onDragLeave={selectedDocumentType?.trim() ? handleDragLeave : undefined}
                    onDrop={selectedDocumentType?.trim() ? handleDrop : undefined}
                    onClick={selectedDocumentType?.trim() ? () => fileInputRef.current?.click() : undefined}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                        accept={selectedDocumentType?.trim() ? getFileTypeConfig(selectedDocumentType)?.accept || '' : ''}
                        disabled={!selectedDocumentType?.trim()}
                    />
                    <div>
                        <div className={`mx-auto border p-1 h-10 w-10 rounded-full mb-2 ${!selectedDocumentType?.trim() ? 'opacity-50' : ''}`}>
                            <Upload className={`mx-auto ${!selectedDocumentType?.trim() ? 'text-gray-400' : 'text-[#7B8086]'}`} />
                        </div>
                        {!selectedDocumentType?.trim() ? (
                            <div className="text-center">
                                <Typography className="text-center text-gray-400 text-base font-inter">
                                    Please select a document type first
                                </Typography>
                                <Typography className="text-center text-gray-300 text-sm font-inter mt-1">
                                    Choose a document type above to enable file upload
                                </Typography>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Typography className="text-center text-[#1B1E21] text-base font-inter">
                                    {isDragOver ? 'Drop files here' : `Drop your ${getFileTypeConfig(selectedDocumentType)?.displayName || 'files'} here, or`} 
                                    {!isDragOver && <span className="text-[#003366] font-medium ml-1.5">click to upload</span>}
                                </Typography>
                                <Typography className="text-center text-[#7B8086] text-sm font-inter mt-1">
                                    Only {getFileTypeConfig(selectedDocumentType)?.displayName || 'selected file type'} allowed
                                </Typography>
                            </div>
                        )}
                        {isOrderFileUploading && (
                            <Typography className="text-center text-[#7B8086] text-sm font-inter mt-2">
                                Uploading...
                            </Typography>
                        )}
                    </div>
                </div>

                {uploadedFiles.map((item) => {
                    const ActionIcon = item.actionIcon;
                    return (
                        <div
                            key={item.id}
                            className="py-3 flex items-center justify-between border-b border-b-[#DEDFE0]"
                        >
                            <div className="flex items-center">
                                <CircularProgress
                                percentage={item.progress}
                                size={40}
                                color={item.color}
                                icon={item.icon}
                                iconColor={item.color}
                                strokeWidth={3}
                                />

                                <div className="ml-2">
                                    <Typography className="text-sm font-inter font-bold text-[#0F1011]">
                                        {item.name}
                                    </Typography>
                                    <Typography className="text-[#4E5054] text-xs font-inter">
                                        {item.size} - {item.progress}% {item.status}
                                    </Typography>
                                </div>
                            </div>

                            <ActionIcon 
                                className="w-8 p-1 cursor-pointer text-[#A4A6A7] hover:text-[#7B8086]" 
                                onClick={() => handleFileAction(item)}
                            />
                        </div>
                    );
                })}


            </div>
        </div>
    )
}

export default DocumentOrderStatus
