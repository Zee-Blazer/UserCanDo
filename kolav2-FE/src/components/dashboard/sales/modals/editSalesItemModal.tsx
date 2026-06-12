import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogBody,
	DialogHeader,
	IconButton,
	Radio,
	Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form";
import CurrencyInput from "@/components/General/currencyInput";

interface EditSalesItemModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function EditSalesItemModal({
	isOpen,
	onClose,
}: EditSalesItemModalProps) {
	const [itemType, setItemType] = useState<"case" | "pieces">("case");
	const [quantity, setQuantity] = useState(1);

	return (
		<Dialog
			animate={{
				mount: { scale: 1, y: 0 },
				unmount: { scale: 0.9, y: -100 },
			}}
			size='md'
			open={isOpen}
			handler={onClose}
			className='relative p-5'
		>
			<DialogHeader className='relative m-0 block'>
				<Typography className='text-xl font-medium'>
					Add/Edit Sale Item
				</Typography>
				<IconButton
					variant='text'
					className='!absolute right-3.5 top-3.5'
					onClick={onClose}
				>
					<X className='h-5 w-5' />
				</IconButton>
			</DialogHeader>
			<DialogBody className='space-y-6'>
				<div className='flex gap-5 items-center'>
					<label className='font-normal text-black text-sm'>
						Select Inventory
					</label>
					<Radio crossOrigin='' name='type' label='Agent Stock' />
					<Radio crossOrigin='' name='type' label='Business Stock' />
				</div>
				<div className='space-y-5'>
					<div className='flex space-x-20'>
						<label className='text-sm font-medium text-[#101828] self-center'>
							Product
						</label>
						<div className='w-full'>
							<FormSelect
								options={["Racy Ventures"]}
								placeholder='Select Product'
								className='w-full'
								paddingY='3'
							/>
						</div>
					</div>
					<div className='flex items-center gap-[2.5em]'>
						<label className='text-sm text-black font-normal w-24'>Item</label>
						<div className='flex rounded-md overflow-hidden border border-gray-300'>
							<button
								type='button'
								onClick={() => setItemType("case")}
								className={`px-6 py-1.5 ${
									itemType === "case"
										? "bg-[#0A0F1E] text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
							>
								Case
							</button>
							<button
								type='button'
								onClick={() => setItemType("pieces")}
								className={`px-6 py-1.5 ${
									itemType === "pieces"
										? "bg-[#0A0F1E] text-white"
										: "bg-white text-gray-700 hover:bg-gray-50"
								}`}
							>
								Pieces
							</button>
						</div>
					</div>

					<div className='flex mb-3 items-center gap-[2.8em]'>
						<label className='text-sm text-black font-normal w-24'>
							Quantity
						</label>
						<div className='flex gap-3 items-center'>
							<button
								onClick={() => setQuantity(Math.max(1, quantity - 1))}
								className='px-3 py-1 border rounded-md border-gray-300'
							>
								-
							</button>
							<input
								type='number'
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								className='w-16 px-3 py-1 border rounded-md border-gray-300 text-center'
							/>
							<button
								onClick={() => setQuantity(quantity + 1)}
								className='px-3 py-1 border rounded-r rounded-md border-gray-300'
							>
								+
							</button>
						</div>
					</div>

					<CurrencyInput
						label='Unit Price'
						labelGap='gap-[2.3em]'
						onChange={(value) => {}}
					/>

					<CurrencyInput
						label='Total Price'
						labelGap='gap-[2.3em]'
						onChange={(value) => {}}
					/>
				</div>
				<div className='flex justify-center'>
					<Button className='bg-[#002147] text-white rounded-md py-3 w-3/4'>
						Save
					</Button>
				</div>
			</DialogBody>
		</Dialog>
	);
}

export default EditSalesItemModal;
