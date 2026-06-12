"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAuthSelector = () => {
  return useSelector((state: RootState) => state.auth);
};

export const useInvestorSelector = () => {
  return useSelector((state: RootState) => state.investor);
};

export const useBusinessSelector = () => {
  return useSelector((state: RootState) => state.business);
};

export const useBusinessDataSelector = () => {
  return useSelector((state: RootState) => state.businessData);
};

export const useAdminSelector = () => {
  return useSelector((state: RootState) => state.admin);
};
