import { useQuery } from "@tanstack/react-query";
import {
	getDashboardOverview,
	getOrdersDistribution,
	getRevenueMonth,
	getRevenueStats,
	getRevenueToday,
	getTopCouriers,
	getTopProducts,
} from "../services/dashboard";

export const dashboardKeys = {
	all: ["dashboard"] as const,
	overview: () => [...dashboardKeys.all, "overview"] as const,
	revenueStats: (params: { startDate: string; endDate: string }) =>
		[...dashboardKeys.all, "revenue", "stats", params] as const,
	revenueToday: () => [...dashboardKeys.all, "revenue", "today"] as const,
	revenueMonth: () => [...dashboardKeys.all, "revenue", "month"] as const,
	ordersDistribution: () => [...dashboardKeys.all, "orders", "distribution"] as const,
	topProducts: (limit?: number) => [...dashboardKeys.all, "products", "top", limit] as const,
	topCouriers: (limit?: number) => [...dashboardKeys.all, "couriers", "top", limit] as const,
};

export function useDashboardOverview() {
	return useQuery({
		queryKey: dashboardKeys.overview(),
		queryFn: getDashboardOverview,
		select: (res) => res.data,
	});
}

export function useRevenueStats(params: { startDate: string; endDate: string }) {
	return useQuery({
		queryKey: dashboardKeys.revenueStats(params),
		queryFn: () => getRevenueStats(params),
		select: (res) => res.data,
	});
}

export function useRevenueToday() {
	return useQuery({
		queryKey: dashboardKeys.revenueToday(),
		queryFn: getRevenueToday,
		select: (res) => res.data,
	});
}

export function useRevenueMonth() {
	return useQuery({
		queryKey: dashboardKeys.revenueMonth(),
		queryFn: getRevenueMonth,
		select: (res) => res.data,
	});
}

export function useOrdersDistribution() {
	return useQuery({
		queryKey: dashboardKeys.ordersDistribution(),
		queryFn: getOrdersDistribution,
		select: (res) => res.data,
	});
}

export function useTopProducts(limit = 5) {
	return useQuery({
		queryKey: dashboardKeys.topProducts(limit),
		queryFn: () => getTopProducts(limit),
		select: (res) => res.data,
	});
}

export function useTopCouriers(limit = 5) {
	return useQuery({
		queryKey: dashboardKeys.topCouriers(limit),
		queryFn: () => getTopCouriers(limit),
		select: (res) => res.data,
	});
}
