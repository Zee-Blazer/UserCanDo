import { FC } from "react";

interface TanHeaderProps {
  table: any;
}

const TanHeader: FC<TanHeaderProps> = ({ table }) => {
  return (
    <thead className="bg-[#b3b3b31c] bg-opacity-50 p-3 mx-2 border-[1px]">
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr className="" key={headerGroup.id}>
          {headerGroup.headers.map((header: any, index: number) => (
            <th
              className="text-left whitespace-nowrap font-medium text-gray_5"
              key={index}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="p-3">{header.column.columnDef.header}</div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TanHeader;
