import { initialUserProfile } from "@/utils/initialStates";
import { createSlice } from "@reduxjs/toolkit";

export interface AgentState {
  activeTabIndex: number;
  userProfile: UserProfile;
  businesses: BusinessListProps[];
  activeBusiness: BusinessProps | null;
  businessTypes: BusinessTypesProps[];
  platformBusiness: BusinessListProps[];

  products: ProductListProps[];
  supplierProducts: ProductListProps[];
  brands: BrandProps[];
  productCategories: ProductCategoryProps[];
  packagesTypes: PackageProps[];
  volumeTypes: BusinessCategoriesListProps[];
  weightTypes: BusinessCategoriesListProps[];
  overview: OverViewProps;
  customers: CreateCustomerProps[];
  todayOrderHistory: OrderHistory[];
  weekOrderHistory: OrderHistory[];
  orderHistory: OrderHistory[];
  requestOrderHistory: AgentHistoryRequest[];
  todayRequestOrderHistory: AgentHistoryRequest[];
  weekRequestOrderHistory: AgentHistoryRequest[];
  supplier: SupplierDataProps[];
  sales: AgentSalesProps[];
  todaySales: AgentSalesProps[];
  weekSales: AgentSalesProps[];
  salesAgents: CreateSalesAgentProps[];
  sales_agent_id: string;
}

const initialState: AgentState = {
  activeTabIndex: 1,
  userProfile: initialUserProfile,
  businesses: [],
  activeBusiness: null,
  businessTypes: [],
  platformBusiness: [],

  products: [],
  supplierProducts: [],
  brands: [],
  productCategories: [],
  packagesTypes: [],
  volumeTypes: [],
  weightTypes: [],
  overview: {},
  todayRequestOrderHistory: [],
  weekRequestOrderHistory: [],
  requestOrderHistory: [],
  customers: [],
  todayOrderHistory: [],
  weekOrderHistory: [],
  orderHistory: [],
  supplier: [],
  sales: [],
  todaySales: [],
  weekSales: [],
  salesAgents: [],
  sales_agent_id: "",
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setActiveTabIndex: (state, { payload }) => {
      state.activeTabIndex = payload;
    },
    setUserProfile: (state, { payload }) => {
      state.userProfile = payload;
    },

    setBusinessTypes: (state, { payload }) => {
      state.businessTypes = payload;
    },

    setPlatformBusiness: (state, { payload }) => {
      state.platformBusiness = payload;
    },

    resetBusinessData: (state) => {
      state.activeBusiness = null;
      state.businesses = [];
    },

    setBrands: (state, { payload }) => {
      state.brands = payload;
    },

    setProductCategories: (state, { payload }) => {
      state.productCategories = payload;
    },

    setPackages: (state, { payload }) => {
      state.packagesTypes = payload;
    },

    setVolumeTypes: (state, { payload }) => {
      state.volumeTypes = payload;
    },

    setWeightTypes: (state, { payload }) => {
      state.weightTypes = payload;
    },
    setBusinesses: (state, { payload }) => {
      state.businesses = payload;
    },
    setOverView: (state, { payload }) => {
      state.overview = payload;
    },
    setTodayRequestOrderHistory: (state, { payload }) => {
      state.todayRequestOrderHistory = payload;
    },
    setWeekRequestOrderHistory: (state, { payload }) => {
      state.weekRequestOrderHistory = payload;
    },
    setRequestOrderHistory: (state, { payload }) => {
      state.requestOrderHistory = payload;
    },
    setActiveBusiness: (state, { payload }) => {
      state.activeBusiness = payload;
    },
    setCustomers: (state, { payload }) => {
      state.customers = payload;
    },
    setTodayOrderHistory: (state, { payload }) => {
      state.todayOrderHistory = payload;
    },
    setWeekOrderHistory: (state, { payload }) => {
      state.weekOrderHistory = payload;
    },
    setOrderHistory: (state, { payload }) => {
      state.orderHistory = payload;
    },
    setSuppliers: (state, { payload }) => {
      state.supplier = payload;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    setSuppliersProducts: (state, { payload }) => {
      state.supplierProducts = payload;
    },
    setSales: (state, { payload }) => {
      state.sales = payload;
    },
    setTodaySales: (state, { payload }) => {
      state.todaySales = payload;
    },
    setWeekSales: (state, { payload }) => {
      state.weekSales = payload;
    },
    setSalesAgents: (state, { payload }) => {
      state.salesAgents = payload;
    },
    setSalesAgentId: (state, { payload }) => {
      state.sales_agent_id = payload;
    },
  },
});

export const {
  setActiveTabIndex,
  setBusinesses,
  setUserProfile,
  setBusinessTypes,
  setPlatformBusiness,
  resetBusinessData,
  setBrands,
  setProductCategories,
  setPackages,
  setVolumeTypes,
  setWeightTypes,
  setOverView,
  setActiveBusiness,
  setTodayRequestOrderHistory,
  setWeekRequestOrderHistory,
  setRequestOrderHistory,
  setCustomers,
  setTodayOrderHistory,
  setWeekOrderHistory,
  setOrderHistory,
  setSuppliers,
  setProducts,
  setSuppliersProducts,
  setSales,
  setTodaySales,
  setWeekSales,
  setSalesAgents,
  setSalesAgentId,
} = agentSlice.actions;
export default agentSlice.reducer;
