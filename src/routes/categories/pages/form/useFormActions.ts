import { useCreateCategory, useUpdateCategory } from "~/lib/api/hooks/useCategories";
import type { CategoryReqDto } from "~/lib/api/services/categories";
import type { CategoryFormData } from "./schema";

export function useCreateAction(onSuccess: () => void) {
	const mutation = useCreateCategory();

	function submit(data: CategoryFormData) {
		const body: CategoryReqDto = {
			name: data.name,
			description: data.description,
			imageUrl: data.imageUrl || undefined,
			icon: data.icon || undefined,
			orderIndex: data.orderIndex,
			parentId: data.parentId,
		};
		mutation.mutate(body, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}

export function useEditAction(id: number, onSuccess: () => void) {
	const mutation = useUpdateCategory();

	function submit(data: CategoryFormData) {
		const body: CategoryReqDto = {
			name: data.name,
			description: data.description,
			imageUrl: data.imageUrl || undefined,
			icon: data.icon || undefined,
			orderIndex: data.orderIndex,
			parentId: data.parentId,
		};
		mutation.mutate({ id, body }, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
