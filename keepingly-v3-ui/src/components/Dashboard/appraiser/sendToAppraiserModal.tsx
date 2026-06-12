import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AppraiserFormProps, DocProps, ModalProps } from "@/types";
import { X } from "lucide-react";
import { FormInput } from "@/components/General/form";
import FormTextArea from "@/components/General/form/textArea";
import { User } from "@phosphor-icons/react";
import { EmailIcon } from "@/assets/icons";
import { useDashboardSelector } from "@/Redux/selectors";
import usePostRequest from "@/api/hooks/usePost";

interface ConfirmRestoreModalProps extends ModalProps {
	docName?: string;
	type: "single" | "many";
	docs?: DocProps[];
	id?: string;
}
const SendToAppraiserModal = ({
	open,
	handleOpen,
	closeModal,
	action,
	docName,
	type,
	docs,
	id,
}: ConfirmRestoreModalProps) => {
	const [formData, setFormData] = useState<AppraiserFormProps | null>(null);
	const { activeProperty } = useDashboardSelector();
	const { postRequest, isSuccess, loading } = usePostRequest();
	const ids = docs?.map((doc) => doc.id);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendToAppraisal = async () =>
		await postRequest("/appraiser", {
			...formData,
			documents: type === "single" ? [id] : ids,
			property_id: activeProperty?.id,
		});

	useEffect(() => {
		if (isSuccess) {
			closeModal();
		}
	}, [isSuccess]);

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black flex gap-4'
			size={type === "many" ? "lg" : "md"}
		>
			{type === "many" && (
				<div className='w-[30%] flex flex-col gap-2'>
					{docs?.map((doc, index) => {
						return (
							<Typography
								key={index}
								className='text-sm bg-lightBg dark:text-gray_3 text-gray_5 dark:bg-darkBg p-2 '
							>
								{doc.name}
							</Typography>
						);
					})}
				</div>
			)}

			<div>
				<div className='flex items-center justify-between mb-4'>
					<Typography
						className='text-black dark:text-white  font-medium text-center'
						variant='h5'
					>
						Send for appraisal
					</Typography>
					<X className='cursor-pointer  ' onClick={closeModal} />
				</div>
				{type === "single" ? (
					<Typography className='text-black dark:text-white'>
						To send {docName} for appraisal, fill in the required fields.
					</Typography>
				) : (
					<Typography className='text-black dark:text-white'>
						Fill in the required fields.
					</Typography>
				)}

				<form action='' className='flex flex-col gap-3 mt-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
						<FormInput
							placeholder="Appraiser's first name"
							icon={<User />}
							required
							name='name'
							value={formData?.name}
							onChange={handleChange}
						/>
						<FormInput
							placeholder="Appraiser's last name"
							icon={<User />}
							required
							name='last_name'
							value={formData?.last_name}
							onChange={handleChange}
						/>
					</div>
					<FormInput
						placeholder="Appraiser's email address"
						type='email'
						icon={<EmailIcon />}
						required
						name='email'
						value={formData?.email}
						onChange={handleChange}
					/>
					<FormTextArea
						placeholder='Add comment'
						name='comments'
						value={formData?.comments}
						onChange={handleChange}
					/>
					<div className='flex justify-end gap-4'>
						<Button
							variant='text'
							className='mt-4 text-pry lowercase first-letter:capitalize'
							onClick={closeModal}
						>
							Cancel
						</Button>
						<Button
							variant='outlined'
							type='submit'
							className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md text-white'
							onClick={sendToAppraisal}
							loading={loading}
						>
							Send document
						</Button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default SendToAppraiserModal;
