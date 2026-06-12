"use client";

import ProfileDetails from "@/components/admin/investments/profile-details";
import SuspendModal from "@/components/admin/user-management/suspend-modal";
import DocumentChecklist from "@/components/business/home/document-checklist";
import SpannedBtn from "@/components/business/home/spanned-btn";
import ContentContainer from "@/components/business/investors/content-container";
import MappedDetails from "@/components/business/investors/mapped-details";
import { useAdminSelector } from "@/Redux/selectors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useApproveUserMutation, useGetAllUsersQuery } from "../queries/adminApi";
import { setActiveUsersData } from "../Redux/features/adminSlice";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const investmentActivity = [
    { title: "Invested $25,000 in TechPay Solutions", info: { timeStamp: "2 days ago" } },
    { title: "Invested $25,000 in TechPay Solutions", info: { timeStamp: "2 days ago" } },
    { title: "Invested $25,000 in TechPay Solutions", info: { timeStamp: "2 days ago" } },
]

const InvestorsManagement = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { activeUsersData } = useAdminSelector();

    const { refetch: refetchAllUsers } = useGetAllUsersQuery();

    const [
        approveUser,
        {
            isLoading: isApproving,
            isError: isApproveError,
            isSuccess: isApproveSuccess
        }
    ] = useApproveUserMutation();

    const [suspendModalOpen, setSuspendModalOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [lastApproveAction, setLastApproveAction] = useState<string | null>(null);

    const approveStatus = activeUsersData?.status.toLowerCase() === 'verified' ? true : false;

    const isUserActive = activeUsersData?.status?.toLowerCase() === "active";

    const isCompleted =
        activeUsersData?.identification_document &&
        isUserActive;

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass";
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
            ...(
                approveStatus
                    ? [
                        {
                            text: "Suspend",
                            type: "danger" as const,
                            func: () => {
                                const id = (activeUsersData as any)?.user_id;
                                if (!id) return;
                                setLastApproveAction('SUSPEND');
                                approveUser({ id, action: 'SUSPEND' } as any)
                                    .unwrap()
                                    .catch(() => {
                                        // error handled in effect
                                    });
                            },
                            loading: isApproving && lastApproveAction === 'SUSPEND',
                            inactive: isApproving && lastApproveAction !== 'SUSPEND',
                        }
                    ]
                    : [
                        {
                            text: isUserActive ? "Approved" : (isApproving && lastApproveAction === 'APPROVE' ? "Approving..." : "Approve"),
                            type: "grass" as const,
                            func: () => {
                                if (isUserActive) {
                                    return; // Do nothing if already active
                                }

                                const id = (activeUsersData as any)?.user_id;
                                if (!id) return;
                                setLastApproveAction('APPROVE');
                                approveUser({ id, action: 'APPROVE' } as any)
                                    .unwrap()
                                    .catch(() => {
                                        // error toast handled in effect
                                    });
                            },
                            loading: isApproving && lastApproveAction === 'APPROVE',
                            inactive:
                                Boolean(isApproving && lastApproveAction !== 'APPROVE') ||
                                !Boolean(activeUsersData?.identification_document) ||
                                Boolean(isUserActive),
                        }
                    ]
            ),
        ];


    useEffect(() => {
        if (isApproveSuccess && lastApproveAction) {
            if (lastApproveAction === 'APPROVE') {
                toast.success('User approved successfully');

                if (activeUsersData) {
                    const updatedUserData = {
                        ...activeUsersData,
                        status: "active"
                    };
                    dispatch(setActiveUsersData(updatedUserData));
                }

                refetchAllUsers();
            }
            if (lastApproveAction === 'SUSPEND') toast.success('User suspended successfully');
            setLastApproveAction(null);
        }
        if (isApproveError && lastApproveAction) {
            const msg = 'Failed to perform action on user';
            toast.error(msg);
            setLastApproveAction(null);
        }
    }, [isApproveSuccess, isApproveError, lastApproveAction, activeUsersData, dispatch, refetchAllUsers]);

    const details: { label: string; value: string }[] = [
        { label: 'Name', value: activeUsersData?.name ?? '...' },
        { label: 'Email Address', value: activeUsersData?.email ?? '...' },
        { label: 'Category', value: activeUsersData?.category ?? '...' },
        { label: 'Phone Number', value: activeUsersData?.phone_number ?? '...' },
        { label: 'Date Joined', value: activeUsersData?.date_joined ?? '...' },
        { label: 'Account Status', value: isUserActive ? 'ACTIVE' : activeUsersData?.status.toUpperCase() ?? '...' },
    ];

    const joined = activeUsersData?.date_joined
        ? dayjs(activeUsersData.date_joined).fromNow()
        : "Unknown";

    const documentList = [
        {
            title: "Identification Document",
            description: "FILE",
            info: {
                type: activeUsersData && activeUsersData?.identification_document ? activeUsersData.status.toUpperCase() : "MISSING",
                timeStamp: joined,
                url: activeUsersData?.identification_document ?? undefined
            }
        },
        // {
        //     title: "Proof of Address",
        //     description: "FILE",
        //     info: {
        //         type: activeUsersData && activeUsersData?.proof_of_address ? activeUsersData.status.toUpperCase() : "MISSING",
        //         timeStamp: joined,
        //         url: activeUsersData?.proof_of_address ?? undefined
        //     }
        // },
    ];

    return (
        <ContentContainer enableNavigation={true} navigationType="users">
            <ProfileDetails name={activeUsersData?.name} />

            <MappedDetails
                title="User Information"
                details={details}
            />

            <DocumentChecklist
                title="KYC Documents"
                type="paper"
                documents={documentList}
            />

            {
                approveStatus &&
                <DocumentChecklist
                    title="Investment Activity"
                    documents={investmentActivity}
                />
            }

            <SpannedBtn buttons={actionButtons} />

            <SuspendModal
                text="Suspend Investor"
                open={suspendModalOpen}
                onClose={() => setSuspendModalOpen(false)}
                onSubmitSuccess={() => setConfirmationOpen(true)}
            />
        </ContentContainer>
    )
}

export default InvestorsManagement;
