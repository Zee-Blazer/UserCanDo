import { useState, ChangeEvent } from "react";
import CheckoutRadioInput from "./checkoutRadioInput";
import { Typography, Button } from "@material-tailwind/react";
import { CreditCard, Wallet, Plus } from "@phosphor-icons/react";
import Image from "next/image";
import visaIcon from "@/assets/images/visaIcon.png";
import phoneOutline from "@/assets/images/phone_outline.svg";

const PaymentMethodsSection = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setSelectedPaymentMethod(event.target.value);
	}

	return (
		<div>
			<Typography className='font-semibold'>PAYMENT METHOD</Typography>
			<hr className='border-[#D2D5DA] bg-[#D2D5DA] mt-3 mb-4' />

			<Typography className='font-semibold text sm pb-2'>
				Pay with card
			</Typography>
			<div className='flex flex-col gap-y-3'>
				<label
					className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
						selectedPaymentMethod === "visa_card_one"
							? "bg-[#FEFAF4] border-[#FFD68F]"
							: "bg-[#F9FAFB] border-[#F1F1F1]"
					}`}
				>
					<div>
						<div className='flex gap-x-2 items-start pb-2'>
							<CreditCard />
							<Typography className='text-sm font-semibold'>
								Visa card
							</Typography>
							<Image src={visaIcon} alt='Visa Icon' width={20} height={16} />
						</div>
						<Typography className='text-[#6D7280]  text-sm ml-6'>
							**** **** **** 1234
						</Typography>
					</div>
					<CheckoutRadioInput
						value='visa_card_one'
						selected={selectedPaymentMethod}
						onChange={handleChange}
					/>
				</label>
				<Button
					variant='text'
					className='normal-case px-0 flex items-center gap-x-2'
				>
					<Plus color='#007AF5' size={20} />{" "}
					<Typography className='text-[#007AF5] font-semibold text-sm'>
						Add new card
					</Typography>
				</Button>
			</div>

			<Typography className='font-semibold text sm pb-2 pt-4'>
				Others
			</Typography>
			<div className='flex flex-col gap-y-3'>
				<label
					className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
						selectedPaymentMethod === "mobile_money"
							? "bg-[#FEFAF4] border-[#FFD68F]"
							: "bg-[#F9FAFB] border-[#F1F1F1]"
					}`}
				>
					<div>
						<div className='flex gap-x-2 items-start pb-2'>
							<Image
								src={phoneOutline}
								alt='phone outine'
								width={12}
								height={17}
							/>
							<Typography className='text-sm font-semibold'>
								Mobile Money
							</Typography>
						</div>
						<Typography className='text-[#6D7280]  text-xs font-semibold ml-5'>
							Pay with mobile money
						</Typography>
					</div>
					<CheckoutRadioInput
						value='mobile_money'
						selected={selectedPaymentMethod}
						onChange={handleChange}
					/>
				</label>

				<label
					className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
						selectedPaymentMethod === "pay_cash"
							? "bg-[#FEFAF4] border-[#FFD68F]"
							: "bg-[#F9FAFB] border-[#F1F1F1]"
					}`}
				>
					<div>
						<div className='flex gap-x-2 items-start pb-2'>
							<Wallet size={20} />
							<Typography className='text-sm font-semibold'>Cash</Typography>
						</div>
						<Typography className='text-[#6D7280]  text-xs font-semibold ml-7'>
							Pay cash on delivery
						</Typography>
					</div>
					<CheckoutRadioInput
						value='pay_cash'
						selected={selectedPaymentMethod}
						onChange={handleChange}
					/>
				</label>
				<label
					className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
						selectedPaymentMethod === "pay_cash"
							? "bg-[#FEFAF4] border-[#FFD68F]"
							: "bg-[#F9FAFB] border-[#F1F1F1]"
					}`}
				>
					<div>
						<div className='flex gap-x-2 items-start pb-2'>
							<Wallet size={20} />
							<Typography className='text-sm font-semibold'>
								Bank transfer
							</Typography>
						</div>
						<Typography className='text-[#6D7280]  text-xs font-semibold ml-7'>
							Pay cash on delivery
						</Typography>
					</div>
					<CheckoutRadioInput
						value='pay_cash'
						selected={selectedPaymentMethod}
						onChange={handleChange}
					/>
				</label>
			</div>
		</div>
	);
};

export default PaymentMethodsSection;
