"use client";

import { useEffect, useState } from 'react';

import ProfileDetails from "@/components/admin/investments/profile-details";
import SuspendModal from "@/components/admin/user-management/suspend-modal";
import DocumentChecklist from "@/components/business/home/document-checklist";
import SpannedBtn from "@/components/business/home/spanned-btn";
import ContentContainer from "@/components/business/investors/content-container";
import MappedDetails from "@/components/business/investors/mapped-details";
import TanTable from "@/components/General/TanTable";
import { useGetAllBusinessesQuery } from "@/queries/businessApi";
import { useAdminSelector } from "@/Redux/selectors";
import { Alert, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useApproveUserMutation } from "../queries/adminApi";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);


const tableColumns = [
    { header: 'BUSINESS NAME', accessorKey: 'businessName' },
    { header: 'SECTOR', accessorKey: 'sector' },
    {
        id: 'status',
        header: 'Status',
        cell: ({ row }: any) => (
            <p
                className={`
                    px-2 py-1 rounded-lg text-xs min-w-0 inline-block
                    ${row.original.status.toLowerCase() === 'live'
                        ? 'border border-green-600 text-green-600'
                        : row.original.status.toLowerCase() === 'pending'
                            ? 'border border-yellow-500 text-yellow-600'
                            : 'border border-red-600 text-red-600'
                    }
                `}
                style={{ width: 'fit-content' }}
            >
                {row.original.status}
            </p>
        )
    },
    {
        id: 'action',
        header: 'ACTION',
        cell: ({ row }: any) => (
            <div className="flex gap-4">
                <span
                    className="text-sm underline cursor-pointer text-[#1E1E1E] hover:text-green-600 transition"
                >
                    View more
                </span>
                <span
                    className="text-sm underline cursor-pointer text-[#1E1E1E] hover:text-red-600 transition"
                >
                    Suspend
                </span>
            </div>
        )
    },
];

const BusinessManagement = () => {

    const router = useRouter();
    const { activeUsersData } = useAdminSelector();

    const [suspendModalOpen, setSuspendModalOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const [lastApproveAction, setLastApproveAction] = useState<string | null>(null);

    const approveStatus = activeUsersData?.status.toLowerCase() === 'verified' ? true : false;

    const [approveUser, { isLoading: isApproving, isError: isApproveError, isSuccess: isApproveSuccess }] = useApproveUserMutation();

    const {
        data: businessesData,
        isLoading: isLoadingBusinesses,
        error: businessesError
    } = useGetAllBusinessesQuery();

    const enhancedTableData = activeUsersData?.business_listing
        ? [{
            businessName: activeUsersData.business_listing.business_name ?? '',
            sector: activeUsersData.business_listing.sector ?? '',
            status: 'LIVE',
            action: 'Active',
        }]
        : [];

    const isMissingBusinessDocs =
        !activeUsersData?.business_listing?.certificate_of_incorporation ||
        !activeUsersData?.business_listing?.financial_statements ||
        !activeUsersData?.business_listing?.pitch_deck;

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
                            text: "Approve",
                            type: "grass" as const,
                            func: () => {
                                const id = (activeUsersData as any)?.user_id;
                                if (!id) return;
                                setLastApproveAction('APPROVE');
                                approveUser({ id, action: 'APPROVE' } as any)
                                    .unwrap()
                                    .catch(() => {
                                        // error handled in effect
                                    });
                            },
                            loading: isApproving && lastApproveAction === 'APPROVE',
                            inactive:
                                isApproving && lastApproveAction !== 'APPROVE' ||
                                isMissingBusinessDocs,
                        }
                    ]
            ),
        ];

    useEffect(() => {
        if (isApproveSuccess && lastApproveAction) {
            if (lastApproveAction === 'APPROVE') toast.success('User approved successfully');
            if (lastApproveAction === 'SUSPEND') toast.success('User suspended successfully');
            setLastApproveAction(null);
        }
        if (isApproveError && lastApproveAction) {
            toast.error('Failed to perform action on user');
            setLastApproveAction(null);
        }
    }, [isApproveSuccess, isApproveError, lastApproveAction]);

    const joined = activeUsersData?.date_joined
        ? dayjs(activeUsersData.date_joined).fromNow()
        : "Unknown";

    const details: { label: string; value: string }[] = [
        { label: 'Name', value: activeUsersData?.name ?? '...' },
        { label: 'Email Address', value: activeUsersData?.email ?? '...' },
        { label: 'Category', value: activeUsersData?.category ?? '...' },
        { label: 'Business Name', value: activeUsersData?.business_listing?.business_name ?? '...' },
        { label: 'Phone Number', value: activeUsersData?.phone_number ?? '...' },
        { label: 'Date Joined', value: joined },
        { label: 'Account Status', value: activeUsersData?.status.toUpperCase() ?? '...' },
    ];

    const documentList = [
        {
            title: "Certificate of Incorporation",
            description: "PDF",
            info: {
                type: activeUsersData?.business_listing?.certificate_of_incorporation ? activeUsersData.status.toUpperCase() : "MISSING",
                timeStamp: joined,
                url: activeUsersData?.business_listing?.certificate_of_incorporation ?? undefined
            }
        },
        {
            title: "Financial Statements",
            description: "PDF",
            info: {
                type: activeUsersData?.business_listing?.financial_statements ? activeUsersData.status.toUpperCase() : "MISSING",
                timeStamp: joined,
                url: activeUsersData?.business_listing?.financial_statements ?? undefined
            }
        },
        {
            title: "Pitch Deck",
            description: "PDF",
            info: {
                type: activeUsersData?.business_listing?.pitch_deck ? activeUsersData.status.toUpperCase() : "MISSING",
                timeStamp: joined,
                url: activeUsersData?.business_listing?.pitch_deck ?? undefined
            }
        },
    ];

    return (
        <ContentContainer enableNavigation={true} navigationType="users">
            <ProfileDetails name={activeUsersData?.name} />

            <MappedDetails
                title="User Information"
                details={details}
                className="mb-6"
            />

            <DocumentChecklist
                title="KYB Documents"
                type="paper"
                documents={documentList}
            />

            <div className="my-6">
                {isLoadingBusinesses ? (
                    <Box display="flex" justifyContent="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : businessesError ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Failed to load businesses data
                    </Alert>
                ) : (
                    <TanTable
                        columnData={tableColumns}
                        data={enhancedTableData}
                        showHeader={{
                            title: "Business Listing",
                            subTitle: `${businessesData?.payload?.length || 0} registered businesses`
                        }}
                    />
                )}
            </div>

            <SpannedBtn buttons={actionButtons} />

            <SuspendModal
                text="Suspend Business"
                open={suspendModalOpen}
                onClose={() => setSuspendModalOpen(false)}
                onSubmitSuccess={() => setConfirmationOpen(true)}
            />
        </ContentContainer>
    )
}

export default BusinessManagement;
