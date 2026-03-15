import { useDeleteRestaurant } from "~/lib/api/hooks/useRestaurants";

export function useDeleteAction(onSuccess: () => void) {
	const mutation = useDeleteRestaurant();

	function submit(id: number) {
		mutation.mutate(id, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
