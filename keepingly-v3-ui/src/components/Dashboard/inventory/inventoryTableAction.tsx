import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import {
	CloudArrowUp,
	DotsThreeVertical,
	Eye,
	Images,
	PencilSimple,
	Plus,
	TrashSimple,
	Video,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import PopoverButton from "../../General/popOverButton";
import { colors } from "@/constants/colors";
import Link from "next/link";
import DeleteInventoryModal from "./deleteInventoryModal";
import UploadDocumentModal from "../documents/uploadDocumentModal";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import { useDashboardSelector } from "@/Redux/selectors";

interface InventoryTableActionProps {
	id: string;
}
const InventoryTableAction = ({ id }: InventoryTableActionProps) => {
	const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [type, setType] = useState("");
	const [category, setCategory] = useState("");
	const [subCategory, setSubCategory] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const { uploadDocument, isUplaoding, getInventory } = useAppContext();
	const { activeProperty } = useDashboardSelector();
	const { isSuccess, postRequest, loading } = usePostRequest();

	const uploadDoc = async () => {
		const payload = {
			file_type: type,
			category,
			sub_category: subCategory,
			property_id: activeProperty?.id,
			inventory_id: id,
			document_file: file,
		};
		await uploadDocument(payload);
	};

	const deleteInventory = async () =>
		await postRequest(`/delete_inventory`, { inventory_id: id });

	useEffect(() => {
		if (isSuccess) {
			setIsDeleteModalOpen(false);
			getInventory();
		}
	}, [isSuccess]);

	return (
		<>
			<Popover placement='bottom-end'>
				<PopoverHandler>
					<DotsThreeVertical
						className='mt-2 cursor-pointer mx-auto'
						size={18}
					/>
				</PopoverHandler>
				<PopoverContent className='w-68 dark:bg-black bg-white border-none flex flex-col'>
					<Link href={`/inventory?id=${id}`}>
						<PopoverButton icon={Eye} label='View inventory' />
					</Link>
					{/* <PopoverButton icon={PencilSimple} label='Edit' /> */}
					<PopoverButton
						icon={CloudArrowUp}
						label='Upload document'
						onClick={() => {
							setIsDocumentModalOpen(true);
							setType("document");
						}}
					/>
					<PopoverButton
						icon={Video}
						label='Upload photo/video'
						onClick={() => {
							setIsDocumentModalOpen(true);
							setType("photo/video");
						}}
					/>
					<PopoverButton
						icon={TrashSimple}
						label='Delete'
						onClick={() => setIsDeleteModalOpen(true)}
						color={colors.pry}
					/>
				</PopoverContent>
			</Popover>

			<DeleteInventoryModal
				closeModal={() => setIsDeleteModalOpen(false)}
				handleOpen={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
				open={isDeleteModalOpen}
				loading={loading}
				action={deleteInventory}
			/>

			<UploadDocumentModal
				closeModal={() => setIsDocumentModalOpen(false)}
				handleOpen={() => setIsDocumentModalOpen(!isDocumentModalOpen)}
				open={isDocumentModalOpen}
				type={type}
				category={category}
				subCategory={subCategory}
				setSubCategory={setSubCategory}
				setCategory={setCategory}
				handleUpload={uploadDoc}
				loading={isUplaoding}
				file={file}
				setFile={setFile}
			/>
		</>
	);
};

export default InventoryTableAction;
