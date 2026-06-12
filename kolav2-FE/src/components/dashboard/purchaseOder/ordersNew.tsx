import {mockPurchaseOrders } from "@/utils/mockData";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

const badgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "fully paid":
      return "bg-green-100 text-green-700";
    case "unpaid":
      return "bg-red-100 text-red-700";
    case "partially paid":
      return "bg-orange-100 text-orange-700";
    case "cash sale":
      return "bg-emerald-100 text-emerald-700";
    case "under review":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const paginatedOrders = mockPurchaseOrders.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Order #</th>
            <th>Request Date</th>
            <th>Supplier</th>
            <th>Customer</th>
            <th>PO Number</th>
            <th>Total Cost</th>
            <th>Delivery Date</th>
            <th>Approval Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order, idx) => (
            <tr key={order.id} className="border-b">
              <td className="py-2">{order.id}</td>
              <td>{order.requestDate}</td>
              <td>{order.supplier}</td>
              <td>{order.customer}</td>
              <td>{order.poNumber}</td>
              <td>{order.totalCost}</td>
              <td>{order.deliveryDate}</td>
              <td>
                <span className={`px-2 py-1 rounded-md text-xs ${badgeColor(order.approvalStatus)}`}>
                  {order.approvalStatus}
                </span>
              </td>
              <td>
                <span className={`px-2 py-1 rounded-md text-xs ${badgeColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </td>
              <td className="flex gap-2 py-2">
                <Pen size={16} className="cursor-pointer" />
                <Trash2 size={16} className="cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {[...Array(3)].map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant={currentPage === i + 1 ? "filled" : "text"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Orders;

