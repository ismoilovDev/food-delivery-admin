import { apiClient } from "../client";
import type { components } from "../schema";

export type RestaurantDto = components["schemas"]["RestaurantDto"];
export type RestaurantReqDto = components["schemas"]["RestaurantReqDto"];
export type RestaurantCriteria = components["schemas"]["RestaurantCriteria"];

export interface RestaurantFilterParams {
	criteria: RestaurantCriteria;
	page?: number;
	size?: number;
}

export async function getRestaurantsFilter({
	criteria,
	page = 0,
	size = 10,
}: RestaurantFilterParams) {
	const { data, error } = await apiClient.GET("/api/restaurants/filter", {
		params: { query: { arg0: criteria, page, size } },
	});
	if (error) throw error;
	return data;
}

export async function getRestaurantById(id: number) {
	const { data, error } = await apiClient.GET("/api/restaurants/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function createRestaurant(body: RestaurantReqDto) {
	const { data, error } = await apiClient.POST("/api/restaurants", { body });
	if (error) throw error;
	return data;
}

export async function updateRestaurant(id: number, body: RestaurantReqDto) {
	const { data, error } = await apiClient.PUT("/api/restaurants/{id}", {
		params: { path: { id } },
		body,
	});
	if (error) throw error;
	return data;
}

export async function deleteRestaurant(id: number) {
	const { data, error } = await apiClient.DELETE("/api/restaurants/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function toggleRestaurantOpen(id: number) {
	const { data, error } = await apiClient.PATCH("/api/restaurants/{id}/toggle-open", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function toggleRestaurantActive(id: number) {
	const { data, error } = await apiClient.PATCH("/api/restaurants/{id}/toggle-active", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}
