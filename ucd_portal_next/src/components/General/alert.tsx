import { Alert } from "@material-tailwind/react";
import { Ban } from "lucide-react";

function Icon() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='currentColor'
			className='h-6 w-6'
		>
			<path
				fillRule='evenodd'
				d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
				clipRule='evenodd'
			/>
		</svg>
	);
}

interface AlertProps {
	msg: string;
	type: "success" | "error";
}

export const showAlert = ({ msg, type }: AlertProps) => {
	return (
		<Alert
			icon={type === "success" ? <Icon /> : <Ban />}
			className={`${
				type === "success"
					? "text-green_pry border-green_pry bg-green_pry"
					: "text-red_pry border-red_pry bg-red_pry"
			} rounded-none border-l-4 font-medium bg-opacity-10`}
		>
			{msg}
		</Alert>
	);
};
