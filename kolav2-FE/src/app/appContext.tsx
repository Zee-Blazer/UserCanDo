"use client";
import useApiRequest from "@/api/hooks/useApiRequest";
import { ROUTES } from "@/constants/routes";
import {
	logUserOut,
	setBusinessCategories,
	setCities,
	setCountries,
	setRegions,
	setSaleTypes,
	setSaleStatus,
	setPaymentModes,
} from "@/Redux/features/authSlice";
import { resetBusinessData } from "@/Redux/features/dashboardSlice";
import { useAuthSelector } from "@/Redux/selectors";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

interface AppContextType {
	loadData: () => void;
	logout: () => void;
	getCountryRegions: (country: string) => void;
	getRegionCities: (country: string, region: string) => void;
	isCountryFetching: boolean;
	isRegionFetching: boolean;
	isCitiesFetching: boolean;
	isCategoriesLoading: boolean;
	isSaleTypesLoading: boolean;
	isSaleStatusLoading: boolean;
	isPaymentModesLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: PropsWithChildren) => {
	const { loading: isCountryFetching, getRequest: getCountries } =
		useApiRequest();

	const { loading: isRegionFetching, getRequest: getRegions } = useApiRequest();

	const { loading: isCitiesFetching, getRequest: getCities } = useApiRequest();

	const { loading: isCategoriesLoading, getRequest: getBusinessCategories } =
		useApiRequest();

	const { loading: isSaleTypesLoading, getRequest: getSaleTypes } =
		useApiRequest();

	const { loading: isSaleStatusLoading, getRequest: getSaleStatus } =
		useApiRequest();

	const { loading: isPaymentModesLoading, getRequest: getPaymentModes } =
		useApiRequest();

	const dispatch = useDispatch();
	const router = useRouter();
	const { countries, regions } = useAuthSelector();

	const loadData = () => {
		fetchCategories();
		getAllCountries();
		fetchSaleTypes();
		fetchSaleStatus();
		fetchPaymentModes();
	};

	const logout = () => {
		clearAuthToken();
		localStorage.removeItem("access_token");
		dispatch(resetBusinessData());
		dispatch(logUserOut());
		router.push(ROUTES.login);
	};

	const getAllCountries = async () =>
		await getCountries("/countries", (data) => {
			if (data.is_success) {
				dispatch(setCountries(data.payload));
			} else {
				dispatch(setCountries([]));
			}
		});

	const getCountryRegions = async (country: string) => {
		const code = countries.find((cty) => cty.name === country);
		if (code) {
			await getRegions(`/regions/${code.alpha_2}`, (data) => {
				if (data.is_success) {
					dispatch(setRegions(data.payload));
				} else {
					dispatch(setRegions([]));
				}
			});
		}
	};

	const getRegionCities = async (country: string, region: string) => {
		const selectedCountry = countries.find((cty) => cty.name === country);
		const selectedRegion = regions.find((rg) => rg.name === region);
		if (selectedCountry && selectedRegion) {
			await getCities(
				`/cities/${selectedCountry.alpha_2}/${selectedRegion.code}`,
				(data) => {
					if (data.is_success) {
						dispatch(setCities(data.payload));
					} else {
						dispatch(setCities([]));
					}
				}
			);
		}
	};

	const fetchCategories = async () =>
		await getBusinessCategories("/business_categories", (data) => {
			if (data.is_success) {
				dispatch(setBusinessCategories(data.payload));
			} else {
				dispatch(setBusinessCategories([]));
			}
		});

	const fetchSaleTypes = async () =>
		await getSaleTypes("/sale_types", (data) => {
			if (data.is_success) {
				dispatch(setSaleTypes(data.payload));
			} else {
				dispatch(setSaleTypes([]));
			}
		});

	const fetchSaleStatus = async () =>
		await getSaleStatus("/sale_status", (data) => {
			if (data.is_success) {
				dispatch(setSaleStatus(data.payload));
			} else {
				dispatch(setSaleStatus([]));
			}
		});

	const fetchPaymentModes = async () =>
		await getPaymentModes("/payment_modes", (data) => {
			if (data.is_success) {
				dispatch(setPaymentModes(data.payload));
			} else {
				dispatch(setPaymentModes([]));
			}
		});

	useEffect(() => {
		loadData();
	}, []);

	const value: AppContextType = {
		loadData,
		logout,
		getCountryRegions,
		getRegionCities,
		isCountryFetching,
		isRegionFetching,
		isCategoriesLoading,
		isCitiesFetching,
		isSaleTypesLoading,
		isSaleStatusLoading,
		isPaymentModesLoading,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext) as AppContextType;
};

export default AppProvider;
