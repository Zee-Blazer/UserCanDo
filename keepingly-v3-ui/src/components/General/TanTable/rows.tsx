import { flexRender } from "@tanstack/react-table";
import { FC, MouseEvent } from "react";

interface TanRowsProps {
	table: any;
	onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
	border?: boolean
}

const TanRows: FC<TanRowsProps> = ({ table, onClick, border }) => {
	return (
		<tbody>
			{table.getRowModel().rows.map((row: any, index: number) => (
				<tr
					className={`${index % 2 !== 0 ? "" : ""} ${ border && "border-t border-t-borderLight" } `}
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
							<div className='truncate-text whitespace-nowrap dark:border-[#FFFFFF0A] border-[1px] border-transparent p-3 m-2 rounded-md dark:text-gray_3 text-gray_5'>
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
