import { apiClient } from "../client";

export async function getDashboardOverview() {
	const { data, error } = await apiClient.GET("/api/dashboard/overview");
	if (error) throw error;
	return data;
}

export async function getRevenueStats(params?: { startDate?: string; endDate?: string }) {
	const { data, error } = await apiClient.GET("/api/dashboard/revenue/stats", {
		params: { query: params },
	});
	if (error) throw error;
	return data;
}

export async function getRevenueToday() {
	const { data, error } = await apiClient.GET("/api/dashboard/revenue/today");
	if (error) throw error;
	return data;
}

export async function getRevenueMonth() {
	const { data, error } = await apiClient.GET("/api/dashboard/revenue/month");
	if (error) throw error;
	return data;
}

export async function getOrdersDistribution() {
	const { data, error } = await apiClient.GET("/api/dashboard/orders/distribution");
	if (error) throw error;
	return data;
}

export async function getTopProducts(params?: { limit?: number }) {
	const { data, error } = await apiClient.GET("/api/dashboard/products/top", {
		params: { query: params },
	});
	if (error) throw error;
	return data;
}

export async function getTopCouriers(params?: { limit?: number }) {
	const { data, error } = await apiClient.GET("/api/dashboard/couriers/top", {
		params: { query: params },
	});
	if (error) throw error;
	return data;
}
