import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryCriteria, CategoryReqDto } from "../services/categories";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoriesFilter,
	getCategoryById,
	toggleCategoryActive,
	updateCategory,
} from "../services/categories";

export const categoryKeys = {
	all: ["categories"] as const,
	filter: (criteria: CategoryCriteria, page: number, size: number) =>
		[...categoryKeys.all, "filter", criteria, page, size] as const,
	detail: (id: number) => [...categoryKeys.all, "detail", id] as const,
};

export function useCategories(criteria: CategoryCriteria, page = 0, size = 10) {
	return useQuery({
		queryKey: categoryKeys.filter(criteria, page, size),
		queryFn: () => getCategoriesFilter({ criteria, page, size }),
		select: (res) => ({ data: res?.data ?? [], meta: res?.meta }),
		placeholderData: (prev) => prev,
	});
}

export function useCategoryById(id: number) {
	return useQuery({
		queryKey: categoryKeys.detail(id),
		queryFn: () => getCategoryById(id),
		select: (res) => res?.data,
		enabled: id > 0,
	});
}

export function useAllCategories() {
	return useQuery({
		queryKey: [...categoryKeys.all, "all"],
		queryFn: () => getAllCategories(),
		select: (res) => res?.data ?? [],
	});
}

export function useCreateCategory() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body: CategoryReqDto) => createCategory(body),
		onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
	});
}

export function useUpdateCategory() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: number; body: CategoryReqDto }) => updateCategory(id, body),
		onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
	});
}

export function useDeleteCategory() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deleteCategory(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
	});
}

export function useToggleCategoryActive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => toggleCategoryActive(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
	});
}
