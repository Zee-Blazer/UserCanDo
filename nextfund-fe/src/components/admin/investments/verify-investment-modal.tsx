"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useVerifyInvestmentMutation } from '../../../queries/adminApi';
import { useAdminSelector } from "../../../Redux/selectors";
import DocumentChecklist from "../../business/home/document-checklist";
import SpannedBtn from "../../business/home/spanned-btn";
import GeneralModal from "../user-management/general-modal";
import TabularFormat from "./tabular-fomat";

interface VerifyInvestmentModalProps {
    open: boolean;
    onClose: () => void;
}

const VerifyInvestmentModal: React.FC<VerifyInvestmentModalProps> = ({ open, onClose }) => {

    dayjs.extend(relativeTime);
    const { activeInvestmentsData } = useAdminSelector();

    const joined = activeInvestmentsData?.created_at
        ? dayjs(activeInvestmentsData.created_at).fromNow()
        : "Unknown";

    const amountValue = (() => {
        const raw = activeInvestmentsData?.amount as any;
        const amt = raw && (raw.to ?? raw);
        if (amt == null) return "N/A";
        if (typeof amt === "number") return `$${amt.toLocaleString()}`;
        return `${amt}`;
    })();

    const tabDetails = [
        { label: "Investor", value: activeInvestmentsData?.investor || "N/A" },
        { label: "Business", value: activeInvestmentsData?.business_name || "N/A" },
        { label: "Amount", value: amountValue },
        { label: "Investment Type", value: activeInvestmentsData?.investment_type || "N/A" },
        { label: "Date", value: activeInvestmentsData?.created_at ? new Date(activeInvestmentsData.created_at).toLocaleString() : "N/A" },
    ];

    const documentReviewed = [
        {
            title: "Proof of Funds",
            info: {
                checkStatus: Boolean(activeInvestmentsData?.proof_of_funds?.verified),
                text: activeInvestmentsData?.proof_of_funds?.verified ? `Verified ${joined}` : "Pending",
            },
        },
        {
            title: "Signed term sheet",
            info: {
                checkStatus: Boolean(activeInvestmentsData?.signed_term_sheet?.verified),
                text: activeInvestmentsData?.signed_term_sheet?.verified ? `Verified ${joined}` : "Pending",
            },
        },
    ];

    const verificationChecklist = [
        {
            title: "Document authenticity confirmed",
            info: { checkStatus: Boolean(activeInvestmentsData?.documents_verified) },
        },
        {
            title: "Investor identity verified",
            info: { checkStatus: Boolean(activeInvestmentsData?.investor_verified) },
        },
    ];

    const [verifyInvestment, { isLoading: isVerifying, isSuccess: isVerifySuccess, isError: isVerifyError, error: verifyError }] = useVerifyInvestmentMutation();

    useEffect(() => {
        if (isVerifySuccess) {
            toast.success('Investment marked as verified');
            onClose();
        }
        if (isVerifyError) {
            const msg = (verifyError as any)?.data?.message ?? (verifyError as any)?.message ?? 'Failed to verify investment';
            toast.error(msg);
        }
    }, [isVerifySuccess, isVerifyError, verifyError, onClose]);

    const handleMarkVerified = () => {
        const allDocsVerified = documentReviewed.every(d => Boolean(d.info?.checkStatus));
        const allChecksVerified = verificationChecklist.every(d => Boolean(d.info?.checkStatus));
        if (!allDocsVerified || !allChecksVerified) {
            toast.error('Files are yet to be fully uploaded');
            return;
        }

        const id = (activeInvestmentsData as any)?.id;
        if (!id) {
            toast.error('Missing investment id');
            return;
        }

        verifyInvestment({ id, action: 'APPROVE' });
    };

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
                func: () => onClose(),
            },
            {
                text: "Mark as Verified",
                type: "grass",
                func: handleMarkVerified,
                loading: isVerifying,
                inactive: !(activeInvestmentsData as any)?.id,
            },
        ];

    return (
        <GeneralModal open={open} onClose={onClose} title="Verify Investment">

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1E1E1E]">
                    Verify investment
                </h1>
                <p className="text-[#6A6A6A] text-sm font-light">
                    Ensure all data a properly verified
                </p>
            </div>

            <style>{`
                .verify-scroll-container::-webkit-scrollbar { display: none; width: 0; height: 0; }
                .verify-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div className="verify-scroll-container h-[55vh] md:h-[60vh] overflow-y-scroll pr-2">

                <TabularFormat
                    tabDetails={tabDetails}
                    title="Investment Verification Summary"
                />

                <DocumentChecklist
                    title="Document Reviewed"
                    type="check"
                    documents={documentReviewed}
                />

                <DocumentChecklist
                    title="Verification Checklist"
                    type="check"
                    documents={verificationChecklist}
                />

            </div>

            <SpannedBtn buttons={actionButtons} />

        </GeneralModal>
    )
}

export default VerifyInvestmentModal;
