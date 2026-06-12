"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAuthSelector = () => {
	return useSelector((state: RootState) => state.auth);
};
export const useDashboardSelector = () => {
	return useSelector((state: RootState) => state.dashboard);
};
