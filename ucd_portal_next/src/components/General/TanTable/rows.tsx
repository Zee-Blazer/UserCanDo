import { flexRender } from "@tanstack/react-table";
import { FC, MouseEvent } from "react";

interface TanRowsProps {
	table: any;
	onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
}

const TanRows: FC<TanRowsProps> = ({ table, onClick }) => {
	return (
		<tbody>
			{table.getRowModel().rows.map((row: any, index: number) => (
				<tr
					className={`${index % 2 !== 0 ? "" : ""} `}
					key={index}
					onClick={onClick ? onClick : undefined}
				>
					{row.getVisibleCells().map((cell: any, index: number) => (
						<td
							className=''
							key={index}
							//@ts-ignore
							w={cell.column.getSize()}
						>
							<div className='truncate-text whitespace-nowrap dark:border-[#FFFFFF0A] border-[1px] border-transparent p-3 m-2 rounded-md'>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export default TanRows;
