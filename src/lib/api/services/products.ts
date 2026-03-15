import { apiClient } from "../client";
import type { components } from "../schema";

export type ProductDto = components["schemas"]["ProductDto"];
export type ProductReqDto = components["schemas"]["ProductReqDto"];
export type ProductCriteria = components["schemas"]["ProductCriteria"];

export interface ProductFilterParams {
	criteria: ProductCriteria;
	page?: number;
	size?: number;
}

export async function getProductsFilter({ criteria, page = 0, size = 10 }: ProductFilterParams) {
	const { data, error } = await apiClient.GET("/api/products/filter", {
		params: { query: { arg0: criteria, page, size } },
	});
	if (error) throw error;
	return data;
}

export async function getProductById(id: number) {
	const { data, error } = await apiClient.GET("/api/products/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function createProduct(body: ProductReqDto) {
	const { data, error } = await apiClient.POST("/api/products", { body });
	if (error) throw error;
	return data;
}

export async function updateProduct(id: number, body: ProductReqDto) {
	const { data, error } = await apiClient.PUT("/api/products/{id}", {
		params: { path: { id } },
		body,
	});
	if (error) throw error;
	return data;
}

export async function deleteProduct(id: number) {
	const { data, error } = await apiClient.DELETE("/api/products/{id}", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}

export async function toggleProductAvailability(id: number) {
	const { data, error } = await apiClient.PUT("/api/products/{id}/toggle-availability", {
		params: { path: { id } },
	});
	if (error) throw error;
	return data;
}
