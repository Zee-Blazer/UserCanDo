
export interface TeamMember {
    id: string;
    first_name: string;
    last_name: string;
    role: string;
    description: string;
}

export interface TeamMemberFormData {
    first_name: string;
    last_name: string;
    role: string;
    description: string;
}

export interface TeamMembersResponse {
    is_success: boolean;
    payload: {
        listing_id?: string;
        business_id?: string;
        team: TeamMember[];
    };
    message: string;
}

export interface TeamMemberResponse {
    is_success: boolean;
    payload: TeamMember;
    message: string;
}

export interface DeleteTeamMemberResponse {
    is_success: boolean;
    payload: {
        removed_member_id: string;
    };
    message: string;
}

export const TEAM_ROLES = [
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
    'Staff',
    'Other'
] as const;

export type TeamRole = typeof TEAM_ROLES[number];
