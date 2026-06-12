import { useDashboardSelector } from "@/Redux/selectors";
import { useCallback, useState, useEffect } from "react";

export const UseGlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<{
    results: any;
    total: number;
  }>({
    results: {},
    total: 0,
  });

  const { customers, salesAgents, businesses, products, orders, suppliers } =
    useDashboardSelector();

  const getAllData = useCallback(() => {
    return {
      customers: customers || [],
      agents: salesAgents || [],
      businesses: businesses || [],
      products: products || [],
      orders: orders || [],
      suppliers: suppliers || [],
    };
  }, [customers, salesAgents, businesses, products, orders, suppliers]);

  const safeToLowerCase = (value: unknown): string => {
    if (!value) return "";
    return String(value).toLocaleLowerCase();
  };

  const performSearch = useCallback(
    (term: string) => {
      if (!term.trim()) return { results: {}, total: 0 };

      const searchLower = safeToLowerCase(term);
      const allData = getAllData();

      const results = {
        customers: allData.customers.filter(
          (customer: any) =>
            safeToLowerCase(customer?.customer_name).includes(searchLower) ||
            safeToLowerCase(customer?.customer_phone).includes(searchLower) ||
            safeToLowerCase(customer?.city).includes(searchLower) ||
            safeToLowerCase(customer?.customer_address).includes(searchLower)
        ),

        businesses: allData.businesses.filter(
          (business: any) =>
            safeToLowerCase(business?.business_name).includes(searchLower) ||
            safeToLowerCase(business?.city).includes(searchLower)
        ),

        products: allData.products.filter(
          (product: any) =>
            safeToLowerCase(product?.product_name).includes(searchLower) ||
            safeToLowerCase(product?.product_brand_name).includes(
              searchLower
            ) ||
            safeToLowerCase(product?.product_category).includes(searchLower)
        ),

        orders: allData.orders.filter((order: any) =>
          safeToLowerCase(order?.customer_name).includes(searchLower)
        ),
      };

      const total = Object.values(results).reduce(
        (sum: number, arr: any[]) => sum + arr.length,
        0
      );

      return { results, total };
    },
    [getAllData]
  );

  const handleSearchChange = useCallback(
    (term: string) => {
      setSearchTerm(term);

      if (!term.trim()) {
        setSearchResults({ results: {}, total: 0 });
        setShowResults(false);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      const timeoutId = setTimeout(() => {
        const results = performSearch(term);
        setSearchResults(results);
        setShowResults(true);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [performSearch]
  );

  const cancelSearch = useCallback(() => {
    setSearchTerm("");
    setSearchResults({ results: {}, total: 0 });
    setShowResults(false);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showResults) {
        cancelSearch();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [cancelSearch, showResults]);

  const handleClickOutside = useCallback(() => {
    if (showResults) {
      setShowResults(false);
    }
  }, [showResults]);

  const findItemPage = useCallback(
    (items: any[], targetId: string, itemsPerPage: number = 10): number => {
      const index = items.findIndex((item) => item?.id === targetId);
      if (index === -1) return 1;
      return Math.floor(index / itemsPerPage) + 1;
    },
    []
  );

  return {
    searchTerm,
    setSearchTerm,
    handleSearchChange,
    cancelSearch,
    performSearch,
    isSearching,
    setIsSearching,
    showResults,
    setShowResults,
    searchResults,
    handleClickOutside,
    findItemPage,
    getAllData,
  };
};
