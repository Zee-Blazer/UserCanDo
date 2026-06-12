import React, { useState, useEffect } from 'react';
import { Clock, Pen } from "lucide-react";
import { BinIcon, SortIcon } from "@/assets/svg";
import TanTable from '@/components/General/TanTable';
import { Typography } from '@material-tailwind/react';
import { useDispatch } from "react-redux";
import { setActiveOrderStatus } from "@/Redux/features/dashboardSlice";
import { ROUTES } from "@/constants/routes";
import { useRouter } from 'next/navigation';
import { useDashboardSelector } from '@/Redux/selectors';
import { useDash } from '@/context/dashboardContext';

interface NewOrdersUpdatedProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const NewOrdersUpdated = ({ onRefresh, isRefreshing }: NewOrdersUpdatedProps) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { pendingOrders } = useDashboardSelector();
  const { loadOrdersByStatus, isOrdersLoading, refreshAllOrdersData } = useDash();

  // Load pending orders on mount
  useEffect(() => {
    loadOrdersByStatus("pending");
  }, [loadOrdersByStatus]);

  // Listen for order status updates to refresh data
  useEffect(() => {
    const handleOrderStatusUpdate = async () => {
      try {
        await refreshAllOrdersData();
      } catch (error) {
        console.error('Error refreshing orders data:', error);
      }
    };

    window.addEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    
    return () => {
      window.removeEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    };
  }, [refreshAllOrdersData]);

  // Use real data from Redux store or fallback to mock data for testing
  const orders = pendingOrders && pendingOrders.length > 0 ? pendingOrders : [
    {
      id: 1,
      order_number: 'ORD-001',
      created_at: '2025-06-10T10:00:00Z',
      supplier_name: 'Fresh Produce Ltd.',
      customer_name: 'Jane Doe',
      sales_agent_name: 'Kofi Mensah',
      total_sale_amount: 1200.5,
      sale_type: 'Cash Sale',
      status: 'Awaiting Approval',
    },
    {
      id: 2,
      order_number: 'ORD-002',
      created_at: '2025-06-12T12:00:00Z',
      supplier_name: 'AgroMart Inc.',
      customer_name: 'John Smith',
      sales_agent_name: 'Ama Serwaa',
      total_sale_amount: 800,
      sale_type: 'Cash Sale',
      status: 'Awaiting Approval',
    },
    {
      id: 3,
      order_number: 'ORD-003',
      created_at: '2025-06-15T14:30:00Z',
      supplier_name: 'GreenFields Co.',
      customer_name: 'Abena K.',
      sales_agent_name: 'Yaw Boateng',
      total_sale_amount: 450.75,
      sale_type: 'Credit Sale',
      status: 'Awaiting Approval',
    },
  ];

  const columns = [
    {
      header: "Order",
      accessorKey: "order_number",
      cell: ({ row }: any) => (
        <Typography className='text-[#101828] font-inter text-sm'>{ row.original.order_number }</Typography>
      ),
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: ({ row }: any) => {
        const date = new Date(row.original.created_at);
        return <span className='text-[#6F6F6F] font-inter text-sm font-medium'>{date.toLocaleDateString()}</span>;
      },
    },
    {
      header: "Supplier",
      accessorKey: "supplier_name",
      cell: ({ row }: any) => (
        <Typography className='text-[#6F6F6F] font-inter text-sm font-medium'>{ row.original.order_number }</Typography>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
      cell: ({ row }: any) => (
        <Typography className='text-[#6F6F6F] font-inter text-sm font-medium'>{ row.original.order_number }</Typography>
      ),
    },
    {
      header: "Sales Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: any) => (
        <Typography className='text-[#6F6F6F] font-inter text-sm font-medium'>{ row.original.order_number }</Typography>
      ),
    },
    {
      header: "Total Cost",
      cell: ({ row }: any) => {
        return (
          <span className='text-[#6F6F6F] font-inter text-sm font-medium'>
            GHS {Number(row.original.total_sale_amount).toFixed(2)}
          </span>
        );
      },
    },
    {
      header: "Order Type",
      accessorKey: "sale_type",
      cell: ({ row }: any) => {
        const sale_type = row.original?.sale_type?.toLowerCase();
        const className =
          sale_type === "cash sale"
            ? "text-green-600 bg-[#ECFDF3]"
            : sale_type === "credit sale"
            ? "text-red-600 bg-[#FFF6ED]"
            : sale_type === "rejected"
            ? "text-yellow-600"
            : "text-gray-500";
        return <span className={`capitalize py-1 px-2 rounded ${className}`}>{sale_type}</span>;
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const status = row.original?.status?.toLowerCase();
        const className =
          status === "approved"
            ? "text-green-600 bg-[#ECFDF3]"
            : status === "pending"
            ? "text-yellow-600"
            : status === "cancelled"
            ? "text-red-600 bg-[#FFF6ED]"
            : status === "awaiting approval"
            ? "text-[#6941C6] bg-[#F0EBF9]"
            : status === "out for delivery"
            ? "text-[#DF7405] bg-[#FCECDC]"
            : status === "delivered"
            ? "text-[#365FB6] bg-[#D1E0FF]"
            : "text-gray-500";
        return <span className={`capitalize py-1 px-2 rounded ${className}`}>{status}</span>;
      },
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          {/* <UIGuard permission="UPDATE_PURCHASE_ORDER"> */}
            <button onClick={() => {
              dispatch(setActiveOrderStatus(row.original));
              router.push(ROUTES.orderStatus)
            }}>
              <Pen size={20} />
            </button>
          {/* </UIGuard> */}
          {/* <UIGuard permission="DELETE_PURCHASE_ORDER"> */}
            <div
              onClick={() => {}}
              className="cursor-pointer"
            >
              <BinIcon />
            </div>
          {/* </UIGuard> */}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {isRefreshing && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          Refreshing orders data...
        </div>
      )}
      <TanTable
        columnData={columns}
        data={orders}
        showSearch={true}
        showDateFilter={true}
        showBorder={true}
        loadingState={isOrdersLoading}
      />
    </div>
  );
};

export default NewOrdersUpdated;
