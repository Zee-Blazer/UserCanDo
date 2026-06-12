import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { api2, api } from "..";

type Res = {
	data: any;
	status: number;
	statusText: boolean;
};

type UseApiRequestResult = {
	loading: boolean;
	error: string | null;
	message: string;
	isSuccess: boolean;
	reset: () => void;

	getRequest: (
		url: string,
		callback?: (data: any, isSuccess: boolean) => void,
		showToast?: boolean
	) => Promise<void>;
	postRequest: (
		url: string,
		formData: any,
		callback?: (data: any, isSuccess: boolean) => void,
		showToast?: boolean
	) => Promise<void>;
	patchRequest: (
		url: string,
		formData: any,
		callback?: (data: any, isSuccess: boolean) => void,
		showToast?: boolean
	) => Promise<void>;
	deleteRequest: (
		url: string,
		formData: any,
		callback?: (data: any, isSuccess: boolean) => void,
		showToast?: boolean
	) => Promise<void>;
};

const useApiRequest = (): UseApiRequestResult => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string>("");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const reset = () => {
		setError(null);
		setMessage("");
		setIsSuccess(false);
	};

	const makeRequest = useCallback(
		async (
			method: "get" | "post" | "patch" | "delete",
			url: string,
			data?: any,
			callback?: (data: any, isSuccess: boolean) => void,
			showToast: boolean = true
		) => {
			reset();
			setLoading(true);
			try {
				let response;
				const axiosInstance = data instanceof FormData ? api2 : api;

				if (method === "get" || method === "delete") {
					response = await axiosInstance[method]<Res>(url);
				} else {
					response = await axiosInstance[method]<Res>(url, data);
				}
				//@ts-ignore
				const responseData = JSON.parse(response.data);
				setMessage(responseData.message);
				setIsSuccess(true);

				if (method !== "get" && showToast) {
					toast.success(responseData.message || "Request successful");
				}

				if (callback) callback(responseData, true);
			} catch (error: any) {
				const responseData = error?.response?.data;
				const errorData =
					typeof responseData === "string"
						? JSON.parse(responseData)
						: responseData;

				console.error(errorData);
				setIsSuccess(false);
				const msg =
					errorData?.message || errorData?.error || "Something went wrong";
				setError(msg);
				if (showToast) {
					toast.error(msg);
				}
				if (callback) callback(errorData, false);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return {
		loading,
		error,
		message,
		isSuccess,
		reset,
		getRequest: (url, callback, showToast = true) =>
			makeRequest("get", `/ag${url}`, undefined, callback, showToast),
		postRequest: (url, formData, callback, showToast = true) =>
			makeRequest("post", `/ap${url}`, formData, callback, showToast),
		patchRequest: (url, formData, callback, showToast = true) =>
			makeRequest("patch", `/ap${url}`, formData, callback, showToast),
		deleteRequest: (url, formData, callback, showToast = true) =>
			makeRequest("delete", url, formData, callback, showToast),
	};
};

export default useApiRequest;
