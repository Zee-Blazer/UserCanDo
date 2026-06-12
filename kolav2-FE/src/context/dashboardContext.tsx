"use client";
import useApiRequest from "@/api/hooks/useApiRequest";
import { useLazyData } from "@/api/hooks/useLazyData";
import { ROUTES } from "@/constants/routes";
import { logUserOut, setAccessToken } from "@/Redux/features/authSlice";
import {
  setActiveBusiness,
  setAgents,
  setBrands,
  setBusinesses,
  setCustomers,
  setSales,
  setProfileCompletion,
  setSalesOverview,
  setPackages,
  setProductCategories,
  setProducts,
  setUserProfile,
  setVolumeTypes,
  setWeightTypes,
  setSuppliers,
  setOrders,
  setApprovedOrders,
  setOutForDeliveryOrders,
  setDeliveredOrders,
  setPendingOrders,
  setRejectedOrders,
  setRefundedOrders,
  setAutomobileProducts,
  setElectronicProducts,
  setFashionProducts,
  setHomeKitchenProducts,
  setSportFitnessProducts,
  setUncategorizedProducts,
  setProductsByBrand,
  setAllAbandonedCart,
  setAbandonedCart,
  setTeam,
  setAgentRequests,
  setBusinessTypes,
  setPlatformBusiness,
  setSuppliersProduct,
  setAllPurchaseOrder,
  setNotifications,
  setSupplierOrders,
  setSalesSummary,
  setSalesSupplier,
  setSalesCustomer,
  setSalesRegion,
  setSalesProduct,
  setCreditApplications,
  setSuppliersTerms,
  setApprovedTerms,
  setPendingTerms,
  setDeclinedTerms,
  setOnHoldTerms,
  setNewTerms,
  setRecoveryWindowTerms,
  setSalesLog,
  setOwnerAgents,
  setManagerAgents,
  setRegularAgents,
  setAgentStock,
  setOrderOperation,
  setCustomersOverview,
  setCreditScore,
  setStaff,
  setTopSellingAgents,
  setCancelledOrders,
} from "@/Redux/features/dashboardSlice";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { isPublicRoute } from "@/utils/auth";
import { getOrdersOverviewDateRange } from "@/utils/helpers";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

interface LoadingStates {
  isLoading: boolean;
  isProfileUpdating: boolean;
  isBusinessCreating: boolean;
  isBusinessEditing: boolean;
  isBusinessDeleting: boolean;
  isBusinessTypesLoading: boolean;
  isPlatformBusinessesLoading: boolean;

  // Staff related loading states
  isStaffCreating: boolean;
  isStaffUpdating: boolean;
  isStaffDeleting: boolean;
  isStaffLoading: boolean;
  isStaffSuspending: boolean;

  // Sales related loading states
  isSaleCreating: boolean;
  isSaleEditing: boolean;
  isSaleDeleting: boolean;
  isSaleCartCreating: boolean;
  isSaleStatusUpdating: boolean;
  isSaleBulkUploading: boolean;
  isSalesSummaryLoading: boolean;
  isSalesSupplierLoading: boolean;
  isSalesCustomerLoading: boolean;
  isSalesRegionLoading: boolean;
  isSalesProductLoading: boolean;
  isSalesLogLoading: boolean;

  // Customer related loading states
  isCustomerCreating: boolean;
  isCustomerAdding: boolean;
  isCustomerUpdating: boolean;
  isCustomerDeleting: boolean;
  isCusomtersLoading: boolean;
  isCustomerBulkUploading: boolean;

  // Product related loading states
  isProductCreating: boolean;
  isProductUpdating: boolean;
  isProductInfoDeleting: boolean;
  isInventoryBulkUploading: boolean;
  isProductsByBrandLoading: boolean;
  isProductBrandCreating: boolean;
  isProductCategoryCreating: boolean;

  // Order related loading states
  isOrderCreating: boolean;
  isOrderEditing: boolean;
  isOrderDeleting: boolean;
  isOrdersLoading: boolean;
  isOrderFileUploading: boolean;
  isCostRecording: boolean;
  isAbandonCartCreating: boolean;
  isAbandonCartDeleting: boolean;
  isFindAbandonedCartLoading: boolean;

  // Supplier related loading states
  isSupplierCreating: boolean;
  isSupplierAdding: boolean;
  isSupplierDeleting: boolean;
  isSuppliersLoading: boolean;
  isSupplierOrdersLoading: boolean;
  isSuppliersProductLoading: boolean;

  // Purchase order related loading states
  isPurchaseOrderLoading: boolean;
  isPurchaseOrderCreating: boolean;
  isPurchaseOrderUpdating: boolean;
  isPuchaseOrderDeleting: boolean;

  // Team related loading states
  isTeamCreating: boolean;
  isTeamUpdating: boolean;
  isTeamDeleting: boolean;
  isTeamsLoading: boolean;

  // Sales agent related loading states
  isSalesAgentCreating: boolean;
  isSalesAgentDeleting: boolean;
  isSalesAgentUpdating: boolean;

  // Agent request related loading states
  isAgentRequestCreating: boolean;
  isAgentRequestEditing: boolean;
  isAgentRequestStatusEditing: boolean;
  isAgentRequestDeleting: boolean;
  isTopSellingAgentsLoading: boolean;

  // Credit related loading states
  isCreditApplicationFetching: boolean;
  isCreditApplicationCreating: boolean;
  isCreditApplicationUpdating: boolean;
  isCreditApplicationDeleting: boolean;
  isCreditAcessmentCreating: boolean;
  isCreditAccessmentDeleting: boolean;
  isCreditScoreLoading: boolean;
  isCreditOrderCreating: boolean;
  isCreditInvoiceUpLoading: boolean;
  isCreditRequestDeleting: boolean;
  // Notification related loading states
  isNotificationFetching: boolean;
  isNotificationUpdating: boolean;
  isNotificationDeleting: boolean;

  // Misc loading states
  isPinUpdating: boolean;
}

interface DataLoaders {
  // Core data loaders
  loadUserData: () => Promise<void>;
  loadProfileData: () => Promise<void>;
  loadBusinessData: () => Promise<void>;
  loadTopSellingAgentData: () => Promise<void>;
  loadSalesData: () => Promise<void>;
  loadProductsData: () => Promise<void>;
  loadCustomersData: () => Promise<void>;
  loadAbandonedCartsData: () => Promise<void>;
  loadOrdersData: () => Promise<void>;
  loadReportsData: () => Promise<void>;
  loadStaffData: () => Promise<void>;
  loadAgentRequestsData: () => Promise<void>;
  loadSalesAgentsData: () => Promise<void>;
  loadNotificationsData: () => Promise<void>;
  loadCreditData: () => Promise<void>;
  loadSupplierData: () => Promise<void>;
  loadSupplierTermsData: () => Promise<void>;
  loadPurchaseOrdersData: () => Promise<void>;
  loadTeamData: () => Promise<void>;

  // Specific loaders
  loadProductsByCategory: (categoryId?: string) => Promise<void>;
  loadSuppliersProducts: (
    supplierEntityId?: string,
    noCache?: boolean
  ) => Promise<void>;
  loadOrdersByStatus: (status?: string) => Promise<void>;
  loadAbandonedCart: (cartId: string) => Promise<any>;
  loadOrderOperation: (params?: any) => Promise<any>;
}

interface StaffActions {
  handleCreateStaff: (formPayload: CreateStaffProps, cb: () => void) => void;
  handleUpdateStaff: (formPayload: CreateStaffProps, cb: () => void) => void;
  handleSuspendStaff: (formPayload: CreateStaffProps, cb: () => void) => void;
  handleDeleteStaff: (formPayload: CreateStaffProps, cb: () => void) => void;
}

interface BusinessActions {
  handleCreateBusiness: (
    formPayload: CreateBusinessProps,
    file: File | null,
    cb: () => void
  ) => void;
  handleUpdateBusiness: (
    formPayload: CreateBusinessProps,
    file: File | null,
    cb: () => void
  ) => void;
  handleDeleteBusiness: (
    formPayload: CreateBusinessProps,
    cb: () => void
  ) => void;
  handleChangeOrderStatus: (
    sales_id: string,
    status: string,
    status_date: string,
    comment?: string
  ) => Promise<void>;
}

interface SalesActions {
  handleCreateSale: (formPayload: CreateSaleProps, cb: () => void) => void;
  handleCreateSaleCart: (formPayload: CreateSaleProps, cb: () => void) => void;
  handleDeleteSale: (formPayload: CreateSaleProps, cb: () => void) => void;
  handleUpdateSale: (formPayload: CreateSaleProps, cb: () => void) => void;
  handleUpdateSaleStatus: (
    formPayload: SaleStatusProps,
    cb: () => void
  ) => void;
  handleSaleBulkUpload: (sales_data_file: File | null, cb: () => void) => void;
}

interface CustomerActions {
  handleCreateCustomer: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleAddCustomer: (formPayload: CreateCustomerProps, cb: () => void) => void;
  handleUpdateCustomer: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleDeleteCustomer: (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => void;
  handleCustomerBulkUpload: (file: File | null, cb: () => void) => void;
}

interface ProductActions {
  handleCreateProduct: (
    formPayload: Product | any,
    file: File | null,
    cb: () => void
  ) => void;
  handleUpdateProduct: (
    formPayload: Product,
    file: File,
    cb: () => void
  ) => void;
  handleDeleteProductInfo: (formPayload: Product, cb: () => void) => void;
  handleInventoryBulkUpload: (file: File | null, cb: () => void) => void;
  handleCreateBrand: (brand_name: string, cb: () => void) => void;
  handleCreateProductCategory: (formPayload: FormData, cb: () => void) => void;
}

interface OrderActions {
  handleCreateOrder: (formPayload: CreateOrderProps, cb: () => void) => void;
  handleUpdateOrder: (formPayload: CreateOrderProps, cb: () => void) => void;
  handleDeleteOrder: (formPayload: CreateOrderProps, cb: () => void) => void;
  handleCreateAbandonCart: (
    formPayload: AbandonCartProps,
    cb: () => void
  ) => void;
  handleDeleteAllAbandonCart: (cb: () => void) => void;
  refreshAllOrdersData: () => Promise<void>;
  handleOrderFileUpload: (
    order_id: string,
    file: File | null,
    cb: (success: boolean) => void
  ) => void;
  handleRecordCost: (
    saleId: string,
    costs: Array<{
      cost_type: string;
      amount: number;
      source_id: string;
    }>,
    cb: () => void
  ) => void;
}

interface SupplierActions {
  handleCreateSupplier: (
    formPayload: CreateSuppliersProps,
    cb: () => void
  ) => void;
  handleAddSupplier: (formPayload: AddSuppliersProps, cb: () => void) => void;
  handleDeleteSupplier: (
    formPayload: CreateSuppliersProps,
    cb: () => void
  ) => void;
  handleCreateSuppliersTerm: (formPayload: any, cb: () => void) => void;
  handleUpdateSuppliersTerm: (formPayload: any, cb: () => void) => void;
  handleDeleteCreditRequest: (formPayload: any, cb: () => void) => void;
  handleUploadCreditInvoice: (
    formPayload: CreditInvoiceFormProps,
    cb: () => void
  ) => void;
}

interface PurchaseOrderActions {
  handleAddPurchaseOrder: (
    formPayload: CreatePurchaseOrderProps,
    cb: () => void
  ) => void;
  handleUpdatePurchaseOrder: (
    formPayload: CreatePurchaseOrderProps,
    orderId: string,
    cb: () => void
  ) => void;
  handleDeletePurchaseOrder: (
    formPayload: PurchaseOrderProps,
    cb: () => void
  ) => void;
}

interface TeamActions {
  handleCreateTeamMember: (formPayload: TeamListProps, cb: () => void) => void;
  handleUpdateTeamMember: (formPayload: TeamListProps, cb: () => void) => void;
  handleDeleteTeamMember: (formPayload: TeamListProps, cb: () => void) => void;
}

interface SalesAgentActions {
  handleCreateSalesAgent: (
    formPayload: CreateSalesAgentProps,
    cb: () => void
  ) => void;
  handleDeleteSalesgent: (
    formPayload: CreateSalesAgentProps,
    cb: () => void
  ) => void;
  handleUpdateSaleAgent: (
    formPayload: CreateSalesAgentProps,
    cb: () => void
  ) => void;
}

interface AgentRequestActions {
  handleCreateAgentRequest: (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => void;
  handleUpdateAgentRequest: (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => void;
  handleUpdateAgentRequestStatus: (
    formPayload: UpdateAgentRequestStatusProps,
    cb: () => void
  ) => void;
  handleDeleteAgentRequest: (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => void;
}

interface CreditActions {
  handleCreateCreditApplication: (
    formPayload: CreditLimitFormProps,
    sales_record_file: File | null,
    supplier_distributor_statement_file: File | null,
    verified_bank_statement_file: File | null,
    identification_file: File | null,
    cb: () => void
  ) => void;
  handleCreateCreditAccessment: (
    formPayload: CreditAccessmentFormProps,
    cb: () => void
  ) => void;
  handleDeleteCreditApplication: (
    formPayload: CreditLimitFormProps,
    cb: () => void
  ) => void;
  handleDeleteCreditAccessment: (
    formPayload: CreditLimitFormProps,
    cb: () => void
  ) => void;
  handleUpdateCreditApplication: (
    formPayload: CreateCreditFormDataProps,
    sales_record_file: File | null,
    supplier_distributor_statement_file: File | null,
    verified_bank_statement_file: File | null,
    identification_file: File | null,
    cb: () => void
  ) => void;
  handleGetProductsByBrand: (brandID: string, cb: () => void) => void;
}

interface NotificationActions {
  handleUpdateNotificationStatus: (
    formPayload: NotificationProps,
    cb: () => void
  ) => void;
  handleDeleteNotification: (
    formPayload: NotificationProps,
    cb: () => void
  ) => void;
}

interface ProfileActions {
  handleProfileUpdate: (payload: UserProfile, profileImage?: File) => void;
  handleUpdatePin: (pinData: PinChangeProps) => void;
}

interface UtilityActions {
  setFetchCount: Dispatch<SetStateAction<number>>;
}

// Main interface combining all action groups
interface DashboardContextType
  extends LoadingStates,
    DataLoaders,
    StaffActions,
    BusinessActions,
    SalesActions,
    CustomerActions,
    ProductActions,
    OrderActions,
    SupplierActions,
    PurchaseOrderActions,
    TeamActions,
    SalesAgentActions,
    AgentRequestActions,
    CreditActions,
    NotificationActions,
    ProfileActions,
    UtilityActions {}

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

const CATEGORY_IDS = {
  FASHION: "90f1d9b3-543b-42e3-bd87-6807a3cad446",
  ELECTRONIC: "39ce0fbd-9777-4bd3-9812-d73eca4658e1",
  AUTOMOBILE: "48d54bbf-50b5-48ae-a6e2-ac9a1a91f9fd",
  SPORT_FITNESS: "bf480eb2-f856-4f6b-ae08-72dd0392464d",
  HOME_KITCHEN: "b5c3245c-da09-41a5-b822-a8c3ff0e94a8",
  UNCATEGORIZED: "undefined",
};

const DashboardProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { loginData } = useAuthSelector();
  const { activeBusiness, businesses } = useDashboardSelector();
  const [fetchCount, setFetchCount] = useState(0);
  const isBusinessDataLoaded = useRef(false);
  const { loadData, isLoaded, isLoading, invalidateData } = useLazyData();

  const CATEGORY_DISPATCH_MAP = {
    [CATEGORY_IDS.FASHION]: setFashionProducts,
    [CATEGORY_IDS.ELECTRONIC]: setElectronicProducts,
    [CATEGORY_IDS.AUTOMOBILE]: setAutomobileProducts,
    [CATEGORY_IDS.SPORT_FITNESS]: setSportFitnessProducts,
    [CATEGORY_IDS.HOME_KITCHEN]: setHomeKitchenProducts,
    [CATEGORY_IDS.UNCATEGORIZED]: setUncategorizedProducts,
  };

  const { loading: isProfileFetching, getRequest } = useApiRequest();

  const { loading: isStaffLoading, getRequest: getStaff } = useApiRequest();

  const { loading: isStaffCreating, postRequest: createStaff } =
    useApiRequest();

  const { loading: isStaffUpdating, patchRequest: updateStaff } =
    useApiRequest();

  const { loading: isStaffDeleting, deleteRequest: deleteStaff } =
    useApiRequest();

  const { loading: isStaffSuspending, patchRequest: suspendStaff } =
    useApiRequest();

  const { loading: isProfileUpdating, postRequest: updateProfile } =
    useApiRequest();

  const { loading: isPinUpdating, postRequest: updatePin } = useApiRequest();

  const { loading: isRefreshing, getRequest: refresh } = useApiRequest();

  const { loading: isBusinessesLoading, getRequest: getBusinesses } =
    useApiRequest();
  const {
    loading: isTopSellingAgentsLoading,
    getRequest: getTopSellingAgents,
  } = useApiRequest();

  const {
    loading: isPlatformBusinessesLoading,
    getRequest: getPlatformBusiness,
  } = useApiRequest();

  const { loading: isBusinessCreating, postRequest: createBusiness } =
    useApiRequest();

  const { loading: isBusinessEditing, postRequest: updateBusiness } =
    useApiRequest();

  const { loading: isBusinessDeleting, deleteRequest: deleteBusiness } =
    useApiRequest();

  const {
    loading: isLoadingOrderStatus,
    patchRequest: updateSalesOrderStatus,
  } = useApiRequest();

  const { loading: isCostRecording, postRequest: recordCostRequest } =
    useApiRequest();

  const {
    loading: isPuchaseOrderDeleting,
    deleteRequest: deletePurchaseOrder,
  } = useApiRequest();

  const { getRequest: getSales } = useApiRequest();

  const { loading: isCreditScoreLoading, getRequest: getCreditScore } =
    useApiRequest();

  const { getRequest: getSalesOverview } = useApiRequest();

  const { loading: isSalesLogLoading, getRequest: getSalesLog } =
    useApiRequest();

  const { loading: isSalesSummaryLoading, getRequest: getSalesSummaryReport } =
    useApiRequest();
  const {
    loading: isSalesSupplierLoading,
    getRequest: getSalesSupplierReport,
  } = useApiRequest();

  const {
    loading: isSalesCustomerLoading,
    getRequest: getSalesCustomerReport,
  } = useApiRequest();

  const { loading: isSalesRegionLoading, getRequest: getSalesRegionReport } =
    useApiRequest();

  const { loading: isSalesProductLoading, getRequest: getSalesProductReport } =
    useApiRequest();

  const { loading: isOrdersLoading, getRequest: getOrders } = useApiRequest();
  const { loading: isOrderFileUploading, postRequest: orderFileUpload } =
    useApiRequest();

  const { loading: isSaleCreating, postRequest: createSale } = useApiRequest();
  const { loading: isSaleBulkUploading, postRequest: saleBulkUpload } =
    useApiRequest();

  const {
    loading: isInventoryBulkUploading,
    postRequest: inventoryBulkUpload,
  } = useApiRequest();
  const { loading: isCustomerBulkUploading, postRequest: customerBulkUpload } =
    useApiRequest();
  const { loading: isSaleCartCreating, postRequest: createSaleCart } =
    useApiRequest();
  const { loading: isOrderCreating, postRequest: createOrder } =
    useApiRequest();

  const { loading: isAbandonCartCreating, postRequest: createAbandonCart } =
    useApiRequest();

  const { loading: isAbandonCartDeleting, deleteRequest: deleteAbandonCart } =
    useApiRequest();

  const { getRequest: getAllAbandonedCart } = useApiRequest();

  const { loading: isFindAbandonedCartLoading, getRequest: getAbandonedCart } =
    useApiRequest();

  const { loading: isPurchaseOrderLoading, getRequest: getALLPurchaseOrder } =
    useApiRequest();

  const { loading: isSupplierCreating, postRequest: createSupplier } =
    useApiRequest();

  const { loading: isSupplierAdding, postRequest: addSupplier } =
    useApiRequest();

  const { loading: isSuppliersLoading, getRequest: getSuppliers } =
    useApiRequest();

  const { loading: isSupplierOrdersLoading, getRequest: getSupplierOrders } =
    useApiRequest();

  const { loading: isSupplierDeleting, deleteRequest: deleteSupplier } =
    useApiRequest();
  const {
    loading: isCreditRequestDeleting,
    deleteRequest: deleteCreditRquest,
  } = useApiRequest();

  const {
    loading: isCreditAccessmentDeleting,
    deleteRequest: deleteCreditAccessment,
  } = useApiRequest();

  const { loading: isSaleEditing, patchRequest: updateSale } = useApiRequest();
  const { loading: isSaleStatusUpdating, patchRequest: updateSaleStatus } =
    useApiRequest();
  const { loading: isOrderEditing, patchRequest: updateOrder } =
    useApiRequest();

  const { loading: isSaleDeleting, deleteRequest: deleteSale } =
    useApiRequest();

  const { getRequest: customersOverviewEndpoint } = useApiRequest();

  const { loading: isOrderDeleting, deleteRequest: deleteOrder } =
    useApiRequest();

  const { loading: isCustomerDeleting, deleteRequest: deleteCustomer } =
    useApiRequest();

  const { loading: isProductCreating, postRequest: createProduct } =
    useApiRequest();

  const {
    loading: isProductCategoryCreating,
    postRequest: createProductCategory,
  } = useApiRequest();

  const { loading: isProductBrandCreating, postRequest: createProductBrand } =
    useApiRequest();

  const { loading: isPurchaseOrderCreating, postRequest: addPurchaseOrder } =
    useApiRequest();
  const {
    loading: isPurchaseOrderUpdating,
    patchRequest: updatePurchaseOrder,
  } = useApiRequest();

  const { getRequest: getBrands } = useApiRequest();

  const { getRequest: getProductCategories } = useApiRequest();

  const { getRequest: getPackages } = useApiRequest();

  const { getRequest: getProducts } = useApiRequest();

  const {
    loading: isSuppliersProductLoading,
    getRequest: getSuppliersProduct,
  } = useApiRequest();

  const { loading: isBusinessTypesLoading, getRequest: getBusinessTypes } =
    useApiRequest();

  const { loading: isProductUpdating, postRequest: updateProduct } =
    useApiRequest();

  const { getRequest: getWeightTypes } = useApiRequest();

  const { getRequest: getVolumeTypes } = useApiRequest();

  const { postRequest: createSalesAgent, loading: isSalesAgentCreating } =
    useApiRequest();

  const { getRequest: getSalesAgent, loading: isSalesAgentLoading } =
    useApiRequest();

  const { getRequest: getAgentStock, loading: isAgentStockLoading } =
    useApiRequest();

  const { loading: isSalesAgentDeleting, deleteRequest: deleteSalesAgent } =
    useApiRequest();

  const { loading: isSalesAgentUpdating, patchRequest: updateSalesAgent } =
    useApiRequest();

  const { getRequest: getCustomers, loading: isCusomtersLoading } =
    useApiRequest();

  const { getRequest: getProductsByBrand, loading: isProductsByBrandLoading } =
    useApiRequest();

  const { postRequest: createCustomer, loading: isCustomerCreating } =
    useApiRequest();

  const { patchRequest: updateCustomer, loading: isCustomerUpdating } =
    useApiRequest();

  const { postRequest: addCustomer, loading: isCustomerAdding } =
    useApiRequest();

  const { loading: isTeamsLoading, getRequest: getTeamMembers } =
    useApiRequest();

  const { loading: isTeamCreating, postRequest: createTeamMember } =
    useApiRequest();

  const { loading: isTeamUpdating, patchRequest: updateTeamMember } =
    useApiRequest();

  const { loading: isTeamDeleting, deleteRequest: deleteTeamMember } =
    useApiRequest();

  const { getRequest: getAgentRequests } = useApiRequest();

  const { loading: isAgentRequestCreating, postRequest: createAgentRequest } =
    useApiRequest();

  const { loading: isAgentRequestEditing, patchRequest: updateAgentRequest } =
    useApiRequest();

  const { loading: isNotificationFetching, getRequest: getNotifications } =
    useApiRequest();

  const { loading: isNotificationUpdating, patchRequest: updateNotifications } =
    useApiRequest();

  const { loading: isNotificationDeleting, deleteRequest: deleteNotification } =
    useApiRequest();

  const {
    loading: isCreditApplicationFetching,
    getRequest: getCreditApplications,
  } = useApiRequest();

  const {
    loading: isCreditApplicationDeleting,
    deleteRequest: deleteCreditApplication,
  } = useApiRequest();

  const {
    loading: isCreditApplicationCreating,
    postRequest: createCreditApplication,
  } = useApiRequest();

  const {
    loading: isCreditAcessmentCreating,
    postRequest: createCreditAccessment,
  } = useApiRequest();

  const {
    loading: isCreditApplicationUpdating,
    postRequest: updateCreditApplication,
  } = useApiRequest();

  const {
    loading: isAgentRequestStatusEditing,
    patchRequest: updateAgentRequestStatus,
  } = useApiRequest();

  const { loading: isAgentRequestDeleting, deleteRequest: deleteAgentRequest } =
    useApiRequest();

  const { loading: isProductInfoDeleting, deleteRequest: deleteProductInfo } =
    useApiRequest();

  const { getRequest: getSuppliersTerms } = useApiRequest();

  const { postRequest: createSuppliersTerm, loading: isCreditOrderCreating } =
    useApiRequest();

  const {
    postRequest: uploadCreditInvoice,
    loading: isCreditInvoiceUpLoading,
  } = useApiRequest();

  const { getRequest: getSuppliersTerm, loading: isSuppliersTermLoading } =
    useApiRequest();

  const {
    loading: isSuppliersTermDeleting,
    deleteRequest: deleteSuppliersTerm,
  } = useApiRequest();

  const {
    loading: isSuppliersTermUpdating,
    patchRequest: updateSuppliersTerm,
  } = useApiRequest();

  const { getRequest: getOrderOperation } = useApiRequest();

  const { getRequest: getProfileCompletion } = useApiRequest();

  const createDataLoaders = useCallback(
    () => ({
      // Core User & Auth Data
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
          await getBusinesses("/get_user_businesses", (data) => {
            if (data.is_success) {
              dispatch(setBusinesses(data.payload));
            } else {
              dispatch(setBusinesses([]));
            }
          });
        },
      },

      // System Reference Data (load once globally)
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

      staff: {
        key: `staff-${activeBusiness?.id}`,
        loader: async () => {
          await getStaff(
            `/get_all_staff?business_id=${activeBusiness?.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setStaff(data.payload));
              } else {
                dispatch(setStaff([]));
              }
            }
          );
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

      profileCompletion: {
        key: "profileCompletion",
        loader: async () => {
          await getProfileCompletion("/vendor_profile_completion", (data) => {
            if (data.is_success) {
              dispatch(setProfileCompletion(data.payload));
            }
          });
        },
      },

      notifications: {
        key: "notifications",
        loader: async () => {
          await getNotifications("get_all_notifications", (data) => {
            if (data.is_success) {
              dispatch(setNotifications(data.payload));
            } else {
              dispatch(setNotifications([]));
            }
          });
        },
      },

      creditScore: {
        key: "creditScore",
        loader: async () => {
          await getCreditScore("/score", (data) => {
            if (data.is_success) {
              dispatch(setCreditScore(data.payload));
            } else {
              dispatch(setCreditScore([]));
            }
          });
        },
      },

      creditApplications: {
        key: "creditApplications",
        loader: async () => {
          await getCreditApplications("get-credit-applications", (data) => {
            if (data.is_success) {
              dispatch(setCreditApplications(data.payload));
            }
          });
        },
      },

      customersOverview: {
        key: `customersOverview-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await customersOverviewEndpoint(
            `/customer_overview/${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setCustomersOverview(data.payload));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      salesAgents: {
        key: `salesAgents-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSalesAgent(
            `/get_all_sales_agents?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setAgents(data.payload));
              } else {
                dispatch(setAgents([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      topSellingAgents: {
        key: `topSellingAgents-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getTopSellingAgents(
            `/agent/topselling?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setTopSellingAgents(data.payload));
              } else {
                dispatch(setTopSellingAgents([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      agentStock: {
        key: `agentStock-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getAgentStock(
            `/get_agent_stock?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setAgentStock(data.payload));
              } else {
                dispatch(setAgentStock([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      agentRequests: {
        key: `agentRequests-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getAgentRequests(
            `/get_all_agents/${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setAgentRequests(data.payload));
              } else {
                dispatch(setAgentRequests([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      allAbandonedCarts: {
        key: `allAbandonedCarts-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getAllAbandonedCart(
            `/all_carts?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setAllAbandonedCart(data.payload));
              } else {
                dispatch(setAllAbandonedCart([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      customers: {
        key: `customers-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getCustomers(
            `/get_all_customers?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setCustomers(data.payload));
              } else {
                dispatch(setCustomers([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      products: {
        key: `products-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getProducts(
            `/get_all_products?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setProducts(data.payload));
              } else {
                dispatch(setProducts([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      purchaseOrders: {
        key: `purchaseOrders-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getALLPurchaseOrder(
            `/purchase_orders/${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setAllPurchaseOrder(data.payload));
              } else {
                dispatch(setAllPurchaseOrder([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      sales: {
        key: `sales-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSales(
            `/all_sales_by_type_status?business_id=${activeBusiness.id}&transaction_type=sale`,
            (data) => {
              if (data.is_success) {
                dispatch(setSales(data.payload));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      salesOverview: {
        key: `salesOverview-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSalesOverview(
            `sales_overview?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesOverview(data.payload));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      salesLog: {
        key: `salesLog-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSalesLog(
            `/business_import_logs?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesLog(data.payload));
              } else {
                dispatch(setSalesLog([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      orders: {
        key: `orders-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getOrders(
            `/all_sales_by_type_status?business_id=${activeBusiness.id}&transaction_type=order`,
            (data) => {
              if (data.is_success) {
                dispatch(setOrders(data.payload));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      supplierTerms: {
        key: `supplierTerms-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSuppliersTerms(
            `business/${activeBusiness.id}/supplier_terms`,
            (data) => {
              if (data.is_success) {
                dispatch(setSuppliersTerms(data.payload));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      suppliers: {
        key: `suppliers-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSuppliers(
            `/get_all_suppliers/${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSuppliers(data.payload));
              } else {
                dispatch(setSuppliers([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      supplierOrders: {
        key: `supplierOrders-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getSupplierOrders(
            `/get_all_business_orders/${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSupplierOrders(data.payload));
              } else {
                dispatch(setSupplierOrders([]));
              }
            }
          );
        },
        dependencies: ["businesses"],
      },

      team: {
        key: `team-${activeBusiness?.id}`,
        loader: async () => {
          if (!activeBusiness?.id) return;
          await getTeamMembers(`/teams/${activeBusiness.id}`, (data) => {
            if (data.is_success) {
              dispatch(setTeam(data.payload));
            } else {
              dispatch(setTeam([]));
            }
          });
        },
        dependencies: ["businesses"],
      },
    }),
    [activeBusiness?.id, dispatch]
  );

  const loadUserData = useCallback(async () => {
    const loaders = createDataLoaders();
    await loadData([
      loaders.userProfile,
      loaders.businesses,
      loaders.weightTypes,
      loaders.volumeTypes,
      loaders.businessTypes,
      loaders.productCategories,
      loaders.brands,
      loaders.packages,
      loaders.profileCompletion,
      loaders.platformBusinesses,
    ]);
  }, [loadData, createDataLoaders]);

  const loadProfileData = useCallback(async () => {
    const loaders = createDataLoaders();
    await loadData([loaders.userProfile]);
  }, [loadData, createDataLoaders]);

  const loadBusinessData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([
      loaders.customersOverview,
      loaders.customers,
      loaders.products,
      loaders.salesOverview,
    ]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadSalesData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.sales, loaders.salesOverview, loaders.salesLog]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadProductsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.products]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadCustomersData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([
      loaders.customers,
      loaders.customersOverview,
      loaders.allAbandonedCarts,
    ]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadAbandonedCartsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.allAbandonedCarts]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadTopSellingAgentData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.topSellingAgents]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadOrdersData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.orders]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadReportsData = useCallback(async () => {
    if (!activeBusiness?.id) return;

    const reportLoaders = [
      {
        key: `salesSummaryReport-${activeBusiness.id}`,
        loader: async () => {
          await getSalesSummaryReport(
            `/sales_summary_report?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesSummary(data.payload));
              }
            }
          );
        },
      },
      {
        key: `salesSupplierReport-${activeBusiness.id}`,
        loader: async () => {
          await getSalesSupplierReport(
            `/sales_supplier_report?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesSupplier(data.payload));
              }
            }
          );
        },
      },
      {
        key: `salesCustomerReport-${activeBusiness.id}`,
        loader: async () => {
          await getSalesCustomerReport(
            `/sales_customer_report?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesCustomer(data.payload));
              }
            }
          );
        },
      },
      {
        key: `salesRegionReport-${activeBusiness.id}`,
        loader: async () => {
          await getSalesRegionReport(
            `/sales_region_report?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesRegion(data.payload));
              }
            }
          );
        },
      },
      {
        key: `salesProductReport-${activeBusiness.id}`,
        loader: async () => {
          await getSalesProductReport(
            `/sales_product_report?business_id=${activeBusiness.id}`,
            (data) => {
              if (data.is_success) {
                dispatch(setSalesProduct(data.payload));
              }
            }
          );
        },
      },
    ];

    await loadData(reportLoaders);
  }, [loadData, activeBusiness?.id]);

  const loadStaffData = useCallback(async () => {
    const loaders = createDataLoaders();
    await loadData([loaders.staff]);
  }, [loadData, createDataLoaders]);

  const loadAgentRequestsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.agentRequests]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadSalesAgentsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.salesAgents, loaders.agentStock]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadNotificationsData = useCallback(async () => {
    const loaders = createDataLoaders();
    await loadData([loaders.notifications]);
  }, [loadData, createDataLoaders]);

  const loadCreditData = useCallback(async () => {
    const loaders = createDataLoaders();
    await loadData([loaders.creditScore, loaders.creditApplications]);
  }, [loadData, createDataLoaders]);

  const loadSupplierData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.suppliers, loaders.supplierOrders]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadSupplierTermsData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.supplierTerms]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadPurchaseOrdersData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.purchaseOrders]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadTeamData = useCallback(async () => {
    if (!activeBusiness?.id) return;
    const loaders = createDataLoaders();
    await loadData([loaders.team]);
  }, [loadData, createDataLoaders, activeBusiness?.id]);

  const loadProductsByCategory = useCallback(
    async (categoryId?: string) => {
      if (!activeBusiness?.id) return;

      const key = categoryId
        ? `products-category-${categoryId}-${activeBusiness.id}`
        : `products-${activeBusiness.id}`;

      const url = categoryId
        ? `/filter_products_by_category?business_id=${activeBusiness.id}&category_id=${categoryId}`
        : `/get_all_products?business_id=${activeBusiness.id}`;

      await loadData([
        {
          key,
          loader: async () => {
            await getProducts(url, (data) => {
              if (data.is_success) {
                if (!categoryId) {
                  dispatch(setProducts(data.payload));
                } else {
                  const dispatchFunction = CATEGORY_DISPATCH_MAP[categoryId];
                  if (dispatchFunction) {
                    dispatch(dispatchFunction(data.payload));
                  }
                }
              }
            });
          },
        },
      ]);
    },
    [loadData, activeBusiness?.id]
  );

  const loadOrdersByStatus = useCallback(
    async (status?: string) => {
      if (!activeBusiness?.id) return;

      const key = status
        ? `orders-status-${status}-${activeBusiness.id}`
        : `orders-${activeBusiness.id}`;

      const url = status
        ? `/filter_sales_by_approval_status?business_id=${activeBusiness.id}&approval_status=${status}`
        : `/all_sales?business_id=${activeBusiness.id}&transaction_type=order`;

      await loadData([
        {
          key,
          loader: async () => {
            await getOrders(url, (data) => {
              if (data.is_success) {
                if (!status) {
                  dispatch(setOrders(data.payload));
                } else if (status === "approved") {
                  dispatch(setApprovedOrders(data.payload));
                } else if (status === "out for delivery") {
                  dispatch(setOutForDeliveryOrders(data.payload));
                } else if (status === "delivered") {
                  dispatch(setDeliveredOrders(data.payload));
                } else if (status === "cancelled") {
                  dispatch(setCancelledOrders(data.payload));
                } else if (status === "pending") {
                  dispatch(setPendingOrders(data.payload));
                } else if (status === "rejected") {
                  dispatch(setRejectedOrders(data.payload));
                } else if (status === "refunded") {
                  dispatch(setRefundedOrders(data.payload));
                }
              }
            });
          },
        },
      ]);
    },
    [loadData, activeBusiness?.id]
  );

  const loadAbandonedCart = useCallback(async (cartId: string) => {
    return new Promise((resolve) => {
      getAbandonedCart(`/cart_info/${cartId}`, (data) => {
        if (data.is_success) {
          dispatch(setAbandonedCart(data.payload));
          resolve(data);
        } else {
          dispatch(setAbandonedCart([]));
          resolve(null);
        }
      });
    });
  }, []);

  const loadSuppliersProducts = useCallback(
    async (supplierEntityId?: string, noCache: boolean = false) => {
      const key = `suppliersProducts-${supplierEntityId}`;

      await loadData([
        {
          key,
          loader: async () => {
            await getSuppliersProduct(
              `/get_all_products?business_id=${supplierEntityId}`,
              (data) => {
                if (data.is_success) {
                  dispatch(setSuppliersProduct(data.payload));
                } else {
                  dispatch(setSuppliersProduct([]));
                }
              }
            );
          },
          noCache,
        },
      ]);
    },
    [loadData]
  );

  const loadOrderOperation = useCallback(
    async (
      interval = "monthly",
      customStartDate?: string,
      customEndDate?: string,
      status?: string
    ) => {
      const { start_date, end_date } =
        customStartDate && customEndDate
          ? { start_date: customStartDate, end_date: customEndDate }
          : getOrdersOverviewDateRange(interval);

      const queryParams = new URLSearchParams({
        page: "1",
        page_size: "100",
        sort_order: "desc",
        start_date,
        end_date,
      });

      if (status) queryParams.append("status", status);

      await loadData([
        {
          key: `orderOperation-${interval}`,
          loader: async () => {
            await getOrderOperation(
              `/orders/overview?${queryParams.toString()}`,
              (data) => {
                if (data.is_success) {
                  dispatch(setOrderOperation(data.payload));
                }
              }
            );
          },
        },
      ]);
    },
    [loadData]
  );

  const handleCreateStaff = async (
    formPayload: CreateStaffProps,
    cb: () => void
  ) => {
    await createStaff(
      `/add_new_staff/${activeBusiness?.id}`,
      {
        ...formPayload,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`staff-${activeBusiness?.id}`]);
          loadStaffData();
          cb();
        }
      }
    );
  };

  const handleUpdateStaff = async (
    formPayload: CreateStaffProps,
    cb: () => void
  ) => {
    await updateStaff(
      `/update_staff/${formPayload?.id}`,
      formPayload,
      (data) => {
        if (data.is_success) {
          invalidateData([`staff-${activeBusiness?.id}`]);
          loadStaffData();
          cb();
        }
      }
    );
  };

  const handleSuspendStaff = async (
    formPayload: CreateStaffProps,
    cb: () => void
  ) => {
    await suspendStaff(
      `/suspend_staff/${formPayload.id}`,
      formPayload,
      (data) => {
        if (data.is_success) {
          invalidateData([`staff-${activeBusiness?.id}`]);
          loadStaffData();
          cb();
        }
      }
    );
  };

  const handleDeleteStaff = async (
    formPayload: CreateStaffProps,
    cb: () => void
  ) => {
    await deleteStaff(`/delete_staff/${formPayload.id}`, (data) => {
      if (data.is_success) {
        invalidateData([`staff-${activeBusiness?.id}`]);
        loadStaffData();
        cb();
      }
    });
  };

  const handleUpdatePin = async (pinData: PinChangeProps) =>
    await updatePin("/change_pin", pinData, (data) => {
      if (data.is_success) {
        invalidateData(["userProfile"]);
        loadProfileData();
      }
    });

  const handleCreateBusiness = async (
    formPayload: CreateBusinessProps,
    file: File | null,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify({ ...formPayload, user_id: loginData.user_id }),
      business_logo: file,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await createBusiness("/create_business", formData, (data) => {
      if (data.is_success) {
        invalidateData(["businesses"]);
        loadUserData();
        cb();
      }
    });
  };

  const handleUpdateBusiness = async (
    formPayload: CreateBusinessProps,
    file: File | null,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        ...formPayload,
        user_id: loginData.user_id,
      }),
      business_logo: file,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await updateBusiness(
      //@ts-ignore
      `/update_business_info/${formPayload?.id}`,
      formData,
      (data) => {
        if (data.is_success) {
          invalidateData(["businesses"]);
          loadUserData();
          cb();
        }
      }
    );
  };

  const handleDeleteBusiness = async (
    formPayload: CreateBusinessProps,
    cb: () => void
  ) => {
    await deleteBusiness(
      `/delete_business_info?user_id=${loginData.user_id}&business_id=${formPayload.id}`,
      (data) => {
        if (data.is_success) {
          invalidateData(["businesses"]);
          loadUserData();
          cb();
        }
      }
    );
  };

  const handleChangeOrderStatus = async (
    sales_id: string,
    status: string,
    status_date: string,
    comment: string = ""
  ) => {
    await updateSalesOrderStatus(
      `/update_sale_status/${sales_id}`,
      {
        status,
        status_date,
        comment: comment || null,
      },
      async (data) => {
        if (data.is_success) {
          // Invalidate all order-related cache keys
          invalidateData([
            `orders-${activeBusiness?.id}`,
            `orders-status-pending-${activeBusiness?.id}`,
            `orders-status-approved-${activeBusiness?.id}`,
            `orders-status-out for delivery-${activeBusiness?.id}`,
            `orders-status-delivered-${activeBusiness?.id}`,
            `orders-status-cancelled-${activeBusiness?.id}`,
            `orders-status-refunded-${activeBusiness?.id}`,
            `orders-status-rejected-${activeBusiness?.id}`,
            `orderOperation-${activeBusiness?.id}`,
            "notifications",
          ]);

          // Refresh all order data from endpoints
          await refreshAllOrdersData();

          // Also refresh notifications as status changes may create notifications
          loadNotificationsData();
        }
      }
    );
  };

  const refreshAllOrdersData = async () => {
    try {
      await Promise.all([
        loadOrdersData(), // Load all orders
        loadOrdersByStatus("pending"),
        loadOrdersByStatus("approved"),
        loadOrdersByStatus("out for delivery"),
        loadOrdersByStatus("delivered"),
        loadOrdersByStatus("cancelled"),
        loadOrdersByStatus("refunded"),
        loadOrdersByStatus("rejected"),
      ]);

      loadOrderOperation();
    } catch (error) {
      console.error("Error refreshing orders data:", error);
    }
  };

  const handleOrderFileUpload = async (
    order_id: string,
    file: File | null,
    cb: (success: boolean) => void
  ) => {
    if (!file) {
      cb(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await orderFileUpload(
      `/orders/upload/file?order_id=${order_id}`,
      formData,
      (data) => {
        if (data.is_success) {
          cb(true);
        } else {
          console.error("File upload failed:", data);
          cb(false);
        }
      }
    );
  };

  const handleCreateSale = async (
    formPayload: CreateSaleProps,
    cb: () => void
  ) => {
    const body = {
      ...formPayload,
      business_id: activeBusiness?.id,
      order_status: "delivered",
      type: "sale",
    };

    await createSale("/add_sale", body, (data) => {
      if (data.is_success) {
        invalidateData([
          `sales-${activeBusiness?.id}`,
          `salesOverview-${activeBusiness?.id}`,
          `salesLog-${activeBusiness?.id}`,
        ]);
        loadSalesData();
        cb();
      }
    });
  };

  const handleCreateSaleCart = async (
    formPayload: CreateSaleProps,
    cb: () => void
  ) => {
    const body = {
      ...formPayload,
      business_id: activeBusiness?.id,
    };

    await createSaleCart("/add_sale", body, (data) => {
      if (data.is_success) {
        invalidateData([
          `sales-${activeBusiness?.id}`,
          `salesOverview-${activeBusiness?.id}`,
          `salesLog-${activeBusiness?.id}`,
        ]);
        loadSalesData();
        cb();
      }
    });
  };

  const handleCreateOrder = async (
    formPayload: CreateOrderProps,
    cb: () => void
  ) => {
    const body = {
      ...formPayload,
      business_id: activeBusiness?.id,
      supplier_id: activeBusiness?.id,
      type: "order",
    };

    await createOrder("/add_sale", body, (data) => {
      if (data.is_success) {
        invalidateData([
          `orders-${activeBusiness?.id}`,
          "orderOperation-monthly",
          `orders-status-pending-${activeBusiness?.id}`,
          "notifications",
        ]);
        loadOrdersData();
        loadOrderOperation();
        loadOrdersByStatus("pending");
        loadNotificationsData();
        cb();
      }
    });
  };

  const handleUpdateSaleStatus = async (
    formPayload: SaleStatusProps,
    cb: () => void
  ) => {
    await updateSaleStatus(
      `/update_sale_status/${formPayload?.id}`,
      formPayload,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `orders-${activeBusiness?.id}`,
            `orders-status-pending-${activeBusiness?.id}`,
            `orders-status-approved-${activeBusiness?.id}`,
            `orders-status-out for delivery-${activeBusiness?.id}`,
            `orders-status-delivered-${activeBusiness?.id}`,
            `orders-status-cancelled-${activeBusiness?.id}`,
            `orders-status-refunded-${activeBusiness?.id}`,
            `orders-status-rejected-${activeBusiness?.id}`,
            "orderOperation-monthly",
            "notifications",
          ]);
          loadOrdersData();
          loadOrderOperation();
          loadOrdersByStatus();
          loadOrdersByStatus("approved");
          loadOrdersByStatus("pending");
          loadOrdersByStatus("out for delivery");
          loadOrdersByStatus("delivered");
          loadOrdersByStatus("cancelled");
          loadOrdersByStatus("refunded");
          loadOrdersByStatus("rejected");

          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleCreateAbandonCart = async (
    formPayload: AbandonCartProps,
    cb: () => void
  ) => {
    const body = {
      ...formPayload,
      business_id: activeBusiness?.id,
    };

    await createAbandonCart("/add_abandoned_cart", body, (data) => {
      if (data.is_success) {
        invalidateData([`allAbandonedCarts-${activeBusiness?.id}`]);
        loadAbandonedCartsData();
        cb();
      }
    });
  };

  const handleDeleteAllAbandonCart = async (cb: () => void) => {
    await deleteAbandonCart(
      `/delete_carts?business_id=${activeBusiness?.id}`,
      (data) => {
        if (data.is_success) {
          invalidateData([`allAbandonedCarts-${activeBusiness?.id}`]);
          loadAbandonedCartsData();
          cb();
        }
      }
    );
  };

  const handleUpdateSale = async (
    formPayload: CreateSaleProps,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        ...formPayload,
        user_id: loginData.user_id,
      }),
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await updateSale(
      //@ts-ignore
      `/update_sale_info/${formPayload?.id}`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `sales-${activeBusiness?.id}`,
            `salesOverview-${activeBusiness?.id}`,
            `salesLog-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadSalesData();
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleUpdateOrder = async (
    formPayload: CreateOrderProps,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        ...formPayload,
        user_id: loginData.user_id,
      }),
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await updateOrder(
      //@ts-ignore
      `/update_sale_info/${formPayload?.id}`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `orders-${activeBusiness?.id}`,
            `orders-status-pending-${activeBusiness?.id}`,
            `orders-status-approved-${activeBusiness?.id}`,
            `orders-status-out for delivery-${activeBusiness?.id}`,
            `orders-status-delivered-${activeBusiness?.id}`,
            `orders-status-cancelled-${activeBusiness?.id}`,
            `orders-status-refunded-${activeBusiness?.id}`,
            `orders-status-rejected-${activeBusiness?.id}`,
            "orderOperation-monthly",
            "notifications",
          ]);
          loadOrdersData();
          loadOrderOperation();
          loadOrdersByStatus();
          loadOrdersByStatus("approved");
          loadOrdersByStatus("pending");
          loadOrdersByStatus("out for delivery");
          loadOrdersByStatus("delivered");
          loadOrdersByStatus("cancelled");
          loadOrdersByStatus("refunded");
          loadOrdersByStatus("rejected");

          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleRecordCost = async (
    saleId: string,
    costs: Array<{
      cost_type: string;
      amount: number;
      source_id: string;
    }>,
    cb: () => void
  ) => {
    await recordCostRequest(
      `/sales/record-cost/${saleId}`,
      { costs },
      (data: any) => {
        if (data.is_success) {
          invalidateData([
            `orders-${activeBusiness?.id}`,
            `orders-status-pending-${activeBusiness?.id}`,
            `orders-status-approved-${activeBusiness?.id}`,
            `orders-status-out for delivery-${activeBusiness?.id}`,
            `orders-status-delivered-${activeBusiness?.id}`,
            `orders-status-cancelled-${activeBusiness?.id}`,
            `orders-status-refunded-${activeBusiness?.id}`,
            `orders-status-rejected-${activeBusiness?.id}`,
            `orderOperation-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadOrdersData();
          loadOrderOperation();
          loadOrdersByStatus();
          loadOrdersByStatus("approved");
          loadOrdersByStatus("pending");
          loadOrdersByStatus("out for delivery");
          loadOrdersByStatus("delivered");
          loadOrdersByStatus("cancelled");
          loadOrdersByStatus("refunded");
          loadOrdersByStatus("rejected");
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleDeleteSale = async (
    formPayload: CreateSaleProps,
    cb: () => void
  ) => {
    await deleteSale(`/delete_sale?sale_id=${formPayload.id}`, (data) => {
      if (data.is_success) {
        invalidateData([
          `sales-${activeBusiness?.id}`,
          `salesOverview-${activeBusiness?.id}`,
          `salesLog-${activeBusiness?.id}`,
        ]);
        loadSalesData();
        cb();
      }
    });
  };

  const handleDeleteCustomer = async (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => {
    await deleteCustomer(`/delete_customer/${formPayload.id}`, (data) => {
      if (data.is_success) {
        invalidateData([
          `customers-${activeBusiness?.id}`,
          `customersOverview-${activeBusiness?.id}`,
          `allAbandonedCarts-${activeBusiness?.id}`,
        ]);
        loadCustomersData();
        cb();
      }
    });
  };

  const handleDeletePurchaseOrder = async (
    formPayload: PurchaseOrderProps,
    cb: () => void
  ) => {
    await deletePurchaseOrder(
      `/purchase_order/${formPayload.po_number}`,
      (data) => {
        if (data.is_success) {
          invalidateData([`purchaseOrders-${activeBusiness?.id}`]);
          loadPurchaseOrdersData();
          cb();
        }
      }
    );
  };

  const handleDeleteOrder = async (
    formPayload: CreateOrderProps,
    cb: () => void
  ) => {
    await deleteOrder(`/delete_sale?sale_id=${formPayload.id}`, (data) => {
      if (data.is_success) {
        invalidateData([
          `orders-${activeBusiness?.id}`,
          `orders-status-pending-${activeBusiness?.id}`,
          `orders-status-approved-${activeBusiness?.id}`,
          `orders-status-out for delivery-${activeBusiness?.id}`,
          `orders-status-delivered-${activeBusiness?.id}`,
          `orders-status-cancelled-${activeBusiness?.id}`,
          `orders-status-refunded-${activeBusiness?.id}`,
          `orders-status-rejected-${activeBusiness?.id}`,
          "orderOperation-monthly",
        ]);
        loadOrdersData();
        loadOrderOperation();
        loadOrdersByStatus();
        loadOrdersByStatus("approved");
        loadOrdersByStatus("pending");
        loadOrdersByStatus("out for delivery");
        loadOrdersByStatus("delivered");
        loadOrdersByStatus("cancelled");
        loadOrdersByStatus("refunded");
        loadOrdersByStatus("rejected");
        cb();
      }
    });
  };

  const handleDeleteProductInfo = async (
    formPayload: Product,
    cb: () => void
  ) => {
    await deleteProductInfo(
      `/delete_product_info?product_id=${formPayload.id}`,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `products-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.FASHION}-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.SPORT_FITNESS}-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.ELECTRONIC}-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.AUTOMOBILE}-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.HOME_KITCHEN}-${activeBusiness?.id}`,
            `products-category-${CATEGORY_IDS.UNCATEGORIZED}-${activeBusiness?.id}`,
          ]);

          loadProductsData();
          loadProductsByCategory(CATEGORY_IDS.FASHION);
          loadProductsByCategory(CATEGORY_IDS.SPORT_FITNESS);
          loadProductsByCategory(CATEGORY_IDS.ELECTRONIC);
          loadProductsByCategory(CATEGORY_IDS.AUTOMOBILE);
          loadProductsByCategory(CATEGORY_IDS.HOME_KITCHEN);
          loadProductsByCategory(CATEGORY_IDS.UNCATEGORIZED);
          cb();
        }
      }
    );
  };

  const handleCreateSalesAgent = async (
    formPayload: CreateSalesAgentProps,
    cb: () => void
  ) => {
    await createSalesAgent(
      `/create_sales_agent`,
      {
        ...formPayload,
        user_id: loginData?.user_id,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `salesAgents-${activeBusiness?.id}`,
            `agentStock-${activeBusiness?.id}`,
          ]);
          loadSalesAgentsData();
          cb();
        }
      }
    );
  };

  const handleUpdateSaleAgent = async (
    formPayload: CreateSalesAgentProps,
    cb: () => void
  ) => {
    await updateSalesAgent(
      `/update_sales_agent_info/${formPayload?.id}`,
      { ...formPayload, user_id: loginData.user_id },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `salesAgents-${activeBusiness?.id}`,
            // `agentStock-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadSalesAgentsData();
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleDeleteSalesgent = async (
    formPayload: CreateSalesAgentProps & { id?: string },
    cb: () => void
  ) => {
    const agentId = formPayload.id;
    if (!agentId) {
      console.error("Agent ID is missing");
      return;
    }
    await deleteSalesAgent(`/delete_sale_agent/${agentId}`, (data) => {
      if (data.is_success) {
        invalidateData([
          `salesAgents-${activeBusiness?.id}`,
          `agentStock-${activeBusiness?.id}`,
        ]);
        loadSalesAgentsData();
      }
      cb();
    });
  };

  const handleUpdateNotificationStatus = async (
    formPayload: NotificationProps,
    cb: () => void
  ) => {
    await updateNotifications(
      `/update_notification_read_status`,
      { id: formPayload.id, is_read: true },
      (data) => {
        if (data.is_success) {
          invalidateData(["notifications"]);
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleDeleteNotification = async (
    formPayload: NotificationProps,
    cb: () => void
  ) => {
    const notificationID = formPayload.id;
    if (!notificationID) {
      console.error("Notification ID is missing");
      return;
    }
    await deleteNotification(
      `/delete_notification/${notificationID}`,
      (data) => {
        if (data.is_success) {
          invalidateData(["notifications"]);
          loadNotificationsData();
        }
        cb();
      }
    );
  };

  const handleCreateCreditApplication = async (
    formPayload: CreateCreditFormDataProps,
    sales_record_file: File | null,
    supplier_distributor_statement_file: File | null,
    verified_bank_statement_file: File | null,
    identification_file: File | null,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        ...formPayload,
        user_id: loginData.user_id,
        business_id: activeBusiness?.id,
      }),
      sales_record_file: sales_record_file,
      supplier_distributor_statement_file: supplier_distributor_statement_file,
      verified_bank_statement_file: verified_bank_statement_file,
      identification_file: identification_file,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await createCreditApplication(
      `/create-credit-application`,
      formData,
      (data) => {
        if (data.is_success) {
          invalidateData(["creditScore", "creditApplications"]);
          loadCreditData();
          cb();
        } else {
          console.error("Failed to create credit application", data);
        }
      }
    );
  };

  const handleCreateCreditAccessment = async (
    formPayload: CreditAccessmentFormProps,
    cb: () => void
  ) => {
    await createCreditAccessment(
      `/create_assessment_request`,
      {
        ...formPayload,
        user_id: loginData?.user_id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData(["creditScore", "creditApplications"]);
          loadCreditData();
          cb();
        }
      }
    );
  };

  const handleDeleteCreditApplication = async (
    formPayload: CreditLimitFormProps,
    cb: () => void
  ) => {
    await deleteCreditApplication(
      `/delete-credit-application/${formPayload.id}`,
      (data) => {
        if (data.is_success) {
          invalidateData(["creditScore", "creditApplications"]);
          loadCreditData();
        }
        cb();
      }
    );
  };

  const handleDeleteCreditAccessment = async (
    formPayload: CreditAccessmentFormProps,
    cb: () => void
  ) => {
    await deleteCreditAccessment(
      `/delete-credit-assessment/${formPayload.id}`,
      (data) => {
        if (data.is_success) {
          invalidateData(["creditScore", "creditApplications"]);
          loadCreditData();
        }
        cb();
      }
    );
  };

  const handleSaleBulkUpload = async (
    sales_data_file: File | null,
    cb: () => void
  ) => {
    if (!sales_data_file || !activeBusiness?.id) return;

    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        business_id: activeBusiness.id,
      }),
      sales_data_file,
    };

    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }

    await saleBulkUpload(`/create_bulk_uploads`, formData, (data) => {
      if (data.is_success) {
        invalidateData([
          `sales-${activeBusiness?.id}`,
          `salesOverview-${activeBusiness?.id}`,
          `salesLog-${activeBusiness?.id}`,
        ]);
        loadSalesData();
        cb();
      }
    });
  };

  const handleInventoryBulkUpload = async (
    file: File | null,
    cb: () => void
  ) => {
    if (!file || !activeBusiness?.id) return;

    const formData = new FormData();
    const body = {
      payload: JSON.stringify({
        business_id: activeBusiness.id,
      }),
      file,
    };

    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }

    await inventoryBulkUpload(`/inventory/bulk_upload`, formData, (data) => {
      if (data.is_success) {
        invalidateData([`products-${activeBusiness?.id}`]);
        loadProductsData();
        cb();
      }
    });
  };

  const handleCustomerBulkUpload = async (
    file: File | null,
    cb: () => void
  ) => {
    if (!file || !activeBusiness?.id) return;

    const formData = new FormData();
    formData.append("file", file);

    await customerBulkUpload(
      `/bulk_upload_customers?business_id=${activeBusiness.id}`,
      formData,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `customers-${activeBusiness?.id}`,
            `customersOverview-${activeBusiness?.id}`,
            `allAbandonedCarts-${activeBusiness?.id}`,
          ]);
          loadCustomersData();
          cb();
        }
      }
    );
  };

  const handleUpdateCreditApplication = async (
    formPayload: CreateCreditFormDataProps,
    sales_record_file: File | string | null,
    supplier_distributor_statement_file: File | string | null,
    verified_bank_statement_file: File | string | null,
    identification_file: File | string | null,
    cb: () => void
  ) => {
    const formData = new FormData();

    const {
      identification_file: _identification_file,
      verified_bank_statement_file: _verified_bank_statement_file,
      supplier_distributor_statement_file: _supplier_distributor_statement_file,
      sales_record_file: _sales_record_file,
      ...payloadWithoutFiles
    } = formPayload;

    formData.append(
      "payload",
      JSON.stringify({
        ...payloadWithoutFiles,
        business_id: activeBusiness?.id,
      })
    );

    if (sales_record_file instanceof File) {
      formData.append("sales_record_file", sales_record_file);
    }

    if (supplier_distributor_statement_file instanceof File) {
      formData.append(
        "supplier_distributor_statement_file",
        supplier_distributor_statement_file
      );
    }

    if (verified_bank_statement_file instanceof File) {
      formData.append(
        "verified_bank_statement_file",
        verified_bank_statement_file
      );
    }

    if (identification_file instanceof File) {
      formData.append("identification_file", identification_file);
    }

    await updateCreditApplication(
      `/update-credit-application/${formPayload?.id}`,
      formData,
      (data) => {
        if (data.is_success) {
          invalidateData(["creditScore", "creditApplications"]);
          loadCreditData();
          cb();
        } else {
          console.error("Failed to update credit application", data);
        }
      }
    );
  };

  const handleGetProductsByBrand = async (brandID: string, cb: () => void) => {
    if (!brandID) return;

    await getProductsByBrand(
      `/get_all_products_by_brand?brand_id=${brandID}`,
      (data) => {
        if (data.is_success) {
          dispatch(setProductsByBrand(data.payload));
        } else {
          dispatch(setProductsByBrand([]));
        }
        cb();
      }
    );
  };

  const handleCreateCustomer = async (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => {
    await createCustomer(
      `/create_customer`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
        customer_type: "business",
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `customers-${activeBusiness?.id}`,
            `customersOverview-${activeBusiness?.id}`,
            `allAbandonedCarts-${activeBusiness?.id}`,
          ]);
          loadCustomersData();
          cb();
        }
      }
    );
  };

  const handleAddCustomer = async (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => {
    await addCustomer(
      `/add_customer`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
        customer_entity_type: "business",
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `customers-${activeBusiness?.id}`,
            `customersOverview-${activeBusiness?.id}`,
            `allAbandonedCarts-${activeBusiness?.id}`,
          ]);
          loadCustomersData();
          cb();
        }
      }
    );
  };

  const handleUpdateCustomer = async (
    formPayload: CreateCustomerProps,
    cb: () => void
  ) => {
    await updateCustomer(
      `/update_customer/${formPayload.id}`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
        customer_entity_type: "business",
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            "customers",
            `customersOverview-${activeBusiness?.id}`,
            `allAbandonedCarts-${activeBusiness?.id}`,
          ]);
          loadCustomersData();
          cb();
        }
      }
    );
  };

  const handleAddPurchaseOrder = async (
    formPayload: CreatePurchaseOrderProps,
    cb: () => void
  ) => {
    await addPurchaseOrder(
      `/add_purchase_order?business_id=${activeBusiness?.id}`,
      {
        ...formPayload,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`purchaseOrders-${activeBusiness?.id}`]);
          loadPurchaseOrdersData();
          cb();
        }
      }
    );
  };

  const handleUpdatePurchaseOrder = async (
    formPayload: CreatePurchaseOrderProps,
    orderId: string,
    cb: () => void
  ) => {
    await updatePurchaseOrder(
      `/purchase_order/${orderId}`,
      {
        ...formPayload,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`purchaseOrders-${activeBusiness?.id}`]);
          loadPurchaseOrdersData();
          cb();
        }
      }
    );
  };

  const handleCreateProduct = async (
    formPayload: Product,
    file: File | null,
    cb: () => void
  ) => {
    const cleanedPayload = { ...formPayload };

    if (cleanedPayload.category_id === "") {
      delete cleanedPayload.category_id;
    }

    const formData = new FormData();
    const body = {
      payload: JSON.stringify(cleanedPayload),
      file,
    };

    for (const key in body) {
      const value = body[key as keyof typeof body];
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    await createProduct(`/create_product`, formData, (data) => {
      if (data.is_success) {
        invalidateData([
          `products-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.FASHION}-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.SPORT_FITNESS}-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.ELECTRONIC}-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.AUTOMOBILE}-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.HOME_KITCHEN}-${activeBusiness?.id}`,
          `products-category-${CATEGORY_IDS.UNCATEGORIZED}-${activeBusiness?.id}`,
        ]);

        loadProductsData();
        loadProductsByCategory(CATEGORY_IDS.FASHION);
        loadProductsByCategory(CATEGORY_IDS.SPORT_FITNESS);
        loadProductsByCategory(CATEGORY_IDS.ELECTRONIC);
        loadProductsByCategory(CATEGORY_IDS.AUTOMOBILE);
        loadProductsByCategory(CATEGORY_IDS.HOME_KITCHEN);
        cb();
      }
    });
  };

  const handleCreateBrand = async (brand_name: string, cb: () => void) => {
    await createProductBrand(
      `/create_brand`,
      {
        brand_name,
      },
      (data) => {
        if (data.is_success) {
          invalidateData(["brands"]);
          loadUserData();
          cb();
        }
      }
    );
  };

  const handleCreateProductCategory = async (
    formPayload: FormData,
    cb: () => void
  ) => {
    await createProductCategory(`/create_category/`, formPayload, (data) => {
      if (data.is_success) {
        invalidateData(["category"]);
        loadUserData();
        cb();
      }
    });
  };

  const handleUpdateProduct = async (
    formPayload: Product,
    file: File,
    cb: () => void
  ) => {
    const formData = new FormData();
    const body = {
      //@ts-ignore
      payload: JSON.stringify({ ...formPayload, product_id: formPayload.id }),
      file,
    };
    for (const key in body) {
      //@ts-ignore
      formData.append(key, body[key]);
    }
    await updateProduct(`/update_product_info`, formData, (data) => {
      if (data.is_success) {
        invalidateData([`products-${activeBusiness?.id}`]);
        loadProductsData();
        cb();
      }
    });
  };

  const handleProfileUpdate = async (
    payload: UserProfile,
    profileImage?: File
  ) => {
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
  };

  const handleCreateSupplier = async (
    formPayload: CreateSuppliersProps,
    cb: () => void
  ) => {
    await createSupplier(
      `/create_supplier?business_id=${activeBusiness?.id}`,
      {
        ...formPayload,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([
            `suppliers-${activeBusiness?.id}`,
            `supplierOrders-${activeBusiness?.id}`,
          ]);
          loadSupplierData();
          cb();
        }
      }
    );
  };

  const handleAddSupplier = async (
    formPayload: AddSuppliersProps,
    cb: () => void
  ) => {
    await addSupplier(
      `/add_supplier`,
      {
        business_id: activeBusiness?.id,
        ...formPayload,
      },
      (data) => {
        if (data?.is_success) {
          invalidateData([
            `suppliers-${activeBusiness?.id}`,
            `supplierOrders-${activeBusiness?.id}`,
          ]);
          loadSupplierData();
          cb();
        }
      }
    );
  };

  const handleDeleteSupplier = async (
    formPayload: CreateSuppliersProps & { id?: string },
    cb: () => void
  ) => {
    const supplierId = formPayload.id;
    if (!supplierId) {
      return;
    }
    await deleteSupplier(`/delete_supplier/${supplierId}`, (data) => {
      if (data.is_success) {
        invalidateData([
          `suppliers-${activeBusiness?.id}`,
          `supplierOrders-${activeBusiness?.id}`,
        ]);
        loadSupplierData();
      }
      cb();
    });
  };

  const handleCreateTeamMember = async (
    formPayload: TeamListProps,
    cb: () => void
  ) => {
    await createTeamMember(
      "/team",
      {
        ...formPayload,
        business: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`team-${activeBusiness?.id}`]);
          loadTeamData();
          cb();
        } else {
        }
      }
    );
  };

  const handleUpdateTeamMember = async (
    formPayload: TeamListProps & { id?: string },
    cb: () => void
  ) => {
    const teamMemberId = formPayload.id;
    if (!teamMemberId) {
      return;
    }
    await updateTeamMember(
      `/team/${formPayload?.id}`,
      { ...formPayload },
      (data) => {
        if (data.is_success) {
          invalidateData([`team-${activeBusiness?.id}`]);
          loadTeamData();
          cb();
        } else {
        }
      }
    );
  };

  const handleDeleteTeamMember = async (
    formPayload: TeamListProps & { id?: string },
    cb: () => void
  ) => {
    const teamMemberId = formPayload.id;
    if (!teamMemberId) {
      return;
    }
    await deleteTeamMember(`/team/${teamMemberId}`, (data) => {
      if (data.is_success) {
        invalidateData([`team-${activeBusiness?.id}`]);
        loadTeamData();
      }
      cb();
    });
  };

  const handleCreateAgentRequest = async (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => {
    const body = {
      ...formPayload,
      status: "pending",
    };

    await createAgentRequest(
      `/create_new_agent_request?business_id=${activeBusiness?.id}`,
      body,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `agentRequests-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadAgentRequestsData();
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleUpdateAgentRequest = async (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => {
    await updateAgentRequest(
      `/update_agent/${formPayload?.id}`,
      formPayload,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `agentRequests-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadAgentRequestsData();
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleUpdateAgentRequestStatus = async (
    formPayload: UpdateAgentRequestStatusProps,
    cb: () => void
  ) => {
    await updateAgentRequestStatus(
      //@ts-ignore
      `/status/${formPayload?.id}`,
      formPayload,
      (data) => {
        if (data.is_success) {
          invalidateData([
            `agentRequests-${activeBusiness?.id}`,
            "notifications",
          ]);
          loadAgentRequestsData();
          loadNotificationsData();
          cb();
        }
      }
    );
  };

  const handleDeleteAgentRequest = async (
    formPayload: CreateAgentRequestProps,
    cb: () => void
  ) => {
    await deleteAgentRequest(`/remove_agent/${formPayload.id}`, (data) => {
      if (data.is_success) {
        invalidateData([`agentRequests-${activeBusiness?.id}`]);
        loadAgentRequestsData();
        cb();
      }
    });
  };

  const handleCreateSuppliersTerm = async (
    formPayload: any,
    cb: () => void
  ) => {
    await createSuppliersTerm(
      `/create_supplier_term_manual`,
      {
        ...formPayload,
        user_id: loginData?.user_id,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`supplierTerms-${activeBusiness?.id}`]);
          loadSupplierTermsData();
          cb();
        }
      }
    );
  };

  const handleUploadCreditInvoice = async (
    formPayload: CreditInvoiceFormProps,
    cb: () => void
  ) => {
    await uploadCreditInvoice(
      `/create_supplier_term_uploaded`,
      {
        ...formPayload,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`supplierTerms-${activeBusiness?.id}`]);
          loadSupplierTermsData();
          cb();
        }
      }
    );
  };

  const handleUpdateSuppliersTerm = async (
    formPayload: any,
    cb: () => void
  ) => {
    await updateSalesAgent(
      `/update_supplier_term_manual/${formPayload?.id}`,
      {
        ...formPayload,
        user_id: loginData?.user_id,
        business_id: activeBusiness?.id,
      },
      (data) => {
        if (data.is_success) {
          invalidateData([`supplierTerms-${activeBusiness?.id}`]);
          loadSupplierTermsData();
          cb();
        }
      }
    );
  };

  const handleDeleteCreditRequest = async (
    formPayload: any,
    cb: () => void
  ) => {
    const suppliersTermId = formPayload.id;
    if (!suppliersTermId) {
      console.error(" Credit Request ID is missing");
      return;
    }
    await deleteCreditRquest(`/delete/${suppliersTermId}`, (data) => {
      if (data.is_success) {
        invalidateData([`supplierTerms-${activeBusiness?.id}`]);
        loadSupplierTermsData();
      }
      cb();
    });
  };

  useEffect(() => {
    if (businesses?.length > 0 && !activeBusiness) {
      dispatch(setActiveBusiness(businesses[0]));
    }
  }, [businesses, activeBusiness]);

  useEffect(() => {
    if (activeBusiness) {
      loadBusinessData();
    }
  }, [activeBusiness]);

  // Initial auth and token management
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
          loadUserData();
        } else {
          dispatch(logUserOut());
          router.push(ROUTES.login);
        }
      });
    };

    initializeAuth();
  }, []);

  const value: DashboardContextType = {
    isLoading: isProfileFetching,
    //@ts-ignore
    handleDeleteOrder,
    handleProfileUpdate,
    isProfileUpdating,
    handleCreateBusiness,
    isBusinessCreating,
    handleUpdateBusiness,
    isBusinessEditing,
    handleDeleteBusiness,
    handleChangeOrderStatus,
    refreshAllOrdersData,
    handleOrderFileUpload,
    isBusinessDeleting,
    handleCreateSale,
    handleCreateSaleCart,
    handleCreateOrder,
    handleCreateAbandonCart,
    handleDeleteAllAbandonCart,
    handleDeleteProductInfo,
    isAbandonCartDeleting,
    isCreditApplicationDeleting,
    handleDeleteCreditApplication,
    handleCreateCreditAccessment,
    isCreditAccessmentDeleting,
    isCreditAcessmentCreating,
    isSaleCreating,
    isSaleCartCreating,
    isOrderCreating,
    isAbandonCartCreating,
    handleUpdateSale,
    handleUpdateSaleStatus,
    isSaleStatusUpdating,
    handleUpdateOrder,
    handleRecordCost,
    isCostRecording,
    isSaleEditing,
    isOrderEditing,
    handleDeleteSale,
    handleDeletePurchaseOrder,
    handleUpdatePurchaseOrder,
    isPurchaseOrderUpdating,
    isPuchaseOrderDeleting,
    isSaleDeleting,
    isOrderDeleting,
    isOrderFileUploading,
    handleUpdatePin,
    isPinUpdating,
    handleCreateProduct,
    isProductCreating,
    isProductBrandCreating,
    handleCreateBrand,
    isProductCategoryCreating,
    handleCreateProductCategory,
    handleUpdateProduct,
    isProductUpdating,
    handleCreateSalesAgent,
    handleDeleteSalesgent,
    handleUpdateSaleAgent,
    isSalesAgentUpdating,
    isSalesAgentDeleting,
    isTopSellingAgentsLoading,
    isCustomerDeleting,
    isSalesAgentCreating,
    handleCreateCustomer,
    handleDeleteCustomer,
    handleAddCustomer,
    handleUpdateCustomer,
    isCustomerUpdating,
    isCustomerAdding,
    isCustomerCreating,
    handleCreateSupplier,
    handleAddSupplier,
    isSupplierCreating,
    isSupplierAdding,
    handleDeleteSupplier,
    isSupplierDeleting,
    handleCreateTeamMember,
    isTeamCreating,
    handleUpdateTeamMember,
    isTeamUpdating,
    handleDeleteTeamMember,
    isTeamDeleting,
    isTeamsLoading,
    isPlatformBusinessesLoading,
    setFetchCount,
    isFindAbandonedCartLoading,
    isCusomtersLoading,
    isSuppliersLoading,
    isSupplierOrdersLoading,
    isOrdersLoading,
    handleCreateAgentRequest,
    isAgentRequestCreating,
    handleUpdateAgentRequest,
    handleUpdateAgentRequestStatus,
    handleDeleteCreditAccessment,
    isAgentRequestEditing,
    isAgentRequestStatusEditing,
    handleDeleteAgentRequest,
    isAgentRequestDeleting,
    isProductInfoDeleting,
    isBusinessTypesLoading,
    isSuppliersProductLoading,
    isPurchaseOrderLoading,
    handleAddPurchaseOrder,
    isPurchaseOrderCreating,
    isNotificationDeleting,
    isNotificationUpdating,
    isNotificationFetching,
    handleUpdateNotificationStatus,
    handleDeleteNotification,
    isSalesSummaryLoading,
    isSalesSupplierLoading,
    isSalesCustomerLoading,
    isSalesRegionLoading,
    isSalesProductLoading,
    handleCreateCreditApplication,
    isCreditOrderCreating,
    isCreditInvoiceUpLoading,
    handleSaleBulkUpload,
    isSaleBulkUploading,
    handleUpdateCreditApplication,
    handleGetProductsByBrand,
    isProductsByBrandLoading,
    isCreditApplicationFetching,
    isCreditApplicationUpdating,
    isCreditApplicationCreating,
    handleCreateSuppliersTerm,
    handleUpdateSuppliersTerm,
    handleDeleteCreditRequest,
    isCreditRequestDeleting,
    handleUploadCreditInvoice,
    isSalesLogLoading,
    handleCustomerBulkUpload,
    handleInventoryBulkUpload,
    isInventoryBulkUploading,
    isCustomerBulkUploading,
    isCreditScoreLoading,
    isStaffLoading,
    isStaffCreating,
    isStaffUpdating,
    isStaffDeleting,
    isStaffSuspending,
    handleCreateStaff,
    handleUpdateStaff,
    handleSuspendStaff,
    handleDeleteStaff,

    // Data loaders
    loadUserData,
    loadProfileData,
    loadBusinessData,
    loadSalesData,
    loadProductsData,
    loadCustomersData,
    loadAbandonedCartsData,
    loadOrdersData,
    loadReportsData,
    loadStaffData,
    loadAgentRequestsData,
    loadSalesAgentsData,
    loadNotificationsData,
    loadCreditData,
    loadSupplierData,
    loadSupplierTermsData,
    loadPurchaseOrdersData,
    loadTeamData,
    loadOrderOperation,
    loadTopSellingAgentData,

    // Specific loaders
    loadProductsByCategory,
    loadSuppliersProducts,
    loadOrdersByStatus,
    loadAbandonedCart,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDash = () => {
  return useContext(DashboardContext) as DashboardContextType;
};

export default DashboardProvider;
