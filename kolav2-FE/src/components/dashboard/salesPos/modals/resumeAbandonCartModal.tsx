import TanTable from "@/components/General/TanTable";
import { useDashboardSelector } from "@/Redux/selectors";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import ConfirmCartModal from "./ConfirmCartModal";
import { useDash } from "@/context/dashboardContext";
import { formatDate, formatTime } from "@/utils/helpers";

interface ResumeAbandonCartModalProps {
  open: boolean;
  onClose: () => void;
  handleOpenClearCart: () => void;
  currentCartItems: CartItem[];
  onRestoreCart: (items: CartItem[]) => void;
  onDiscountUpdate?: (type: string | null, value: number) => void;
  onCustomerSelected?: (customer: CreateCustomerProps) => void;
}

const ResumeAbandonCartModal = ({
  open,
  onClose,
  handleOpenClearCart,
  currentCartItems,
  onRestoreCart,
  onDiscountUpdate,
  onCustomerSelected,
}: ResumeAbandonCartModalProps) => {
  const { allAbandonedCart } = useDashboardSelector();
  const { loadAbandonedCartsData, loadAbandonedCart } = useDash();

  useEffect(() => {
    loadAbandonedCartsData();
  }, [loadAbandonedCartsData]);

  const [visibleTables, setVisibleTables] = useState<Record<string, boolean>>(
    {}
  );
  const [isRestoreCartOpen, setIsRestoreCartOpen] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState<string | null>(null);
  const [loadingCartId, setLoadingCartId] = useState<string | null>(null);

  const carts = Array.isArray(allAbandonedCart) ? allAbandonedCart : [];

  useEffect(() => {
    if (selectedCartId) {
      if (currentCartItems.length > 0) {
        setIsRestoreCartOpen(true);
      } else {
        handleConfirmRestore();
      }
    }
  }, [selectedCartId]);

  const toggleTableVisibility = (cartId: string) => {
    setVisibleTables((prev) => ({
      ...prev,
      [cartId]: !prev[cartId],
    }));
  };

  const tableData = (products: CartItem[]) =>
    products?.map((product, index) => ({
      id: index + 1,
      product: product?.product_name,
      quantity: product?.quantity,
      unitPrice: product?.unit_price,
      totalPrice: product?.total_price,
    })) || [];

  const handleConfirmRestore = async () => {
    if (!selectedCartId) return;

    setLoadingCartId(selectedCartId);

    const response = await loadAbandonedCart(selectedCartId);

    if (response && response.payload) {
      if (
        response?.payload?.customer_id &&
        response?.payload?.customer_name &&
        onCustomerSelected
      ) {
        const customerData: CreateCustomerProps = {
          id: response?.payload?.customer_id,
          customer_name: response?.payload?.customer_name,
        };

        onCustomerSelected(customerData);
      }

      if (
        response.payload.discount_type &&
        response.payload.discount_value &&
        onDiscountUpdate
      ) {
        const discountType = response?.payload?.discount_type;
        const discountValue = parseFloat(response?.payload.discount_value);
        onDiscountUpdate(discountType, discountValue);
      }

      if (response.payload.products) {
        const cartItems = response?.payload?.products?.map((product: any) => ({
          id: product?.product_id,
          product_name: product.product_name,
          product_retail_price: Number(product?.unit_price),
          quantity: product?.quantity,
          unit_price: Number(product?.unit_price),
          total_price: Number(product?.total_price),
        }));

        onRestoreCart(cartItems);
      }
    } else {
      console.error("No products found in the abandoned cart.");
    }

    setLoadingCartId(null);
    setIsRestoreCartOpen(false);
    onClose();
  };

  const handleRestoreButtonClick = (cartId: string) => {
    setSelectedCartId(cartId);
  };

  const columns = [
    {
      header: "No",
      accessorKey: "id",
    },
    {
      header: "Product",
      accessorKey: "product",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Unit Price",
      accessorKey: "unitPrice",
      cell: (info: any) => (
        <Typography variant="small" className="font-normal text-gray_4">
          GHS {Number(info?.getValue())?.toFixed(2)}
        </Typography>
      ),
    },
    {
      header: "Total",
      accessorKey: "totalPrice",
      cell: (info: any) => (
        <Typography variant="small" className="font-normal text-gray_4">
          GHS {Number(info?.getValue())?.toFixed(2)}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} handler={onClose} size="lg" className="p-4">
        <DialogHeader className="relative m-0 flex justify-between">
          <Typography className="text-xl font-medium">
            Resume Abandoned Cart
          </Typography>

          <Button
            onClick={handleOpenClearCart}
            disabled={carts?.length === 0}
            className={`w-[22%] normal-case text-sm text-pry2 font-normal border-none ${
              carts.length === 0
                ? "bg-[#F5AA29] text-black opacity-50"
                : "bg-[#F5AA29] !opacity-100"
            }`}
          >
            Clear All
          </Button>
        </DialogHeader>
        <DialogBody className="relative flex flex-col min-h-[400px] max-h-[60vh] overflow-y-auto">
          {carts.length === 0 ? (
            <div className="flex h-full">
              <Typography className="text-gray-500">
                No abandoned carts found
              </Typography>
            </div>
          ) : (
            carts?.map((cart, index) => (
              <div key={cart?.id} className="mb-6">
                <div className="flex lg:flex-row flex-col justify-start lg:items-center max-w-2xl lg:justify-between">
                  <div className="flex flex-col">
                    <section className="flex text-black gap-4 text-center">
                      <Typography>
                        {index + 1}. Customer: {cart?.customer_name}
                      </Typography>
                      <div className="mx-3">|</div>
                      <Typography className="font-medium text-lg">
                        GHS {cart?.total_sale_amount}
                      </Typography>
                    </section>
                    <Typography
                      variant="small"
                      className="text-gray_5 flex gap-2 font-normal ml-2"
                    >
                      <span>{formatDate(cart?.created_at)}</span>
                      <span>{formatTime(cart?.created_at)} </span>
                    </Typography>
                  </div>
                  <div className="flex gap-8 items-center">
                    <Button
                      onClick={() => handleRestoreButtonClick(cart?.id)}
                      variant="outlined"
                      className="border py-3 normal-case gap-4 flex items-center border-gray_2"
                      disabled={loadingCartId === cart?.id}
                    >
                      <RotateCcw
                        size={18}
                        className={
                          loadingCartId === cart?.id ? "animate-spin" : ""
                        }
                      />
                      <Typography className="font-medium text-gray_5">
                        Restore
                      </Typography>
                    </Button>
                    <div
                      onClick={() => toggleTableVisibility(cart?.id)}
                      className="cursor-pointer"
                    >
                      {visibleTables[cart?.id] ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  </div>
                </div>
                {visibleTables[cart?.id] && (
                  <div className="flex-grow mt-4">
                    <TanTable
                      columnData={columns}
                      data={tableData(cart?.products)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </DialogBody>
        <div className="p-4">
          <Button
            onClick={onClose}
            className="w-32 shadow-none border border-gray_2 font-normal bg-[#F8FAFB] normal-case text-sm text-pry2"
          >
            Cancel
          </Button>
        </div>
      </Dialog>

      <ConfirmCartModal
        open={isRestoreCartOpen}
        onClose={() => setIsRestoreCartOpen(false)}
        title="Restore Cart"
        description="This will replace your current"
        confirmButtonText="Restore"
        onConfirm={handleConfirmRestore}
        loading={loadingCartId !== null}
      />
    </>
  );
};

export default ResumeAbandonCartModal;
