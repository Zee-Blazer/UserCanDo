"use client";

import {
    useAddBusinessTeamMemberMutation,
    useDeleteBusinessTeamMemberMutation,
    useGetBusinessTeamMembersQuery,
    useUpdateBusinessTeamMemberMutation
} from '@/queries/businessApi';
import { useBusinessSelector } from '@/Redux/selectors';
import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { TeamForm } from './team-form';
import { TeamHeader } from './team-header';
import { TeamList } from './team-list';

interface TeamMember {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    description: string;
    avatar?: string;
}

interface TeamManagementProps {
    ref_kind?: 'business' | 'listing';
}

const emptyForm = { first_name: '', last_name: '', role: '', description: '', avatar: '' };

export const TeamManagement: React.FC<TeamManagementProps> = ({ ref_kind = 'business' }) => {
    const { businessUserProfile } = useBusinessSelector();
    const ref_id = businessUserProfile?.business_id || '';

    const { data: teamData, isLoading, refetch } = useGetBusinessTeamMembersQuery(
        { ref_kind, ref_id },
        { skip: !ref_id }
    );

    const [addTeamMember, { isLoading: isAdding }] = useAddBusinessTeamMemberMutation();
    const [updateTeamMember, { isLoading: isUpdating }] = useUpdateBusinessTeamMemberMutation();
    const [deleteTeamMember, { isLoading: isDeleting }] = useDeleteBusinessTeamMemberMutation();

    const [formData, setFormData] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const teamMembers: TeamMember[] = teamData?.payload?.team || [];

    const handleFieldChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddClick = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(true);
    };

    const handleEdit = (member: TeamMember) => {
        setFormData({
            first_name: member.first_name,
            last_name: member.last_name,
            role: member.role,
            description: member.description,
            avatar: member.avatar || ''
        });
        setEditingId(member.id);
        setShowForm(true);
    };

    const handleSave = async () => {
        const trimmedData = {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            role: formData.role.trim(),
            description: formData.description.trim(),
            avatar: formData.avatar.trim()
        };

        try {
            if (editingId) {
                await updateTeamMember({ ref_kind, ref_id, member_id: editingId, data: trimmedData }).unwrap();
                toast.success(`${trimmedData.first_name} ${trimmedData.last_name} updated successfully`);
            } else {
                await addTeamMember({ ref_kind, ref_id, data: trimmedData }).unwrap();
                toast.success(`${trimmedData.first_name} ${trimmedData.last_name} added to team`);
            }
            await refetch();
            setFormData(emptyForm);
            setEditingId(null);
            setShowForm(false);
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${editingId ? 'update' : 'add'} team member`);
        }
    };

    const handleCancel = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setShowForm(false);
    };

    const handleDelete = async (member: TeamMember) => {
        try {
            await deleteTeamMember({ ref_kind, ref_id, member_id: member.id }).unwrap();
            toast.success(`${member.first_name} ${member.last_name} removed from team`);
            await refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete team member');
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                <CircularProgress size={40} sx={{ color: '#33CC33' }} />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 3 }}>
            <TeamHeader count={teamMembers.length} onAddClick={handleAddClick} />
            {showForm && (
                <TeamForm
                    formData={formData}
                    isEditing={!!editingId}
                    isLoading={isAdding || isUpdating}
                    onFieldChange={handleFieldChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <TeamList
                members={teamMembers}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
            />
        </Box>
    );
};
