import TanTable from "@/components/General/TanTable";
import { TrashModal } from "@/components/General/trashModal";
import { TeamsData } from "@/utils/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { formatPhoneNumber } from "@/utils/helpers";
import { UIGuard } from "@/components/guards/roleGuard";

interface TeamsProps {
  onClick: () => void;
  onOpenEditModal: (data: TeamListProps) => void;
}

const TeamsTable = ({ onClick, onOpenEditModal }: TeamsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpenDialog: () => void = () => setIsDialogOpen(true);
  const handleCloseDialog: () => void = () => setIsDialogOpen(false);
  const { team, activeBusiness } = useDashboardSelector();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const {
    loadTeamData,
    handleDeleteTeamMember,
    isTeamDeleting,
    isTeamsLoading,
  } = useDash();

  useEffect(() => {
    loadTeamData();
  }, [loadTeamData]);

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteTeamMember(selectedRow, () => {
        handleCloseDialog();
        setSelectedRow(null);
      });
    }
  };

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phone Number",
      accessorKey: "phone_number",
      cell: ({ row }: any) => (
        <Typography className="text-[#667085] text-sm">
          {formatPhoneNumber(row.original?.phone_number)}
        </Typography>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded ${
            row.original.role === "Owner"
              ? "bg-purple-100 text-[#6941C6]"
              : "bg-green_pry text-green-700"
          } bg-opacity-10`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      header: "Options",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <UIGuard permission="DELETE_TEAM">
            <button>
              <Trash2
                onClick={() => {
                  handleOpenDialog();
                  setSelectedRow(row.original);
                }}
                size={20}
              />
            </button>
          </UIGuard>
          <UIGuard permission="UPDATE_TEAM">
            <button>
              <Pencil onClick={() => onOpenEditModal(row.original)} size={20} />
            </button>
          </UIGuard>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <header className="flex mb-6 justify-between items-center">
        <div className="flex flex-col gap-3">
          <Typography
            variant="h4"
            className="font-semibold items-center flex gap-2"
          >
            Kola Market Place
            <span className="text-[#6941C6] rounded-full font-normal text-sm bg-[#F7F5F6] py-1 px-3">
              2 Businessess
            </span>
          </Typography>

          <Typography variant="small" className="font-normal">
            Phone Number <u>+23488990046</u>
          </Typography>
        </div>
        <UIGuard permission="CREATE_TEAM">
          <Button
            onClick={onClick}
            className="px-5 flex items-center normal-case shadow-none border-[#D0D5DD66] border gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-white text-[#344054] hover:opacity-90"
          >
            <Plus className="text-black font-bold" />
            Add To Team
          </Button>
        </UIGuard>
      </header>
      <section>
        <Typography className="font-medium">Teams</Typography>
        <TanTable
          loadingState={isTeamsLoading}
          columnData={columns}
          data={team}
          length={5}
        />
      </section>
      <TrashModal
        isOpen={isDialogOpen}
        onClose={() => {
          handleCloseDialog();
          setSelectedRow(null);
        }}
        onDelete={confirmDelete}
        loading={isTeamDeleting}
        header="Remove Team Member"
        title="Are you sure you want to remove this team member?"
      />
    </div>
  );
};

export default TeamsTable;
