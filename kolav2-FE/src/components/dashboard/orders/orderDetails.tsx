import { Pencil } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Button, Typography } from "@material-tailwind/react";
import { X } from "lucide-react";
import React from "react";

interface OrderDetailsProps {
  orderData: any;
  onClose: () => void;
  onEditOrder?: (data: any) => void;
}

const OrderDetails = ({
  orderData,
  onClose,
  onEditOrder,
}: OrderDetailsProps) => {
  const columns = [
    {
      header: "Product Name",
      accessorKey: "product_name",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Price (GHS)",
      accessorKey: "unit_price",
    },
    {
      header: "Total Amount (GHS)",
      accessorKey: "total_price",
    },
  ];

  const productsData = orderData?.products || [];

  const handleEditClick = () => {
    if (onEditOrder && orderData) {
      onEditOrder(orderData);
      onClose();
    }
  };

  return (
    <main>
      <section className="flex bg-[#F8F9FA] gap-2  -mx-12 py-5 px-10  justify-between">
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Customer Name
          </Typography>
          <div className="flex flex-col">
            <Typography variant="h4" className="font-semibold">
              {orderData?.customer_name || "N/A"}
            </Typography>
            <div className="flex items-center gap-3">
              <Typography className="text-gray_4">
                {orderData?.customer_phone_number}
              </Typography>
              <div className="bg-[#F1F0F7] rounded-lg px-2 py-1 text-[#6941C6]">
                <Typography className="font-medium">
                  {orderData?.payment_mode}
                </Typography>
              </div>
              <div className="text-[#027A48] px-2 py-1 rounded-lg bg-[#EEF5F3]">
                <Typography className="font-medium">
                  {orderData?.payment_mode}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Number of Products
          </Typography>
          <Typography variant="h4" className="font-semibold">
            {orderData?.products?.length || 0}
          </Typography>
        </div>
        <div className="flex gap-3 flex-col">
          <Typography className="font-normal text-gray_4">
            Total Order Value
          </Typography>
          <Typography variant="h4" className="font-semibold">
            GHS {orderData?.total_sale_amount || "N/A"}
          </Typography>
        </div>
      </section>
      <section className="py-10 mb-14">
        <TanTable columnData={columns} data={productsData} length={5} />
      </section>
      <section>
        <div className="flex justify-end gap-3">
          <Button
            onClick={handleEditClick}
            className="bg-[#003366] items-center px-2 flex gap-2 normal-case"
          >
            <Pencil />
            <Typography className="text-white font-normal text-sm">
              Edit Order
            </Typography>
          </Button>
          <Button
            className="bg-[#F8FAFB] flex gap-2 px-2 shadow-sm items-center border-2 border-[#D0D5DD66] normal-case"
            onClick={onClose}
          >
            <X color="#003366" size={20} />
            <Typography className="text-[#344054] font-normal text-sm">
              Close
            </Typography>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
