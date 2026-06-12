"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDetails from "../components/admin/investments/profile-details";
import VerifyInvestmentModal from "../components/admin/investments/verify-investment-modal";
import DocumentChecklist from "../components/business/home/document-checklist";
import SpannedBtn from "../components/business/home/spanned-btn";
import ContentContainer from "../components/business/investors/content-container";
import MappedDetails from "../components/business/investors/mapped-details";
import { useAdminSelector } from "../Redux/selectors";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const AdminInvestmentDetails = () => {

    const router = useRouter();
    const { activeInvestmentsData } = useAdminSelector();

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass";
        inactive?: boolean;
        func: () => void;
    }> = [
            {
                text: "Close",
                type: "muted",
                func: () => {
                    router.back();
                },
            },
            {
                text: activeInvestmentsData?.status.toLowerCase() === "completed" ? "Completed" : "Mark as Verified",
                type: "grass",
                // inactive: true,
                func: () => {
                    setShowVerifyModal(true);
                },
            },
        ];

    const [showVerifyModal, setShowVerifyModal] = useState(false);

    const joined = activeInvestmentsData?.created_at
        ? dayjs(activeInvestmentsData.created_at).fromNow()
        : "Unknown";

    const details = [
        { label: 'Investor Name', value: activeInvestmentsData?.investor || 'N/A' },
        { label: 'Business', value: activeInvestmentsData?.business_name || 'N/A' },
        { label: 'Amount', value: `$${activeInvestmentsData?.amount.toLocaleString() || 'N/A'}` },
        { label: 'Payment Method', value: activeInvestmentsData?.payment_method || 'N/A' },
        { label: 'Investment Type', value: activeInvestmentsData?.investment_type || 'N/A' },
        { label: 'Date', value: activeInvestmentsData?.created_at ? new Date(activeInvestmentsData.created_at).toLocaleString() : '' },
        { label: 'Status', value: activeInvestmentsData?.status || 'N/A' },
        { label: 'Progress', value: 'N/A' },
    ];

    const documentList = [
        {
            title: "Proof of funds",
            description: "PDF",
            info: {
                type: activeInvestmentsData?.proof_of_funds.verified ? "VERIFIED" : "PENDING",
                timeStamp: joined
            }
        },
        {
            title: "Signed term sheet",
            description: "PDF",
            info: {
                type: activeInvestmentsData?.signed_term_sheet.verified ? "VERIFIED" : "PENDING",
                timeStamp: joined
            }
        },
    ];

    return (
        <ContentContainer
            text="Investment"
            enableNavigation={true}
            navigationType="investments"
        >
            <ProfileDetails
                name={activeInvestmentsData?.investor || 'N/A'}
            />

            <MappedDetails
                title="Investment Information"
                details={details}
            />

            <DocumentChecklist
                title="Documents"
                type="paper"
                documents={documentList}
            />

            <SpannedBtn buttons={actionButtons} />

            <VerifyInvestmentModal
                open={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
            />
        </ContentContainer>
    )
}

export default AdminInvestmentDetails;
