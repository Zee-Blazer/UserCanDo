import { flexRender } from "@tanstack/react-table";
import { FC, MouseEvent } from "react";

interface TanRowsProps {
  table: any;
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
  onRowClick?: (row: any) => void;
  rowBorderLine?: boolean;
  colBorderLine?: boolean;
}

const TanRows: FC<TanRowsProps> = ({ table, onClick, onRowClick, rowBorderLine, colBorderLine }) => {
  return (
    <tbody className="">
      {table.getRowModel().rows.map((row: any, index: number) => (
        <tr
          className={
            `${rowBorderLine ? "border border-gray-200" : ""}`
          }
          key={index}
        >
          {row.getVisibleCells().map((cell: any, index: number) => (
            <td
              onClick={() => onRowClick && onRowClick(row)}
              className={colBorderLine ? "border-l border-gray-200" : ""}
              key={index}
              //@ts-ignore
              w={cell.column.getSize()}
            >
              <div className="truncate-text whitespace-nowrap p-3">
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
