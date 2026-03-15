import type { RestaurantDto } from "~/lib/api/services/restaurants";
import type { RestaurantFormData } from "./schema";

export function toFormDefaults(restaurant: RestaurantDto): Partial<RestaurantFormData> {
	return {
		name: restaurant.name ?? {},
		description: restaurant.description ?? {},
		address: restaurant.address ?? {},
		phone: restaurant.phone ?? "",
		email: restaurant.email ?? "",
		logoUrl: restaurant.logoUrl ?? "",
		bannerUrl: restaurant.bannerUrl ?? "",
		workingHoursStart: restaurant.workingHoursStart ?? "",
		workingHoursEnd: restaurant.workingHoursEnd ?? "",
		deliveryFee: restaurant.deliveryFee,
		minOrderAmount: restaurant.minOrderAmount,
		averageDeliveryTime: restaurant.averageDeliveryTime,
	};
}
