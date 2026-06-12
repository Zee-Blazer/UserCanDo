import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  Vendor,
  CartItem,
  VendorCart,
  Order,
  OrderMessage,
} from "@/types/shopper";

export interface ShopperState {
  categories: Category[];
  vendors: Vendor[];
  newDeals: ProductResponse;
  cartItems: VendorCart[];
  favouriteItems: VendorCart[];
  orders: Order[];
  bnplOrders: Order[];
  orderMessages: OrderMessage[];
  isNotificationsEnabled: boolean;
}

const initialState: ShopperState = {
  categories: [],
  vendors: [],
  newDeals: {
    count: 0,
    limit: 50,
    page: 1,
    products: [],
  },
  cartItems: [],
  favouriteItems: [],
  orders: [],
  bnplOrders: [],
  orderMessages: [],
  isNotificationsEnabled: false,
};

const shopperSlice = createSlice({
  name: "shopper",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setVendors: (state, action: PayloadAction<Vendor[]>) => {
      state.vendors = action.payload;
    },
    setNewDeals: (state, action: PayloadAction<ProductResponse>) => {
      state.newDeals = action.payload;
    },
    setCartItems: (state, action: PayloadAction<VendorCart[]>) => {
      state.cartItems = action.payload;
    },
    setFavouriteCartItems: (state, action: PayloadAction<VendorCart[]>) => {
      state.favouriteItems = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setBNPLOrders: (state, action: PayloadAction<Order[]>) => {
      state.bnplOrders = action.payload;
    },
    setOrderMessages: (state, action: PayloadAction<OrderMessage[]>) => {
      state.orderMessages = action.payload;
    },
    resetExceptCartAndFavorites: (state) => {
      state.categories = [];
      state.vendors = [];
      state.newDeals = { count: 0, limit: 50, page: 1, products: [] };
      state.orders = [];
      state.bnplOrders = [];
      state.orderMessages = [];
    },
    setEnableStatus: (state, action: PayloadAction<boolean>) => {
      state.isNotificationsEnabled = action.payload;
    },
  },
});

export const {
  setCategories,
  setVendors,
  setNewDeals,
  setCartItems,
  setFavouriteCartItems,
  setOrders,
  setBNPLOrders,
  setOrderMessages,
  resetExceptCartAndFavorites,
  setEnableStatus,
} = shopperSlice.actions;
export default shopperSlice.reducer;
