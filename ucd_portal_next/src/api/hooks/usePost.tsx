import { useState, useCallback } from "react";
import { api, api2 } from "..";
import { toast } from "react-hot-toast";

type ApiResponse<T = any> = {
	payload: T;
	status_code: number;
	message: string;
};

type ErrorResponse = {
	payload?: any;
	status_code?: number;
	message?: string;
	error?: string;
};

type UsePostRequestResult<T = any> = {
	loading: boolean;
	data: T | null;
	error: string | null;
	postRequest: (
		url: string,
		formData: any,
		options?: { showToast?: boolean }
	) => Promise<void>;
	message: string;
	isSuccess: boolean;
	reset: () => void;
};

const usePostRequest = <T = any,>(): UsePostRequestResult<T> => {
	const [state, setState] = useState<{
		loading: boolean;
		data: T | null;
		error: string | null;
		message: string;
		isSuccess: boolean;
	}>({
		loading: false,
		data: null,
		error: null,
		message: "",
		isSuccess: false,
	});

	const reset = useCallback(() => {
		setState({
			loading: false,
			data: null,
			error: null,
			message: "",
			isSuccess: false,
		});
	}, []);

	const postRequest = useCallback(
		async (url: string, formData: any, options?: { showToast?: boolean }) => {
			reset();
			setState((prev) => ({ ...prev, loading: true }));

			try {
				const response =
					formData instanceof FormData
						? await api2.post<ApiResponse<T>>(`/ap${url}`, formData)
						: await api.post<ApiResponse<T>>(`/ap${url}`, formData);

				const responseData = response.data;
				setState({
					loading: false,
					data: responseData.payload,
					error: null,
					message: responseData.message,
					isSuccess: true,
				});

				if (options?.showToast !== false) {
					toast.success(responseData.message || "Request successful", {
						duration: 4000,
						position: "top-right",
					});
				}
			} catch (error: any) {
				const errorMessage =
					error?.response?.data?.message ||
					error?.response?.data?.error ||
					"Something went wrong";

				setState({
					loading: false,
					data: null,
					error: errorMessage,
					message: errorMessage,
					isSuccess: false,
				});

				if (options?.showToast !== false) {
					toast.error(errorMessage);
				}
			}
		},
		[reset]
	);

	return { ...state, postRequest, reset };
};

export default usePostRequest;
