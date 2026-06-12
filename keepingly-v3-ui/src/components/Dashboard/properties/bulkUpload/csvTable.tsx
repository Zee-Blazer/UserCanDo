import TanTable from "@/components/General/TanTable";
import React from "react";

const CsvTable = ({ allRows }: { allRows: any[] }) => {
	const columns = [
		{ header: "SN", cell: (item: any) => <span>{item.row.index + 1}</span> },
		{
			header: "Address",
			accessorKey: "address",
		},

		{
			header: "City",
			accessorKey: "city",
		},
		{
			header: "State",
			accessorKey: "state",
		},
		{
			header: "Zip Code",
			accessorKey: "zipcode",
		},
		{
			header: "First name",
			accessorKey: "first_name",
		},
		{
			header: "Middle name",
			accessorKey: "middle_name",
		},
		{
			header: "Last name",
			accessorKey: "last_name",
		},
		{
			header: "Email Address",
			accessorKey: "email",
		},
		{
			header: "Phone number",
			accessorKey: "phone_number",
		},
		{
			header: "Mobile number",
			accessorKey: "mobile_number",
		},
		// {
		// 	header: "Folder name",
		// 	accessorKey: "folder_name",
		// },
	];
	return <TanTable hidePaging data={allRows} columnData={columns} />;
};

export default CsvTable;
