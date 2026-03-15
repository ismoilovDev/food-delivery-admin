import { useDeleteCategory } from "~/lib/api/hooks/useCategories";

export function useDeleteAction(onSuccess: () => void) {
	const mutation = useDeleteCategory();

	function submit(id: number) {
		mutation.mutate(id, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
