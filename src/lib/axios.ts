import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://food-delivery.uz";

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
	accessToken = token;
}

api.interceptors.request.use((config) => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			setAccessToken(null);
			window.location.href = "/login";
		}
		const message = error.response?.data?.message ?? error.message ?? "Unknown error";
		return Promise.reject(new Error(message));
	},
);
