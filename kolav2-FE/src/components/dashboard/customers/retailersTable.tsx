import { SortIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterCustomerState } from "./modals/filterCustomerModal";
import { UIGuard } from "@/components/guards/roleGuard";

const RetailersTable = ({
  handleDeleteModal,
  handleEditModal,
  handleFilterModal,
  filters,
}: {
  handleDeleteModal: (row: any) => void;
  handleEditModal: (row: any) => void;
  handleFilterModal: () => void;
  filters: FilterCustomerState;
}) => {
  const { loadCustomersData, isCusomtersLoading } = useDash();
  const { customers } = useDashboardSelector();

  const [filteredRetailers, setFilteredRetailers] = useState<
    CreateCustomerProps[]
  >([]);

  useEffect(() => {
    loadCustomersData();
  }, [loadCustomersData]);

  useEffect(() => {
    if (customers) {
      const retailers = customers?.filter(
        (customer) =>
          customer.customer_business_type &&
          Array.isArray(customer.customer_business_type) &&
          customer.customer_business_type.some((type) =>
            type.toLowerCase().includes("retailer")
          )
      );

      const filtered = retailers.filter((customer) => {
        return (
          (!filters.customerName ||
            (customer.customer_name?.toLowerCase() || "").includes(
              filters.customerName.toLowerCase()
            )) &&
          (!filters.phoneNumber ||
            (customer.customer_phone || "").includes(filters.phoneNumber)) &&
          (!filters.location ||
            (customer.location?.toLowerCase() || "").includes(
              filters.location.toLowerCase()
            )) &&
          (!filters.country || customer.country === filters.country) &&
          (!filters.region || customer.region === filters.region)
        );
      });

      setFilteredRetailers(filtered);
    }
  }, [filters, customers]);

  const columns = [
    {
      header: "#",
      cell: (item: { row: { index: number } }) => (
        <span>#{item.row.index + 1}</span>
      ),
    },
    {
      header: "Name",
      accessorKey: "customer_name",
    },
    {
      header: "Business Type",
      accessorKey: "customer_business_type",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.customer_business_type
              ? row.original.customer_business_type
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Phone Number",
      accessorKey: "customer_phone",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.customer_phone ? row.original.customer_phone : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.country ? row.original.country : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Region",
      accessorKey: "region",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.region ? row.original.region : "N/A"}
          </span>
        );
      },
    },
    {
      header: "City",
      accessorKey: "city",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.city ? row.original.city : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Address",
      accessorKey: "customer_address",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.customer_address
              ? row.original.customer_address
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }: { row: { original: CreateCustomerProps } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.location ? row.original.location : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "customers",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-3">
            <UIGuard permission="VIEW_CUSTOMER_INFO">
              <button
                title="Edit Customer"
                onClick={() => handleEditModal(row)}
              >
                <Pencil size={18} className="text-[#667085]" />
              </button>
            </UIGuard>
            <UIGuard permission="DELETE_CUSTOMER">
              <button
                type="button"
                onClick={() => handleDeleteModal(row)}
                aria-label="Delete Item"
              >
                <Trash2 size={18} />
              </button>
            </UIGuard>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={filteredRetailers}
        showSearch
        length={5}
        loadingState={isCusomtersLoading}
        showSortFilter
        sortOptions={[
          {
            key: "customer_name",
            label: "Sort by Name",
            icon: <SortIcon />,
            type: "string",
            defaultDirection: "asc",
          },
        ]}
        customFilterButton={handleFilterModal}
      />
    </div>
  );
};

export default RetailersTable;
