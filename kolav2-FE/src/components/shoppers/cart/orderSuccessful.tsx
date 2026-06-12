import Image from "next/image";
import orderSuccessful from "@/assets/images/order_successful.png";
import { Typography, Button } from "@material-tailwind/react";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const OrderSuccessful = () => {
	return (
		<div className='flex flex-col items-center justify-center pt-20 md:w-1/2 lg:w-1/3 mx-auto text-center font-inter'>
			<Image
				src={orderSuccessful}
				alt='a briefcase with a check mark on it'
				width={320}
				height={320}
			/>
			<Typography className=' font-bold text-2xl pt-8'>
				Order placed successfully!
			</Typography>
			<Typography className=''>
				We will keep you updated on delivery.
			</Typography>
			<Link href={ROUTES.shopperHome}>
				<Button
					className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4 disabled:text-[#474A4E]`}
					onClick={() => {}}
				>
					Continue Shopping
				</Button>
			</Link>
		</div>
	);
};

export default OrderSuccessful;
