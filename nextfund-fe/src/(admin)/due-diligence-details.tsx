"use client";

import ProfileDetails from "@/components/admin/investments/profile-details";
import DocumentChecklist from "@/components/business/home/document-checklist";
import ContentContainer from "@/components/business/investors/content-container";
import MappedDetails from "@/components/business/investors/mapped-details";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../components/admin/user-management/confirmation-modal";
import SpannedBtn from "../components/business/home/spanned-btn";
import { useApproveDueDiligenceMutation, useDueDiligenceMissingDocMutation, useGetDueDiligenceRecordQuery } from "../queries/adminApi";
import { setActiveDueDiligenceDetails } from "../Redux/features/adminSlice";
import { useAdminSelector } from "../Redux/selectors";

const AdminDueDiligenceDetails = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { activeDueDiligenceDetails } = useAdminSelector();
    const { refetch: refetchDueDiligenceRecord } = useGetDueDiligenceRecordQuery();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [
        indicateMissingDoc,
        { isLoading: indicatingMissingDoc, isError, isSuccess }
    ] = useDueDiligenceMissingDocMutation();

    const [
        approveDue,
        { isLoading: isApproving, isError: isApproveError, isSuccess: isApproveSuccess }
    ] = useApproveDueDiligenceMutation();

    useEffect(() => {
        if (isError) {
            toast.error("Failed to request missing documents. Please try again.");
        }
        if (isSuccess) {
            toast.success("Missing document request sent successfully!");
        }
    }, [isError, isSuccess]);

    useEffect(() => {
        if (isApproveError) {
            toast.error("Failed to verify due diligence. Please try again.");
        }
        if (isApproveSuccess) {
            toast.success("Due diligence marked as verified.");
            if (activeDueDiligenceDetails) {
                const updatedDetails = {
                    ...activeDueDiligenceDetails,
                    approval_status: "APPROVED"
                };
                dispatch(setActiveDueDiligenceDetails(updatedDetails));
            }
            refetchDueDiligenceRecord();
        }
    }, [isApproveError, isApproveSuccess, dispatch, refetchDueDiligenceRecord]);

    const essential = activeDueDiligenceDetails?.essential_documents;
    const docsToCheckGlobal = essential ? Object.values(essential).filter(url => url && url !== "string") : [];
    const hasMissingGlobal = docsToCheckGlobal.length < Object.keys(essential || {}).length;

    const isDueDiligenceApproved = activeDueDiligenceDetails?.approval_status?.toUpperCase() === "APPROVED";

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass" | "border-danger";
        func: () => void;
        loading?: boolean;
        inactive?: boolean;
    }> = [
            {
                text: "Close",
                type: "muted",
                func: () => {
                    router.back();
                },
            },
            {
                text: indicatingMissingDoc ? "Requesting..." : "Request missing docs",
                type: "border-danger",
                loading: indicatingMissingDoc,
                inactive: !hasMissingGlobal,
                func: async () => {
                    if (!activeDueDiligenceDetails?.id) {
                        toast.error("No due diligence record found");
                        return;
                    }

                    if (!hasMissingGlobal) {
                        toast.success("No missing files to request.");
                        return;
                    }

                    try {
                        await indicateMissingDoc({ id: activeDueDiligenceDetails.id }).unwrap();
                    } catch (error) {
                        toast.error("Request failed.");
                    }
                },
            },
            {
                text: isDueDiligenceApproved ? "Verified" : (isApproving ? "Verifying..." : "Mark as Verified"),
                type: "grass",
                loading: isApproving,
                inactive: isDueDiligenceApproved,
                func: async () => {
                    if (isDueDiligenceApproved) {
                        return;
                    }

                    if (!activeDueDiligenceDetails?.id) {
                        toast.error("No due diligence record found");
                        return;
                    }

                    if (hasMissingGlobal) {
                        setShowConfirmationModal(true);
                        return;
                    }

                    try {
                        await approveDue({ id: activeDueDiligenceDetails.id, action: "APPROVE" }).unwrap();
                    } catch (error) {
                        console.error("Error approving due diligence:", error);
                    }
                },
            },
        ];

    const handleConfirmApproval = async () => {
        if (!activeDueDiligenceDetails?.id) {
            toast.error("No due diligence record found");
            setShowConfirmationModal(false);
            return;
        }

        try {
            await approveDue({ id: activeDueDiligenceDetails.id, action: "APPROVE" }).unwrap();
            setShowConfirmationModal(false);
        } catch (error) {
            console.error("Error approving due diligence:", error);
            setShowConfirmationModal(false);
        }
    };

    const getDocInfo = (doc?: string) => ({
        type: doc && doc !== "string" ? "" : "MISSING",
        checkStatus: !!doc && doc !== "string",
        url: doc && doc !== "string" ? doc : undefined,
    });

    const formatTitle = (key: string) => {
        return key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const data = activeDueDiligenceDetails && {
        business_name: activeDueDiligenceDetails.business_name ?? "",
        owner_name: activeDueDiligenceDetails.owner ?? "",
        category: activeDueDiligenceDetails.category ?? "",
        due_diligence: isDueDiligenceApproved ? "APPROVE" : activeDueDiligenceDetails.approval_status.toUpperCase() ?? "",
        listing_status: activeDueDiligenceDetails.review_status ?? "...",
    };

    const details = [
        { label: 'Owner', value: data?.owner_name ?? '' },
        { label: 'Business', value: data?.business_name ?? '' },
        { label: 'Category', value: data?.category ?? '' },
        { label: 'Listing Status', value: data?.listing_status ?? '...' },
        { label: 'Due Diligence', value: data?.due_diligence ?? '' },
    ];

    const documentDetails = activeDueDiligenceDetails?.essential_documents

    const documentList = documentDetails ? Object.entries(documentDetails).map(([key, url]) => ({
        title: formatTitle(key),
        info: { ...getDocInfo(url as string) }
    })) : [];

    return (
        <ContentContainer
            text="Due Diligence"
            enableNavigation={true}
            navigationType="dueDiligence"
        >
            <ProfileDetails name={data ? data.business_name : undefined} />
            <MappedDetails
                title="Business Information"
                details={details}
            />
            <DocumentChecklist
                title="Due Diligence Checklist"
                type="check"
                documents={documentList}
            />
            <SpannedBtn buttons={actionButtons} />

            <ConfirmationModal
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleConfirmApproval}
                title="Approve Business"
                message="Are you sure you want to verify a business with missing documents?"
                confirmText="Yes, Verify"
                cancelText="Cancel"
                loading={isApproving}
            />
        </ContentContainer>
    )
}

export default AdminDueDiligenceDetails;
