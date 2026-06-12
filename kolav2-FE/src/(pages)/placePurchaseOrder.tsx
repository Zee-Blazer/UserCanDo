"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AddProductInfo from "@/components/dashboard/orders/addProductInfo";
import OrderCart from "@/components/dashboard/orders/orderCart";
import CustomerInformation from "@/components/dashboard/purchaseOder/customerInformation";
import SupplierInformation from "@/components/dashboard/purchaseOder/supplierInformation";
import ShippingInformation from "@/components/dashboard/purchaseOder/shippingInformation";
import { useDash } from "@/context/dashboardContext";
import { initialPurchaseOrderState } from "@/utils/initialStates";
import AddCheckout from "@/components/dashboard/purchaseOder/addCheckout";

interface CartItem {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  discountAmount: number;
  total: number;
  amount?: number;
  product_name?: string;
  product_retail_price?: number;
}

interface Section {
  title: string;
  Component: React.ComponentType<any>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  props: any;
}

const PlacePurchaseOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const {
    handleAddPurchaseOrder,
    handleUpdatePurchaseOrder,
    isPurchaseOrderCreating,
    isPurchaseOrderUpdating,
  } = useDash();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderCartOpen, setIsOrderCartOpen] = useState<boolean>(false);
  const [customerInformation, setCustomerInformation] = useState(false);
  const [supplierInformation, setSupplierInformation] = useState(false);
  const [shippingInformation, setShippingInformation] = useState(false);
  const [productInfo, setProductInfo] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editOrderId, setEditOrderId] = useState<string | null>(null);

  const [purchaseOrderData, setPurchaseOrderData] =
    useState<CreatePurchaseOrderProps>(initialPurchaseOrderState);

  useEffect(() => {
    if (mode === "edit") {
      const editData = localStorage.getItem("editOrderData");
      if (editData) {
        try {
          const orderData = JSON.parse(editData);
          setIsEditMode(true);
          setEditOrderId(orderData.po_number);

          setPurchaseOrderData({
            customer: orderData.customer,
            supplier: orderData.supplier,
            shipping_method: orderData.shipping_method,
            delivery_date: orderData.delivery_date,
            shipping_street_address: orderData.shipping_street_address,
            zip_code: orderData.zip_code,
            city: orderData.city,
            shipping_phone_number: orderData.shipping_phone_number,
            payment_method: orderData.payment_method,
            po_type: orderData.po_type,
            due_date: orderData.due_date,
            products: orderData.products,
          });

          const cartItems = orderData.products.map((product: any) => ({
            id: product.product_id,
            product: product.name,
            quantity: product.quantity,
            unit: product.item_type,
            price: parseFloat(product.unit_price),
            discount: 0,
            discountAmount: 0,
            total: parseFloat(product.total_price),
          }));
          setCart(cartItems);

          setCustomerInformation(true);
          setSupplierInformation(true);
          setShippingInformation(true);
          setProductInfo(true);
          setCheckout(true);
        } catch (error) {
          localStorage.removeItem("editOrderData");
          router.push("/dashboard/purchase-order");
        }
      } else {
        router.push("/dashboard/purchase-order");
      }
    } else {
      localStorage.removeItem("editOrderData");
    }
  }, [mode, router]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      return;
    };

    const cleanup = () => {
      const currentPath = window.location.pathname;
      if (!currentPath.includes("/dashboard/purchase-order/place-order")) {
        localStorage.removeItem("editOrderData");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cleanup();
    };
  }, []);

  const updateCustomerInfo = (
    field: keyof CustomerOrSupplier,
    value: string
  ) => {
    setPurchaseOrderData((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  };

  const updateSupplierInfo = (
    field: keyof CustomerOrSupplier,
    value: string
  ) => {
    setPurchaseOrderData((prev) => ({
      ...prev,
      supplier: { ...prev.supplier, [field]: value },
    }));
  };

  const updateShippingInfo = (field: string, value: string) => {
    setPurchaseOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCheckoutInfo = (field: string, value: string) => {
    setPurchaseOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const convertCartToProducts = (): ProductItem[] => {
    return cart.map((item) => ({
      product_id: item.id.toString(),
      item_type: item.unit,
      quantity: item.quantity,
      unit_price: item.price,
    }));
  };

  const handleCreateOrUpdateOrder = async () => {
    const productsData = convertCartToProducts();
    const finalOrderData = {
      ...purchaseOrderData,
      po_number: editOrderId,
      products: productsData,
      po_type:
        purchaseOrderData.payment_method === "credit" ? "credit" : "cash",
    };

    const successCallback = () => {
      localStorage.removeItem("editOrderData");

      setCart([]);
      setPurchaseOrderData(initialPurchaseOrderState);
      setCustomerInformation(false);
      setSupplierInformation(false);
      setShippingInformation(false);
      setProductInfo(false);
      setCheckout(false);
      setIsEditMode(false);
      setEditOrderId(null);

      router.push("/dashboard/purchase-order");
    };

    const errorCallback = (error: any) => {
      console.error("Failed to create/update order:", error);
    };

    try {
      if (isEditMode && editOrderId) {
        await handleUpdatePurchaseOrder(
          finalOrderData,
          editOrderId,
          successCallback
        );
      } else {
        await handleAddPurchaseOrder(finalOrderData, successCallback);
      }
    } catch (error) {
      errorCallback(error);
    }
  };

  const handleBackNavigation = () => {
    if (!isEditMode) {
      localStorage.removeItem("editOrderData");
    }

    router.back();
  };

  const sections: Section[] = [
    {
      title: "Customer Information",
      Component: CustomerInformation,
      isOpen: customerInformation,
      setIsOpen: setCustomerInformation,
      props: {
        customerDetails: purchaseOrderData.customer,
        updateCustomerInfo,
      },
    },
    {
      title: "Supplier Information",
      Component: SupplierInformation,
      isOpen: supplierInformation,
      setIsOpen: setSupplierInformation,
      props: {
        supplierDetails: purchaseOrderData.supplier,
        updateSupplierInfo,
      },
    },
    {
      title: "Product Information",
      Component: AddProductInfo,
      isOpen: productInfo,
      setIsOpen: setProductInfo,
      props: {
        cart,
        setCart,
        isOrderCartOpen,
        setIsOrderCartOpen,
      },
    },
    {
      title: "Shipping Information",
      Component: ShippingInformation,
      isOpen: shippingInformation,
      setIsOpen: setShippingInformation,
      props: {
        shippingData: {
          shipping_method: purchaseOrderData.shipping_method,
          delivery_date: purchaseOrderData.delivery_date,
          shipping_street_address: purchaseOrderData.shipping_street_address,
          zip_code: purchaseOrderData.zip_code,
          city: purchaseOrderData.city,
          shipping_phone_number: purchaseOrderData.shipping_phone_number,
        },
        updateShippingInfo,
      },
    },
    {
      title: "Checkout",
      Component: AddCheckout,
      isOpen: checkout,
      setIsOpen: setCheckout,
      props: {
        checkoutData: {
          payment_method: purchaseOrderData.payment_method,
          po_type: purchaseOrderData.po_type,
          due_date: purchaseOrderData.due_date,
        },
        updateCheckoutInfo,
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center">
        <ArrowLeft
          className="cursor-pointer hover:opacity-60 duration-100"
          onClick={handleBackNavigation}
        />
        <div className="ml-4">
          <Typography className="font-inter text-2xl font-semibold">
            {isEditMode ? "Edit Purchase Order" : "Create Purchase Order"}
          </Typography>
          <Typography className="text-base text-[#6F6F6F]">
            {isEditMode
              ? "Update customer details, supplier details, products, shipping info, and checkout information."
              : "Enter customer details, supplier details, select products, shipping info, and checkout information."}
          </Typography>
        </div>
      </div>

      <div>
        {sections.map(
          ({ title, Component, isOpen, setIsOpen, props }, index) => (
            <div key={index}>
              <div
                className="flex items-center mt-10 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="transition-transform duration-500 ease-in-out">
                  <ChevronLeft
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                </div>
                <Typography className="ml-2 text-xl text-[#003366] font-semibold">
                  {title}
                </Typography>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                <Component {...props} />
              </div>
            </div>
          )
        )}

        <OrderCart
          isRightDrawerOpen={isOrderCartOpen}
          closeFlyout={() => setIsOrderCartOpen(false)}
          cart={cart}
          setCart={setCart}
        />

        <div className="flex justify-end">
          <Button
            className="mt-10 bg-[#003366] normal-case px-10 py-3 text-sm"
            onClick={handleCreateOrUpdateOrder}
            loading={
              isEditMode ? isPurchaseOrderUpdating : isPurchaseOrderCreating
            }
            disabled={cart.length === 0}
          >
            {isEditMode ? "Update Order" : "Create Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlacePurchaseOrder;
