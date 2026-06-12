// "use client";

// import React, { useState, useMemo } from "react";
// import { Typography, Button } from "@material-tailwind/react";
// import { ArrowLeft, ChevronLeft } from "lucide-react";
// import AddOrderDetails from "@/components/dashboard/orders/addOrderDetails";
// import AddProductInfo from "@/components/dashboard/orders/addProductInfo";
// import AddCheckout from "@/components/dashboard/orders/addCheckout";
// import OrderCart from "@/components/dashboard/orders/orderCart";
// import { useRouter } from "next/navigation";
// import { useDash } from "@/context/dashboardContext";
// import { useDashboardSelector } from "@/Redux/selectors";

// interface CartItem {
//   id: string;
//   product: string;
//   quantity: number;
//   unit: string;
//   price: number;
//   discount: number;
//   discountAmount: number;
//   total: number;
//   amount?: number;
//   product_name?: string;
//   product_retail_price?: number;
// }

// interface OrderDetails {
//   orderDate: string;
//   supplier: string;
//   customer: string;
//   salesAgent: string;
//   customer_entity_type: string;
//   customer_entity_id: string;
// }

// interface CashOrderData {
//   payment_method: string;
//   due_date: string;
//   region: string;
//   town: string;
//   street_address: string;
//   nearest_landmark: string;
//   po_type: string;
// }

// interface CreditOrderData {
//   mark_up: string;
//   due_date: string;
//   penalty_rate: string;
//   region: string;
//   town: string;
//   street_address: string;
//   nearest_landmark: string;
// }

// interface OrderDetailsProps {
//   orderDetailsData: OrderDetails;
//   updateOrderDetails: (field: string, value: string) => void;
// }

// interface CartSummaryProps {
//   cart: CartItem[];
//   setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
//   isOrderCartOpen: boolean;
//   setIsOrderCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface CheckoutProps {
//   cashOrderData: CashOrderData;
//   creditOrderData: CreditOrderData;
//   updateCashOrderInfo: (field: string, value: string) => void;
//   updateCreditOrderInfo: (field: string, value: string) => void;
//   activeTab: string;
//   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
// }

// type OrderDetailsComponent = React.ComponentType<OrderDetailsProps>;
// type ProductInfoComponent = React.ComponentType<CartSummaryProps>;
// type CheckoutComponent = React.ComponentType<CheckoutProps>;

// interface BaseSection {
//   title: string;
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// interface OrderDetailsSection extends BaseSection {
//   type: "orderDetails";
//   Component: OrderDetailsComponent;
// }

// interface ProductInfoSection extends BaseSection {
//   type: "productInfo";
//   Component: ProductInfoComponent;
// }

// interface CheckoutSection extends BaseSection {
//   type: "checkout";
//   Component: CheckoutComponent;
// }

// type Section = OrderDetailsSection | ProductInfoSection | CheckoutSection;

// const PlaceOrderPage = () => {
//   const router = useRouter();
//   const { handleCreateOrder, isOrderCreating } = useDash();
//   const { activeBusiness } = useDashboardSelector();

//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isOrderCartOpen, setIsOrderCartOpen] = useState<boolean>(false);
//   const [orderDetails, setOrderDetails] = useState(false);
//   const [productInfo, setProductInfo] = useState(false);
//   const [checkout, setCheckout] = useState(false);
//   const [activeTab, setActiveTab] = useState("Cash Order");

//   const [orderDetailsData, setOrderDetailsData] = useState<OrderDetails>({
//     orderDate: "",
//     supplier: "",
//     customer: "",
//     salesAgent: "",
//     customer_entity_type: "",
//     customer_entity_id: "",
//   });

//   const [cashOrderData, setCashOrderData] = useState<CashOrderData>({
//     payment_method: "",
//     due_date: "",
//     region: "",
//     town: "",
//     street_address: "",
//     nearest_landmark: "",
//     po_type: "",
//   });

//   const [creditOrderData, setCreditOrderData] = useState<CreditOrderData>({
//     mark_up: "",
//     due_date: "",
//     penalty_rate: "",
//     region: "",
//     town: "",
//     street_address: "",
//     nearest_landmark: "",
//   });

//   const isFormValid = useMemo(() => {
//     if (cart.length === 0) return false;

//     const requiredOrderFields = [
//       "orderDate",
//       "supplier",
//       "customer",
//       "salesAgent",
//       "customer_entity_type",
//       "customer_entity_id",
//     ];

//     const orderDetailsValid = requiredOrderFields.every(
//       (field) => orderDetailsData[field as keyof OrderDetails]?.trim() !== ""
//     );

//     let checkoutValid = false;

//     if (activeTab === "Cash Order") {
//       const requiredCashFields = [
//         "payment_method",
//         "due_date",
//         "region",
//         "town",
//         "street_address",
//       ];
//       checkoutValid = requiredCashFields.every(
//         (field) => cashOrderData[field as keyof CashOrderData]?.trim() !== ""
//       );
//     } else if (activeTab === "Credit Order") {
//       const requiredCreditFields = [
//         "mark_up",
//         "due_date",
//         "penalty_rate",
//         "region",
//         "town",
//         "street_address",
//       ];
//       checkoutValid = requiredCreditFields.every(
//         (field) =>
//           creditOrderData[field as keyof CreditOrderData]?.trim() !== ""
//       );
//     }

//     return orderDetailsValid && checkoutValid;
//   }, [cart, orderDetailsData, cashOrderData, creditOrderData, activeTab]);

//   const updateOrderDetails = (field: string, value: string) => {
//     setOrderDetailsData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const updateCashOrderInfo = (field: string, value: string) => {
//     setCashOrderData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const updateCreditOrderInfo = (field: string, value: string) => {
//     setCreditOrderData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmitOrder = async () => {
//     if (!isFormValid) {
//       alert("Please fill in all required fields and add products to cart");
//       return;
//     }

//     const saleType = activeTab === "Cash Order" ? "cash" : "credit";
//     const currentCheckoutData =
//       activeTab === "Cash Order" ? cashOrderData : creditOrderData;

//     const formPayload = {
//       business_id: activeBusiness?.id || "",
//       customer_entity_type: orderDetailsData.customer_entity_type,
//       customer_entity_id: orderDetailsData.customer_entity_id,
//       sale_date: orderDetailsData.orderDate,
//       sales_agent_id: orderDetailsData.salesAgent,
//       sale_type: saleType,
//       due_date: currentCheckoutData.due_date,
//       payment_mode:
//         activeTab === "Cash Order" ? cashOrderData.payment_method : "credit",
//       order_status: "pending",
//       delivery_location: `${currentCheckoutData.street_address}, ${currentCheckoutData.town}, ${currentCheckoutData.region}`,
//       discount_type: "percentage",
//       discount_value: 0,
//       products: cart.map((item) => ({
//         product_id: item.id,
//         quantity: item.quantity,
//         unit_price: item.price,
//         total_price: item.total,
//       })),
//       town: currentCheckoutData.town,
//       region: currentCheckoutData.region,
//       street_address: currentCheckoutData.street_address,
//       nearest_landmark: currentCheckoutData.nearest_landmark,
//       mark_up: activeTab === "Credit Order" ? creditOrderData.mark_up : "",
//       percentage: 0,
//       duration: 0,
//       penalty_rate:
//         activeTab === "Credit Order"
//           ? parseFloat(creditOrderData.penalty_rate) || 0
//           : 0,
//       actual_supplier: orderDetailsData.supplier,
//     };

//     await handleCreateOrder(formPayload, () => {
//       router.back();
//     });
//   };

//   const sections: Section[] = [
//     {
//       title: "Order Details",
//       type: "orderDetails",
//       Component: AddOrderDetails as OrderDetailsComponent,
//       isOpen: orderDetails,
//       setIsOpen: setOrderDetails,
//     },
//     {
//       title: "Product Information",
//       type: "productInfo",
//       Component: AddProductInfo as ProductInfoComponent,
//       isOpen: productInfo,
//       setIsOpen: setProductInfo,
//     },
//     {
//       title: "Checkout",
//       type: "checkout",
//       Component: AddCheckout as CheckoutComponent,
//       isOpen: checkout,
//       setIsOpen: setCheckout,
//     },
//   ];

//   const renderSection = (section: Section) => {
//     switch (section.type) {
//       case "orderDetails":
//         return (
//           <section.Component
//             orderDetailsData={orderDetailsData}
//             updateOrderDetails={updateOrderDetails}
//           />
//         );
//       case "productInfo":
//         return (
//           <section.Component
//             cart={cart}
//             setCart={setCart}
//             isOrderCartOpen={isOrderCartOpen}
//             setIsOrderCartOpen={setIsOrderCartOpen}
//           />
//         );
//       case "checkout":
//         return (
//           <section.Component
//             cashOrderData={cashOrderData}
//             creditOrderData={creditOrderData}
//             updateCashOrderInfo={updateCashOrderInfo}
//             updateCreditOrderInfo={updateCreditOrderInfo}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center">
//         <ArrowLeft
//           className="cursor-pointer hover:opacity-60 duration-100"
//           onClick={() => router.back()}
//         />
//         <div className="ml-4">
//           <Typography className="font-inter text-2xl font-semibold">
//             Place Order
//           </Typography>
//           <Typography className="text-base font-normal text-[#6F6F6F]">
//             Enter order details, select products, and checkout information
//           </Typography>
//         </div>
//       </div>

//       <div>
//         {sections.map((section, index) => (
//           <div key={index}>
//             <div
//               className="flex items-center mt-10 cursor-pointer"
//               onClick={() => section.setIsOpen(!section.isOpen)}
//             >
//               <div className="transition-transform duration-500 ease-in-out">
//                 <ChevronLeft
//                   className={`transform transition-transform duration-300 ${
//                     section.isOpen ? "-rotate-90" : "rotate-0"
//                   }`}
//                 />
//               </div>
//               <Typography className="ml-2 text-xl text-[#003366] font-semibold">
//                 {section.title}
//               </Typography>
//             </div>

//             <div
//               className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                 section.isOpen
//                   ? "opacity-100 translate-y-0"
//                   : "max-h-0 opacity-0 -translate-y-2"
//               }`}
//             >
//               {renderSection(section)}
//             </div>
//           </div>
//         ))}

//         <OrderCart
//           isRightDrawerOpen={isOrderCartOpen}
//           closeFlyout={() => setIsOrderCartOpen(false)}
//           cart={cart}
//           setCart={setCart}
//         />

//         <div className="flex justify-end">
//           <Button
//             loading={isOrderCreating}
//             disabled={!isFormValid}
//             className="mt-10 bg-[#003366] normal-case px-10 py-3 text-sm"
//             onClick={handleSubmitOrder}
//           >
//             <span className="font-normal">Create Order</span>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrderPage;

"use client";

import React, { useState, useMemo } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import AddOrderDetails from "@/components/dashboard/orders/addOrderDetails";
import AddProductInfo from "@/components/dashboard/orders/addProductInfo";
import AddCheckout from "@/components/dashboard/orders/addCheckout";
import OrderCart from "@/components/dashboard/orders/orderCart";
import { useRouter } from "next/navigation";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";

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

interface OrderDetails {
  orderDate: string;
  supplier: string;
  customer: string;
  salesAgent: string;
  customer_entity_type: string;
  customer_entity_id: string;
}

interface CashOrderData {
  payment_method: string;
  due_date: string;
  region: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
  po_type: string;
}

interface CreditOrderData {
  mark_up: string;
  due_date: string;
  penalty_rate: string;
  region: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
}

interface OrderDetailsProps {
  orderDetailsData: OrderDetails;
  updateOrderDetails: (field: string, value: string) => void;
}

interface CartSummaryProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isOrderCartOpen: boolean;
  setIsOrderCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSupplierEntityId: string; // Change to supplier_entity_id
  selectedSupplierName: string;
}

interface CheckoutProps {
  cashOrderData: CashOrderData;
  creditOrderData: CreditOrderData;
  updateCashOrderInfo: (field: string, value: string) => void;
  updateCreditOrderInfo: (field: string, value: string) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

type OrderDetailsComponent = React.ComponentType<OrderDetailsProps>;
type ProductInfoComponent = React.ComponentType<CartSummaryProps>;
type CheckoutComponent = React.ComponentType<CheckoutProps>;

interface BaseSection {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OrderDetailsSection extends BaseSection {
  type: "orderDetails";
  Component: OrderDetailsComponent;
}

interface ProductInfoSection extends BaseSection {
  type: "productInfo";
  Component: ProductInfoComponent;
}

interface CheckoutSection extends BaseSection {
  type: "checkout";
  Component: CheckoutComponent;
}

type Section = OrderDetailsSection | ProductInfoSection | CheckoutSection;

const PlaceOrderPage = () => {
  const router = useRouter();
  const { handleCreateOrder, isOrderCreating } = useDash();
  const { activeBusiness, suppliers } = useDashboardSelector();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderCartOpen, setIsOrderCartOpen] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState(false);
  const [productInfo, setProductInfo] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState("Cash Order");

  const [orderDetailsData, setOrderDetailsData] = useState<OrderDetails>({
    orderDate: "",
    supplier: "",
    customer: "",
    salesAgent: "",
    customer_entity_type: "",
    customer_entity_id: "",
  });

  const [cashOrderData, setCashOrderData] = useState<CashOrderData>({
    payment_method: "",
    due_date: "",
    region: "",
    town: "",
    street_address: "",
    nearest_landmark: "",
    po_type: "",
  });

  const [creditOrderData, setCreditOrderData] = useState<CreditOrderData>({
    mark_up: "",
    due_date: "",
    penalty_rate: "",
    region: "",
    town: "",
    street_address: "",
    nearest_landmark: "",
  });

  const selectedSupplier = useMemo(() => {
    return suppliers?.find((s) => s.id === orderDetailsData.supplier);
  }, [suppliers, orderDetailsData.supplier]);

  // Get supplier entity ID for loading products
  const selectedSupplierEntityId = useMemo(() => {
    return selectedSupplier?.supplier_entity_id || "";
  }, [selectedSupplier]);

  const isFormValid = useMemo(() => {
    if (cart.length === 0) return false;

    const requiredOrderFields = [
      "orderDate",
      "supplier",
      "customer",
      "salesAgent",
      "customer_entity_type",
      "customer_entity_id",
    ];

    const orderDetailsValid = requiredOrderFields.every(
      (field) => orderDetailsData[field as keyof OrderDetails]?.trim() !== ""
    );

    let checkoutValid = false;

    if (activeTab === "Cash Order") {
      const requiredCashFields = [
        "payment_method",
        "due_date",
        "region",
        "town",
        "street_address",
      ];
      checkoutValid = requiredCashFields.every(
        (field) => cashOrderData[field as keyof CashOrderData]?.trim() !== ""
      );
    } else if (activeTab === "Credit Order") {
      const requiredCreditFields = [
        "mark_up",
        "due_date",
        "penalty_rate",
        "region",
        "town",
        "street_address",
      ];
      checkoutValid = requiredCreditFields.every(
        (field) =>
          creditOrderData[field as keyof CreditOrderData]?.trim() !== ""
      );
    }

    return orderDetailsValid && checkoutValid;
  }, [cart, orderDetailsData, cashOrderData, creditOrderData, activeTab]);

  const updateOrderDetails = (field: string, value: string) => {
    setOrderDetailsData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      // Clear cart when supplier changes
      if (field === "supplier" && prev.supplier !== value) {
        setCart([]);
      }

      return updated;
    });
  };

  const updateCashOrderInfo = (field: string, value: string) => {
    setCashOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCreditOrderInfo = (field: string, value: string) => {
    setCreditOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    if (!isFormValid) {
      alert("Please fill in all required fields and add products to cart");
      return;
    }

    const saleType = activeTab === "Cash Order" ? "cash" : "credit";
    const currentCheckoutData =
      activeTab === "Cash Order" ? cashOrderData : creditOrderData;

    const formPayload = {
      business_id: activeBusiness?.id || "",
      customer_entity_type: orderDetailsData.customer_entity_type,
      customer_entity_id: orderDetailsData.customer_entity_id,
      sale_date: orderDetailsData.orderDate,
      sales_agent_id: orderDetailsData.salesAgent,
      sale_type: saleType,
      due_date: currentCheckoutData.due_date,
      payment_mode:
        activeTab === "Cash Order" ? cashOrderData.payment_method : "credit",
      order_status: "pending",
      delivery_location: `${currentCheckoutData.street_address}, ${currentCheckoutData.town}, ${currentCheckoutData.region}`,
      discount_type: "percentage",
      discount_value: 0,
      products: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.total,
      })),
      town: currentCheckoutData.town,
      region: currentCheckoutData.region,
      street_address: currentCheckoutData.street_address,
      nearest_landmark: currentCheckoutData.nearest_landmark,
      mark_up: activeTab === "Credit Order" ? creditOrderData.mark_up : "",
      percentage: 0,
      duration: 0,
      penalty_rate:
        activeTab === "Credit Order"
          ? parseFloat(creditOrderData.penalty_rate) || 0
          : 0,
      actual_supplier: orderDetailsData.supplier,
    };

    await handleCreateOrder(formPayload, () => {
      router.back();
    });
  };

  const sections: Section[] = [
    {
      title: "Order Details",
      type: "orderDetails",
      Component: AddOrderDetails as OrderDetailsComponent,
      isOpen: orderDetails,
      setIsOpen: setOrderDetails,
    },
    {
      title: "Product Information",
      type: "productInfo",
      Component: AddProductInfo as ProductInfoComponent,
      isOpen: productInfo,
      setIsOpen: setProductInfo,
    },
    {
      title: "Checkout",
      type: "checkout",
      Component: AddCheckout as CheckoutComponent,
      isOpen: checkout,
      setIsOpen: setCheckout,
    },
  ];

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "orderDetails":
        return (
          <section.Component
            orderDetailsData={orderDetailsData}
            updateOrderDetails={updateOrderDetails}
          />
        );
      case "productInfo":
        return (
          <section.Component
            cart={cart}
            setCart={setCart}
            isOrderCartOpen={isOrderCartOpen}
            setIsOrderCartOpen={setIsOrderCartOpen}
            selectedSupplierEntityId={selectedSupplierEntityId}
            selectedSupplierName={selectedSupplier?.name || ""}
          />
        );
      case "checkout":
        return (
          <section.Component
            cashOrderData={cashOrderData}
            creditOrderData={creditOrderData}
            updateCashOrderInfo={updateCashOrderInfo}
            updateCreditOrderInfo={updateCreditOrderInfo}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <ArrowLeft
          className="cursor-pointer hover:opacity-60 duration-100"
          onClick={() => router.back()}
        />
        <div className="ml-4">
          <Typography className="font-inter text-2xl font-semibold">
            Place Order
          </Typography>
          <Typography className="text-base font-normal text-[#6F6F6F]">
            Enter order details, select products, and checkout information
          </Typography>
        </div>
      </div>

      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <div
              className="flex items-center mt-10 cursor-pointer"
              onClick={() => section.setIsOpen(!section.isOpen)}
            >
              <div className="transition-transform duration-500 ease-in-out">
                <ChevronLeft
                  className={`transform transition-transform duration-300 ${
                    section.isOpen ? "-rotate-90" : "rotate-0"
                  }`}
                />
              </div>
              <Typography className="ml-2 text-xl text-[#003366] font-semibold">
                {section.title}
              </Typography>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                section.isOpen
                  ? "opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }`}
            >
              {renderSection(section)}
            </div>
          </div>
        ))}

        <OrderCart
          isRightDrawerOpen={isOrderCartOpen}
          closeFlyout={() => setIsOrderCartOpen(false)}
          cart={cart}
          setCart={setCart}
        />

        <div className="flex justify-end">
          <Button
            loading={isOrderCreating}
            disabled={!isFormValid}
            className="mt-10 bg-[#003366] normal-case px-10 py-3 text-sm"
            onClick={handleSubmitOrder}
          >
            <span className="font-normal">Create Order</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
