import { Money } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import ListCard from "../overview/listCard";
import { formatCurrency } from "@/utils/currencyFormatter";
import TanTable from "@/components/General/TanTable";
import { Button } from "@material-tailwind/react";
import { formatDate } from "@/utils/helpers";
import { inventoryData } from "@/types/mockData";
import RenovationTableAction from "../renovations/renovationTableAction";
import InventoryTableAction from "./inventoryTableAction";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

interface InventoryCardProps {
	showAddBtn?: boolean;
	btnAction?: () => void;
}

const InventoryCard = ({ showAddBtn, btnAction }: InventoryCardProps) => {
	const { inventories } = useDashboardSelector();
	const { isDocUploaded, getInventory } = useAppContext();

	useEffect(() => {
		if (isDocUploaded) {
			getInventory();
		}
	}, [isDocUploaded]);

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
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Purchase date",
			accessorKey: "description",
			cell: ({ row }: any) => formatDate(row.original.purchase_date),
		},
		{
			header: "Purchase price",
			cell: ({ row }: any) => formatCurrency(row.original.purchase_price),
		},
		{
			header: "Quantity",
			accessorKey: "quantity",
		},
		{
			header: <div className='p-2' />,
			id: "actions",
			cell: ({ row }: any) => {
				return <InventoryTableAction id={row.original.id} />;
			},
		},
	];

	return (
		<ListCard
			title='Inventory'
			icon={<Money size={20} />}
			list={inventories}
			emptyStateText='No items in inventory'
			headerRight={
				<Button
					variant='outlined'
					className={`border-pry text-pry lowercase first-letter:capitalize ${
						!showAddBtn && "hidden"
					}`}
					onClick={btnAction}
				>
					Add an inventory
				</Button>
			}
		>
			<TanTable
				showSearch
				data={inventories}
				columnData={columns}
				hidePaging
				hideFilter
			/>
		</ListCard>
	);
};

export default InventoryCard;
