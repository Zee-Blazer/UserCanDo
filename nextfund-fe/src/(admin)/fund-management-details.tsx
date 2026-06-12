"use client";

import ProfileDetails from "@/components/admin/investments/profile-details";
import SpannedBtn from "@/components/business/home/spanned-btn";
import ContentContainer from "@/components/business/investors/content-container";
import MappedDetails from "@/components/business/investors/mapped-details";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useGetFundingRecordQuery, useUpdateFundingStatusMutation } from "../queries/adminApi";
import { setActiveFundingData } from "../Redux/features/adminSlice";
import { useAdminSelector } from "../Redux/selectors";

const FundManagementDetails = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { activeFundingData } = useAdminSelector();
    const [changeFundingStatus, { isLoading: isChangingStatus }] = useUpdateFundingStatusMutation();
    const { refetch: refreshFundingData } = useGetFundingRecordQuery({});
    const [currentAction, setCurrentAction] = useState<string | null>(null);
    const [newApprovalStatus, setNewApprovalStatus] = useState<string>(activeFundingData?.funding_status || activeFundingData?.status || '');

    const details = [
        { label: 'Investor', value: activeFundingData?.investor || 'Yemi Bello' },
        { label: 'Business', value: activeFundingData?.business || 'Halal Pay' },
        { label: 'Amount', value: activeFundingData?.amount ? `${activeFundingData.amount.toLocaleString()}` : '$100,000' },
        { label: 'Currency', value: activeFundingData?.currency || 'USD' },
        { label: 'Payment Method', value: activeFundingData?.payment_method ? activeFundingData.payment_method.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Bank Transfer' },
        { label: 'Date Initiated', value: activeFundingData?.created_at ? new Date(activeFundingData.created_at).toLocaleDateString() : 'May 23, 2025' },
    ];

    const disbursementDetails = [
        { label: 'KYC', value: activeFundingData?.kyc_verified ? 'Verified' : 'Verified' },
        { label: 'Due Diligence', value: 'Completed' },
        { label: 'Admin Approval', value: newApprovalStatus ? newApprovalStatus.toUpperCase() : 'Not yet approved' },
        { label: 'Bank Details', value: 'Verified' },
    ];

    const handleChangeStatus = (action: string) => {
        if (!activeFundingData) return;
        setCurrentAction(action);
        changeFundingStatus({ id: activeFundingData.id, action })
            .unwrap()
            .then((response) => {
                setNewApprovalStatus(response.payload?.funding_status.toUpperCase());
                dispatch(setActiveFundingData(response.payload));
                toast.success(`Funding status updated successfully`);
                refreshFundingData();
                setCurrentAction(null);
            })
            .catch(() => {
                toast.error("Failed to update funding status. Please try again.");
                setCurrentAction(null);
            });
    }

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass" | "border-danger";
        func: () => void;
        inactive?: boolean;
        loading?: boolean;
    }> = [
            {
                text: "Close",
                type: "muted",
                func: () => {
                    router.back();
                },
            },
            {
                text: (currentAction === 'SUSPEND' && isChangingStatus) ? "Flagging..." : "Flag",
                type: "border-danger",
                func: () => handleChangeStatus('SUSPEND'),
                loading: currentAction === 'SUSPEND' && isChangingStatus,
                inactive: newApprovalStatus?.toLowerCase() === 'suspended' || newApprovalStatus?.toLowerCase() === 'flagged',
            },
            {
                text: (currentAction === 'APPROVE' && isChangingStatus) ? "Approving..." : "Approve",
                type: "grass",
                func: () => handleChangeStatus('APPROVE'),
                loading: currentAction === 'APPROVE' && isChangingStatus,
                inactive: newApprovalStatus?.toLowerCase() === 'disbursed' || newApprovalStatus?.toLowerCase() === 'approved',
            },
        ];

    return (
        <ContentContainer
            text="Fund Management"
            showSidenav={false}
        >
            <ProfileDetails
                name={activeFundingData?.investor || "N/A"}
            />
            <MappedDetails
                title="Investment Information"
                details={details}
            />
            <div className="my-8"></div>
            <MappedDetails
                title="Disbursement Status"
                details={disbursementDetails}
            />
            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    )
}

export default FundManagementDetails;
