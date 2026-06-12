import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUploadFileMutation } from '../../../queries/authApi';
import { fileUploadCallback, fileUploadErrorCallback } from '../../../queries/callbacks/authCallback';
import { updateEssentialDocumentsData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';

import { ActionButtons } from './finalize-application-form/ActionButtons';
import { DocumentSection } from './finalize-application-form/DocumentSection';
import { FileRequirementsNote } from './finalize-application-form/FileRequirementsNote';
import { FormHeader } from './finalize-application-form/FormHeader';
import { ProgressAlert } from './finalize-application-form/ProgressAlert';
import type {
    DocumentSection as DocumentSectionType,
    FinalizeApplicationFormProps,
    UploadedFile
} from './finalize-application-form/types';



export const FinalizeApplicationForm: React.FC<FinalizeApplicationFormProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { essentialDocumentsData: persistedData } = useBusinessSelector();
    const [uploadFile] = useUploadFileMutation();
    const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

    const [documents, setDocuments] = useState<DocumentSectionType[]>([
        { id: 'businessPlan', title: 'Business Plan or Executive Summary', required: false },
        { id: 'financialStatements', title: 'Financial Statements (last 2 years)', required: false },
        { id: 'financialProjections', title: 'Financial Projections (3-5 years)', required: false },
        { id: 'pitchDeck', title: 'Pitch Deck', required: false },
        { id: 'incorporation', title: 'Certificate of Incorporation/Registration Number (Preferred)', required: false },
        { id: 'taxId', title: 'Tax ID Document (Preferred)', required: false },
        { id: 'directorId', title: "Director's ID Document (Government-issued ID or Passport)", required: true },
    ]);

    const [optionalDocuments, setOptionalDocuments] = useState<DocumentSectionType[]>([
        { id: 'marketResearch', title: 'Market Research/Analysis', required: false },
        { id: 'productDemo', title: 'Product Demo/Screenshots', required: false },
        { id: 'customerReferences', title: 'Customer References', required: false },
        { id: 'legalAgreements', title: 'Legal Agreements (if existing investors)', required: false },
    ]);

    // Sync local state with Redux state changes
    useEffect(() => {
        if (persistedData && Object.keys(persistedData).length > 0) {
            // Map Redux field names to document IDs
            const fieldMapping: Record<string, string> = {
                'business_plan': 'businessPlan',
                'financial_statements': 'financialStatements',
                'financial_projections': 'financialProjections',
                'pitch_deck': 'pitchDeck',
                'certificate_of_incorporation': 'incorporation',
                'tax_id': 'taxId',
                'director_id': 'directorId',
                'market_analysis': 'marketResearch',
                'product_demo': 'productDemo',
                'customer_references': 'customerReferences',
                'legal_agreements': 'legalAgreements',
            };

            // Helper function to create uploaded file from URL
            const createUploadedFileFromUrl = (docId: string, fileUrl: string): UploadedFile => {
                // Extract clean file name from URL, removing any UUID prefixes and extra extensions
                let fileName = fileUrl.split('/').pop() || 'uploaded_file';

                // Remove UUID prefix if present (format: uuid_originalname)
                if (fileName.includes('_')) {
                    const parts = fileName.split('_');
                    if (parts.length > 1) {
                        // Check if first part looks like a UUID (has dashes and is long)
                        const firstPart = parts[0];
                        if (firstPart.includes('-') && firstPart.length > 20) {
                            // Remove the UUID part and join the rest
                            fileName = parts.slice(1).join('_');
                        }
                    }
                }

                // Remove duplicate extensions (e.g., .pdf.pdf.pdf)
                const extension = fileName.split('.').pop();
                const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
                const cleanNameWithoutExt = nameWithoutExt.replace(/\.(pdf|doc|docx|xlsx)$/i, '');
                fileName = `${cleanNameWithoutExt}.${extension}`;

                return {
                    id: docId,
                    name: fileName,
                    size: 0, // We don't store file size in Redux
                    type: fileName.endsWith('.pdf') ? 'application/pdf' :
                        fileName.endsWith('.doc') ? 'application/msword' :
                            fileName.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                                fileName.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                                    'application/octet-stream',
                    url: fileUrl
                };
            };

            // Update required documents with persisted URLs
            setDocuments(prev => prev.map(doc => {
                const reduxField = Object.keys(fieldMapping).find(key => fieldMapping[key] === doc.id);
                const fileUrl = reduxField ? persistedData[reduxField as keyof typeof persistedData] : '';

                if (fileUrl && fileUrl.trim() !== '') {
                    return { ...doc, uploadedFile: createUploadedFileFromUrl(doc.id, fileUrl) };
                }
                return { ...doc, uploadedFile: undefined };
            }));

            // Update optional documents with persisted URLs
            setOptionalDocuments(prev => prev.map(doc => {
                const reduxField = Object.keys(fieldMapping).find(key => fieldMapping[key] === doc.id);
                const fileUrl = reduxField ? persistedData[reduxField as keyof typeof persistedData] : '';

                if (fileUrl && fileUrl.trim() !== '') {
                    return { ...doc, uploadedFile: createUploadedFileFromUrl(doc.id, fileUrl) };
                }
                return { ...doc, uploadedFile: undefined };
            }));
        }
    }, [persistedData]);

    // Additional useEffect to handle Redux state changes after upload
    useEffect(() => {
        if (persistedData) {
            // Re-sync documents with Redux data
            const fieldMapping: Record<string, string> = {
                'business_plan': 'businessPlan',
                'financial_statements': 'financialStatements',
                'financial_projections': 'financialProjections',
                'pitch_deck': 'pitchDeck',
                'certificate_of_incorporation': 'incorporation',
                'tax_id': 'taxId',
                'director_id': 'directorId',
                'market_analysis': 'marketResearch',
                'product_demo': 'productDemo',
                'customer_references': 'customerReferences',
                'legal_agreements': 'legalAgreements',
            };

            // Update required documents
            setDocuments(prev => prev.map(doc => {
                const reduxField = Object.keys(fieldMapping).find(key => fieldMapping[key] === doc.id);
                const fileUrl = reduxField ? persistedData[reduxField as keyof typeof persistedData] : '';

                if (fileUrl && fileUrl.trim() !== '' && !doc.uploadedFile) {
                    // Extract clean file name from URL, removing any UUID prefixes and extra extensions
                    let fileName = fileUrl.split('/').pop() || 'uploaded_file';

                    // Remove UUID prefix if present (format: uuid_originalname)
                    if (fileName.includes('_')) {
                        const parts = fileName.split('_');
                        if (parts.length > 1) {
                            // Check if first part looks like a UUID (has dashes and is long)
                            const firstPart = parts[0];
                            if (firstPart.includes('-') && firstPart.length > 20) {
                                // Remove the UUID part and join the rest
                                fileName = parts.slice(1).join('_');
                            }
                        }
                    }

                    // Remove duplicate extensions (e.g., .pdf.pdf.pdf)
                    const extension = fileName.split('.').pop();
                    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
                    const cleanNameWithoutExt = nameWithoutExt.replace(/\.(pdf|doc|docx|xlsx)$/i, '');
                    fileName = `${cleanNameWithoutExt}.${extension}`;

                    const uploadedFile: UploadedFile = {
                        id: doc.id,
                        name: fileName,
                        size: 0,
                        type: fileName.endsWith('.pdf') ? 'application/pdf' :
                            fileName.endsWith('.doc') ? 'application/msword' :
                                fileName.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                                    fileName.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                                        'application/octet-stream',
                        url: fileUrl
                    };
                    return { ...doc, uploadedFile };
                }
                return doc;
            }));

            // Update optional documents
            setOptionalDocuments(prev => prev.map(doc => {
                const reduxField = Object.keys(fieldMapping).find(key => fieldMapping[key] === doc.id);
                const fileUrl = reduxField ? persistedData[reduxField as keyof typeof persistedData] : '';

                if (fileUrl && fileUrl.trim() !== '' && !doc.uploadedFile) {
                    // Extract clean file name from URL, removing any UUID prefixes and extra extensions
                    let fileName = fileUrl.split('/').pop() || 'uploaded_file';

                    // Remove UUID prefix if present (format: uuid_originalname)
                    if (fileName.includes('_')) {
                        const parts = fileName.split('_');
                        if (parts.length > 1) {
                            // Check if first part looks like a UUID (has dashes and is long)
                            const firstPart = parts[0];
                            if (firstPart.includes('-') && firstPart.length > 20) {
                                // Remove the UUID part and join the rest
                                fileName = parts.slice(1).join('_');
                            }
                        }
                    }

                    // Remove duplicate extensions (e.g., .pdf.pdf.pdf)
                    const extension = fileName.split('.').pop();
                    const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
                    const cleanNameWithoutExt = nameWithoutExt.replace(/\.(pdf|doc|docx|xlsx)$/i, '');
                    fileName = `${cleanNameWithoutExt}.${extension}`;

                    const uploadedFile: UploadedFile = {
                        id: doc.id,
                        name: fileName,
                        size: 0,
                        type: fileName.endsWith('.pdf') ? 'application/pdf' :
                            fileName.endsWith('.doc') ? 'application/msword' :
                                fileName.endsWith('.docx') ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                                    fileName.endsWith('.xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
                                        'application/octet-stream',
                        url: fileUrl
                    };
                    return { ...doc, uploadedFile };
                }
                return doc;
            }));
        }
    }, [persistedData]);

    const handleFileUpload = async (documentId: string, isOptional: boolean = false) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.xlsx';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                if (file.size > 10 * 1024 * 1024) {
                    alert('File size must be less than 10MB');
                    return;
                }

                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Only PDF, DOC, DOCX, and XLSX files are allowed');
                    return;
                }

                // Add to uploading files
                setUploadingFiles(prev => new Set([...prev, documentId]));

                try {
                    // Create FormData for upload
                    const formData = new FormData();
                    formData.append('file', file);

                    // Upload file 
                    const result = await uploadFile(formData);

                    if ('data' in result) {
                        fileUploadCallback(result.data, (res: any) => {
                            // Create uploaded file object 
                            const uploadedFile: UploadedFile = {
                                id: documentId, // Use the actual document ID instead of random
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                url: res.payload
                            };

                            // Update local state immediately
                            if (isOptional) {
                                setOptionalDocuments(prev =>
                                    prev.map(doc =>
                                        doc.id === documentId ? { ...doc, uploadedFile } : doc
                                    )
                                );
                            } else {
                                setDocuments(prev =>
                                    prev.map(doc =>
                                        doc.id === documentId ? { ...doc, uploadedFile } : doc
                                    )
                                );
                            }

                            // Update Redux to persist the change
                            updateReduxWithFileUrl(documentId, res.payload);
                        });
                    } else if ('error' in result) {
                        fileUploadErrorCallback(result.error);
                    }
                } catch (error) {
                    fileUploadErrorCallback(error);
                } finally {
                    // Remove from uploading files
                    setUploadingFiles(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(documentId);
                        return newSet;
                    });
                }
            }
        };
        input.click();
    };

    const updateReduxWithFileUrl = (documentId: string, fileUrl: string) => {
        // Map document IDs to Redux field names
        const fieldMapping: Record<string, string> = {
            'businessPlan': 'business_plan',
            'financialStatements': 'financial_statements',
            'financialProjections': 'financial_projections',
            'pitchDeck': 'pitch_deck',
            'incorporation': 'certificate_of_incorporation',
            'taxId': 'tax_id',
            'directorId': 'director_id',
            'marketResearch': 'market_analysis',
            'productDemo': 'product_demo',
            'customerReferences': 'customer_references',
            'legalAgreements': 'legal_agreements',
        };

        const reduxField = fieldMapping[documentId];
        if (reduxField) {
            // Get current Redux state to ensure we don't lose other data
            const currentReduxData = persistedData || {};
            const updateData = {
                ...currentReduxData,
                [reduxField]: fileUrl
            };
            dispatch(updateEssentialDocumentsData(updateData));
        }
    };

    const handleFileDelete = (documentId: string, isOptional: boolean = false) => {
        if (isOptional) {
            setOptionalDocuments(prev =>
                prev.map(doc =>
                    doc.id === documentId ? { ...doc, uploadedFile: undefined } : doc
                )
            );
        } else {
            setDocuments(prev =>
                prev.map(doc =>
                    doc.id === documentId ? { ...doc, uploadedFile: undefined } : doc
                )
            );
        }

        // Update Redux to remove file URL
        updateReduxWithFileUrl(documentId, '');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getRequiredDocumentsUploaded = () => {
        return documents.filter(doc => doc.uploadedFile).length;
    };

    const getTotalRequiredDocuments = () => {
        return 3; // Require at least 3 of 7 documents (including Director's ID)
    };

    const canProceedWithoutOptional = () => {
        return getRequiredDocumentsUploaded() >= getTotalRequiredDocuments();
    };

    const handleSubmit = (includeOptional: boolean = false) => {
        const allDocuments: Record<string, UploadedFile> = {};

        documents.forEach(doc => {
            if (doc.uploadedFile) {
                allDocuments[doc.id] = doc.uploadedFile;
            }
        });

        if (includeOptional) {
            optionalDocuments.forEach(doc => {
                if (doc.uploadedFile) {
                    allDocuments[doc.id] = doc.uploadedFile;
                }
            });
        }

        onNext(allDocuments);
    };


    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Finalize your application"
                subtitle="Share additional information that we can use to make a decision"
            />

            {/* Progress Alert Section */}
            <ProgressAlert
                requiredDocumentsUploaded={getRequiredDocumentsUploaded()}
                totalRequiredDocuments={getTotalRequiredDocuments()}
                canProceed={canProceedWithoutOptional()}
            />

            {/* Essential Documents Section */}
            <DocumentSection
                title="Documents (Upload at least 3 of 7 - Director's ID required, Tax ID and Incorporation/Registration Number preferred)"
                documents={documents}
                onFileUpload={handleFileUpload}
                onFileDelete={handleFileDelete}
                isOptional={false}
                uploadingFiles={uploadingFiles}
            />

            {/* Optional Documents Section */}
            <DocumentSection
                title="Additional Documents (Optional)"
                documents={optionalDocuments}
                onFileUpload={handleFileUpload}
                onFileDelete={handleFileDelete}
                isOptional={true}
                uploadingFiles={uploadingFiles}
            />

            {/* File Requirements Note */}
            <FileRequirementsNote />

            {/* Action Buttons */}
            <ActionButtons
                canProceedWithoutOptional={canProceedWithoutOptional()}
                onSubmitWithoutOptional={() => handleSubmit(false)}
                onSubmitWithOptional={() => handleSubmit(true)}
            />
        </Box>
    );
};