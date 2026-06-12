import { FolderSimpleUser } from "@phosphor-icons/react";
import React from "react";
import TanTable from "@/components/General/TanTable";
import { useAppContext } from "@/app/context";
import Loading from "@/components/General/loading";
import ListCard from "../overview/listCard";
import { useDashboardSelector } from "@/Redux/selectors";

const AppraiserCard = () => {
	const { isDeleting, isAppraiserUserFetching } = useAppContext();
	const { appraiserUsers } = useDashboardSelector();
	const columns = [
		{
			header: "ID",
			cell: (item: any) => <span className=''>{item.row.index + 1}</span>,
		},
		{
			header: "Name",
			accessorKey: "name",
		},
		{
			header: "Email address",
			accessorKey: "email",
		},
		{
			header: "Opened",
			cell: ({ row }: any) => {
				const isOpen = row.original.is_open ? "Yes" : "No";
				return (
					<span
						className={`${
							row.original.is_open ? "text-green-600" : "text-pry"
						}`}
					>
						{isOpen}
					</span>
				);
			},
		},
	];

	return (
		<ListCard
			title='Appraisers'
			icon={<FolderSimpleUser size={20} />}
			list={appraiserUsers ?? []}
			loadingState={isAppraiserUserFetching}
			emptyStateText='No appraiser added yet'
		>
			<TanTable
				showSearch
				data={appraiserUsers ?? []}
				columnData={columns}
				length={5}
			/>
			<Loading isLoading={isDeleting} />
		</ListCard>
	);
};

export default AppraiserCard;
