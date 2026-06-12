import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer, { AuthState } from "./features/authSlice";
import dashboardReducer, { DashboardState } from "./features/dashboardSlice";

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
	auth: authReducer,
	dashboard: dashboardReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST"],
			},
		}),
});

const persistor = persistStore(store);

export type RootState = {
	auth: AuthState;
	dashboard: DashboardState;
};

export { store, persistor };
