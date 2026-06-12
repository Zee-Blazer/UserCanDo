import axios from "axios";
// const baseURL = "https://api.fios.clients.ucdtrnsfm.com/api/v1/";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

export const api2 = axios.create({
	baseURL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

api.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

api2.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);
