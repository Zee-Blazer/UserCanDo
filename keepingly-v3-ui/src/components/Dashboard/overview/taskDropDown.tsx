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
	Money,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { TaskCheckCompProps } from "@/types";
import UploadDocumentModal from "../documents/uploadDocumentModal";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import AddChecklistExpenseModal from "./addExpenceChecklist";

const TaskDropdown = ({
	isCompleted,
	property_id,
	task_id,
	type,
	category,
	subCategory,
}: TaskCheckCompProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { getChecklists, loadOverView } = useAppContext();
	const [file, setFile] = useState<File | null>(null);
	const [isDocModalOpen, setIsDocModalOpen] = useState(false);
	const {
		isSuccess: isDocUplaoded,
		loading: isDocUploading,
		postRequest: uploadDocReq,
	} = usePostRequest();

	const uploadDoc = async () => {
		const payload = {
			property_id,
			task_id,
			check_list_file: file,
			category,
			sub_category: subCategory,
		};
		const formData = new FormData();
		for (const key in payload) {
			//@ts-ignore
			formData.append(key, payload[key]);
		}
		await uploadDocReq("/mark_check_list", formData);
	};

	useEffect(() => {
		if (isDocUplaoded) {
			getChecklists({});
			loadOverView();
		}
	}, [isDocUplaoded]);

	return (
		<>
			<Popover placement='bottom-end'>
				<PopoverHandler>
					<div className='flex items-center justify-center'>
						<DotsThreeVertical className='mt-2 cursor-pointer' size={18} />
					</div>
				</PopoverHandler>
				<PopoverContent className='w-68 dark:bg-black bg-white border-none flex flex-col'>
					{type === "Document upload checklist" ? (
						<>
							<Button
								variant='text'
								onClick={() => setIsDocModalOpen(true)}
								disabled={isCompleted}
								className='flex items-center gap-2 cursor-pointer normal-case border-none text-left text-gray_5 dark:text-gray_3'
							>
								<CloudArrowUp size={20} />
								<Typography className='normal-case border-none'>
									Upload document
								</Typography>
							</Button>
							<Link href={ROUTES.documents}>
								<Button
									variant='text'
									className='flex items-center gap-2 text-gray_5 dark:text-gray_3 cursor-pointer text-left'
								>
									<Eye size={20} />
									<Typography className='normal-case'>
										View Documents
									</Typography>
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href={ROUTES.expenses}>
								<Button
									variant='text'
									className='flex items-center gap-2 text-gray_5 dark:text-gray_3 cursor-pointer text-left'
								>
									<Eye size={20} />
									<Typography className='normal-case'>View Expenses</Typography>
								</Button>
							</Link>
							<Button
								variant='text'
								onClick={() => setIsModalOpen(true)}
								className='flex items-center gap-2 cursor-pointer normal-case border-none text-left text-gray_5 dark:text-gray_3'
							>
								<Money size={20} />
								<Typography className='normal-case border-none'>
									Add Expense
								</Typography>
							</Button>
						</>
					)}
				</PopoverContent>
			</Popover>

			<AddChecklistExpenseModal
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				open={isModalOpen}
				callback={() => {
					getChecklists({});
					loadOverView();
				}}
				category='Maintenance and Repairs'
				task_id={task_id}
			/>

			<UploadDocumentModal
				category={category || ""}
				subCategory={subCategory || ""}
				closeModal={() => setIsDocModalOpen(false)}
				handleOpen={() => setIsDocModalOpen(!isDocModalOpen)}
				handleUpload={uploadDoc}
				open={isDocModalOpen}
				setFile={setFile}
				file={file}
				type='document'
				disabled
				disableSubCategory
				loading={isDocUploading}
			/>
		</>
	);
};

export default TaskDropdown;
