import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { apiSlice } from "../queries";
import adminReducer from "./features/adminSlice";
import authReducer, { AuthState } from "./features/authSlice";
import businessDataReducer, {
  BusinessDataState,
} from "./features/businessDataSlice";
import businessReducer, { BusinessState } from "./features/businessSlice";
import investorReducer, { InvestorState } from "./features/investorSlice";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve();
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  business: businessReducer,
  businessData: businessDataReducer,
  investor: investorReducer,
  admin: adminReducer,
});


const customStateReconciler = (
  inboundState: any,
  originalState: any,
  reducedState: any
) => {
 
  if (!inboundState) {
    return reducedState;
  }

  
  const expectedKeys = [
    apiSlice.reducerPath,
    "auth",
    "business",
    "businessData",
    "investor",
    "admin",
  ];

  const filteredState: any = {};

 
  expectedKeys.forEach((key) => {
    if (inboundState[key] !== undefined) {
      filteredState[key] = inboundState[key];
    } else if (reducedState && reducedState[key] !== undefined) {
     
      filteredState[key] = reducedState[key];
    }
  });


  if (reducedState) {
    expectedKeys.forEach((key) => {
      if (filteredState[key] === undefined && reducedState[key] !== undefined) {
        filteredState[key] = reducedState[key];
      }
    });
  }

  return filteredState;
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: customStateReconciler,
  version: 1,
  // Blacklist the API slice to prevent caching API responses across sessions
  blacklist: [apiSlice.reducerPath],
};

// @ts-ignore - redux-persist types don't perfectly align with RTK
const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiSlice.middleware),
}) as any;

const persistor = persistStore(store);

export type RootState = {
  auth: AuthState;
  business: BusinessState;
  businessData: BusinessDataState;
  investor: InvestorState;
  admin: ReturnType<typeof adminReducer>;
};

export { persistor, store };
