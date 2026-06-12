"use client";

import ConfirmDeleteModal from "@/components/admin/home/ConfirmDeleteModal";
import PaginationControls from "@/components/admin/home/PaginationControls";
import TanTable from "@/components/General/TanTable";
import { useDeleteTeamMemberMutation, useGetTeamsRecordQuery } from "@/queries/adminApi";
import { setActiveTeamMemberData } from "@/Redux/features/adminSlice";
import { generateTeamsPDF } from "@/utils/pdfGenerator";
import { Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

const roleOptions = ['Super Admin', 'KYC Officer', 'Admin', 'Content Management'];

const AdminTerms = () => {

    const dispatch = useDispatch();

    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const page = pagination.pageIndex + 1;
    const page_size = pagination.pageSize;
    const [searchTerm, setSearchTerm] = useState('');
    const [role, setRole] = useState('');

    const { data: teamsData, refetch: refreshTeamData, isLoading: loadingTeamsData } = useGetTeamsRecordQuery({
        page,
        page_size,
        ...(searchTerm && { search: searchTerm }),
        ...(role && { role })
    }, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    useEffect(() => {
        if (teamsData?.page && teamsData.page !== page) {
            setPagination(prev => ({ ...prev, pageIndex: teamsData.page - 1 }));
        }
    }, [teamsData?.page, page]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== '') {
                setPagination(prev => ({ ...prev, pageIndex: 0 }));
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    useEffect(() => {
        if (role) {
            setPagination(prev => ({ ...prev, pageIndex: 0 }));
        }
    }, [role]);

    const [deleteTeamMember, { isLoading: deleting }] = useDeleteTeamMemberMutation();

    const router = useRouter();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);

    const tableData = teamsData?.payload || [];

    const filteredData = tableData;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        setRole('');
        setSearchTerm('');
        setPagination({ pageIndex: 0, pageSize: 10 });
        await refreshTeamData();
        setIsRefreshing(false);
    };

    const handleSearch = (searchValue: string) => {
        setSearchTerm(searchValue);
    };

    const handleRoleChange = (selectedRole: string) => {
        setRole(selectedRole);
    };

    const handleDownloadPDF = () => {
        try {
            if (!filteredData || filteredData.length === 0) {
                toast.error('No data available to download');
                return;
            }

            generateTeamsPDF(filteredData);
            toast.success('PDF downloaded successfully');
        } catch (error) {
            toast.error('Failed to generate PDF. Please try again.');
        }
    };

    const handleDeleteTeamMember = async (teamMember: any) => {
        if (!teamMember || !teamMember.id) {
            toast.error('Invalid team member data');
            return;
        }
        try {
            await deleteTeamMember({ id: teamMember.id }).unwrap();
            toast.success('Team member deleted successfully');
            setSelectedTeamMember(null);
            setDeleteModalOpen(false);
        } catch (error) {
            toast.error('Failed to delete team member');
        }
    }

    const columns = [
        { header: 'NAME', accessorKey: 'full_name' },
        { header: 'EMAIL', accessorKey: 'email' },
        {
            id: 'role',
            header: 'ROLE',
            cell: ({ row }: any) => {
                const role = row.original.role.toUpperCase();
                const colorClass =
                    role === 'SUPER ADMIN' ? 'bg-[#2B443E] text-white'
                        : role === 'KYC OFFICER' ? 'bg-[#B85C06] text-white'
                            : role === 'ADMIN' ? 'bg-[#043A66] text-white'
                                : role === 'CONTENT MANAGEMENT' ? 'bg-[#FFB121] text-white'
                                    : '';
                return (
                    <span className={`px-3 py-2 rounded-lg text-xs font-semibold ${colorClass}`}>{role.toUpperCase()}</span>
                );
            }
        },
        {
            id: 'action',
            header: 'ACTION',
            cell: ({ row }: any) => (
                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/teams/details"
                        className="cursor-pointer flex items-center gap-1 bg-[#F1F1F1] text-[#1E1E1E] px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
                        onClick={() => dispatch(setActiveTeamMemberData(row.original))}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232a2.5 2.5 0 1 1 3.536 3.536L8.5 19.036l-4 1 1-4 11.732-11.804Z" /></svg>
                        Edit
                    </Link>
                    <span
                        className="cursor-pointer flex items-center justify-center bg-[#B3261E14] rounded-lg w-8 h-8"
                        onClick={() => {
                            setSelectedTeamMember(row.original);
                            setDeleteModalOpen(true);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <g>
                                <path fill="#B3261E" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
                                <rect x="14" y="15" width="6" height="2" rx="1" fill="#B3261E" />
                            </g>
                        </svg>
                    </span>
                </div>
            ),
        },
    ];

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            <TanTable
                columnData={columns}
                data={filteredData}
                showHeader={{
                    title: "Team Management",
                    subTitle: "View and manage team members",
                    search: {
                        value: searchTerm,
                        onChange: handleSearch
                    },
                    btnTxt: "Download",
                    addUser: { label: "Add User", onClick: () => router.push("/admin/teams/invite") },
                    noColor: true,
                }}
                loadingState={loadingTeamsData || isRefreshing}
                onClick={handleDownloadPDF}
                selectFilters={[
                    {
                        label: 'Role',
                        field: 'role',
                        options: roleOptions,
                        value: role,
                        onChange: handleRoleChange,
                    },
                ]}
                onRefresh={handleRefresh}
                refreshStatus={isRefreshing}
                hidePaging={true}
                length={page_size}
            />

            <PaginationControls
                page={page}
                pageSize={page_size}
                listingData={teamsData}
                onPageChange={(newPageIndex) => setPagination(prev => ({ ...prev, pageIndex: newPageIndex }))}
            />

            <ConfirmDeleteModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                item={selectedTeamMember}
                itemType="Team Member"
                onDelete={(teamMember) => handleDeleteTeamMember(teamMember)}
                loading={deleting}
            />
        </Box>
    );
}

export default AdminTerms;
