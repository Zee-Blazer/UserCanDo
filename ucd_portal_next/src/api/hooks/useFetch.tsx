import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { api } from "..";

type Res = {
	data: any;
	status: number;
	statusText: string;
};

type DataProps = {
	payload: any;
	status_code: number;
	message: string;
};

type UseFetchRequestResult = {
	loading: boolean;
	data: DataProps | null;
	error: string | null;
	fetchRequest: (
		url: string,
		params?: any,
		options?: { showToast?: boolean }
	) => Promise<void>;
	message: string;
	isSuccess: boolean;
	reset: () => void;
};

const useFetch = (): UseFetchRequestResult => {
	const [state, setState] = useState<{
		loading: boolean;
		data: DataProps | null;
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

	const fetchRequest = useCallback(
		async (url: string, params?: any, options?: { showToast?: boolean }) => {
			reset();
			setState((prev) => ({ ...prev, loading: true }));

			try {
				const response = await api.get<DataProps>(`/ag${url}`, { params });
				const data: DataProps = response.data;

				setState({
					loading: false,
					data,
					error: null,
					message: data.message,
					isSuccess: true,
				});

				// if (options?.showToast !== false) {
				// 	toast.success(data.message || "Request successful", {
				// 		duration: 4000,
				// 		position: "top-right",
				// 	});
				// }
			} catch (error: any) {
				const errorData: DataProps = JSON.parse(error?.response?.data || "{}");
				const errorMessage = errorData?.message || "Something went wrong";

				setState({
					loading: false,
					data: null,
					error: errorMessage,
					message: errorMessage,
					isSuccess: false,
				});

				if (options?.showToast !== false) {
					toast.error(errorMessage, {
						duration: 4000,
						position: "top-right",
					});
				}
			}
		},
		[reset]
	);

	return { ...state, fetchRequest, reset };
};

export default useFetch;
