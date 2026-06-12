"use client";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AddOrdersFlyout from "@/components/dashboard/orders/addOrdersFlyout";
import ApprovedOrders from "@/components/dashboard/orders/approvedOrders";
import DeliveredOrders from "@/components/dashboard/orders/delivered";
import InvoiceOrders from "@/components/dashboard/orders/invoiceOrders";
import FilterOrderModal, {
  FilterOrderState,
} from "@/components/dashboard/orders/modals/filterOrderModal";
import NewOrders from "@/components/dashboard/orders/newOrders";
import OrdersPageHeader from "@/components/dashboard/orders/ordersPageHeader";
import OutForDelivery from "@/components/dashboard/orders/outForDeliveryOrders";
import { TrashModal } from "@/components/General/trashModal";
import { useDash } from "@/context/dashboardContext";
import EditOrderFlyout from "@/components/dashboard/orders/EditOrderFlyout";
import OrderDetailsFlyout from "@/components/dashboard/orders/orderDetailsFlyout";
import CancelledOrders from "@/components/dashboard/orders/cancelledOrders";
import OrdersOverview from "@/components/dashboard/orders/ordersOverview";

const Orders = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isOrderDetailsFlyoutOpen, setIsOrderDetailsFlyoutOpen] =
    useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] =
    useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<CreateOrderProps | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const handleViewOrderDetails = (orderData: any) => {
    setSelectedOrderForDetails(orderData);
    setIsOrderDetailsFlyoutOpen(true);
  };

  const [filters, setFilters] = useState<FilterOrderState>({
    customer_name: "",
    sale_type: "",
    sales_agent_name: "",
    due_date: "",
    payment_mode: "",
    start_date: "",
    end_date: "",
    order_number: "",
  });

  const { handleDeleteOrder, isOrderDeleting, refreshAllOrdersData } =
    useDash();

  useEffect(() => {
    const handleRefresh = async () => {
      setIsRefreshing(true);
      try {
        await refreshAllOrdersData();
        setRefreshCounter((prev) => prev + 1);
      } finally {
        setIsRefreshing(false);
      }
    };

    handleRefresh();
  }, [refreshAllOrdersData]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        setIsRefreshing(true);
        try {
          await refreshAllOrdersData();
          setRefreshCounter((prev) => prev + 1);
        } finally {
          setIsRefreshing(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshAllOrdersData]);

  const handleDelete = () => {
    if (selectedRow) {
      handleDeleteOrder(selectedRow, () => {
        setIsDeleteDialogOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleDeleteOpenDialog = () => setIsDeleteDialogOpen(true);
  const handleDeleteCloseDialog = () => setIsDeleteDialogOpen(false);

  const handleFilter = (newFilters: FilterOrderState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshAllOrdersData();
      setRefreshCounter((prev) => prev + 1);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDownloadPDF = async () => {
    const tabNames = [
      "Overview",
      "New Orders",
      "Approved Orders",
      "Out For Delivery",
      "Delivered Orders",
      "Cancelled Orders",
      "All Invoices",
    ];

    const currentTabName = tabNames[activeTabIndex] || "Orders";

    try {
      const tableElement =
        document.querySelector('[data-table="orders-table"]') ||
        document.querySelector("table") ||
        document.querySelector(".bg-lightBg.dark\\:bg-darkBg");

      if (!tableElement) {
        console.warn("No table found to download");
        return;
      }

      // Get the parent container that includes headers and filters for better context
      const tableContainer =
        tableElement.closest(".space-y-4") || tableElement.parentElement;
      const elementToCapture = tableContainer || tableElement;

      // Create canvas from the table element
      const canvas = await html2canvas(elementToCapture as HTMLElement, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      });

      // Create PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const availableWidth = pageWidth - 2 * margin;
      const availableHeight = pageHeight - 40;

      // Calculate scaled dimensions
      const imgAspectRatio = canvas.width / canvas.height;
      let imgWidth = availableWidth;
      let imgHeight = availableWidth / imgAspectRatio;

      // If height exceeds available space, scale based on height
      if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = availableHeight * imgAspectRatio;
      }

      // Add title
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${currentTabName} Report`, pageWidth / 2, 20, {
        align: "center",
      });

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        pageWidth / 2,
        28,
        { align: "center" }
      );

      const xPosition = (pageWidth - imgWidth) / 2;
      const yPosition = 35;

      pdf.addImage(imgData, "PNG", xPosition, yPosition, imgWidth, imgHeight);

      const fileName = `${currentTabName.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {
      // Silent failure - PDF generation failed
    }
  };

  const handleEditOrder = (data: CreateOrderProps) => {
    const formattedOrderData: CreateOrderProps = {
      ...data,
      customer_entity_id: data?.customer_entity_id,
      sales_agent_id: data?.sales_agent_id,
      products: data?.products?.map((product) => ({
        ...product,
        product_id: product?.product_id,
      })),
      sale_type: data?.sale_type,
      payment_mode: data?.payment_mode,
      due_date: data?.due_date,
      delivery_location: data?.delivery_location,
      discount_type: data?.discount_type || "",
      discount_value: data?.discount_value || 0,
    };

    setOrderDetails(formattedOrderData);
    setIsEditDrawerOpen(true);
  };

  const sharedProps = {
    onOpenEditDrawer: handleEditOrder,
    onOpenModal: handleDeleteOpenDialog,
    filters,
    onOpenFilterModal: () => setIsFilterModalOpen(true),
    setSelectedRow,
    onViewOrderDetails: handleViewOrderDetails,
    onRefresh: handleManualRefresh,
    isRefreshing,
    refreshCounter,
  };

  const renderTabContent = () => {
    const refreshKey = `refresh-${refreshCounter}`;

    switch (activeTabIndex) {
      case 0:
        return <OrdersOverview key={`overview-${refreshKey}`} />;
      case 1:
        return <NewOrders key={`new-${refreshKey}`} {...sharedProps} />;
      case 2:
        return (
          <ApprovedOrders key={`approved-${refreshKey}`} {...sharedProps} />
        );
      case 3:
        return (
          <OutForDelivery key={`delivery-${refreshKey}`} {...sharedProps} />
        );
      case 4:
        return (
          <DeliveredOrders key={`delivered-${refreshKey}`} {...sharedProps} />
        );
      case 5:
        return (
          <CancelledOrders key={`cancelled-${refreshKey}`} {...sharedProps} />
        );
      case 6:
        return <InvoiceOrders key={`invoice-${refreshKey}`} {...sharedProps} />;
      default:
        return <OrdersOverview key={`overview-default-${refreshKey}`} />;
    }
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <OrdersPageHeader
          activeIndex={activeTabIndex}
          setActiveIndex={setActiveTabIndex}
          onDownload={handleDownloadPDF}
        />

        <div className="mt-6">{renderTabContent()}</div>

        <FilterOrderModal
          open={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onFilter={handleFilter}
          initialFilters={filters}
        />

        <AddOrdersFlyout
          isRightDrawerOpen={isRightDrawerOpen}
          closeFlyout={() => setIsRightDrawerOpen(false)}
        />
        <EditOrderFlyout
          isEditDrawerOpen={isEditDrawerOpen}
          closeFlyout={() => setIsEditDrawerOpen(false)}
          data={orderDetails || null}
        />
        <TrashModal
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteCloseDialog}
          header="Delete Order"
          title="Are you sure you want to remove this order"
          loading={isOrderDeleting}
          onDelete={handleDelete}
        />
        <OrderDetailsFlyout
          isRightDrawerOpen={isOrderDetailsFlyoutOpen}
          closeFlyout={() => setIsOrderDetailsFlyoutOpen(false)}
          orderData={selectedOrderForDetails}
          onEditOrder={handleEditOrder}
        />
      </div>
    </div>
  );
};

export default Orders;
