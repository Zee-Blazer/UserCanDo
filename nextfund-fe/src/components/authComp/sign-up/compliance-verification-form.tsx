import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useUploadFileMutation } from '../../../queries/authApi';
import { fileUploadCallback, fileUploadErrorCallback } from '../../../queries/callbacks/authCallback';
import { updateComplianceVerificationData } from '../../../Redux/features/businessSlice';
import { useBusinessSelector } from '../../../Redux/selectors';
import { ApplicationReviewModal } from './ApplicationReviewModal';

import { ActionButtons } from './compliance-verification-form/ActionButtons';
import { ComplianceChecklistSection } from './compliance-verification-form/ComplianceChecklistSection';
import { DeclarationSection } from './compliance-verification-form/DeclarationSection';
import { DocumentUploadSection } from './compliance-verification-form/DocumentUploadSection';
import { FormHeader } from './compliance-verification-form/FormHeader';
import { RegulatoryInformationSection } from './compliance-verification-form/RegulatoryInformationSection';
import type { ComplianceData, ComplianceVerificationFormProps } from './compliance-verification-form/types';

export type { ComplianceData, ComplianceVerificationFormProps } from './compliance-verification-form/types';

export const ComplianceVerificationForm: React.FC<ComplianceVerificationFormProps> = ({ onBack, onNext }) => {
    const dispatch = useDispatch();
    const { complianceVerificationData: persistedData } = useBusinessSelector();
    const [uploadFile] = useUploadFileMutation();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
    const hasInitialized = useRef(false);

    const [complianceFormData, setComplianceFormData] = useState<ComplianceData>({
        regulatoryInfo: {
            interestStructure: '',
            registrationNumber: '',
            taxIdNumber: '',
            registeredAddress: '',
        },
        complianceChecklist: {
            legallyIncorporated: false,
            clearEquityAgreements: false,
            noPendingDisputes: false,
            authorizedToRaise: false,
            securitiesCompliance: false,
        },
        documents: {
            certificateOfIncorporation: null,
            founderAgreements: null,
            legalComplianceCertificate: null,
        },
        declarations: {
            accurateInfo: false,
            authorityToRaise: false,
            termsAgreement: false,
        },
    });

    // Load persisted data on component 
    useEffect(() => {
        if (!hasInitialized.current) {
            if (persistedData && Object.keys(persistedData).length > 0) {
                setComplianceFormData({
                    regulatoryInfo: {
                        interestStructure: persistedData.interest_structure || '',
                        registrationNumber: persistedData.registration_number || '',
                        taxIdNumber: persistedData.tax_id_number || '',
                        registeredAddress: persistedData.registered_address || '',
                    },
                    complianceChecklist: {
                        legallyIncorporated: persistedData.legally_incorporated || false,
                        clearEquityAgreements: persistedData.founders_equity_agreement || false,
                        noPendingDisputes: persistedData.pending_legal_disputes === false &&
                            (persistedData.legally_incorporated === true ||
                                persistedData.founders_equity_agreement === true ||
                                persistedData.authorized_to_raise_capital === true ||
                                persistedData.local_securities_regulations === true),
                        authorizedToRaise: persistedData.authorized_to_raise_capital || false,
                        securitiesCompliance: persistedData.local_securities_regulations || false,
                    },
                    documents: {
                        certificateOfIncorporation: persistedData.certificate_of_incorporation ?
                            { name: 'Uploaded Certificate', url: persistedData.certificate_of_incorporation } as any : null,
                        founderAgreements: persistedData.founder_agreements ?
                            { name: 'Uploaded Founder Agreements', url: persistedData.founder_agreements } as any : null,
                        legalComplianceCertificate: persistedData.legal_compliance_certificate ?
                            { name: 'Uploaded Legal Certificate', url: persistedData.legal_compliance_certificate } as any : null,
                    },
                    declarations: {
                        accurateInfo: persistedData.declaration || false,
                        authorityToRaise: persistedData.declaration || false,
                        termsAgreement: persistedData.declaration || false,
                    },
                });
            }
            hasInitialized.current = true;
        }
    }, []);

    const handleRegulatoryChange = (field: keyof ComplianceData['regulatoryInfo'], value: string) => {
        const updatedData = {
            ...complianceFormData,
            regulatoryInfo: {
                ...complianceFormData.regulatoryInfo,
                [field]: value
            }
        };
        setComplianceFormData(updatedData);

        // Persist to Redux immediately 
        const reduxData = {
            interest_structure: updatedData.regulatoryInfo.interestStructure,
            registration_number: updatedData.regulatoryInfo.registrationNumber,
            tax_id_number: updatedData.regulatoryInfo.taxIdNumber,
            registered_address: updatedData.regulatoryInfo.registeredAddress,
            legally_incorporated: updatedData.complianceChecklist.legallyIncorporated,
            founders_equity_agreement: updatedData.complianceChecklist.clearEquityAgreements,
            pending_legal_disputes: !updatedData.complianceChecklist.noPendingDisputes,
            authorized_to_raise_capital: updatedData.complianceChecklist.authorizedToRaise,
            local_securities_regulations: updatedData.complianceChecklist.securitiesCompliance,
            certificate_of_incorporation: persistedData?.certificate_of_incorporation || '',
            founder_agreements: persistedData?.founder_agreements || '',
            legal_compliance_certificate: persistedData?.legal_compliance_certificate || '',
            declaration: updatedData.declarations.accurateInfo && updatedData.declarations.authorityToRaise && updatedData.declarations.termsAgreement,
        };
        dispatch(updateComplianceVerificationData(reduxData));
    };

    const handleChecklistChange = (field: keyof ComplianceData['complianceChecklist'], checked: boolean) => {
        const updatedData = {
            ...complianceFormData,
            complianceChecklist: {
                ...complianceFormData.complianceChecklist,
                [field]: checked
            }
        };
        setComplianceFormData(updatedData);

        // Persist to Redux immediately 
        const reduxData = {
            interest_structure: updatedData.regulatoryInfo.interestStructure,
            registration_number: updatedData.regulatoryInfo.registrationNumber,
            tax_id_number: updatedData.regulatoryInfo.taxIdNumber,
            registered_address: updatedData.regulatoryInfo.registeredAddress,
            legally_incorporated: updatedData.complianceChecklist.legallyIncorporated,
            founders_equity_agreement: updatedData.complianceChecklist.clearEquityAgreements,
            pending_legal_disputes: !updatedData.complianceChecklist.noPendingDisputes,
            authorized_to_raise_capital: updatedData.complianceChecklist.authorizedToRaise,
            local_securities_regulations: updatedData.complianceChecklist.securitiesCompliance,
            certificate_of_incorporation: persistedData?.certificate_of_incorporation || '',
            founder_agreements: persistedData?.founder_agreements || '',
            legal_compliance_certificate: persistedData?.legal_compliance_certificate || '',
            declaration: updatedData.declarations.accurateInfo && updatedData.declarations.authorityToRaise && updatedData.declarations.termsAgreement,
        };
        dispatch(updateComplianceVerificationData(reduxData));
    };

    const handleFileUpload = async (field: keyof ComplianceData['documents'], file: File | null) => {
        if (!file) return;

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF, DOC, and DOCX files are allowed');
            return;
        }

        // Add to uploading files
        setUploadingFiles(prev => new Set([...prev, field]));

        try {
            // Create FormData for upload
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);

            // Upload file
            const result = await uploadFile(uploadFormData);

            if ('data' in result) {
                fileUploadCallback(result.data, (res: any) => {
                    // Update local state with file
                    const updatedData = {
                        ...complianceFormData,
                        documents: {
                            ...complianceFormData.documents,
                            [field]: file
                        }
                    };
                    setComplianceFormData(updatedData);

                    // Update Redux with file URL
                    updateReduxWithFileUrl(field, res.payload);
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
                newSet.delete(field);
                return newSet;
            });
        }
    };

    const updateReduxWithFileUrl = (field: keyof ComplianceData['documents'], fileUrl: string) => {
        // Map document field names to Redux field names
        const fieldMapping: Record<string, string> = {
            'certificateOfIncorporation': 'certificate_of_incorporation',
            'founderAgreements': 'founder_agreements',
            'legalComplianceCertificate': 'legal_compliance_certificate',
        };

        const reduxField = fieldMapping[field];
        if (reduxField) {
            const currentReduxData = {
                interest_structure: complianceFormData.regulatoryInfo.interestStructure,
                registration_number: complianceFormData.regulatoryInfo.registrationNumber,
                tax_id_number: complianceFormData.regulatoryInfo.taxIdNumber,
                registered_address: complianceFormData.regulatoryInfo.registeredAddress,
                legally_incorporated: complianceFormData.complianceChecklist.legallyIncorporated,
                founders_equity_agreement: complianceFormData.complianceChecklist.clearEquityAgreements,
                pending_legal_disputes: !complianceFormData.complianceChecklist.noPendingDisputes,
                authorized_to_raise_capital: complianceFormData.complianceChecklist.authorizedToRaise,
                local_securities_regulations: complianceFormData.complianceChecklist.securitiesCompliance,
                certificate_of_incorporation: persistedData?.certificate_of_incorporation || '',
                founder_agreements: persistedData?.founder_agreements || '',
                legal_compliance_certificate: persistedData?.legal_compliance_certificate || '',
                declaration: complianceFormData.declarations.accurateInfo && complianceFormData.declarations.authorityToRaise && complianceFormData.declarations.termsAgreement,
            };

            const updateData = {
                ...currentReduxData,
                [reduxField]: fileUrl
            };
            dispatch(updateComplianceVerificationData(updateData));
        }
    };

    const handleDeclarationChange = (field: keyof ComplianceData['declarations'], checked: boolean) => {

        const updatedDeclarations = {
            ...complianceFormData.declarations,
            [field]: checked
        };


        const updatedData = {
            ...complianceFormData,
            declarations: updatedDeclarations
        };

        setComplianceFormData(updatedData);

        // Persist to Redux immediately 
        const allDeclarationsChecked = updatedDeclarations.accurateInfo &&
            updatedDeclarations.authorityToRaise &&
            updatedDeclarations.termsAgreement;

        const reduxData = {
            interest_structure: updatedData.regulatoryInfo.interestStructure,
            registration_number: updatedData.regulatoryInfo.registrationNumber,
            tax_id_number: updatedData.regulatoryInfo.taxIdNumber,
            registered_address: updatedData.regulatoryInfo.registeredAddress,
            legally_incorporated: updatedData.complianceChecklist.legallyIncorporated,
            founders_equity_agreement: updatedData.complianceChecklist.clearEquityAgreements,
            pending_legal_disputes: !updatedData.complianceChecklist.noPendingDisputes,
            authorized_to_raise_capital: updatedData.complianceChecklist.authorizedToRaise,
            local_securities_regulations: updatedData.complianceChecklist.securitiesCompliance,
            certificate_of_incorporation: persistedData?.certificate_of_incorporation || '',
            founder_agreements: persistedData?.founder_agreements || '',
            legal_compliance_certificate: persistedData?.legal_compliance_certificate || '',
            declaration: allDeclarationsChecked,
        };
        dispatch(updateComplianceVerificationData(reduxData));
    };

    const isFormValid = () => {
        const { regulatoryInfo, complianceChecklist, declarations } = complianceFormData;

        const regulatoryComplete = Object.values(regulatoryInfo).every(value =>
            value.trim() !== '' && value.trim() !== 'Select'
        );
        const checklistComplete = Object.values(complianceChecklist).every(value => value === true);
        const declarationsComplete = Object.values(declarations).every(value => value === true);

        return regulatoryComplete && checklistComplete && declarationsComplete;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            setShowReviewModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowReviewModal(false);
    };

    const handleEditApplication = () => {
        setShowReviewModal(false);
    };

    const handleTrackStatus = () => {
        setShowReviewModal(false);
        onNext(complianceFormData);
    };

    const handleFileInputChange = (field: keyof ComplianceData['documents']) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        handleFileUpload(field, file);
    };

    const handleFileDelete = (field: keyof ComplianceData['documents']) => {
        // Update local state to remove file
        const updatedData = {
            ...complianceFormData,
            documents: {
                ...complianceFormData.documents,
                [field]: null
            }
        };
        setComplianceFormData(updatedData);

        // Update Redux to remove file URL
        updateReduxWithFileUrl(field, '');
    };

    return (
        <Box>
            {/* Header Section */}
            <FormHeader
                onBack={onBack}
                title="Compliance and Verification"
                subtitle="Ensure your fundraising meets regulatory requirements"
            />

            {/* Regulatory Information Section */}
            <RegulatoryInformationSection
                regulatoryInfo={complianceFormData.regulatoryInfo}
                onRegulatoryChange={handleRegulatoryChange}
            />

            {/* Compliance Checklist Section */}
            <ComplianceChecklistSection
                complianceChecklist={complianceFormData.complianceChecklist}
                onChecklistChange={handleChecklistChange}
            />

            {/* Document Upload Section */}
            <DocumentUploadSection
                documents={complianceFormData.documents}
                onFileUpload={handleFileUpload}
                onFileDelete={handleFileDelete}
                uploadingFiles={uploadingFiles}
            />



            {/* Declaration Section */}
            <DeclarationSection
                declarations={complianceFormData.declarations}
                onDeclarationChange={handleDeclarationChange}
            />

            {/* Reminder Text */}
            <Box sx={{ mb: 3, mt: 2, textAlign: 'center' }}>
                <Box sx={{
                    color: '#666',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    backgroundColor: '#f8f9fa',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                }}>
                    Please ensure all checkboxes above are completed before proceeding to the next step.
                </Box>
            </Box>

            {/* Action Buttons */}
            <ActionButtons
                onBack={onBack}
                isFormValid={isFormValid()}
                onSubmit={handleSubmit}
            />

            {/* Application Review Modal */}
            <ApplicationReviewModal
                open={showReviewModal}
                onClose={handleCloseModal}
                onEditApplication={handleEditApplication}
                onTrackStatus={handleTrackStatus}
            />
        </Box>
    );
};