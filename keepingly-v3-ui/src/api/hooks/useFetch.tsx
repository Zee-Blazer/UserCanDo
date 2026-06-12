import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { api } from "..";

type Res = {
	data: any;
	status: number;
	statusText: string;
};

type UseFetchRequestResult = {
	loading: boolean;
	data: any;
	error: string | null;
	fetchRequest: (url: string, params?: any) => Promise<void>;
	message: string;
	isSuccess: boolean;
};

type DataProps = {
	payload: any;
	status_code: number;
	message: string;
};

const useFetch = (): UseFetchRequestResult => {
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

	const fetchRequest = useCallback(async (url: string, params?: any) => {
		reset();
		setLoading(true);
		try {
			const response = await api.get<Res>(`/ag${url}`, { params });
			// @ts-ignore
			const data: DataProps = JSON.parse(response.data);
			setData(data);
			setMessage(data.message);
			// toast.success(data.message || "Fetch successful");
			setIsSuccess(true);
		} catch (error: any) {
			const errorData: DataProps = JSON.parse(error?.response?.data || null);
			console.error(errorData);
			setIsSuccess(false);
			const msg = errorData?.message || "Something went wrong";
			setError(msg);
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	}, []);

	return { loading, data, error, fetchRequest, message, isSuccess };
};

export default useFetch;
