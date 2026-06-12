import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { api, api2 } from "..";

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

    getRequest: (
        url: string,
        callback?: (data: DataProps) => void
    ) => Promise<void>;

    postRequest: (
        url: string,
        formData: any,
        callback?: (data: DataProps) => void
    ) => Promise<void>;

    patchRequest: (
        url: string,
        formData: any,
        callback?: (data: DataProps) => void
    ) => Promise<void>;

    deleteRequest: (
        url: string,
        callback?: (data: DataProps) => void
    ) => Promise<void>;
};

type DataProps = {
    payload: any;
    is_success: boolean;
    message: string;
};

type ErrorDataProps = {
    payload: any;
    is_success: boolean;
    message: string;
    error: string;
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
            callback?: (data: DataProps) => void
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

                // @ts-ignore
                const responseData: DataProps = response.data;
                setMessage(responseData.message);
                setIsSuccess(true);
                if (method !== "get") {
                    if (responseData.is_success) {
                        toast.success(responseData.message || "Request successful", {
                            position: "top-right",
                        });
                    } else {
                        toast.error(responseData.message || "Something went wrong", {
                            position: "top-right",
                        });
                    }
                }
                if (callback) callback(responseData);
            } catch (error: any) {
                const errorData: ErrorDataProps = error?.response?.data || {};
                console.error(errorData);
                setIsSuccess(false);
                const msg =
                    errorData?.message || errorData?.error || "Something went wrong";
                setError(msg);
                toast.error(msg, { position: "top-right" });
                if (callback) callback(errorData);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        loading,
        error,
        getRequest: (url, callback) => makeRequest("get", url, undefined, callback),
        postRequest: (url, formData, callback) =>
            makeRequest("post", url, formData, callback),
        patchRequest: (url, formData, callback) =>
            makeRequest("patch", url, formData, callback),
        deleteRequest: (url, callback) => makeRequest("delete", url, {}, callback),
        message,
        isSuccess,
    };
};

export default useApiRequest;
