import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { api2, api } from "..";

type Res = {
	data: any;
	status: number;
	statusText: boolean;
};

type UsePostRequestResult = {
	loading: boolean;
	data: any;
	error: string | null;
	postRequest: (url: string, formData: any) => Promise<void>;
	message: string;
	isSuccess: boolean;
	reset: () => void;
};

type DataProps = {
	payload: any;
	status_code: number;
	message: string;
};
type ErrorDataProps = {
	payload: any;
	status_code: number;
	message: string;
	error: string;
};

const usePostRequest = (): UsePostRequestResult => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<DataProps | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [message, setMessage] = useState<string>("");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const reset = () => {
		setData(null);
		setError(null);
		setMessage("");
		setIsSuccess(false);
	};

	const postRequest = useCallback(async (url: string, formData: any) => {
		reset();
		setLoading(true);

		try {
			let response;
			if (formData instanceof FormData) {
				response = await api2.post<Res>(`/ap${url}`, formData);
			} else {
				response = await api.post<Res>(`/ap${url}`, formData);
			}

			// @ts-ignore
			const data: DataProps = JSON.parse(response.data);
			setData(data);
			setMessage(data.message);
			toast.success(data.message || "Request successful");
			setIsSuccess(true);
		} catch (error: any) {
			const errorData: ErrorDataProps = JSON.parse(
				(typeof error?.response?.data === "string" && error?.response?.data) ||
					null
			);

			console.error(errorData);
			setIsSuccess(false);
			const msg =
				errorData?.message || errorData?.error || "Something went wrong";
			setError(errorData?.message);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}, []);

	return { loading, data, error, postRequest, message, isSuccess, reset };
};

export default usePostRequest;
