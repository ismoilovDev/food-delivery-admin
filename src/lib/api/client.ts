import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema.d.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "https://food-delivery.uz";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
	accessToken = token;
}

const authMiddleware: Middleware = {
	async onRequest({ request }) {
		if (accessToken) {
			request.headers.set("Authorization", `Bearer ${accessToken}`);
		}
		return request;
	},
	async onResponse({ response }) {
		if (response.status === 401) {
			setAccessToken(null);
			window.location.href = "/login";
		}
		return response;
	},
};

export const apiClient = createClient<paths>({
	baseUrl: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.use(authMiddleware);
