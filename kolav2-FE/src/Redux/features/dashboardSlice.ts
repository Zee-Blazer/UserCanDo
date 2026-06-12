import {
  initialCustomerOverview,
  initialOrderOperation,
  initialSalesOverview,
  initialUserProfile,
} from "@/utils/initialStates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  // Core Business Data
  userProfile: UserProfile;
  staff: StaffProps[];
  businesses: BusinessListProps[];
  activeBusiness: BusinessProps | null;
  profileCompletion: ProfileCompletionProps;
  businessTypes: BusinessTypesProps[];
  platformBusiness: BusinessListProps[];

  // Product Management
  products: ProductListProps[];
  brands: BrandProps[];
  productCategories: ProductCategoryProps[];
  packagesTypes: PackageProps[];
  volumeTypes: BusinessCategoriesListProps[];
  weightTypes: BusinessCategoriesListProps[];

  // Categorized Products
  fashionProducts: ProductListProps[];
  electronicProducts: ProductListProps[];
  automobileProducts: ProductListProps[];
  sportsFitnessProducts: ProductListProps[];
  homeKitchenProducts: ProductListProps[];
  uncategorizedProducts: ProductListProps[];
  productsByBrand: ProductListProps[];

  // Agent Management
  salesAgents: CreateSalesAgentProps[];
  ownerAgents: CreateSalesAgentProps[];
  managerAgents: CreateSalesAgentProps[];
  regularAgents: CreateSalesAgentProps[];
  agentStock: any[];
  agentRequests: AgentRequestProps[];
  team: TeamListProps[];
  topSellingAgents: sellingAgentOverviewProps[];

  // Customer Management
  customers: CreateCustomerProps[];
  customerOverview: CustomersOverviewProps;

  // Sales Management
  sales: SalesListProps[];
  salesOverview: SalesOverviewProps;
  salesSummary: SalesSummaryReportProps[];
  salesSupplier: SalesSupplierReportProps[];
  salesCustomer: SalesCustomerReportProps[];
  salesRegion: SalesRegionReportProps[];
  salesProduct: SalesListProps[];
  salesLog: SaleBulkUpload[];
  // Order Management
  orders: CreateOrderProps[];
  activeOrderStatus: any | null; // Using any for now to accommodate all API properties
  orderOperation: OrderOperationProps;
  approvedOrders: CreateOrderProps[];
  outForDeliveryOrders: CreateOrderProps[];
  deliveredOrders: CreateOrderProps[];
  cancelledOrders: CreateOrderProps[];
  pendingOrders: CreateOrderProps[];
  rejectedOrders: CreateOrderProps[];
  refundedOrders: CreateOrderProps[];

  // Supplier Management
  suppliers: SupplierListProps[];
  supplierOrders: SupplierOrderProps[];
  suppliersProduct: ProductListProps[];
  allPurchaseOrder: PurchaseOrder[];

  // Cart Management
  allAbandonedCart: CreateAbandonCartProps[];
  abandonedCart: CreateAbandonCartProps[];

  // Credit & BNPL Management
  creditApplications: CreditLimitFormProps[];
  creditScore: any;
  suppliersTerms: any[];
  approvedTerms: any[];
  pendingTerms: any[];
  declinedTerms: any[];
  onHoldTerms: any[];
  newTerms: any[];
  recoveryWindowTerms: any[];

  // System
  notifications: NotificationProps[];
}

const initialState: DashboardState = {
  // Core Business Data
  userProfile: initialUserProfile,
  staff: [],
  businesses: [],
  activeBusiness: null,
  profileCompletion: {
    completion: 0,
  },
  businessTypes: [],
  platformBusiness: [],

  // Product Management
  products: [],
  brands: [],
  productCategories: [],
  packagesTypes: [],
  volumeTypes: [],
  weightTypes: [],

  // Categorized Products
  fashionProducts: [],
  electronicProducts: [],
  automobileProducts: [],
  sportsFitnessProducts: [],
  homeKitchenProducts: [],
  uncategorizedProducts: [],
  productsByBrand: [],

  // Agent Management
  salesAgents: [],
  ownerAgents: [],
  managerAgents: [],
  regularAgents: [],
  agentStock: [],
  agentRequests: [],
  team: [],
  topSellingAgents: [],

  // Customer Management
  customers: [],
  customerOverview: initialCustomerOverview,

  // Sales Management
  sales: [],
  salesOverview: initialSalesOverview,
  salesSummary: [],
  salesSupplier: [],
  salesCustomer: [],
  salesRegion: [],
  salesProduct: [],
  salesLog: [],

  // Order Management
  orders: [],
  activeOrderStatus: null, // Changed to null initially
  orderOperation: initialOrderOperation,
  approvedOrders: [],
  outForDeliveryOrders: [],
  deliveredOrders: [],
  cancelledOrders: [],
  pendingOrders: [],
  rejectedOrders: [],
  refundedOrders: [],

  // Supplier Management
  suppliers: [],
  supplierOrders: [],
  suppliersProduct: [],
  allPurchaseOrder: [],

  // Cart Management
  allAbandonedCart: [],
  abandonedCart: [],

  // Credit & Terms Management
  creditApplications: [],
  creditScore: null,
  suppliersTerms: [],
  approvedTerms: [],
  pendingTerms: [],
  declinedTerms: [],
  onHoldTerms: [],
  newTerms: [],
  recoveryWindowTerms: [],

  // System
  notifications: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // CORE BUSINESS ACTIONS
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },

    setStaff: (state, action: PayloadAction<StaffProps[]>) => {
      state.staff = action.payload;
    },

    setBusinesses: (state, action: PayloadAction<BusinessListProps[]>) => {
      state.businesses = action.payload;
    },

    setActiveBusiness: (state, action: PayloadAction<BusinessProps | null>) => {
      state.activeBusiness = action.payload;
    },

    setProfileCompletion: (
      state,
      action: PayloadAction<ProfileCompletionProps>
    ) => {
      state.profileCompletion = action.payload;
    },

    setBusinessTypes: (state, action: PayloadAction<BusinessTypesProps[]>) => {
      state.businessTypes = action.payload;
    },

    setPlatformBusiness: (
      state,
      action: PayloadAction<BusinessListProps[]>
    ) => {
      state.platformBusiness = action.payload;
    },

    resetBusinessData: (state) => {
      state.activeBusiness = null;
      state.businesses = [];
    },

    // PRODUCT MANAGEMENT ACTIONS
    setProducts: (state, action: PayloadAction<ProductListProps[]>) => {
      state.products = action.payload;
    },

    setBrands: (state, action: PayloadAction<BrandProps[]>) => {
      state.brands = action.payload;
    },

    setProductCategories: (
      state,
      action: PayloadAction<ProductCategoryProps[]>
    ) => {
      state.productCategories = action.payload;
    },

    setPackages: (state, action: PayloadAction<PackageProps[]>) => {
      state.packagesTypes = action.payload;
    },

    setVolumeTypes: (
      state,
      action: PayloadAction<BusinessCategoriesListProps[]>
    ) => {
      state.volumeTypes = action.payload;
    },

    setWeightTypes: (
      state,
      action: PayloadAction<BusinessCategoriesListProps[]>
    ) => {
      state.weightTypes = action.payload;
    },

    // Categorized Products
    setFashionProducts: (state, action: PayloadAction<ProductListProps[]>) => {
      state.fashionProducts = action.payload;
    },

    setElectronicProducts: (
      state,
      action: PayloadAction<ProductListProps[]>
    ) => {
      state.electronicProducts = action.payload;
    },

    setAutomobileProducts: (
      state,
      action: PayloadAction<ProductListProps[]>
    ) => {
      state.automobileProducts = action.payload;
    },

    setSportFitnessProducts: (
      state,
      action: PayloadAction<ProductListProps[]>
    ) => {
      state.sportsFitnessProducts = action.payload;
    },

    setHomeKitchenProducts: (
      state,
      action: PayloadAction<ProductListProps[]>
    ) => {
      state.homeKitchenProducts = action.payload;
    },

    setUncategorizedProducts: (
      state,
      action: PayloadAction<ProductListProps[]>
    ) => {
      state.uncategorizedProducts = action.payload;
    },

    setProductsByBrand: (state, action: PayloadAction<ProductListProps[]>) => {
      state.productsByBrand = action.payload;
    },

    // AGENT MANAGEMENT ACTIONS
    setAgents: (state, action: PayloadAction<CreateSalesAgentProps[]>) => {
      state.salesAgents = action.payload;
    },

    setOwnerAgents: (state, action: PayloadAction<CreateSalesAgentProps[]>) => {
      state.ownerAgents = action.payload;
    },

    setManagerAgents: (
      state,
      action: PayloadAction<CreateSalesAgentProps[]>
    ) => {
      state.managerAgents = action.payload;
    },

    setRegularAgents: (
      state,
      action: PayloadAction<CreateSalesAgentProps[]>
    ) => {
      state.regularAgents = action.payload;
    },

    setAgentStock: (state, action: PayloadAction<any[]>) => {
      state.agentStock = action.payload;
    },

    setAgentRequests: (state, action: PayloadAction<AgentRequestProps[]>) => {
      state.agentRequests = action.payload;
    },

    setTeam: (state, action: PayloadAction<TeamListProps[]>) => {
      state.team = action.payload;
    },

    // CUSTOMER MANAGEMENT ACTIONS
    setCustomers: (state, action: PayloadAction<CreateCustomerProps[]>) => {
      state.customers = action.payload;
    },

    setCustomersOverview: (
      state,
      action: PayloadAction<CustomersOverviewProps>
    ) => {
      state.customerOverview = action.payload;
    },

    // SALES MANAGEMENT ACTIONS
    setSales: (state, action: PayloadAction<SalesListProps[]>) => {
      state.sales = action.payload;
    },

    setSalesOverview: (state, action: PayloadAction<SalesOverviewProps>) => {
      state.salesOverview = action.payload;
    },

    setSalesSummary: (
      state,
      action: PayloadAction<SalesSummaryReportProps[]>
    ) => {
      state.salesSummary = action.payload;
    },

    setSalesSupplier: (
      state,
      action: PayloadAction<SalesSupplierReportProps[]>
    ) => {
      state.salesSupplier = action.payload;
    },

    setSalesCustomer: (
      state,
      action: PayloadAction<SalesCustomerReportProps[]>
    ) => {
      state.salesCustomer = action.payload;
    },

    setSalesRegion: (
      state,
      action: PayloadAction<SalesRegionReportProps[]>
    ) => {
      state.salesRegion = action.payload;
    },

    setSalesProduct: (state, action: PayloadAction<SalesListProps[]>) => {
      state.salesProduct = action.payload;
    },

    setSalesLog: (state, action: PayloadAction<SaleBulkUpload[]>) => {
      state.salesLog = action.payload;
    },

    // ORDER MANAGEMENT ACTIONS
    setOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.orders = action.payload;
    },

    setActiveOrderStatus: (
      state,
      action: PayloadAction<any> // Using any to accommodate all API properties
    ) => {
      state.activeOrderStatus = action.payload;
    },

    setOrderOperation: (state, action: PayloadAction<OrderOperationProps>) => {
      state.orderOperation = action.payload;
    },

    setApprovedOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.approvedOrders = action.payload;
    },

    setOutForDeliveryOrders: (
      state,
      action: PayloadAction<CreateOrderProps[]>
    ) => {
      state.outForDeliveryOrders = action.payload;
    },

    setDeliveredOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.deliveredOrders = action.payload;
    },

    setCancelledOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.cancelledOrders = action.payload;
    },

    setPendingOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.pendingOrders = action.payload;
    },

    setRejectedOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.rejectedOrders = action.payload;
    },

    setRefundedOrders: (state, action: PayloadAction<CreateOrderProps[]>) => {
      state.refundedOrders = action.payload;
    },

    // SUPPLIER MANAGEMENT ACTIONS
    setSuppliers: (state, action: PayloadAction<SupplierListProps[]>) => {
      state.suppliers = action.payload;
    },

    setSupplierOrders: (state, action: PayloadAction<SupplierOrderProps[]>) => {
      state.supplierOrders = action.payload;
    },

    setSuppliersProduct: (state, action: PayloadAction<ProductListProps[]>) => {
      state.suppliersProduct = action.payload;
    },

    clearSuppliersProduct: (state) => {
      state.suppliersProduct = [];
    },

    setAllPurchaseOrder: (state, action: PayloadAction<PurchaseOrder[]>) => {
      state.allPurchaseOrder = action.payload;
    },

    // CART MANAGEMENT ACTIONS
    setAllAbandonedCart: (
      state,
      action: PayloadAction<CreateAbandonCartProps[]>
    ) => {
      state.allAbandonedCart = action.payload;
    },

    setAbandonedCart: (
      state,
      action: PayloadAction<CreateAbandonCartProps[]>
    ) => {
      state.abandonedCart = action.payload;
    },

    // CREDIT & TERMS MANAGEMENT ACTIONS
    setCreditApplications: (
      state,
      action: PayloadAction<CreditLimitFormProps[]>
    ) => {
      state.creditApplications = action.payload;
    },

    setCreditScore: (state, action: PayloadAction<any>) => {
      state.creditScore = action.payload;
    },

    setSuppliersTerms: (state, action: PayloadAction<any[]>) => {
      state.suppliersTerms = action.payload;
    },

    setApprovedTerms: (state, action: PayloadAction<any[]>) => {
      state.approvedTerms = action.payload;
    },

    setPendingTerms: (state, action: PayloadAction<any[]>) => {
      state.pendingTerms = action.payload;
    },

    setDeclinedTerms: (state, action: PayloadAction<any[]>) => {
      state.declinedTerms = action.payload;
    },

    setOnHoldTerms: (state, action: PayloadAction<any[]>) => {
      state.onHoldTerms = action.payload;
    },

    setNewTerms: (state, action: PayloadAction<any[]>) => {
      state.newTerms = action.payload;
    },

    setRecoveryWindowTerms: (state, action: PayloadAction<any[]>) => {
      state.recoveryWindowTerms = action.payload;
    },

    setTopSellingAgents: (state, action: PayloadAction<any[]>) => {
      state.topSellingAgents = action.payload;
    },

    // SYSTEM ACTIONS
    setNotifications: (state, action: PayloadAction<NotificationProps[]>) => {
      state.notifications = action.payload;
    },

    // BULK ACTIONS
    resetDashboard: (state) => {
      return initialState;
    },

    resetSalesData: (state) => {
      state.sales = [];
      state.salesOverview = initialSalesOverview;
      state.salesSummary = [];
      state.salesSupplier = [];
      state.salesCustomer = [];
      state.salesRegion = [];
      state.salesProduct = [];
      state.salesLog = [];
    },

    resetOrderData: (state) => {
      state.orders = [];
      state.orderOperation = initialOrderOperation;
      state.approvedOrders = [];
      state.outForDeliveryOrders = [];
      state.deliveredOrders = [];
      state.cancelledOrders = [];
      state.pendingOrders = [];
      state.rejectedOrders = [];
      state.refundedOrders = [];
    },
  },
});

export const {
  // Core Business Actions
  setUserProfile,
  setStaff,
  setBusinesses,
  setActiveBusiness,
  setProfileCompletion,
  setBusinessTypes,
  setPlatformBusiness,
  resetBusinessData,

  // Product Management Actions
  setProducts,
  setBrands,
  setProductCategories,
  setPackages,
  setVolumeTypes,
  setWeightTypes,
  setFashionProducts,
  setElectronicProducts,
  setAutomobileProducts,
  setSportFitnessProducts,
  setHomeKitchenProducts,
  setUncategorizedProducts,
  setProductsByBrand,

  // Agent Management Actions
  setAgents,
  setOwnerAgents,
  setManagerAgents,
  setRegularAgents,
  setAgentStock,
  setAgentRequests,
  setTeam,
  setTopSellingAgents,

  // Customer Management Actions
  setCustomers,
  setCustomersOverview,

  // Sales Management Actions
  setSales,
  setSalesOverview,
  setSalesSummary,
  setSalesSupplier,
  setSalesCustomer,
  setSalesRegion,
  setSalesProduct,
  setSalesLog,

  // Order Management Actions
  setOrders,
  setActiveOrderStatus,
  setOrderOperation,
  setApprovedOrders,
  setOutForDeliveryOrders,
  setDeliveredOrders,
  setCancelledOrders,
  setPendingOrders,
  setRejectedOrders,
  setRefundedOrders,

  // Supplier Management Actions
  setSuppliers,
  setSupplierOrders,
  setSuppliersProduct,
  clearSuppliersProduct,
  setAllPurchaseOrder,

  // Cart Management Actions
  setAllAbandonedCart,
  setAbandonedCart,

  // Credit & Terms Management Actions
  setCreditApplications,
  setCreditScore,
  setSuppliersTerms,
  setApprovedTerms,
  setPendingTerms,
  setDeclinedTerms,
  setOnHoldTerms,
  setNewTerms,
  setRecoveryWindowTerms,

  // System Actions
  setNotifications,

  // Bulk Actions
  resetDashboard,
  resetSalesData,
  resetOrderData,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
