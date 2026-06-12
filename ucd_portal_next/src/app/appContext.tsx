"use client";
import { logUserOut } from "@/Redux/features/authSlice";

import { createContext, PropsWithChildren, useContext } from "react";
import { useDispatch } from "react-redux";

interface AppContextType {
	loadData: () => void;
	logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useDispatch();

	const loadData = () => {};
	const logout = () => {
		dispatch(logUserOut());
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	const value: AppContextType = {
		loadData,
		logout,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext) as AppContextType;
};

export default AppProvider;
