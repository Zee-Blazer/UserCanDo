"use client";

import { Box, Typography } from '@mui/material';
import React from 'react';
import { TeamMemberCard } from './team-member-card';

interface TeamMember {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    description: string;
    avatar?: string;
}

interface TeamListProps {
    members: TeamMember[];
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
    isDeleting?: boolean;
}

export const TeamList: React.FC<TeamListProps> = ({ members, onEdit, onDelete, isDeleting }) => {
    if (members.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                py: 6,
                px: 3,
                border: '2px dashed #E0E0E0',
                borderRadius: '12px',
                backgroundColor: '#FAFAFA'
            }}>
                <Typography variant="body1" sx={{ color: '#6A6A6A', mb: 1 }}>
                    No team members added yet
                </Typography>
                <Typography variant="body2" sx={{ color: '#9E9E9E' }}>
                    Click "Add Member" to start building your team
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1E1E1E', mb: 2, fontSize: '0.875rem' }}>
                Team Members ({members.length})
            </Typography>
            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                {members.map((member) => (
                    <TeamMemberCard
                        key={member.id}
                        member={member}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isDeleting={isDeleting}
                    />
                ))}
            </Box>
        </Box>
    );
};
