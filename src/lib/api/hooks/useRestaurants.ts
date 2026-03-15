import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RestaurantCriteria, RestaurantReqDto } from "../services/restaurants";
import {
	createRestaurant,
	deleteRestaurant,
	getRestaurantById,
	getRestaurantsFilter,
	toggleRestaurantActive,
	toggleRestaurantOpen,
	updateRestaurant,
} from "../services/restaurants";

export const restaurantKeys = {
	all: ["restaurants"] as const,
	filter: (criteria: RestaurantCriteria, page: number, size: number) =>
		[...restaurantKeys.all, "filter", criteria, page, size] as const,
	detail: (id: number) => [...restaurantKeys.all, "detail", id] as const,
};

export function useRestaurants(criteria: RestaurantCriteria, page = 0, size = 10) {
	return useQuery({
		queryKey: restaurantKeys.filter(criteria, page, size),
		queryFn: () => getRestaurantsFilter({ criteria, page, size }),
		select: (res) => ({ data: res?.data ?? [], meta: res?.meta }),
		placeholderData: (prev) => prev,
	});
}

export function useRestaurantById(id: number) {
	return useQuery({
		queryKey: restaurantKeys.detail(id),
		queryFn: () => getRestaurantById(id),
		select: (res) => res?.data,
		enabled: id > 0,
	});
}

export function useCreateRestaurant() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (body: RestaurantReqDto) => createRestaurant(body),
		onSuccess: () => qc.invalidateQueries({ queryKey: restaurantKeys.all }),
	});
}

export function useUpdateRestaurant() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, body }: { id: number; body: RestaurantReqDto }) =>
			updateRestaurant(id, body),
		onSuccess: () => qc.invalidateQueries({ queryKey: restaurantKeys.all }),
	});
}

export function useDeleteRestaurant() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => deleteRestaurant(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: restaurantKeys.all }),
	});
}

export function useToggleRestaurantOpen() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => toggleRestaurantOpen(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: restaurantKeys.all }),
	});
}

export function useToggleRestaurantActive() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => toggleRestaurantActive(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: restaurantKeys.all }),
	});
}
