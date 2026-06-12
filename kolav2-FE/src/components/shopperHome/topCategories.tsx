import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { BackIcon } from "@/assets/svg";
import defaultCategoryImage from "@/assets/images/cat1.png";
import { useShopper } from "@/context/shopperContext";
import { useShopperSelector } from "@/Redux/selectors";
import { Spinner } from "react-activity";
import { colors } from "@/constants/colors";

interface TopCategoriesProps {
	displayStyle?: "horizontal" | "grid";
}

const TopCategories: React.FC<TopCategoriesProps> = ({
	displayStyle = "horizontal",
}) => {
	const { categories } = useShopperSelector();
	const { isCategoriesLoading } = useShopper();

	if (isCategoriesLoading) {
		return (
			<div className='flex justify-center items-center h-[70vh]'>
				<Spinner color={colors.pry2} size={30} />
			</div>
		);
	}

	// Horizontal scrolling view (for homepage)
	if (displayStyle === "horizontal") {
		return (
			<div className='mb-8'>
				<div className='flex justify-between items-center mb-4'>
					<Typography className='font-semibold text-xl'>
						Top Categories
					</Typography>
					<Link
						href={ROUTES.allCategories}
						className='normal-case text-blue-500 p-0 font-medium text-sm'
					>
						View all
					</Link>
				</div>

				{/* Horizontal scrolling categories */}
				<div className='flex overflow-x-auto gap-4 pb-4 no-scrollbar'>
					{categories.map((category) => (
						<Link
							key={category.id}
							href={`/all-categories/${category.id}`}
							className='min-w-[100px] flex-shrink-0 cursor-pointer'
						>
							<div className='rounded-lg overflow-hidden bg-gray-100 mb-2 h-[100px] flex items-center justify-center'>
								<Image
									src={category.image_url || defaultCategoryImage}
									alt={category.category_name}
									className='object-cover w-full h-full'
									width={100}
									height={100}
								/>
							</div>
							<Typography className='text-center text-sm font-medium'>
								{category.category_name}
							</Typography>
						</Link>
					))}
				</div>

				<style jsx global>{`
					.no-scrollbar {
						-ms-overflow-style: none; /* IE and Edge */
						scrollbar-width: none; /* Firefox */
					}
					.no-scrollbar::-webkit-scrollbar {
						display: none; /* Chrome, Safari and Opera */
					}
				`}</style>
			</div>
		);
	}

	// Grid view (for all-categories page)
	return (
		<div className='mb-8'>
			<Link href={ROUTES.shopperHome} className='flex items-center gap-2  mb-6'>
				<BackIcon />{" "}
				<Typography className='font-semibold text-xl'>
					All Categories
				</Typography>
			</Link>

			{/* Responsive grid layout */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
				{categories.map((category) => (
					<Link
						key={category.id}
						href={`/all-categories/${category.id}`}
						className='cursor-pointer hover:shadow-md transition-shadow duration-200 rounded-lg p-2'
					>
						<div className='rounded-lg overflow-hidden bg-gray-100 mb-3 h-[120px] flex items-center justify-center'>
							<Image
								src={category.image_url || defaultCategoryImage}
								alt={category.category_name}
								className='object-cover w-full h-full'
								width={120}
								height={120}
							/>
						</div>
						<Typography className='text-center text-sm font-medium'>
							{category.category_name}
						</Typography>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TopCategories;
