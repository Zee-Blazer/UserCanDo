"use client";

import SpannedBtn from "@/components/business/home/spanned-btn";
import ContentContainer from "@/components/business/investors/content-container";
import MappedDetails from "@/components/business/investors/mapped-details";
import TanTable from "@/components/General/TanTable";
import { useGetTeamMemberDetailsQuery, useUpdateTeamMemberDetailsMutation } from "@/queries/adminApi";
import { useAdminSelector } from "@/Redux/selectors";
import { formatDateTime, formatEventAction } from "@/utils/formatting";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const AdminTeamDetails = () => {

    const { activeTeamMemberData } = useAdminSelector();
    const [updateTeamMemberDetails, { isLoading: isUpdating }] = useUpdateTeamMemberDetailsMutation();
    const { data: teamMemberDetails, isLoading: isLoadingDetails } = useGetTeamMemberDetailsQuery(
        activeTeamMemberData?.id || "",
        { skip: !activeTeamMemberData?.id }
    );
    const router = useRouter();
    const [isEditMode, setIsEditMode] = useState(true);
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleFormChange = (updatedDetails: Record<string, string>) => {
        setFormValues(updatedDetails);
    };

    const firstName = (activeTeamMemberData as any)?.first_name || (activeTeamMemberData?.full_name ? activeTeamMemberData.full_name.split(' ')[0] : 'N/A');
    const lastName = (activeTeamMemberData as any)?.last_name || (activeTeamMemberData?.full_name ? activeTeamMemberData.full_name.split(' ').slice(1).join(' ') : 'N/A');

    const details = useMemo(() => [
        { label: 'First Name', value: firstName },
        { label: 'Last Name', value: lastName },
        { label: 'Email Address', value: activeTeamMemberData?.email || 'N/A' },
        {
            label: 'Role',
            value: activeTeamMemberData?.role || 'N/A',
            type: 'select' as const,
            options: ['Super Admin', 'Admin', 'KYC Officer', 'Content Management']
        },
    ], [firstName, lastName, activeTeamMemberData?.email, activeTeamMemberData?.role]);

    const columns = [
        { header: 'DATE/TIME', accessorKey: 'dateTime' },
        { header: 'ACTION', accessorKey: 'action' },
    ];

    const activityLogData = useMemo(() => {
        if (!teamMemberDetails?.activity_logs || !Array.isArray(teamMemberDetails.activity_logs)) return [];

        return teamMemberDetails.activity_logs.map((log) => ({
            dateTime: formatDateTime(log.created_at),
            action: formatEventAction(log.event_name),
        }));
    }, [teamMemberDetails]);

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass";
        func: () => void;
    }> = [
            {
                text: "Close",
                type: "muted",
                func: () => {
                    router.back()
                },
            },
            {
                text: isUpdating ? "Updating..." : "Save",
                type: "primary",
                func: async () => {
                    try {
                        if (!activeTeamMemberData?.id || !activeTeamMemberData?.email || !activeTeamMemberData?.role) {
                            toast.error('Missing required team member information');
                            return;
                        }

                        const updateData = {
                            id: activeTeamMemberData.id,
                            first_name: formValues.first_name || firstName,
                            last_name: formValues.last_name || lastName,
                            email: formValues.email_address || activeTeamMemberData.email,
                            role: formValues.role || activeTeamMemberData.role,
                        };

                        const result = await updateTeamMemberDetails(updateData).unwrap();
                        toast.success('Team member details updated successfully!');

                        setTimeout(() => {
                            router.back();
                        }, 100);
                    } catch (error: any) {
                        // console.error('Update error:', error);
                        toast.error(error?.data?.message || 'Failed to update team member details');
                    }
                },
            },
        ];

    return (
        <ContentContainer
            text="Team Management"
            showSidenav={false}
        >
            <MappedDetails
                title="Team Member Information"
                details={details}
                form={isEditMode}
                onChange={handleFormChange}
            />
            <div className="my-10"></div>
            <TanTable
                columnData={columns}
                data={activityLogData}
                showHeader={{
                    title: "Activity log",
                }}
                colBorderLine
                rowBorderLine
            />
            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    )
}

export default AdminTeamDetails;
