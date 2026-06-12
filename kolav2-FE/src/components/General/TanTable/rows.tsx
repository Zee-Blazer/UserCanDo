import { flexRender } from "@tanstack/react-table";
import { FC, MouseEvent } from "react";

interface TanRowsProps {
  table: any;
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
  onRowClick?: (row: any) => void;
  highlightedRowId?: string;
}

const TanRows: FC<TanRowsProps> = ({
  table,
  onClick,
  onRowClick,
  highlightedRowId,
}) => {
  return (
    <tbody className="">
      {table.getRowModel().rows.map((row: any, index: number) => {
        const isHighlighted =
          highlightedRowId && row.original.id === highlightedRowId;

        return (
          <tr
            className={`${index % 2 !== 0 ? "" : ""} border ${
              isHighlighted ? "highlighted-row" : ""
            }`}
            key={index}
            data-row-id={row.original.id}
            onClick={onClick ? onClick : undefined}
          >
            {row.getVisibleCells().map((cell: any, cellIndex: number) => (
              <td
                onClick={() => onRowClick && onRowClick(row)}
                className=""
                key={cellIndex}
                //@ts-ignore
                w={cell.column.getSize()}
              >
                <div className="truncate-text whitespace-nowrap p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        );
      })}

      <style jsx>{`
        .highlighted-row {
          background-color: #fef3c7;
        }
      `}</style>
    </tbody>
  );
};

export default TanRows;
