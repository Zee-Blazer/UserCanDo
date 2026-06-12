import { Button, Typography } from "@material-tailwind/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";
interface QuickActionBtnProps {
	icon: ReactNode;
	text: string;
	url: string;
}
const QuickActionBtn = ({ icon, text, url }: QuickActionBtnProps) => {
	return (
		<Link href={url}>
			<Button className='flex items-center justify-between w-full mt-4 dark:bg-darkBg bg-lightBg text-black dark:text-white'>
				<div className='flex gap-2 items-center'>
					{icon}
					<Typography className='lowercase first-letter:capitalize text-base'>
						{text}
					</Typography>
				</div>
				<ChevronRight size={16} />
			</Button>
		</Link>
	);
};

export default QuickActionBtn;
