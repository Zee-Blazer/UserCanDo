"use client";

import { useState, useEffect } from "react";
import StatCard from "@/components/General/StatCard";
import OrdersAnalytics from "@/components/dashboard/purchaseOder/orderAnalytics";
import {
  Download,
  PenSquare,
  CalendarDays,
  Search,
  ShoppingCart,
  Wallet,
  Landmark,
  Percent,
} from "lucide-react";
import Orders from "@/components/dashboard/purchaseOder/orders";
import NewOrdersUpdated from "@/components/dashboard/orders/newOrdersUpdated";
import ApprovedOrdersUpdated from "@/components/dashboard/orders/approvedOrdersUpdated";
import OutForDeliveryOrdersUpdated from "@/components/dashboard/orders/outForDeliveryOrdersUpdated";
import DeliveryOrdersUpdated from "@/components/dashboard/orders/deliveryOrdersUpdated";
import CancelledOrdersUpdated from "@/components/dashboard/orders/cancelledOrdersUpdated";
import { ROUTES } from "@/constants/routes";
import { useRouter } from 'next/navigation';
import { useDash } from '@/context/dashboardContext';

const tabsData = [
  { name: "Overview" },
  { name: "New", count: 45 },
  { name: "Approved", count: 45 },
  { name: "Out for delivery", count: 0 },
  { name: "Delivered", count: 45 },
  { name: "Cancelled", count: 45 },
  { name: "All Invoices", count: 45 },
];

const statsData = [
  {
    title: "Number Of Orders",
    value: "3,000",
    change: "0.5%",
    Icon: ShoppingCart,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Order Value",
    value: "2,500",
    change: "0.5%",
    Icon: Landmark,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Average Order Value",
    value: "900",
    change: "0.5%",
    Icon: Wallet,
    iconBgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Order to sales conversion",
    value: "89%",
    change: "0.5%",
    Icon: Percent,
    iconBgColor: "bg-blue-50",
    iconColor: "text-pry2",
  },
];

const ordersAnalyticsData = {
  totalOrdersValue: "GHS 20,000,000.00",
  barChart: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      {
        name: "Total Order Received",
        data: [300, 370, 320, 240, 350, 290, 310, 300, 330, 370, 280, 260],
      },
      {
        name: "Total Order Converted To Sale",
        data: [800, 950, 850, 680, 720, 600, 790, 800, 880, 920, 620, 750],
      },
    ],
  },
  conversion: {
    percentage: 20.2,
    series: [20.2],
  },
};

const VendorOrdersPage = () => {

  const router = useRouter();
  const { refreshAllOrdersData } = useDash();

  const [activeTab, setActiveTab] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analyticsInterval, setAnalyticsInterval] = useState("weekly");

  // Listen for order status updates to refresh data
  useEffect(() => {
    const handleOrderStatusUpdate = async () => {
      setIsRefreshing(true);
      try {
        await refreshAllOrdersData();
      } catch (error) {
        console.error('Error refreshing orders data:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    window.addEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    
    return () => {
      window.removeEventListener('orderStatusUpdated', handleOrderStatusUpdate);
    };
  }, [refreshAllOrdersData]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshAllOrdersData();
    } catch (error) {
      console.error('Error refreshing orders data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAnalyticsIntervalChange = (newInterval: string) => {
    setAnalyticsInterval(newInterval);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => console.log("Download clicked")}
              className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-transform"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
            <button
              onClick={() => router.push(ROUTES.placeOrder)}
              className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 active:scale-95 transition-transform"
            >
              <PenSquare className="h-4 w-4" />
              <span>Record Order</span>
            </button>
          </div>
        </header>

        <div className="border-b border-gray-200">
          <div className="overflow-x-auto pb-1">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabsData.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium focus:outline-none text-sm ${
                    activeTab === tab.name
                      ? "border-[#F5AA29] " //text-blue-600
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.name}
                  {tab.count !== undefined && (
                    <span
                      className={`ml-2 text-xs  px-2 py-0.5 rounded-full ${
                        activeTab === tab.name
                          ? "bg-[#E9E9EB] text-gray-700" // bg-blue-100 text-blue-600
                          : "bg-[#E9E9EB] text-gray-700"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center my-6 space-y-4 md:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <button className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-600 text-sm">
              <span>All time</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="flex items-center justify-center w-full sm:w-auto space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-600 text-sm">
              <CalendarDays className="h-4 w-4 text-gray-500" />
              <span>Jan 1, 2022 - Dec 31, 2022</span>
            </div>
          </div>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-80 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {activeTab === "Overview" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  Icon={stat.Icon}
                  iconBgColor={stat.iconBgColor}
                  iconColor={stat.iconColor}
                />
              ))}
            </div>
            <OrdersAnalytics 
              analyticsData={ordersAnalyticsData} 
              interval={analyticsInterval}
              onIntervalChange={handleAnalyticsIntervalChange}
            />
          </>
        )}

        {
          activeTab === "Overview" 
          ? (
            <Orders />
          ) : activeTab === "New" ?
          (
            <NewOrdersUpdated onRefresh={handleManualRefresh} isRefreshing={isRefreshing} />
          ) : activeTab === "Approved" ?
          (
            <ApprovedOrdersUpdated onRefresh={handleManualRefresh} isRefreshing={isRefreshing} />
          ) : activeTab === "Delivered" ?
          (
            <DeliveryOrdersUpdated onRefresh={handleManualRefresh} isRefreshing={isRefreshing} />
          ) : activeTab === "Cancelled" ?
          (
            <CancelledOrdersUpdated onRefresh={handleManualRefresh} isRefreshing={isRefreshing} />
          ) : activeTab === "Out for delivery" ?
          (
            <OutForDeliveryOrdersUpdated onRefresh={handleManualRefresh} isRefreshing={isRefreshing} />
          ) : (
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[150px]">
              <h2 className="text-xl font-semibold text-gray-800">
                Displaying content for:{" "}
                <span className="text-blue-600">{activeTab}</span>
              </h2>
              <p className="mt-2 text-gray-600">
                This area would typically contain a table or list of the "
                {activeTab}" orders. This is where you would fetch and display the
                relevant data.
              </p>
              {searchTerm && (
                <p className="mt-4 text-indigo-600 bg-indigo-50 p-3 rounded-md">
                  You are searching for:{" "}
                  <span className="font-bold">"{searchTerm}"</span>
                </p>
              )}
            </div>
          )
        }

      </div>
    </div>
  );
};

export default VendorOrdersPage;
