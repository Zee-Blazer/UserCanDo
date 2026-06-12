import { initialLoginData } from "@/utils/initialStates";
import { createSlice } from "@reduxjs/toolkit";

export interface LoginApiData {
  access_token: string;
  refresh_token: string;
  role: string;
  user_id: string;
  phone_number: string;
  use_case: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  loginData: LoginApiData;
  countries: CountryDataListProps[];
  regions: RegionDataListProps[];
  cities: CitiesDataListProps[];
  businessCategories: BusinessCategoriesListProps[];
  saleTypes: SaleTypesListProps[];
  saleStatus: SaleStatusListProps[];
  paymentModes: PaymentModesListProps[];
}

const initialState: AuthState = {
  isLoggedIn: false,
  loginData: initialLoginData,
  countries: [],
  regions: [],
  cities: [],
  businessCategories: [],
  saleTypes: [],
  saleStatus: [],
  paymentModes: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, { payload }) => {
      state.isLoggedIn = true;
      state.loginData = payload;
    },
    logUserOut: (state) => {
      state.isLoggedIn = false;
      state.loginData = initialLoginData;
    },
    setCountries: (state, { payload }) => {
      state.countries = payload;
    },
    setRegions: (state, { payload }) => {
      state.regions = payload;
    },
    setCities: (state, { payload }) => {
      state.cities = payload;
    },
    setBusinessCategories: (state, { payload }) => {
      state.businessCategories = payload;
    },
    setSaleTypes: (state, { payload }) => {
      state.saleTypes = payload;
    },
    setSaleStatus: (state, { payload }) => {
      state.saleStatus = payload;
    },
    setPaymentModes: (state, { payload }) => {
      state.paymentModes = payload;
    },
    setAccessToken: (state, { payload }) => {
      state.loginData.access_token = payload.access_token;
      state.loginData.refresh_token = payload.refresh;
    },
  },
});

export const {
  logUserIn,
  logUserOut,
  setCountries,
  setRegions,
  setCities,
  setBusinessCategories,
  setSaleTypes,
  setSaleStatus,
  setPaymentModes,
  setAccessToken,
} = authSlice.actions;
export default authSlice.reducer;
