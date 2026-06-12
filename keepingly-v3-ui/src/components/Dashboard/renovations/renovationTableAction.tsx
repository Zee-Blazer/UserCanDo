import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import {
  Check,
  DotsThreeVertical,
  Eye,
  Images,
  PaperPlaneTilt,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import PopoverButton from "../../General/popOverButton";
import { colors } from "@/constants/colors";
import Link from "next/link";
import AddExpenseModal from "./addExpenseModal";
import DeleteRenovationModal from "./deleteRenovation";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";
import CompleteRenovationModal from "./completeRenovationsModal";
import RenovationsModal from "./renovationsModal";
import { RenovationListProps, RenovationFormProps } from "@/types";
import { X } from "lucide-react";

const RenovationTableAction = ({
  id,
  isOngoing,
  isAppraiser,
  item,
}: {
  id: string;
  isOngoing: boolean;
  isAppraiser: boolean;
  item: RenovationListProps;
}) => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentRenovationData, setCurrentRenovationData] =
    useState<RenovationFormProps | null>(null);

  const { activeProperty } = useDashboardSelector();
  const { getRenovations, getBin, getAppraisalRenovations } = useAppContext();

  const {
    isSuccess: isSent,
    loading: isSending,
    postRequest: sendReq,
  } = usePostRequest();

  const {
    isSuccess: isRenovationDeleted,
    loading: isRenovationDeleting,
    postRequest: deleteRenovationHandler,
  } = usePostRequest();

  const {
    isSuccess: isRenovationCompleted,
    loading: isRenovationCompleting,
    postRequest: completeRenovationHandler,
  } = usePostRequest();

  const deleteRenovation = async () =>
    await deleteRenovationHandler(`/delete_item`, {
      // property_id: activeProperty?.id,
      id,
    });

  const completeRenovation = async () =>
    await completeRenovationHandler("/complete_renovations", {
      renovation_id: id,
    });

  useEffect(() => {
    if (isRenovationDeleted) {
      setIsDeleteModalOpen(false);
      getRenovations();
      getBin();
    }
  }, [isRenovationDeleted]);

  useEffect(() => {
    if (isRenovationCompleted) {
      setIsCompleteModalOpen(false);
      getRenovations();
    }
  }, [isRenovationCompleted]);

  const sendToAppraiserEdge = async () =>
    await sendReq("/mark_appraiser", {
      renovation_id: id,
      property_id: activeProperty?.id,
    });

  useEffect(() => {
    if (isSent) {
      getRenovations();
      getAppraisalRenovations();
    }
  }, [isSent]);

  const openEditModal = () => {
    setCurrentRenovationData({});
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Popover placement="bottom-end">
        <PopoverHandler>
          <DotsThreeVertical
            className="mt-2 cursor-pointer mx-auto"
            size={18}
          />
        </PopoverHandler>
        <PopoverContent className="w-68 dark:bg-black bg-white border-none flex flex-col">
          <Link href={`/renovations?id=${id}`}>
            <PopoverButton icon={Eye} label="View renovation" />
          </Link>

          <PopoverButton
            icon={PencilSimple}
            label="Edit renovation"
            onClick={() => setIsEditModalOpen(true)}
          />

          {isOngoing && (
            <PopoverButton
              icon={Check}
              label="Mark as complete"
              onClick={() => setIsCompleteModalOpen(true)}
            />
          )}

          <PopoverButton
            icon={Plus}
            label="Add expense"
            onClick={() => setIsExpenseModalOpen(true)}
          />
          {!item?.is_appraiser_renovation && !isAppraiser && (
            <PopoverButton
              icon={PaperPlaneTilt}
              label={"Send to Appraiser's edge"}
              onClick={sendToAppraiserEdge}
              disabled={isSending}
              loading={isSending}
            />
          )}

          {isAppraiser && (
            <PopoverButton
              icon={X}
              label={"Remove from Appraiser's edge"}
              onClick={sendToAppraiserEdge}
              disabled={isSending}
              loading={isSending}
            />
          )}
          {/* <PopoverButton
						icon={Images}
						label='Attach photos'
						// onClick={() => setIsSuspendModalOpen(true)}
					/> */}
          <PopoverButton
            icon={TrashSimple}
            label="Delete"
            onClick={() => setIsDeleteModalOpen(true)}
            color={colors.pry}
          />
        </PopoverContent>
      </Popover>

      <RenovationsModal
        open={isEditModalOpen}
        handleOpen={() => setIsEditModalOpen(!isEditModalOpen)}
        closeModal={() => setIsEditModalOpen(false)}
        renovationId={id}
        initialData={item} // Pass the current renovation details
        callback={getRenovations}
      />

      <DeleteRenovationModal
        closeModal={() => setIsDeleteModalOpen(false)}
        handleOpen={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        open={isDeleteModalOpen}
        action={deleteRenovation}
        loading={isRenovationDeleting}
      />
      <CompleteRenovationModal
        closeModal={() => setIsCompleteModalOpen(false)}
        handleOpen={() => setIsCompleteModalOpen(!isCompleteModalOpen)}
        open={isCompleteModalOpen}
        action={completeRenovation}
        loading={isRenovationCompleting}
      />
      <AddExpenseModal
        closeModal={() => setIsExpenseModalOpen(false)}
        handleOpen={() => setIsExpenseModalOpen(!isExpenseModalOpen)}
        open={isExpenseModalOpen}
        renovationId={id}
        callback={getRenovations}
        category="Renovation and Improvement"
      />
    </>
  );
};

export default RenovationTableAction;
