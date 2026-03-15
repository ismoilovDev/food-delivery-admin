import { apiClient } from "../client";
import type { components } from "../schema";

export type CategoryDto = components["schemas"]["CategoryDto"];
export type CategoryReqDto = components["schemas"]["CategoryReqDto"];
export type CategoryCriteria = components["schemas"]["CategoryCriteria"];

export interface CategoryFilterParams {
	criteria: CategoryCriteria;
	page?: number;
	size?: number;
}

export async function getAllCategories() {
	const { data, error } = await apiClient.GET("/api/categories");
	if (error) throw error;
	return data;
}

export async function getCategoriesFilter({ criteria, page = 0, size = 10 }: CategoryFilterParams) {
	const { data, error } = await apiClient.GET("/api/categories/filter", {
		params: { query: { arg0: criteria, page, size } },
	});
	if (error) throw error;
	return data;
}

export async function getCategoryById(id: number) {
	const { data, error } = await apiClient.GET("/api/categories/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function createCategory(body: CategoryReqDto) {
	const { data, error } = await apiClient.POST("/api/categories", { body });
	if (error) throw error;
	return data;
}

export async function updateCategory(id: number, body: CategoryReqDto) {
	const { data, error } = await apiClient.PUT("/api/categories/{id}", {
		params: { path: { id } },
		body,
	});
	if (error) throw error;
	return data;
}

export async function deleteCategory(id: number) {
	const { data, error } = await apiClient.DELETE("/api/categories/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function toggleCategoryActive(id: number) {
	const { data, error } = await apiClient.PUT("/api/categories/{id}/toggle-active", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}
