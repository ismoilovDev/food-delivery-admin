import { useDeleteProduct } from "~/lib/api/hooks/useProducts";

export function useDeleteAction(onSuccess: () => void) {
	const mutation = useDeleteProduct();

	function submit(id: number) {
		mutation.mutate(id, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
