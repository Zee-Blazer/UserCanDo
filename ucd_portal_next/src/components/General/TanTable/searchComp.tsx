import React from "react";
import { SearchIcon } from "lucide-react";

interface SearchCompProps {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
	filterList?: string[];
	handleFilterChange?: (selectedFilter: string) => void;
}

const SearchComp: React.FC<SearchCompProps> = ({
	searchTerm,
	setSearchTerm,
	setPageIndex,
	filterList,
	handleFilterChange,
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setPageIndex && setPageIndex(1);
	};

	return (
		<div className='flex gap-3 my-3 relative w-full justify-between items-center'>
			<span className='absolute top-3 left-3'>
				<SearchIcon />
			</span>
			<input
				type='text'
				placeholder='Search'
				value={searchTerm}
				onChange={handleInputChange}
				className='rounded-md p-3 border-[1px] pl-12 w-full bg-transparent border-borderLight dark:border-borderDark'
			/>
			<select
				className='p-3 rounded-md bg-transparent border-[1px] border-borderLight dark:border-borderDark capitalize'
				onChange={(e) => {
					handleFilterChange && handleFilterChange(e.target.value);
				}}
			>
				<option value=''>All</option>
				{filterList?.map((item, index) => (
					<option key={index} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};

export default SearchComp;
