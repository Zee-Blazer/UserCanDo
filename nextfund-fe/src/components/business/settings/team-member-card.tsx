"use client";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import ConfirmationModal from "../../admin/user-management/confirmation-modal";

interface TeamMember {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    description: string;
    avatar?: string;
}

interface TeamMemberCardProps {
    member: TeamMember;
    onEdit: (member: TeamMember) => void;
    onDelete: (member: TeamMember) => void;
    isDeleting?: boolean;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
    member,
    onEdit,
    onDelete,
    isDeleting = false
}) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(member);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const getInitials = () => {
        const first = member.first_name[0] || '';
        const last = member.last_name[0] || '';
        return (first + last).toUpperCase();
    };

    return (
        <>
            <Box
                sx={{
                    p: 2.5,
                    border: '1px solid #EEF1F4',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        borderColor: '#D0D5DD'
                    }
                }}
            >
                <Box sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    display: 'flex',
                    gap: 0.5
                }}>
                    <IconButton
                        onClick={() => onEdit(member)}
                        size="small"
                        sx={{
                            color: '#043A66',
                            backgroundColor: '#F0F7FF',
                            '&:hover': {
                                backgroundColor: '#E0EFFF'
                            }
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        size="small"
                        sx={{
                            color: '#B3261E',
                            backgroundColor: '#FFEBEE',
                            '&:hover': {
                                backgroundColor: '#FFCDD2'
                            },
                            '&:disabled': {
                                backgroundColor: '#F5F5F5',
                                color: '#BDBDBD'
                            }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pr: 8 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '10px',
                            backgroundColor: member.avatar ? 'transparent' : '#043A66',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            overflow: 'hidden',
                            border: member.avatar ? '1px solid #EEF1F4' : 'none'
                        }}
                    >
                        {member.avatar ? (
                            <img
                                src={member.avatar}
                                alt={`${member.first_name} ${member.last_name}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Box sx={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>
                                {getInitials()}
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: '#1E1E1E',
                                fontSize: '1rem',
                                mb: 0.5,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {member.first_name} {member.last_name}
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-block',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '6px',
                                backgroundColor: '#F0F7FF',
                                mb: 1
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#043A66',
                                    fontWeight: 500,
                                    fontSize: '0.75rem'
                                }}
                            >
                                {member.role}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#6A6A6A',
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {member.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Team Member"
                message={`Are you sure you want to delete ${member.first_name} ${member.last_name}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                loading={isDeleting}
                confirmButtonColor="error"
            />
        </>
    );
};
