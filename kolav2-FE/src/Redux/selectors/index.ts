"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAuthSelector = () => {
  return useSelector((state: RootState) => state.auth);
};
export const useDashboardSelector = () => {
  return useSelector((state: RootState) => state.dashboard);
};
export const useAgentSelector = () => {
  return useSelector((state: RootState) => state.agent);
};
export const useShopperSelector = () => {
  return useSelector((state: RootState) => state.shopper);
};
