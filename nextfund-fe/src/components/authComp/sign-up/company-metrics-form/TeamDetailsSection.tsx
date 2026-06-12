import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useBusinessSelector } from '../../../../Redux/selectors';
import FormInput from '../../../General/form/formInput';
import FormSelect from '../../../General/form/select';
import FormTextArea from '../../../General/form/textArea';
import type { TeamDetailsSectionProps } from './types';

const ROLES = [
    'CEO',
    'CTO',
    'COO',
    'CFO',
    'CMO',
    'VP of Engineering',
    'VP of Sales',
    'VP of Marketing',
    'Head of Product',
    'Head of Operations',
    'Lead Developer',
    'Senior Developer',
    'Product Manager',
    'Sales Manager',
    'Marketing Manager',
    'Other'
];

// Helper function to generate truly unique IDs
const generateUniqueId = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Enhanced fallback with microsecond precision and multiple random components
    const now = Date.now();
    const microsecond = performance.now ? performance.now() : 0;
    const random1 = Math.random().toString(36).substring(2, 15);
    const random2 = Math.random().toString(36).substring(2, 15);
    const random3 = Math.random().toString(36).substring(2, 15);

    return `team-${now}-${microsecond}-${random1}-${random2}-${random3}`;
};

export const TeamDetailsSection: React.FC<TeamDetailsSectionProps> = ({
    teamMembers,
    onTeamMembersChange,
    onRemoveTeamMember
}) => {
    const theme = useTheme();

    const [currentMember, setCurrentMember] = useState({
        first_name: '',
        last_name: '',
        role: '',
        description: ''
    });
    const { listingId, businessUserProfile } = useBusinessSelector();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

    const handleFieldChange = (field: string, value: string) => {
        setCurrentMember(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddNewMember = () => {
        setCurrentMember({
            first_name: '',
            last_name: '',
            role: '',
            description: ''
        });
        setEditingMemberId(null);
        setShowAddForm(true);
    };

    const handleEditMember = (memberId: string) => {
        const member = teamMembers.find(m => m.id === memberId);
        if (member) {
            setCurrentMember({
                first_name: member.first_name,
                last_name: member.last_name,
                role: member.role,
                description: member.description
            });
            setEditingMemberId(memberId);
            setShowAddForm(true);
        }
    };

    const handleSave = () => {
        if (!isCurrentMemberValid) return;

        const memberData = {
            first_name: currentMember.first_name.trim(),
            last_name: currentMember.last_name.trim(),
            role: currentMember.role.trim(),
            description: currentMember.description.trim()
        };

        if (editingMemberId) {
            // Update existing member
            const updatedMembers = teamMembers.map(member =>
                member.id === editingMemberId
                    ? { ...member, ...memberData }
                    : member
            );
            onTeamMembersChange(updatedMembers);
            toast.success(`${memberData.first_name} ${memberData.last_name} updated successfully`, {
                duration: 3000,
                position: 'top-right',
            });
        } else {
            // Add new member
            const newMember = {
                id: generateUniqueId(),
                ...memberData
            };
            onTeamMembersChange([...teamMembers, newMember]);
            toast.success(`${memberData.first_name} ${memberData.last_name} added to team`, {
                duration: 3000,
                position: 'top-right',
            });
        }

        // Reset form
        setCurrentMember({
            first_name: '',
            last_name: '',
            role: '',
            description: ''
        });
        setEditingMemberId(null);
        setShowAddForm(false);
    };

    const handleCancel = () => {
        setCurrentMember({
            first_name: '',
            last_name: '',
            role: '',
            description: ''
        });
        setEditingMemberId(null);
        setShowAddForm(false);
    };

    const handleDeleteMember = (memberId: string) => {
        const member = teamMembers.find(m => m.id === memberId);
        if (member && onRemoveTeamMember) {
            onRemoveTeamMember(memberId);
            toast.success(`${member.first_name} ${member.last_name} removed from team`, {
                duration: 3000,
                position: 'top-right',
            });
        }
    };

    const isCurrentMemberValid = currentMember.first_name.trim() &&
        currentMember.last_name.trim() &&
        currentMember.role.trim() &&
        currentMember.description.trim();

    return (
        <>
            {/* Section Header */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        fontSize: '1rem'
                    }}
                >
                    Team Details
                </Typography>
                <Button
                    variant="text"
                    onClick={handleAddNewMember}
                    startIcon={<AddIcon />}
                    sx={{
                        color: '#043A66',
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                >
                    Add New Member
                </Button>
            </Box>

            {/* Team Member Form */}
            {showAddForm && (
                <Box sx={{
                    p: 3,
                    border: '1px solid #E0E0E0',
                    borderRadius: '8px',
                    backgroundColor: '#FAFAFA',
                    mb: 3
                }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
                        {editingMemberId ? 'Edit Team Member' : 'Add New Team Member'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
                        <Box sx={{ flex: 1 }}>
                            <FormInput
                                label="First Name"
                                value={currentMember.first_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleFieldChange('first_name', e.target.value)
                                }
                                required
                                placeholder="Enter first name"
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <FormInput
                                label="Last Name"
                                value={currentMember.last_name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleFieldChange('last_name', e.target.value)
                                }
                                required
                                placeholder="Enter last name"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ mb: 2.5 }}>
                        <FormSelect
                            label="Role"
                            options={ROLES}
                            value={currentMember.role}
                            onSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                handleFieldChange('role', (e.target as HTMLSelectElement).value)
                            }
                            required
                            placeholder="Select role"
                        />
                    </Box>

                    <Box sx={{ mb: 2.5 }}>
                        <FormTextArea
                            label="Brief Description"
                            value={currentMember.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                handleFieldChange('description', e.target.value)
                            }
                            required
                            placeholder="Brief description of the team member"
                        />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'flex-start'
                    }}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={!isCurrentMemberValid}
                            sx={{
                                backgroundColor: '#043A66',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 500,
                                px: 3,
                                py: 1,
                                borderRadius: '12px',
                                '&:hover': {
                                    backgroundColor: '#032A4D'
                                },
                                '&:disabled': {
                                    backgroundColor: '#E0E0E0',
                                    color: '#9E9E9E'
                                }
                            }}
                        >
                            {editingMemberId ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                borderColor: '#043A66',
                                color: '#043A66',
                                textTransform: 'none',
                                fontWeight: 500,
                                px: 3,
                                py: 1,
                                borderRadius: '12px',
                                '&:hover': {
                                    borderColor: '#032A4D',
                                    backgroundColor: '#F5F5F5'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Display Saved Team Members */}
            {teamMembers.length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary
                            }}
                        >
                            Team Members ({teamMembers.length})
                        </Typography>
                    </Box>
                    {teamMembers.map((member, index) => (
                        <Box
                            key={`${member.id}-${index}`}
                            sx={{
                                p: 2,
                                border: '1px solid #E0E0E0',
                                borderRadius: '6px',
                                mb: 1,
                                backgroundColor: 'white',
                                position: 'relative'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                display: 'flex',
                                gap: 1
                            }}>
                                <Button
                                    variant="text"
                                    onClick={() => handleEditMember(member.id)}
                                    startIcon={<EditIcon />}
                                    sx={{
                                        minWidth: 'auto',
                                        p: 0.5,
                                        color: '#043A66',
                                        fontSize: '0.75rem',
                                        textTransform: 'none',
                                        '&:hover': {
                                            backgroundColor: '#E3F2FD'
                                        }
                                    }}
                                >
                                    Edit
                                </Button>
                                {onRemoveTeamMember && (
                                    <Button
                                        variant="text"
                                        onClick={() => handleDeleteMember(member.id)}
                                        startIcon={<DeleteIcon />}
                                        sx={{
                                            minWidth: 'auto',
                                            p: 0.5,
                                            color: '#FF4444',
                                            fontSize: '0.75rem',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#FFE6E6'
                                            }
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, pr: 12 }}>
                                {member.first_name} {member.last_name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                {member.role}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#333' }}>
                                {member.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </>
    );
};
