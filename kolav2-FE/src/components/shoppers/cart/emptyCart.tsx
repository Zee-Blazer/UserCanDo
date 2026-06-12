import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import cartBasket from "@/assets/images/cart_basket.png";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const EmptyCart = ({
	updateActiveTabIndex,
}: {
	updateActiveTabIndex: (value: number) => void;
}) => {
	return (
		<div className='flex flex-col items-center justify-center pt-20 md:w-1/2 lg:w-1/3 mx-auto text-center font-inter'>
			<Image
				src={cartBasket}
				alt='empty shopping basket'
				width={240}
				height={240}
				className=''
			/>
			<Typography className=' font-bold text-2xl'>
				Looks like your cart is empty
			</Typography>
			<Typography className=''>
				Looks like your haven't added anything to your cart yet. Add items to
				get started
			</Typography>
			<Link href={ROUTES.shopperHome}>
				<Button
					className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4 disabled:text-[#474A4E]`}
				>
					Start Shopping
				</Button>
			</Link>
		</div>
	);
};

export default EmptyCart;
