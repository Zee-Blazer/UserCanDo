import { colors } from "@/constants/colors";
import { CalendarDays } from "lucide-react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFilterProps {
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date | null) => void;
	setEndDate: (date: Date | null) => void;
	onDateChange: (start: Date | null, end: Date | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
	startDate,
	endDate,
	setStartDate,
	setEndDate,
	onDateChange,
}) => {
	const handleStartDateChange = (date: Date | null) => {
		setStartDate(date);
		onDateChange(date, endDate);
	};

	const handleEndDateChange = (date: Date | null) => {
		setEndDate(date);
		onDateChange(startDate, date);
	};

	return (
		<div className="flex gap-2 bg-white rounded-md border-[1px] border-gray_2 p-2 cursor-pointer">
			<CalendarDays size={20} color={colors.gray_4} />
			<DatePicker
				selected={startDate}
				onChange={handleStartDateChange}
				selectsStart
				startDate={startDate}
				endDate={endDate}
				placeholderText="Start Date"
				className="custom-datepicker w-[80px] text-sm cursor-pointer"
			/>
			<span>-</span>
			<DatePicker
				selected={endDate}
				onChange={handleEndDateChange}
				selectsEnd
				startDate={startDate}
				endDate={endDate}
				placeholderText="End Date"
				className="custom-datepicker w-[80px] text-sm cursor-pointer"
			/>
		</div>
	);
};

export default DateFilter;
