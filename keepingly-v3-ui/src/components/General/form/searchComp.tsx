import React from "react";
import { Search } from "lucide-react";
import { colors } from "@/constants/colors";

const SearchComp = () => {
	return (
		<div className='relative text-sm'>
			<input
				type='text'
				placeholder='Search by product'
				className='rounded-full pl-12 block p-3 text-grayMd bg-transparent border-2'
			/>
			<span className='flex items-center justify-center absolute top-0 left-0 h-full px-3'>
				<Search size={22} color={colors.gray_2} />
			</span>
		</div>
	);
};

export default SearchComp;
