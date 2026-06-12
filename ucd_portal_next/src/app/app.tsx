"use client";
import { persistor, store } from "@/Redux/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppProvider from "./appContext";

const App = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppProvider>
					{children}
					<Toaster />
				</AppProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
