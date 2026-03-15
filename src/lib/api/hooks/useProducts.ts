import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ProductCriteria, ProductReqDto } from "../services/products";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProductsFilter,
	toggleProductAvailability,
	updateProduct,
} from "../services/products";

export const productKeys = {
	all: ["products"] as const,
	filter: (criteria: ProductCriteria, page: number, size: number) =>
		[...productKeys.all, "filter", criteria, page, size] as const,
	detail: (id: number) => [...productKeys.all, "detail", id] as const,
};

export function useProducts(criteria: ProductCriteria, page = 0, size = 10) {
	return useQuery({
		queryKey: productKeys.filter(criteria, page, size),
		queryFn: () => getProductsFilter({ criteria, page, size }),
		select: (res) => ({ data: res?.data ?? [], meta: res?.meta }),
		placeholderData: (prev) => prev,
	});
}

export function useProductById(id: number) {
	return useQuery({
		queryKey: productKeys.detail(id),
		queryFn: () => getProductById(id),
		select: (res) => res?.data,
		enabled: id > 0,
	});
}

export function useCreateProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body: ProductReqDto) => createProduct(body),
		onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
	});
}

export function useUpdateProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: number; body: ProductReqDto }) => updateProduct(id, body),
		onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
	});
}

export function useDeleteProduct() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deleteProduct(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
	});
}

export function useToggleProductAvailability() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => toggleProductAvailability(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
	});
}
