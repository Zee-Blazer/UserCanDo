import MenuDropdown from "@/components/General/menuDropdown";
import { Typography } from "@material-tailwind/react";
import { Spinner } from "react-activity";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAgent } from "@/context/agentContext";
import { TrashModal } from "@/components/General/trashModal";

const History = ({ requests, loading }: any) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const { handleDeleteSpecificRequestHistory, isDeletingRequestHistory } =
    useAgent();

  const handleOrderClick = (orderId: string) => {
    router.push(`/agent/request/${orderId}`);
  };

  const handleDelete = async () => {
    if (requestToDelete) {
      try {
        await handleDeleteSpecificRequestHistory(requestToDelete);
        setIsDeleteDialogOpen(false);
        setRequestToDelete(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const getStatusColorStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          backgroundColor: "#6099FF1A",
          color: "#6099FF",
        };
      case "approved":
        return {
          backgroundColor: "#2AB40E0D",
          color: "#2AB40E",
        };
      case "delivered":
        return {
          backgroundColor: "#DBEAFE",
          color: "#1D4ED8",
        };
      case "declined":
        return {
          backgroundColor: "#F84B1B0D",
          color: "#F84B1B",
        };
      default:
        return {
          backgroundColor: "#6099FF1A",
          color: "#6099FF",
        };
    }
  };

  return (
    <>
      <div className="bg-white w-full max-w-3xl mx-auto px-10 py-8 rounded-t-3xl shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] mt-8">
        <Typography className="text-center text-[#5A5555] text-base sm:text-lg font-semibold mb-2 sm:mb-4 lg:mb-6">
          Request History
        </Typography>

       {
        loading ?
        <Spinner className="h-8 w-8 mx-auto my-10" />
        :
          <section className="space-y-3 sm:space-y-4 max-h-[420px] overflow-auto no-scrollbar lg:space-y-5">
            {requests.map((order: any) => (
              <div
                key={order.request_id}
                className="group hover:bg-[#F2F4F7] transition-colors duration-200 bg-white rounded-xl p-3 sm:p-4 border border-transparent cursor-pointer"
                onClick={() => handleOrderClick(order.request_id)}
              >
                <div className="hidden lg:flex lg:justify-between lg:items-center">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* <div className="bg-[#CCD6E0] rounded-full p-2 flex-shrink-0">
                      <Typography className="text-pry2 text-xl font-medium w-6 h-6 flex items-center justify-center">
                        {getInitials(order.request_number)}
                      </Typography>
                    </div> */}

                    <div className="min-w-0 flex-1">
                      <Typography className="text-[#787486] font-Poppins font-medium text-base">
                        {order.request_number} |{" "}
                        <span className="font-bold">{order.request_date}</span>
                      </Typography>
                      <Typography className="text-[#787486]/80 text-sm">
                        {order.products.length} item
                        {order.products.length > 1 ? "(s)" : ""}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div
                      className="w-44 px-3 py-2 rounded-md text-xs font-semibold capitalize text-center"
                      style={getStatusColorStyle(order.status)}
                    >
                      {order.status}
                    </div>

                    <MenuDropdown
                      onDelete={() => {
                        setRequestToDelete(order.request_id);
                        setIsDeleteDialogOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
       }
      </div>

      <TrashModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        header="Delete Request From List"
        title="You can't undo this action."
        returnText="Cancel"
        proceedText="Delete"
        warning={true}
        loading={isDeletingRequestHistory}
        onDelete={handleDelete}
      />
    </>
  );
};

export const getStatusColorStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return {
        backgroundColor: "#6099FF1A",
        color: "#6099FF",
      };
    case "approved":
      return {
        backgroundColor: "#2AB40E0D",
        color: "#2AB40E",
      };
    case "delivered":
      return {
        backgroundColor: "#DBEAFE",
        color: "#1D4ED8",
      };
    case "declined":
      return {
        backgroundColor: "#F84B1B0D",
        color: "#F84B1B",
      };
    default:
      return {
        backgroundColor: "#6099FF1A",
        color: "#6099FF",
      };
  }
};

export default History;
