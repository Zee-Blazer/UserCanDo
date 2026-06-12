import React from "react";
import { SearchIcon } from "lucide-react";

// Property Selector
import PropertySelector from "@/components/Dashboard/properties/propertySelector";

import { Typography, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SearchCompProps {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
	filterList?: string[];
	handleFilterChange?: (selectedFilter: string) => void;
	hideFilter?: boolean;
	propertySearch?: boolean;
}

const SearchComp: React.FC<SearchCompProps> = ({
	searchTerm,
	setSearchTerm,
	setPageIndex,
	filterList,
	handleFilterChange,
	hideFilter,
	propertySearch
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setPageIndex && setPageIndex(1);
	};
	const theme = useTheme();

	return (
		<div className='flex gap-3 my-3 relative w-full justify-between items-center'>
			<div className={`flex ${ propertySearch ? "w-4/6" : "w-full" }`}>
				<span className={`absolute top-3.5 ml-3`}>
					<SearchIcon />
				</span>
				<input
					type='text'
					placeholder='Search'
					value={searchTerm}
					onChange={handleInputChange}
					className={`rounded-md p-3 border-[1px]
				pl-12 w-full bg-transparent border-borderLight dark:border-borderDark`}
				/>
			</div>

			{
				propertySearch &&
				(
					<>
						<PropertySelector />
					</>
				)
			}

			{!hideFilter && (
				<Select
					defaultValue=''
					onChange={(e) => {
						handleFilterChange && handleFilterChange(e.target.value);
					}}
					variant='outlined'
					displayEmpty
					sx={{
						p: 0,
						borderRadius: "8px",
						bgcolor: "transparent",
						width: 194,
						color:
							theme.palette.mode === "dark"
								? theme.palette.grey[800]
								: theme.palette.grey[600],
						border: `1px solid ${
							theme.palette.mode === "dark"
								? theme.palette.grey[700]
								: theme.palette.grey[300]
						}`,
					}}
					className='p-0 rounded-md bg-transparent border-[1px] border-borderLight dark:border-borderDark capitalize'
				>
					<MenuItem value=''>All</MenuItem>
					{filterList?.map((item, index) => (
						<MenuItem key={index} value={item}>
							{item}
						</MenuItem>
					))}
				</Select>
			)}
		</div>
	);
};

export default SearchComp;
