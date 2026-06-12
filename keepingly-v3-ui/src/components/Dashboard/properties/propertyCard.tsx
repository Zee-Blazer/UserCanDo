import LazyImage from "@/components/General/imageComp";
import { PropertyProps } from "@/types";
import { Typography } from "@material-tailwind/react";
import { ImageBroken } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

interface PropertyCardProps {
	item: PropertyProps;
}

const PropertyCard = ({ item }: PropertyCardProps) => {
	const { address, photos_videos_url, state, city, id, cover_photo_url } = item;
	const maxTextLength = 26;
	const coverImg =
		cover_photo_url?.[0]?.url || photos_videos_url?.[0]?.url || "";

	return (
		<div className='rounded-md overflow-hidden border border-borderLight flex flex-col flex-1'>
			<div className='relative w-full h-[240px] flex items-center justify-center bg-lightBg dark:bg-darkBg'>
				<LazyImage
					src={coverImg}
					alt='property'
					fill
					className='object-cover'
					fallbackSrc=''
				/>
			</div>

			<div className='p-3 flex flex-col flex-1'>
				<Typography className='font-bold'>
					{address && address.length > maxTextLength
						? `${address.slice(0, maxTextLength)}...`
						: address}
				</Typography>
				<Typography className='text-xs'>
					{city}, {state}
				</Typography>
				<div className='flex flex-1' />
				<Link
					href={`/properties?id=${id}`}
					className='text-pry p-0 lowercase first-letter:capitalize mt-2 text-left font-semibold'
				>
					View home
				</Link>
			</div>
		</div>
	);
};

export default PropertyCard;
