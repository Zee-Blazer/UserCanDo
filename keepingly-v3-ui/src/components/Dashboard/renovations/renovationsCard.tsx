import { SprayBottle } from "@phosphor-icons/react";
import React from "react";
import ListCard from "../overview/listCard";
import TanTable from "@/components/General/TanTable";
import { formatDate } from "@/utils/helpers";
import { Typography } from "@material-tailwind/react";
import RenovationTableAction from "./renovationTableAction";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";
import { RenovationListProps } from "@/types";

interface RenovationsCardProps {
	renovations: RenovationListProps[];
	isAppraiser: boolean;
}
const RenovationsCard = ({
	renovations,
	isAppraiser,
}: RenovationsCardProps) => {
	const { isRenovationsFetching } = useAppContext();
	const columns = [
		{
			header: "ID",
			cell: (item: any) => <span className=''>{item.row.index + 1}</span>,
		},
		{
			header: "Name",
			accessorKey: "renovation_name",
		},
		{
			header: "Start date",
			cell: ({ row }: any) => formatDate(row.original.start_date),
		},
		{
			header: "Completion date",
			cell: ({ row }: any) => formatDate(row.original.close_date),
		},
		{
			header: "Status",
			cell: ({ row }: any) => {
				const status = row.original.status;
				return (
					<Typography
						className={`${
							status === "ongoing" ? "text-yellow_pry" : "text-green_pry"
						} capitalize font-medium`}
					>
						{status}
					</Typography>
				);
			},
		},
		{
			header: <div className='p-2' />,
			id: "actions",
			cell: ({ row }: any) => {
				return (
					<RenovationTableAction
						isAppraiser={isAppraiser}
						id={row.original.id}
						item={row.original}
						isOngoing={row.original.status === "ongoing"}
					/>
				);
			},
		},
	];

	const renovationNames = Array.from(
		new Set(
			renovations
				.map((renovation) => renovation.renovation_name)
				.filter((name): name is string => name !== undefined)
		)
	);

	return (
		<ListCard
			title='Renovations'
			icon={<SprayBottle size={20} />}
			list={renovations}
			emptyStateText='No renovation have been made'
			loadingState={isRenovationsFetching}
		>
			<TanTable
				showSearch={false}
				data={renovations}
				columnData={columns}
				hidePaging
				filterList={renovationNames}
			/>
		</ListCard>
	);
};

export default RenovationsCard;
