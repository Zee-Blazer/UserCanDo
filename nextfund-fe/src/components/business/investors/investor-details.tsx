"use client";

import SpannedBtn, { SpannedBtnConfig } from '@/components/business/home/spanned-btn';
import { useGetInvestorDetailQuery, useSendEssentialDocumentsMutation, useSendMeetingInviteMutation } from "@/queries/businessApi";
import { getInitials, openMailTo } from '@/utils/helpers';
import { sendMeetingInviteRequest } from '@/utils/sendMeetingInvite';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import toast from 'react-hot-toast';
import MappedDetails from "./mapped-details";
import ScheduleMeetingModal from './schedule-meeting-modal';
dayjs.extend(advancedFormat);

// moved to utils/sendMeetingInvite.ts

const InvestorDetails = () => {
    const searchParams = useSearchParams();
    const interestId = searchParams.get('id');

    const { data, isLoading, refetch } = useGetInvestorDetailQuery(interestId || '', {
        skip: !interestId,
    });

    const investor = data?.payload;

    const [sendDocs, { isLoading: isSendingDocs }] = useSendEssentialDocumentsMutation();
    const [sendMeetingInvite, { isLoading: isSendingInvite }] = useSendMeetingInviteMutation();

    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const actionButtons: SpannedBtnConfig[] = [
        {
            text: 'Open Conversation',
            type: 'default',
            className: '!font-normal !bg-[#33CC331A] !text-[#33CC33] hover:!bg-[#33CC331A]',
            func: () => {
                if (!investor?.email) {
                    toast.error('No email available for this investor');
                    return;
                }

                const subject = `Re: Your interest on NexFund`;
                const body = `Hi ${investor?.investor_name || ''},\n\nI would like to follow up on your expressed interest.\n\nBest regards,\n`;
                openMailTo(investor.email, subject, body);
            },
        },
        {
            text: 'Send Documents',
            type: 'grass',
            loading: isSendingDocs,
            className: 'font-normal',
            func: async () => {
                if (!investor?.listing_id || !investor?.user_id) {
                    toast.error('Missing listing or investor info');
                    return;
                }

                try {
                    await sendDocs({ listing_id: investor.listing_id, investor_id: investor.user_id }).unwrap();
                    toast.success('Essential documents sent to investor');
                    refetch?.();
                } catch (err: any) {
                    toast.error(err?.data?.message || 'Failed to send documents');
                }
            },
        },
        {
            text: 'Schedule Meeting',
            type: 'default',
            className: '!font-normal !text-[#33CC33] !border !border-[#33CC33] hover:!bg-[#33CC331A]',
            func: () => setShowScheduleModal(true),
        },
    ];

    if (isLoading) {
        return (
            <div className="bg-white p-5 w-11/12 -mt-28 mx-auto">
                <p className="text-center text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!investor) {
        return (
            <div className="bg-white p-5 w-11/12 -mt-28 mx-auto">
                <p className="text-center text-red-600">Failed to load investor details</p>
            </div>
        );
    }

    const details = [
        { label: 'Investor Name', value: investor.investor_name },
        { label: 'Email Address', value: investor.email },
        {
            label: 'Expressed Interest',
            value: new Date(investor.expressed_interest_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        },
        { label: 'NDA Status', value: investor.nda_signed ? 'Signed' : 'Not Signed' },
        { label: 'Status', value: investor.status || 'Awaiting Response' },
        { label: 'Notes', value: investor.notes || 'No notes available' },
    ];

    const handleSendMeetingInvite = async (payload: { platform: 'google' | 'zoom'; date: string; time: string; link: string; agenda: string }) => {
        if (!investor?.listing_id || !investor?.user_id) {
            toast.error('Missing investor information');
            return;
        }

        try {
            await sendMeetingInviteRequest(sendMeetingInvite, investor.listing_id, investor.user_id, payload);
            toast.success('Meeting invite sent successfully');
            setShowScheduleModal(false);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to send meeting invite');
        }
    };

    return (
        <div className="bg-white p-5 w-11/12 -mt-28 mx-auto">

            <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-semibold text-gray-600">
                    {getInitials(investor.investor_name)}
                </div>
                <p className="text-xl font-semibold">{investor.investor_name}</p>
            </div>

            <MappedDetails
                title="Investor Information"
                details={details}
            />

            <SpannedBtn buttons={actionButtons} />

            <ScheduleMeetingModal
                open={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                onSend={handleSendMeetingInvite}
            />
        </div>
    )
}

export default InvestorDetails;
