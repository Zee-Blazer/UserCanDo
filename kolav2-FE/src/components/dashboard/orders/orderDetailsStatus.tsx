"use client";

import { Typography } from "@material-tailwind/react";
import { useDashboardSelector } from '@/Redux/selectors';
import { formatDate } from '@/utils/helpers';

interface Props {
    currentStatus?: string;
}

const OrderDetailsStatus = ({ currentStatus }: Props) => {
    const { activeOrderStatus } = useDashboardSelector();

    // If no order data, show placeholder
    if (!activeOrderStatus) {
        return (
            <div>
                <Typography className="uppercase text-base font-inter font-bold mb-4">
                    DETAILS
                </Typography>
                <div className="border border-[#DEDFE0] rounded p-6">
                    <Typography className="text-gray-500 text-center">
                        No order details available
                    </Typography>
                </div>
            </div>
        );
    }

    const orderDetails = [
        { 
            label: "Customer", 
            value: activeOrderStatus.customer_name || "N/A" 
        },
        { 
            label: "Supplier", 
            value: activeOrderStatus.supplier_name || "N/A" 
        },
        { 
            label: "Agent", 
            value: activeOrderStatus.sales_agent_name || "N/A" 
        },
        {
            label: "Date ordered",
            value: activeOrderStatus.created_at ? formatDate(activeOrderStatus.created_at) : "N/A",
            showChangeLink: true,
        },
        {
            label: "Order type",
            value: activeOrderStatus.sale_type || "N/A",
            isTag: true,
        },
        { 
            label: "Payment method", 
            value: activeOrderStatus.payment_mode || "N/A" 
        },
        { 
            label: "Due Date", 
            value: activeOrderStatus.due_date ? formatDate(activeOrderStatus.due_date) : "N/A" 
        },
        { 
            label: "Delivery Address", 
            value: activeOrderStatus.delivery_address || "N/A" 
        },
        {
            label: "Delivery date",
            value: activeOrderStatus.delivery_date ? formatDate(activeOrderStatus.delivery_date) : "N/A",
            showChangeLink: true,
        },
    ];

    return (
        <div>
            <Typography className="uppercase text-base font-inter font-bold mb-4">
                DETAILS
            </Typography>

            <div className="border border-[#DEDFE0] rounded p-6">
                {orderDetails.map((item, index) => (
                    <div key={index} className="flex items-center justify-between my-2">
                    <Typography className="text-[#7B8086] text-base font-inter">
                        {item.label}
                    </Typography>

                    <Typography
                        className={`text-base font-inter ${
                        item.isTag
                            ? "text-[#027A48] bg-[#ECFDF3] py-1 px-2 rounded font-medium"
                            : "text-black"
                        }`}
                    >
                        {item.value}
                        {item.showChangeLink && (
                        <span className="text-[#003366] text-sm font-bold ml-2 underline cursor-pointer hover:opacity-65 transition">
                            Change date
                        </span>
                        )}
                    </Typography>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderDetailsStatus;
