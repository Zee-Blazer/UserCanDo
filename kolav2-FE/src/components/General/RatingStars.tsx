import React from "react";
import { Typography } from "@material-tailwind/react";

interface RatingStarsProps {
	rating: number;
	totalRatings?: number;
	showCount?: boolean;
	size?: "sm" | "md" | "lg";
}

const RatingStars: React.FC<RatingStarsProps> = ({
	rating,
	totalRatings,
	showCount = false,
	size = "md",
}) => {
	const sizeClasses = {
		sm: "text-base",
		md: "text-lg",
		lg: "text-xl",
	};

	return (
		<div className='flex items-center'>
			<div className='flex'>
				{[...Array(5)].map((_, index) => (
					<span key={index} className={sizeClasses[size]}>
						{index < rating ? (
							<span className='text-[#B87C16]'>★</span>
						) : (
							<span className='text-gray-300'>★</span>
						)}
					</span>
				))}
			</div>

			{showCount && totalRatings !== undefined && (
				<Typography className='text-xs text-gray-600 ml-1'>
					({totalRatings})
				</Typography>
			)}
		</div>
	);
};

export default RatingStars;
