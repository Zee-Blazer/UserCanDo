import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import {
	DotsThreeVertical,
	DownloadSimple,
	Eye,
	PaperPlaneTilt,
	PencilSimple,
	TrashSimple,
	X,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import DeleteDocModal from "./deleteDocModal";
import RenameDocModal from "./renameModal";
import ViewModal from "./viewModal";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import useFetch from "@/api/hooks/useFetch";
import SendToAppraiserModal from "../appraiser/sendToAppraiserModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { Spinner } from "react-activity";

const DocumentCardDropdown = ({
	docType,
	showAppraisalBtn,
	url,
	id,
	callBack,
	docName,
	isPhoto,
	isAppraiserEdge,
	is_appraiser_document,
	isVideo,
}: {
	docType: string;
	showAppraisalBtn?: boolean;
	url: string;
	id: string;
	docName: string;
	callBack: () => void;
	isPhoto: boolean;
	isAppraiserEdge?: boolean;
	is_appraiser_document?: boolean;
	isVideo?: boolean;
}) => {
	const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isViewModalShown, setIsViewModalShown] = useState(false);
	const [newDocName, setNewDocName] = useState(docName);
	const [isAppraiserModalOpen, setIsAppraiserModalOpen] = useState(false);
	const { activeProperty } = useDashboardSelector();
	const { getDocuments, getAppraiserDocuments } = useAppContext();

	const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setNewDocName(e.target.value);

	const {
		isSuccess: isDeleteSuccess,
		loading: isDeleting,
		postRequest: deleteRequest,
	} = usePostRequest();

	const {
		isSuccess: isSent,
		loading: isSending,
		postRequest: sendReq,
	} = usePostRequest();

	const { getBin } = useAppContext();

	const {
		isSuccess: isRenamed,
		postRequest: renameRequest,
		loading: isRenaming,
	} = usePostRequest();

	const {
		isSuccess: isDocFetched,
		fetchRequest: fetchDocReq,
		loading: isDocFetching,
		data,
	} = useFetch();

	const deleteDoc = async () => await deleteRequest("/delete_item", { id });

	const renameDoc = async () =>
		await renameRequest("/rename_document", {
			document_id: id,
			name: newDocName,
		});
	const sendToAppraiserEdge = async () =>
		await sendReq("/mark_appraiser", {
			document_id: id,
			property_id: activeProperty?.id,
		});

	useEffect(() => {
		if (isDeleteSuccess) {
			setIsDeleteModalOpen(false);
			getBin();
			callBack();
		}
	}, [isDeleteSuccess]);

	useEffect(() => {
		if (isRenamed) {
			setIsRenameModalOpen(false);
			callBack();
			setNewDocName("");
		}
	}, [isRenamed]);

	useEffect(() => {
		if (isSent) {
			getDocuments();
			getAppraiserDocuments();
		}
	}, [isSent]);

	return (
		<>
			<Popover placement='bottom-end'>
				<PopoverHandler>
					<DotsThreeVertical className='mt-2 cursor-pointer' size={18} />
				</PopoverHandler>
				<PopoverContent className='w-68 dark:bg-black bg-white border-none flex flex-col'>
					<Button
						variant='text'
						className='flex items-center gap-2 text-gray_5 dark:text-gray_3 cursor-pointer text-left'
						onClick={() => setIsViewModalShown(true)}
						loading={isDocFetching}
					>
						<Eye size={20} />
						<Typography className='lowercase first-letter:capitalize'>
							View {isPhoto ? "Image" : isVideo ? "Video" : docType}
						</Typography>
					</Button>
					{!isAppraiserEdge && (
						<Button
							variant='text'
							className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
							onClick={() => setIsRenameModalOpen(true)}
						>
							<PencilSimple size={20} />
							<Typography className='lowercase first-letter:capitalize border-none'>
								Rename
							</Typography>
						</Button>
					)}

					<a href={url}>
						<Button
							variant='text'
							className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
							// onClick={() => setIsSuspendModalOpen(true)}
						>
							<DownloadSimple size={20} />
							<Typography className='lowercase first-letter:capitalize border-none'>
								Download to device
							</Typography>
						</Button>
					</a>

					{showAppraisalBtn && !is_appraiser_document && (
						<Button
							variant='text'
							disabled={isSending}
							className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
							onClick={sendToAppraiserEdge}
						>
							{isSending ? <Spinner /> : <PaperPlaneTilt size={20} />}

							<Typography className='normal-case border-none'>
								Send to Appraiser&apos;s edge
							</Typography>
						</Button>
					)}
					{isAppraiserEdge && (
						<Button
							variant='text'
							className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
							disabled={isSending}
							onClick={sendToAppraiserEdge}
						>
							{isSending ? <Spinner /> : <X size={20} />}

							<Typography className='lowercase first-letter:capitalize border-none'>
								Remove from Appraiser&apos;s edge
							</Typography>
						</Button>
					)}
					{!isAppraiserEdge && (
						<Button
							variant='text'
							className='flex items-center gap-2 text-pry cursor-pointer lowercase first-letter:capitalize border-none text-left'
							onClick={() => setIsDeleteModalOpen(true)}
						>
							<TrashSimple size={20} />
							<Typography className='lowercase first-letter:capitalize'>
								Delete
							</Typography>
						</Button>
					)}
				</PopoverContent>
			</Popover>

			<DeleteDocModal
				closeModal={() => setIsDeleteModalOpen(false)}
				handleOpen={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
				open={isDeleteModalOpen}
				action={deleteDoc}
				loading={isDeleting}
			/>
			<RenameDocModal
				closeModal={() => setIsRenameModalOpen(false)}
				handleOpen={() => setIsRenameModalOpen(!isRenameModalOpen)}
				open={isRenameModalOpen}
				action={renameDoc}
				loading={isRenaming}
				docName={newDocName}
				handleChange={handleDocNameChange}
			/>
			<ViewModal
				closeModal={() => setIsViewModalShown(false)}
				handleOpen={() => setIsViewModalShown(!isViewModalShown)}
				open={isViewModalShown}
				type={docType}
				url={url}
				isPhoto={isPhoto}
				id={id}
				isVideo={isVideo}
			/>
			<SendToAppraiserModal
				open={isAppraiserModalOpen}
				closeModal={() => setIsAppraiserModalOpen(false)}
				handleOpen={() => setIsAppraiserModalOpen(!isAppraiserModalOpen)}
				docName={docName}
				id={id}
				action={() => {}}
				type='single'
			/>
		</>
	);
};

export default DocumentCardDropdown;
