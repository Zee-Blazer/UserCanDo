"use client";
import useApiRequest from "@/api/hooks/useApiRequest";
import { ROUTES } from "@/constants/routes";
import {
  setActiveBusiness,
  setBusinesses,
  setOverView,
  setCustomers,
  setTodayOrderHistory,
  setWeekOrderHistory,
  setOrderHistory,
  setRequestOrderHistory,
  setTodayRequestOrderHistory,
  setWeekRequestOrderHistory,
  setSuppliers,
  setProducts,
  setSuppliersProducts,
  setSales,
  setTodaySales,
  setWeekSales,
  setSalesAgents,
  setSalesAgentId,
  setUserProfile,
  setPlatformBusiness,
  setPackages,
  setBrands,
  setProductCategories,
  setBusinessTypes,
  setVolumeTypes,
  setWeightTypes,
} from "@/Redux/features/agentSlice";
import { logUserOut, setAccessToken } from "@/Redux/features/authSlice";
import { useAgentSelector, useAuthSelector } from "@/Redux/selectors";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import { useDispatch } from "react-redux";
import {
  initialShopperSaleState,
  initialAgentOrderState,
} from "@/utils/initialStates";
import { agentOrderSlides } from "@/components/agent/orders/slides";
import { getDateRange } from "@/utils/helpers";
import { isPublicRoute } from "@/utils/auth";
import { useLazyData } from "@/api/hooks/useLazyData";
import { useAuth } from "@/context/authContext";

// Type definitions
interface AgentLoadingStates {
  isLoading: boolean;
  isProfileUpdating: boolean;
  isBusinessesLoading: boolean;
  isCustomerCreating: boolean;
  isCustomersLoading: boolean;
  isCustomerDeleting: boolean;
  isSalesLoading: boolean;
  isSaleCreating: boolean;
  isAgentSaleDeleting: boolean;
  isProductCreating: boolean;
  isAddOrderLoading: boolean;
  isDeletingOrderHistory: boolean;
  isDeletingRequestHistory: boolean;
  isAgentRequestCreating: boolean;
  isPinUpdating: boolean;
  isNotificationEnabling: boolean;
}

interface AgentActions {
  handleCreateCustomer: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleDeleteCustomer: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleAgentRequest: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleCreateSale: (formPayload: any, cb: () => void) => void;
  handleDeleteAgentSales: (formPayload: any, cb: () => void) => void;
  handleSubmitOrder: (formPayload: any, cb: () => void) => void;
  handleCreateProduct: (
    formPayload: Product,
    file: File,
    cb: () => void
  ) => void;
  handleDeleteSpecificOrderHistory: (id: string) => void;
  handleDeleteSpecificRequestHistory: (id: string) => void;
  handleToggleNotification: (enabled: boolean, cb: () => void) => void;
  getNotificationStatus: () => Promise<void>;
  notificationStatus: boolean;
}

interface AgentSlideManagement {
  activeOrderSaleSlideIndex: number;
  setActiveOrderSaleSlideIndex: Dispatch<SetStateAction<number>>;
  orderSaleSlides: ReactNode[];
  nextOrderSaleSlide: () => void;
  prevOrderSaleSlide: () => void;
  resetOrderSaleSlides: (resetSlideIndex?: boolean) => void;
  goToOrderSaleSlide: (index: number) => void;
}

interface AgentFormManagement {
  shopperProfileSaleInputs: CreateShopperSaleProps;
  setShopperProfileSaleInputs: Dispatch<SetStateAction<CreateShopperSaleProps>>;
  handleShopperSaleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  agentOrderInputs: AgentOrderInputProps;
  setAgentOrderInputs: Dispatch<SetStateAction<AgentOrderInputProps>>;
  handleAgentOrderInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface AgentProductManagement {
  selectedProducts: Product[];
  setSelectedProducts: Dispatch<SetStateAction<Product[]>>;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  toggleProduct: (product: Product) => void;
  getAllSuppliersProducts: (e: string) => void;
}

interface AgentDataLoaders {
  loadAgentData: () => Promise<void>;
  loadAgentBusinessData: () => Promise<void>;
  loadAgentSalesData: () => Promise<void>;
  loadAgentCustomersData: () => Promise<void>;
  loadAgentProductsData: () => Promise<void>;
  loadAgentSuppliersData: () => Promise<void>;
  loadAgentSalesAgentsData: () => Promise<void>;
  loadSalesAgentId: () => Promise<void>;
  loadAgentOverviewData: () => Promise<void>;
  loadAgentHistoryData: () => Promise<void>;
  loadAgentSalesByDateRange: (
    range?: "today" | "week" | "all"
  ) => Promise<void>;
  loadAgentRequestHistoryByRange: (
    range?: "today" | "week" | "all"
  ) => Promise<void>;
  loadAgentOrderHistoryByRange: (
    range?: "today" | "week" | "all"
  ) => Promise<void>;
}

interface AgentProfileActions {
  handleProfileUpdate: (payload: UserProfile, profileImage?: File) => void;
  handleUpdatePin: (pinData: PinChangeProps) => void;
}

interface AgentUtilityActions {
  setFetchCount: Dispatch<SetStateAction<number>>;
}

interface AgentContextType
  extends AgentLoadingStates,
    AgentActions,
    AgentSlideManagement,
    AgentFormManagement,
    AgentProductManagement,
    AgentDataLoaders,
    AgentUtilityActions,
    AgentProfileActions {}

// Context creation
export const AgentContext = createContext<AgentContextType | undefined>(
  undefined
);

const AgentProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { loginData } = useAuthSelector();
  const { activeBusiness, businesses, sales_agent_id } = useAgentSelector();
  const { loadData, isLoaded, isLoading, invalidateData } = useLazyData();
  const { resetSalesRequestState } = useAuth();

  // State management
  const [fetchCount, setFetchCount] = useState(0);
  const [activeOrderSaleSlideIndex, setActiveOrderSaleSlideIndex] = useState(0);
  const [shopperProfileSaleInputs, setShopperProfileSaleInputs] =
    useState<CreateShopperSaleProps>(initialShopperSaleState);
  const [agentOrderInputs, setAgentOrderInputs] =
    useState<AgentOrderInputProps>(initialAgentOrderState);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const orderSaleSlides = agentOrderSlides;

  // API hooks
  const { loading: isProfileFetching, getRequest } = useApiRequest();
  const { loading: isBusinessesLoading, getRequest: getBusinesses } =
    useApiRequest();
  const { loading: isOverViewDataLoading, getRequest: getOverviewData } =
    useApiRequest();
  const { getRequest: getSalesAgentId } = useApiRequest();
  const { loading: isRefreshing, getRequest: refresh } = useApiRequest();
  const { postRequest: createCustomer, loading: isCustomerCreating } =
    useApiRequest();
  const { postRequest: addAgentRequest, loading: isAgentRequestCreating } =
    useApiRequest();
  const { postRequest: createSale, loading: isSaleCreating } = useApiRequest();
  const { getRequest: getCustomers, loading: isCustomersLoading } =
    useApiRequest();
  const { postRequest: addNewOrder, loading: isAddOrderLoading } =
    useApiRequest();
  const { getRequest: getSuppliers } = useApiRequest();
  const { getRequest: getSales, loading: isSalesLoading } = useApiRequest();
  const { getRequest: getProducts } = useApiRequest();
  const { loading: isAgentSaleDeleting, deleteRequest: deleteAgentSales } =
    useApiRequest();
  const { loading: isProductCreating, postRequest: createProduct } =
    useApiRequest();
  const { getRequest: getAgentRequestHistory } = useApiRequest();
  const { getRequest: getAllOrderHistory } = useApiRequest();
  const {
    loading: isDeletingOrderHistory,
    deleteRequest: removeSpecOrderHistory,
  } = useApiRequest();
  const {
    loading: isDeletingRequestHistory,
    deleteRequest: removeSpecRequestHistory,
  } = useApiRequest();
  const { loading: isPinUpdating, postRequest: updatePin } = useApiRequest();
  const { loading: isProfileUpdating, postRequest: updateProfile } =
    useApiRequest();
  const { getRequest: getWeightTypes } = useApiRequest();
  const { getRequest: getVolumeTypes } = useApiRequest();
  const { getRequest: getBrands } = useApiRequest();
  const { getRequest: getProductCategories } = useApiRequest();
  const { getRequest: getPackages } = useApiRequest();
  const { loading: isBusinessTypesLoading, getRequest: getBusinessTypes } =
    useApiRequest();
  const {
    loading: isPlatformBusinessesLoading,
    getRequest: getPlatformBusiness,
  } = useApiRequest();

  const { getRequest: getSalesAgents } = useApiRequest();

  const { loading: isCustomerDeleting, deleteRequest: deleteCustomer } =
    useApiRequest();

  const { loading: isNotificationEnabling, patchRequest: toggleNotification } =
    useApiRequest();

  const {
    getRequest: getNotificationStatus,
    loading: isNotificationStatusLoading,
  } = useApiRequest();

  const [notificationStatus, setNotificationStatus] = useState(false);

  // Product management functions
  const addProduct = useCallback((product: Product) => {
    setSelectedProducts((prev) => [...prev, product]);
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const toggleProduct = useCallback((product: Product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      return isSelected
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  }, []);

  // Form input handlers
  const handleShopperSaleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setShopperProfileSaleInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const handleAgentOrderInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAgentOrderInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  // Slide management functions
  const nextOrderSaleSlide = useCallback(() => {
    setActiveOrderSaleSlideIndex((prevIndex) =>
      prevIndex < orderSaleSlides.length - 1 ? prevIndex + 1 : prevIndex
    );
  }, [orderSaleSlides.length]);

  const prevOrderSaleSlide = useCallback(() => {
    setActiveOrderSaleSlideIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  }, []);

  const resetOrderSaleSlides = useCallback(
    (resetSlideIndex = true) => {
      if (resetSlideIndex) {
        setActiveOrderSaleSlideIndex(0);
      }
      setShopperProfileSaleInputs(initialShopperSaleState);
      setAgentOrderInputs(initialAgentOrderState);
      setSelectedProducts([]);
      // Clear supplier products to ensure clean state
      dispatch(setSuppliersProducts([]));
    },
    [dispatch]
  );

  const goToOrderSaleSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < orderSaleSlides.length) {
        setActiveOrderSaleSlideIndex(index);
      }
    },
    [orderSaleSlides.length]
  );

  // Data loaders factory
  const createAgentDataLoaders = useCallback(
    () => ({
      userProfile: {
        key: "userProfile",
        loader: async () => {
          await getRequest("/view_profile", (data) => {
            if (data.is_success) {
              dispatch(setUserProfile(data.payload));
            }
          });
        },
      },
      businesses: {
        key: "businesses",
        loader: async () => {
          await getBusinesses("/all_business_sales_agents", (data) => {
            dispatch(setBusinesses(data.is_success ? data.payload : []));
          });
        },
      },

      weightTypes: {
        key: "weightTypes",
        loader: async () => {
          await getWeightTypes("/weight_types", (data) => {
            if (data.is_success) {
              dispatch(setWeightTypes(data.payload));
            }
          });
        },
      },

      volumeTypes: {
        key: "volumeTypes",
        loader: async () => {
          await getVolumeTypes("/volume_types", (data) => {
            if (data.is_success) {
              dispatch(setVolumeTypes(data.payload));
            }
          });
        },
      },

      businessTypes: {
        key: "businessTypes",
        loader: async () => {
          await getBusinessTypes("/business_types", (data) => {
            if (data.is_success) {
              dispatch(setBusinessTypes(data.payload));
            }
          });
        },
      },

      productCategories: {
        key: "productCategories",
        loader: async () => {
          await getProductCategories("/get_all_categories", (data) => {
            if (data.is_success) {
              dispatch(setProductCategories(data.payload));
            }
          });
        },
      },

      brands: {
        key: "brands",
        loader: async () => {
          await getBrands("/get_all_brands", (data) => {
            if (data.is_success) {
              dispatch(setBrands(data.payload));
            }
          });
        },
      },

      packages: {
        key: "packages",
        loader: async () => {
          await getPackages("/get_all_packages", (data) => {
            if (data.is_success) {
              dispatch(setPackages(data.payload));
            }
          });
        },
      },

      platformBusinesses: {
        key: "platformBusinesses",
        loader: async () => {
          await getPlatformBusiness("/get_platform_businesses", (data) => {
            if (data.is_success) {
              dispatch(setPlatformBusiness(data.payload));
            } else {
              dispatch(setPlatformBusiness([]));
            }
          });
        },
      },

      salesAgentId: {
        key: "salesAgentId",
        loader: async () => {
          await getSalesAgentId(
            `/get_loggedin_agent?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setSalesAgentId(data.is_success ? data.payload : ""));
            }
          );
        },
        dependencies: ["businesses"],
      },

      overviewData: {
        key: "overviewData",
        loader: async () => {
          await getOverviewData(
            `/agent/overview?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setOverView(data.is_success ? data.payload : {}));
            }
          );
        },
        dependencies: ["businesses"],
      },

      customers: {
        key: "customers",
        loader: async () => {
          await getCustomers(
            `/get_all_customers_by_sales_agent?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setCustomers(data.is_success ? data.payload : []));
            }
          );
        },
        dependencies: ["businesses"],
      },

      products: {
        key: "products",
        loader: async () => {
          await getProducts(
            `/get_all_products?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setProducts(data.is_success ? data.payload : []));
            }
          );
        },
        dependencies: ["businesses"],
      },

      suppliers: {
        key: "suppliers",
        loader: async () => {
          await getSuppliers(
            `/get_all_suppliers/${activeBusiness?.id}`,
            (data) => {
              dispatch(setSuppliers(data.is_success ? data.payload : []));
            }
          );
        },
        dependencies: ["businesses"],
      },

      salesData: {
        key: "salesData",
        loader: async () => {
          await getSales(
            `/agent_sales?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setSales(data.is_success ? data.payload : []));
            }
          );
        },
        dependencies: ["businesses"],
      },

      salesAgents: {
        key: "salesAgents",
        loader: async () => {
          await getSalesAgents(
            `/get_all_sales_agents?business_id=${activeBusiness?.id}`,
            (data) => {
              dispatch(setSalesAgents(data.is_success ? data.payload : []));
            }
          );
        },
        dependencies: ["businesses"],
      },

      agentRequestHistory: {
        key: "agentRequestHistory",
        loader: async () => {
          await getAgentRequestHistory(`/agent/request/history`, (data) => {
            dispatch(
              setRequestOrderHistory(data.is_success ? data.payload : [])
            );
          });
        },
      },

      orderHistory: {
        key: "orderHistory",
        loader: async () => {
          await getAllOrderHistory(`/agent/orders/history`, (data) => {
            dispatch(setOrderHistory(data.is_success ? data.payload : []));
          });
        },
      },
    }),
    [activeBusiness?.id, dispatch]
  );

  // Public loader functions
  const loadAgentData = useCallback(async () => {
    const loaders = createAgentDataLoaders();
    await loadData([
      loaders.userProfile,
      loaders.businesses,
      loaders.weightTypes,
      loaders.volumeTypes,
      loaders.businessTypes,
      loaders.productCategories,
      loaders.brands,
      loaders.packages,
      loaders.platformBusinesses,
      loaders.agentRequestHistory,
      loaders.orderHistory,
      // Removed business-dependent loaders: products, overviewData, salesAgentId
    ]);
  }, [loadData, createAgentDataLoaders]);

  const loadProfileData = useCallback(async () => {
    const loaders = createAgentDataLoaders();
    await loadData([loaders.userProfile]);
  }, [loadData, createAgentDataLoaders]);

  const loadAgentBusinessData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([
      loaders.customers,
      loaders.suppliers,
      loaders.products,
      loaders?.salesData,
      loaders.salesAgents,
      loaders.salesAgentId,
    ]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentSalesData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.salesData]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentCustomersData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.customers]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentProductsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.products]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentSuppliersData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.suppliers]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentSalesAgentsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.salesAgents]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadSalesAgentId = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.salesAgentId]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentOverviewData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createAgentDataLoaders();
    await loadData([loaders.overviewData]);
  }, [loadData, createAgentDataLoaders, activeBusiness?.id]);

  const loadAgentHistoryData = useCallback(async () => {
    const loaders = createAgentDataLoaders();
    await loadData([loaders.agentRequestHistory, loaders.orderHistory]);
  }, [loadData, createAgentDataLoaders]);

  const loadAgentSalesByDateRange = useCallback(async () => {
    if (!activeBusiness?.id) return;

    const ranges: ("today" | "week" | "all")[] = ["today", "week", "all"];

    const loaders = ranges.map((range) => {
      let url: string;
      let dispatchAction: any;
      let key: string;

      if (range === "today") {
        const today = getDateRange("today");
        url = `/agent_sales?business_id=${activeBusiness.id}&start_date=${today.start}&end_date=${today.end}`;
        dispatchAction = setTodaySales;
        key = `agent-sales-today-${activeBusiness.id}`;
      } else if (range === "week") {
        const week = getDateRange("thisWeek");
        url = `/agent_sales?business_id=${activeBusiness.id}&start_date=${week.start}&end_date=${week.end}`;
        dispatchAction = setWeekSales;
        key = `agent-sales-week-${activeBusiness.id}`;
      } else {
        url = `/agent_sales?business_id=${activeBusiness.id}`;
        dispatchAction = setSales;
        key = `agent-sales-all-${activeBusiness.id}`;
      }

      return {
        key,
        loader: async () => {
          await getSales(url, (data) => {
            dispatch(dispatchAction(data.is_success ? data.payload : []));
          });
        },
      };
    });

    await loadData(loaders);
  }, [loadData, activeBusiness?.id, dispatch]);

  const loadAgentRequestHistoryByRange = useCallback(async () => {
    const ranges: ("today" | "week" | "all")[] = ["today", "week", "all"];

    const loaders = ranges.map((range) => {
      let url: string;
      let dispatchAction: any;
      let key: string;

      if (range === "today") {
        url = `/agent/request/history?range=today`;
        dispatchAction = setTodayRequestOrderHistory;
        key = `agent-request-history-today`;
      } else if (range === "week") {
        url = `/agent/request/history?range=week`;
        dispatchAction = setWeekRequestOrderHistory;
        key = `agent-request-history-week`;
      } else {
        url = `/agent/request/history`;
        dispatchAction = setRequestOrderHistory;
        key = `agent-request-history-all`;
      }

      return {
        key,
        loader: async () => {
          await getAgentRequestHistory(url, (data) => {
            dispatch(dispatchAction(data.is_success ? data.payload : []));
          });
        },
      };
    });

    await loadData(loaders);
  }, [loadData, dispatch]);

  const getAgentOrderHistoryData = async () => {
    await getAllOrderHistory(`/agent/orders/history?range=today`, (data) => {
      dispatch(setTodayOrderHistory(data.is_success ? data.payload : []));
    });

    await getAllOrderHistory(`/agent/orders/history?range=week`, (data) => {
      dispatch(setWeekOrderHistory(data.is_success ? data.payload : []));
    });

    await getAllOrderHistory(`/agent/orders/history?range=today`, (data) => {
      dispatch(setOrderHistory(data.is_success ? data.payload : []));
    });
  };

  const getAgentSalesHistoryData = async () => {
    const today = getDateRange("today");
    const week = getDateRange("thisWeek");

    if (!activeBusiness?.id) return;

    await getAllOrderHistory(
      `/agent_sales?business_id=${activeBusiness.id}&start_date=${today.start}&end_date=${today.end}`,
      (data) => {
        dispatch(setTodaySales(data.is_success ? data.payload : []));
      }
    );

    await getAllOrderHistory(
      `/agent_sales?business_id=${activeBusiness.id}&start_date=${week.start}&end_date=${week.end}`,
      (data) => {
        dispatch(setWeekSales(data.is_success ? data.payload : []));
      }
    );

    await getAllOrderHistory(
      `/agent_sales?business_id=${activeBusiness.id}`,
      (data) => {
        dispatch(setSales(data.is_success ? data.payload : []));
      }
    );
  };

  const getAgentRequestHistoryData = async () => {
    await getAllOrderHistory(`/agent/request/history?range=today`, (data) => {
      dispatch(
        setTodayRequestOrderHistory(data.is_success ? data.payload : [])
      );
    });

    await getAllOrderHistory(`/agent/request/history?range=week`, (data) => {
      dispatch(setWeekRequestOrderHistory(data.is_success ? data.payload : []));
    });

    await getAllOrderHistory(`/agent/request/history?range=all`, (data) => {
      dispatch(setRequestOrderHistory(data.is_success ? data.payload : []));
    });
  };

  const loadAgentOrderHistoryByRange = useCallback(async () => {
    const ranges: ("today" | "week" | "all")[] = ["today", "week", "all"];

    const loaders = ranges.map((range) => {
      let url: string;
      let dispatchAction: any;
      let key: string;

      if (range === "today") {
        url = `/agent/orders/history?range=today`;
        dispatchAction = setTodayOrderHistory;
        key = `agent-order-history-today`;
      } else if (range === "week") {
        url = `/agent/orders/history?range=week`;
        dispatchAction = setWeekOrderHistory;
        key = `agent-order-history-week`;
      } else {
        url = `/agent/orders/history`;
        dispatchAction = setOrderHistory;
        key = `agent-order-history-all`;
      }

      return {
        key,
        loader: async () => {
          await getAllOrderHistory(url, (data) => {
            dispatch(dispatchAction(data.is_success ? data.payload : []));
          });
        },
      };
    });

    await loadData(loaders);
  }, [loadData, dispatch]);

  const handleProfileUpdate = useCallback(
    async (payload: UserProfile, profileImage?: File) => {
      const formData = new FormData();
      let body;

      body = {
        payload: JSON.stringify(payload),
      };

      if (profileImage) {
        body = {
          payload: JSON.stringify(payload),
          profile_image: profileImage,
        };
      }
      for (const key in body) {
        //@ts-ignore
        formData.append(key, body[key]);
      }
      await updateProfile("/update_profile", formData, (data) => {
        if (data.is_success) {
          invalidateData(["userProfile"]);
          loadProfileData();
        }
      });
    },
    [loadProfileData]
  );

  // Get suppliers products
  const getAllSuppliersProducts = async (supplierId: string) => {
    await getProducts(`/get_all_products?business_id=${supplierId}`, (data) => {
      dispatch(setSuppliersProducts(data.is_success ? data.payload : []));
    });
  };

  const handleCreateCustomer = useCallback(
    async (formPayload: CreateCustomerProps, cb: () => void) => {
      await createCustomer(
        `/create_customer`,
        {
          ...formPayload,
          business_id: activeBusiness?.id,
          customer_entity_type: "business",
        },
        (data) => {
          if (data.is_success) {
            invalidateData(["customers"]);
            loadAgentCustomersData();
            cb();
          }
        }
      );
    },
    [activeBusiness?.id, loadAgentCustomersData]
  );

  const handleDeleteCustomer = async (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => {
    await deleteCustomer(`/delete_customer/${formPayload.id}`, (data) => {
      if (data.is_success) {
        loadAgentCustomersData();
        cb();
      }
    });
  };

  const handleDeleteSpecificOrderHistory = useCallback(
    async (id: string) => {
      await removeSpecOrderHistory(`/delete_sale?sale_id=${id}`, (data) => {
        if (data.is_success) {
          getAgentOrderHistoryData();
          loadAgentHistoryData();
        }
      });
    },
    [loadAgentHistoryData]
  );

  const handleDeleteSpecificRequestHistory = useCallback(
    async (id: string) => {
      await removeSpecRequestHistory(`/remove_agent/${id}`, (data) => {
        if (data.is_success) {
          getAgentRequestHistoryData();
          loadAgentHistoryData();
        }
      });
    },
    [loadAgentHistoryData]
  );

  const setSalesAgentIdInfo = useCallback(async () => {
    return new Promise<string>((resolve) => {
      getSalesAgentId(
        `/get_loggedin_agent?business_id=${activeBusiness?.id}`,
        (data) => {
          const agentId = data.is_success ? data.payload : "";
          dispatch(setSalesAgentId(agentId));
          resolve(agentId);
        }
      );
    });
  }, [activeBusiness?.id, dispatch, getSalesAgentId]);

  const handleSubmitOrder = useCallback(
    async (formPayload: CreateRequestOrderProps, cb: () => void) => {
      let currentSalesAgentId = sales_agent_id;

      if (!currentSalesAgentId) {
        currentSalesAgentId = await setSalesAgentIdInfo();
      }

      if (!currentSalesAgentId) {
        console.error("Failed to get sales agent ID");
        return;
      }

      await addNewOrder(
        `/agent/create_order`,
        {
          ...formPayload,
          sales_agent_id: currentSalesAgentId,
          business_id: activeBusiness?.id,
        },
        async (data) => {
          if (data.is_success) {
            getAgentOrderHistoryData();
            await loadAgentOrderHistoryByRange();
            resetOrderSaleSlides(false); // Reset form state after successful order submission
            resetSalesRequestState(); // Reset auth context state
            cb();
          }
        }
      );
    },
    [
      sales_agent_id,
      activeBusiness?.id,
      loadAgentOrderHistoryByRange,
      setSalesAgentIdInfo,
      getAgentOrderHistoryData,
      resetOrderSaleSlides,
      resetSalesRequestState,
    ]
  );

  const handleAgentRequest = useCallback(
    async (formPayload: any, cb: () => void) => {
      await addAgentRequest(
        `/create_new_agent_request?business_id=${activeBusiness?.id}`,
        {
          ...formPayload,
          sales_agent_id: sales_agent_id,
          status: "pending",
        },
        (data) => {
          if (data.is_success) {
            getAgentRequestHistoryData();
            loadAgentRequestHistoryByRange();
            resetOrderSaleSlides(false); // Reset form state after successful request submission
            resetSalesRequestState(); // Reset auth context state
            cb();
          }
        }
      );
    },
    [
      activeBusiness?.id,
      sales_agent_id,
      loadAgentRequestHistoryByRange,
      resetOrderSaleSlides,
      resetSalesRequestState,
    ]
  );

  const handleUpdatePin = async (pinData: PinChangeProps) =>
    await updatePin("/change_pin", pinData, (data) => {
      if (data.is_success) {
        loadProfileData();
      }
    });

  const handleCreateSale = useCallback(
    async (formPayload: any, cb: () => void) => {
      await createSale(
        `/agent_sales`,
        {
          ...formPayload,
          business_id: activeBusiness?.id,
        },
        (data) => {
          if (data.is_success) {
            getAgentSalesHistoryData();
            invalidateData(["salesData"]);
            loadAgentSalesData();
            resetOrderSaleSlides(false);
            resetSalesRequestState(); // Reset auth context state
            cb();
          }
        }
      );
    },
    [
      activeBusiness?.id,
      loadAgentSalesData,
      resetOrderSaleSlides,
      resetSalesRequestState,
    ]
  );

  const handleDeleteAgentSales = useCallback(
    async (formPayload: any, cb: () => void) => {
      await deleteAgentSales(
        `/delete_sale?sale_id=${formPayload.id}`,
        (data) => {
          if (data.is_success) {
            invalidateData(["salesData"]);
            getAgentSalesHistoryData();
            loadAgentSalesData();
            cb();
          }
        }
      );
    },
    [loadAgentSalesData]
  );

  const handleCreateProduct = useCallback(
    async (formPayload: Product, file: File, cb: () => void) => {
      const cleanedPayload = { ...formPayload };

      if (cleanedPayload.category_id === "") {
        delete cleanedPayload.category_id;
      }

      const formData = new FormData();
      formData.append("payload", JSON.stringify(cleanedPayload));
      formData.append("file", file);

      await createProduct(`/create_product`, formData, (data) => {
        if (data.is_success) {
          invalidateData(["products"]);
          loadAgentProductsData();
          cb();
        }
      });
    },
    [loadAgentProductsData]
  );

  const fetchNotificationStatus = async () => {
    await getNotificationStatus("/notifications/status", (data) => {
      if (data.is_success) {
        setNotificationStatus(data.payload.is_notifications_enabled);
      }
    });
  };

  const handleToggleNotification = async (enabled: boolean, cb: () => void) => {
    await toggleNotification("/notifications/toggle", (data: any) => {
      if (data.is_success) {
        setNotificationStatus(enabled);
        cb();
      }
    });
  };

  // Initialize authentication and data loading
  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = loginData?.refresh_token;

      if (isPublicRoute(pathname)) return;

      if (!refreshToken || (refreshToken.match(/\./g) || []).length !== 2) {
        dispatch(logUserOut());
        router.push(ROUTES.login);
        return;
      }

      await refresh(`/refresh?refresh_token=${refreshToken}`, (data) => {
        if (data.is_success) {
          dispatch(setAccessToken(data.payload));
          localStorage.setItem("access_token", data.payload.access_token);
          loadAgentData();
        } else {
          dispatch(logUserOut());
          router.push(ROUTES.login);
        }
      });
    };

    initializeAuth();
  }, [dispatch, router, pathname, loginData?.refresh_token, loadAgentData]);

  // Set active business when businesses load
  useEffect(() => {
    if (businesses?.length > 0 && !activeBusiness) {
      dispatch(setActiveBusiness(businesses[0]));
    }
  }, [businesses, activeBusiness, dispatch]);

  // Load business-dependent data when active business is set
  useEffect(() => {
    if (activeBusiness?.id) {
      // Load sales agent ID first since it's needed for other operations
      loadSalesAgentId();

      // Load all business-dependent data
      loadAgentBusinessData();
      loadAgentOverviewData();
      loadAgentSalesByDateRange();
    }
  }, [
    activeBusiness?.id,
    loadSalesAgentId,
    loadAgentBusinessData,
    loadAgentOverviewData,
    loadAgentSalesByDateRange,
  ]);

  // Context value
  const value: AgentContextType = {
    // Loading states
    isLoading: isProfileFetching,
    isBusinessesLoading,
    isCustomersLoading,
    isCustomerDeleting,
    isCustomerCreating,
    isSaleCreating,
    isSalesLoading,
    isProductCreating,
    isAddOrderLoading,
    isAgentRequestCreating,
    isDeletingRequestHistory,
    isDeletingOrderHistory,
    isAgentSaleDeleting,
    isPinUpdating,
    isProfileUpdating,

    //Enable Notification
    isNotificationEnabling,
    handleToggleNotification,
    notificationStatus,
    getNotificationStatus: fetchNotificationStatus,
    getAllSuppliersProducts,

    // Actions
    handleProfileUpdate,
    handleUpdatePin,
    handleCreateProduct,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleAgentRequest,
    handleDeleteSpecificOrderHistory,
    handleDeleteSpecificRequestHistory,
    handleSubmitOrder,
    handleCreateSale,
    handleDeleteAgentSales,

    // Slide management
    activeOrderSaleSlideIndex,
    setActiveOrderSaleSlideIndex,
    orderSaleSlides,
    nextOrderSaleSlide,
    prevOrderSaleSlide,
    resetOrderSaleSlides,
    goToOrderSaleSlide,

    // Form management
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
    handleShopperSaleInputChange,
    agentOrderInputs,
    setAgentOrderInputs,
    handleAgentOrderInputChange,

    // Product management
    selectedProducts,
    setSelectedProducts,
    addProduct,
    removeProduct,
    toggleProduct,

    // Data loaders
    loadAgentData,
    loadAgentBusinessData,
    loadAgentSalesData,
    loadAgentCustomersData,
    loadAgentProductsData,
    loadAgentSuppliersData,
    loadAgentSalesAgentsData,
    loadSalesAgentId,
    loadAgentOverviewData,
    loadAgentHistoryData,
    loadAgentSalesByDateRange,
    loadAgentRequestHistoryByRange,
    loadAgentOrderHistoryByRange,

    // Utilities
    setFetchCount,
  };

  return (
    <AgentContext.Provider value={value}>{children}</AgentContext.Provider>
  );
};

// Custom hook
export const useAgent = () => {
  return useContext(AgentContext) as AgentContextType;
};

export default AgentProvider;
