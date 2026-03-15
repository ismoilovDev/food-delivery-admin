import { useCreateRestaurant, useUpdateRestaurant } from "~/lib/api/hooks/useRestaurants";
import type { RestaurantFormData } from "./schema";

export function useCreateAction(onSuccess: () => void) {
	const mutation = useCreateRestaurant();

	function submit(data: RestaurantFormData) {
		mutation.mutate(data, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}

export function useEditAction(id: number, onSuccess: () => void) {
	const mutation = useUpdateRestaurant();

	function submit(data: RestaurantFormData) {
		mutation.mutate({ id, body: data }, { onSuccess });
	}

	return { submit, isPending: mutation.isPending, error: mutation.error };
}
